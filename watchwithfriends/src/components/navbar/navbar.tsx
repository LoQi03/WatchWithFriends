import * as React from 'react';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import * as Styles from './styles';
import { useNavigate } from 'react-router-dom';
import WatchWithFriendsLogo from '../../assets/images/logo.png';
import Person2Icon from '@mui/icons-material/Person2';
import TvIcon from '@mui/icons-material/Tv';
import LogoutIcon from '@mui/icons-material/Logout';
import { Menu } from '@mui/material';
import { AuthContext } from '../../services/authenticationContext';
import * as AppConfig from '../../AppConfig';
interface NavigationProps {
    title: string;
    navigationURL: string;
    icon: JSX.Element;
}
const navigationArrayTop: NavigationProps[] = [
    {
        title: "Home",
        navigationURL: "/",
        icon: <HomeIcon sx={{ fontSize: '30px' }} />
    },
    {
        title: "Rooms",
        navigationURL: "/rooms",
        icon: <TvIcon sx={{ fontSize: '30px' }} />
    },
    {
        title: "Profile",
        navigationURL: "/profile",
        icon: <Person2Icon sx={{ fontSize: '30px' }} />
    }
]


export const Navbar: React.FC = () => {
    const authContext = React.useContext(AuthContext);
    const [navState, setNaveState] = React.useState(0);

    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const logout = async () => {
        authContext?.logout();
        navigate('/');
    };


    return (
        <>
            <Styles.Navbar>
                <Styles.NavbarContainer>
                    <Styles.StyledImage onClick={() => navigate('/')} src={WatchWithFriendsLogo} alt="WatchWithFriends" />
                    <Styles.LinkContainer>
                        {
                            navigationArrayTop.map((navigation: NavigationProps) => (
                                <Styles.Link onClick={() => navigate(navigation.navigationURL)} key={navigation.title}>{navigation.icon} {navigation.title}</Styles.Link>
                            ))
                        }
                    </Styles.LinkContainer>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleProfileClick}
                    >
                        <Styles.ProfileImage src={`${AppConfig.getConfig().apiUrl}Users/get-image/`+ authContext?.currentUser?.id} />
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <Styles.StyledMenuItem onClick={() => { handleMenuClose(); navigate('/profile') }}><Styles.StyledMenuItemButton><Person2Icon /> Profile</Styles.StyledMenuItemButton></Styles.StyledMenuItem >
                        <Styles.StyledMenuItem onClick={logout}><Styles.StyledMenuItemButton><LogoutIcon /> Logout</Styles.StyledMenuItemButton></Styles.StyledMenuItem >
                    </Menu>
                </Styles.NavbarContainer>
            </Styles.Navbar>
            <Styles.NavbarButtons
                showLabels
                value={navState}
                onChange={(_, newValue) => {
                    setNaveState(newValue);
                }}
            >
                {
                    navigationArrayTop.map((navigation: NavigationProps) => (
                        <Styles.BottomNavigationLink onClick={() => navigate(navigation.navigationURL)} key={navigation.title} label={navigation.title} icon={navigation.icon} />
                    ))
                }
                <Styles.BottomNavigationLink onClick={logout} label={'Logout'} icon={<LogoutIcon sx={{ fontSize: '30px' }} />} />
            </Styles.NavbarButtons>
        </>
    );
}