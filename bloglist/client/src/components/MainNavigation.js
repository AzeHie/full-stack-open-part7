import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

import { handleLogout } from '../services/users';

import './MainNavigation.css';

const MainNavigation = ({ user, userDispatch, newNotification }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar className='MainNavigation__toolbar'>
          <div className='MainNavigation__links'>
            <Typography variant='h6' component='div'>
              <Link className='MainNavigation__link' to={'/'}>
                Blogs
              </Link>
            </Typography>
            <Typography variant='h6' component='div'>
              <Link className='MainNavigation__link' to={'/users'}>
                Users
              </Link>
            </Typography>
          </div>
          {user && (
            <div className='MainNavigation__user-details'>
              <span>{user.name} logged in</span>
              <button
                onClick={() => handleLogout(userDispatch, newNotification)}
              >
                Logout
              </button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MainNavigation;
