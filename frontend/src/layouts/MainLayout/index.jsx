import Header from 'components/Header';
import React from 'react';

function MainLayout({ children }) {
  return (
    <>
      <Header />
      {/* <Nav /> */}
      {children}
    </>
  );
}
export default MainLayout;
