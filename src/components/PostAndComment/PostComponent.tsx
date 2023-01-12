import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Post from "../../models/PostModel";
import CommentIcon from "@mui/icons-material/Comment";
import { useEffect, useState } from "react";
import CommentComponent from "./CommentComponent";
import ViewComments from "./ViewCommentComponent";
import { Collapse } from "@mui/material";
import Comments from "./CommentsComponent";

export default function PostComponent(props: { post: Post }) {
  const styles = {
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9,
      marginTop: "30",
    },
  };

  const { post } = props;

  const currentUser = {
    firstname: "Cyril",
    lastname: "Cauquil",
    blocked: [],
    blockedBy: [],
    suscribedTo: [],
    suscribers: [],
    posts: [],
  };

  const [openComment, setOpenComment] = useState(false);

  const handleCommentClose = (value: boolean) => {
    requestAnimationFrame(() => setOpenComment(false));
  };

  const [liked, setLiked] = useState<boolean | null>(null);

  useEffect(() => {
    liked
      ? post.likes.push(currentUser)
      : (post.likes = post.likes.filter(
          (user) =>
            user.firstname !== currentUser.firstname &&
            user.lastname !== currentUser.lastname
        ));
  });

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ mx: 2, my: 3 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: stringToColor(post.author.firstname) }}
            aria-label='recipe'
            alt={`${post.author.firstname} ${post.author.lastname}`}
          >
            {post.author.firstname[0]}
          </Avatar>
        }
        title={post.author.firstname + " " + post.author.lastname}
        subheader='September 14, 2016'
      />
      <CardMedia
        style={styles.media}
        image={require("../../assets/Baam_black_and_white.jpg")}
      />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label='add to favorites'
          onClick={() => setLiked(!liked)}
        >
          <FavoriteIcon color={liked ? "primary" : "action"} />
        </IconButton>

        <IconButton
          aria-label='comment'
          onClick={() => {
            setOpenComment(true);
          }}
        >
          <CommentIcon />
          <CommentComponent
            open={openComment}
            setOpen={handleCommentClose}
            post={post}
          />
        </IconButton>

        <ViewComments
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </ViewComments>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <Comments post={post} />
      </Collapse>
    </Card>
  );
}

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
