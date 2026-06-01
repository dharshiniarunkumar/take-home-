import React, { useState, useEffect } from 'react';
import './App.css';

function MovieList({ onSelect }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/movies')
      .then(r => r.json())
      .then(d => setMovies(d.data));
  }, []);

  return (
    <div style={{padding:'20px'}}>
      <h1>🎬 Movies</h1>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:'16px'}}>
        {movies.map(movie => (
          <div key={movie.id} onClick={() => onSelect(movie.id)}
            style={{background:'#1e1e2e', borderRadius:'10px', padding:'16px', cursor:'pointer', color:'white'}}>
            <h3 style={{margin:'0 0 8px'}}>{movie.title}</h3>
            <p style={{margin:'0 0 4px', color:'#aaa', fontSize:'13px'}}>{movie.tagline}</p>
            <p style={{margin:'0', color:'#ffd700'}}>⭐ {movie.vote_average ? (movie.vote_average).toFixed(1) : 'N/A'} / 10</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MovieDetail({ id, onBack }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/movies/${id}`)
      .then(r => r.json())
      .then(d => setMovie(d.data));
  }, [id]);

  if (!movie) return <div style={{color:'white', padding:'20px'}}>Loading...</div>;

  const releaseDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString()
    : 'N/A';
  const runtime = movie.runtime ? `${movie.runtime} min` : 'N/A';

  return (
    <div style={{padding:'20px', color:'white', maxWidth:'700px', margin:'0 auto'}}>
      <button onClick={onBack} style={{marginBottom:'16px', padding:'8px 16px', cursor:'pointer'}}>← Back</button>
      <h1>{movie.title}</h1>
      <p style={{color:'#aaa'}}>{movie.tagline}</p>
      <p><b>Release Date:</b> {releaseDate}</p>
      <p><b>Runtime:</b> {runtime}</p>
      <p><b>Rating:</b> ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} / 10</p>
      <p><b>Overview:</b> {movie.overview}</p>
      <p><b>Language:</b> {movie.original_language}</p>
      <p><b>Popularity:</b> {movie.popularity}</p>
    </div>
  );
}

function App() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div style={{minHeight:'100vh', background:'#0f0f1a'}}>
      {selectedId
        ? <MovieDetail id={selectedId} onBack={() => setSelectedId(null)} />
        : <MovieList onSelect={setSelectedId} />}
    </div>
  );
}

export default App;