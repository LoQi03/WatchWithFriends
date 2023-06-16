import styled from "@emotion/styled";
import * as CommonStyle from "../../commonStyles";
import { SxProps, Theme } from "@mui/material";
import type { } from '@mui/x-date-pickers/themeAugmentation';

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & a{
        margin-top: 20px;
        color: white;
        font-size: 15px;
        text-decoration: none;
    }
    `;
export const SignUpButton = styled(CommonStyle.GenericButton)({
    marginTop: "20px"
});

export const SignUpTextField = styled(CommonStyle.StyledTextField)({
    marginTop: "20px",
});

export const DataPickerTheme: SxProps<Theme> = {
    colorScheme: 'light',
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
    marginTop: "10px",
    width: "300px"
};
