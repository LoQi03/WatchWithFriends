import React, { ReactNode, createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { OnProgressProps } from 'react-player/base';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './authenticationContext';
import { Guid } from 'guid-typescript';
import { getVideoDetails } from '../misc/getVideoDetails';
import * as AppConfig from '../AppConfig';
import { toggleFullScreen } from '../misc/toggleFullScreen';
import * as signalR from '@microsoft/signalr';
import toast from 'react-hot-toast';
import { ChatEntryDTO, RoomDTO, RoomsApi, UserDTO, Video, VideoPlayer } from '../api';

export interface RoomContextType {
    sendMessage: (messageText: string) => Promise<void>;
    onProgress: (progress: OnProgressProps) => Promise<void>;
    onStart: () => Promise<void>;
    onPause: () => Promise<void>;
    onSeek: (seconds: number) => Promise<void>;
    onEnd: () => Promise<void>;
    messages: ChatEntryDTO[];
    users: UserDTO[] | undefined;
    newUrl: string;
    playerRef: React.RefObject<ReactPlayer>;
    isPlaying: boolean;
    duration: number;
    volume: number;
    isFullScreen: boolean;
    currentRoom: RoomDTO | null;
    currentVideo: Video | null;
    connection: signalR.HubConnection | null;
    notSeeingMessages: number;
    onVolumeChange: (volume: number) => Promise<void>;
    handleFullScreen: (isFullScreen: boolean) => void;
    handleDeleteVideo: (videoId: string) => Promise<void>;
    handlePlayUrl: (url: string) => Promise<void>;
    handleSetNewUrl: (url: string) => void;
    updateNotSeeingMessages: (count: number) => void;
}

export const RoomContext = createContext<RoomContextType | null>(null);

export const RoomProvider: React.FC<{ children: ReactNode, id: string }> = ({ children, id }) => {
    const roomAPI = new RoomsApi();
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [messages, setMessages] = useState<ChatEntryDTO[]>([]);
    const [users, setUsers] = useState<UserDTO[]>();
    const playerRef = useRef<ReactPlayer>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState<number>(0);
    const [volume, setVolume] = useState<number>(50);
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
    const [newUrl, setNewUrl] = useState<string>('');
    const [currentRoom, setCurrentRoom] = useState<RoomDTO | null>(null);
    const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
    const [notSeeingMessages, setNotSeeingMessages] = useState<number>(0);
    const [isHandleReciveChanges, setIsHandleReciveChanges] = useState<boolean>(false);
    const [isNewUser, setIsNewUser] = useState<boolean>(true);

    const videoPlayerHandler = useCallback((videoPlayer: VideoPlayer) => {
        setIsHandleReciveChanges(true);
        setIsNewUser(false);
        if (videoPlayer.roomId !== id) {
            return;
        }
        if (videoPlayer.isPlaying) {
            setIsPlaying(true);
        }
        else
        {
            setIsPlaying(false);
        }
        if (videoPlayer.duration !== null && videoPlayer.duration !== undefined) {
            const player = playerRef.current?.getInternalPlayer();

            if (player === undefined) {
                return;
            }
            const position = player.getCurrentTime();
            const difference = Math.abs(videoPlayer.duration - position);

            if (difference >= 15) {
                player.seekTo(videoPlayer.duration);
            }
        }
        setTimeout(() => {
            setIsHandleReciveChanges(false);
        }, 1000);
    }, [id]);

    const updateNotSeeingMessages = (count: number) => {
        setNotSeeingMessages(count);
    }

    const updateRoomHandler = useCallback((room: RoomDTO) => {
        setCurrentRoom(room);
        var currentVideo = room.playList?.find(x => x.id === room.currentVideo);
        if (!currentVideo) {
            return;
        }
        setCurrentVideo(currentVideo);
    }, []);

    const messageHandler = useCallback((message: ChatEntryDTO) => {
        if (message.roomId !== id) {
            return;
        }
        setMessages((prevMessages) => [...prevMessages, message]);
    }, [id]);

    const subscribeHubEvents = useCallback((roomConnection: signalR.HubConnection) => {
        roomConnection.onclose((error) => {
            console.error('Connection closed:', error);
        });

        roomConnection.on('ReciveMessage', (message: ChatEntryDTO) => {
            if (authContext?.currentUser?.id !== message.userId) {
                setNotSeeingMessages(prev => prev + 1);
            }
            messageHandler(message);
        });
        roomConnection.on('VideoPlayerHandler', (videoPlayer: VideoPlayer) => {
            if(isHandleReciveChanges)
            {
                return;
            }
            videoPlayerHandler(videoPlayer);
        });
        roomConnection.on('GetRoomUsers', async (users: UserDTO[]) => {
            try {
                const { data } = await roomAPI.getRoom(id);
                setCurrentRoom(data);
            }
            catch (error) {
                console.log(error);
            }
            setUsers(users);
        });

        roomConnection.on('UpdateRoomHandler', async (room: RoomDTO) => {
            updateRoomHandler(room);
        });
    }, [
        authContext?.currentUser?.id,
        id,
        messageHandler,
        updateRoomHandler,
        videoPlayerHandler
    ]);

    const onStart = async (): Promise<void> => {
        if(isHandleReciveChanges || isNewUser)
        {
            return;
        }
        setIsPlaying(true);
        const videoPlayer: VideoPlayer = {
            roomId: id,
            isPlaying: true,
            duration: duration
        };
        if(!authContext?.currentUser?.id) {
            return;
        }
        await roomAPI.handleRoomState(connection?.connectionId??"", videoPlayer);
    };
    const onPause = async (): Promise<void> => {
        if(isHandleReciveChanges || isNewUser)
        {
            return;
        }
        setIsPlaying(false);
        const videoPlayer: VideoPlayer = {
            roomId: id,
            isPlaying: false,
            duration: duration
        };
        if(!authContext?.currentUser?.id) {
            return;
        }
        await roomAPI.handleRoomState(connection?.connectionId??"", videoPlayer);
    };

    const onEnd = async (): Promise<void> => {
        if (currentRoom?.creatorId !== authContext?.currentUser?.id) {
            return;
        }
        if (!id) {
            return;
        }
        const { data } = await roomAPI.nextVideoForRoom(id);
        if (data) {
            setDuration(0);
        }
    };

    const onSeek = async (seconds: number): Promise<void> => {
        if(isHandleReciveChanges || isNewUser)
        {
            return;
        }
        setDuration(seconds);
        const player = playerRef.current?.getInternalPlayer();
        if(!player)
        {
            return;
        }
        player.seekTo(seconds);
        const videoPlayer: VideoPlayer = {
            roomId: id,
            isPlaying: isPlaying,
            duration: seconds
        };
        if(!authContext?.currentUser?.id) {
            return;
        }
        await roomAPI.handleRoomState(connection?.connectionId??"", videoPlayer);
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

      useEffect(() => {
        if (currentRoom !== null) {
            return;
        }
        const getRoom = async () => {
            if (!id) {
                return;
            }
            try {
                const { data } = await roomAPI.getRoom(id);
                setCurrentRoom(data);
                console.log(data);
                if (!data || !data.currentVideo || !data.playList) {
                    return;
                }
                var currentVideo = data.playList?.find(x => x.id === data.currentVideo);
                setIsNewUser(false);
                console.log(currentVideo);
                if (!currentVideo) {
                    return;
                }
                console.log(currentVideo);
                setCurrentVideo(currentVideo);
            } catch (error) {
                console.log(error);
                navigate('/rooms');
            };
        };
        getRoom();
    }, [id, currentRoom, navigate]);

    useEffect(() => {
        const startConnection = async () => {
            try {
                const roomConnection = new signalR.HubConnectionBuilder()
                    .withUrl(AppConfig.getConfig().apiUrl + 'roomHub')
                    .withAutomaticReconnect()
                    .build();

                subscribeHubEvents(roomConnection);
                await roomConnection.start();
                if(!authContext?.currentUser)
                {
                    throw new Error('User not authenticated');
                }
                if(roomConnection.connectionId === null || roomConnection.connectionId === undefined){
                    throw new Error('ConnectionId is null or undefined');
                }
                await roomAPI.joinRoom(id, roomConnection.connectionId, authContext?.currentUser);
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
    }, [
        connection,
        id,
        authContext?.currentUser,
        messageHandler,
        videoPlayerHandler,
        updateRoomHandler,
        navigate,
        subscribeHubEvents
    ]);

    useEffect(() => {
        if(authContext?.currentUser?.id !== currentRoom?.creatorId)
        {
            return;
        }
        setIsNewUser(false);
    }, [authContext?.currentUser?.id, currentRoom?.creatorId]);

    const sendMessage = async (messageText: string): Promise<void> => {
        if (!authContext?.currentUser?.name || !authContext?.currentUser?.id || !id) {
            return;
        }
        const message: ChatEntryDTO = {
            id: Guid.create().toString(),
            message: messageText,
            roomId: id,
            userId: authContext?.currentUser?.id,
            messageTime: new Date().toISOString(),
            name: authContext?.currentUser?.name
        };
        await roomAPI.sendMessage(message);
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
        if (!id) {
            return;
        }
        const { data } = await roomAPI.deleteVideoFromRoom(id, videoId);

        if (!data || !connection) {
            return;
        }
    };


    const handleFullScreen = (isFullScreen: boolean): void => {
        setIsFullScreen(isFullScreen)
        toggleFullScreen(isFullScreen);
    };

    const handleSetNewUrl = (url: string): void => {
        setNewUrl(url);
    };

    const handlePlayUrl = async (url: string): Promise<void> => {
        if (!url) {
            return;
        }
        try {
            const videoDetails = await getVideoDetails(url);
            if (!videoDetails) {
                return;
            }
            const video: Video = {
                url: url,
                image: videoDetails.thumbnails.standard.url,
                title: videoDetails.title,
            };
            if (!id) {
                return;
            }
            const { data } = await roomAPI.addVideoToRoom(id, video);
            
            if (!data || !connection) {
                return;
            }
            toast.success("Video added to playlist!");
            setNewUrl('');
        }
        catch (error) {
            setNewUrl('');
            toast.error("Invalid video url!");
            return;
        }

    };

    return (
        <RoomContext.Provider value={{
            sendMessage,
            onProgress,
            onStart,
            onPause,
            onSeek,
            onEnd,
            messages,
            users,
            newUrl,
            playerRef,
            isPlaying,
            duration,
            volume,
            isFullScreen,
            currentRoom,
            currentVideo,
            connection,
            notSeeingMessages,
            onVolumeChange,
            handleFullScreen,
            handleDeleteVideo,
            handlePlayUrl,
            handleSetNewUrl,
            updateNotSeeingMessages,
        }}>
            {children}
        </RoomContext.Provider>
    );
};
