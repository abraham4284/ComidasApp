import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "../../../hooks/useForm";
import { useAuth } from "../../../context/AuthContext";
import { Spiner } from "../../../components/Spiner";

const initialForm = {
  username: "",
  password: "",
};

export const LoginPage = () => {
  const { username, password, onInputChange, onResetForm } =
    useForm(initialForm);
  const { login, isAutenticated, usuarios, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      Swal.fire({
        title: "Los campos no pueden ir vacios",
        text: "Todos los datos son obligatorios",
        icon: "warning",
      });
      return;
    }
    const data = {
      username,
      password,
    };
    await login(data);
    onResetForm();
  };

  useEffect(() => {
    if (isAutenticated && usuarios.rol === "cliente") {
      if (loading) return <Spiner />;
      navigate("/");
    } else if (isAutenticated && usuarios.rol === "admin") {
      if (loading) return <Spiner />;
      navigate("/admin");
    }
  }, [isAutenticated, usuarios]);

  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  value={username}
                  onChange={onInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={password}
                  onChange={onInputChange}
                />
              </div>
              <div className="flex items-center justify-between"></div>
              <button
                type="submit"
                className="w-full text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="flex gap-1 justify-center text-sm font-light text-gray-500 dark:text-gray-400">
                Aun no tiene cuenta?{" "}
                <Link
                  to="/registro"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Registrarse
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
