import Header from 'components/Header';
import React from 'react';
function MainLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
export default MainLayout;
