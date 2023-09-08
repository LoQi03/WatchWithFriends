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
    width: "100%"
});

export const GenericButton = (props: ButtonProps): JSX.Element => <Button
    variant="contained"
    style={{
        color: "white",
        backgroundColor: "#EF8354",
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
