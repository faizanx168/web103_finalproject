import "./App.css";
import React, { useState, useEffect } from "react";
import { useRoutes } from "react-router-dom";
import ReadSneakers from "./pages/ReadSneakers";
import SneakerDetails from "./pages/SneakerDetails";
import CreateComment from "./pages/CreateComment";
import About from "./pages/About";
import PageNotFound from "./pages/PageNotFound";
import CartPage from "./pages/cart";
import Login from "./pages/Login";
import Orders from "./pages/order";
import CreateSneaker from "./pages/CreateSneaker";
import EditSneaker from "./pages/EditSneaker";
const App = () => {
  const API_URL = "http://localhost:3000";
  const [sneakers, setSneakers] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchSneakers = async () => {
      const response = await fetch("/api/sneakers");
      const data = await response.json();
      setSneakers(data);
    };
    // const getUser = async () => {
    //   const response = await fetch(`${API_URL}/auth/login/success`, {
    //     credentials: "include",
    //   });
    //   const json = await response.json();
    //   setUser(json.user);
    // };
    // getUser();
    fetchSneakers();
  }, []);

  // Sets up routes
  let element = useRoutes([
    {
      path: "/login",
      element: <Login api_url={API_URL} />,
    },
    {
      path: "/orders",
      element: <Orders />,
    },
    {
      path: "/",
      element: <ReadSneakers data={sneakers} />,
    },
    {
      path: "/sneaker/get/:id",
      element: <SneakerDetails data={sneakers} />,
    },
    {
      path: "/reviews/create/:id",
      element: <CreateComment />,
    },
    {
      path: "/new",
      element: <CreateSneaker />,
    },
    {
      path: "/edit/:id",
      element: <EditSneaker data={sneakers} />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/cart",
      element: <CartPage />,
    },
    {
      path: "/*",
      element: <PageNotFound />,
    },
  ]);

  return <div className="App">{element}</div>;
};

export default App;
