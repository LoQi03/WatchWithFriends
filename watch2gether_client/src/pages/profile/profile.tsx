import React, { useContext, useMemo, useState } from 'react';
import * as Style from './styles'
import ProfilePicturePlaceholder from '../../assets/images/profilePlaceholder.jpg';
import { UserDto } from '../../models/userDto';
import AuthenticationService from '../../services/authenticationService';
import { Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import * as CommonStyle from "../../commonStyles";
import * as API from '../../api/userManagementAPI';
import { UpdateUserDto } from '../../models/updateUserDto';
import { AuthenticationContext } from '../../App';

export const ProfilePage = (): JSX.Element => {
    const authContext = useContext(AuthenticationContext);
    const [newPassword, setNewPassword] = useState('');
    const [confrimNewPassword, setConfrimNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfrimNewPassword, setshowConfrimNewPassword] = useState(false);
    const [showNewPassword, setshowNewPassword] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [errorMassage, setErrorMassage] = useState('');
    const [userDetails, setUserDetails] = useState<UserDto>(
        {
            name: '',
            email: '',
            password: ''
        }
    );
    useMemo(() => {
        if (AuthenticationService.currentUser === undefined) return;
        setUserDetails(AuthenticationService.currentUser);
    }, [])

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    const handleToggleConfrimNewPassword = () => {
        setshowConfrimNewPassword((prevShowPassword) => !prevShowPassword);
    };
    const handleToggleNewPassword = () => {
        setshowNewPassword((prevShowPassword) => !prevShowPassword);
    };
    const handleUserDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    };

    const save = async () => {
        setErrorMassage('');
        if (newPassword !== confrimNewPassword) return;
        let updateUserDto: UpdateUserDto = {
            userDetails: userDetails,
            newPassword: newPassword
        };
        if (AuthenticationService.checkTokenExpiration() === false) authContext?.logoutHandler();
        try {
            const respone = await API.updateUser(updateUserDto);
            if (respone.status === 200) {
                AuthenticationService.currentUser = updateUserDto.userDetails;
                AuthenticationService.currentUser.password = '';
                setUserDetails(AuthenticationService.currentUser);
                setNewPassword('');
                setConfrimNewPassword('');
            }
        } catch (error) {
            setErrorMassage('Wrong credentials or user already exists');
        };
    };
    const discard = () => {
        setUserDetails(AuthenticationService.currentUser ?? {
            name: '',
            email: '',
            password: ''
        });
        setShowChangePassword(false);
    }

    return (
        <Style.ProfilePageContainer>
            <h1>Profile</h1>
            <Style.ProfilePageContent>
                <Style.StyledImage src={ProfilePicturePlaceholder} alt="Avatar" />
                <Style.ProfilePageInputContainer>
                    <Style.ProfilePageTextField onChange={handleUserDetailsChange} value={userDetails.name ?? ''} name='name' label='Username' type='text' placeholder="Username" />
                    <Style.ProfilePageTextField onChange={handleUserDetailsChange} value={userDetails.email ?? ''} name='email' label='E-mail' type='text' placeholder="E-mail" />
                    <Style.ProfilePageTextField
                        value={userDetails.password ?? ''}
                        onChange={handleUserDetailsChange}
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
                    {showChangePassword ?
                        <>
                            <Style.ProfilePageTextField
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                label="New Password"
                                type={showNewPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleToggleNewPassword}
                                                edge="end"
                                                aria-label="toggle password visibility"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Style.ProfilePageTextField
                                value={confrimNewPassword}
                                onChange={(e) => setConfrimNewPassword(e.target.value)}
                                label="Confrim Password"
                                type={showConfrimNewPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleToggleConfrimNewPassword}
                                                edge="end"
                                                aria-label="toggle password visibility"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </> : <Style.ChangePasswordLink onClick={() => setShowChangePassword(true)}>Change Password</Style.ChangePasswordLink>}
                    {errorMassage !== '' ? <CommonStyle.ErrorMassage>{errorMassage}</CommonStyle.ErrorMassage> : null}
                    <Style.ButtonContainer>
                        <Button variant="contained" sx={{ marginRight: '10px' }} onClick={discard} color="error">Discard</Button>
                        <CommonStyle.GenericButton onClick={save} title='Save' >Save</CommonStyle.GenericButton>
                    </Style.ButtonContainer>
                </Style.ProfilePageInputContainer>
            </Style.ProfilePageContent>
        </Style.ProfilePageContainer>
    )
};