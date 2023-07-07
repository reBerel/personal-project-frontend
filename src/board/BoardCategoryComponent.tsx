import { BottomNavigation, BottomNavigationAction, styled } from "@mui/material";
import React from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FolderIcon from '@mui/icons-material/Folder';
import { green, grey } from "@mui/material/colors";

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
      <StyledBottomNavigation value={value} onChange={handleChange} sx={{  backgroundColor: '#CFDDCE', }}>
        <BottomNavigationAction sx={{marginTop: 'auto'}} label="Recents" value="recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon />} />
        <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
      </StyledBottomNavigation>
    </RootContainer>
  );
}