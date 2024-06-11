import { useEffect, useState } from "react";
import { axiosInstanceWithHeaders } from "../../../../axiosConfig/axiosInstance";
import { Link } from "react-router-dom";

const RoomsList = () => {
  const [roomsList, setRoomsList] = useState([]);
  async function getRoomdata() {
    try {
      let response = await axiosInstanceWithHeaders.get("admin/rooms");
      console.log(response);
      const rooms = response.data.data.rooms;
      setRoomsList(rooms);
    } catch (error: any) {
      console.error(error);
    }
  }
  useEffect(() => {
    getRoomdata();
  }, []);
  return (
    <div>
      {roomsList.map((room: any, index) => (
        <div key={index}>
          <div>{room.roomNumber}</div>
          <Link to={`/room-details/${room._id}`}>room</Link>
        </div>
      ))}
    </div>
  );
};

export default RoomsList;
