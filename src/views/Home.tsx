import { Box, CircularProgress } from "@mui/material";
import { useContext, useRef } from "react";
import { useQuery } from "react-query";
import PostComponent from "../components/PostAndComment/PostComponent";
import { configAxios } from "../config/configAxios";
import Post from "../models/PostModel";
import User from "../models/UserModel";
import { UserAccountContext } from "../providers/UserAccount";

function Home() {
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
