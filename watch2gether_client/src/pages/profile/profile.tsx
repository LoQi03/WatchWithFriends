import React, { ChangeEvent, useContext, useMemo, useState } from 'react';
import * as Style from './styles'
import { UserDto } from '../../models/userDto';
import { Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import * as CommonStyle from "../../commonStyles";
import * as API from '../../api/userManagementAPI';
import { UpdateUserDto } from '../../models/updateUserDto';
import UploadFileTwoToneIcon from '@mui/icons-material/UploadFileTwoTone';
import * as AppConfig from '../../AppConfig';
import { AuthContext } from '../../services/authenticationContext';

export const ProfilePage = (): JSX.Element => {
    const authContext = useContext(AuthContext);
    const [newPassword, setNewPassword] = useState('');
    const [confrimNewPassword, setConfrimNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfrimNewPassword, setshowConfrimNewPassword] = useState(false);
    const [showNewPassword, setshowNewPassword] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [errorMassage, setErrorMassage] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const [imgFile, setImgFile] = useState<File | undefined>(undefined);
    const [userDetails, setUserDetails] = useState<UserDto>(
        {
            name: '',
            email: '',
            password: ''
        }
    );
    useMemo(() => {
        if (authContext && authContext.currentUser) {
            setUserDetails(authContext.currentUser);
            setImageSrc(`${AppConfig.GetConfig().apiUrl}Users/${authContext?.currentUser?.id}/image`);
        }
    }, [authContext])

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

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        let file = event.target.files?.[0];
        setImgFile(file);
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2 && typeof reader.result === 'string') {
                setImageSrc(reader.result);
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const save = async () => {
        setErrorMassage('');
        if (newPassword !== confrimNewPassword) return;
        let updateUserDto: UpdateUserDto = {
            userDetails: userDetails,
            newPassword: newPassword
        };
        if (authContext?.checkTokenExpiration() === false) authContext?.logout();
        try {
            const respone = await API.updateUser(updateUserDto);
            if (respone.status === 200) {
                if (imgFile !== undefined && authContext?.currentUser?.id !== undefined)
                    await API.uploadProfilePicture(imgFile, authContext?.currentUser?.id);
                updateUserDto.userDetails.password = "";
                setUserDetails(updateUserDto.userDetails);
                if (authContext?.currentUser?.id !== undefined) {
                    setUserDetails(authContext?.currentUser);
                }
                setNewPassword('');
                setConfrimNewPassword('');
            }
        } catch (error) {
            setErrorMassage('Wrong credentials or user already exists');
        };
    };
    const discard = () => {
        setUserDetails(authContext?.currentUser ?? {
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
                <Style.ImageContainer>
                    <Style.StyledImage src={imageSrc} alt="Avatar" />
                    <Button
                        startIcon={<UploadFileTwoToneIcon />}
                        sx={Style.ChangeButtonStyle}
                        component="label"
                        variant="contained"
                    >
                        Change
                        <input
                            type="file"
                            hidden
                            onChange={handleImageChange}
                        />
                    </Button>
                </Style.ImageContainer>
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