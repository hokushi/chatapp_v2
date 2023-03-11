import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const Blog = () => {
  const router = useRouter();
  const post_id = router.query.id;
  const BLOG_DETAIL_API_URL = `http://localhost:3130/blog/${post_id}`;
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // BlogDetailViewのAPIを叩く
  useEffect(() => {
    if (router.isReady) {
      axios.get(BLOG_DETAIL_API_URL).then((res) => {
        setPost(res.data);
      });
    }
  }, [router]);

  const editPost = () => {
    axios
      .put(BLOG_DETAIL_API_URL, {
        title: title,
        content: content,
        author_id: 1,
        tag_ids: [],
      })
      .then((res) => {
        alert("成功");
      })
      .catch((err) => {
        alert(err.code);
      });
  };

  return (
    <>
      <div>{post && post.content}</div>
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
      <button onClick={editPost}>Create Post</button>
    </>
  );
};

export default Blog;
