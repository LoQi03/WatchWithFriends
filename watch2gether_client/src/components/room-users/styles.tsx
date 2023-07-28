import styled from "@emotion/styled";


export const RoomUsersContainer = styled.div`
    overflow-y: hidden;
    overflow-x: auto;
    display: flex;
    width: 100%;
    height: 100px;
    background-color: white;
    justify-content: start;
    align-items: center;
    background-color: #3928C2;
    gap: 10px;
`;

export const UserImage = styled.img`
    cursor: pointer;
    height: 50px;
    width: 50px;
    border-radius: 100%;
 `;
export const UserImageContainer = styled.div`
    margin:0px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
 `;
export const UserName = styled.p`
    margin: 0;
    font-weight: 500;
    font-size: 16px;
    color: black;
    width: 100%;
    text-align: center;
`;
export const CurrentUserContainer = styled.div`
    margin:0px;
    height: 50px;
    width: 50px;
    border-right: 2px solid white;
    padding-left: 10px;
    padding-right: 10px;
`;