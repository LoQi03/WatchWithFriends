import { Box, Modal } from "@mui/material";
import React, { useContext } from "react";
import { RoomContext } from "../../pages/rooms/rooms";
import * as Styles from './styles';
import * as CommonStyles from '../../commonStyles';

export const CreateRoom = (): JSX.Element => {
    const createRoomContext = useContext(RoomContext);

    const close = (): void => {
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
                            <CommonStyles.StyledTextField placeholder="Room Name" />
                            <CommonStyles.StyledTextField placeholder="Password" type="password" />
                        </Styles.CreateRoomInputFieldContainer>
                        <Styles.CreateRoomActionBar>
                            <CommonStyles.GenericButton>Create</CommonStyles.GenericButton>
                        </Styles.CreateRoomActionBar>
                    </Styles.CreateRoomModal>
                </Styles.CreateRoomModalContainer>
            </Box>
        </Modal>
    );
};