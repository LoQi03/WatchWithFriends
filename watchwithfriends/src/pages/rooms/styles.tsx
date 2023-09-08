import styled from "@emotion/styled";

export const RoomsPageContainer = styled.div`
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
    @media screen and (max-width: 800px) {
        width: 95%;
    }
`;
export const HeaderBar = styled.div`
    margin-top: 20px;
    display: flex;
    gap: 20px;
    width: 95%;
`;
export const RoomList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    margin-top: 15px;
    margin-bottom: 15px;
    overflow-y: auto;
    overflow-x: hidden;
    padding:20px;
    max-height:70vh;

        ::-webkit-scrollbar {
            width: 15px;
        }

        ::-webkit-scrollbar-track {
        opacity: 0;
        }

        ::-webkit-scrollbar-thumb {
        border-radius: 5px;
        width: 10px;
        background-color:  #EF8354;
        }

        ::-webkit-scrollbar-thumb:hover {
        background: #EF8354;
        }
`;

export const RoomListContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    height: 100%;
`;