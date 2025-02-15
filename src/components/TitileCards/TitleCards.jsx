import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';



const TitileCards = ({title,category}) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef= useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Njk5NTM3NDRmMThiYzg1MDNhY2ZiNzEwZTA1NDAzOCIsIm5iZiI6MTczOTYyMzk1Mi42MjYsInN1YiI6IjY3YjA4ZTEwNzBjODg2NWViZDM2MjcxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.v3f00D5MOFH7dYYsVimtnB3T0DAWq1GzsP1J-c75QOY'
    }
  };
  


const handWheel = (event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

  cardsRef.current.addEventListener('wheel',handWheel);
},[])

  return (
    <div className='title-cards'>
     <h2>{title?title:"Popular on Netflix"}</h2> 
     <div className="card-list" ref={cardsRef}>
      {apiData.map((card, index)=>{
          return <Link to={`/player/${card.id}`} className='card' key ={index}>
            <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
          
      })}
     </div>
    </div>
  )
}

export default TitileCards
