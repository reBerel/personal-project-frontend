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
      <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={handleDrawerOpen} sx={{ ...(open && { display: 'none' }) }}>
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
                <Box>어서오세요 {user.nickName}님 </Box>
                :<Box>로그인 해주십시오 </Box>
              }
              </Box>
        </DrawerHeader>
        <Divider />
        <List>
          {['프로필', '내정보'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <AssignmentIndIcon/> : <PersonIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['내 글', '북마크'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <EditIcon /> : <BookIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Container>
  )
}

export default NavigationSideBar