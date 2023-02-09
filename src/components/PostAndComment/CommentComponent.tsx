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
    email: "",
    blocked: [],
    blockedBy: [],
    suscribedTo: [],
    suscribers: [],
    posts: [],
    postsLiked: [],
    postsCommented: [],
    suscribersNum: 2,
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Commentaire</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Commentaire'
          type='email'
          fullWidth
          variant='standard'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Annuler</Button>
        <Button variant='contained'>Publier</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CommentComponent;
