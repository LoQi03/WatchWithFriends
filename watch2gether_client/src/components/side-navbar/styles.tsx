import styled from "@emotion/styled";
import { Box, List, ListItem } from "@mui/material";


export const Header = styled.div`
    max-height: 50px;
    display : flex;
    padding : 10px;
    background-color: #3928C2;
    position: fixed;
    top: 0;
    width: 100%;
`;

export const SettingsButton = styled.div`
    position: absolute;
    bottom: 20px;
`;
export const StyledList = styled(List)`
    border: none;
    padding: 0px;
`;

export const StyledListItem = styled(ListItem)`
    margin-bottom:5px;
    background-color: white;
    color: #3928C2;
`;

export const StyledBox = styled(Box)`
    width:300px;
    height:100%;
`;

export const StyledImage = styled.img`
    width: 100%;
    object-fit: cover;
    `;
export const StyledListItemForImage = styled(ListItem)`
    margin-bottom: 20px;
    padding: 10px;
    background-color: #3928C2;
    display: flex;
    justify-content: center;
    align-items: center;
`;