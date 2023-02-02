import Box from "@mui/material/Box";
import Tabs from "../components/Tabs";
import InfoBar from "../components/InfoBar";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { configAxios } from "../config/configAxios";
import { UserAccountContext } from "../providers/UserAccount";
import { useQuery } from "react-query";
import Post from "../models/PostModel";
import User from "../models/UserModel";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import PostComponent from "../components/PostAndComment/PostComponent";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material-next/Button";

//import {fetchPosts} from "../services/apiServicePost";

/* FC12 : présence d’un header avec avatar, username, nombre d’amis et photo
de couverture
- FC13 : Présence d’un mécanisme de filtrage pour visualiser posts, likes, et
commentaires
- FC14 : Accès à la page amis */

function Profile() {
  const commentedPost = useRef<Post[]>([]);
  const user = useRef<User>();
  const posted = useRef<Post[]>([]);
  const likedPost = useRef<Post[]>([]);

  const { getJwt } = useContext(UserAccountContext);

  const fetchProfilePosts = useCallback(async () => {
    const idToken = await getJwt();
    console.log("idToken : ", idToken);
    return await configAxios
      .get("/postprofile", {
        headers: { Authorization: `Bearer ${idToken}` },
      })
      .then((response) => {
        const data = response.data;
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  }, [getJwt]);

  const {
    isSuccess: profileQuerySuccess,
    isError: profileQueryError,
    isLoading: profileQueryLoading,
    data: profileData,
  } = useQuery("profileData", fetchProfilePosts, { staleTime: 3600000 });

  if (profileQueryLoading) {
    return (
      <div>
        <Box mt={"400px"} sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </div>
    );
  }

  if (profileQuerySuccess) {
    console.log("User : ", profileData[0].user);
    console.log("Posted : ", profileData[0].posted);
    console.log("Liked : ", profileData[0].likedPost);
    console.log("Commented : ", profileData[0].commentedPost);

    user.current = {
      firstname: profileData[0].user.firstname,
      lastname: profileData[0].user.lastname,
      email: profileData[0].user.email,
      blocked: profileData[0].user.blocked,
      blockedBy: profileData[0].user.blockedBy,
      suscribedTo: profileData[0].user.toFrienship,
      suscribers: profileData[0].user.fromFriendship,
      posts: profileData[0].user.posts,
      postsLiked: profileData[0].user.postsLiked,
      postsCommented: profileData[0].user.postComments,
      suscribersNum: profileData[0].friendcount,
    };

    profileData[0].posted.map(
      (postData: {
        createdAt: string;
        id: number;
        user: User;
        postComments: [];
        htmlContent: string;
        postLikes: [];
        postAttachments: [];
      }) => {
        posted.current.push({
          id: postData.id,
          createdAt: postData.createdAt,
          author: postData.user,
          content: postData.htmlContent,
          likes: postData.postLikes,
          attachments: postData.postAttachments,
          comment: null,
        });
      }
    );
    console.log("Posted : ", posted.current);

    profileData[0].likedPost.map(
      (likedPostData: {
        createdAt: string;
        id: number;
        user: User;
        postComments: [];
        htmlContent: string;
        postLikes: [];
        postAttachments: [];
      }) => {
        likedPost.current.push({
          id: likedPostData.id,
          createdAt: likedPostData.createdAt,
          author: likedPostData.user,
          content: likedPostData.htmlContent,
          likes: likedPostData.postLikes,
          attachments: likedPostData.postAttachments,
          comment: null,
        });
      }
    );
    profileData[0].commentedPost.map(
      (commentedPostData: {
        createdAt: string;
        id: number;
        user: User;
        postComments: [];
        htmlContent: string;
        postLikes: [];
        postAttachments: [];
      }) => {
        commentedPost.current.push({
          id: commentedPostData.id,
          createdAt: commentedPostData.createdAt,
          author: commentedPostData.user,
          content: commentedPostData.htmlContent,
          likes: commentedPostData.postLikes,
          attachments: commentedPostData.postAttachments,
          comment: null,
        });
      }
    );
  }
  if (profileQueryError) {
    return <div>...Errror....</div>;
  }

  return (
    <div id='profile'>
      <InfoBar
        showButton={true}
        userName={user.current?.lastname + " " + user.current?.firstname}
        numfriends={user.current?.suscribersNum}
      />
      <Tabs
        title1='Post'
        title2='Like'
        title3='Comment'
        icon1={<LocalPostOfficeIcon />}
        icon2={<FavoriteBorderIcon />}
        icon3={<CommentIcon />}
        content1={posted.current.map((post) => (
          <div>
            <PostComponent key={post.id} post={post} canLike={true} />
          </div>
        ))}
        content2={likedPost.current.map((likePost) => (
          <div>
            <PostComponent key={likePost.id} post={likePost} canLike={false} />
          </div>
        ))}
        content3={commentedPost.current.map((commentPost) => (
          <div>
            <PostComponent
              key={commentPost.id}
              post={commentPost}
              canLike={false}
            />
          </div>
        ))}
      />
    </div>
  );
}

export default Profile;
