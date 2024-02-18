import React, { useState } from 'react';
import axios from 'axios';

export default function Parking() {
    const [parkingData, setParkingData] = useState({
        name: '',
        location: '',
        floors: [{ floorNumber: '', slots: [{ size: '', slotsAvailable: '' }] }],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setParkingData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFloorChange = (index, event) => {
        const { name, value } = event.target;
        const newFloors = [...parkingData.floors];
        newFloors[index][name] = value;
        setParkingData(prevData => ({
            ...prevData,
            floors: newFloors,
        }));
    };

    const handleSlotChange = (floorIndex, slotIndex, event) => {
        const { name, value } = event.target;
        const newFloors = [...parkingData.floors];
        newFloors[floorIndex].slots[slotIndex][name] = value;
        setParkingData(prevData => ({
            ...prevData,
            floors: newFloors,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4545/api/parking/create', parkingData);
            console.log('Response:', response.data);
            // Handle success response here
        } catch (error) {
            console.error('Error:', error);
            // Handle error here
        }
    };

    const addFloor = () => {
        setParkingData(prevData => ({
            ...prevData,
            floors: [...prevData.floors, { floorNumber: '', slots: [{ size: '', slotsAvailable: '' }] }],
        }));
    };

    const removeFloor = (index) => {
        const newFloors = [...parkingData.floors];
        newFloors.splice(index, 1);
        setParkingData(prevData => ({
            ...prevData,
            floors: newFloors,
        }));
    };

    const addSlot = (floorIndex) => {
        const newFloors = [...parkingData.floors];
        newFloors[floorIndex].slots.push({ size: '', slotsAvailable: '' });
        setParkingData(prevData => ({
            ...prevData,
            floors: newFloors,
        }));
    };

    const removeSlot = (floorIndex, slotIndex) => {
        const newFloors = [...parkingData.floors];
        newFloors[floorIndex].slots.splice(slotIndex, 1);
        setParkingData(prevData => ({
            ...prevData,
            floors: newFloors,
        }));
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Create Parking Lot</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={parkingData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="location"
                        name="location"
                        value={parkingData.location}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    {parkingData.floors.map((floor, floorIndex) => (
                        <div key={floorIndex} className="mb-4">
                            <h3>Floor {floorIndex + 1}</h3>
                            <div className="mb-3">
                                <label htmlFor={`floorNumber-${floorIndex}`} className="form-label">Floor Number:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id={`floorNumber-${floorIndex}`}
                                    name="floorNumber"
                                    value={floor.floorNumber}
                                    onChange={(e) => handleFloorChange(floorIndex, e)}
                                />
                            </div>
                            {floor.slots.map((slot, slotIndex) => (
                                <div key={slotIndex} className="mb-3">
                                    <h4>Slot {slotIndex + 1}</h4>
                                    <div className="mb-3">
                                        <label htmlFor={`size-${floorIndex}-${slotIndex}`} className="form-label">Size:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={`size-${floorIndex}-${slotIndex}`}
                                            name="size"
                                            value={slot.size}
                                            onChange={(e) => handleSlotChange(floorIndex, slotIndex, e)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor={`slotsAvailable-${floorIndex}-${slotIndex}`} className="form-label">Slots Available:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id={`slotsAvailable-${floorIndex}-${slotIndex}`}
                                            name="slotsAvailable"
                                            value={slot.slotsAvailable}
                                            onChange={(e) => handleSlotChange(floorIndex, slotIndex, e)}
                                        />
                                    </div>
                                    {slotIndex === floor.slots.length - 1 && (
                                        <button type="button" className="btn btn-primary me-2" onClick={() => addSlot(floorIndex)}>Add Slot</button>
                                    )}
                                    {slotIndex > 0 && (
                                        <button type="button" className="btn btn-danger" onClick={() => removeSlot(floorIndex, slotIndex)}>Remove Slot</button>
                                    )}
                                </div>
                            ))}
                            {floorIndex === parkingData.floors.length - 1 && (
                                <button type="button" className="btn btn-primary me-2" onClick={addFloor}>Add Floor</button>
                            )}
                            {floorIndex > 0 && (
                                <button type="button" className="btn btn-danger" onClick={() => removeFloor(floorIndex)}>Remove Floor</button>
                            )}
                        </div>
                    ))}
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    );
}
