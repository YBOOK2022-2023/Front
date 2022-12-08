
import "./App.css";
import { Outlet } from "react-router-dom";
import AppBarCustom from "./components/AppBarCustom";
import SearchBarCustom from "./components/Search/SearchBarCustom";
import { outerTheme } from "./themes/Theme";

function App() {
  return (
    <div
      className='App'
      style={{ backgroundColor: outerTheme.palette.primary.main }}
    >
      <SearchBarCustom />
      <Outlet />
      <AppBarCustom />
    </div>
  );
}

export default App;
