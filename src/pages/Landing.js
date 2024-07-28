import React from 'react'
import { MdArrowOutward } from "react-icons/md";
import { GiMusicSpell } from "react-icons/gi";

function Landing() {
  return (
    <>
    <div className='Landing_page'>
    <h1><GiMusicSpell/>Rhythm</h1>
    <a href="./home" className='btn'>Get started <MdArrowOutward /></a>
    </div>
    </>
  )
}

export default Landing
