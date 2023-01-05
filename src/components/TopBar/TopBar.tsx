import { Toolbar, AppBar, Typography, IconButton } from "@mui/material";
import { Search, SearchIconWrapper, StyledInputBase } from "./SearchComponent";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";

function TopBar() {
  return (
    <div id='search-bar-custom' style={{ marginBottom: "56px" }}>
      <AppBar
        position='fixed'
        sx={{
          borderBottom: "solid 3px",
          zIndex: 4,
          top: 0,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            textDecoration: "none",
          }}
        >
          <Typography variant='h5' sx={{ display: "block", mr: "1em" }}>
            Logo
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Search…'
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <IconButton component={Link} to='notifications' color='inherit'>
            <NotificationsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default TopBar;
