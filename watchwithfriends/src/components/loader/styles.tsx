import styled from "@emotion/styled";

export const LoaderContainer = styled.div`
    position: absolute;
    z-index: 9999;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.5);
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
`;
export const Loader = styled.div`
    width: 150px;
    height: 150px;
    position: fixed;
    border-radius: 50%;
    border: none;
    border-top: 5px solid #EF8354;
    animation: spin 2s linear infinite;
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        } 
    }
`;