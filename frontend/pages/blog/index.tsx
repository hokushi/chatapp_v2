import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const BLOG_API_URL = "http://localhost:3130/blog/";
const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    axios.get(BLOG_API_URL).then((res) => setPosts(res.data));
  }, []);

  const createPost = () => {
    axios
      .post(BLOG_API_URL, {
        title: title,
        text: content,
        author_id: 1,
        tag_ids: [],
      })
      .then((res) => {
        setPosts([res.data, ...posts]);
      })
      .catch((err) => {
        alert(err.code);
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
              {post.created_at}
            </Link>
          </div>
        ))}
      </div>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        autoFocus={true}
        type="text"
        placeholder="記事タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        autoFocus={true}
        type="text"
        placeholder="記事内容"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={createPost}>Create Post</button>
    </>
  );
};

export default Blog;

// TODO 1: 投稿日時も表示する
// TODO 2: 入力BOXを用意し、記事を作成できるようにする（ユーザーは固定）
// TODO 3: 記事詳細ページを作って繋げる
// TODO 4: タグを選択できるようにする
