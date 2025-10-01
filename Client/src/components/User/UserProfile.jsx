// UserProfile.js
import React, { useEffect, useState } from "react";
import styles from "./UserProfile.module.css";
import { useNavigate } from "react-router-dom";
import userimg from "/user.webp";
import { useOutletContext } from "react-router-dom";

const UserProfile = () => {
  const { showCartItems, deleteAddToCart, showOrder, showUserOrder } =
    useOutletContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.dispatchEvent(new Event("auth"));
    navigate("/");
  };
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState([]);
  const [userData, setUserData] = useState([]);

  const token = localStorage.getItem("token");
  const userProfile = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/profile/userProfile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUserData(data || {});
      setFormData(data || {});
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async () => {
    try {
      if (!token) return alert("not login");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/profile/updatedProfile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      const updatedData = await res.json();
      setUserData(updatedData);
      setFormData(updatedData);
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userProfile();
    showUserOrder();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCancel = () => {
    setFormData(userData);
    setEditMode(false);
  };

  const renderProfileTab = () => (
    <div className={styles.tabContent}>
      <div className={styles.profileHeader}>
        <h2>Profile Information</h2>
        {!editMode && (
          <button className={styles.editBtn} onClick={() => setEditMode(true)}>
            <i className="fas fa-edit"></i> Edit Profile
          </button>
        )}
      </div>

      <div className={styles.profileContent}>
        <div className={styles.avatarSection}>
          <div className={styles.avatar}>
            <img src={userimg} alt={userData.name} />
            <button className={styles.changeAvatarBtn}>
              <i className="fas fa-camera"></i>
            </button>
          </div>
          <h3>{userData.name}</h3>
          <p>
            Member since January {new Date(userData.createdAt).getFullYear()}
          </p>
        </div>

        <div className={styles.profileDetails}>
          {editMode ? (
            <div className={styles.editForm}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.formActions}>
                <button className={styles.cancelBtn} onClick={handleCancel}>
                  Cancel
                </button>
                <button className={styles.saveBtn} onClick={updateProfile}>
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <label>Full Name</label>
                <p>{userData.name}</p>
              </div>
              <div className={styles.infoItem}>
                <label>Email</label>
                <p>{userData.email}</p>
              </div>
              <div className={styles.infoItem}>
                <label>Phone</label>
                <p>{userData.phone}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderOrdersTab = () => (
    <div className={styles.tabContent}>
      <h2>Order History</h2>
      {showOrder.length > 0 ? (
        <div className={styles.ordersList}>
          {showOrder.map((order) => (
            <div key={order._id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <div>
                  <h3>Order #{order.ordId}</h3>
                  <p>
                    Placed on{" "}
                    <span>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>{" "}
                    <span>
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </span>{" "}
                  </p>
                </div>
                <div className={styles.orderStatus}>
                  <span className={`${styles.status} ${styles.delivered}`}>
                    Book
                  </span>
                </div>
              </div>

              <div className={styles.orderItems}>
                <div className={styles.orderItem}>
                  <img
                    src={`${import.meta.env.VITE_API_URL}${order.items?.imageURL}`}
                    alt=""
                  />
                  <div className={styles.itemDetails}>
                    <h4>{order.items?.title || "Book is not available"}</h4>
                    <div className={styles.itemMeta}>
                      <span>{order.items?.author}</span>
                      <span>{order.items?.category}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.orderFooter}>
                <div className={styles.orderTotal}>
                  <h4>Price: ${order.items?.price.toFixed(2)}</h4>
                </div>
                <div className={styles.orderActions}>
                  <button className={styles.viewOrderBtn}>Read Book</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <i className="fas fa-shopping-bag"></i>
          <h3>No orders yet</h3>
          <p>Your order history will appear here</p>
          <button
            className={styles.primaryBtn}
            onClick={() => navigate("/Allbooks")}
          >
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );

  const renderWishlistTab = () => (
    <div className={styles.tabContent}>
      <h2>Your Wishlist</h2>
      {showCartItems.length > 0 ? (
        <div className={styles.wishlistGrid}>
          {showCartItems.map((book) => (
            <div key={book._id} className={styles.wishlistItem}>
              <div className={styles.bookImage}>
                <img
                  src={`${import.meta.env.VITE_API_URL}${book.items?.imageURL}`}
                  alt={book.items.title}
                />
                <button
                  className={styles.removeWishlistBtn}
                  onClick={() => deleteAddToCart(book._id)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className={styles.bookInfo}>
                <h3>{book.items.title}</h3>
                <p>{book.items.author}</p>
                <div className={styles.bookMeta}>
                  <span className={styles.category}>{book.items.category}</span>
                  <span className={styles.price}>${book.items.price}</span>
                </div>
                <button
                  className={styles.moveToCartBtn}
                  onClick={() => deleteAddToCart(book._id)}
                >
                  Delete to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <i className="fas fa-heart"></i>
          <h3>Your wishlist is empty</h3>
          <p>Save your favorite items here for easy access later</p>
          <button
            className={styles.primaryBtn}
            onClick={() => navigate("/Allbooks")}
          >
            Browse Books
          </button>
        </div>
      )}
    </div>
  );

  const renderSettingsTab = () => (
    <div className={styles.tabContent}>
      <h2>Account Settings</h2>
      <div className={styles.settingsList}>
        <div className={styles.settingItem}>
          <div className={styles.settingIcon}>
            <i className="fas fa-bell"></i>
          </div>
          <div className={styles.settingInfo}>
            <h3>Notification Preferences</h3>
            <p>Manage how we contact you</p>
          </div>
          <button className={styles.settingBtn}>Configure</button>
        </div>
        <div className={styles.settingItem}>
          <div className={styles.settingIcon}>
            <i className="fas fa-lock"></i>
          </div>
          <div className={styles.settingInfo}>
            <h3>Privacy & Security</h3>
            <p>Manage your privacy settings</p>
          </div>
          <button className={styles.settingBtn}>Configure</button>
        </div>
        <div className={styles.settingItem}>
          <div className={styles.settingIcon}>
            <i className="fas fa-credit-card"></i>
          </div>
          <div className={styles.settingInfo}>
            <h3>Payment Methods</h3>
            <p>Add or remove payment methods</p>
          </div>
          <button className={styles.settingBtn}>Configure</button>
        </div>
        <div className={styles.settingItem}>
          <div className={styles.settingIcon}>
            <i className="fas fa-truck"></i>
          </div>
          <div className={styles.settingInfo}>
            <h3>Shipping Addresses</h3>
            <p>Manage your shipping addresses</p>
          </div>
          <button className={styles.settingBtn}>Configure</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.userProfile}>
      {/* Header */}
      <section className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>My Profile</h1>
          <p className={styles.subtitle}>Manage your account and preferences</p>
        </div>
      </section>

      <section className={styles.profileContent}>
        <div className={styles.container}>
          <div className={styles.profileLayout}>
            {/* Sidebar Navigation */}
            <div className={styles.sidebar}>
              <div className={styles.userCard}>
                <div className={styles.avatar}>
                  <img src={userimg} alt={userData.name} />
                </div>
                <h2>{userData.name}</h2>
                <p>Member since {new Date(userData.createdAt).getFullYear()}</p>
              </div>

              <nav className={styles.sidebarNav}>
                <button
                  className={`${styles.navItem} ${
                    activeTab === "profile" ? styles.active : ""
                  }`}
                  onClick={() => setActiveTab("profile")}
                >
                  <i className="fas fa-user"></i>
                  Profile
                </button>
                <button
                  className={`${styles.navItem} ${
                    activeTab === "orders" ? styles.active : ""
                  }`}
                  onClick={() => setActiveTab("orders")}
                >
                  <i className="fas fa-shopping-bag"></i>
                  Orders
                </button>
                <button
                  className={`${styles.navItem} ${
                    activeTab === "wishlist" ? styles.active : ""
                  }`}
                  onClick={() => setActiveTab("wishlist")}
                >
                  <i className="fas fa-heart"></i>
                  Wishlist
                </button>
                <button
                  className={`${styles.navItem} ${
                    activeTab === "settings" ? styles.active : ""
                  }`}
                  onClick={() => setActiveTab("settings")}
                >
                  <i className="fas fa-cog"></i>
                  Settings
                </button>
                <button className={styles.navItem} onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i>
                  Sign Out
                </button>
              </nav>
            </div>

            {/* Main Content */}
            <div className={styles.mainContent}>
              {activeTab === "profile" && renderProfileTab()}
              {activeTab === "orders" && renderOrdersTab()}
              {activeTab === "wishlist" && renderWishlistTab()}
              {activeTab === "settings" && renderSettingsTab()}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserProfile;
