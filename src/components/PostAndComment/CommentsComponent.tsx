import { CardContent } from "@mui/material";
import Post from "../../models/PostModel";

function Comments(props: { post: Post }) {
  const { post } = props;
  return (
    <CardContent>
      {post.comment.map((comment) => (
        <div key={post.id}>
          <strong>
            {comment.author.firstname} {comment.author.lastname}
          </strong>
          :{comment.content}
        </div>
      ))}
    </CardContent>
  );
}

export default Comments;
