import styled from "@emotion/styled";
import { Button, ButtonProps, TextField } from "@mui/material";

export const PageContainer = styled.div<{ backgroundImage?: string }>`
    padding-top: 80px;
    background-color: #271B85;
    align-items: center;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    background-image: url(${props => props.backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100%;
`;

export const StyledTextField = styled(TextField)({
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
        borderColor: "white",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "white",
        },
        "&:hover fieldset": {
            borderColor: "white",
        },
        "&.Mui-focused fieldset": {
            borderColor: "white",
        },
    },
    input: {
        '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 1000px #271B85 inset',
            backgroundColor: '#271B85 !important',
            WebkitTextFillColor: "white",
            caretColor: "white",
        },
    },

    marginTop: "10px",
    width: "300px"
});

export const GenericButton = (props: ButtonProps): JSX.Element => <Button
    variant="contained"
    style={{
        color: "white",
        backgroundColor: "#3928C2",
    }}
    {...props} />;

export const ErrorMassage = styled.p`
    color: red;
    font-size: 15px;
    `;
export const SignSwitchButton = styled.p`
    cursor: pointer;
`;
