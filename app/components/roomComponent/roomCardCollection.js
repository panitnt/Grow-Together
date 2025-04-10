"use client";
import { useEffect, useState } from "react";
import RoomCard from "./roomCard";

const RoomCardCollection = (props) => {
  const roomType = props.roomtype;
  let endPath = "";
  if (roomType) {
    endPath = `/${roomType}`;
  }

  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name-asc");
  const [filteredRooms, setFilteredRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      let endPath = roomType ? `/${roomType}` : "";
      const res = await fetch(`http://localhost:3000/api/room${endPath}`);
      const body = await res.json();
      setRooms(body.data);
      setFilteredRooms(body.data);
    };

    fetchRooms();
  }, [roomType]);

  useEffect(() => {
    let result = [...rooms];

    result = result.filter((room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOption === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "name-desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === "date-asc") {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    setFilteredRooms(result);
  }, [searchTerm, sortOption, rooms]);

  const clearFilters = () => {
    setSearchTerm("");
    setSortOption("name-asc");
  };

  return (
    // <div className='grid sm:grid-cols-1 mobile:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-8'>
    <div className="p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search room by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full sm:w-1/2"
        />

        <div className="flex gap-2 sm:w-auto w-full">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full sm:w-48"
          >
            <option value="name-asc">Name A–Z</option>
            <option value="name-desc">Name Z–A</option>
            <option value="date-asc">Date (upcoming)</option>
          </select>

          <button
            onClick={clearFilters}
            className="p-2 px-4 border border-gray-300 rounded bg-gray-100 hover:bg-gray-200 text-sm"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <RoomCard
              key={room._id}
              id={room._id}
              name={room.name}
              description={room.description}
              date={room.date}
              person={room.person}
              roomtype={room.type}
            />
          ))
        ) : (
          <p>No this room name</p>
        )}
      </div>
    </div>
  );
};

export default RoomCardCollection;
