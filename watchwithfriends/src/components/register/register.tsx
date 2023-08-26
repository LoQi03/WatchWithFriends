import React, { ChangeEvent } from 'react';
import * as Style from './styles';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { RegisterUserDto } from '../../models/registerUserDto';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import joi from 'joi';
import * as CommonStyles from '../../commonStyles';
import { AuthContext } from '../../services/authenticationContext';
interface RegistrationFormProps {
    formChangeHandler: () => void;
}

export const RegistrationForm = (props: RegistrationFormProps): JSX.Element => {
    const authContext = React.useContext(AuthContext);
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfrimPassword, setshowConfrimPassword] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState<string>();
    const [registerCredentials, setRegisterCredentials] = React.useState<RegisterUserDto>({ email: '', password: '', name: '', birthDate: '1998-07-03' });
    const [confrimPassword, setConfrimPassword] = React.useState<string>('');

    const schema = joi.object({
        email: joi.string().required().email({ tlds: { allow: false } }),
        password: joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/).required(),
        name: joi.string().min(1).max(20).required(),
        birthDate: joi.string().required(),
    });

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
            const { error } = schema.validate(registerCredentials);
            if (error) {
                setErrorMessage("The password must contain small and capital letters, symbols and numbers!");
                return;
            }
            await authContext?.register(registerCredentials);
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
                        onChange={(date) => setRegisterCredentials({ ...registerCredentials, birthDate: date?.toISOString() ?? '' })}
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
                <CommonStyles.SignSwitchButton onClick={props.formChangeHandler}>Sign In</CommonStyles.SignSwitchButton>
                {errorMessage && <CommonStyles.ErrorMassage >{errorMessage}</CommonStyles.ErrorMassage>}
                <Style.SignUpButton onClick={register} size='large' >Sign Up</Style.SignUpButton>
            </Style.InputContainer>
        </>
    )
}