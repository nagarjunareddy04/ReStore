import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useStoreContext } from '../context/StoreContext';
import { useAppSelector } from '../store/configureStore';
import SignedInMenu from './SignedInMenu';

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

const midLinks = [
    { title: 'catalog', path: '/catalog' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' },
]

const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' }
]

const navStyles = {
    color: 'inherit',
    textDecoration: 'none',
    typograhy: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
}

export default function Header({ darkMode, handleThemeChange }: Props) {
    const { basket } = useAppSelector(state => state.basket);
    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);
    const { user } = useAppSelector(state => state.account);

    return (
        <AppBar position="static">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box display='flex' alignItems='center'>
                    <Typography variant='h6' component={NavLink} to={'/'} sx={navStyles}>
                        RE-STORE
                    </Typography>
                    <Switch checked={darkMode} onChange={handleThemeChange} />
                </Box>
                <Box >
                    <List sx={{ display: 'flex' }}>
                        {midLinks.map(({ title, path }) => (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyles}>
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box display='flex' alignItems='center'>
                    <IconButton component={Link} to="/basket" size='large' sx={{ color: 'inherit' }}>
                        <Badge color="secondary" badgeContent={itemCount} showZero>
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                    {user ? (
                        <SignedInMenu />
                    ) : (
                        <List sx={{ display: 'flex' }}>
                            {rightLinks.map(({ title, path }) => (
                                <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                                    {title.toUpperCase()}
                                </ListItem>
                            ))}
                        </List>
                    )}

                </Box>
            </Toolbar>
        </AppBar>
    )
}