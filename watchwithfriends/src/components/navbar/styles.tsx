import styled from "@emotion/styled";
import { BottomNavigation, BottomNavigationAction, MenuItem } from "@mui/material";



export const Navbar = styled.div`
    display: flex;
    align-items: center;
    display : flex;
    padding-x : 10px;
    background-color: #4F5D75;
    position: fixed;
    top: 0;
    min-height: 60px;
    max-height: 60px;
    width: 100%;
    @media screen and (max-width: 800px) {
        display: none;
    }
`;

export const NavbarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
`;

export const StyledImage = styled.img`
    height: 35px;
    object-fit: cover;
    cursor:pointer;
 `;


export const ProfileImage = styled.img`
    height: 50px;
    width: 50px;
    border-radius: 50%;
    cursor: pointer;
    object-fit: auto;
`;

export const LinkContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 20px;
    padding: 10px 30px;
`;

export const Link = styled.a`
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 10px;
    color: white;
    font-size: 22px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
        color: #EF8354;
    }
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

export const NavbarButtons = styled(BottomNavigation)`
    z-index: 100;
    display: flex;
    width: 100%;
    background-color: #4F5D75;
    position: fixed;
    bottom: 0;
    height: 65px;
    @media screen and (min-width: 800px) {
        display: none;
    }
`;
export const BottomNavigationLink = styled(BottomNavigationAction)`
    color: white;
    &.Mui-selected {
        color: #EF8354;
    }
`;