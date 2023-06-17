import * as React from 'react';
import * as CommonStyle from '../../commonStyles';
import * as Style from './styles';
import backGroundImg from '../../assets/images/background.jpg';
import { LoginForm } from '../../components/login/login';
import { RegistrationForm } from '../../components/register/register';
import { AuthenticationContext } from '../../App';




export const AuthenticationPage = (): JSX.Element => {
    const authContext = React.useContext(AuthenticationContext);
    const [isLogin, setIsLogin] = React.useState(true);

    const formChangeHandler = () => {
        setIsLogin((prev) => !prev);
    };

    return (
        <CommonStyle.PageContainer backgroundImage={backGroundImg} >
            <Style.AuthenticationModal>
                {isLogin ? <LoginForm loginChangeHandler={authContext!.loginHandler} formChangeHandler={formChangeHandler} ></LoginForm>
                    : <RegistrationForm formChangeHandler={formChangeHandler}></RegistrationForm>}
            </Style.AuthenticationModal>
        </CommonStyle.PageContainer>
    );
}