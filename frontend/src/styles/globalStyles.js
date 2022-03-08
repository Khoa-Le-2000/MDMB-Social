import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
 }
body {
  background-color: ${(props) => props.theme.bodyBg};
  transition: all ${(props) => props.theme.transitionTime};
 }
p {
  color: ${(props) => props.theme.text};
  transition: color ${(props) => props.theme.transitionTime};
}
h1,h2,h3,h4,h5,h6 {
  color: ${(props) => props.theme.headings};
  transition: color ${(props) => props.theme.transitionTime};
}
`;
