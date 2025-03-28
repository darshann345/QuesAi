import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

  

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate()
  const location = useLocation();
  const projectTitle = location.state?.title || ""; 
 
  const handleClickTitle = () =>{
    navigate('/home')
  }
  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >


        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon style={{ display: 'flex', flexDirection: 'row' }} />}
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}
        />
        {

        }
        {projectTitle && (
                                      <BottomNavigationAction label={projectTitle} onClick={handleClickTitle}/>

                          )}

        <BottomNavigationAction label="AddPodCost" active />

      </BottomNavigation>
      
    </Box>
  );
}