import { Link, useParams } from "react-router-dom";

const RoomDetails = () => {
  const { roomId } = useParams();
  console.log(roomId);

  return <div>
    <Link to='/pay-booking' state={roomId}>Explore</Link>
  </div>;
};

export default RoomDetails;
