import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "@firebase/firestore";
import { async } from "@firebase/util";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Moment from "react-moment";

function Post({ username, id, img, userImg, caption }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState([]);
  const [comments, setComments] = useState([]);
  // Likes---
  const [likes, setLikes] = useState([]);
  // checks the like state
  const [hasLiked, setHasLiked] = useState(false);

  // comments
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  // Likes
  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );
  // populating the like
  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  // post like logic
  const likePost = async () => {
    // deleting the like if liked
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  // Save the comment to the firebase db
  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="bg-white border rounded-sm my-7">
      {/* Header */}
      <div className="flex items-center p-5">
        <img
          src={userImg}
          alt="post-image"
          className="object-contain w-12 h-12 p-1 mr-3 border rounded-full"
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>
      {/* img */}
      <img src={img} alt="post" className="object-cover w-full" />

      {/* buttons */}

      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="text-red-500 btn"
              />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}

            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      {/* caption */}
      <p className="p-5 truncate">
        {/* Show how many likes */}
        {likes.length > 0 && (
          <p className="mb-1 font-bold">{likes.length} likes</p>
        )} 


        <span className="mr-1 font-bold">{username} </span>
        {caption}
      </p>
      {/* comments */}
      {comments.length > 0 && (
        <div className="h-20 ml-10 overflow-y-scroll scrollbar-thumb-black scrollbar-thin ">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center mb-3 space-x-2 ">
              <img
                src={comment.data().userImage}
                alt="comment-user-image"
                className="rounded-full h-7"
              />
              <p className="flex-1 text-sm">
                <span className="font-bold">{comment.data().username} </span>
                {comment.data().comment}
              </p>
              {/* Grabs the comment time and show realtime (comment ago)interval={1000} */}
              <Moment
                fromNow
                className="pr-5 text-xs font-semibold text-gray-600"
              >
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* input box */}
      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7 " />
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            className="flex-1 border-none outline-none focus:ring-0"
            placeholder="Add a comment..."
          />
          <button
            type="submit"
            disabled={!comment.toString().trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
