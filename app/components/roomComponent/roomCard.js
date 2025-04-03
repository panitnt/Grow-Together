import Link from "next/link";

const RoomCard = (props) => {
  // console.log(props.id);
  const name = props.name;
  const description = props.description;
  const roomtype = props.roomtype;
  const date = new Date(props.date)  
  const roomID = props.id

  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <Link href={`/room/${roomID}`}>
        <div className="px-6 py-4">
          <p className="text-xl">{name}</p>
          <p className="text-gray-700 text-base">
            {description.length > 150
              ? description.substring(0, 150) + "..."
              : description}
          </p>
          <p>{date?date.toLocaleDateString("th-TH"):""} time: {date?date.toLocaleTimeString("th-TH", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false, // Use 24-hour format
              timeZone: "Asia/Bangkok"
            }) : ""}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {roomtype}
          </span>
        </div>
      </Link>
    </div>
  )
}

export default RoomCard;
