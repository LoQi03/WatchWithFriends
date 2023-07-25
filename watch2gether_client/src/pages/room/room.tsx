import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../services/authenticationContext';
import * as signalR from '@microsoft/signalr';
import * as AppConfig from '../../AppConfig';
import { ChatField } from '../../components/chat/chat-field/chat-field';
import { ChatEntryDto } from '../../models/chatEntryDto';

export interface RoomContextType {
    sendMessage: (messageText: string) => Promise<void>;
}

export const RoomContext = createContext<RoomContextType | null>(null);

export const RoomPage = (): JSX.Element => {
    const authContext = React.useContext(AuthContext);
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [messages, setMessages] = useState<ChatEntryDto[]>([]);
    const params = useParams();

    useEffect(() => {
        const startConnection = async () => {
            const roomConnection = new signalR.HubConnectionBuilder()
                .withUrl(AppConfig.GetConfig().apiUrl + 'roomHub')
                .withAutomaticReconnect()
                .build();

            // Eseménykezelő a kapcsolat lezárásához
            roomConnection.onclose((error) => {
                console.error('A kapcsolat lezárult:', error);
            });

            roomConnection.on('ReciveMessage', (message: ChatEntryDto) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });

            try {
                await roomConnection.start();
                console.log('Kapcsolódva a chat hubhoz.');
                setConnection(roomConnection);
            } catch (err) {
                console.error('Hiba a hubhoz való csatlakozáskor:', err);
            }
        };
        if (!connection) {
            startConnection();
        }

        /*return () => {
            if (connection) {
                connection.stop();
            }
        };*/
    }, [connection]);

    const sendMessage = async (messageText: string): Promise<void> => {
        console.log(messageText);
        const message: ChatEntryDto = {
            message: messageText,
            roomId: params.id ?? "",
            userId: authContext?.currentUser?.id ?? "",
            messageTime: new Date(),
            name: authContext?.currentUser?.name ?? ""
        };
        console.log(message);
        connection?.invoke("SendMessage", message);
    };

    return (
        <RoomContext.Provider value={{ sendMessage }}>
            <ChatField messages={messages} />
        </RoomContext.Provider>
    );
};
