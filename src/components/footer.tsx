import React from "react";

export const Footer = () => {
  const FullYear = new Date().getFullYear();
  return (
    <footer className="border-t flex justify-center">
      {FullYear} Store Application All Rights Reserved.
    </footer>
  );
};
