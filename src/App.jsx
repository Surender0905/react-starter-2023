import { useSelector, useDispatch } from "react-redux";
import {
  fetchPosts,
  getPostsError,
  getPostsStatus,
  selectAllPosts,
} from "./features/posts/postSlice";
import AddPostForm from "./features/posts/addPostForm";

import { useEffect } from "react";
import PostsExcerpt from "./features/posts/PostsExpert";

function App() {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const status = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  let content;
  if (status === "loading") {
    content = <p>"Loading..."</p>;
  } else if (status === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post, i) => (
      <PostsExcerpt key={i} post={post} />
    ));
  } else if (status === "failed") {
    content = <p>{error}</p>;
  }
  return (
    <div style={{ padding: "6rem " }}>
      <AddPostForm />
      <section>
        <h2>Posts</h2>
        {content}
      </section>
    </div>
  );
}

export default App;
