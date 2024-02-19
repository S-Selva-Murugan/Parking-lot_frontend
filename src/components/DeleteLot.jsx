import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function DeleteLot() {
    const navigate = useNavigate();
    const [parkingLots, setParkingLots] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4545/api/parking');
                setParkingLots(response.data);
            } catch (error) {
                console.error('Error fetching parking lots:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (parkingLotId) => {
        try {
            await axios.delete(`http://localhost:4545/api/parking/${parkingLotId}`);
            const response = await axios.get('http://localhost:4545/api/parking');
            setParkingLots(response.data);
        } catch (error) {
            console.error('Error deleting parking lot:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Parking Lots</h1>
            <ul className="list-group">
                {parkingLots.map((parkingLot, index) => (
                    <li key={index} className="list-group-item">
                        <h3>{parkingLot.name}</h3>
                        <p>Location: {parkingLot.location}</p>
                        <p>Floors:</p>
                        <ul>
                        {parkingLot.floors.map((floor, floorIndex) => (
                            <li key={floorIndex}>
                                <h4>Floor {floor.floorNumber}</h4>
                                <ul>
                                {floor.slots.map((slot, slotIndex) => (
                                    <li key={slotIndex}>
                                         <p>Size: {slot.size} | Slots Available: {slot.slotsAvailable}</p>
                                    </li>
                                    ))}
                                </ul>
                            </li>
                            ))}
                </ul>
            <button className='btn btn-danger' onClick={() => handleDelete(parkingLot._id)}>Delete</button>
            </li>
                ))}
            </ul>
        </div>
    );
}
