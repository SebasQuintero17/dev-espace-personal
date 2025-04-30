"use client"

import { useState } from "react"
import { supabase } from "../supabaseClient"
import { useNavigate, Link } from "react-router-dom"
import { Code } from 'lucide-react'
import "./Login.css"

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError("Error en el login. Verifica tus credenciales.")
        return
      }

      console.log("Usuario logueado:", data.user)
      navigate("/home")
    } catch (err) {
      setError("Error en la conexión. Inténtalo de nuevo.")
      console.error(err)
    }
  }

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <div className="login-logo">
        <button className="button-effect" data-text="MeetDevp">
    <span className="actual-text">&nbsp;MeetDevp&nbsp;</span>
    <span aria-hidden="true" className="hover-text">&nbsp;MeetDevp&nbsp;</span>
        </button>
        </div>
        
        <h1 className="login-title">Iniciar Sesión</h1>
        <p className="login-subtitle">Bienvenido de nuevo, ingresa tus credenciales</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-control">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>
              {"Email".split("").map((char, idx) => (
                <span key={idx} style={{ transitionDelay: `${idx * 50}ms` }}>
                  {char}
                </span>
              ))}
            </label>
          </div>

          <div className="form-control">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>
              {"Contraseña".split("").map((char, idx) => (
                <span key={idx} style={{ transitionDelay: `${idx * 50}ms` }}>
                  {char}
                </span>
              ))}
            </label>
          </div>

          <div className="login-options">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Recordarme</label>
            </div>
            <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button">Iniciar Sesión</button>
          
          <div className="login-divider">
            <span>O continúa con</span>
          </div>
          
          <div className="social-login">
            <button type="button" className="social-button google">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path>
                <path d="M12 8L12 16"></path>
                <path d="M8 12L16 12"></path>
              </svg>
              Google
            </button>
            <button type="button" className="social-button github">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              GitHub
            </button>
          </div>
          
          <p className="signup-text">
            ¿No tienes una cuenta? <Link to="/signup" className="signup-link">Regístrate</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
