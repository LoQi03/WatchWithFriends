import styled from "@emotion/styled";
import { TextField, TextFieldProps } from "@mui/material";

export const ChatFieldContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    background-color: white;
    border-radius:20px;
    height:800px;
    max-height:800px;
    width:35%;
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
`;
export const RichTextField = (props: TextFieldProps): JSX.Element => <TextField
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