import { useParams } from "react-router-dom";
import { RoomProvider } from "../../services/roomContext";
import { RoomPage } from "./room";

export const RoomPageWithProvider: React.FC = () => {
    const params = useParams();

    return (
        <>
            {
                params.id &&
                <RoomProvider id={params.id}>
                    <RoomPage />
                </RoomProvider>
            }
        </>
    );
};