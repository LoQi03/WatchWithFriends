import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChatEntry } from '../../components/chat/chat-entry/chat-entry';
import { AuthContext } from '../../services/authenticationContext';
import * as signalR from '@microsoft/signalr';
import * as AppConfig from '../../AppConfig';

export const RoomPage = (): JSX.Element => {
    const authContext = React.useContext(AuthContext);
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const params = useParams();

    useEffect(() => {

        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(AppConfig.GetConfig().apiUrl + 'roomHub')
            .withAutomaticReconnect()
            .build();

        if (!connection) {
            newConnection
                .start()
                .then(() => {
                    console.log('Kapcsolódva a chat hubhoz.');
                })
                .catch((err) => console.error('Hiba a hubhoz való csatlakozáskor:', err));

            setConnection(newConnection);
        }
        return () => {
            if (connection) {
                connection.stop();
            }
        };
    }, [connection, setConnection]);

    return (
        <>
            <h1>{params.id}</h1>
            <div style={{ width: '30%', backgroundColor: 'white', padding: '10px' }}>
                <ChatEntry date={new Date()} name='Máté' message='test' id={authContext?.currentUser?.id!}></ChatEntry>
                <ChatEntry date={new Date()} name='Valaki' message='test' id={'bbc92a31-c449-4081-9169-89ed459d5cff'}></ChatEntry>
            </div>
        </>
    )
};