import { useContext, useState } from "react";
import * as Styles from './styles';
import { ChatEntry } from "../chat-entry/chat-entry";
import { TextField } from "@mui/material";
import { RoomContext } from "../../../services/roomContext";
import { theme } from "../../../theme";
import { RoomUsers } from "../../room-users/room-users";
import { ChatEntryDTO } from "../../../api";

interface ChatFieldParams {
    messages: ChatEntryDTO[];
}

export const ChatField: React.FC<ChatFieldParams> = (props: ChatFieldParams) => {
    const roomContext = useContext(RoomContext);
    const [messageText, setMessageText] = useState<string>('');

    const send = (): void => {
        if (!messageText || messageText.length === 0) return;
        roomContext?.sendMessage(messageText);
        setMessageText('');
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            send();
        }
    };

    return (
        <Styles.ChatFieldContainer>
            <RoomUsers users={roomContext?.users ?? []} />
            <Styles.ChatFieldContent>
                {props.messages && props.messages.map((message, index) => <ChatEntry key={index} chatEntry={message} />)}
            </Styles.ChatFieldContent>
            <Styles.ChatFieldActionBar>
                <TextField
                    id="outlined-multiline-static"
                    placeholder="Type something....."
                    sx={{
                        padding: "0px",
                        margin: "0px",
                        width: "100%",
                        marginRight: "10px",
                        borderRadius: "5px",
                        backgroundColor: theme.palette.primary.main,
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
                    }}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <Styles.SendButton onClick={send} />
            </Styles.ChatFieldActionBar>
        </Styles.ChatFieldContainer>
    );
};
