import Post from "./PostModel";

export default interface User {
  lastname: string;
  firstname: string;
  suscribedTo: User[];
  suscribers: User[];
  posts: Post[];
  blocked: User[];
  blockedBy: User[];
}
