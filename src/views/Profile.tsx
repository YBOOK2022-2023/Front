
import styled from "@emotion/styled";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import SectionTitle from "../components/SectionTitle";
import Tabs from "../components/Tabs";
import InfoBar from "../components/InfoBar";
/* FC12 : présence d’un header avec avatar, username, nombre d’amis et photo
de couverture
- FC13 : Présence d’un mécanisme de filtrage pour visualiser posts, likes, et
commentaires
- FC14 : Accès à la page amis */


function Profile() {
  return (
    <div id='profile'>
     <InfoBar/>
     
      <Tabs/>
    </div>
  );
}

export default Profile;
