import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../services/authenticationContext';
import * as signalR from '@microsoft/signalr';
import * as AppConfig from '../../AppConfig';
import { ChatField } from '../../components/chat/chat-field/chat-field';
import { ChatEntryDto } from '../../models/chatEntryDto';
import { Guid } from 'guid-typescript';
import { UserDto } from '../../models/userDto';
import * as Styles from './styles';
import { RoomUsers } from '../../components/room-users/room-users';
import ReactPlayer from 'react-player';
import { VideoPlayerDto } from '../../models/currentVideoDto';
import { Slider } from '@mui/material';
import { convertSecondsToTimeFormat } from '../../misc/convertSecondsToTimeFormat';
import { toggleFullScreen } from '../../misc/toggleFullScreen';
import * as CommonStyles from "../../commonStyles";
import { getYoutubeVideoTitle } from '../../misc/getVideoTitle';

export interface RoomContextType {
    sendMessage: (messageText: string) => Promise<void>;
}

export const RoomContext = createContext<RoomContextType | null>(null);

export const RoomPage = (): JSX.Element => {
    const authContext = useContext(AuthContext);
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [messages, setMessages] = useState<ChatEntryDto[]>([]);
    const [users, setUsers] = useState<UserDto[]>();
    const params = useParams();
    const playerRef = useRef<ReactPlayer>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState<number>(0);
    const [volume, setVolume] = useState<number>(50);
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
    const [currentUrl, setCurrentUrl] = useState<string>('');
    const [newUrl, setNewUrl] = useState<string>('');

    const videoPlayerHandler = useCallback((videoPlayer: VideoPlayerDto) => {
        if (videoPlayer.roomId !== params.id) {
            return;
        }
        if (videoPlayer.currentVideoUrl !== null && videoPlayer.currentVideoUrl !== currentUrl) {
            setCurrentUrl(videoPlayer.currentVideoUrl!);
        }
        if (videoPlayer.isPaused !== null && videoPlayer.isPaused) {
            setIsPlaying(false);
        }
        if (videoPlayer.isPlaying !== null && videoPlayer.isPlaying) {
            setIsPlaying(true);
        }
        if (videoPlayer.duration !== null) {
            const player = playerRef.current?.getInternalPlayer();
            if (player === undefined) {
                return;
            }
            player.seekTo(videoPlayer.duration);
        }
        if (videoPlayer.duration) {
            setPosition(videoPlayer.duration);
        }
    }, [params.id, currentUrl]);

    const onStart = async (): Promise<void> => {
        await connection?.invoke("VideoPlayer", {
            roomId: params.id,
            isPlaying: true
        });
    };
    const onPause = async (): Promise<void> => {
        await connection?.invoke("VideoPlayer", {
            roomId: params.id,
            duration: position,
            isPaused: true
        });
    };

    const onProgress = async (progress: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number; }): Promise<void> => {
        if (Math.round(progress.playedSeconds) === position) {
            return;
        }
        setPosition(Math.round(progress.playedSeconds));
    };

    const onSeek = async (seconds: number): Promise<void> => {
        console.log('seek:' + seconds);
        await connection?.invoke("VideoPlayer", {
            roomId: params.id,
            duration: seconds
        });
    };

    const messageHandler = useCallback((message: ChatEntryDto) => {
        if (message.roomId !== params.id) {
            return;
        }
        setMessages((prevMessages) => [...prevMessages, message]);
    }, [params.id]);

    useEffect(() => {
        const startConnection = async () => {
            try {
                const roomConnection = new signalR.HubConnectionBuilder()
                    .withUrl(AppConfig.GetConfig().apiUrl + 'roomHub')
                    .withAutomaticReconnect()
                    .build();

                roomConnection.onclose((error) => {
                    console.error('Connection closed:', error);
                });

                roomConnection.on('ReciveMessage', (message: ChatEntryDto) => {
                    messageHandler(message);
                });

                roomConnection.on('VideoPlayerHandler', (videoPlayer: VideoPlayerDto) => {
                    videoPlayerHandler(videoPlayer);
                });

                roomConnection.on('GetRoomUsers', async (users: UserDto[]) => {
                    setUsers(users);
                });

                await roomConnection.start();
                roomConnection.invoke("JoinRoom", params.id, authContext?.currentUser?.id, authContext?.currentUser?.name);
                console.log('Connected to the hub.');
                setConnection(roomConnection);
            } catch (err) {
                console.error('error when connecting to the hub:', err);
            }
            getYoutubeVideoTitle("https://www.youtube.com/watch?v=m0zJsAFzvys&list=RDm0zJsAFzvys&start_radio=1").then((title) => console.log(title));
        };

        if (!connection) {
            startConnection();
        }
        return () => {
            if (connection) {
                connection.stop();
            }
        };
    }, [connection, params.id, authContext?.currentUser?.id, authContext?.currentUser?.name, messageHandler, videoPlayerHandler]);

    const sendMessage = async (messageText: string): Promise<void> => {
        if (!authContext?.currentUser?.name || !authContext?.currentUser?.id || !params.id) {
            return;
        }
        const message: ChatEntryDto = {
            id: Guid.create().toString(),
            message: messageText,
            roomId: params.id,
            userId: authContext?.currentUser?.id,
            messageTime: new Date(),
            name: authContext?.currentUser?.name
        };
        connection?.invoke("SendMessage", message);
    };

    const onVolumeChange = async (volume: number): Promise<void> => {
        setVolume(volume);
        const player = playerRef.current?.getInternalPlayer();
        if (player === undefined) {
            return;
        }
        player.setVolume(volume);
    };

    const handleFullScreen = (isFullScreen: boolean): void => {
        setIsFullScreen(isFullScreen);
        toggleFullScreen(isFullScreen);
    };

    const handlePlayUrl = async (url: string): Promise<void> => {
        await connection?.invoke("VideoPlayer", {
            roomId: params.id,
            currentVideoUrl: url
        });
    };

    return (
        <RoomContext.Provider value={{ sendMessage }}>
            <Styles.RoomHeader>
                <CommonStyles.StyledTextField onChange={e => setNewUrl(e.target.value)} />
                <CommonStyles.GenericButton onClick={() => handlePlayUrl(newUrl)}>Play</CommonStyles.GenericButton>
            </Styles.RoomHeader>
            <Styles.RoomContainer>
                {
                    connection &&
                    <>
                        <Styles.VideoPlayerContainer isFullScreen={isFullScreen}>
                            <ReactPlayer
                                onProgress={(progress) => onProgress(progress)}
                                width={'100%'}
                                height={'100%'}
                                ref={playerRef}
                                controls={false}
                                url={currentUrl}
                                onPlay={onStart}
                                onPause={onPause}
                                playing={isPlaying}
                            />
                            {currentUrl &&
                                <Styles.VideoPlayerActionBar>
                                    <Styles.PlayAndSeekActionBar>
                                        {
                                            isPlaying ? <Styles.Pause onClick={onPause} /> : <Styles.Play onClick={onStart} />
                                        }
                                        <Slider
                                            aria-label="time-indicator"
                                            size="medium"
                                            sx={Styles.VideoPlayerSlider}
                                            min={0}
                                            step={1}
                                            value={position}
                                            max={playerRef.current?.getDuration() ?? 0}
                                            onChange={(_, value) => onSeek(value as number)}
                                        />
                                        <Styles.TimeIndicator>{convertSecondsToTimeFormat(position)}</Styles.TimeIndicator>
                                    </Styles.PlayAndSeekActionBar>
                                    <Styles.VolumeActionBar>
                                        {volume > 0 ? <Styles.Volume onClick={() => onVolumeChange(0)} /> : <Styles.Mute onClick={() => onVolumeChange(50)} />}
                                        <Slider
                                            aria-label="volume-indicator"
                                            size="medium"
                                            sx={Styles.VolumeActionBarSlider}
                                            min={0}
                                            step={10}
                                            value={volume}
                                            max={100}
                                            onChange={(_, value) => onVolumeChange(value as number)}
                                        />
                                    </Styles.VolumeActionBar>
                                    {isFullScreen ? <Styles.ExitFullScreen onClick={() => handleFullScreen(false)} /> : <Styles.FullScreen onClick={() => handleFullScreen(true)} />}
                                </Styles.VideoPlayerActionBar>}
                        </Styles.VideoPlayerContainer>
                        <Styles.ChatContainer>
                            <RoomUsers users={users ?? []} />
                            <ChatField messages={messages} />
                        </Styles.ChatContainer>
                    </>
                }
            </Styles.RoomContainer>
        </RoomContext.Provider>
    );
};
