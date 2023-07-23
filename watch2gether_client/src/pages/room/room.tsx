import React from 'react';
import { useParams } from 'react-router-dom';
import { ChatEntry } from '../../components/chat/chat-entry/chat-entry';
import { AuthContext } from '../../services/authenticationContext';

export const RoomPage = (): JSX.Element => {
    const authContext = React.useContext(AuthContext);
    const params = useParams();
    return (
        <>
            <h1>{params.id}</h1>
            <div style={{ width: '30%', backgroundColor: 'white', padding: '10px' }}>
                <ChatEntry date={new Date()} name='Máté' message='test' id={authContext?.currentUser?.id!}></ChatEntry>
                <ChatEntry date={new Date()} name='Valaki' message='test' id={'bbc92a31-c449-4081-9169-89ed459d5cff'}></ChatEntry>
                <ChatEntry date={new Date()} name='Máté' message='test' id={authContext?.currentUser?.id!}></ChatEntry>
                <ChatEntry date={new Date()} name='Valaki' message='test' id={'bbc92a31-c449-4081-9169-89ed459d5cff'}></ChatEntry>
                <ChatEntry date={new Date()} name='Máté' message='test' id={authContext?.currentUser?.id!}></ChatEntry>
                <ChatEntry date={new Date()} name='Valaki' message='test' id={'bbc92a31-c449-4081-9169-89ed459d5cff'}></ChatEntry>
                <ChatEntry date={new Date()} name='Máté' message='test' id={authContext?.currentUser?.id!}></ChatEntry>
                <ChatEntry date={new Date()} name='Valaki' message='test' id={'bbc92a31-c449-4081-9169-89ed459d5cff'}></ChatEntry>
                <ChatEntry date={new Date()} name='Máté' message='test' id={authContext?.currentUser?.id!}></ChatEntry>
                <ChatEntry date={new Date()} name='Valaki' message='test' id={'bbc92a31-c449-4081-9169-89ed459d5cff'}></ChatEntry>
            </div>
        </>
    )
};