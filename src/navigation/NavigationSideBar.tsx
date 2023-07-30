import { Container, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { DrawerHeader, drawerWidth, theme } from './NavigationComponent'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import BookIcon from '@mui/icons-material/Book';
import MenuIcon from '@mui/icons-material/Menu';
import useUserStore from '../store/UserStore';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';


const NavigationSideBar = () => {
  const [open, setOpen] = React.useState(false);
  const user = useUserStore((state) => state.user);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Container>
      <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={handleDrawerOpen} sx={{ ...(open && { display: 'none' })}}>
        <MenuIcon />
      </IconButton>
      <Drawer sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth } }} variant="persistent" anchor="right" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}                         
          </IconButton>
              <Box>
                {  
                user.uid?                
                <Box sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center', height: '5vh' }}>어서오세요 {user.nickName}님 </Box>
                :<Box>로그인 해주십시오 </Box>
              }
              </Box>
        </DrawerHeader>
        <Divider />
          {
            user.uid?
            (
            <List>
              {['프로필'].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton  component={Link} to={index === 0? `/key-we-board-page/profile/${user.uid}`: `/key-we-board-page/info/${user.uid}`}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <AssignmentIndIcon/> : <PersonIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            )
            :(
              <Box sx={{fontSize: '15px',marginTop: '2rem', marginBottom: '1.5rem',alignItems:'center'}}>로그인 이후 이용 가능합니다.</Box>
            )
          }
        <Divider />
        {
          user.uid?
          (
          <List>
            {['내 글', '북마크'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton component={Link} to={index === 0? `/key-we-board-page/writing/${user.uid}`: `/key-we-board-page/bookmark/${user.uid}`}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <EditIcon /> : <BookIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          ):(
            <Box/>
          )
        }        
      </Drawer>
    </Container>
  )
}

export default NavigationSideBar