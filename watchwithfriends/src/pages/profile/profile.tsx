import React, { ChangeEvent, useContext, useMemo, useState } from 'react';
import * as Style from './styles'
import { Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import * as CommonStyle from "../../commonStyles";
import { AuthContext } from '../../services/authenticationContext';
import toast from 'react-hot-toast';
import { Loader } from '../../components/loader/loader';
import { UpdateUserDTO, UserDTO, UsersApi } from '../../api';
import * as AppConfig from '../../AppConfig';
import * as CommonStyles from '../../commonStyles';
export const ProfilePage = (): JSX.Element => {
    const authContext = useContext(AuthContext);
    const userAPI = new UsersApi();
    const [newPassword, setNewPassword] = useState('');
    const [confrimNewPassword, setConfrimNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfrimNewPassword, setshowConfrimNewPassword] = useState(false);
    const [showNewPassword, setshowNewPassword] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [imgFile, setImgFile] = useState<File | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDTO>(
        {
            id: '',
            name: '',
            email: '',
            password: ''
        }
    );
    useMemo(() => {
        if (authContext && authContext.currentUser) {
            setIsLoading(true);
            setUserDetails(authContext.currentUser);
            setImageSrc(`${AppConfig.getConfig().apiUrl}Users/get-image/`+ authContext.currentUser.id);
            setIsLoading(false);
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
        let updateUserDto: UpdateUserDTO = {
            userDetails: userDetails,
            newPassword: newPassword
        };
        try {
            setIsLoading(true);
            const respone = await userAPI.updateUser(updateUserDto);
            if (respone.status === 200) {
                if (imgFile !== undefined && authContext?.currentUser?.id){
                    const formData = new FormData();
                    formData.append("file", imgFile);
                    await userAPI.addImage(authContext?.currentUser?.id,{data:formData,headers: {'Content-Type': 'multipart/form-data'}});
                }
                if(!updateUserDto.userDetails){
                    return;
                }
                updateUserDto.userDetails.password = '';
                setUserDetails(updateUserDto.userDetails);
                if (authContext?.currentUser?.id !== undefined) {
                    setUserDetails(authContext?.currentUser);
                }
                setNewPassword('');
                setConfrimNewPassword('');
                toast.success('User updated successfully');
                setIsLoading(false);
            }
        } catch (error) {
            toast.error('Wrong credentials or user already exists');
            setIsLoading(false);
        };
    };

    return (
        <Style.ProfilePageContainer>
            {isLoading && <Loader />}
            <Style.ProfilePageContent>
                <Style.ImageRowContainer>
                <Style.ImageContainer>
                    <CommonStyles.Title>{authContext?.currentUser?.name}</CommonStyles.Title>
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
                </Style.ImageRowContainer>
                <Style.ProfilePageInputContainer>
                    <CommonStyle.GenericTextField onChange={handleUserDetailsChange} value={userDetails.name ?? ''} name='name' type='text' placeholder="Username" />
                    <CommonStyle.GenericTextField onChange={handleUserDetailsChange} value={userDetails.email ?? ''} name='email' type='text' placeholder="E-mail" />
                    <CommonStyle.GenericTextField
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
                            <CommonStyle.GenericTextField
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                type={showNewPassword ? 'text' : 'password'}
                                placeholder='New Password'
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                color='primary'
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
                            <CommonStyle.GenericTextField
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
    
                        </> : <CommonStyle.SignSwitchButton onClick={() => setShowChangePassword(true)}>Change Password</CommonStyle.SignSwitchButton >}
                    
                </Style.ProfilePageInputContainer>
                <CommonStyle.GenericButton onClick={save} title='Save' >Save</CommonStyle.GenericButton >
            </Style.ProfilePageContent>
        </Style.ProfilePageContainer>
    )
};