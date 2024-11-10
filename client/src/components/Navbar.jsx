import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCarrito } from "../context/CarritoContext";
import { useNegocios } from "../context/NegociosContext";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMovilOpen, setIsMovilOpen] = useState(false);
  const { isAutenticated, usuarios, logout } = useAuth();
  const { carrito } = useCarrito();
  const { getNegociosByUsuario, negocios } = useNegocios();

  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMenuMobile = () => {
    setIsMovilOpen(!isMovilOpen);
  };

  useEffect(() => {
    if (!isAutenticated) {
      setIsMenuOpen(false);
      setIsMovilOpen(false);
    }
  }, [isAutenticated]);

  useEffect(() => {
    getNegociosByUsuario();
  }, []);

  const { img, nombre } = negocios.length > 0 ? negocios[0] : {};

  // Función para añadir una clase de estilo si la ruta coincide con la actual
  const getNavLinkClass = (path) =>
    location.pathname === path
      ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
      : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white";

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMovilOpen}
              onClick={toggleMenuMobile}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              {isMovilOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                className="h-8 w-auto rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                src={img}
                alt={nombre}
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link to="/" className={getNavLinkClass("/")}>
                  Platos
                </Link>
                <Link to="/bebidas" className={getNavLinkClass("/bebidas")}>
                  Bebidas
                </Link>
                <Link to="/contacto" className={getNavLinkClass("/contacto")}>
                  Contacto
                </Link>
                {isAutenticated && usuarios.rol === "admin" && (
                  <Link to="/admin" className={getNavLinkClass("/bebidas")}>
                    Volver a panel
                  </Link>
                )}
              </div>
            </div>
          </div>

          {isAutenticated ? (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <Link
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                to="/carrito"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`size-6 ${
                    carrito.length > 0 &&
                    "animate-ping rounded-full bg-sky-400 text-white"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </Link>
              <div className="relative ml-3">
                <button
                  type="button"
                  onClick={toggleMenu}
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded={isMenuOpen}
                  aria-haspopup="true"
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={usuarios ? usuarios.img : ""}
                    alt={usuarios ? usuarios.username : ""}
                  />
                </button>
                {isMenuOpen && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    <Link
                      to="/perfil"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                    >
                      Mi perfil
                    </Link>
                    <Link
                      to="/compras"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                    >
                      Mis compras
                    </Link>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      onClick={() => logout()}
                    >
                      Cerrar Sesion
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link to="/login" className={getNavLinkClass("/login")}>
                  Login
                </Link>
                <Link to="/registro" className={getNavLinkClass("/registro")}>
                  Register
                </Link>
                <Link
                  className="relative  rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 "
                  to="/carrito"
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">View notifications</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`size-6 ${
                      carrito.length > 0 &&
                      "animate-ping rounded-full bg-sky-400 text-white"
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      {isMovilOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link to="/" className={getNavLinkClass("/")}>
              Platos
            </Link>
            <Link to="/bebidas" className={getNavLinkClass("/bebidas")}>
              Bebidas
            </Link>
            <Link to="/contacto" className={getNavLinkClass("/contacto")}>
              Contacto
            </Link>
            {isAutenticated && usuarios.rol === "admin" && (
              <Link to="/admin" className={getNavLinkClass("/bebidas")}>
                Volver a panel
              </Link>
            )}
            {!isAutenticated && (
              <>
                <Link to="/login" className={getNavLinkClass("/bebidas")}>
                  Login
                </Link>
                <Link to="/registro" className={getNavLinkClass("/bebidas")}>
                  Registro
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
