
import { BottomNavigation, Box, Button, styled } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";


const RootContainer = styled('div')({
  width: '100%',
});

const StyledBottomNavigation = styled(BottomNavigation)({
  marginTop: 'auto',
});
export default function LabelBottomNavigation() {

  return (
    <RootContainer >
      <StyledBottomNavigation sx={{background: 'rgba(0, 0, 0, 0)' , position: 'relative', transform: 'translateY(0%)', display: "flex", alignItems: 'center', justifyContent: 'center', marginTop: '5rem', borderTop: '1.5px solid #6BB07B' }}>
        <Box sx={{ margin: '20px' }}>
          <Button component={Link} target='_blank' to="https://github.com/reBerel" aria-label="mygithub">
            github
          </Button>
          <Button component={Link} target='_blank' to="https://github.com/EDDI-RobotAcademy/personal-project-backend">backend</Button>
          <Button component={Link} target='_blank' to="https://github.com/EDDI-RobotAcademy/personal-project-frontend">frontend</Button>
        </Box>
      </StyledBottomNavigation>
    </RootContainer>
  );
}
