import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import type {JSX} from "react";

interface Props {
  children: JSX.Element;
}

interface JwtPayload {
  exp?: number;
}

const isTokenValid = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) return false;

    // exp es en segundos, comparar con tiempo actual en segundos
    const now = Date.now() / 1000;
    return decoded.exp > now;
  } catch {
    return false;
  }
};

export const PrivateRoute = ({ children }: Props) => {
  const token = localStorage.getItem('token');

  if (!token || !isTokenValid(token)) {
    // No hay token o está expirado, redirigir
    return <Navigate to="/" replace />;
  }

  // Token válido, renderizar children
  return children;
};
