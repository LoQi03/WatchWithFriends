import styled from "@emotion/styled";

export const CreateRoomModalContainer = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 100;
`;

export const CreateRoomActionBar = styled.div`
    margin-top: 20px;
`;

export const CreateRoomInputFieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
    margin-top: 20px;
    width: 100%;
    margin-bottom: 20px;
    @media screen and (max-width: 800px) {
        width: 90%;
    }
`;

export const CreateRoomModal = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #2D3142;
    border-radius: 15px;
    padding: 20px 40px;
    width: 700px;
    opacity: 0;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    animation: show 1s forwards;
    animation-delay: .6s;
    transition: .5s;
    @keyframes show{
        0%{
            transform: translateY(100px);
            opacity: 0;
        }
        100%{
            transform: translateY(0px);
            opacity: 1;
        }
    }
    @media screen and (max-width: 800px) {
        align-items: center;
        overflow:hidden;
        height: 100dvh;
        width: 100dvw;
        margin: 0;
        border-radius: 0;
    }
`;
export const CloceLink = styled.a`
    display: none;
    position: absolute;
    top: 8%;
    right: 11%;
    color: white;
    font-size: 25px;
    cursor: pointer;
    transition: .3s;
    &:hover{
        color: #EF8354;
    }
    underline: none;
    @media screen and (max-width: 800px) {
        display: block;
    }
    opacity: 0;
    animation: show 1s forwards;
    animation-delay: .6s;
    transition: .5s;
    @keyframes show{
        0%{
            transform: translateY(100px);
            opacity: 0;
        }
        100%{
            transform: translateY(0px);
            opacity: 1;
        }
    }
`;