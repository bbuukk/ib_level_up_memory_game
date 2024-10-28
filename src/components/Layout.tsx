import { Link, Outlet } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link
            to="/"
            className="text-white transition duration-300 hover:text-gray-300"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/basic-react-query"
            className="text-white transition duration-300 hover:text-gray-300"
          >
            Basics RQ
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mainContainer container mx-auto flex justify-center p-4">{children}</div>
  );
};

const Layout = () => {
  return (
    <div className="min-h-screen bg-blu-deep-space">
      <NavigationBar />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
};

export default Layout;
