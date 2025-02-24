const RoomCard = () => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <a href="">
        <div className="px-6 py-4">
            <p>title</p>
          <p className="text-gray-700 text-base">
            description
            {/* {props.description.substring(0, 150) + "..."} */}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              Sharing
            </span>
        </div>
      </a>
    </div>
  );
};

export default RoomCard;
