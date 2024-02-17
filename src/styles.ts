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

export const userNameStyle: React.CSSProperties = {
  position: 'fixed',
  top: '40px',
  right: '10px',
  fontSize: '20px',
  zIndex: 1000,
  backgroundColor: "aquamarine",
  borderRadius: '20%',
};

export const commonStyle: React.CSSProperties = {
  position: 'fixed',
  top: '10px',
  right: '10px',
  fontSize: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  justifyContent: 'flex-start',
  zIndex: 1000,
};

export const avatarStyle: React.CSSProperties = {
  width: '50px',
  height: '40px',
  borderRadius: '20%',
  marginRight: '10px',
};

export const inputLabelStyle: React.CSSProperties = {
  backgroundColor: '#2196f3',
  color: 'white',
  padding: '10px 15px',
  borderRadius: '5px',
  cursor: 'pointer',
};

export const inputLabelHoverStyle: React.CSSProperties = {
  ...inputLabelStyle,
  backgroundColor: '#0d47a1',
};

export const booksContainerStyle: React.CSSProperties = {
  border: '2px solid #ccc',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '20px',
  backgroundColor: "azure",
};

export const buttonStyle: React.CSSProperties = {
  backgroundColor: '#2196f3',
  color: 'white',
  marginRight: '10px',
  marginBottom: '5px',
  padding: '5px 10px',
  borderRadius: '5px',
};

export const lnStyle: React.CSSProperties = {
  color: '#4caf50',
  marginRight: '10px',
  marginBottom: '5px',
  textDecoration: 'none',
};

export const genreAuthorStyle: React.CSSProperties = {
  backgroundColor: "yellowgreen",
  padding: '5px 10px',
  borderRadius: '5px',
  marginBottom: '5px',
};

export const imageStyle: React.CSSProperties = {
  maxWidth: '200px',
  marginBottom: '5px',
};