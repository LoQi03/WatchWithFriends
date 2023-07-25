import React, { useContext, useState } from "react";
import * as Styles from './styles'
import * as CommonStyles from '../../../commonStyles'
import { ChatEntry } from "../chat-entry/chat-entry";
import SendIcon from '@mui/icons-material/Send';
import { ChatEntryDto } from "../../../models/chatEntryDto";
import { RoomContext } from "../../../pages/room/room";
import { TextField } from "@mui/material";

interface ChatFieldParams {
    messages: ChatEntryDto[]
}

export const ChatField = (props: ChatFieldParams): JSX.Element => {
    const roomContext = useContext(RoomContext);
    const [messageText, setMessageText] = useState<string>('');

    const send = (): void => {
        setMessageText(messageText);
        roomContext?.sendMessage(messageText);
    }

    return (
        <Styles.ChatFieldContainer>
            <Styles.ChatFieldContent>
                {
                    props.messages && props.messages.map((message, index) => <ChatEntry key={index} chatEntry={message} ></ChatEntry>)
                }
            </Styles.ChatFieldContent>
            <Styles.ChatFieldActionBar>
                <TextField id="outlined-multiline-static"
                    multiline
                    rows={1}
                    placeholder="Type something....."
                    sx={
                        {
                            width: "100%",
                            marginRight: "10px"
                        }
                    } value={messageText} onChange={e => setMessageText(e.target.value)} />
                <CommonStyles.GenericButton onClick={send} endIcon={<SendIcon />}>Send</CommonStyles.GenericButton>
            </Styles.ChatFieldActionBar>
        </Styles.ChatFieldContainer>
    );
}