import React, { useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Toaster, toast } from "react-hot-toast";
export default function Layout() {
  const token = localStorage.getItem("token");

  const [showAllBook, setShowAllbook] = useState([]);
  const [showCartItems, setShowCartItems] = useState([]);
  const [showOrder, setShowOrder] = useState([]);

  const bookUserOrder = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/order/bookOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookId: id }),
      });
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message || "Something Wrong");
      }
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const showUserOrder = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/order/userOrder`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setShowOrder(data);
    } catch (error) {
      toast.error(error.message)
    }
  };

  const deleteAddToCart = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/cart/deleteAddToCart/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      toast.success(data.message);
      setShowCartItems(showCartItems.filter((item) => item._id !== id));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const AddToCart = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/cart/addToCart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookId: id }),
      });
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      toast.success(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const showAllBooks = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/book/showAllBook`);
      const data = await res.json();
      setShowAllbook(data);
    } catch (error) {
      toast.error(error.message)
    }
  };

  const showCart = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/cart/showAddToCart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setShowCartItems(data);
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    showAllBooks();
    if (token) {
      showCart();
      showUserOrder();
    }
  }, [token]);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Header showCartItems={showCartItems} />
      <Outlet
        context={{
          showAllBook,
          showCartItems,
          showCart,
          AddToCart,
          deleteAddToCart,
          showUserOrder,
          showOrder,
          bookUserOrder,
        }}
      />
      <Footer />
    </>
  );
}
