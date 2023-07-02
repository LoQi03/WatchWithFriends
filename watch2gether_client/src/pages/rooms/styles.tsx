import styled from "@emotion/styled";


export const RoomsPageContainer = styled.div`
    min-width: 800px;
    min-height: 800px;
    max-height: 800px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    background-color: #4F4F4F;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    @media (max-width: 768px) {
        width: 100%;
        height: 100%;
    }
`;
export const HeaderBar = styled.div`
    display: flex;
    justify-content: space-between;
`;
export const RoomList = styled.div`
    width: 99%;
    height: 100%;
    margin-top: 15px;
    margin-bottom: 15px;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 10px;

        ::-webkit-scrollbar {
            width: 15px;
        }

        ::-webkit-scrollbar-track {
        opacity: 0;
        }

        ::-webkit-scrollbar-thumb {
        border-radius: 5px;
        width: 10px;
        background-color: gray;
        }

        ::-webkit-scrollbar-thumb:hover {
        background: #3928C2;
        }
`;

export const ActionBar = styled.div`
display: flex;
justify-content:end;
`;