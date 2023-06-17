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

type Anchor = 'top' | 'left' | 'bottom' | 'right';

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
    },
    {
        title: "Logout",
        navigationURL: "/",
        icon: <LogoutIcon />
    }
]



export default function SideNavbar() {
    const [state, setState] = React.useState({
        left: false
    });

    const navigate = useNavigate();


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
        </Style.StyledBox>
    );

    return (
        <Style.Header>
            <React.Fragment key={'left'}>
                <Button onClick={toggleDrawer('left', true)}><MenuIcon sx={{ color: 'white' }}></MenuIcon></Button>
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