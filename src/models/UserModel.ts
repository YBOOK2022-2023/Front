import Post from "./PostModel";

export default interface User {
  lastname: string;
  email: string;
  firstname: string;
  suscribedTo: User[];
  suscribers: User[];
  posts: Post[];
  postsLiked: Post[];
  postsCommented: Post[];
  blocked: User[];
  blockedBy: User[];
  suscribersNum: number;
}
