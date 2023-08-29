import styled from "@emotion/styled";
import * as CommonStyle from "../../commonStyles";

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
    `;
export const SignInButton = styled(CommonStyle.GenericButton)({
    width: "100%",
});

export const SignInTextField = styled(CommonStyle.StyledTextField)({
    color: "white",
});