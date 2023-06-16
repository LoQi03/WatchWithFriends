import * as React from 'react';
import * as CommonStyle from '../../commonStyles';
import * as Style from './styles';
import backGroundImg from '../../assets/images/background.jpg';
import { LoginForm } from '../../components/login/login';
export const AuthenticationPage = (): JSX.Element => {
    return (
        <CommonStyle.PageContainer backgroundImage={backGroundImg}>
            <Style.AuthenticationModal>
                <LoginForm />
            </Style.AuthenticationModal>
        </CommonStyle.PageContainer>
    );
}