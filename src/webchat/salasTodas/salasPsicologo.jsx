import './styles.css'
import React, { useState, useEffect } from "react";
import { App } from "../../route/api-helpers";
import { useNavigate } from "react-router-dom";

export const GetWebChat = () => {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    async function getAllRooms() {
        const allRooms = await App.getWebSala();
        setRooms(allRooms);
    }

    useEffect(() => {
        getAllRooms();
    }, []);

    const handleRoomClick = async (id) => {
        const room = await App.getWebSalaById(id);
        console.log(room)
        const doctorConnectionLink = `https://webchat-grupotech.vercel.app/${room.doctor}`;
        window.open(doctorConnectionLink, '_blank');
    };

    return (
        <div className="containerRoom">
            <h1>Chats</h1>
         <div className='listaChat'>
         {rooms.map((room) => (
                <div
                    className="listaRoom"
                    key={room.id}
                    onClick={() => handleRoomClick(room.id)}
                >
                    <div className='card-room'>
                        <div className="room-image"> 
                            <img src={room.patient.photo} alt={room.patient.name} />
                        </div>
                        <div className="room-info">
                            <h2>{room.patient.name}</h2>
                        </div>
                    </div>
                </div>
            ))}
         </div>
         
        </div>
    );
};
