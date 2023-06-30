import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import * as Style from './styles';
import { useNavigate } from 'react-router-dom';
import WatchWithFriendsLogo from '../../assets/images/logo.png';
import Person2Icon from '@mui/icons-material/Person2';
import GroupIcon from '@mui/icons-material/Group';
import TvIcon from '@mui/icons-material/Tv';
import LogoutIcon from '@mui/icons-material/Logout';
import { Menu } from '@mui/material';
import * as AppConfig from '../../AppConfig';
import { AuthContext } from '../../services/authenticationContext';

type Anchor = 'left';

interface NavigationProps {
    title: string;
    navigationURL: string;
    icon: JSX.Element;
}
const navigationArrayTop: NavigationProps[] = [
    {
        title: "Home",
        navigationURL: "/",
        icon: <HomeIcon />
    },
    {
        title: "Rooms",
        navigationURL: "/rooms",
        icon: <TvIcon />
    },
    {
        title: "Friends",
        navigationURL: "/friends",
        icon: <GroupIcon />
    },
    {
        title: "Profile",
        navigationURL: "/profile",
        icon: <Person2Icon />
    }
]


export default function SideNavbar() {
    const authContext = React.useContext(AuthContext);
    const [state, setState] = React.useState({
        left: false
    });

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();

    const logout = async () => {
        authContext?.logout();
        navigate('/');
    };

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    const list = (anchor: Anchor) => (
        <Style.StyledBox
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Style.StyledList>
                <Style.StyledListItemForImage disablePadding>
                    <Style.StyledImage onClick={() => navigate('/')} src={WatchWithFriendsLogo} alt="WatchWithFriends" />
                </Style.StyledListItemForImage>

                {navigationArrayTop.map((navigation, index) => (
                    <Style.StyledListItem key={index} disablePadding onClick={() => { navigate(navigation.navigationURL) }} >
                        <ListItemButton>
                            <ListItemIcon sx={{ color: "#3928C2" }}>
                                {navigation.icon}
                            </ListItemIcon>
                            <ListItemText sx={{ color: "#3928C2" }} primary={navigation.title} />
                        </ListItemButton>
                    </Style.StyledListItem>
                ))}
            </Style.StyledList>
            <Style.StyledListItem>
                <ListItemButton onClick={logout} sx={{ position: 'absolute', bottom: '30px', left: '0px', width: '100%' }} >
                    <ListItemIcon sx={{ color: "#3928C2", padding: '0px' }}>
                        {<LogoutIcon />}
                    </ListItemIcon>
                    <ListItemText sx={{ color: "#3928C2" }} primary={'Logout'} />
                </ListItemButton>
            </Style.StyledListItem>
        </Style.StyledBox>
    );

    return (
        <Style.Header>
            <React.Fragment key={'left'}>
                <Style.HeaderContainer>
                    <div style={{ alignItems: "center", display: 'flex' }}>
                        <Button onClick={toggleDrawer('left', true)}><MenuIcon fontSize='large' sx={{ color: 'white' }}></MenuIcon></Button>
                        <img onClick={() => navigate('/')} style={{ height: "70px", cursor: 'pointer' }} src={WatchWithFriendsLogo} alt="WatchWithFriends" />
                    </div>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleProfileClick}
                    >
                        <Style.ProfileImage src={`${AppConfig.GetConfig().apiUrl}Users/${authContext?.currentUser?.id}/image`} />
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
                        <Style.StyledMenuItem onClick={() => { handleMenuClose(); navigate('/profile') }}><Style.StyledMenuItemButton><Person2Icon /> Profile</Style.StyledMenuItemButton></Style.StyledMenuItem >
                        <Style.StyledMenuItem onClick={logout}><Style.StyledMenuItemButton><LogoutIcon /> Logout</Style.StyledMenuItemButton></Style.StyledMenuItem >
                    </Menu>
                </Style.HeaderContainer>
                <Drawer
                    anchor={'left'}
                    open={state['left']}
                    onClose={toggleDrawer('left', false)}
                >
                    {list('left')}
                </Drawer>
            </React.Fragment>
        </Style.Header>
    );
}