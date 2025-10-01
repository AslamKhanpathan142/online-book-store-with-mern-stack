// Contact.js
import React, { useState, useEffect } from "react";
import styles from "./Contact.module.css";
import { Toaster, toast } from "react-hot-toast";

const Contact = () => {
  const token = localStorage.getItem('token')
 
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission here
    const res = await fetch(`${import.meta.env.VITE_API_URL}/feedback/giveFeedback`,{
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData)
    })
    const data = await res.json();
    if(!res.ok) {
      toast.error(data.message);
      return
    }
    toast.success(data.message)
    setFormData({
      subject: "",
      message: "",
    });
  };

  return (
    <div className={styles.contact}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Get In Touch</h1>
            <p className={styles.heroSubtitle}>
              We'd love to hear from you. Reach out to us with any questions or
              feedback.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.contactContent}>
            <div className={styles.contactInfo}>
              <h2>Contact Information</h2>
              <p>
                Feel free to reach out to us through any of the following
                channels:
              </p>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className={styles.contactDetails}>
                  <h3>Address</h3>
                  <p>123 Book Street, Reading, RT 54321</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <i className="fas fa-phone"></i>
                </div>
                <div className={styles.contactDetails}>
                  <h3>Phone</h3>
                  <p>(555) 123-4567</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <i className="fas fa-envelope"></i>
                </div>
                <div className={styles.contactDetails}>
                  <h3>Email</h3>
                  <p>support@bookhaven.com</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <i className="fas fa-clock"></i>
                </div>
                <div className={styles.contactDetails}>
                  <h3>Hours</h3>
                  <p>Monday-Friday: 9am-6pm</p>
                  <p>Saturday: 10am-4pm</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>

              <div className={styles.socialLinks}>
                <h3>Follow Us</h3>
                <div className={styles.socialIcons}>
                  <a href="#" className={styles.socialLink}>
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className={styles.socialLink}>
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className={styles.socialLink}>
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className={styles.socialLink}>
                    <i className="fab fa-pinterest"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.contactForm}>
              <h2>Send Us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                     
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className={styles.submitBtn}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className={styles.mapSection}>
        <div className={styles.container}>
          <h2>Find Us</h2>
          <div className={styles.map}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.621465758658!2d-74.0059423483781!3d40.72576964270002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259eb7d1f23ab%3A0x68d3cf5f2d991a5b!2sStrand%20Book%20Store!5e0!3m2!1sen!2sus!4v1645493663926!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="BookHaven Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Frequently Asked Questions</h2>
            <p>Quick answers to common questions</p>
          </div>
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h3>How long does shipping take?</h3>
              <p>
                Standard shipping takes 3-5 business days. Express shipping is
                available for an additional fee with 1-2 business day delivery.
              </p>
            </div>
            <div className={styles.faqItem}>
              <h3>Do you offer international shipping?</h3>
              <p>
                Yes, we ship to over 100 countries worldwide. Shipping times and
                fees vary by location.
              </p>
            </div>
            <div className={styles.faqItem}>
              <h3>What is your return policy?</h3>
              <p>
                We accept returns within 30 days of purchase for books in new
                condition. Please contact us for a return authorization.
              </p>
            </div>
            <div className={styles.faqItem}>
              <h3>Do you have a physical store?</h3>
              <p>
                Our flagship store is located at 123 Book Street, Reading, RT
                54321. Come visit us!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
