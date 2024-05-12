import React, { useRef } from 'react';
import styles from "./contact.module.css";
import Card from '../../components/card/Card';

import emailjs from '@emailjs/browser';

import { FaPhoneAlt, FaEnvelope, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { toast } from 'react-toastify';

const Contact = () => {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, form.current, {
        publicKey: process.env.REACT_APP_PUBLIC_KEY,
      })
      .then(
        () => {
          toast.success("Message sent succesfully");
        },
        (error) => {
          toast.error(error.text)
        },
      );
  };

  return (
    <section>
      <div className={`container ${styles.contact}`}>
        <h2>Contact Us</h2>
        <div className={styles.section}>
          <form ref={form} onSubmit={sendEmail}>
            <Card cardClass={styles.card}>
              <label>Name:</label>
              <input type='text' name='user_name' placeholder='Full Name' required />

              <label>Email:</label>
              <input type='email' name='user_email' placeholder='Your email' required />

              <label>Subject:</label>
              <input type='text' name='subject' placeholder='Subject' required />

              <label>Message:</label>
              <textarea name='message' cols={30} rows={10}></textarea>

              <button className='--btn --bg-danger --button'>Send Message</button>
            </Card>
          </form>
          <div className={styles.details}>
            <Card cardClass={styles.card2}>
              <h3><b>Our Contact Information</b></h3>
              <p>Fill the form or contact us via other channels listed below</p>

              <div className={styles.icons}>
                <span>
                  <FaPhoneAlt />
                  <p>+91 9833525866</p>
                </span>

                <span>
                  <FaEnvelope />
                  <p>anandshukla.web@gmail.com</p>
                </span>

                <span>
                  <GoLocation />
                  <p>Mumbai, India</p>
                </span>

                <span>
                  <FaTwitter />
                  <p>@Anand-Shukla</p>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
