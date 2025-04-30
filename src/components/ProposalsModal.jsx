import { useState, useEffect } from "react";
import "../index.css";
import ProposalsModal from "../components/ProposalsModal";

const Home = () => {
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [notifications, setNotifications] = useState(0);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const [modalPostId, setModalPostId] = useState(null); // ID del post abierto en el modal

  useEffect(() => {
    document.body.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    fetch("http://localhost:5000/api/posts/all")
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error("Error cargando publicaciones", err));
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  };

  const handlePost = () => {
    if (newPost.trim() === "") return;
    const newEntry = {
      id: Date.now(),
      author: "Tú",
      avatar: "https://randomuser.me/api/portraits/men/99.jpg",
      title: "Nuevo Proyecto",
      price: "$???",
      desc: newPost,
      date: "Justo ahora",
      likes: 0,
      comments: [],
      proposals: []
    };
    setPosts([newEntry, ...posts]);
    setNewPost("");
    setNotifications(notifications + 1);
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleAddProposal = (postId, proposal) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, proposals: [...(post.proposals || []), proposal] }
        : post
    ));
  };

  const filteredPosts = posts.filter(p =>
    p.desc?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">
      <nav className="navbar">
        <h1 className="logo">MeetDevp</h1>
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        <div className="notification-icon">
          🔔 <span className="notification-count">{notifications}</span>
        </div>
      </nav>

      <div className="new-post">
        <textarea
          placeholder="¿Qué necesitas desarrollar?"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button onClick={handlePost}>Publicar</button>
      </div>

      <section className="projects">
        {filteredPosts.map((p) => (
          <div key={p.id} className="project-card">
            <img src={p.avatar} className="avatar" alt="Avatar" />
            <h3>{p.title}</h3>
            <p className="author">{p.author} - {p.date}</p>
            <p>{p.desc}</p>
            <span className="price">{p.price}</span>
            <div className="interaction-bar">
              <button onClick={() => handleLike(p.id)}>👍 {p.likes}</button>
              <button onClick={() => setModalPostId(p.id)}>💼 Ver propuestas</button>
            </div>
          </div>
        ))}
      </section>

      {/* MODAL */}
      {modalPostId && (
        <ProposalsModal
          postId={modalPostId}
          proposals={posts.find(p => p.id === modalPostId)?.proposals || []}
          onClose={() => setModalPostId(null)}
          onAddProposal={handleAddProposal}
        />
      )}
    </div>
  );
};

export default Home;
