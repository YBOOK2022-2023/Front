import Tabs from "../components/Tabs";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useCallback, useContext, useRef, useState } from "react";
import { useQuery } from "react-query";
import FriendList from "../components/FriendList/List";
import InfoBar from "../components/InfoBar";
import { configAxios } from "../config/configAxios";
import Friend from "../models/FriendModel";
import User from "../models/UserModel";
import { UserAccountContext } from "../providers/UserAccount";
import List from "@mui/material/List";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SearchUser from "../components/FriendList/SearchUser";
function Friends() {
  const user = useRef<User>();
  const friendlist = useRef<Friend[]>([]);
  const friendRequestReceived = useRef<Friend[]>([]);
  const friendRequestSend = useRef<Friend[]>([]);
  const [friendShipCount, setFriendShipCount] = useState<number>(0);
  const { getJwt } = useContext(UserAccountContext);

  const fetchFriends = useCallback(async () => {
    const idToken = await getJwt();
    return await configAxios
      .get("/friendship", {
        headers: { Authorization: `Bearer ${idToken}` },
      })
      .then((response) => {
        const data = response.data;

        setFriendShipCount(data[0].count);
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  }, [getJwt]);

  const {
    isSuccess: queryUserSuccess,
    isError: queryUserError,
    isLoading: queryUserLoading,
    data: queryUserData,
  } = useQuery("user", fetchFriends, { staleTime: 3600000 });
  if (queryUserLoading) {
    return (
      <div>
        <Box mt={"400px"} sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </div>
    );
  }

  if (queryUserSuccess) {
    user.current = {
      firstname: queryUserData[0].user.firstname,
      lastname: queryUserData[0].user.lastname,
      email: queryUserData[0].user.email,
      blocked: queryUserData[0].user.blocked,
      blockedBy: queryUserData[0].user.blockedBy,
      suscribedTo: queryUserData[0].user.toFrienship,
      suscribers: queryUserData[0].user.fromFriendship,
      posts: queryUserData[0].user.posts,
      postsLiked: queryUserData[0].user.postsLiked,
      postsCommented: queryUserData[0].user.postComments,
      suscribersNum: queryUserData[0].count,
    };

    //TRI des ami

    //console.log(queryUserData[0].friendships[0].to);

    queryUserData[0].friendships.map(
      (friendlistData: {
        id: number;
        fromId: number;
        toId: number;
        status: string;
        from: {
          id: number;
          lastname: string;
          firstname: string;
          avatarS3Key: string;
        };
        to: {
          avatarS3Key: string;
          id: number;
          lastname: string;
          firstname: string;
        };
        friendInfo: {
          id: number;
          avatarS3Key: string;
          firstname: string;
          lastname: string;
        };
      }) => {
        if (friendlistData.fromId === queryUserData[0].user.id) {
          friendlist.current.push({
            id: friendlistData.id,
            fromId: friendlistData.fromId,
            toId: friendlistData.toId,
            status: friendlistData.status,
            friendInfo: {
              id: friendlistData.to.id,
              avatarS3Key: friendlistData.to.avatarS3Key,
              firstname: friendlistData.to.firstname,
              lastname: friendlistData.to.lastname,
            },
            from: [],
            to: [],
          });
        } else {
          friendlist.current.push({
            id: friendlistData.id,
            fromId: friendlistData.fromId,
            toId: friendlistData.toId,
            status: friendlistData.status,

            friendInfo: {
              id: friendlistData.from.id,
              avatarS3Key: friendlistData.from.avatarS3Key,
              firstname: friendlistData.from.firstname,
              lastname: friendlistData.from.lastname,
            },

            from: [],
            to: [],
          });
        }
      }
    );

    //List d'amis en attentes
    queryUserData[0].friendshipPending.map(
      (friendRequestData: {
        id: number;
        fromId: number;
        toId: number;
        status: string;
        from: {
          id: number;
          lastname: string;
          firstname: string;
          avatarS3Key: string;
        };
        to: {
          avatarS3Key: string;
          id: number;
          lastname: string;
          firstname: string;
        };
        friendInfo: {
          id: number;
          avatarS3Key: string;
          firstname: string;
          lastname: string;
        };
      }) => {
        if (friendRequestData.fromId === queryUserData[0].user.id) {
          friendRequestSend.current.push({
            id: friendRequestData.id,
            fromId: friendRequestData.fromId,
            toId: friendRequestData.toId,
            status: friendRequestData.status,
            friendInfo: {
              id: friendRequestData.to.id,
              avatarS3Key: friendRequestData.to.avatarS3Key,
              firstname: friendRequestData.to.firstname,
              lastname: friendRequestData.to.lastname,
            },
            from: [],
            to: [],
          });
        } else {
          friendRequestReceived.current.push({
            id: friendRequestData.id,
            fromId: friendRequestData.fromId,
            toId: friendRequestData.toId,
            status: friendRequestData.status,

            friendInfo: {
              id: friendRequestData.from.id,
              avatarS3Key: friendRequestData.from.avatarS3Key,
              firstname: friendRequestData.from.firstname,
              lastname: friendRequestData.from.lastname,
            },

            from: [],
            to: [],
          });
        }
      }
    );
  }
  console.info("user : ", user.current);
  console.log("friendlistfinal : ", friendlist.current);
  console.log("friendRequestSend : ", friendRequestSend.current);
  console.log("riendRequestReceived: ", friendRequestReceived.current);

  if (queryUserError) {
    return <div>Une erreur est survenue</div>;
  }

  return (
    <div id='friends'>
      <InfoBar
        showButton={false}
        userName={user.current?.lastname + " " + user.current?.firstname}
        numfriends={friendShipCount}
      />
      <div id='friends-content' className='mt-1rem'>
        <SearchUser />
      </div>
      <Tabs
        key={0}
        title1='Amis'
        title2="Demandes d'amis"
        title3='Demandes envoyées'
        icon1={<PeopleAltIcon />}
        icon2=''
        icon3=''
        content1={
          <List
            key={1}
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {friendlist.current.map((friend) => (
              <div>
                <FriendList
                  canChat={true}
                  canIgnore={false}
                  canAdd={false}
                  key={friend.id}
                  friend={friend}
                />
              </div>
            ))}{" "}
          </List>
        }
        content2={
          <List
            key={2}
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {friendRequestReceived.current.map((friendReceived) => (
              <div>
                <FriendList
                  canIgnore={true}
                  canAdd={true}
                  canChat={false}
                  key={friendReceived.id}
                  friend={friendReceived}
                />
              </div>
            ))}{" "}
          </List>
        }
        content3={
          <List
            key={3}
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {friendRequestSend.current.map((friendSend) => (
              <div>
                <FriendList
                  canIgnore={true}
                  canAdd={false}
                  canChat={false}
                  key={friendSend.id}
                  friend={friendSend}
                />
              </div>
            ))}{" "}
          </List>
        }
      />
    </div>
  );
}

export default Friends;
