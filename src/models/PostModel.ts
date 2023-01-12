import User from "./UserModel";

// export default interface Post {
//   id: number;
//   content: string;
//   author: User;
//   likes: User[];
//   comment: Comment[];
// }

export default interface Post {
  id: number;
  content: string;
  author: User;
  likes: User[];
  comment: Comment[];
}

interface Comment {
  author: User;
  content: string;
}
