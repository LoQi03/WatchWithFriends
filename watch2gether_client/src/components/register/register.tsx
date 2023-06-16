import React from 'react';
import * as Style from './styles';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AuthenticationFormProps } from '../../pages/authentication/authentication';


export const RegistrationForm = (props: AuthenticationFormProps): JSX.Element => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfrimPassword, setshowConfrimPassword] = React.useState(false);
    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    const handleToggleConfrimPassword = () => {
        setshowConfrimPassword((prevShowPassword) => !prevShowPassword);
    };
    return (
        <>
            <h1>Sign Up</h1>
            <Style.InputContainer>
                <Style.SignUpTextField label='E-mail' type="text" placeholder="E-mail" />
                <Style.SignUpTextField label='Username' type="text" placeholder="Username" />
                <Style.SignUpTextField
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
                <Style.SignUpTextField
                    label="Confrim Password"
                    type={showConfrimPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleToggleConfrimPassword}
                                    edge="end"
                                    aria-label="toggle password visibility"
                                >
                                    {showConfrimPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <p style={{ cursor: "pointer" }} onClick={props.formChangeHandler}>Sign In</p>
                <Style.SignUpButton size='large' >Sign Up</Style.SignUpButton>
            </Style.InputContainer>
        </>
    )
}