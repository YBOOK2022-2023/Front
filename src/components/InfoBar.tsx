import styled from "@emotion/styled";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from '@mui/material-next/Button';
import { useNavigate } from "react-router-dom";


function InfoBar(props: { userName: string; numfriends?: number; }) {
  const navigate = useNavigate();

  const navigateToFriends = () => {
    // 👇️ navigate to /contacts
    navigate('/friends');
  };

  const { userName,numfriends } = props;
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          backgroundColor: '#44b700',
          color: '#44b700',
          //boxShadow: `0 0 0 2px black`,
          '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
          },
        },
        '@keyframes ripple': {
          '0%': {
            transform: 'scale(.8)',
            opacity: 1,
          },
          '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
          },
        },
      }));
    return (
      <Box display="flex" mt="4rem" width="100%" >
        <Box display="flex" mt="4rem" width="100%" >
        <StyledBadge
          sx={{
           marginTop: "3rem",
          }}
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          <Avatar sx={{}} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
    </StyledBadge>
  
    <div className="ml-4 mt-auto" ><b className="text-2xl">{userName}</b>
    <p className="text-xs" >{numfriends} Friend(s)</p>
    </div>
    
    <Button
    onClick={navigateToFriends}
  color="primary"
  disabled={false}
  variant="outlined"
>Friends</Button>
      </Box> 
    </Box>
    )
}
export default InfoBar;