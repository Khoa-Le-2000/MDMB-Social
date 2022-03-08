import Header from 'components/Header';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from 'styles/constants';
import { GlobalStyles } from 'styles/globalStyles';
function MainLayout({ children }) {
  const [theme, setTheme] = React.useState(true);
  const toggleTheme = () => {
    theme === 'light' ? setTheme('light') : setTheme('dark');
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Header />
      {children}
    </ThemeProvider>
  );
}
export default MainLayout;
