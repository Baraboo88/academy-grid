import { Header, Footer } from 'components/common/common';
import React from 'react';

interface MainLayoutProps {
  children:  JSX.Element[] | JSX.Element;
}

const MainLayout: React.FC <MainLayoutProps> = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

export default MainLayout;
