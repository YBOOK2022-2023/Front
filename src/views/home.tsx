import { height } from "@mui/system";
import { outerTheme } from "../themes/Theme";

function Home() {
  return (
    <div id='home-page' style={{ backgroundColor: "inherit", height: "100%" }}>
      <h1 style={{ color: outerTheme.palette.secondary.main }}>Homepage</h1>
    </div>
  );
}

export default Home;
