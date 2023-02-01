import PostComponent from "../components/PostAndComment/PostComponent";
import Post from "../models/PostModel";
import User from "../models/UserModel";

function Home() {
  const users: User[] = [
    {
      firstname: "Cyril",
      email:"",
      lastname: "Cauquil",
      blocked: [],
      blockedBy: [],
      suscribedTo: [],
      suscribers: [],
      posts: [],
      postsLiked: [],
      postsCommented:[],
      suscribersNum:2,
    },
    {
      firstname: "Yanis",
      lastname: "Bevia",
      email:"",
      blocked: [],
      blockedBy: [],
      suscribedTo: [],
      suscribers: [],
      posts: [],
      postsLiked: [],
      postsCommented:[],
      suscribersNum:2,
    },
  ];

  const posts: Post[] = [
    {
      id: 0,
      createdAt: "16 Janvier 2023 ",
      author: users[0],
      content: "wallpaper",
      likes: [],
  
      attachments: [],
    },
    {
      id: 1,
      createdAt: "20 Janvier 2023",
      author: users[1],
      content: "wallpaper",
      likes: [],
      attachments: [],
    },
  ];

  users[0].posts.push(posts[0]);
  users[1].posts.push(posts[1]);

  return (
    <div id='home-page' style={{ backgroundColor: "inherit", height: "100%" }}>
      {posts.map((post) => (
        <div>
          <PostComponent key={post.id} post={post} canLike={true} />
        </div>
      ))}
    </div>
  );
}

export default Home;
