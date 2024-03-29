import * as React from 'react';
import * as CommonStyle from '../../commonStyles';
import * as Style from './styles';
import { LoginForm } from '../../components/login/login';
import { RegistrationForm } from '../../components/register/register';
import backgroundImg from '../../assets/images/background.jpg';


export const AuthenticationPage = (): JSX.Element => {
    const [isLogin, setIsLogin] = React.useState(true);

    const formChangeHandler = () => {
        setIsLogin((prev) => !prev);
    };

    return (
        <CommonStyle.PageContainer isLogin={true} backgroundimg={backgroundImg}>
            <Style.AuthenticationModalContainer>
                <Style.AuthenticationModal>
                    {isLogin ? <LoginForm formChangeHandler={formChangeHandler} ></LoginForm>
                        : <RegistrationForm formChangeHandler={formChangeHandler}></RegistrationForm>}
                </Style.AuthenticationModal>
            </Style.AuthenticationModalContainer>
        </CommonStyle.PageContainer>
    );
}