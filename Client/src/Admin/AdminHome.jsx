// AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import styles from "./AdminHome.module.css";
import { Toaster, toast } from "react-hot-toast";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LogarithmicScale
);

const AdminHome = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.dispatchEvent(new Event("auth"));
    navigate("/");
  };
  const [activeTab, setActiveTab] = useState("dashboard");
  const [books, setBooks] = useState([]);

  const shoAllBooks = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/book/showAllBook`);
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);

  const showAllOrders = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/order/allorder`);
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const [feedbacks, setFeedbacks] = useState([]);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Fiction", label: "Fiction" },
    { value: "Mystery", label: "Mystery" },
    { value: "Science Fiction", label: "Science Fiction" },
    { value: "Fantasy", label: "Fantasy" },
    { value: "Classic", label: "Classic" },
    { value: "Memoir", label: "Memoir" },
    { value: "Non-Fiction", label: "Non-Fiction" },
    { value: "Psychology", label: "Psychology" },
    { value: "Dystopian", label: "Dystopian" },
    { value: "Self-Help", label: "Self-Help" },
    { value: "Programming", label: "Programming" },
    { value: "Computer Science", label: "Computer Science" },
    { value: "Finance", label: "Finance" },
    { value: "History", label: "History" },
    { value: "Spiritual Fiction", label: "Spiritual Fiction" },
  ];

  const [image, setImage] = useState(null);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    price: 0,
    description: "",
    category: "",
  });

  // Stats for dashboard
  const stats = {
    totalBooks: books.length,
    totalOrders: orders.length,
    totalFeedback: feedbacks.length,
    revenue: total,
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newBook.title);
    formData.append("author", newBook.author);
    formData.append("price", newBook.price);
    formData.append("description", newBook.description);
    formData.append("category", newBook.category);
    formData.append("image", image); // file input

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/book/addBook`, {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
    setNewBook({
      title: "",
      author: "",
      price: 0,
      description: "",
      category: "",
    });
  };

  const handleDeleteBook = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/book/deleteBook/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const showFeedback = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/feedback/showAllFeedback`);
      const data = await res.json();
      setFeedbacks(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  // chart show
  const data = {
    labels: ["Books", "Orders", "Revenue", "Feedbacks"],
    datasets: [
      {
        label: "Admin Dashboard Stats",
        data: [
          stats.totalBooks,
          stats.totalOrders,
          stats.revenue,
          stats.totalFeedback,
        ],
        backgroundColor: ["#4CAF50", "#2196F3", "#FF9800", "#9C27B0"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "white", // label color
        },
      },
    },
    scales: {
      y: {
        type: "logarithmic", //  log scale for Y axis
        ticks: {
          color: "white", // tick color
          callback: function (value) {
            return value; // show raw numbers
          },
        },
      },
      x: {
        ticks: {
          color: "white", // x labels color
        },
      },
    },
  };

  useEffect(() => {
    shoAllBooks();
    showAllOrders();
    showFeedback();
  }, []);
  useEffect(() => {
    let sum = orders.reduce((acc, order) => acc + (order?.price || 0), 0);
    setTotal(sum);
  }, [orders]);

  return (
    <div className={styles.adminDashboard}>
      <Toaster position="top-center" reverseOrder={false} />
      <header className={styles.header}>
        <h1>Admin Dashboard</h1>
        <div className={styles.userInfo}>
          <span>Admin User</span>
          <div className={styles.avatar}>
            <i className="fas fa-user"></i>
          </div>
        </div>
      </header>

      <div className={styles.container}>
        <nav className={styles.sidebar}>
          <ul>
            <li
              className={activeTab === "dashboard" ? styles.active : ""}
              onClick={() => setActiveTab("dashboard")}
            >
              <i className="fas fa-chart-line"></i>
              <span>Dashboard</span>
            </li>
            <li
              className={activeTab === "addBook" ? styles.active : ""}
              onClick={() => setActiveTab("addBook")}
            >
              <i className="fas fa-plus-circle"></i>
              <span>Add Book</span>
            </li>
            <li
              className={activeTab === "showBooks" ? styles.active : ""}
              onClick={() => setActiveTab("showBooks")}
            >
              <i className="fas fa-book"></i>
              <span>Show Books</span>
            </li>
            <li
              className={activeTab === "showOrders" ? styles.active : ""}
              onClick={() => setActiveTab("showOrders")}
            >
              <i className="fas fa-shopping-cart"></i>
              <span>Show Orders</span>
            </li>
            <li
              className={activeTab === "feedback" ? styles.active : ""}
              onClick={() => setActiveTab("feedback")}
            >
              <i className="fas fa-comments"></i>
              <span>Feedback</span>
            </li>
            <li
              onClick={handleLogout}
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              <span>Logout</span>
            </li>
          </ul>
        </nav>

        <main className={styles.mainContent}>
          {activeTab === "dashboard" && (
            <div className={styles.dashboard}>
              <h2>Dashboard Overview</h2>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>
                    <i className="fas fa-book"></i>
                  </div>
                  <div className={styles.statInfo}>
                    <h3>{stats.totalBooks}</h3>
                    <p>Total Books</p>
                  </div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>
                    <i className="fas fa-shopping-cart"></i>
                  </div>
                  <div className={styles.statInfo}>
                    <h3>{stats.totalOrders}</h3>
                    <p>Total Orders</p>
                  </div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>
                    <i className="fas fa-comment"></i>
                  </div>
                  <div className={styles.statInfo}>
                    <h3>{stats.totalFeedback}</h3>
                    <p>Feedback Messages</p>
                  </div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>
                    <i className="fas fa-dollar-sign"></i>
                  </div>
                  <div className={styles.statInfo}>
                    <h3>${total.toFixed(2)}</h3>
                    <p>Total Revenue</p>
                  </div>
                </div>
              </div>

              <div className={styles.recentActivity}>
                <Bar data={data} options={options} />
              </div>
            </div>
          )}

          {activeTab === "addBook" && (
            <div className={styles.addBook}>
              <h2>Add New Book</h2>
              <form
                onSubmit={handleAddBook}
                className={styles.bookForm}
                encType="multipart/form-data"
              >
                <div className={styles.formGroup}>
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newBook.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="author">Author</label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={newBook.author}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="price">Price ($)</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    step="0.01"
                    value={newBook.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={newBook.category}
                    onChange={handleInputChange}
                    required
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={newBook.description}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="image">Book Image</label>
                  <input
                    type="file"
                    id="image"
                    // name="image"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                  />
                </div>
                <button type="submit" className={styles.submitButton}>
                  Add Book
                </button>
              </form>
            </div>
          )}

          {activeTab === "showBooks" && (
            <div className={styles.showBooks}>
              <h2>All Books ({books.length})</h2>
              <div className={styles.booksList}>
                {books.map((book) => (
                  <div key={book._id} className={styles.bookCard}>
                    <div className={styles.bookInfo}>
                      <h3>{book.title}</h3>
                      <p className={styles.bookAuthor}>by {book.author}</p>
                      <p className={styles.bookCategory}>{book.category}</p>
                      <p className={styles.bookDescription}>
                        {book.description}
                      </p>
                      <p className={styles.bookPrice}>${book.price}</p>
                    </div>
                    <div className={styles.bookActions}>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDeleteBook(book._id)}
                      >
                        <i className="fas fa-trash"></i> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "showOrders" && (
            <div className={styles.showOrders}>
              <h2>All Orders ({orders.length})</h2>
              <div className={styles.ordersTable}>
                <table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Book Title</th>
                      <th>User Name</th>
                      <th>User Email</th>
                      <th>Date</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>#{order.orId}</td>
                        <td>{order.bookTitle}</td>
                        <td>{order.userName}</td>
                        <td>{order.userEmail}</td>
                        <td>
                          {new Date(order.date).toLocaleDateString()}
                        </td>
                        <td>
                          <span className={`${styles.status} `}>
                            ${order.price}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "feedback" && (
            <div className={styles.feedback}>
              <h2>Customer Feedback ({feedbacks.length})</h2>
              <div className={styles.feedbackList}>
                {feedbacks.map((feedback) => (
                  <div key={feedback._id} className={styles.feedbackItem}>
                    <div className={styles.feedbackHeader}>
                      <div className={styles.userInfo}>
                        <div className={styles.avatar}>
                          <i className="fas fa-user"></i>
                        </div>
                        <div>
                          <h4>{feedback.userId.name}</h4>
                          <span className={styles.feedbackDate}>
                            {new Date(feedback.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className={styles.rating}>
                        <p>{feedback.userId.email}</p>
                      </div>
                    </div>
                    <h2>{feedback.subject}</h2>
                    <div className={styles.feedbackMessage}>
                      <p>{feedback.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminHome;
