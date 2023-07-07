
import { BottomNavigation, BottomNavigationAction, Box, Button, styled } from "@mui/material";
import React from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FolderIcon from '@mui/icons-material/Folder';
import { green, grey } from "@mui/material/colors";
import { Link } from "react-router-dom";


const RootContainer = styled('div')({
  width: '100%',
  backgroundColor: '#CFDDCE',
});

const StyledBottomNavigation = styled(BottomNavigation)({
  marginTop: 'auto',
});
export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <RootContainer>
      <StyledBottomNavigation  sx={{marginTop: 'calc(20%)', bottom : 0, width: '100%',position: 'relative', transform: 'translateY(-99%)', backgroundColor: '#CFDDCE' }} >
        <Box sx={{margin: '20px'}}>
        <Button component={Link} to="/https://github.com/reBerel" aria-label="mygithub">
          github
        </Button>
        <Button component={Link} to="/key-we-board-page/list">1</Button>
        <Button component={Link} to="/key-we-board-page/list">2</Button>
        </Box>
      </StyledBottomNavigation>
    </RootContainer>
  );
}