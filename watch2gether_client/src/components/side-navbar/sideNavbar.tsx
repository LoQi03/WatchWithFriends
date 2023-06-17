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
import AuthenticationService from '../../services/authenticationService';
import ProfilePlaceHolder from '../../assets/images/profilePlaceholder.jpg';

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

interface SideNavbarProps {
    logoutHandler: () => void;
};

export default function SideNavbar(props: SideNavbarProps) {
    const [state, setState] = React.useState({
        left: false
    });

    const navigate = useNavigate();

    const logout = async () => {
        await AuthenticationService.logout();
        props.logoutHandler();
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
                    <Style.StyledImage src={WatchWithFriendsLogo} alt="WatchWithFriends" />
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
                        <Button onClick={toggleDrawer('left', true)}><MenuIcon sx={{ color: 'white' }}></MenuIcon></Button>
                        <img style={{ height: "70px" }} src={WatchWithFriendsLogo} alt="WatchWithFriends" />
                    </div>
                    <Style.ProfileImage src={ProfilePlaceHolder} />
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