import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container text-center">
        {/* Internal Links */}
        <div className="mb-2">
          <Link to="/about" className="text-white mx-2 text-decoration-none">About</Link>
          <Link to="/contact" className="text-white mx-2 text-decoration-none">Contact</Link>
          <Link to="/privacy" className="text-white mx-2 text-decoration-none">Privacy</Link>
        </div>

        {/* Social Icons */}
        <div className="mb-3">
          <a
            href="https://facebook.com"
            className="text-white mx-2"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <i className="bi bi-facebook fs-5"></i>
          </a>
          <a
            href="https://twitter.com"
            className="text-white mx-2"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <i className="bi bi-twitter fs-5"></i>
          </a>
          <a
            href="https://instagram.com"
            className="text-white mx-2"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <i className="bi bi-instagram fs-5"></i>
          </a>
        </div>

        {/* Copyright */}
        <small>&copy; {new Date().getFullYear()} Recipe-Room. All rights reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;
