import { useParams } from "react-router-dom";
import { RoomProvider } from "../../services/roomContext";
import { RoomPage } from "./room";
import * as API from "../../api/roomManagmentAPI";
import { useCallback, useContext, useMemo, useState } from "react";
import * as Styles from "./styles";
import * as CommonStyles from "../../commonStyles";
import { Loader } from "../../components/loader/loader";
import { RoomDto } from "../../models/roomDto";
import { AuthContext } from "../../services/authenticationContext";


export const RoomPageWithProvider: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [room, setRoom] = useState<RoomDto | null>(null);
    const authContext = useContext(AuthContext);
    const [password, setPassword] = useState<string>("");
    const params = useParams();


    const getRoom = useCallback(async (): Promise<void> => {
        try {
            if (!params.id) {
                return;
            }
            const { data } = await API.getRoomById(params.id);
            setRoom(data);
            if (data.creatorId == authContext?.currentUser?.id) {
                setIsAuthenticated(true);
            }
        }
        catch (error) {
            console.log(error);
        };
    }, [params.id, authContext?.currentUser?.id]);

    useMemo(() => {
        if (room) {
            return;
        }
        getRoom();
    }, [room, getRoom]);
    return (
        <>
            {
                room &&
                    isAuthenticated ? params.id &&
                <RoomProvider id={params.id}>
                    <RoomPage />
                </RoomProvider>
                    : <Styles.PasswordModalContainer>
                        <Styles.PasswordRoomInputFieldContainer>
                            <CommonStyles.StyledTextField value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                            <CommonStyles.GenericButton>Submit</CommonStyles.GenericButton>
                        </Styles.PasswordRoomInputFieldContainer>
                    </Styles.PasswordModalContainer>
            }
        </>
    );
};