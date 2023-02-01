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
  createdAt: string;
  content: string;
  author: User;
  likes: User[];
  attachments: [];
}

export interface Comment {
  author: User;
  content: string;
}


/* interface Attachment {
  id: number;
  post: Post;
  postId: number;
  type: DocumentType;
  s3Key: string;
} */