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

export interface RoomContextType {
    sendMessage: (messageText: string) => Promise<void>;
}

export const RoomContext = createContext<RoomContextType | null>(null);

function convertSecondsToTimeFormat(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;

    const timeFormatted: string = `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;

    return timeFormatted;
}

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
    // const [currentRoom, setCurrentRoom] = useState<RoomDto>();

    const videoPlayerHandler = useCallback((videoPlayer: VideoPlayerDto) => {
        if (videoPlayer.roomId !== params.id) {
            return;
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
    }, [params.id]);

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

    /*const getCurrentRoom = useCallback(async () => {
        if (!params.id) {
            return;
        }
        const response = await API.getRoomById(params.id);
        setCurrentRoom(response.data);
    }, [params.id]);*/

    const messageHandler = useCallback((message: ChatEntryDto) => {
        if (message.roomId !== params.id) {
            return;
        }
        setMessages((prevMessages) => [...prevMessages, message]);
    }, [params.id]);


    /* useEffect(() => {
         const getCurrentRoomAsync = async () => {
             await getCurrentRoom();
         };
         getCurrentRoomAsync();
     }, [params.id, getCurrentRoom]);*/

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
        const message: ChatEntryDto = {
            id: Guid.create().toString(),
            message: messageText,
            roomId: params.id ?? "",
            userId: authContext?.currentUser?.id ?? "",
            messageTime: new Date(),
            name: authContext?.currentUser?.name ?? ""
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

    return (
        <RoomContext.Provider value={{ sendMessage }}>
            <Styles.RoomContainer>
                {
                    connection &&
                    <>
                        <Styles.VideoPlayerContainer>
                            <ReactPlayer
                                onProgress={(progress) => onProgress(progress)}
                                width={'100%'}
                                height={'100%'}
                                ref={playerRef}
                                controls={false}
                                url='https://www.youtube.com/watch?v=DAOZJPquY_w'
                                onPlay={onStart}
                                onReady={() => console.log("onReady")}
                                onStart={() => console.log("onStart")}
                                onPause={onPause}
                                onError={() => console.log("onError")}
                                playing={isPlaying}
                            />
                            <Styles.VideoPlayerActionBar>
                                <Styles.PlayAndSeekActionBar>
                                    {
                                        isPlaying ? <Styles.Pause onClick={onPause} /> : <Styles.Play onClick={onStart} />
                                    }
                                    <Slider
                                        aria-label="time-indicator"
                                        size="medium"
                                        sx={{ color: 'white', width: '80%' }}
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
                                        sx={{ color: 'white', width: '100%' }}
                                        min={0}
                                        step={10}
                                        value={volume}
                                        max={100}
                                        onChange={(_, value) => onVolumeChange(value as number)}
                                    />
                                </Styles.VolumeActionBar>
                            </Styles.VideoPlayerActionBar>
                            <Styles.QueueContainer>
                                asda
                            </Styles.QueueContainer>
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
