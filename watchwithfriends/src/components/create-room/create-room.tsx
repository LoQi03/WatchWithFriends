import { Box, Modal } from "@mui/material";
import React, { useContext } from "react";
import { RoomsContext } from "../../pages/rooms/rooms";
import * as Styles from './styles';
import * as CommonStyles from '../../commonStyles';
import { AuthContext } from "../../services/authenticationContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { RoomDTO, RoomsApi } from "../../api";

export const CreateRoom = (): JSX.Element => {
    const roomApi = new RoomsApi();
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const createRoomContext = useContext(RoomsContext);
    const [roomName, setRoomName] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const close = (): void => {
        createRoomContext?.handleonClose();
    };
    const create = async (): Promise<void> => {
        if (!authContext?.currentUser) {
            return;
        }
        const room: RoomDTO = {
            name: roomName,
            password: password,
            creatorId: authContext?.currentUser.id??"",
        };
        const { data } = await roomApi.createRoom(room);
        await createRoomContext?.getRoomsAsync();
        toast.success("You have successfully created a room!");
        navigate(`/room/${data.id}`);
    };
    return (
        <Modal
            open={createRoomContext?.open || false}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box>
                <Styles.CreateRoomModalContainer>
                    <Styles.CreateRoomModal>
                        <Styles.CreateRoomHeader>
                        <CommonStyles.Title>Create Room</CommonStyles.Title>
                        <Styles.HeaderCloseIcon onClick={close}>{}</Styles.HeaderCloseIcon>
                        </Styles.CreateRoomHeader>
                        <Styles.CreateRoomInputFieldContainer>
                            <CommonStyles.GenericTextField value={roomName} onChange={e => setRoomName(e.target.value)} placeholder="Name" />
                            <CommonStyles.GenericTextField value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
                            <CommonStyles.GenericButton onClick={create}>Create</CommonStyles.GenericButton>
                        </Styles.CreateRoomInputFieldContainer>
                    </Styles.CreateRoomModal>
                </Styles.CreateRoomModalContainer>
            </Box>
        </Modal>
    );
};