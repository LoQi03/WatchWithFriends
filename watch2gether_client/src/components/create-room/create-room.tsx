import { Box, Modal } from "@mui/material";
import React, { useContext } from "react";
import { RoomContext } from "../../pages/rooms/rooms";
import * as Styles from './styles';
import * as CommonStyles from '../../commonStyles';
import * as API from '../../api/roomManagmentAPI';
import { RoomDto } from "../../models/roomDto";
import { AuthContext } from "../../services/authenticationContext";

export const CreateRoom = (): JSX.Element => {
    const authContext = useContext(AuthContext);
    const createRoomContext = useContext(RoomContext);
    const [roomName, setRoomName] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const close = (): void => {
        createRoomContext?.handleonClose();
    };
    const create = async (): Promise<void> => {
        const room: RoomDto = {
            name: roomName,
            password: password,
            creator: authContext?.currentUser?.id || '',
        };
        await API.createRoom(room);
        await createRoomContext?.getRoomsAsync();
        createRoomContext?.handleonClose();
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
                        <h1>Create Room</h1>
                        <Styles.CreateRoomInputFieldContainer>
                            <CommonStyles.StyledTextField value={roomName} onChange={e => setRoomName(e.target.value)} placeholder="Name" />
                            <CommonStyles.StyledTextField value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
                        </Styles.CreateRoomInputFieldContainer>
                        <Styles.CreateRoomActionBar>
                            <CommonStyles.GenericButton onClick={create}>Create</CommonStyles.GenericButton>
                        </Styles.CreateRoomActionBar>
                    </Styles.CreateRoomModal>
                </Styles.CreateRoomModalContainer>
            </Box>
        </Modal>
    );
};