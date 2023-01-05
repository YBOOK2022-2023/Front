import { Image } from "@mui/icons-material";
import { Box, IconButton, TextField, Typography } from "@mui/material";

function NewPost() {
  return (
    <Box sx={{ mt: "2em", mx: "1em" }}>
      <Typography variant='h5' sx={{ pb: "1em" }}>
        NewPost
      </Typography>
      <Box
        sx={{
          width: "calc(100% - 2em)",
          m: "0.5em 1em",
          textAlign: "center",
          border: "1px solid grey",
          height: "100px",
          borderRadius: "3px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <IconButton
          component='label'
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
            height: "100%",
          }}
        >
          <input hidden accept='image/*' multiple type='file' />
          <Image color='primary' />
          <Typography variant='body1'>Photo</Typography>
        </IconButton>
      </Box>

      <TextField
        multiline
        rows={10}
        label='Texte'
        sx={{
          width: "calc(100% - 2em)",
          m: "0.5em 1em",
        }}
      />
    </Box>
  );
}

export default NewPost;
