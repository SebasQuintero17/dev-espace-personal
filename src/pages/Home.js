import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProposalsModal from "../components/ProposalsModal";
import { supabase } from "../supabaseClient";
//import { ReactComponent as Logo } from "../assets/Meet-Devp.svg";
import "../index.css";

const Home = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const commentInputRefs = useRef({});

  // Estados principales
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [notifications, setNotifications] = useState(3);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para nuevas publicaciones
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newTags, setNewTags] = useState("");
  const [newBudget, setNewBudget] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  // Estados para filtrado y ordenamiento
  const [selectedTag, setSelectedTag] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Estados para modales
  const [modalPostId, setModalPostId] = useState(null);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);

  // Estados para interacciones
  const [likedPosts, setLikedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
  const [showComments, setShowComments] = useState({});

  // Estados para ofertas y tendencias
  const [offers, setOffers] = useState([
    {
      id: 1,
      title: "Desarrollo FullStack",
      price: "$1200",
      skills: ["React", "Node.js", "MongoDB"],
      urgency: "Alta",
    },
    {
      id: 2,
      title: "Optimización SEO",
      price: "$300",
      skills: ["SEO", "Analytics", "Content"],
      urgency: "Media",
    },
    {
      id: 3,
      title: "App React Native",
      price: "$1500",
      skills: ["React Native", "Firebase", "UI/UX"],
      urgency: "Alta",
    },
    {
      id: 4,
      title: "Diseño UX/UI",
      price: "$400",
      skills: ["Figma", "Adobe XD", "Prototyping"],
      urgency: "Baja",
    },
    {
      id: 5,
      title: "Automatización con Python",
      price: "$800",
      skills: ["Python", "Selenium", "Data Analysis"],
      urgency: "Media",
    },
  ]);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [trendingTopics, setTrendingTopics] = useState([
    { name: "react", count: 128 },
    { name: "javascript", count: 95 },
    { name: "webdev", count: 87 },
    { name: "python", count: 76 },
    { name: "ai", count: 65 },
  ]);

  // Estados para pestañas y notificaciones
  const [activeTab, setActiveTab] = useState("feed");
  const [userNotifications, setUserNotifications] = useState([
    { id: 1, type: "like", user: "Carlos", content: "le dio like a tu publicación", time: "2m", read: false },
    { id: 2, type: "comment", user: "María", content: "comentó en tu proyecto", time: "15m", read: false },
    { id: 3, type: "proposal", user: "Juan", content: "envió una propuesta", time: "1h", read: false },
  ]);

  // Efectos
  useEffect(() => {
    document.body.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // Simulamos una llamada a API
        setTimeout(() => {
          const mockPosts = [
            {
              id: 1,
              author: "Laura Chen",
              avatar: "https://randomuser.me/api/portraits/women/44.jpg",
              title: "Desarrollo de plataforma e-learning",
              price: "$2500",
              desc: "Busco desarrollador full-stack para crear una plataforma de cursos online con sistema de pagos, foros y seguimiento de progreso.",
              date: "Hace 2 horas",
              likes: 24,
              comments: [
                {
                  id: 1,
                  user: "Miguel",
                  avatar: "https://randomuser.me/api/portraits/men/22.jpg",
                  text: "Me interesa, tengo experiencia en plataformas similares.",
                  time: "Hace 1 hora",
                  likes: 3,
                },
                {
                  id: 2,
                  user: "Sara",
                  avatar: "https://randomuser.me/api/portraits/women/29.jpg",
                  text: "¿Cuál es el plazo estimado para el proyecto?",
                  time: "Hace 30 minutos",
                  likes: 1,
                },
              ],
              proposals: [
                {
                  id: 1,
                  user: "Carlos",
                  price: "$2300",
                  timeframe: "3 semanas",
                  message: "Puedo desarrollar la plataforma completa con todas las funcionalidades.",
                },
              ],
              tags: ["fullstack", "react", "nodejs", "mongodb"],
              deadline: "30 días",
              attachments: ["mockup-platform.pdf"],
              views: 156,
              saved: 12,
            },
            {
              id: 2,
              author: "Marcos Silva",
              avatar: "https://randomuser.me/api/portraits/men/32.jpg",
              title: "Rediseño de interfaz para app móvil",
              price: "$800",
              desc: "Necesito un diseñador UX/UI para rediseñar la interfaz de una aplicación móvil de fitness. Se requiere experiencia en diseño de interfaces intuitivas y atractivas.",
              date: "Hace 5 horas",
              likes: 18,
              comments: [
                {
                  id: 1,
                  user: "Ana",
                  avatar: "https://randomuser.me/api/portraits/women/65.jpg",
                  text: "¿Tienes ya alguna guía de estilo definida?",
                  time: "Hace 2 horas",
                  likes: 0,
                },
              ],
              proposals: [],
              tags: ["uxui", "mobile", "design", "figma"],
              deadline: "15 días",
              attachments: [],
              views: 89,
              saved: 7,
            },
            {
              id: 3,
              author: "Elena Rodríguez",
              avatar: "https://randomuser.me/api/portraits/women/33.jpg",
              title: "Desarrollo de API para sistema de inventario",
              price: "$1200",
              desc: "Busco desarrollador backend para crear una API RESTful que gestione un sistema de inventario para tienda online. Debe integrarse con sistema de pagos y envíos.",
              date: "Hace 1 día",
              likes: 31,
              comments: [
                {
                  id: 1,
                  user: "Roberto",
                  avatar: "https://randomuser.me/api/portraits/men/41.jpg",
                  text: "¿Qué tecnologías prefieres para el backend?",
                  time: "Hace 20 horas",
                  likes: 2,
                },
                {
                  id: 2,
                  user: "Carmen",
                  avatar: "https://randomuser.me/api/portraits/women/22.jpg",
                  text: "¿Tienes ya la base de datos diseñada?",
                  time: "Hace 18 horas",
                  likes: 1,
                },
                {
                  id: 3,
                  user: "Luis",
                  avatar: "https://randomuser.me/api/portraits/men/53.jpg",
                  text: "Me interesa, tengo experiencia en sistemas similares.",
                  time: "Hace 12 horas",
                  likes: 0,
                },
              ],
              proposals: [
                {
                  id: 1,
                  user: "David",
                  price: "$1100",
                  timeframe: "2 semanas",
                  message: "Puedo desarrollar la API completa con documentación.",
                },
                {
                  id: 2,
                  user: "Sofía",
                  price: "$1300",
                  timeframe: "10 días",
                  message: "Ofrezco desarrollo rápido y soporte post-entrega.",
                },
              ],
              tags: ["backend", "api", "nodejs", "mongodb"],
              deadline: "20 días",
              attachments: ["api-specs.pdf", "db-schema.png"],
              views: 203,
              saved: 19,
            },
            {
              id: 4,
              author: "Javier López",
              avatar: "https://randomuser.me/api/portraits/men/55.jpg",
              title: "Desarrollo de landing page para startup",
              price: "$400",
              desc: "Necesito una landing page moderna y atractiva para mi startup de tecnología. Debe ser responsive y optimizada para SEO.",
              date: "Hace 2 días",
              likes: 15,
              comments: [],
              proposals: [
                {
                  id: 1,
                  user: "María",
                  price: "$350",
                  timeframe: "1 semana",
                  message: "Puedo crear una landing page optimizada y moderna.",
                },
              ],
              tags: ["frontend", "landing", "responsive", "seo"],
              deadline: "7 días",
              attachments: [],
              views: 78,
              saved: 5,
            },
            {
              id: 5,
              author: "Tú",
              avatar: "https://randomuser.me/api/portraits/men/99.jpg",
              title: "Integración de pasarela de pagos",
              price: "$600",
              desc: "Busco desarrollador con experiencia en integración de pasarelas de pago (Stripe, PayPal) para tienda online existente desarrollada en React.",
              date: "Hace 3 días",
              likes: 22,
              comments: [
                {
                  id: 1,
                  user: "Pablo",
                  avatar: "https://randomuser.me/api/portraits/men/12.jpg",
                  text: "¿Qué pasarelas específicas necesitas integrar?",
                  time: "Hace 2 días",
                  likes: 1,
                },
                {
                  id: 2,
                  user: "Laura",
                  avatar: "https://randomuser.me/api/portraits/women/8.jpg",
                  text: "Tengo experiencia con Stripe y PayPal, podemos hablar.",
                  time: "Hace 1 día",
                  likes: 2,
                },
              ],
              proposals: [
                {
                  id: 1,
                  user: "Carlos",
                  price: "$550",
                  timeframe: "5 días",
                  message: "He realizado múltiples integraciones con estas pasarelas.",
                },
              ],
              tags: ["payments", "stripe", "paypal", "react"],
              deadline: "10 días",
              attachments: ["requirements.pdf"],
              views: 112,
              saved: 8,
            },
          ];
          setPosts(mockPosts);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error("Error cargando publicaciones", err);
        setError("Error al cargar las publicaciones. Intenta de nuevo más tarde.");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Calcular todas las etiquetas únicas de los posts
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags || [])));

  // Funciones
  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const handleNextOffer = () => setCurrentOfferIndex((i) => (i + 1) % offers.length);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setAttachments([...attachments, ...files.map((file) => file.name)]);
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handlePost = () => {
    if (!newTitle.trim() || !newDescription.trim()) {
      alert("Por favor completa al menos el título y la descripción");
      return;
    }

    const tagsArray = newTags
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t);

    const newEntry = {
      id: Date.now(),
      author: "Tú",
      avatar: "https://randomuser.me/api/portraits/men/99.jpg",
      title: newTitle,
      price: newBudget ? `$${newBudget}` : "A convenir",
      desc: newDescription,
      date: "Justo ahora",
      likes: 0,
      comments: [],
      proposals: [],
      tags: tagsArray,
      deadline: newDeadline || "No especificado",
      attachments: attachments,
      views: 0,
      saved: 0,
    };

    setPosts([newEntry, ...posts]);
    setNewTitle("");
    setNewDescription("");
    setNewTags("");
    setNewBudget("");
    setNewDeadline("");
    setAttachments([]);
    setIsExpanded(false);
    setNotifications((n) => n + 1);
  };

  const handleLike = (postId) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId));
      setPosts(
        posts.map((p) => (p.id === postId ? { ...p, likes: Math.max(0, p.likes - 1) } : p))
      );
    } else {
      setLikedPosts([...likedPosts, postId]);
      setPosts(posts.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p)));
    }
  };

  const handleSavePost = (postId) => {
    if (savedPosts.includes(postId)) {
      setSavedPosts(savedPosts.filter((id) => id !== postId));
    } else {
      setSavedPosts([...savedPosts, postId]);
    }
  };

  const handleAddProposal = (postId, proposal) => {
    setPosts(
      posts.map((p) =>
        p.id === postId
          ? { ...p, proposals: [...(p.proposals || []), proposal] }
          : p
      )
    );
  };

  const handleCommentChange = (postId, value) => {
    setCommentInputs({ ...commentInputs, [postId]: value });
  };

  const handleAddComment = (postId) => {
    const commentText = commentInputs[postId];
    if (!commentText || !commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      user: "Tú",
      avatar: "https://randomuser.me/api/portraits/men/99.jpg",
      text: commentText.trim(),
      time: "Justo ahora",
      likes: 0,
    };

    setPosts(
      posts.map((p) =>
        p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p
      )
    );

    setCommentInputs({ ...commentInputs, [postId]: "" });
  };

  const toggleComments = (postId) => {
    setShowComments({ ...showComments, [postId]: !showComments[postId] });
  };

  const handleLikeComment = (postId, commentId) => {
    setPosts(
      posts.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: p.comments.map((c) =>
                c.id === commentId ? { ...c, likes: c.likes + 1 } : c
              ),
            }
          : p
      )
    );
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("sbSession");
    navigate("/");
  };

  const markAllNotificationsAsRead = () => {
    setUserNotifications(userNotifications.map((notif) => ({ ...notif, read: true })));
    setNotifications(0);
  };

  const markNotificationAsRead = (id) => {
    setUserNotifications(
      userNotifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
    setNotifications((prev) => Math.max(0, prev - 1));
  };

  const deleteNotification = (id) => {
    const notif = userNotifications.find((n) => n.id === id);
    setUserNotifications(userNotifications.filter((n) => n.id !== id));
    if (!notif.read) {
      setNotifications((prev) => Math.max(0, prev - 1));
    }
  };

  // Filtrar y ordenar posts
  const filteredPosts = posts
    .filter(
      (p) =>
        (p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.desc.toLowerCase().includes(search.toLowerCase())) &&
        (selectedTag === "" || p.tags.includes(selectedTag))
    )
    .sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === "popular") {
        return b.likes - a.likes;
      } else if (sortBy === "budget") {
        return (
          parseInt(b.price.replace(/\D/g, "") || "0") -
          parseInt(a.price.replace(/\D/g, "") || "0")
        );
      }
      return 0;
    });

  // Determinar qué posts mostrar según la pestaña activa
  const displayedPosts =
    activeTab === "feed"
      ? filteredPosts
      : filteredPosts.filter((post) => savedPosts.includes(post.id));

  return (
    <div className="home-container body">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-container">
          <button className="button-effect" data-text="">
        <span className="actual-text">&nbsp;MeetDevp&nbsp;</span>
        <span aria-hidden="true" className="hover-text">&nbsp;MeetDevp&nbsp;</span>
      </button>
        </div>

        <div id="poda" className="search-container">
          <div className="glow"></div>
          <div className="darkBorderBg"></div>
          <div className="darkBorderBg"></div>
          <div className="darkBorderBg"></div>
          <div className="white"></div>
          <div className="border"></div>

          <div id="main" className="search-input-wrapper">
            <input
              placeholder="Buscar proyectos, desarrolladores, tecnologías..."
              type="text"
              name="text"
              className="input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div id="input-mask"></div>
            <div id="pink-mask"></div>
            <div className="filterBorder"></div>
            <div id="filter-icon" onClick={() => setShowFilterMenu(!showFilterMenu)}>
              <svg
                preserveAspectRatio="none"
                height="27"
                width="27"
                viewBox="4.8 4.56 14.832 15.408"
                fill="none"
              >
                <path
                  d="M8.16 6.65002H15.83C16.47 6.65002 16.99 7.17002 16.99 7.81002V9.09002C16.99 9.56002 16.7 10.14 16.41 10.43L13.91 12.64C13.56 12.93 13.33 13.51 13.33 13.98V16.48C13.33 16.83 13.1 17.29 12.81 17.47L12 17.98C11.24 18.45 10.2 17.92 10.2 16.99V13.91C10.2 13.5 9.97 12.98 9.73 12.69L7.52 10.36C7.23 10.08 7 9.55002 7 9.20002V7.87002C7 7.17002 7.52 6.65002 8.16 6.65002Z"
                  stroke="#d6d6e6"
                  strokeWidth="1"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>

            {showFilterMenu && (
              <div className="filter-dropdown glass">
                <h4>Ordenar por</h4>
                <div className="filter-options">
                  <button
                    className={sortBy === "recent" ? "active" : ""}
                    onClick={() => setSortBy("recent")}
                  >
                    <span className="filter-icon">⏱️</span> Más recientes
                  </button>
                  <button
                    className={sortBy === "popular" ? "active" : ""}
                    onClick={() => setSortBy("popular")}
                  >
                    <span className="filter-icon">🔥</span> Más populares
                  </button>
                  <button
                    className={sortBy === "budget" ? "active" : ""}
                    onClick={() => setSortBy("budget")}
                  >
                    <span className="filter-icon">💰</span> Mayor presupuesto
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="navbar-actions">
          <button onClick={toggleTheme} className="theme-toggle neon-box">
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <div className="notification-wrapper">
            <button
              className="notification-button neon-box"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              🔔
              {notifications > 0 && <span className="notification-count">{notifications}</span>}
            </button>

            {showNotifications && (
              <div className="notifications-panel glass neon-box">
                <div className="notifications-header">
                  <h3>Notificaciones</h3>
                  <button onClick={markAllNotificationsAsRead} className="mark-all-read">
                    Marcar todas como leídas
                  </button>
                </div>

                <div className="notifications-list">
                  {userNotifications.length > 0 ? (
                    userNotifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`notification-item ${!notif.read ? "unread" : ""}`}
                        onClick={() => markNotificationAsRead(notif.id)}
                      >
                        <div className="notification-icon">
                          {notif.type === "like" && <span className="icon-like">❤️</span>}
                          {notif.type === "comment" && <span className="icon-comment">💬</span>}
                          {notif.type === "proposal" && <span className="icon-proposal">💼</span>}
                        </div>
                        <div className="notification-content">
                          <p>
                            <strong>{notif.user}</strong> {notif.content}
                          </p>
                          <span className="notification-time">{notif.time}</span>
                        </div>
                        <button
                          className="delete-notification"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notif.id);
                          }}
                        >
                          ✖️
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="no-notifications">No tienes notificaciones</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <button onClick={handleLogout} className="theme-toggle neon-box">
            🔒
          </button>
        </div>
      </nav>

      {/* Layout principal */}
      <div className="main-layout">
        {/* Sidebar izquierda */}
        <aside className="sidebar-left glass neon-box">
          <div className="sidebar-section">
            <h3 className="sidebar-title">Navegación</h3>
            <div className="sidebar-nav">
              <button
                className={`sidebar-nav-item ${activeTab === "feed" ? "active" : ""}`}
                onClick={() => setActiveTab("feed")}
              >
                <span className="nav-icon">📰</span>
                <span>Feed Principal</span>
              </button>
              <button
                className={`sidebar-nav-item ${activeTab === "saved" ? "active" : ""}`}
                onClick={() => setActiveTab("saved")}
              >
                <span className="nav-icon">🔖</span>
                <span>Guardados</span>
                {savedPosts.length > 0 && <span className="badge">{savedPosts.length}</span>}
              </button>
            </div>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-title">Filtrar por etiqueta</h3>
            <div className="tags-container">
              <button
                onClick={() => setSelectedTag("")}
                className={`tag-button ${selectedTag === "" ? "active" : ""}`}
              >
                Todas
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`tag-button ${selectedTag === tag ? "active" : ""}`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-title">Tendencias</h3>
            <div className="trending-topics">
              {trendingTopics.map((topic, index) => (
                <div key={index} className="trending-topic">
                  <span className="topic-name">#{topic.name}</span>
                  <span className="topic-count">{topic.count} proyectos</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Contenido principal */}
        <div className="content">
          <div className={`new-post glass ${isExpanded ? "expanded" : ""}`}>
            <h2 className="neon-text">Publicar nuevo proyecto</h2>

            <div className="post-form">
              <input
                type="text"
                placeholder="Título del proyecto"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="post-input"
                onClick={() => setIsExpanded(true)}
              />

              {isExpanded && (
                <>
                  <textarea
                    rows={3}
                    placeholder="Describe tu proyecto en detalle..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="post-textarea"
                  />

                  <div className="post-form-row">
                    <div className="form-group">
                      <label>Presupuesto ($)</label>
                      <input
                        type="number"
                        placeholder="Ej: 1000"
                        value={newBudget}
                        onChange={(e) => setNewBudget(e.target.value)}
                        className="post-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>Plazo (días)</label>
                      <input
                        type="number"
                        placeholder="Ej: 30"
                        value={newDeadline}
                        onChange={(e) => setNewDeadline(e.target.value)}
                        className="post-input"
                      />
                    </div>
                  </div>

                  <input
                    type="text"
                    placeholder="Etiquetas (ej: frontend,api,react)"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    className="post-input"
                  />

                  <div className="attachments-section">
                    <div className="attachments-header">
                      <h4>Adjuntos</h4>
                      <button type="button" className="attachment-button" onClick={() => fileInputRef.current.click()}>
                        📎 Añadir archivo
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        style={{ display: "none" }}
                        multiple
                      />
                    </div>

                    {attachments.length > 0 && (
                      <div className="attachments-list">
                        {attachments.map((file, index) => (
                          <div key={index} className="attachment-item">
                            <span>{file}</span>
                            <button className="remove-attachment" onClick={() => removeAttachment(index)}>
                              ✖️
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}

              <div className="post-actions">
                {isExpanded && (
                  <button type="button" className="cancel-button" onClick={() => setIsExpanded(false)}>
                    Cancelar
                  </button>
                )}
                <button type="button" className="button-neon" onClick={handlePost}>
                  📤 Publicar Proyecto
                </button>
              </div>
            </div>
          </div>

          <div className="feed-tabs">
            <button className={`feed-tab ${activeTab === "feed" ? "active" : ""}`} onClick={() => setActiveTab("feed")}>
              Feed Principal
            </button>
            <button
              className={`feed-tab ${activeTab === "saved" ? "active" : ""}`}
              onClick={() => setActiveTab("saved")}
            >
              Proyectos Guardados {savedPosts.length > 0 && `(${savedPosts.length})`}
            </button>
          </div>

          <section className="projects">
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Cargando proyectos...</p>
              </div>
            ) : error ? (
              <div className="error-container">
                <p>{error}</p>
              </div>
            ) : displayedPosts.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📭</div>
                <h3>No hay proyectos disponibles</h3>
                <p>No se encontraron proyectos que coincidan con tu búsqueda o filtros.</p>
              </div>
            ) : (
              <AnimatePresence>
                {displayedPosts.map((p) => (
                  <motion.div
                    key={p.id}
                    className="project-card glass"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    layout
                  >
                    <div className="project-header">
                      <div className="author-info">
                        <img src={p.avatar || "/placeholder.svg"} alt="avatar" className="avatar" />
                        <div>
                          <strong className="neon-text">@{p.author}</strong>
                          <span className="post-date">{p.date}</span>
                        </div>
                      </div>
                      <div className="project-actions">
                        <button
                          className={`bookmark-button ${savedPosts.includes(p.id) ? "saved" : ""}`}
                          onClick={() => handleSavePost(p.id)}
                          aria-label={savedPosts.includes(p.id) ? "Quitar de guardados" : "Guardar proyecto"}
                        >
                          {savedPosts.includes(p.id) ? "🔖" : "🔖"}
                        </button>
                      </div>
                    </div>

                    <div className="project-content">
                      <h3 className="project-title neon-text">{p.title}</h3>
                      <p className="project-description">{p.desc}</p>

                      <div className="project-details">
                        <div className="detail-item">
                          <span className="detail-icon">💰</span>
                          <span>{p.price}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-icon">⏱️</span>
                          <span>Plazo: {p.deadline}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-icon">👁️</span>
                          <span>{p.views} vistas</span>
                        </div>
                      </div>

                      {p.attachments && p.attachments.length > 0 && (
                        <div className="project-attachments">
                          <h4>Archivos adjuntos:</h4>
                          <div className="attachments-list">
                            {p.attachments.map((file, index) => (
                              <div key={index} className="attachment-badge">
                                <span className="attachment-icon">📎</span>
                                <span>{file}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="tag-container">
                        {p.tags.map((tag) => (
                          <span key={tag} className="badge" onClick={() => setSelectedTag(tag)}>
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="project-stats">
                      <div className="stat-item">
                        <span className="stat-icon">👍</span>
                        <span>{p.likes}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-icon">💬</span>
                        <span>{p.comments.length}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-icon">💼</span>
                        <span>{p.proposals.length}</span>
                      </div>
                    </div>

                    <div className="interaction-bar">
                      <motion.button
                        whileTap={{ scale: 1.2 }}
                        className={`reaction-button ${likedPosts.includes(p.id) ? "active" : ""}`}
                        onClick={() => handleLike(p.id)}
                      >
                        {likedPosts.includes(p.id) ? "❤️" : "👍"} Me gusta
                      </motion.button>

                      <button className="comment-button" onClick={() => toggleComments(p.id)}>
                        💬 Comentar
                      </button>

                      <button className="share-button">
                        🔗 Compartir
                      </button>

                      <button className="proposal-button" onClick={() => setModalPostId(p.id)}>
                        💼 Propuestas
                      </button>
                    </div>

                    {(showComments[p.id] || p.comments.length > 0) && (
                      <div className="comments-section">
                        {p.comments.length > 0 && (
                          <div className="comments-list">
                            <h4>Comentarios ({p.comments.length})</h4>
                            {p.comments.map((comment) => (
                              <div key={comment.id} className="comment-item">
                                <img
                                  src={comment.avatar || "/placeholder.svg"}
                                  alt={comment.user}
                                  className="comment-avatar"
                                />
                                <div className="comment-content">
                                  <div className="comment-header">
                                    <strong>{comment.user}</strong>
                                    <span className="comment-time">{comment.time}</span>
                                  </div>
                                  <p>{comment.text}</p>
                                  <div className="comment-actions">
                                    <button
                                      className="like-comment-button"
                                      onClick={() => handleLikeComment(p.id, comment.id)}
                                    >
                                      👍 {comment.likes > 0 && comment.likes}
                                    </button>
                                    <button className="reply-button">↩️ Responder</button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="add-comment">
                          <img
                            src="https://randomuser.me/api/portraits/men/99.jpg"
                            alt="Tu avatar"
                            className="comment-avatar"
                          />
                          <div className="comment-input-container">
                            <input
                              type="text"
                              placeholder="Escribe un comentario..."
                              value={commentInputs[p.id] || ""}
                              onChange={(e) => handleCommentChange(p.id, e.target.value)}
                              onKeyPress={(e) => e.key === "Enter" && handleAddComment(p.id)}
                              className="comment-input"
                            />
                            <button
                              className="send-comment-button"
                              onClick={() => handleAddComment(p.id)}
                              disabled={!commentInputs[p.id]}
                            >
                              📤
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </section>
        </div>

        {/* Sidebar derecha */}
        <aside className="sidebar-right glass neon-box">
          <div className="sidebar-section">
            <h3 className="sidebar-title">Ofertas Destacadas</h3>
            <div className="offer-card">
              <div className="offer-header">
                <h4 className="offer-title">{offers[currentOfferIndex].title}</h4>
                <span className="offer-price">{offers[currentOfferIndex].price}</span>
              </div>
              <div className="offer-skills">
                {offers[currentOfferIndex].skills.map((skill, index) => (
                  <span key={index} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="offer-footer">
                <span className={`urgency-badge ${offers[currentOfferIndex].urgency.toLowerCase()}`}>
                  {offers[currentOfferIndex].urgency === "Alta" ? "🔥" : 
                   offers[currentOfferIndex].urgency === "Media" ? "⏱️" : "🔄"}
                  Urgencia {offers[currentOfferIndex].urgency}
                </span>
                <button className="apply-button">Aplicar</button>
              </div>
            </div>
            <div className="offer-navigation">
              <span className="offer-counter">
                {currentOfferIndex + 1}/{offers.length}
              </span>
              <button onClick={handleNextOffer} className="next-offer-button">
                Siguiente →
              </button>
            </div>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-title">Desarrolladores Destacados</h3>
            <div className="featured-devs">
              <div className="featured-dev">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Developer" className="dev-avatar" />
                <div className="dev-info">
                  <strong>Laura Chen</strong>
                  <span className="dev-role">Full Stack Developer</span>
                  <div className="dev-rating">
                    <span className="star-icon">⭐</span>
                    <span className="star-icon">⭐</span>
                    <span className="star-icon">⭐</span>
                    <span className="star-icon">⭐</span>
                    <span className="star-icon">⭐</span>
                    <span>5.0</span>
                  </div>
                </div>
              </div>
              <div className="featured-dev">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Developer" className="dev-avatar" />
                <div className="dev-info">
                  <strong>Marcos Silva</strong>
                  <span className="dev-role">UX/UI Designer</span>
                  <div className="dev-rating">
                    <span className="star-icon">⭐</span>
                    <span className="star-icon">⭐</span>
                    <span className="star-icon">⭐</span>
                    <span className="star-icon">⭐</span>
                    <span className="star-icon half">⭐</span>
                    <span>4.8</span>
                  </div>
                </div>
              </div>
              <div className="featured-dev">
                <img src="https://randomuser.me/api/portraits/women/33.jpg" alt="Developer" className="dev-avatar" />
                <div className="dev-info">
                  <strong>Elena Rodríguez</strong>
                  <span className="dev-role">Backend Developer</span>
                  <div className="dev-rating">
                    <span className="star-icon">⭐</span>
                    <span className="star-icon">⭐</span>
                    <span className="star-icon">⭐</span>
                    <span className="star-icon">⭐</span>
                    <span className="star-icon half">⭐</span>
                    <span>4.7</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="view-all-button">Ver todos los desarrolladores</button>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-title">Estadísticas</h3>
            <div className="stats-container">
              <div className="stat-box">
                <span className="stat-icon">🏆</span>
                <div className="stat-content">
                  <span className="stat-value">24</span>
                  <span className="stat-label">Proyectos completados</span>
                </div>
              </div>
              <div className="stat-box">
                <span className="stat-icon">👥</span>
                <div className="stat-content">
                  <span className="stat-value">1.2k</span>
                  <span className="stat-label">Desarrolladores activos</span>
                </div>
              </div>
              <div className="stat-box">
                <span className="stat-icon">💼</span>
                <div className="stat-content">
                  <span className="stat-value">$45k</span>
                  <span className="stat-label">Pagos este mes</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Modales */}
      {modalPostId && (
        <ProposalsModal
          postId={modalPostId}
          proposals={posts.find((p) => p.id === modalPostId)?.proposals || []}
          onClose={() => setModalPostId(null)}
          onAddProposal={handleAddProposal}
        />
      )}
    </div>
  );
};

export default Home;
