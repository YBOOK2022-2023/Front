import { Toolbar, AppBar, IconButton, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ChatIcon from "@mui/icons-material/Chat";
import SettingsIcon from "@mui/icons-material/Settings";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Link } from "react-router-dom";

function AppBarCustom(props: { showNewPost: (show: boolean) => void }) {
  return (
    <Box sx={{ position: "absolute", bottom: "0px" }}>
      <AppBar
        position='fixed'
        sx={{
          top: "auto",
          bottom: 0,
          borderTop: "solid 3px",
          zIndex: 4,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-around",
            textDecoration: "none",
          }}
        >
          <IconButton color='inherit' component={Link} to='/'>
            <HomeIcon />
          </IconButton>
          <IconButton color='inherit' component={Link} to='chat'>
            <ChatIcon />
          </IconButton>
          <IconButton
            color='inherit'
            onClick={() => {
              props.showNewPost(true);
            }}
          >
            <AddBoxIcon sx={{ fontSize: "1.7em" }} />
          </IconButton>
          <IconButton color='inherit' component={Link} to='profile'>
            <AccountCircle />
          </IconButton>
          <IconButton color='inherit' component={Link} to='settings'>
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default AppBarCustom;
