import styled from "@emotion/styled";

export const ChatEntryContainer = styled.div<{ isCurrentUser: boolean }>`
    margin-top: 10px;
    display: flex;
    gap: 10px;
    align-items: end;
    justify-content: ${props => props.isCurrentUser ? "end" : "start"};
    width: 100%;
`;

export const ChatEntryContent = styled.div<{ isCurrentUser: boolean }>`
    max-width: 80%;
    border-radius: 10px;
    background-color: ${props => props.isCurrentUser ? "#EF8354" : "#2D3142"};
    padding: 20px;
    white-space: auto;
    word-spacing: 5px;
    line-height: 1.4;
    text-align: justify;
    font-weight: 550;
    font-size: 15px;
`;

export const ChatEntryImage = styled.img`
    cursor: pointer;
    margin-right: 10px;
    height: 50px;
    width: 50px;
    border-radius: 50%;
 `;

export const CurrentUserChatEntryName = styled.p`
    margin-left: 70px;
    margin-right: 0px;
    margin-bottom: 10px;
    margin-top: 20px;
    color: black;
    font-weight: 500;
    font-size: 16px;
`;

export const OtherUserChatEntryName = styled.p`
    margin-left: 0px;
    margin-right: 70px;
    margin-bottom: 10px;
    margin-top: 20px;
    color: black;
    font-weight: 500;
    font-size: 16px;
`;
export const OtherUserChatEntryNameContainer = styled.div`
    display: flex;
    justify-content: end;
`;