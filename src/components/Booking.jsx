import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'

export default function Booking() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [parkingLot, setParkingLot] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);

    useEffect(() => {
        const fetchParkingLot = async () => {
            try {
                const response = await axios.get(`http://localhost:4545/api/parking/${id}`);
                setParkingLot(response.data);
            } catch (error) {
                console.error('Error fetching parking lot:', error);
            }
        };

        fetchParkingLot();
    }, [id]);

    const handleSlotSelection = (floorIndex, slotIndex) => {
        const updatedParkingLot = { ...parkingLot };
        updatedParkingLot.floors[floorIndex].slots[slotIndex].slotsAvailable--;
        setParkingLot(updatedParkingLot);
        setSelectedSlot({ floorIndex, slotIndex });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.put(`http://localhost:4545/api/parking/${id}`, parkingLot);
            console.log(response.data)
            setParkingLot(response.data);
            navigate("/")
            Swal.fire({
                title: "Slots allotted!",
                text: "",
                icon: "success"
              });
        } catch (error) {
            console.error('Error updating parking lot:', error);
        }
    };

    return (
        <div>
            <h1 >Booking page</h1>
            {parkingLot && (
                <div>
                    <h2>{parkingLot.name}</h2>
                    <p>Location: {parkingLot.location}</p>
                    <p>Floors:</p>
                    <ul>
                    {parkingLot.floors.map((floor, floorIndex) => (
                        <li key={floorIndex}>
                        <h3>Floor {floor.floorNumber}</h3>
                            <ul>
                             {floor.slots.map((slot, slotIndex) => (
                                <li key={slotIndex} style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ marginRight: '10px' }}>
                                    <p>Size: {slot.size}</p>
                                    <p>Slots Available: {slot.slotsAvailable}</p>
                                </div>
                                    <button className='btn btn-warning' onClick={() => handleSlotSelection(floorIndex, slotIndex)}>Select Slot</button>
                                </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <button onClick={handleSubmit} className='btn btn-success'>Submit</button>
        </div>
    );
}
