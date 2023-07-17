import styled from "@emotion/styled";

export const AuthenticationModal = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #271B85;
    border-radius: 15px;
    padding: 20px 40px;
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
`;

export const AuthenticationModalContainer = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 100;
`;