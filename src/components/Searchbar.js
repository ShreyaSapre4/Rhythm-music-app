import React from 'react'
import { useState, useEffect } from 'react'
import songs from '../static/SongData/songdata.json'
import { TbSearch } from 'react-icons/tb'

function Searchbar({ search, setSearch, setSearchRes}) {

    const FetchSearchData = (value) => {
        if(value!==''){
            songs.forEach(n => {
                if (n.song_name.toLowerCase().includes(value.toLowerCase())) {
                    const results = n
                    setSearchRes(results)
                }
            })
        }else{
            setSearchRes()
        }
    }

    const handleChange = (value) => {
        setSearch(value)
        FetchSearchData(value)
    }

    return (
        <div>
            <div className="searchbar">
                <button className="search-btn">
                    <TbSearch />
                </button>
                <input placeholder="Search your favorite songs..." value={search} onChange={(e) => handleChange(e.target.value)} />
            </div>
        </div>
    )
}

export default Searchbar
