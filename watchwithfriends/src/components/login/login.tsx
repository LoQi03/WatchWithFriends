import React, { ChangeEvent, KeyboardEventHandler, useState } from 'react';
import * as Style from './styles';
import LoginIcon from '@mui/icons-material/Login';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoginCredentialsDto } from '../../models/loginCredentialsDto';
import * as CommonStyles from '../../commonStyles';
import { AuthContext } from '../../services/authenticationContext';
import toast from 'react-hot-toast';

interface LoginFormProps {
    formChangeHandler: () => void;
}

export const LoginForm = (props: LoginFormProps): JSX.Element => {
    const authContext = React.useContext(AuthContext);
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [credentials, setCredentials] = useState<LoginCredentialsDto>({ email: '', password: '' });
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
            toast.success("You have successfully logged in!");
        }
        catch (error) {
            toast.error("Wrong credentials!");
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
                    placeholder="Password"
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
                <Style.SignInButton onClick={login} size='large' startIcon={<LoginIcon />}>Sign In</Style.SignInButton>
            </Style.InputContainer>
            <CommonStyles.SignSwitchButton onClick={props.formChangeHandler}>Need an account?</CommonStyles.SignSwitchButton>
        </>
    )
}