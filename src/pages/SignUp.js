// src/pages/SignUp.js
import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import "./registrar.css";

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
      return;
    }
    // ¡Registro ok! Redirigimos al login
    navigate("/login");
  };

  return (
    <div>
      <h1>Crear Cuenta</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="tu@ejemplo.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrarse</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
