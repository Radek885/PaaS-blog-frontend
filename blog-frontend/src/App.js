import { useEffect, useState } from "react";

const API_URL = "https://pass-blog.onrender.com"; // <- ZMIEŃ NA WŁAŚCIWY URL backendu

function App() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });

  useEffect(() => {
    fetch(`${API_URL}/posts`)
      .then((res) => res.json())
      .then(setPosts)
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const newPost = await res.json();
    setPosts([newPost, ...posts]);
    setForm({ title: "", content: "" });
  };

  return (
    <div style={{ padding: "2em", fontFamily: "sans-serif" }}>
      <h1>Blog</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Tytuł"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <br />
        <textarea
          placeholder="Treść"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
        />
        <br />
        <button type="submit">Dodaj post</button>
      </form>

      <hr />

      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: "1em" }}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <small>{new Date(post.created_at).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default App;
