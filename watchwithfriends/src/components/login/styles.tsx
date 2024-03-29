import styled from "@emotion/styled";

export const InputContainer = styled.div`
    padding-top: 5px;
    padding-bottom: 5px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    justify-content: center;
    & p{
        margin-top: 20px;
        font-size: 17px;
        text-decoration: none;
    }
     @media screen and (max-width: 800px) {
        width: 90%;
    }
    `;
export const LinkContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
`;