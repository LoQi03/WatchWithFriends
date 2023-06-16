import styled from "@emotion/styled";
import { Button, ButtonProps, TextField } from "@mui/material";

export const PageContainer = styled.div<{ backgroundImage?: string }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url(${props => props.backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100%;
    width: 100%;
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
            WebkitBoxShadow: '0 0 0 1000px #4F4F4F inset',
            backgroundColor: '#4F4F4F !important',
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