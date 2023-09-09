import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

export const ChatFieldContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    background-color: #2D3142;
    height:100%;
    max-height:100%;
    gap:10px;
    width:100%;
    @media (max-width: 800px) {
        zoom: 0.8;
    }
`;
export const ChatFieldContent = styled.div`
    overflow-x:hidden;
    overflow-y:auto;
    height:100%;
    padding:20px;
    border-top: 5px solid #4F5D75;
 `;
export const ChatFieldActionBar = styled.div`
    display:flex;
    align-items:center;
    padding:5px;
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