import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => (
    <nav className="navbar">
        <div className="navbar-logo">BlogEditor</div>
        <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/blogs">Blogs</Link>
        </div>
    </nav>
);
export default Navbar;
