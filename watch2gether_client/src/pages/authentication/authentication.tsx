import * as React from 'react';
import * as CommonStyle from '../../commonStyles';
import * as Style from './styles';
import backGroundImg from '../../assets/images/background.jpg';
import { LoginForm } from '../../components/login/login';
import { RegistrationForm } from '../../components/register/register';

export interface AuthenticationFormProps {
    formChangeHandler: () => void;
}

export const AuthenticationPage = (): JSX.Element => {
    const [isLogin, setIsLogin] = React.useState(true);
    const formChangeHandler = () => {
        setIsLogin((prev) => !prev);
    };
    return (
        <CommonStyle.PageContainer backgroundImage={backGroundImg}>
            <Style.AuthenticationModal>
                {isLogin ? <LoginForm formChangeHandler={formChangeHandler} ></LoginForm> : <RegistrationForm formChangeHandler={formChangeHandler}></RegistrationForm>}
            </Style.AuthenticationModal>
        </CommonStyle.PageContainer>
    );
}