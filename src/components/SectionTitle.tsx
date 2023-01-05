import { Typography } from "@mui/material";

function SectionTitle(props: { text: string }) {
  return (
    <Typography variant='h4' sx={{ fontWeight: "bold", pt: "0.5em" }}>
      {props.text}
    </Typography>
  );
}

export default SectionTitle;
