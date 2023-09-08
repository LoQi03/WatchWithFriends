import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

export const ChatFieldContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    background-color: #2D3142;
    height:80dvh;
    max-height:80dvh;
    max-width:100%;
    width:100%;
`;
export const ChatFieldContent = styled.div`
    overflow-x:hidden;
    overflow-y:auto;
    height:100%;
    padding:20px;
 `;
export const ChatFieldActionBar = styled.div`
    display:flex;
    padding:10px;
    align-items:center;
    background-color:#4F5D75;
`;
export const RichTextField = (): JSX.Element => <TextField
    id="outlined-multiline-static"
    multiline
    rows={1}
    placeholder="Type something....."
    sx={
        {
            width: "100%",
            marginRight: "10px"
        }
    }
/>

export const SendButton = styled(SendIcon)`
    color: white;
    cursor: pointer;
    width: 30px;
    height: 30px;
`;