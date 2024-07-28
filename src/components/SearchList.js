import React from 'react'; 

function SearchList({ searchResult }) {
 
  return (
    <div>
      <div key={searchResult.id} className={searchResult? 'searchResult' : 'hide'}>
        <img src={searchResult.image_url}></img>
        <div>
         <h4>{searchResult.song_name}</h4>
         <p>{searchResult.singer}</p>
        </div>
      </div>
    </div>
  );
}

export default SearchList;


