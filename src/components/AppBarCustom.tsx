import { Toolbar, AppBar, IconButton, ThemeProvider } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import ChatIcon from "@mui/icons-material/Chat";
import SettingsIcon from "@mui/icons-material/Settings";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Link } from "react-router-dom";
import { outerTheme } from "../themes/Theme";

function AppBarCustom() {
  return (
    <div id='app-bar-custom'>
      <ThemeProvider theme={outerTheme}>
        :
        <AppBar
          position='fixed'
          sx={{
            top: "auto",
            bottom: 0,
            borderTop: "solid 3px",
            borderTopColor: outerTheme.palette.secondary.main,
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-around",
              textDecoration: "none",
            }}
          >
            <Link to='/'>
              <IconButton color='secondary'>
                <HomeIcon />
              </IconButton>
            </Link>
            <Link to='friends'>
              <IconButton color='secondary'>
                <PeopleIcon />
              </IconButton>
            </Link>
            <Link to='new-post'>
              <IconButton color='secondary'>
                <AddBoxIcon sx={{ fontSize: "1.7em" }} />
              </IconButton>
            </Link>
            <Link to='chat'>
              <IconButton color='secondary'>
                <ChatIcon />
              </IconButton>
            </Link>
            <Link to='settings'>
              <IconButton color='secondary'>
                <SettingsIcon />
              </IconButton>
            </Link>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}

export default AppBarCustom;
