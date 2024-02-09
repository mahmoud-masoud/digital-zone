import { Search } from "lucide-react";
import { useState, useEffect } from "react";

const SearchBox = ({ setInputOnFocus, isInputOnFocus, handleInputOnFocus }) => {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const closeSuggestions = (e) => {
      if (!e.target.closest(".search-box")) {
        setInputOnFocus(false);
      }
    };
    document.addEventListener("click", closeSuggestions);
    return () => {
      document.removeEventListener("click", closeSuggestions);
    };
  }, []);

  return (
    <>
      <form
        className={`${isInputOnFocus && "z-[100] px-4"} search-box
         flex w-full max-w-lg flex-1 gap-2 transition-all duration-300 md:static md:w-80 md:p-0
    ${isInputOnFocus && "absolute right-0"}`}
      >
        <div
          className="relative flex w-full flex-1 rounded-full
           bg-white"
        >
          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            // ${isInputOnFocus && "rounded-none"}
            className={`block h-10 w-full rounded-full p-2
              pl-4 pr-16  focus:transition 
          `}
            onClick={() => setInputOnFocus(true)}
          />
          <div
            className="absolute right-0 top-1/2 flex -translate-y-1/2
           items-center justify-center gap-2 pr-1"
          >
            <button
              type="button"
              className={`text-xl text-gray-600 ${
                searchInput === "" && "hidden"
              }`}
              onClick={() => setSearchInput("")}
            >
              &times;
            </button>
            <button className="rounded-full bg-secondary p-1">
              <Search className="p-0.5 text-dark" strokeWidth={1.2} />
            </button>
          </div>
          {/* Suggestions Box */}
          {isInputOnFocus && (
            <div
              className="fixed left-0 top-[74px] h-screen w-full rounded-md bg-white
            p-4 shadow-lg transition md:absolute md:top-[42px] md:h-auto"
            >
              <p className="text font-medium text-emerald-600">
                available soon.
              </p>
            </div>
          )}
        </div>
        {isInputOnFocus && (
          <button
            type="button"
            className="text-white underline md:hidden"
            onClick={handleInputOnFocus}
          >
            Cancel
          </button>
        )}
      </form>
    </>
  );
};
export default SearchBox;
