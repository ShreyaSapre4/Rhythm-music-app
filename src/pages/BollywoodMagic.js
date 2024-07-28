import { React, useState, useRef, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Bollywood } from "../static/SongData/Bollywood_Magic";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { PlayingSong } from "../components/PlayingSong";

function BollywoodMagic() {
  const [bollywood, setbollywood] = useState(Bollywood)
  
  const [song,setSong]= useState(Bollywood[0].song_url)
  const [image,setImage]= useState(Bollywood[0].image_url)
  const [name, setName]= useState(Bollywood[0].song_name)

  const SetPlayingSong = (song_url, image_url, song_name)=>{
    setSong(song_url)
    setImage(image_url)
    setName(song_name)
  }

  useEffect(() => {
    const element = document.querySelectorAll('.song-card')
    function changeMenuActive() {
      element.forEach(n => n.classList.remove('active'))
      this.classList.add('active')
    }
    element.forEach(n => n.addEventListener('click', changeMenuActive), {})
  }, [])

  const changeFav = (id) => {
    Bollywood.forEach((item) => {
      if (item.song_id == id) {
        item.liked = !item.liked
      }
    })
    setbollywood([...Bollywood])
  }

  return (
    <div>
      <div className="playlist">
        <Sidebar />
        <div className="playlist-container">
          <h3>Bollywood magic</h3>
          <p>By Hedgehog</p>
          <div className="playlist-container-grid">
            {bollywood && bollywood.map((item) => (
              <div className="song-card" onClick={() => SetPlayingSong(item.song_url,item.image_url, item.song_name)} key={item?.song_id}>
                <img src={item.image_url}></img>
                <div>
                  <h4>{item.song_name}</h4>
                  <p>{item.singer}</p>
                  <span className="favorite" onClick={() => changeFav(item?.song_id)}>
                    {item?.liked ? <FaHeart /> : <FaRegHeart />}
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

export default BollywoodMagic;
