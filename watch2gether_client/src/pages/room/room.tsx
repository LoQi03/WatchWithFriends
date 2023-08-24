import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { VideoPlayerDto } from '../../models/videoPlayerDto';
import { toggleFullScreen } from '../../misc/toggleFullScreen';
import * as CommonStyles from "../../commonStyles";
import { VideoDto } from '../../models/videoDto';
import { RoomDto } from '../../models/roomDto';
import * as API from '../../api/roomManagmentAPI';
import { getVideoDetails } from '../../misc/getVideoDetails';
import { OnProgressProps } from 'react-player/base';
import { VideoPlayer } from './video-player';
import { PlayList } from '../../components/play-list/play-list';

export interface RoomContextType {
    sendMessage: (messageText: string) => Promise<void>;
    onProgress: (progress: OnProgressProps) => Promise<void>;
    onStart: () => Promise<void>;
    onPause: () => Promise<void>;
    onSeek: (seconds: number) => Promise<void>;
    onEnd: () => Promise<void>;
    playerRef: React.RefObject<ReactPlayer>;
    isPlaying: boolean;
    duration: number;
    volume: number;
    isFullScreen: boolean;
    currentRoom: RoomDto | null;
    currentVideo: VideoDto | null;
    onVolumeChange: (volume: number) => Promise<void>;
    handleFullScreen: (isFullScreen: boolean) => void;
    handleDeleteVideo: (videoId: string) => Promise<void>;
}

export const RoomContext = createContext<RoomContextType | null>(null);

export const RoomPage = (): JSX.Element => {
    const authContext = useContext(AuthContext);
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [messages, setMessages] = useState<ChatEntryDto[]>([]);
    const [users, setUsers] = useState<UserDto[]>();
    const navigate = useNavigate();
    const params = useParams();
    const playerRef = useRef<ReactPlayer>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [duration, setDuration] = useState<number>(0);
    const [volume, setVolume] = useState<number>(50);
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
    const [newUrl, setNewUrl] = useState<string>('');
    const [currentRoom, setCurrentRoom] = useState<RoomDto | null>(null);
    const [currentVideo, setCurrentVideo] = useState<VideoDto | null>(null);

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
        if (videoPlayer.duration !== null && videoPlayer.duration !== undefined) {
            const player = playerRef.current?.getInternalPlayer();

            if (player === undefined) {
                return;
            }
            const position = player.getCurrentTime();
            const difference = Math.abs(videoPlayer.duration - position);

            if (difference >= 5) {
                player.seekTo(videoPlayer.duration);
            }
        }
    }, [params.id]);

    const updateRoomHandler = useCallback((room: RoomDto) => {
        setCurrentRoom(room);
        var currentVideo = room.playList?.find(x => x.id === room.currentVideo);
        if (!currentVideo) {
            return;
        }
        setCurrentVideo(currentVideo);
    }, []);

    const messageHandler = useCallback((message: ChatEntryDto) => {
        if (message.roomId !== params.id) {
            return;
        }
        setMessages((prevMessages) => [...prevMessages, message]);
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
            isPaused: true
        });
    };

    const onEnd = async (): Promise<void> => {
        if (currentRoom?.creatorId !== authContext?.currentUser?.id) {
            return;
        }
        if (!params.id) {
            return;
        }
        const { data } = await API.getNextVideo(params.id);
        if (!data) {
            return;
        }
        await connection?.invoke("UpdateRoom", data);
    };

    const onSeek = async (seconds: number): Promise<void> => {
        await connection?.invoke("VideoPlayer", {
            roomId: params.id,
            duration: seconds
        });
    };

    const onProgress = async (progress: OnProgressProps): Promise<void> => {
        if (Math.round(progress.playedSeconds) === duration) {
            return;
        }
        setDuration(Math.round(progress.playedSeconds));
    };

    useEffect(() => {
        const handleKeyPress = (event: any) => {
            if (event.keyCode === 27) {
                setIsFullScreen(false);
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);


    useMemo(() => {
        if (currentRoom !== null) {
            return;
        }
        const getRoom = async () => {
            if (!params.id) {
                return;
            }
            const { data } = await API.getRoomById(params.id);
            setCurrentRoom(data);
            if (!data || !data.currentVideo || !data.playList) {
                return;
            }
            var currentVideo = data.playList?.find(x => x.id === data.currentVideo);
            if (!currentVideo) {
                return;
            }
            setCurrentVideo(currentVideo);
        };
        getRoom();
    }, [params.id, currentRoom]);

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
                    try {
                        const { data } = await API.getRoomById(params.id!);
                        setCurrentRoom(data);
                    }
                    catch (error) {
                        console.log(error);
                    }
                    setUsers(users);
                });

                roomConnection.on('UpdateRoomHandler', async (room: RoomDto) => {
                    updateRoomHandler(room);
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
                navigate('/rooms');
            }
        };
    }, [
        connection, params.id,
        authContext?.currentUser?.id,
        authContext?.currentUser?.name,
        messageHandler,
        videoPlayerHandler,
        updateRoomHandler,
        navigate,
    ]);

    useMemo(() => {
        if (authContext?.currentUser?.id !== currentRoom?.creatorId) {
            return;
        }
        const sendCurrentDurration = async () => {
            if (!params.id) {
                return;
            }
            await connection?.invoke("VideoPlayer", {
                roomId: params.id,
                duration: duration,
                isPlaying: isPlaying,
                isPaused: !isPlaying
            });
        };
        sendCurrentDurration();
    }, [duration, params.id, authContext?.currentUser?.id, currentRoom?.creatorId, connection, isPlaying]);

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

    const handleDeleteVideo = async (videoId: string): Promise<void> => {
        if (!params.id) {
            return;
        }
        const { data } = await API.deleteVideo(params.id, videoId);

        if (!data || !connection) {
            return;
        }

        connection.invoke("UpdateRoom", data);
    };


    const handleFullScreen = (isFullScreen: boolean): void => {
        setIsFullScreen(isFullScreen)
        toggleFullScreen(isFullScreen);
    };

    const handlePlayUrl = async (url: string): Promise<void> => {
        if (!url) {
            return;
        }
        const videoDetails = await getVideoDetails(url);
        if (!videoDetails) {
            return;
        }

        const video: VideoDto = {
            url: url,
            image: videoDetails.thumbnails.standard.url,
            title: videoDetails.title,
        };

        if (!params.id) {
            return;
        }
        const { data } = await API.addVideoToRoom(params.id, video);

        if (!data || !connection) {
            return;
        }

        connection.invoke("UpdateRoom", data);
    };

    return (
        <RoomContext.Provider value={{
            sendMessage,
            onProgress,
            onStart,
            onPause,
            onSeek,
            onEnd,
            playerRef,
            isPlaying,
            duration,
            volume,
            isFullScreen,
            currentRoom,
            currentVideo,
            onVolumeChange,
            handleFullScreen,
            handleDeleteVideo
        }}>
            <Styles.RoomHeader>
                <CommonStyles.StyledTextField onChange={e => setNewUrl(e.target.value)} />
                <CommonStyles.GenericButton onClick={() => handlePlayUrl(newUrl)}>Play</CommonStyles.GenericButton>
            </Styles.RoomHeader>
            <Styles.RoomContainer>
                {
                    connection &&
                    <>
                        <Styles.VideoPlayerAndPlayListContainer>
                            <Styles.VideoPlayerContainer isFullScreen={isFullScreen}>
                                <VideoPlayer />
                            </Styles.VideoPlayerContainer>
                            {
                                currentRoom?.playList && currentRoom?.playList?.length > 0 && <PlayList />
                            }
                        </Styles.VideoPlayerAndPlayListContainer>
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
