import { useState } from "react";
import { FaBlogger } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import Modal from "./Modal";
import { useSelector } from "react-redux";

const Header = ({setSelectedRegion}) => {
    const user = useSelector((state) => state.user.user)
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const location = useLocation();
    const [region, setRegion] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                    <div className="relative w-1/2 md:w-3/4">
                        <input
                            type="text"
                            value={region}
                            placeholder="Explore another location blogs"
                            className="px-3 py-1 text-black rounded w-full outline-none pr-6"
                            onChange={(e) => setRegion(e.target.value)}
                        />
                        <IoIosSearch className="absolute right-1 top-2 w-6 h-6 text-black cursor-pointer" onClick={() => handleSearch()}/>
                    </div>
                
                )}

                <div className="text-sm md:text-lg">
                    {!isLoggedIn ? (
                        <>
                        <button  onClick={() => setIsModalOpen(true)}>Sign In</button>
                        </>
                    ) : (
                        <p>{user.name.charAt(0).toUpperCase() + user.name.slice(1)}</p>
                    )}
                </div>
            </div>
        </nav>
        <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
        />
        </>
    )
}
export default Header