import PostComponent from "../components/PostAndComment/PostComponent";
import Post from "../models/PostModel";
import User from "../models/UserModel";

function Home() {
  const users: User[] = [
    {
      firstname: "Cyril",
      lastname: "Cauquil",
      blocked: [],
      blockedBy: [],
      suscribedTo: [],
      suscribers: [],
      posts: [],
    },
    {
      firstname: "Yanis",
      lastname: "Bevia",
      blocked: [],
      blockedBy: [],
      suscribedTo: [],
      suscribers: [],
      posts: [],
    },
  ];

  const posts: Post[] = [
    {
      id: 0,
      author: users[0],
      comment: [],
      content: "wallpaper",
      likes: [],
    },
    {
      id: 1,
      author: users[1],
      comment: [],
      content: "wallpaper",
      likes: [],
    },
  ];

  users[0].posts.push(posts[0]);
  users[1].posts.push(posts[1]);

  return (
    <div id='home-page' style={{ backgroundColor: "inherit", height: "100%" }}>
      {posts.map((post) => (
        <div>
          <PostComponent key={post.id} post={post} />
        </div>
      ))}
    </div>
  );
}

export default Home;
