import styled from "@emotion/styled";
import { Button, ButtonProps, TextField } from "@mui/material";

export const PageContainer = styled.div<{ backgroundImage?: string, isLogin?: boolean }>`
     ${props => !props.isLogin && "margin-top: 60px;"}
    background-color: #2D3142;
    align-items: center;
    width: 100%;
    display: flex;
    overflow-y: auto;
    flex-direction: column;
    justify-content: start;
    background-image: url(${props => props.backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100%;
    @media screen and (max-width: 800px) {
        padding-top: 0px;
        margin-top: 0px;
        ${props => !props.isLogin && "margin-bottom: 65px;"}
    }
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
            WebkitBoxShadow: '0 0 0 1000px #2D3142 inset',
            backgroundColor: '#2D3142 !important',
            WebkitTextFillColor: "white",
            caretColor: "white",
        },
    },
    '@media (max-width: 800px)': {
        "& .MuiInputBase-input": {
            border: "none",
            borderBottom: "1px solid white",
            borderRadius: "0",
            color: "white",
        },
        "& .MuiInputLabel-root": {
            border: "none",
            borderBottom: "1px solid white",
            borderRadius: "0",
            color: "white",
        },
        "& .MuiInputLabel-root.Mui-focused": {
            border: "none",
            borderBottom: "1px solid white",
            borderRadius: "0",
            color: "white",
        },
        "& .MuiIconButton-root": {
            border: "none",
            borderRadius: "0",
            color: "white",
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
            border: "none",
            borderBottom: "1px solid white",
            borderRadius: "0",
            padding: "0",
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
                WebkitBoxShadow: '0 0 0 1000px #2D3142 inset',
                backgroundColor: '#2D3142 !important',
                WebkitTextFillColor: "white",
                caretColor: "white",
                borderRadius: "0",
            },
        },
    },
    width: "100%"
});

export const GenericButton = (props: ButtonProps): JSX.Element => <Button
    variant="contained"
    sx={{
        color: "white",
        backgroundColor: "#EF8354",
        width: "100%",
        height: "55px",
        fontSize: "20px",
        fontWeight: "bold",
        '@media (max-width: 800px)': {
            height: "40px",
        },
        '&:hover': {
            backgroundColor: "#C76D46",
        },
    }}
    {...props} />;

export const ErrorMassage = styled.p`
    color: red;
    font-size: 15px;
 `;
export const SignSwitchButton = styled.p`
    cursor: pointer;
    color:#EF8354;
    text-decoration: underline;
    font-size: 17px;
`;