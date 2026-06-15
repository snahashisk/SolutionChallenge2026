import React from "react";
import { FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const ContactBar = () => {
  return (
    <div className="flex justify-between items-center bg-lime-700 h-8 py-2 px-20 text-white text-sm">
      <div className="flex gap-4">
        <div className="flex gap-2 items-center">
          <FaEnvelope />
          <p>snahashiskanrar@gmail.com</p>
        </div>
        <div className="flex gap-2 items-center">
          <FaPhone />
          <p>+919732737112</p>
        </div>
      </div>

      <div className="flex gap-4">
        <FaFacebook />
        <FaInstagram />
        <FaTwitter />
        <FaYoutube />
      </div>
    </div>
  );
};

export default ContactBar;
