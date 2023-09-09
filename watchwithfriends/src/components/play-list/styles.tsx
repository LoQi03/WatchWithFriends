import styled from "@emotion/styled";
import DeleteIcon from '@mui/icons-material/Delete';

export const PlayListContainer = styled.div`
    width: 100%;
    max-width: 100%;
    height: 30dvh;
    max-height: 30dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #4F5D75;
    color: white;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    @media screen and (max-width: 800px) {
        zoom: 0.8;
    };
`;
export const PlayList = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 10px;
`;

export const PlayListItemImage = styled.img`
    width: 150px;
`;
export const PlayListItem = styled.div`
    padding: 15px;
    width: 92%;
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    background-color:#2D3142;
    gap: 20px;
`;
export const PlayListItemTitle = styled.div`
    font-size: 20px;
    font-weight: bold;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: start;
    justify-content: start;
    text-overflow: ellipsis;
    padding-top: 20px;
    padding-left: 20px;
`;
export const PlayListItemDelete = styled(DeleteIcon)`
    color: #EA3C53;
    cursor: pointer;
    width: 30px;
    height: 30px;
`;