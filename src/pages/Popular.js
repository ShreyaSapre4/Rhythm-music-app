import { React, useRef, useState, useEffect } from "react";
import PopularSongs from "../static/SongData/Popular.json";
import Sidebar from "../components/Sidebar";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { PlayingSong } from "../components/PlayingSong";

function Popular() {
  const [popular, setPopular] = useState(PopularSongs)

  const [song,setSong]= useState(PopularSongs[0].song_url)
  const [image,setImage]= useState(PopularSongs[0].image_url)
  const [name, setName]= useState(PopularSongs[0].song_name)

  const SetPlayingSong = (song_url, image_url, song_name)=>{
    setSong(song_url)
    setImage(image_url)
    setName(song_name)    
  }

  const changeFav = (id) => {
    PopularSongs.forEach((n) => {
      if (n.song_id == id) {
        n.liked = !n.liked;
      }
    })
    setPopular([...PopularSongs])
  }
  useEffect(() => {
    const element = document.querySelectorAll('.song-card')
    function changeMenuActive() {
      element.forEach(n => n.classList.remove('active'))
      this.classList.add('active')
    }
    element.forEach(n => n.addEventListener('click', changeMenuActive), {})
  }, [])

  return (
    <div>
      <div className="playlist">
        <Sidebar />
        <div className="playlist-container">
          <h3>Popular Songs</h3>
          <p>By Shruti</p>
          <div className="playlist-container-grid">
            {popular && popular.map((item) => (
              <div className="song-card" onClick={() => SetPlayingSong(item.song_url, item.image_url, item.song_name)}>
                <img src={item.image_url}></img>
                <div>
                  <h4>{item.song_name}</h4>
                  <p>{item.singer}</p>
                  <span className="favorite" onClick={() => changeFav(item.song_id)}>
                    {
                      item?.liked ?
                        <FaHeart /> : <FaRegHeart />
                    }
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="audio_player"><PlayingSong song_src={song} image_src={image} songName={name}/></div>
    </div>
  );
}

export default Popular;
