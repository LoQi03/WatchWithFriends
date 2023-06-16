import styled from "@emotion/styled";
import * as CommonStyle from "../../commonStyles";

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & p{
        margin-top: 20px;
        font-size: 17px;
        text-decoration: none;
    }
    `;
export const SignInButton = styled(CommonStyle.GenericButton)({
    marginTop: "20px"
});

export const SignInTextField = styled(CommonStyle.StyledTextField)({
    marginTop: "20px",
});