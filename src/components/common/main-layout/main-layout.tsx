import { Header, Footer } from 'components/common/common';

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
