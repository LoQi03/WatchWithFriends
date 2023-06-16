import styled from "@emotion/styled";
import * as CommonStyle from "../../commonStyles";

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & a{
        margin-top: 20px;
        color: white;
        font-size: 15px;
        text-decoration: none;
    }
    `;
export const SignUpButton = styled(CommonStyle.GenericButton)({
    marginTop: "20px"
});

export const SignUpTextField = styled(CommonStyle.StyledTextField)({
    marginTop: "20px",
});