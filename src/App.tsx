import "./App.css";
import { Outlet } from "react-router-dom";
import AppBarCustom from "./components/AppBar/AppBarCustom";
import TopBar from "./components/TopBar/TopBar";

import { useEffect } from "react";
import { Box, IconButton, Paper, Slide } from "@mui/material";
import { useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import NewPost from "./components/NewPost";

function App() {
  const [checked, setChecked] = useState(false);
  const containerRef = useRef(null);
  useEffect(() => {
    console.log(process.env);
  }, []);
  return (
    <div
      className='App'
      style={{
        overflow: "hidden",
      }}
      ref={containerRef}
    >
      <Slide direction='up' in={checked} container={containerRef.current}>
        <Paper
          sx={{
            width: "100%",
            height: "100%",
            top: 0,
            position: "absolute",
            zIndex: 6,
          }}
          elevation={4}
        >
          <IconButton
            onClick={() => setChecked(false)}
            sx={{ position: "absolute", right: 0 }}
          >
            <CloseIcon />
          </IconButton>
          <NewPost />
        </Paper>
      </Slide>

      <Box sx={{ pl: "1em" }}>
        <TopBar />
        <Outlet />
        <AppBarCustom showNewPost={setChecked} />
      </Box>
    </div>
  );
}

export default App;
