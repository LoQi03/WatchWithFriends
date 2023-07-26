import styled from "@emotion/styled";


export const RoomUsersContainer = styled.div`
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 15px;
    margint-left: 20px;
    border-radius: 20px;
`;

export const UserImage = styled.img`
    margin-top: 10px;
    cursor: pointer;
    height: 60px;
    width: 60px;
    border-radius: 50%;
 `;
export const UserImageContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
 `;
export const UserName = styled.p`
    margin: 0;
    font-weight: 500;
    font-size: 16px;
    color: black;
    width: 100%;
`;