import styled from "@emotion/styled";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function InfoBar(props: {
  userName: string;
  numfriends?: number;
  showButton: boolean;
}) {
  //Ici showButton est un boolean qui permet de savoir si on doit afficher le bouton pour aller sur la page amis ou non
  // 👇️ Redirection sur le bouton vers page amis

  const navigate = useNavigate();
  const navigateToFriends = () => {
    // 👇️ navigate to /contacts
    navigate("/friends");
  };

  const { userName, numfriends, showButton } = props;
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      //boxShadow: `0 0 0 2px black`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));
  return (
    <Box display='flex' mt='4rem' ml='1rem' width='100%'>
      <StyledBadge
        sx={{
          marginTop: "3rem",
        }}
        overlap='circular'
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant='dot'
      >
        <Avatar sx={{}} alt={userName} src='/static/images/avatar/1.jpg' />
      </StyledBadge>

      <div className='ml-4 mt-auto'>
        <b className='text-2xl'>{userName}</b>
        <p className='text-xs'>{numfriends} Friend(s)</p>
        {showButton && (
          <Button
            onClick={navigateToFriends}
            variant='contained'
            color='primary'
            size='small'
            sx={{ marginTop: "0.5rem" }}
          >
            {" "}
            Friends
          </Button>
        )}
      </div>
    </Box>
  );
}
export default InfoBar;
