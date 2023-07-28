import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
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
import { OnProgressProps } from 'react-player/base';

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
    const [playedSeconds, setPlayedSeconds] = useState(0);
    const [shouldPlay, setShouldPlay] = useState(false);
    const playerRef = useRef<ReactPlayer>(null);
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
                    setMessages((prevMessages) => [...prevMessages, message]);
                });

                roomConnection.on('GetRoomUsers', async (users: UserDto[]) => {
                    setUsers(users);
                    console.log(users);
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
    }, [connection, params.id, authContext?.currentUser?.id, authContext?.currentUser?.name]);

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
        console.log(messages);
        connection?.invoke("SendMessage", message);
        console.log(messages);
    };

    const handleProgress = (state: OnProgressProps) => {
        setPlayedSeconds(state.playedSeconds);
        console.log(playedSeconds);
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
                            onProgress={handleProgress}
                            onReady={() => console.log("onReady")}
                            onStart={() => console.log("onStart")}
                            onPause={() => console.log("onPause")}
                            onError={() => console.log("onError")}
                            playing={shouldPlay}
                        />
                        <ChatField messages={messages} />
                        <RoomUsers users={users ?? []} />
                        <button onClick={() => handleSeek(playedSeconds + 10)}>+10</button>
                    </>
                }
            </Styles.RoomContainer>
        </RoomContext.Provider>
    );
};
