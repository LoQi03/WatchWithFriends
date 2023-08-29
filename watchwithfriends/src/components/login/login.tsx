import React, { ChangeEvent, KeyboardEventHandler, useState } from 'react';
import * as Style from './styles';
import LoginIcon from '@mui/icons-material/Login';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoginCredentialsDto } from '../../models/loginCredentialsDto';
import * as CommonStyles from '../../commonStyles';
import { AuthContext } from '../../services/authenticationContext';

interface LoginFormProps {
    formChangeHandler: () => void;
}

export const LoginForm = (props: LoginFormProps): JSX.Element => {
    const authContext = React.useContext(AuthContext);
    const [showPassword, setShowPassword] = React.useState(false);
    const [credentials, setCredentials] = useState<LoginCredentialsDto>({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState<string>();
    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
        if (event.key === 'Enter') {
            login();
        }
    };

    const handleCredentialsChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    const login = async () => {
        try {
            await authContext?.login(credentials);
        }
        catch (error) {
            setErrorMessage("Invalid credentials");
            console.log(error);
        }
    };
    return (
        <>
            <h1>Sign In</h1>
            <Style.InputContainer>
                <Style.SignInTextField onKeyDown={handleKeyDown} value={credentials.email} onChange={handleCredentialsChange} name='email' type="text" placeholder="E-mail" />
                <Style.SignInTextField
                    value={credentials.password}
                    onChange={handleCredentialsChange}
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    onKeyDown={handleKeyDown}
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
                {errorMessage && <CommonStyles.ErrorMassage>{errorMessage}</CommonStyles.ErrorMassage>}
                <Style.SignInButton onClick={login} size='large' startIcon={<LoginIcon />}>Sign In</Style.SignInButton>
            </Style.InputContainer>
            <CommonStyles.SignSwitchButton onClick={props.formChangeHandler}>Need an account?</CommonStyles.SignSwitchButton>
        </>
    )
}