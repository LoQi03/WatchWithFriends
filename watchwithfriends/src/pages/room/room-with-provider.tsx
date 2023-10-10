import { useNavigate, useParams } from "react-router-dom";
import { RoomProvider } from "../../services/roomContext";
import { RoomPage } from "./room";
import * as API from "../../api/roomManagmentAPI";
import { KeyboardEventHandler, useCallback, useContext, useMemo, useState } from "react";
import * as Styles from "./styles";
import * as CommonStyles from "../../commonStyles";
import { Loader } from "../../components/loader/loader";
import { RoomDto } from "../../models/roomDto";
import { AuthContext } from "../../services/authenticationContext";
import toast from "react-hot-toast";


export const RoomPageWithProvider: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [room, setRoom] = useState<RoomDto | null>(null);
    const authContext = useContext(AuthContext);
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();
    const navigate = useNavigate();



    const getRoom = useCallback(async (): Promise<void> => {
        try {
            if (!params.id) {
                return;
            }
            try {
                setIsLoading(true);
                try {
                    const { data } = await API.getRoomById(params.id);
                    setRoom(data);
                    if (!data.id || !authContext?.currentUser?.id) {
                        console.log("No room id or user id");
                        return;
                    }
                    if (data.roomUsers?.find(x => x.userId === authContext?.currentUser?.id)) {
                        toast.error("You are already in this room!");
                        navigate("/rooms");
                    }
                    const response = await API.verifyRoomConnection(data.id, authContext?.currentUser?.id, password);
                    console.log(response);
                    setIsAuthenticated(response.data);
                } catch (error) {
                    toast.error("Room doesn't exist!");
                    navigate("/rooms");
                }

            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
            setIsLoading(false);
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
    const handlePasswordSubmit = async () => {
        try {
            if (!params.id) {
                return;
            }
            if (!authContext?.currentUser?.id) {
                return;
            }
            if (!password) {
                return;
            }
            setIsLoading(true);
            const response = await API.verifyRoomConnection(params.id, authContext?.currentUser?.id, password);
            setIsAuthenticated(response.data);
            if (response.data == true) {
                toast.success("You have successfully joined the room!");
                setIsLoading(false);
                return;
            }
            toast.error("Wrong password!");
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            navigate("/rooms");
        }
        setIsLoading(false);
    };
    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
        if (event.key === 'Enter') {
            handlePasswordSubmit();
        }
    };
    return (
        <>
            {isLoading && <Loader />}
            {
                room &&
                    isAuthenticated ? params.id &&
                <RoomProvider id={params.id}>
                    <RoomPage />
                </RoomProvider>
                    :
                    <Styles.PasswordRoomInputFieldContainer>
                        <Styles.PasswordRoomInputFieldContainer>
                            <Styles.LockIconStyled />
                            <CommonStyles.StyledTextField onKeyDown={handleKeyDown} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                            <CommonStyles.GenericButton onClick={handlePasswordSubmit}>Submit</CommonStyles.GenericButton>
                        </Styles.PasswordRoomInputFieldContainer>
                    </Styles.PasswordRoomInputFieldContainer>
            }
        </>
    );
};