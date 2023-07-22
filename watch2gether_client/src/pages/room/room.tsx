import React from 'react';
import { useParams } from 'react-router-dom';

export const RoomPage = (): JSX.Element => {
    const params = useParams();
    return (
        <div>
            <h1>{params.id}</h1>
        </div>
    )
};