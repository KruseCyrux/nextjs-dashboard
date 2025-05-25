import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        // Solo permite acceder al dashboard si el usuario está logueado
        return isLoggedIn;
      } else if (isLoggedIn && nextUrl.pathname === '/login') {
        // Si el usuario ya está logueado e intenta ir al login, lo redirigimos al dashboard
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      // Permite acceder a todas las demás rutas sin redirección
      return true;
    },
  },
  providers: [], // Puedes agregar aquí los proveedores como GitHub, Google, etc.
} satisfies NextAuthConfig;
