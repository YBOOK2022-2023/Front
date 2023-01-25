
import styled from "@emotion/styled";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import SectionTitle from "../components/SectionTitle";
import Tabs from "../components/Tabs";
import InfoBar from "../components/InfoBar";
import { useState, useEffect, useContext, useMemo } from 'react';
import{configAxios} from "../config/configAxios";
import { UserAccountContext } from "../providers/UserAccount";
import{useQuery} from "react-query";
import Post from "../models/PostModel";
import User from "../models/UserModel";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import PostComponent from "../components/PostAndComment/PostComponent";
import CircularProgress from '@mui/material/CircularProgress';

//import {fetchPosts} from "../services/apiServicePost";
  
/* FC12 : présence d’un header avec avatar, username, nombre d’amis et photo
de couverture
- FC13 : Présence d’un mécanisme de filtrage pour visualiser posts, likes, et
commentaires
- FC14 : Accès à la page amis */


 function Profile() {


  const { getJwt } = useContext(UserAccountContext); 

    const fetchProfilePosts =async ()=>{
         const idToken =await getJwt();
         return await configAxios.get('/postprofile',{
            headers: { Authorization: `Bearer ${idToken}` },
        }).then((response) => {
            const  data=response.data;
            return data;
        }).catch((error) => {
                console.log(error);
            }); 
        
    }

 /*    const fetchUser = async () => {
        const idToken = await getJwt();
        return await configAxios.get('/user',{
            headers: { Authorization: `Bearer ${idToken}` },
        }).then((response) => {
            const userData=response.data;
            console.log('User Info: ',userData);// This is the response from the server
            return userData;
        }).catch((error) => {
                console.log(error);
            }); 
    };

const fetchUserPosts = async () => {
    const idToken = await getJwt();
    console.log(idToken);
       return await configAxios.get('/postsbyuser', {
             headers: { Authorization: `Bearer ${idToken}` },
         })
         .then((response) => {
             const data=response.data;
             console.log('PostInfo: ',data);// This is the response from the server
              return data;
         })
         .catch((error) => {
             console.log(error);
         });  
 }*/
   const {isSuccess:profileQuerySuccess,isError:profileQueryError,isLoading:profileQueryLoading,data:profileData}=useQuery('profileData',fetchProfilePosts,{staleTime:3600000 })
    //if(profileQuerySuccess){console.log(profileData)}
   /*  const {isSuccess:userQuerySuccess,isError:userQueryError,isLoading:userQueryLoading,data:userData}= useQuery('userData',fetchUser,{staleTime:100000});
    const {isSuccess,isError, isLoading, data:postsData,error } = useQuery("userPost", fetchUserPosts,{staleTime:100000}); */
    if(profileQueryLoading)return <div><Box mt={"400px"} sx={{display: 'flex' }}>
    <CircularProgress />
  </Box>
    </div>
    let user:User=null as any;
    let posted:Post[]=[];
    let  likedPost:Post[]=[];
    let commentedPost:Post[]=[];
    
    if(profileQuerySuccess){

        console.log('User : ',profileData[0].user)
        console.log('Posted : ',profileData[0].posted)
        console.log('Liked : ',profileData[0].likedPost)
        console.log('Commented : ',profileData[0].commentedPost)
         user= {
            firstname: profileData[0].user.firstname,
            lastname: profileData[0].user.lastname,
            email: profileData[0].user.email,
            blocked:profileData[0].user.blocked,
            blockedBy: profileData[0].user.blockedBy,
            suscribedTo: profileData[0].user.toFrienship,
            suscribers: profileData[0].user.fromFriendship,
            posts: profileData[0].user.posts,
            postsLiked: profileData[0].user.postsLiked,
            postsCommented:profileData[0].user.postComments,
            suscribersNum:(profileData[0].user.fromFriendship.length+profileData[0].user.toFrienship.length),
        }; 

       profileData[0].posted.map((postData: {
            createdAt: string; id:number; user: User; postComments:[]; htmlContent: string; postLikes: []; postAttachments: []; 
}) => {
            posted.push(
                {
                id: postData.id,
                createdAt:postData.createdAt,
                author: postData.user,
                comment: postData.postComments,
                content: postData.htmlContent,
                likes: postData.postLikes,
                attachments: postData.postAttachments,
            });
        });
        profileData[0].likedPost.map((likedPostData:{
            createdAt: string; id:number; user: User; postComments:[]; htmlContent: string; postLikes: []; postAttachments: []; 
        })=>{
            likedPost.push(
                {
                id: likedPostData.id,
                createdAt:likedPostData.createdAt,
                author:likedPostData.user,
                comment: likedPostData.postComments,
                content: likedPostData.htmlContent,
                likes: likedPostData.postLikes,
                attachments: likedPostData.postAttachments,
                });
        });
        profileData[0].commentedPost.map((commentedPostData:{
            createdAt: string; id:number; user: User; postComments:[]; htmlContent: string; postLikes: []; postAttachments: []; 
        })=>{
            commentedPost.push({
                id: commentedPostData.id,
                createdAt:commentedPostData.createdAt,
                author:commentedPostData.user,
                comment:commentedPostData.postComments,
                content: commentedPostData.htmlContent,
                likes: commentedPostData.postLikes,
                attachments: commentedPostData.postAttachments,
            })
        });
    }
    if(profileQueryError)return <>...Errror....</>
    

    
  

    
    
  return (

    <div id='profile'>
     
  < InfoBar userName={user.lastname+' '+user.firstname} numfriends={user.suscribersNum}/>   
      <Tabs title1="Post"
          title2="Like"
          title3="Comment"
          icon1={<LocalPostOfficeIcon />}
          icon2={<FavoriteBorderIcon />}
          icon3={<CommentIcon />} 
          content1=  {posted.map((post) => (
                    <div>
                    <PostComponent key={post.id} post={post} canLike={true} />
                    </div>
                ))} 
        content2={likedPost.map((likePost)=>(
            <div>
                <PostComponent key={likePost.id} post={likePost} canLike={false}/>
            </div>
                ))}
                content3={commentedPost.map((commentPost)=>(
                    <div>
                        <PostComponent key={commentPost.id} post={commentPost} canLike={false}/>
                    </div>
                        ))} /> 
        
  
    </div>  
);
}

export default Profile;