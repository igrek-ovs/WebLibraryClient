import React from "react";

export const bookContainerStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px',
};

const linkStyle: React.CSSProperties = {
  margin: '5px',
  padding: '8px 15px',
  color: 'white',
  textDecoration: 'none',
  fontSize: '14px',
  borderRadius: '5px',
  cursor: 'pointer',
};

export const updateLinkStyle: React.CSSProperties = {
  ...linkStyle,
  backgroundColor: 'green',
};

export const deleteLinkStyle: React.CSSProperties = {
  ...linkStyle,
  backgroundColor: 'red',
};

export const getLinkStyle: React.CSSProperties = {
  ...linkStyle,
  backgroundColor: 'blue',
};

export const createLinkStyle: React.CSSProperties = {
  ...linkStyle,
  backgroundColor: 'gray',
};