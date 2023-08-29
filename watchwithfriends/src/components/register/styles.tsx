import styled from "@emotion/styled";
import * as CommonStyle from "../../commonStyles";
import { SxProps, Theme, createTheme } from "@mui/material";
import type { } from '@mui/x-date-pickers/themeAugmentation';

export const InputContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    gap: 20px;
    & a{
        color: white;
        font-size: 15px;
        text-decoration: none;
    }
    `;

export const SignUpButton = styled(CommonStyle.GenericButton)({
    width: "100%",
});

export const SignUpTextField = styled(CommonStyle.StyledTextField)({

});

export const DataPickerTheme: SxProps<Theme> = {
    colorScheme: 'dark',
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
    width: "100%",
};

export const datePickerTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#EF8354',
        },
    },
});
