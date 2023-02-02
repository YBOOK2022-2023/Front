import { Box, CircularProgress } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import PostComponent from "../components/PostAndComment/PostComponent";
import { configAxios } from "../config/configAxios";
import Post from "../models/PostModel";
import User from "../models/UserModel";
import { UserAccountContext } from "../providers/UserAccount";

function Home() {
  const users: User[] = [
    {
      firstname: "Cyril",
      email: "",
      lastname: "Cauquil",
      blocked: [],
      blockedBy: [],
      suscribedTo: [],
      suscribers: [],
      posts: [],
      postsLiked: [],
      postsCommented: [],
      suscribersNum: 2,
    },
    {
      firstname: "Yanis",
      lastname: "Bevia",
      email: "",
      blocked: [],
      blockedBy: [],
      suscribedTo: [],
      suscribers: [],
      posts: [],
      postsLiked: [],
      postsCommented: [],
      suscribersNum: 2,
    },
  ];

  // const initPosts: Post[] = [
  //   {
  //     id: 0,
  //     createdAt: "16 Janvier 2023 ",
  //     author: users[0],
  //     content: "wallpaper",
  //     likes: [],

  //     attachments: [],
  //   },
  //   {
  //     id: 1,
  //     createdAt: "20 Janvier 2023",
  //     author: users[1],
  //     content: "wallpaper",
  //     likes: [],
  //     attachments: [],
  //   },
  // ];

  const posts = useRef<Post[]>([]);
  const postsLiked = useRef<Post[]>([]);
  const { getJwt } = useContext(UserAccountContext);

  const fetchPosts = async () => {
    const idToken = await getJwt();
    return await configAxios
      .get("/posts", {
        headers: { Authorization: `Bearer ${idToken}` },
      })
      .then((response) => {
        const data = response.data;
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const {
    isSuccess: postQuerySuccess,
    isError: postQueryError,
    isLoading: postQueryLoading,
    data: postData,
  } = useQuery("postData", fetchPosts, { staleTime: 3600000 });

  if (postQueryLoading)
    return (
      <Box mt={"400px"} sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  let x = 0;

  if (postQuerySuccess) {
    postData[0].map(
      (postData: {
        createdAt: string;
        id: number;
        user: User;
        htmlContent: string;
        postAttachments: [];
        postLikes: [];
      }) => {
        if (postsLiked.current.length < 3) {
          postsLiked.current.push({
            createdAt: postData.createdAt,
            id: postData.id,
            author: postData.user,
            content: postData.htmlContent,
            attachments: postData.postAttachments,
            likes: postData.postLikes,
            comment: null,
          });
        }
      }
    );
    postData[1].map(
      (postData: {
        createdAt: string;
        id: number;
        user: User;
        postComments: [];
        htmlContent: string;
        postLikes: [];
        postAttachments: [];
      }) => {
        posts.current.push({
          createdAt: postData.createdAt,
          id: postData.id,
          author: postData.user,
          content: postData.htmlContent,
          attachments: postData.postAttachments,
          likes: postData.postLikes,
          comment: null,
        });
      }
    );
  } else if (postQueryError) {
    return <div>...Errror....</div>;
  }

  // users[0].posts.push(posts[0]);
  // users[1].posts.push(posts[1]);

  return (
    <div id='home-page' style={{ backgroundColor: "inherit", height: "100%" }}>
      {posts && postsLiked ? (
        <div>
          {postsLiked.current.map((post) => (
            <div>
              <PostComponent key={post.id} post={post} canLike={true} />
            </div>
          ))}
          {posts.current.map((post) => (
            <div>
              <PostComponent key={post.id} post={post} canLike={true} />
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Home;
