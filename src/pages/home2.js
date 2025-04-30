"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Code,
  Search,
  Users,
  Briefcase,
  Star,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Heart,
  ArrowRight,
} from "lucide-react"
import "./home2.css"

const Home = () => {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSkills, setSelectedSkills] = useState([])

  useEffect(() => {
    setIsVisible(true)

    // Efecto de desplazamiento suave para los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
          })
        }
      })
    })

    // Inicializar animaciones de entrada
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el)
    })

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener("click", (e) => {})
      })
    }
  }, [])

  const handleTabChange = (index) => {
    setActiveTab(index)
  }

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill))
    } else {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  return (
    <div className={`home-container ${isVisible ? "visible" : ""}`}>
      <Navbar
        onLogin={() => navigate("/login")}
        onSignup={() => navigate("/signup")}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <HeroSection />

      <StatsSection />

      <HowItWorks />

      <DeveloperSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedSkills={selectedSkills}
        toggleSkill={toggleSkill}
      />

      <TechShowcase />

      <FeaturedProjects />

      <BlogSection />

      <Testimonials />

      <FaqSection />

      <CallToAction />

      <Footer />

      <BackToTop />
    </div>
  )
}

// Navbar con tabs integrados
const Navbar = ({ onLogin, onSignup, activeTab, onTabChange }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="logo">
        <button className="button-effect" data-text="MeetDevp">
          <span className="actual-text">&nbsp;MeetDevp&nbsp;</span>
          <span aria-hidden="true" className="hover-text">
            &nbsp;MeetDevp&nbsp;
          </span>
        </button>
      </div>

      {/* Tabs de navegación */}
      <div className="nav-tabs-container">
        <div className="nav-tabs">
          <button className={`tab-btn ${activeTab === 0 ? "active" : ""}`} onClick={() => onTabChange(0)}>
            Inicio
            {activeTab === 0 && <span className="notification">2</span>}
          </button>
          <button className={`tab-btn ${activeTab === 1 ? "active" : ""}`} onClick={() => onTabChange(1)}>
            Proyectos
          </button>
          <button className={`tab-btn ${activeTab === 2 ? "active" : ""}`} onClick={() => onTabChange(2)}>
            Comunidad
          </button>
          <div className="glider" style={{ transform: `translateX(${activeTab * 100}%)` }}></div>
        </div>
      </div>

      <div className="auth-buttons">
        <button className="btn-login" onClick={onLogin}>
          Iniciar Sesión
        </button>
        <button className="btn-signup" onClick={onSignup}>
          Registrarse
        </button>
      </div>

      <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <button onClick={() => onTabChange(0)}>Inicio</button>
        <button onClick={() => onTabChange(1)}>Proyectos</button>
        <button onClick={() => onTabChange(2)}>Comunidad</button>
        <button onClick={onLogin}>Iniciar Sesión</button>
        <button onClick={onSignup}>Registrarse</button>
      </div>
    </nav>
  )
}

const HeroSection = () => (
  <section className="hero">
    <div className="hero-content animate-on-scroll">
      <h1>
        <span className="gradient-text">Conecta</span> con los mejores
        <br />
        <span className="gradient-text">desarrolladores</span> del mundo
      </h1>
      <p className="hero-subtitle">
        La plataforma donde talento y oportunidades se encuentran. Encuentra proyectos desafiantes o el desarrollador
        perfecto para tu idea.
      </p>
      <button className="button-effect" data-text="MeetDevp">
        <span className="actual-text">&nbsp;MeetDevp&nbsp;</span>
        <span aria-hidden="true" className="hover-text">
          &nbsp;MeetDevp&nbsp;
        </span>
      </button>
      <div className="hero-cta">
        <button className="btn-primary">
          Buscar Desarrolladores
          <Search className="btn-icon" size={18} />
        </button>
        <button className="btn-secondary">
          Publicar Proyecto
          <Briefcase className="btn-icon" size={18} />
        </button>
      </div>

      <div className="hero-features">
        <div className="feature">
          <div className="feature-icon">
            <Users size={20} />
          </div>
          <span>Comunidad global</span>
        </div>
        <div className="feature">
          <div className="feature-icon">
            <Star size={20} />
          </div>
          <span>Talento verificado</span>
        </div>
        <div className="feature">
          <div className="feature-icon">
            <MessageSquare size={20} />
          </div>
          <span>Soporte 24/7</span>
        </div>
      </div>
    </div>
    <div className="hero-image animate-on-scroll">
      <div className="code-snippet">
        <div className="code-header">
          <span className="code-dot"></span>
          <span className="code-dot"></span>
          <span className="code-dot"></span>
          <span className="code-title">meetDevp.js</span>
        </div>
        <pre>
          {`
  function meetDevp() {
    const devs = findTopDevelopers();
    const projects = getExcitingProjects();
    
    return connect(devs, projects);
  }
  
  // Encuentra el match perfecto
  function findMatch(skills, requirements) {
    return skills.filter(skill => 
      requirements.includes(skill)
    ).length / requirements.length;
  }
        `}
        </pre>
      </div>
      <div className="floating-elements">
        <div className="floating-element html">&lt;/&gt;</div>
        <div className="floating-element react">⚛️</div>
        <div className="floating-element js">JS</div>
        <div className="floating-element python">🐍</div>
      </div>
    </div>
  </section>
)

const StatsSection = () => (
  <section className="stats animate-on-scroll">
    <div className="stat-card">
      <h3 className="counter">10,000+</h3>
      <p>Desarrolladores</p>
    </div>
    <div className="stat-card">
      <h3 className="counter">5,000+</h3>
      <p>Proyectos completados</p>
    </div>
    <div className="stat-card">
      <h3 className="counter">95%</h3>
      <p>Tasa de satisfacción</p>
    </div>
    <div className="stat-card">
      <h3 className="counter">50+</h3>
      <p>Tecnologías soportadas</p>
    </div>
  </section>
)

const HowItWorks = () => (
  <section className="how-it-works" id="how-it-works">
    <h2 className="section-title animate-on-scroll">Cómo funciona MeetDevp</h2>
    <div className="steps">
      <div className="step animate-on-scroll">
        <div className="step-number">1</div>
        <h3>Crea tu perfil</h3>
        <p>Regístrate como desarrollador o cliente y completa tu perfil con tus habilidades o necesidades.</p>
        <img
          src="https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=200&auto=format&fit=crop"
          alt="Crear perfil"
          className="step-image"
        />
      </div>
      <div className="step animate-on-scroll" style={{ animationDelay: "0.2s" }}>
        <div className="step-number">2</div>
        <h3>Encuentra coincidencias</h3>
        <p>Nuestro algoritmo de IA conecta talento con proyectos relevantes basados en habilidades y experiencia.</p>
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=200&auto=format&fit=crop"
          alt="Encontrar coincidencias"
          className="step-image"
        />
      </div>
      <div className="step animate-on-scroll" style={{ animationDelay: "0.4s" }}>
        <div className="step-number">3</div>
        <h3>Comunícate</h3>
        <p>Usa nuestro chat seguro con videollamadas integradas para discutir detalles del proyecto.</p>
        <img
          src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=200&auto=format&fit=crop"
          alt="Comunicación"
          className="step-image"
        />
      </div>
      <div className="step animate-on-scroll" style={{ animationDelay: "0.6s" }}>
        <div className="step-number">4</div>
        <h3>Colabora</h3>
        <p>Trabaja juntos con nuestras herramientas integradas de gestión de proyectos y control de versiones.</p>
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=200&auto=format&fit=crop"
          alt="Colaboración"
          className="step-image"
        />
      </div>
    </div>
  </section>
)

const DeveloperSearch = ({ searchQuery, setSearchQuery, selectedSkills, toggleSkill }) => {
  const popularSkills = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "TypeScript",
    "Angular",
    "Vue.js",
    "Java",
    "C#",
    "PHP",
    "Ruby",
    "Go",
  ]

  const developers = [
    {
      id: 1,
      name: "Ana Martínez",
      role: "Full Stack Developer",
      skills: ["React", "Node.js", "MongoDB", "TypeScript"],
      rating: 4.9,
      hourlyRate: "$45",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=80&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      role: "Frontend Specialist",
      skills: ["Vue.js", "CSS", "JavaScript", "Figma"],
      rating: 4.8,
      hourlyRate: "$40",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=80&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Elena Gómez",
      role: "Backend Developer",
      skills: ["Python", "Django", "PostgreSQL", "Docker"],
      rating: 4.7,
      hourlyRate: "$50",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=80&auto=format&fit=crop",
    },
  ]

  return (
    <section className="developer-search animate-on-scroll" id="search">
      <h2 className="section-title">Encuentra desarrolladores talentosos</h2>

      <div className="search-container">
        <div className="search-box">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Buscar por nombre, habilidad o rol..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button">Buscar</button>
        </div>

        <div className="skills-filter">
          <h4>Habilidades populares:</h4>
          <div className="skills-tags">
            {popularSkills.map((skill) => (
              <button
                key={skill}
                className={`skill-tag ${selectedSkills.includes(skill) ? "selected" : ""}`}
                onClick={() => toggleSkill(skill)}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="developers-grid">
        {developers.map((dev) => (
          <div className="developer-card" key={dev.id}>
            <div className="developer-header">
              <img src={dev.image || "/placeholder.svg"} alt={dev.name} className="developer-avatar" />
              <div>
                <h3>{dev.name}</h3>
                <p>{dev.role}</p>
                <div className="developer-rating">
                  <Star size={16} className="star-icon" />
                  <span>{dev.rating}</span>
                </div>
              </div>
            </div>
            <div className="developer-skills">
              {dev.skills.map((skill) => (
                <span key={skill} className="dev-skill-tag">
                  {skill}
                </span>
              ))}
            </div>
            <div className="developer-footer">
              <span className="hourly-rate">{dev.hourlyRate}/hr</span>
              <button className="btn-contact">Contactar</button>
            </div>
          </div>
        ))}
      </div>

      <div className="view-more-container">
        <button className="btn-view-more">
          Ver más desarrolladores
          <ChevronDown size={18} />
        </button>
      </div>
    </section>
  )
}

const TechShowcase = () => (
  <section className="tech-showcase animate-on-scroll">
    <h2 className="section-title">Tecnologías Populares</h2>
    <div className="tech-grid">
      {[
        "React",
        "Node.js",
        "Python",
        "JavaScript",
        "TypeScript",
        "AWS",
        "Docker",
        "Kubernetes",
        "GraphQL",
        "MongoDB",
        "PostgreSQL",
        "Flutter",
        "Swift",
        "Kotlin",
        "TensorFlow",
      ].map((tech) => (
        <div className="tech-item" key={tech}>
          {tech}
        </div>
      ))}
    </div>

  </section>
)

const FeaturedProjects = () => (
  <section className="featured-projects animate-on-scroll">
    <h2 className="section-title">Proyectos Destacados</h2>
    <div className="projects-grid">
      <ProjectCard
        title="AI Content Generator"
        description="Plataforma SaaS para generación de contenido con IA utilizando los últimos modelos de lenguaje y procesamiento de imágenes."
        tech={["React", "Node.js", "OpenAI"]}
        budget="$5,000 - $10,000"
        image="https://images.unsplash.com/photo-1677442135136-760c813a743d?q=80&w=320&auto=format&fit=crop"
      />
      <ProjectCard
        title="Health Tracker App"
        description="Aplicación móvil para seguimiento de salud y fitness con integración de wearables y análisis personalizado."
        tech={["Flutter", "Firebase", "Dart"]}
        budget="$3,000 - $7,000"
        image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=320&auto=format&fit=crop"
      />
      <ProjectCard
        title="Blockchain Wallet"
        description="Billetera digital para criptomonedas con seguridad avanzada, soporte multi-chain y funciones DeFi integradas."
        tech={["Solidity", "Web3.js", "React"]}
        budget="$8,000 - $15,000"
        image="https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=320&auto=format&fit=crop"
      />
    </div>
    <div className="view-all-projects">
      <button className="btn-view-all">
        Ver todos los proyectos
        <ArrowRight size={18} />
      </button>
    </div>
  </section>
)

const ProjectCard = ({ title, description, tech, budget, image }) => (
  <div className="project-card">
    <div className="project-image">
      <img src={image || "/placeholder.svg"} alt={title} />
    </div>
    <div className="project-content">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="tech-tags">
        {tech.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <div className="project-footer">
        <span className="budget">{budget}</span>
        <button className="btn-apply">Ver Detalles</button>
      </div>
    </div>
  </div>
)

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Cómo encontrar el desarrollador perfecto para tu proyecto",
      excerpt:
        "Guía completa para identificar y contratar al talento técnico ideal según las necesidades de tu proyecto.",
      date: "10 Abr 2023",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=350&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Las 10 tecnologías más demandadas en 2023",
      excerpt: "Análisis de las habilidades técnicas con mayor demanda en el mercado actual de desarrollo de software.",
      date: "2 Abr 2023",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=350&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Consejos para freelancers: Cómo destacar en MeetDevp",
      excerpt:
        "Estrategias probadas para que los desarrolladores independientes maximicen su visibilidad y oportunidades.",
      date: "28 Mar 2023",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=350&auto=format&fit=crop",
    },
  ]

  return (
    <section className="blog-section animate-on-scroll" id="blog">
      <h2 className="section-title">Blog y Recursos</h2>
      <div className="blog-grid">
        {blogPosts.map((post) => (
          <div className="blog-card" key={post.id}>
            <div className="blog-image">
              <img src={post.image || "/placeholder.svg"} alt={post.title} />
            </div>
            <div className="blog-content">
              <div className="blog-meta">
                <span className="blog-date">{post.date}</span>
                <span className="blog-read-time">{post.readTime} lectura</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <a href="#" className="blog-read-more">
                Leer más
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="blog-cta">
        <a href="#" className="btn-blog-all">
          Ver todos los artículos
        </a>
      </div>
    </section>
  )
}

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const testimonials = [
    {
      quote:
        "Encontré al desarrollador perfecto para mi startup en solo 3 días. El proceso fue increíblemente sencillo y el talento es de primer nivel.",
      author: "María G.",
      position: "CEO de TechSolutions",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=60&auto=format&fit=crop",
    },
    {
      quote:
        "MeetDevp me ha permitido trabajar en proyectos desafiantes desde cualquier lugar. La plataforma es intuitiva y los pagos siempre son puntuales.",
      author: "Carlos P.",
      position: "Full Stack Developer",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=60&auto=format&fit=crop",
    },
    {
      quote:
        "La mejor plataforma para conectar con talento técnico de calidad. Los filtros de búsqueda y el sistema de verificación nos ahorraron mucho tiempo.",
      author: "Andrea L.",
      position: "CTO de InnovateCo",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=60&auto=format&fit=crop",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <section className="testimonials animate-on-scroll">
      <h2 className="section-title">Lo que dicen nuestros usuarios</h2>
      <div className="testimonial-slider">
        <div className="testimonial-slides" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-slide" key={index}>
              <div className="testimonial-card">
                <div className="quote-icon">"</div>
                <p className="quote">{testimonial.quote}</p>
                <div className="testimonial-author">
                  <img src={testimonial.image || "/placeholder.svg"} alt={testimonial.author} />
                  <div>
                    <p className="author-name">{testimonial.author}</p>
                    <p className="author-position">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`testimonial-dot ${index === activeTestimonial ? "active" : ""}`}
              onClick={() => setActiveTestimonial(index)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  )
}

const FaqSection = () => {
  const [openFaq, setOpenFaq] = useState(null)

  const faqs = [
    {
      question: "¿Cómo funciona el proceso de contratación?",
      answer:
        "El proceso comienza cuando publicas un proyecto o buscas desarrolladores. Puedes revisar perfiles, contactar candidatos, realizar entrevistas y finalmente contratar al desarrollador ideal. Nuestra plataforma facilita los contratos, pagos y comunicación durante todo el proyecto.",
    },
    {
      question: "¿Qué comisión cobra MeetDevp?",
      answer:
        "MeetDevp cobra una comisión del 10% sobre el valor total del proyecto para clientes y del 5% para desarrolladores. Esta comisión cubre el uso de la plataforma, protección de pagos, soporte técnico y herramientas de colaboración.",
    },
    {
      question: "¿Cómo se garantiza la calidad de los desarrolladores?",
      answer:
        "Todos los desarrolladores pasan por un proceso de verificación que incluye validación de identidad, pruebas técnicas y revisión de experiencia previa. Además, el sistema de calificaciones y reseñas permite conocer el desempeño en proyectos anteriores.",
    },
    {
      question: "¿Puedo trabajar con desarrolladores internacionales?",
      answer:
        "Sí, MeetDevp es una plataforma global que te permite conectar con desarrolladores de todo el mundo. Ofrecemos herramientas para facilitar la colaboración remota, gestión de diferentes zonas horarias y pagos internacionales.",
    },
    {
      question: "¿Qué sucede si no estoy satisfecho con el trabajo?",
      answer:
        "Ofrecemos una garantía de satisfacción. Si no estás conforme con el trabajo, puedes solicitar revisiones o, en casos extremos, solicitar un reembolso según nuestras políticas. Nuestro equipo de soporte está disponible para mediar y resolver cualquier conflicto.",
    },
  ]

  const toggleFaq = (index) => {
    if (openFaq === index) {
      setOpenFaq(null)
    } else {
      setOpenFaq(index)
    }
  }

  return (
    <section className="faq-section animate-on-scroll" id="faq">
      <h2 className="section-title">Preguntas Frecuentes</h2>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div className={`faq-item ${openFaq === index ? "open" : ""}`} key={index} onClick={() => toggleFaq(index)}>
            <div className="faq-question">
              <h3>{faq.question}</h3>
              <ChevronDown className="faq-icon" size={20} />
            </div>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

const CallToAction = () => (
  <section className="cta animate-on-scroll">
    <div className="cta-content">
      <h2>¿Listo para comenzar?</h2>
      <p>Únete a nuestra comunidad de desarrolladores y clientes hoy mismo.</p>
      <button className="button-effect" data-text="MeetDevp">
        <span className="actual-text">&nbsp;MeetDevp&nbsp;</span>
        <span aria-hidden="true" className="hover-text">
          &nbsp;MeetDevp&nbsp;
        </span>
      </button>
      <div className="cta-buttons">
        <button className="btn-primary">
          Regístrate como Desarrollador
          <Code className="btn-icon" size={18} />
        </button>
        <button className="btn-outline">
          Publicar un Proyecto
          <Briefcase className="btn-icon" size={18} />
        </button>
      </div>
    </div>
    
  </section>
)

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-section">
        <h3>
          <Code className="footer-logo-icon" size={20} />
          MeetDevp
        </h3>
        <p>La plataforma líder para conectar desarrolladores con proyectos emocionantes.</p>
        <div className="social-icons">
          <a href="#twitter" aria-label="Twitter">
            <Twitter size={20} />
          </a>
          <a href="#github" aria-label="GitHub">
            <Github size={20} />
          </a>
          <a href="#linkedin" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a href="#mail" aria-label="Email">
            <Mail size={20} />
          </a>
        </div>
      </div>
      <div className="footer-section">
        <h3>Enlaces</h3>
        <a href="#about">Sobre Nosotros</a>
        <a href="#blog">Blog</a>
        <a href="#careers">Carreras</a>
        <a href="#contact">Contacto</a>
      </div>
      <div className="footer-section">
        <h3>Legal</h3>
        <a href="#terms">Términos</a>
        <a href="#privacy">Privacidad</a>
        <a href="#cookies">Cookies</a>
      </div>
      <div className="footer-section">
        <h3>Recursos</h3>
        <a href="#docs">Documentación</a>
        <a href="#api">API</a>
        <a href="#support">Soporte</a>
        <a href="#community">Comunidad</a>
      </div>
    </div>
    <div className="footer-bottom">
      <p>
        &copy; {new Date().getFullYear()} MeetDevp.
        <span className="footer-heart">
          En el corazón de los programadores <Heart size={14} className="heart-icon" />
        </span>
      </p>
    </div>
   
  </footer>
)

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <button className={`back-to-top ${isVisible ? "visible" : ""}`} onClick={scrollToTop} aria-label="Volver arriba">
      <ChevronUp size={20} className="back-to-top-icon" />
    </button>
  )
}

export default Home
