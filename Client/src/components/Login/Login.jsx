// Login.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const Login = () => {
  const { showCart } = useOutletContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      // Simulate API call
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/useLogin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      showCart();
      if (res.ok) {
        toast.success(data.message);
        localStorage.setItem("token", data.token);
        localStorage.setItem('role', data.user.role)
        window.dispatchEvent(new Event("auth"));
        // navigate("/UserProfile");
        if(data.user.role === "admin") {
          navigate('/AdminHome');
        }
        else {
          navigate("/UserProfile");
        }
      } else {
        toast.error(data.message);
      }

      setFormData({
        email: "",
        password: "",
      });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className={styles.login}>
      {/* Header */}
      <section className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>
            Sign in to continue your reading journey
          </p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
              <div className={styles.loginIllustration}>
                <div className={styles.illustration}>
                  <i className="fas fa-book-open"></i>
                </div>
                <h2>Discover Your Next Favorite Book</h2>
                <p>
                  Access your personalized recommendations and reading lists
                </p>
              </div>

              <form className={styles.loginForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address</label>
                  <div className={styles.inputContainer}>
                    <i className="fas fa-envelope"></i>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className={errors.email ? styles.errorInput : ""}
                    />
                  </div>
                  {errors.email && (
                    <span className={styles.errorText}>{errors.email}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="password">Password</label>
                  <div className={styles.inputContainer}>
                    <i className="fas fa-lock"></i>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className={errors.password ? styles.errorInput : ""}
                    />
                  </div>
                  {errors.password && (
                    <span className={styles.errorText}>{errors.password}</span>
                  )}
                </div>

                <button type="submit" className={styles.loginBtn}>
                  <>
                    <i className="fas fa-sign-in-alt"></i>
                    Sign In
                  </>
                </button>
                <div className={styles.registerLink}>
                  Don't have an account?{" "}
                  <Link to="/register">Create Account</Link>
                </div>
              </form>
            </div>

            <div className={styles.features}>
              <h3>Why Sign In?</h3>
              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <i className="fas fa-heart"></i>
                  </div>
                  <div className={styles.featureContent}>
                    <h4>Access Your Wishlist</h4>
                    <p>Quickly find books you've saved for later</p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <i className="fas fa-history"></i>
                  </div>
                  <div className={styles.featureContent}>
                    <h4>View Order History</h4>
                    <p>Track your previous purchases and orders</p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <i className="fas fa-star"></i>
                  </div>
                  <div className={styles.featureContent}>
                    <h4>Personalized Recommendations</h4>
                    <p>
                      Get book suggestions based on your reading preferences
                    </p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <i className="fas fa-tachometer-alt"></i>
                  </div>
                  <div className={styles.featureContent}>
                    <h4>Track Reading Progress</h4>
                    <p>Monitor your reading goals and achievements</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
