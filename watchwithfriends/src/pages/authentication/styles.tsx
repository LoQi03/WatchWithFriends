import styled from "@emotion/styled";

export const AuthenticationModal = styled.div`
    margin-left: 40px;
    width: 700px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    border-radius: 15px;
    padding: 20px 40px;
    background-color: #2D3142;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
`;

export const AuthenticationModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    width: 100%;
    height: 100%;
`;
export const StyledImage = styled.img`
    width: 100%;
    object-fit: cover;
    cursor:'pointer' 
 `;