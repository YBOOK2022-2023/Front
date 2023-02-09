import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Friend from "../../models/FriendModel";
import ChatIcon from "@mui/icons-material/Chat";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { useContext, useCallback } from "react";
import { UserAccountContext } from "../../providers/UserAccount";
import { configAxios } from "../../config/configAxios";

export default function FriendList(props: {
  friend: Friend;
  canChat: boolean;
  canAdd: boolean;
  canIgnore: boolean;
}) {
  const { friend, canChat, canAdd, canIgnore } = props;
  const { getJwt } = useContext(UserAccountContext);

  const updateFriendShip = useCallback(
    async (id: number, action: string) => {
      const idToken = await getJwt();
      console.warn("updateFriendShip");
      console.log(idToken);
      return await configAxios
        .put(
          `/friendship/${id}`,
          { status: action },
          {
            headers: { Authorization: `Bearer ${idToken}` },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [getJwt]
  );
  const handleClickAdd = () => {
    updateFriendShip(friend.id, "ACCEPTED");
  };
  const handleClickIgnore = () => {
    updateFriendShip(friend.id, "IGNORED");
  };
  //console.warn(friend.id);
  return (
    <ListItem
      divider={true}
      key={friend.friendInfo.id}
      secondaryAction={
        <div className='flex flex-row'>
          {canChat && (
            <div>
              {" "}
              <IconButton aria-label='chat'>
                <ChatIcon />
              </IconButton>
            </div>
          )}

          {canAdd && (
            <div>
              {" "}
              <IconButton aria-label='Add' onClick={handleClickAdd}>
                <DoneOutlineIcon />
              </IconButton>
            </div>
          )}

          {canIgnore && (
            <div>
              {" "}
              <IconButton aria-label='Ignore' onClick={handleClickIgnore}>
                <ClearIcon />
              </IconButton>
            </div>
          )}
        </div>
      }
    >
      <ListItemAvatar>
        <Avatar
          alt={friend.friendInfo.firstname}
          src='/static/images/avatar/1.jpg'
        />
      </ListItemAvatar>
      <ListItemText
        primary={friend.friendInfo.firstname}
        secondary={friend.friendInfo.lastname}
      />
    </ListItem>
  );
}
