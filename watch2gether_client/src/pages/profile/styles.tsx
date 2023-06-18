import styled from "@emotion/styled";
import * as CommonStyle from "../../commonStyles";
import { Theme } from "@emotion/react";

export const ProfilePageContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 20px;
background-color: #4F4F4F;
border-radius: 10px;
box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
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
    height: 200px;
    width: 200px;
    border-radius: 200px;
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
export const ChangeButtonStyle: Theme =
{
    marginTop: '30px',
    backgroundColor: '#3f51b5',
    color: 'white',
    width: '55%',
    '&:hover': { backgroundColor: '#3f51b5' },
    '&:active': { backgroundColor: '#3f51b5' },
    '&:focus': { backgroundColor: '#3f51b5' }
}