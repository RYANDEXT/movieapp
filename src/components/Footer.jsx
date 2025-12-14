import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="text-center  bg-neutral-600/35 text-neutral-400 py-2">
            <div className="flex items-center justify-center gap-4">
                <Link to="/">About</Link>
                <Link to="/">Contact</Link>
            </div>
            <Link to="https://github.com/RYANDEXT" className="text-sm">
                <p className="inline">Created by Ryan Dext </p>
                <FaGithub className="inline" />
            </Link>
        </footer>
    );
};

export default Footer;
