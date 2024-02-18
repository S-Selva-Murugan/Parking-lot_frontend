import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import ParkingList from './components/ParkingList';
import Parking from './components/Parking';
import Home from './components/Home';
import Booking from './components/Booking';
import FreeSlot from './components/FreeSlot';
import Free from './components/Free';

export default function App() {
  return (
    <BrowserRouter>
      <div>
      <nav class="navbar navbar-expand-lg bg-body-primary" style={{backgroundColor:"#0d6efd "}}>
  <div class="container-fluid">
    <a class="navbar-brand fw-bold" href="/">Parking-service</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active fw-bold" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link fw-bold" href="/parking-list">Parking lots</a>
        </li>
        <li class="nav-item">
          <a class="nav-link fw-bold" href="/create-slot">Create a lot</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
        <Routes>
          <Route path='/parking-list' element={<ParkingList/>}></Route>
          <Route path='/create-slot' element={<Parking/>}></Route>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/booking' element={<Booking/>}></Route>
          <Route path='/booking/:id' element={<Booking />} />
          <Route path='/free-slot' element={<FreeSlot/>} />
          <Route path='/booking/free/:id' element={<Free/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
