import { useContext, useState } from "react";
import * as Styles from './styles'
import { ChatEntry } from "../chat-entry/chat-entry";
import { ChatEntryDto } from "../../../models/chatEntryDto";
import { TextField } from "@mui/material";
import { RoomContext } from "../../../services/roomContext";

interface ChatFieldParams {
    messages: ChatEntryDto[]
}

export const ChatField: React.FC<ChatFieldParams> = (props: ChatFieldParams) => {
    const roomContext = useContext(RoomContext);
    const [messageText, setMessageText] = useState<string>('');

    const send = (): void => {
        if (!messageText || messageText.length === 0) return;
        setMessageText(messageText);
        roomContext?.sendMessage(messageText);
        setMessageText('');
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
                            marginRight: "10px",
                            borderRadius: "5px",
                            backgroundColor: "#2D3142",
                            "& .MuiInputBase-input": {
                                color: "white",
                            },
                            "& .MuiInputLabel-root": {
                                color: "white",
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "white",
                            },
                            "& .MuiIconButton-root": {
                                color: "white",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                color: "white",
                            },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    border: "0",
                                },
                                "&:hover fieldset": {
                                    border: "0",
                                },
                                "&.Mui-focused fieldset": {
                                    border: "0",
                                },
                            },
                        }
                    } value={messageText} onChange={e => setMessageText(e.target.value)} />
                <Styles.SendButton onClick={send} />
            </Styles.ChatFieldActionBar>
        </Styles.ChatFieldContainer>
    );
}