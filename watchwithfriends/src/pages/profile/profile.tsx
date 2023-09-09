import React, { ChangeEvent, useContext, useMemo, useState } from 'react';
import * as Style from './styles'
import { UserDto } from '../../models/userDto';
import { Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import * as CommonStyle from "../../commonStyles";
import * as API from '../../api/userManagementAPI';
import { UpdateUserDto } from '../../models/updateUserDto';
import * as AppConfig from '../../AppConfig';
import { AuthContext } from '../../services/authenticationContext';
import toast from 'react-hot-toast';

export const ProfilePage = (): JSX.Element => {
    const authContext = useContext(AuthContext);
    const [newPassword, setNewPassword] = useState('');
    const [confrimNewPassword, setConfrimNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfrimNewPassword, setshowConfrimNewPassword] = useState(false);
    const [showNewPassword, setshowNewPassword] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [imgFile, setImgFile] = useState<File | undefined>(undefined);
    const [userDetails, setUserDetails] = useState<UserDto>(
        {
            id: '',
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
                toast.success('User updated successfully');
            }
        } catch (error) {
            toast.error('Wrong credentials or user already exists');
        };
    };

    return (
        <Style.ProfilePageContainer>
            <Style.ProfileName>{authContext?.currentUser?.name}</Style.ProfileName>
            <Style.ProfilePageContent>
                <Style.ImageContainer>

                    <Button
                        sx={Style.ProfileButtonStyle}
                        component="label"
                        variant="contained"
                    >   < Style.UploadIcon />
                        <Style.StyledImage src={imageSrc} alt="Avatar" />
                        <input
                            type="file"
                            hidden
                            onChange={handleImageChange}
                        />
                    </Button>
                </Style.ImageContainer>
                <Style.ProfilePageInputContainer>
                    <CommonStyle.StyledTextField onChange={handleUserDetailsChange} value={userDetails.name ?? ''} name='name' type='text' placeholder="Username" />
                    <CommonStyle.StyledTextField onChange={handleUserDetailsChange} value={userDetails.email ?? ''} name='email' type='text' placeholder="E-mail" />
                    <CommonStyle.StyledTextField
                        value={userDetails.password ?? ''}
                        onChange={handleUserDetailsChange}
                        name='password'
                        placeholder='Password'
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
                            <CommonStyle.StyledTextField
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                type={showNewPassword ? 'text' : 'password'}
                                placeholder='New Password'
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
                            <CommonStyle.StyledTextField
                                value={confrimNewPassword}
                                onChange={(e) => setConfrimNewPassword(e.target.value)}
                                placeholder='Confirm Password'
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
                    <Style.SaveButton onClick={save} title='Save' >Save</Style.SaveButton>
                </Style.ProfilePageInputContainer>
            </Style.ProfilePageContent>
        </Style.ProfilePageContainer>
    )
};