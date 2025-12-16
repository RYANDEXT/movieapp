import logo from '../assets/logo.png';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import userIcon from '../assets/user.png';
import { IoSearchOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { navigation } from '../constants/navigation';

const Header = () => {
    const location = useLocation();
    const [searchInput, setSearchInput] = useState(location?.search?.slice(3)?.split('%20')?.join(' '));
    const navigate = useNavigate();

    useEffect(() => {
        if (searchInput) {
            navigate(`/search?q=${searchInput}`);
        }
    }, [searchInput, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <header className="fixed top-0 w-full h-16 bg-black/75 z-50">
            <div className="container mx-auto px-3 flex items-center h-full">
                <Link to="/" className="cursor-pointer w-40 h-full flex items-center justify-center">
                    <img src={logo} alt="logo" width={120} />
                </Link>

                <nav className="hidden lg:flex items-center gap-1 ml-5 h-full">
                    {navigation.map((nav, index) => (
                        <NavLink
                            key={nav.label + 'header' + index}
                            to={nav.href}
                            className={({ isActive }) =>
                                `px-2 hover:text-neutral-100 cursor-pointer h-full flex justify-center items-center ${
                                    isActive && 'text-neutral-100'
                                }`
                            }>
                            {nav.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="ml-auto flex items-center gap-5">
                    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
                        <input
                            value={searchInput}
                            type="text"
                            name="search"
                            id="search"
                            className="bg-transparent px-4 py-1 outline-none border-none hidden lg:block"
                            placeholder="Search here..."
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <button className="text-2xl text-white hidden lg:block">
                            <IoSearchOutline />
                        </button>
                    </form>
                    <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer active:scale-75 transition-all">
                        <img src={userIcon} alt="user icon" className="w-full h-full" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
