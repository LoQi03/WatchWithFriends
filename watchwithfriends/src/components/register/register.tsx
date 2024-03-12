import React, { ChangeEvent, useContext, useState } from 'react';
import * as Style from './styles';
import { IconButton, InputAdornment, ThemeProvider } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import joi from 'joi';
import * as CommonStyles from '../../commonStyles';
import { AuthContext } from '../../services/authenticationContext';
import toast from 'react-hot-toast';
import { theme } from '../../theme';
interface RegistrationFormProps {
    formChangeHandler: () => void;
}

export const RegistrationForm = (props: RegistrationFormProps): JSX.Element => {
    const authContext = useContext(AuthContext);
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfrimPassword, setshowConfrimPassword] = React.useState(false);
    const [registerCredentials, setRegisterCredentials] = useState<{ email: string, password: string, name: string, birthDate: string }>({ email: '', password: '', name: '', birthDate: '1998-07-03' });
    const [confrimPassword, setConfrimPassword] = useState<string>('');

    const schema = joi.object({
        email: joi.string().required().email({ tlds: { allow: false } }),
        password: joi.string().min(7).required(),
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
                toast.error("The passwords don't match");
                return;
            }
            const { error } = schema.validate(registerCredentials);
            if (error) {
                toast.error("Wrong credentials!");
                console.log(error);
                return;
            }
            await authContext?.register(registerCredentials);
            toast.success("You have successfully registered!");
            props.formChangeHandler();
        }
        catch (error) {
            toast.error("Wrong credentials or user already exists!");
            console.log(error);
        }
    };

    return (
        <>
            <CommonStyles.Title theme={theme}>Sign Up</CommonStyles.Title>
            <Style.InputContainer theme={theme}>
                <CommonStyles.StyledTextField theme={theme} value={registerCredentials.email} name='email' onChange={handleRegisterCredentialsChange} type="text" placeholder="E-mail" />
                <CommonStyles.StyledTextField theme={theme} value={registerCredentials.name} name='name' onChange={handleRegisterCredentialsChange} type="text" placeholder="Username" />
                <ThemeProvider theme={theme}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={dayjs(registerCredentials.birthDate)}
                            components={{
                                    TextField: (props) => (
                                        <CommonStyles.StyledTextField theme={theme}
                                        {...props}
                                        size="medium"
                                        variant="outlined"
                                        />
                                    )
                                    }}
                                    onChange={(date) => setRegisterCredentials({ ...registerCredentials, birthDate: date?.toISOString() ?? '' })}
                            slotProps={{ textField: { size: 'medium', variant: 'outlined' } }} />
                    </LocalizationProvider>
                </ThemeProvider>
                <CommonStyles.StyledTextField theme={theme}
                    value={registerCredentials.password}
                    onChange={handleRegisterCredentialsChange}
                    name='password'
                    placeholder="Password"
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
                <CommonStyles.StyledTextField theme={theme}
                    type={showConfrimPassword ? 'text' : 'password'}
                    value={confrimPassword}
                    placeholder="Confirm Password"
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
                <CommonStyles.GenericButton theme={theme} onClick={register} size='large' >Sign Up</CommonStyles.GenericButton>
            </Style.InputContainer>
            <CommonStyles.SignSwitchButton theme={theme} onClick={props.formChangeHandler}>Already have an account?</CommonStyles.SignSwitchButton>
        </>
    )
}