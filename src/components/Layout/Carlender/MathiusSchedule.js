import React from 'react'
import { InlineWidget } from "react-calendly"

import './Carlender.css'
const MathiusSchedule = () => {


    return (
        <div className="main-container">
            <div className="right-column-carlender">
                <InlineWidget styles={{ width: '90%', height: '90vh' }} url="https://calendly.com/m-moebius" />
            </div>
        </div>
    )
}

export default MathiusSchedule
