import React from 'react';
import * as Style from './styles';
import LoginIcon from '@mui/icons-material/Login';

export const LoginForm = (): JSX.Element => {
    return (
        <>
            <h1>Sign In</h1>
            <Style.InputContainer>
                <Style.LoginTextField label='E-mail' type="text" placeholder="E-mail" />
                <Style.LoginTextField label='Password' type="password" placeholder="Password" />
                <a href="#">Sign Up</a>
                <Style.LoginButton size='large' startIcon={<LoginIcon />}>Sign In</Style.LoginButton>
            </Style.InputContainer>
        </>
    )
}