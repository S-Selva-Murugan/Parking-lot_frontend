import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Card, Button } from 'react-bootstrap';

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
            <h1 style={{marginLeft:"450px"}}>Booking page</h1>
            {parkingLot && (
                <div>
                    <h2>{parkingLot.name}</h2>
                    <p>Location: {parkingLot.location}</p>
                    <p>Floors:</p>
                    {parkingLot.floors.map((floor, floorIndex) => (
                        <Card key={floorIndex} style={{ marginBottom: '20px',width:"700px", marginLeft:"50px" }}>
                            <Card.Header>Floor {floor.floorNumber}</Card.Header>
                            <Card.Body>
                                <ul>
                                    {floor.slots.map((slot, slotIndex) => (
                                        <li key={slotIndex} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <div>
                                                <p>Size: {slot.size}</p>
                                                <p>Slots Available: {slot.slotsAvailable}</p>
                                            </div>
                                            <Button variant="warning" onClick={() => handleSlotSelection(floorIndex, slotIndex)}>Select Slot</Button>
                                        </li>
                                    ))}
                                </ul>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            )}
            <Button style={{marginBottom:"10px", marginLeft:"50px"}} 
            onClick={handleSubmit} 
            className='btn btn-success'
            >Submit</Button>
        </div>
    );
}
