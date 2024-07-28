import React from "react";
import Sidebar from "../components/Sidebar";
import { useRef, useState, useEffect } from "react";
import playlist1 from "../static/playlist-song1.jpg";
import playlist2 from "../static/playlist-song2.jpg";
import playlist3 from "../static/playlist-song3.jpg";
import playlist4 from "../static/playlist-song1.jpg";
import songs from "../static/SongData/songdata.json";
import { PlayingSong } from "../components/PlayingSong";
import Searchbar from "../components/Searchbar";
import SearchList from "../components/SearchList";
import singers from '../static/SongData/singer.json'
import { NavLink } from 'react-router-dom';

function Homepage() {
  songs.sort((a, b) => b.time_played - a.time_played)
  const popularArtists = singers.slice(0, 5);
  const popularSongs = songs.slice(0, 3);
  const audioRef = useRef(null);
  const [playingSong, setPlayingSong] = useState(null);

  const [song, setSong] = useState(songs[0].song_url)
  const [image, setImage] = useState(songs[0].image_url)
  const [name, setName] = useState(songs[0].song_name)

  useEffect(() => {
    const element = document.querySelectorAll('.PopularSongs-item')
    function changeMenuActive() {
      element.forEach(n => n.classList.remove('active'))
      this.classList.add('active')
    }
    element.forEach(n => n.addEventListener('click', changeMenuActive), {})
  }, [])

  const SetPlayingSong = (song_url, image_url, song_name) => {
    setSong(song_url)
    setImage(image_url)
    setName(song_name)
    // playSong(song_url)
  }

  // const playSong = (item) => {
  //   let audio = audioRef.current;
  //   if (audio) {
  //     audio.src = item;
  //     audio.play();
  //   } else {
  //     console.error("Audio element not found!");
  //   }
  // };

  const [searchRes, setSearchRes] = useState([])
  const [search, setSearch] = useState('')
  return (
    <>
      <div className="Homepage">
        <Sidebar />
        <div className="MainPage">
          <Searchbar search={search} setSearch={setSearch} setSearchRes={setSearchRes} />
         {search &&  <div onClick={() =>{ SetPlayingSong(searchRes.song_url, searchRes.image_url, searchRes.song_name)}}> <SearchList searchResult={searchRes} /></div>}
          <div className="PopularSongs">
            <h2>Popular songs</h2>
            <div className="PopularSongs-container">
              {popularSongs.map((item) => (
                <div
                  className="PopularSongs-item"
                  onClick={() => SetPlayingSong(item.song_url, item.image_url, item.song_name)}
                  key={item.id}
                >
                  <img src={item.image_url}  alt=""/>
                  <div className="details">
                    <h3>{item.song_name}</h3>
                    <p>{item.singer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="PopularArtists">
            <h2>Popular Artists</h2>
            <div className="PopularArtists-container">
              {popularArtists.map((item) => (
                <a href={`/singer/${item.id}`}><div className="PopularArtists-item">
                  <img src={item.image} alt=""></img>
                  <h3>{item.name}</h3>
                </div></a>
              ))}
            </div>
          </div>
          <div className="PopularPlaylists">
            <h2>Popular Playlists</h2>
            <div className="PopularPlaylists-container">
              <div className="PopularPlaylists-item">
                <img src={playlist1}></img>
                <h3>Workout Madness</h3>
                <p>SnoSno</p>
              </div>
              <div className="PopularPlaylists-item">
                <img src={playlist2} alt=""></img>
                <h3>Dance Party</h3>
                <p>abd</p>
              </div>

              <div className="PopularPlaylists-item">
                <img src={playlist3}></img>
                <h3>Sangeet Dhamaka</h3>
                <p>xyz</p>
              </div>

              <div className="PopularPlaylists-item">
                <img src={playlist4}></img>
                <h3>Calming songs</h3>
                <p>bobo</p>
              </div>
            </div>
          </div>
        </div>
        <div className="audio_player"><PlayingSong song_src={song} image_src={image} songName={name} /></div>
      </div>
    </>
  );
}

export default Homepage;
