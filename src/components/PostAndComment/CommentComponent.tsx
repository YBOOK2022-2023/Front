import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import Post from "../../models/PostModel";

function CommentComponent(props: {
  open: boolean;
  setOpen: (value: boolean) => void;
  post: Post;
}) {
  const { open, setOpen, post } = props;
  const [comment, setComment] = useState("");

  const currentUser = {
    firstname: "Cyril",
    lastname: "Cauquil",
    blocked: [],
    blockedBy: [],
    suscribedTo: [],
    suscribers: [],
    posts: [],
  };

  const postComment = () => {
    post.comment.push({
      author: currentUser,
      content: comment,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Email Address'
          type='email'
          fullWidth
          variant='standard'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={postComment}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CommentComponent;
