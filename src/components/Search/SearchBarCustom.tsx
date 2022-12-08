import {
  Toolbar,
  AppBar,
  IconButton,
  Typography,
  ThemeProvider,
} from "@mui/material";
import { Search, SearchIconWrapper, StyledInputBase } from "./SearchComponent";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { outerTheme } from "../../themes/Theme";

function SearchBarCustom() {
  return (
    <div id='search-bar-custom' style={{ marginBottom: "56px" }}>
      <ThemeProvider theme={outerTheme}>
        <AppBar
          position='fixed'
          color='primary'
          sx={{
            borderTop: "solid 3px",
            borderTopColor: outerTheme.palette.secondary.main,
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              textDecoration: "none",
            }}
          >
            <Typography
              color='secondary'
              variant='h5'
              sx={{ display: "block", mr: "1em" }}
            >
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
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}

export default SearchBarCustom;
