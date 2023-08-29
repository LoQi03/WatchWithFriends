import styled from "@emotion/styled";
import { Box, List, ListItem, MenuItem } from "@mui/material";


export const Header = styled.div`
    display: flex;
    align-items: center;
    display : flex;
    padding-x : 10px;
    background-color: #4F5D75;
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
    height: 100%;
`;

export const StyledListItem = styled(ListItem)`
    margin-bottom:5px;
    background-color: white;
    color: #EF8354;
`;

export const StyledBox = styled(Box)`
    width:300px;
    height:100%;
    overflow-y: hidden;
`;

export const StyledImage = styled.img`
    height: 35px;
    object-fit: cover;
    cursor:'pointer' 
 `;

export const StyledListItemForImage = styled(ListItem)`
    padding:40px;
    width: 100%;
    background-color: #4F5D75;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ProfileImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    `;

export const StyledMenuItem = styled(MenuItem)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #2D3142;
`;

export const StyledMenuItemButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 100px;
`;

export const StyledNavbar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width:100%;
    height: 100%;
`;
