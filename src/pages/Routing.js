import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Landing from './Landing';
import Homepage from './Homepage';
import Bollywood from './BollywoodMagic';
import Popular from './Popular';
import Singer from './Singer';

function Routing() {
    return (
        <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/home' element={<Homepage />} />
            <Route path='/playlist/bollywood' element={<Bollywood />} />
            <Route path='/playlist/popular' element={<Popular />} />
            <Route path='/singer/:id' element={<Singer />} />
        </Routes>
    )
}

export default Routing
