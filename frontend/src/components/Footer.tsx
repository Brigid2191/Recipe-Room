import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white py-3 mt-auto">
      <div className="container text-center">
        <small>&copy; {new Date().getFullYear()} Recipe-Room.</small>
      </div>
    </footer>
  );
};

export default Footer;
