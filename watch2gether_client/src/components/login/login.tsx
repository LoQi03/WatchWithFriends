import React, { ChangeEvent, useState } from 'react';
import * as Style from './styles';
import LoginIcon from '@mui/icons-material/Login';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AuthenticationFormProps } from '../../pages/authentication/authentication';
import { LoginCredentialsDto } from '../../models/loginCredentialsDto';

export const LoginForm = (props: AuthenticationFormProps): JSX.Element => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [credentials, setCredentials] = useState<LoginCredentialsDto>({ email: '', password: '' });
    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    const handleCredentialsChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        console.log(credentials);
    };
    return (
        <>
            <h1>Sign In</h1>
            <Style.InputContainer>
                <Style.SignInTextField value={credentials.email} onChange={handleCredentialsChange} name='email' label='E-mail' type="text" placeholder="E-mail" />
                <Style.SignInTextField
                    value={credentials.password}
                    onChange={handleCredentialsChange}
                    name='password'
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleTogglePassword}
                                    edge="end"
                                    aria-label="toggle password visibility"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <p style={{ cursor: "pointer" }} onClick={props.formChangeHandler}>Sign Up</p>
                <Style.SignInButton size='large' startIcon={<LoginIcon />}>Sign In</Style.SignInButton>
            </Style.InputContainer>
        </>
    )
}