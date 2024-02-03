import React from "react";

export const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: '#f0f0f0',
  minHeight: '100vh',
  fontFamily: 'Arial, sans-serif',
};

export const linkStyle: React.CSSProperties = {
  margin: '10px',
  padding: '10px 20px',
  color: 'white',
  textDecoration: 'none',
  fontSize: '18px',
  borderRadius: '5px',
  cursor: 'pointer',
};

export const registerLinkStyle: React.CSSProperties = {
  ...linkStyle,
  backgroundColor: 'blue',
};

export const loginLinkStyle: React.CSSProperties = {
  ...linkStyle,
  backgroundColor: 'green',
};

export const booksLinkStyle: React.CSSProperties = {
  ...linkStyle,
  backgroundColor: 'orange',
};

export const booksWithPagesLinkStyle: React.CSSProperties = {
  ...linkStyle,
  backgroundColor: 'red',
};