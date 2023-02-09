import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import { useCallback, useContext, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { configAxios } from "../../config/configAxios";
import { UserAccountContext } from "../../providers/UserAccount";
import {
  List,
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export default function SearchUser(props: any) {
  const [searchUser, setSearchUser] = useState<string>(""); //searchUser est le nom de l'utilisateur recherché
  //userName est le nom de l'utilisateur
  const [AddFriendid, setAddFriendid] = useState<number>(0); //AddFriend est un booléen qui permet de savoir si on a ajouté un ami
  const [searchData, setSearchData] = useState<[]>([]); //searchData est le tableau des utilisateurs recherchés
  const [okData, setOkData] = useState<boolean>(false); //okData est un booléen qui permet de savoir si on a des données à afficher
  const { getJwt } = useContext(UserAccountContext);
  //Ajout d'amis
  const AddFriend = useCallback(
    async (id: number) => {
      const idToken = await getJwt();
      console.warn(idToken);
      return await configAxios
        .post(
          `/friendship`,
          { toID: id },
          { headers: { Authorization: `Bearer ${idToken}` } }
        )
        .then((response) => {
          console.warn("Amis ajouté", AddFriendid);
          setAddFriendid(0);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [getJwt]
  );
  //Recherche d'utilisateurs non amis
  const SearchUser = useCallback(
    async (searchUser: string) => {
      const idToken = await getJwt();
      console.warn(idToken);
      return await configAxios
        .get(`/usersearch/${searchUser}`, {
          headers: { Authorization: `Bearer ${idToken}` },
        })
        .then((response) => {
          //console.log(response.data);
          const data = response.data;
          setSearchData(data);
          setOkData(true);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [getJwt]
  );

  const handleClick = () => {
    SearchUser(searchUser);
  };
  const handleClear = () => {
    setOkData(false);
    setSearchData([]);
    setAddFriendid(0);
  };
  const handleAddFriend = () => {
    if (AddFriendid !== 0) {
      AddFriend(AddFriendid);
    }

    //console.warn('Va etre ajouter',AddFriendid);

    /* console.log(searchData)
    console.warn(okData)
    searchData.map((user:any) => {
        console.log(user.lastname)
    */
  };
  return (
    <div className='mt-4 m-2 c-cyan-500 '>
      <FormControl margin='dense' fullWidth variant='standard'>
        <InputLabel htmlFor='input-with-icon-adornment'>
          Rechercher utilisateurs
        </InputLabel>
        <Input
          color='primary'
          id='input-with-icon-adornment'
          startAdornment={
            <InputAdornment position='start'>
              <IconButton type='submit' onClick={handleClick}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          onChange={(e) => setSearchUser(e.target.value)}
        />
      </FormControl>
      {okData == true && (
        <Button color='warning' onClick={handleClear}>
          <ClearIcon />
          Effacer Recherche
        </Button>
      )}
      <List>
        {searchData.map((user: any) => {
          return (
            <ListItem
              divider={true}
              key={user.id}
              secondaryAction={
                <div className='flex flex-row'>
                  <IconButton
                    color='info'
                    aria-label='add'
                    onClick={() => {
                      setAddFriendid(user.id);
                      handleAddFriend();
                    }}
                  >
                    <PersonAddIcon color='info' />
                  </IconButton>
                </div>
              }
            >
              <ListItemAvatar>
                <Avatar
                  alt={user.firstname}
                  src='/static/images/avatar/1.jpg'
                />
              </ListItemAvatar>
              <ListItemText
                primary={user.firstname}
                secondary={user.lastname}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
