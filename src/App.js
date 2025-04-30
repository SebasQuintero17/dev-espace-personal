import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

// Importaciones
import Login from "./pages/login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Home2 from "./pages/home2";

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription?.unsubscribe?.(); // uso seguro por si no existe
    };
  }, []);

  return (
    <BrowserRouter>
      {/* Rutas */}
      <Routes>
        <Route
          path="/"
          element={!session ? <Home2 /> : <Navigate to="/home" replace />} // Redirigir a Home2 si no hay sesión
        />
        <Route
          path="/login"
          element={!session ? <Login /> : <Navigate to="/home" replace />} // Si ya tiene sesión, va a Home
        />
        <Route
          path="/signup"
          element={!session ? <SignUp /> : <Navigate to="/home" replace />} // Redirigir si ya está autenticado
        />
        <Route
          path="/home"
          element={session ? <Home /> : <Navigate to="/login" replace />} // Redirigir a login si no hay sesión
        />
        <Route
          path="/home2"
          element={!session ? <Home2 /> : <Navigate to="/home" replace />} // Si está autenticado, ir a Home
        />
      </Routes>
    </BrowserRouter>
  );
}
