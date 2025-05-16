import { SquarePen } from "lucide-react";
import { Bell } from "lucide-react";
import { Avatar } from "./BlogCard";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

const Appbar = () => {
  return (
    <div className="flex justify-between items-center px-4 w-full min-h-[50px] border-b-1 mb-3 p-3 border-gray-400">
      <div className="flex justify-center items-center">
        <Link to="/blogs">
          <div className="icon max-w-[150px] h-[50px] flex items-center ml-5 mr-5">
            {/* Using placeholder image here - in production replace with your Medium logo */}
            <img
              src="https://res.cloudinary.com/dhdmbwnak/image/upload/v1747237133/ChatGPT_Image_May_14__2025__08_59_56_PM-removebg-preview_ixwtaa.png"
              alt="Medium"
              className="object-contain"
            />
          </div>
        </Link>

        <div className="search hidden md:block">
          <SearchBar />
        </div>
      </div>

      <div className="icons flex items-center space-x-6">
        <button className="flex items-center space-x-1 text-[#91939a] hover:text-gray-700">
          <SquarePen className="h-6 w-6  cursor-pointer" />
          <span className=" cursor-pointer">Write</span>
        </button>

        <button>
          <Bell className="h-5 w-5 text-[#91939a] cursor-pointer hover:text-black " />
        </button>

        <Avatar name="jeet" />
      </div>
    </div>
  );
};

export default Appbar;
