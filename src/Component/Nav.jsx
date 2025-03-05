import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";


const Nav = () => {


    const location = useLocation();

    // Get the saved theme from localStorage, default to 'light' if not found
    const storedTheme = localStorage.getItem("theme");
    const initialTheme = storedTheme ? storedTheme : "light"; // Default to light theme if no theme is stored

    const [theme, setTheme] = useState(initialTheme);

    useEffect(() => {
        if (location.pathname === "/") {
            // Allow both light and dark theme only on the root route
            document.documentElement.setAttribute("data-theme", theme);
            localStorage.setItem("theme", theme);
        } else {
            // Force the theme to light on all other routes
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light"); // Ensure the theme is set to light in localStorage for other routes
        }
    }, [theme, location.pathname]); // Re-run effect whenever the theme or location changes

    const handleChange = (event) => {
        // Toggle the theme based on checkbox state only when on the "/" route
        if (location.pathname === "/") {
            const newTheme = event.target.checked ? "dark" : "light";
            setTheme(newTheme); // Update the theme state
        }
    };


    return (
        <div>
            <section>
                <div className="navbar bg-base-100 shadow-sm">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li className="bg-none flex items-end mb-2">
                                    {/* Toggle button */}
                                    <div>
                                        <label className="toggle text-base-content">
                                            <input
                                                type="checkbox"
                                                checked={theme === 'dark'}
                                                className="theme-controller"
                                                onChange={handleChange}
                                            />
                                            <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                                    <circle cx="12" cy="12" r="4"></circle>
                                                    <path d="M12 2v2"></path>
                                                    <path d="M12 20v2"></path>
                                                    <path d="m4.93 4.93 1.41 1.41"></path>
                                                    <path d="m17.66 17.66 1.41 1.41"></path>
                                                    <path d="M2 12h2"></path>
                                                    <path d="M20 12h2"></path>
                                                    <path d="m6.34 17.66-1.41 1.41"></path>
                                                    <path d="m19.07 4.93-1.41 1.41"></path>
                                                </g>
                                            </svg>
                                            <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                                                </g>
                                            </svg>
                                        </label>
                                    </div>
                                </li>
                                <li><NavLink to={"/"} className={({ isActive }) => isActive ? "bg-custom-blue text-white" : "bg-none"}>Home</NavLink></li>
                                <li><NavLink to={"/allMovies"} className={({ isActive }) => isActive ? "bg-custom-blue text-white" : "bg-none"}>All Movies</NavLink></li>
                                <li><NavLink to={"/addMovies"} className={({ isActive }) => isActive ? "bg-custom-blue text-white" : "bg-none"}>Add Movies</NavLink></li>
                                <li><NavLink to={"/myFavorites"} className={({ isActive }) => isActive ? "bg-custom-blue text-white" : "bg-none"}>My Favorites</NavLink></li>
                                <li><NavLink to={"/movieAwards"} className={({ isActive }) => isActive ? "bg-custom-blue text-white" : "bg-none"}>Movie Awards</NavLink></li>
                            </ul>
                        </div>
                        <Link to={"/"} className="btn btn-ghost text-xl">Movie Craze</Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal gap-3 px-1">
                            <li><NavLink to={"/"} className={({ isActive }) => isActive ? "bg-custom-blue text-white" : "bg-none"}>Home</NavLink></li>
                            <li><NavLink to={"/allMovies"} className={({ isActive }) => isActive ? "bg-custom-blue text-white" : "bg-none"}>All Movies</NavLink></li>
                            <li><NavLink to={"/addMovies"} className={({ isActive }) => isActive ? "bg-custom-blue text-white" : "bg-none"}>Add Movies</NavLink></li>
                            <li><NavLink to={"/myFavorites"} className={({ isActive }) => isActive ? "bg-custom-blue text-white" : "bg-none"}>My Favorites</NavLink></li>
                            <li><NavLink to={"/movieAwards"} className={({ isActive }) => isActive ? "bg-custom-blue text-white" : "bg-none"}>Movie Awards</NavLink></li>
                        </ul>
                    </div>

                    <div className="navbar-end gap-5">
                        {/* Toggle button */}
                        <div className="hidden md:block">
                            <label className="toggle text-base-content">
                                <input
                                    type="checkbox"
                                    checked={theme === 'dark'}
                                    className="theme-controller"
                                    onChange={handleChange}
                                />
                                <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                        <circle cx="12" cy="12" r="4"></circle>
                                        <path d="M12 2v2"></path>
                                        <path d="M12 20v2"></path>
                                        <path d="m4.93 4.93 1.41 1.41"></path>
                                        <path d="m17.66 17.66 1.41 1.41"></path>
                                        <path d="M2 12h2"></path>
                                        <path d="M20 12h2"></path>
                                        <path d="m6.34 17.66-1.41 1.41"></path>
                                        <path d="m19.07 4.93-1.41 1.41"></path>
                                    </g>
                                </svg>
                                <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                                    </g>
                                </svg>
                            </label>
                        </div>

                        {/* Login btn or logout btn (conditional rendering) */}
                        <div className="flex justify-center items-center gap-3">
                            <Link to={'/userProfile'} className="border size-fit border-black rounded-full"><img src={''} className="size-9 rounded-full" title={''} alt="" /></Link>
                            <button className="btn hover:bg-eco-teal hover:text-white">Log Out</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Nav;