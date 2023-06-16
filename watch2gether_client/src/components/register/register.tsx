import React, { ChangeEvent } from 'react';
import * as Style from './styles';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AuthenticationService from '../../services/authenticationService';
import { RegisterUserDto } from '../../models/registerUserDto';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
interface RegistrationFormProps {
    formChangeHandler: () => void;
}

export const RegistrationForm = (props: RegistrationFormProps): JSX.Element => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfrimPassword, setshowConfrimPassword] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState<string>();
    const [registerCredentials, setRegisterCredentials] = React.useState<RegisterUserDto>({ email: '', password: '', name: '', birthDate: dayjs('2022-04-17').toDate() });
    const [confrimPassword, setConfrimPassword] = React.useState<string>('');
    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    const handleToggleConfrimPassword = () => {
        setshowConfrimPassword((prevShowPassword) => !prevShowPassword);
    };
    const handleRegisterCredentialsChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRegisterCredentials({ ...registerCredentials, [e.target.name]: e.target.value });
    };
    const register = async () => {
        try {
            if (registerCredentials.password !== confrimPassword) {
                setErrorMessage("Passwords don't match");
                return;
            }
            await AuthenticationService.register(registerCredentials);
            props.formChangeHandler();
        }
        catch (error) {
            setErrorMessage("Wrong credentials or user already exists");
            console.log(error);
        }
    };

    return (
        <>
            <h1>Sign Up</h1>
            <Style.InputContainer>
                <Style.SignUpTextField value={registerCredentials.email} name='email' onChange={handleRegisterCredentialsChange} label='E-mail' type="text" placeholder="E-mail" />
                <Style.SignUpTextField value={registerCredentials.name} name='name' onChange={handleRegisterCredentialsChange} label='Username' type="text" placeholder="Username" />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label='Birth Date'
                        value={dayjs(registerCredentials.birthDate)}
                        sx={Style.DataPickerTheme}
                        onChange={(date) => setRegisterCredentials({ ...registerCredentials, birthDate: date?.toDate() ?? new Date() })}
                        slotProps={{ textField: { size: 'medium', variant: 'outlined', style: { marginTop: '20px' } } }} />
                </LocalizationProvider>
                <Style.SignUpTextField
                    value={registerCredentials.password}
                    onChange={handleRegisterCredentialsChange}
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
                <Style.SignUpTextField
                    label="Confrim Password"
                    type={showConfrimPassword ? 'text' : 'password'}
                    value={confrimPassword}
                    onChange={(e) => setConfrimPassword(e.target.value)}
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
                {errorMessage && <p style={{ color: "red", fontSize: "14px" }}>{errorMessage}</p>}
                <Style.SignUpButton onClick={register} size='large' >Sign Up</Style.SignUpButton>
            </Style.InputContainer>
        </>
    )
}