import styled from "@emotion/styled";
import { Theme } from "@emotion/react";
import * as CommonStyle from "../../commonStyles";
import UploadFileTwoToneIcon from '@mui/icons-material/UploadFileTwoTone';

export const ProfilePageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    border-radius: 10px;
    overflow-x: hidden;
    overflow-y: auto;
    gap:15px;
    @media (max-width: 800px) {
        width: 99%;
        border-radius: 0;
        gap:5px;
        height: 100%;
    }
`;
export const ProfilePageContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    gap: 30px;
    width: 100%;
    height: 100%;
    @media (max-width: 800px) {
        flex-direction: column;
        gap:1%;
        padding-bottom: 10px;
        padding-top: 10px;
        margin-bottom: 65px;
    }
`;
export const ProfilePageInputContainer = styled.div`
    width: 95%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    gap: 20px;
    justify-content: start;
    @media (max-width: 800px) {
       justify-content: space-between;
    }
`;

export const StyledImage = styled.img`
    height: 230px;
    width: 230px;
    border-radius: 50%;

    @media (max-width: 800px) {
        height: 150px;
        width: 150px;
    }
 `;

export const ChangePasswordLink = styled.a`
    color: white;
    font-size: 20px;
    text-decoration: none;
    cursor: pointer;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
    height: 250px;
    width: 250px;
`;
export const ProfileButtonStyle: Theme =
{
    backgroundColor: 'transparent',
    color: 'white',
    border: 'none',
    boxShadow: 'none',
    borderRadius: '50%',
    heigth: '230px',
    width: '230px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0',
    '@media (max-width: 800px)': {
        heigth: '150px',
        width: '150px',
    },
    '&:hover': {
        backgroundColor: 'transparent',
        opacity: '0.8',
        boxShadow: 'none'
    },
    '&:active': {
        backgroundColor: 'transparent',
        boxShadow: 'none'
    },
    '&:focus': {
        backgroundColor: 'transparent',
        boxShadow: 'none'
    }
}

export const UploadIcon = styled(UploadFileTwoToneIcon)`
    position: absolute;
    top: 1%;
    right:1%;
    color: white;
    background-color: #EF8354;
    font-size: 40px;
    padding: 10px;
    border-radius: 50%;
    @media (max-width: 800px) {
        font-size: 25px;
        top: 2%;
        right:15%;
    }
`;