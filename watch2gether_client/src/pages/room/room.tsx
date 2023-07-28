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
    const [shouldPlay, setShouldPlay] = useState(false);
    const playerRef = useRef<ReactPlayer>(null);

    const videoPlayerHandler = useCallback((videoPlayer: VideoPlayerDto) => {
        if (videoPlayer.roomId !== params.id) {
            return;
        }
        if (videoPlayer.isPaused !== null && videoPlayer.isPaused) {
            const player = playerRef.current?.getInternalPlayer();
            if (player === undefined) {
                return;
            }
            console.log('pause');
            player.pauseVideo();
        }
        if (videoPlayer.isPlaying !== null && videoPlayer.isPlaying) {
            const player = playerRef.current?.getInternalPlayer();
            console.log(player);
            if (player === undefined) {
                return;
            }
            console.log('play');
            player.playVideo();
        }
        if (videoPlayer.duration !== null) {
            const player = playerRef.current?.getInternalPlayer();
            if (player === undefined) {
                return;
            }
            console.log(videoPlayer.duration);
            player.seekTo(videoPlayer.duration);
        }
        if (videoPlayer.duration) {
            handleSeek(videoPlayer.duration);
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
            isPaused: true
        });
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
        console.log(messageText);
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



    const handleSeek = (seconds: number) => {
        if (playerRef.current) {
            playerRef.current.seekTo(seconds, 'seconds');
            setShouldPlay(true);
        }
    };

    return (
        <RoomContext.Provider value={{ sendMessage }}>
            <Styles.RoomContainer>
                {
                    connection &&
                    <>
                        <ReactPlayer
                            ref={playerRef}
                            controls
                            url='https://www.youtube.com/watch?v=DAOZJPquY_w'
                            onPlay={onStart}
                            onReady={() => console.log("onReady")}
                            autoStart={true}
                            onStart={onStart}
                            onPause={onPause}
                            onError={() => console.log("onError")}
                            playing={true}
                            autoPlay={true}
                        />
                        <ChatField messages={messages} />
                        <RoomUsers users={users ?? []} />
                    </>
                }
            </Styles.RoomContainer>
        </RoomContext.Provider>
    );
};
