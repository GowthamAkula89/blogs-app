import { useState } from "react";
import { FaBlogger } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import Modal from "./Modal";
const Header = ({setSelectedRegion}) => {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('blogAuthToken') ? true:false);
    const [region, setRegion] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAuthenticate = (user) => {
        setIsLoggedIn(true);
        localStorage.setItem("blogAuthToken", JSON.stringify(user.token.token));
      };

    const handleSearch = () => {
        setSelectedRegion(region) 
        setRegion("")
    }
    return (
        <>
        <nav className="bg-green-950 p-3 text-white ">
            <div className="flex gap-2 justify-between items-center">
                <div className="flex gap-2 items-center text-xl font-bold">
                    <FaBlogger />
                    <Link to="/">Blogs</Link>
                </div>

                {location.pathname === "/" && (
                    <div className="relative w-3/4">
                        <input
                            type="text"
                            value={region}
                            placeholder="Explore another location blogs"
                            className="px-3 py-2 text-black rounded w-full outline-none"
                            onChange={(e) => setRegion(e.target.value)}
                        />
                        <IoIosSearch className="absolute right-1 top-2 w-6 h-6 text-black cursor-pointer" onClick={() => handleSearch()}/>
                    </div>
                
                )}

                <div>
                    {!isLoggedIn ? (
                        <>
                        <button  onClick={() => setIsModalOpen(true)}>Sign In</button>
                        </>
                    ) : (
                        <p>Welcome Gowtham</p>
                    )}
                </div>
            </div>
        </nav>
        <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAuthenticate={handleAuthenticate}
        />
        </>
    )
}
export default Header