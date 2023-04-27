import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts } from "./features/posts/postSlice";
import AddPostForm from "./features/posts/addPostForm";
import PostAuthor from "./features/posts/PostAuthor";
import TimeAgo from "./features/posts/TimeAgo";
import ReactionButtons from "./features/posts/Reaction";

function App() {
  const posts = useSelector(selectAllPosts);

  const renderPost = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((post) => (
      <article key={post.id}>
        <h3>{post.title}</h3>
        <p>{post?.content?.substring(0, 50)}...</p>
        <p className="postCredit">
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </p>
        <ReactionButtons post={post} />
      </article>
    ));
  return (
    <div style={{ padding: "6rem " }}>
      <AddPostForm />
      <section>
        <h2>Posts</h2>
        {renderPost}
      </section>
    </div>
  );
}

export default App;
