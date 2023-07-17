import styled from "@emotion/styled";

export const RoomsPageContainer = styled.div`
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 20px;
`;
export const HeaderBar = styled.div`
    display: flex;
    justify-content: space-between;
`;
export const RoomList = styled.div`
    width: 100%;
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
        background-color:  #3928C2;
        }

        ::-webkit-scrollbar-thumb:hover {
        background: #3928C2;
        }
`;

export const ActionBar = styled.div`
    display: flex;
    justify-content:end;
`;