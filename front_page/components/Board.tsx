/* File to make component in the Board Page. */
import React from "react";

const Posts = ({ posts, loading } : any) => {
  return (
    <>
      {loading && <div> loading... </div>}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  );
};
export default Posts;
/* Item */

/* Writing form */

/* Editing form */