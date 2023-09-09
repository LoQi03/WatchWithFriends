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
    background-color: #4F5D75;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    gap: 10px;
    @media (max-width: 800px) {
        height: 50px;
    }
`;

export const UserImage = styled.img`
    cursor: pointer;
    height: 50px;
    width: 50px;
    border-radius: 100%;
    @media (max-width: 800px) {
        height: 30px;
        width: 30px;
    }
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
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 10px;
    padding-right: 10px;
    @media (max-width: 800px) {
        height: 30px;
    }
`;