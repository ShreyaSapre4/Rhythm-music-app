import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import songs from '../static/SongData/songdata.json'
import singers from '../static/SongData/singer.json'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { PlayingSong } from '../components/PlayingSong'
import Sidebar from '../components/Sidebar'


function Singer() {
    const [singer, setSinger] = useState([])
    let params = useParams()
    var singerData = {}
    singers.forEach(n => {
        if (n.id == params.id) {
            singerData = n
        }
    })

    useEffect(() => {
        const getSongs = async () => {
            const filteredSongs = songs.filter((song) => song.singer_id == params.id);
            setSinger(filteredSongs);
        };

        getSongs();
    }, [params.id]);


    useEffect(() => {
        const element = document.querySelectorAll('.song-card')
        function changeMenuActive() {
            element.forEach(n => n.classList.remove('active'))
            this.classList.add('active')
        }
        element.forEach(n => n.addEventListener('click', changeMenuActive), {})
    }, [])

    const changeFav = (id) => {
        singer.forEach((item) => {
            if (item.song_id == id) {
                item.liked = !item.liked
            }
        })
        setSinger([...singer])
    }

    const [song, setSong] = useState(singer[0]?.song_url)
    const [image, setImage] = useState(singer[0]?.image_url)
    const [name, setName] = useState(singer[0]?.song_name)

    
  const SetPlayingSong = (song_url, image_url, song_name)=>{
    setSong(song_url)
    setImage(image_url)
    setName(song_name)
  }

    return (
        <div>
            <div className="singers">
                <Sidebar />
                <div className="singers-container">
                    <div className='singer_desc'>
                        <img src={singerData.image} id='singerIMG'></img>
                        <div>
                            <h3>{singerData.name}</h3>
                            <p>{singerData.description}</p>
                        </div>
                    </div>
                    <div className="singers-container-grid">
                        {singer.map((item) => (
                            <div key={item.id}>
                                <div className="song-card" onClick={() => SetPlayingSong(item.song_url,item.image_url, item.song_name)}>
                                    <img src={item.image_url}></img>
                                    <div>
                                        <h4>{item.song_name}</h4>
                                        <p>{item.singer}</p>
                                        <span className="favorite" onClick={() => changeFav(item?.song_id)}>
                                            {item?.liked ? <FaHeart /> : <FaRegHeart />}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="audio_player"><PlayingSong song_src={song} image_src={image} songName={name}/></div>
        </div>)
}

export default Singer


