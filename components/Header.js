import Image from "next/image";
import {
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/dist/client/router";

function Header({placeholder}) {
  // State for Search Input
  const [searchInput, setsearchInput] = useState("");

  // States for Start and End date
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // State for number of Guests
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  // Router object
  const router = useRouter();

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  // Resetting Search input state on Cancel button click
  const resetInput = () => {
    setsearchInput("");
  };

  // On search click, we are making use of router to redirect to search page.
  //along with redirect, we are also passing querystring parameters
  //from the page such as location, Start Date, End date

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numberOfGuests,
      },
    });
  };

  return (
    <header
      className="sticky top-0 z-50 grid 
    grid-cols-3 bg-white shadow-md p-5 md:px-10"
    >
      {/* On Image click we are calling Router push method which will redirect us to home page. 
      We no need to make use of any history object go go back to any previous page, that can be done using Router object */}
      {/* Left */}
      <div
        onClick={() => router.push("/")}
        className="relative flex items-center h-10 cursor-pointer my-auto"
      >
        <Image
          src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>
      {/* Middle - Search*/}
      <div className="flex items-center border-2 rounded-full py-2 md: shadow-sm">
        <input
          value={searchInput}
          onChange={(e) => setsearchInput(e.target.value)}
          className="flex-grow pl-5 bg-transparent outline-none 
          text-sm text-gray-600 placeholder-gray-400"
          type="text"
          placeholder={ placeholder || "Start your Search"}
        />
        <SearchIcon
          className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full 
        p-2 cursor-pointer md:mx-2"
        />
      </div>
      {/* Right */}
      <div className="flex items-center space-x-4 justify-end text-gray-500">
        <p className="hidden md:inline cursor-pointer">Become a host</p>
        <GlobeAltIcon className="h-6 cursor-pointer" />
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>

      {/* Show Date range picker only when text is available in the Search input */}
      {searchInput && (
        <div
          className="flex flex-col 
        col-span-3 mx-auto"
        >
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleSelect}
          />

          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl flex-grow font-semibold">
              Number of Guests
            </h2>
            <UsersIcon className="h-5" />
            <input
              type="number"
              min={1}
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(e.target.value)}
              className="w-12 pl-2 text-lg outline-none
            text-red-400"
            />
          </div>
          <div className="flex">
            <button className="flex-grow text-gray-500" onClick={resetInput}>
              Cancel
            </button>
            <button onClick={search} className="flex-grow text-red-400">
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
