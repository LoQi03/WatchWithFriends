import styled from "@emotion/styled";
import * as CommonStyle from "../../commonStyles";
import { Theme } from "@emotion/react";

export const ProfilePageContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 20px;
border-radius: 10px;
@media (max-width: 768px) {
    zoom: 0.65;
}
`;
export const ProfilePageContent = styled.div`
display: flex;
justify-content: space-between;
align-items: start;
`;
export const ProfilePageInputContainer = styled.div`
margin-left: 40px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

export const StyledImage = styled.img`
    height: 230px;
    width: 230px;
    border-radius: 50%;
    margin-bottom: 20px;
 `;

export const ChangePasswordLink = styled.a`
    margin-top: 20px;
    color: white;
    font-size: 20px;
    text-decoration: none;
    cursor: pointer;
`;

export const ProfilePageTextField = styled(CommonStyle.StyledTextField)({
    marginTop: "20px",
});
export const ButtonContainer = styled.div`
    display: flex;
    justify-content: end;
    margin-top: 20px;
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
    paddingX: '30px',
    backgroundColor: '#EF8354',
    color: 'white',
    '&:hover': { backgroundColor: '#EF8354' },
    '&:active': { backgroundColor: '#EF8354' },
    '&:focus': { backgroundColor: '#EF8354' }
}