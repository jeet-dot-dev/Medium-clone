import { Search } from "lucide-react";

export default function SearchBar() {
  // const [query, setQuery] = useState("");

  //   const handleSearch = () => {
  //     // Implement your search functionality here
  //     console.log("Searching for:", query);
  //   };

  //   const handleKeyDown = (e) => {
  //     if (e.key === "Enter") {
  //       handleSearch();
  //     }
  //   };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative">
        <div className="relative flex items-center w-full rounded-full bg-gray-100 hover:bg-gray-200 transition-colors px-4 py-2">
          <Search className="h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            // value={query}
            // onChange={(e) => setQuery(e.target.value)}
            // onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-none focus:ring-0 focus:outline-none pl-2 text-gray-700"
          />
        </div>
      </div>
    </div>
  );
}
