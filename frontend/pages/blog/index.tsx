import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const BLOG_API_URL = "http://localhost:3130/blog/post";
const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(BLOG_API_URL).then((res) => setPosts(res.data));
  }, []);

  const createPost = () => {
    axios
      .post(BLOG_API_URL, {
        title: "New Post",
        content: "New Post Content",
        author_id: 1,
        tag_ids: [],
      })
      .then((res) => {
        setPosts([...posts, res.data]);
      });
  };

  return (
    <>
      <div>
        <h1>Blog</h1>
        {posts.map((post) => (
          <div key={post.id}>
            <Link href="/blog/[id]" as={`/blog/${post.id}`}>
              {post.title}
            </Link>
          </div>
        ))}
      </div>
      <button onClick={createPost}>Create Post</button>
    </>
  );
};

export default Blog;

// TODO 1: 入力BOXを用意し、記事を作成できるようにする（ユーザーは固定）
// TODO 2: 記事詳細ページを作って繋げる
// TODO 3: タグを選択できるようにする
