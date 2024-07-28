import React, { useEffect } from 'react'
import { GiMusicSpell } from 'react-icons/gi'
import songs from '../static/SongData/songdata.json'

function Sidebar() {
    // songs.sort((a, b) => b.time_played - a.time_played)
    const genre = songs.slice(0, 3)

    useEffect(() => {
        const element = document.querySelectorAll('.myplaylist-item')
        function changeMenuActive() {
            element.forEach(n => n.classList.remove('active'))
            this.classList.add('active')
        }
        element.forEach(n => n.addEventListener('click', changeMenuActive), {})
    }, [])
    return (
        <div className='sidebar'>
            <div>
                <h1><GiMusicSpell />Rhythm</h1>
            </div>
            <div className='myplaylists'>
                <h3>Playlists</h3>
                <ul type='none'>
                    <li>
                    <a href='/playlist/bollywood'> <div className='myplaylist-item'>Bollywood magic</div></a>
                    </li>
                    <li>
                    <a href='/playlist/popular'> <div className='myplaylist-item'>Popular songs</div></a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
