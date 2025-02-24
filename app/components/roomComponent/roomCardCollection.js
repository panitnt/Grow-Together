import RoomCard from './roomCard'

const RoomCardCollection = async (props) => {
    const roomType = props.roomtype
    const endPath = ""
    if (roomType) {
      endPath = `/${roomType}`
    }
    const res = await fetch(`http://localhost:3000/api/room${endPath}`)
    console.log(await res.json());
        
  return (
    // <div className='grid sm:grid-cols-1 mobile:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-8'>   
    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>        
        <RoomCard/>
        <RoomCard/>
    </div>
  )
}

export default RoomCardCollection