import RoomCard from "./roomCard";

const RoomCardCollection = async (props) => {
  const roomType = props.roomtype;
  const endPath = "";
  if (roomType) {
    endPath = `/${roomType}`;
  }

  const res = await fetch(`http://localhost:3000/api/room${endPath}`);
  // console.log(await res.json());

  const body = await res.json();
  const rooms = body.data;
  console.log(rooms);

  return (
    // <div className='grid sm:grid-cols-1 mobile:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-8'>
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {rooms.map((room, ind) => (
          <RoomCard
            key={ind}
            id={ind}
            name={room.name}
            description={room.description}
            date={room.date}
            person={room.person}
            roomtype={room.type}
          />
        ))}
      </div>
    </div>
  );
};

export default RoomCardCollection;
