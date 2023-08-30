import styled from "@emotion/styled";


export const RoomListItemHeader = styled.div`
    font-size: 30px;
    font-weight: bold;
    margin-left: 15px;
    margin-top: 10px;
`;

export const RoomListItemContainer = styled.div`
    cursor: pointer;
    width: 80%;
    padding : 10px;
    background-color: #4F5D75;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    &:hover {
        background-color: #EF8354;
    };
`;

export const RoomListItemContentContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    align-items: space-between;
`;

export const RoomListItemImage = styled.img`
    width: 100px;
    height: 100px;
`;

export const RoomListItemInfo = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    align-items: end;
    font-size: 20px;
    gap: 5px;
    width: 80%;
`;