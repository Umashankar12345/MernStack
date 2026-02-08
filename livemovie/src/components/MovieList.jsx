import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieList = ({ onMovieSelect }) => {
  const navigate = useNavigate();
  
  const sampleMovies = [
    {
      id: 1,
      title: "Avatar: The Way of Water",
      genre: "Sci-Fi",
      duration: "3h 12m",
      rating: 7.8,
      poster: "https://media.istockphoto.com/id/2176069023/photo/a-fierce-avtar-of-hindu-god-shiva-with-weapons-mahakal-corridor-hd-images-ujjain-shiva-shri.webp?a=1&b=1&s=612x612&w=0&k=20&c=t8JLd1N5yqJjU3_fyQWjoiXlHFpqjlnbyF6UQqp7Pe0=",
      description: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora.",
      showtimes: ["10:00 AM", "2:00 PM", "6:00 PM", "10:00 PM"],
      language: "English",
      director: "James Cameron"
    },
    {
      id: 2,
      title: "Spider-Man: No Way Home",
      genre: "Action",
      duration: "2h 28m",
      rating: 8.3,
      poster: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=300&h=450&fit=crop",
      description: "Peter Parker's secret identity is revealed to the entire world.",
      showtimes: ["11:00 AM", "3:00 PM", "7:00 PM"],
      language: "English",
      director: "Jon Watts"
    },
    {
      id: 3,
      title: "The Batman",
      genre: "Action",
      duration: "2h 56m",
      rating: 7.9,
      poster: "https://images.unsplash.com/photo-1497124401559-3e75ec2ed794?w=300&h=450&fit=crop",
      description: "Batman ventures into Gotham City's underworld.",
      showtimes: ["12:00 PM", "4:00 PM", "8:00 PM"],
      language: "English",
      director: "Matt Reeves"
    },
    {
      id: 4,
      title: "Top Gun: Maverick",
      genre: "Action",
      duration: "2h 10m",
      rating: 8.4,
      poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop",
      description: "After thirty years, Maverick is still pushing the envelope.",
      showtimes: ["1:00 PM", "5:00 PM", "9:00 PM"],
      language: "English",
      director: "Joseph Kosinski"
    },
    {
      id: 5,
      title: "Jurassic World Dominion",
      genre: "Adventure",
      duration: "2h 27m",
      rating: 5.7,
      poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&h=450&fit=crop",
      description: "Dinosaurs now live and hunt alongside humans all over the world.",
      showtimes: ["10:30 AM", "2:30 PM", "6:30 PM"],
      language: "English",
      director: "Colin Trevorrow"
    },
    {
      id: 6,
      title: "Doctor Strange 2",
      genre: "Fantasy",
      duration: "2h 6m",
      rating: 6.9,
      poster: "https://images.unsplash.com/photo-1534008897995-27a23e859048?w=300&h=450&fit=crop",
      description: "Doctor Strange teams up with a mysterious teenage girl.",
      showtimes: ["11:30 AM", "3:30 PM", "7:30 PM"],
      language: "English",
      director: "Sam Raimi"
    },
    {
    id: 7,
    title: "Avengers: Endgame",
    genre: "Action",
    duration: "3h 2m",
    rating: 8.4,
    poster: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=300&h=450&fit=crop",
    description: "The Avengers assemble once more to reverse Thanos' actions.",
    showtimes: ["10:00 AM", "2:00 PM", "6:00 PM"],
    language: "English",
    director: "Anthony Russo"
  },
  {
    id: 8,
    title: "Inception",
    genre: "Sci-Fi",
    duration: "2h 28m",
    rating: 8.8,
    poster: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?w=300&h=450&fit=crop",
    description: "A thief who steals corporate secrets through dream-sharing technology.",
    showtimes: ["11:00 AM", "4:00 PM", "9:00 PM"],
    language: "English",
    director: "Christopher Nolan"
  },
  {
    id: 9,
    title: "Interstellar",
    genre: "Sci-Fi",
    duration: "2h 49m",
    rating: 8.6,
    poster: "https://images.unsplash.com/photo-1517602302552-471fe67acf66?w=300&h=450&fit=crop",
    description: "A team travels through a wormhole to ensure humanity's survival.",
    showtimes: ["12:00 PM", "5:00 PM", "8:30 PM"],
    language: "English",
    director: "Christopher Nolan"
  },
  {
    id: 10,
    title: "Spider-Man: No Way Home",
    genre: "Action",
    duration: "2h 28m",
    rating: 8.2,
    poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Spider-Man seeks help when his identity is revealed.",
    showtimes: ["10:30 AM", "3:00 PM", "7:00 PM"],
    language: "English",
    director: "Jon Watts"
  },
  {
    id: 11,
    title: "The Batman",
    genre: "Crime",
    duration: "2h 56m",
    rating: 7.9,
    poster: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?w=300&h=450&fit=crop",
    description: "Batman uncovers corruption in Gotham City.",
    showtimes: ["1:00 PM", "5:30 PM", "9:30 PM"],
    language: "English",
    director: "Matt Reeves"
  },
  {
    id: 12,
    title: "Joker",
    genre: "Drama",
    duration: "2h 2m",
    rating: 8.4,
    poster: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=300&h=450&fit=crop",
    description: "A failed comedian descends into madness.",
    showtimes: ["12:30 PM", "6:00 PM", "10:00 PM"],
    language: "English",
    director: "Todd Phillips"
  },
  {
    id: 13,
    title: "KGF Chapter 2",
    genre: "Action",
    duration: "2h 48m",
    rating: 8.3,
    poster: "https://images.unsplash.com/photo-1585951237313-1979e4df7385?w=300&h=450&fit=crop",
    description: "Rocky takes control of the KGF mines.",
    showtimes: ["11:00 AM", "3:30 PM", "8:00 PM"],
    language: "Hindi",
    director: "Prashanth Neel"
  },
  {
    id: 14,
    title: "Pushpa: The Rise",
    genre: "Action",
    duration: "2h 59m",
    rating: 7.6,
    poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=450&fit=crop",
    description: "A laborer rises through the ranks of red sandalwood smuggling.",
    showtimes: ["10:00 AM", "4:00 PM", "9:00 PM"],
    language: "Telugu",
    director: "Sukumar"
  },
  {
    id: 15,
    title: "RRR",
    genre: "Historical",
    duration: "3h 7m",
    rating: 8.0,
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=450&fit=crop",
    description: "A fictional story about two legendary revolutionaries.",
    showtimes: ["9:30 AM", "2:30 PM", "7:30 PM"],
    language: "Telugu",
    director: "S. S. Rajamouli"
  },
  {
    id: 16,
    title: "Dune",
    genre: "Sci-Fi",
    duration: "2h 35m",
    rating: 8.1,
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop",
    description: "A noble family becomes embroiled in a war for control of Arrakis.",
    showtimes: ["1:30 PM", "6:30 PM", "10:00 PM"],
    language: "English",
    director: "Denis Villeneuve"
  }
  ];

  const handleBookNow = (movie) => {
    onMovieSelect(movie);
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="container">
      <h1 style={styles.header}>🎬 Now Showing</h1>
      <div className="movie-grid">
        {sampleMovies.map(movie => (
          <div key={movie.id} className="movie-card">
            <img src={movie.poster} alt={movie.title} className="movie-poster" />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <div style={styles.details}>
                <span style={styles.genre}>{movie.genre}</span>
                <span style={styles.duration}>{movie.duration}</span>
                <span style={styles.rating}>⭐ {movie.rating}/10</span>
              </div>
              <p style={styles.description}>{movie.description.substring(0, 80)}...</p>
              <div style={styles.showtimes}>
                <strong>Today:</strong>
                <div style={styles.timeSlots}>
                  {movie.showtimes.slice(0, 2).map((time, index) => (
                    <span key={index} style={styles.time}>{time}</span>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => handleBookNow(movie)} 
                className="btn btn-primary" 
                style={styles.bookBtn}
              >
                Book Tickets
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  header: {
    textAlign: 'center',
    margin: '4rem 0 3rem',
    position: 'relative',
  },
  headerDecoration: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '200px',
    height: '200px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '50%',
    filter: 'blur(80px)',
    opacity: 0.3,
    zIndex: -1,
  },
  movieCard: {
    position: 'relative',
    overflow: 'hidden',
    border: 'none',
    background: 'linear-gradient(145deg, #1e293b, #1a2535)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
  },
  movieBadge: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    padding: '0.5rem 1rem',
    background: 'rgba(34, 197, 94, 0.2)',
    color: '#4ade80',
    borderRadius: '50px',
    fontSize: '0.875rem',
    fontWeight: '600',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(34, 197, 94, 0.3)',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  },
  moviePoster: {
    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  movieTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    marginBottom: '0.75rem',
    color: '#f8fafc',
    lineHeight: 1.3,
  },
  movieMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  genre: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    color: '#60a5fa',
    padding: '0.4rem 1rem',
    borderRadius: '50px',
    fontSize: '0.875rem',
    fontWeight: '500',
    border: '1px solid rgba(59, 130, 246, 0.3)',
  },
  duration: {
    color: '#94a3b8',
    fontSize: '0.875rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  },
  description: {
    fontSize: '0.95rem',
    color: '#cbd5e1',
    margin: '1rem 0',
    lineHeight: 1.6,
    minHeight: '60px',
    opacity: 0.9,
  },
  director: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem',
    padding: '0.75rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    borderLeft: '3px solid #a855f7',
  },
  directorLabel: {
    color: '#94a3b8',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  directorName: {
    color: '#f8fafc',
    fontSize: '0.875rem',
    fontWeight: '600',
  },
  showtimes: {
    margin: '1.5rem 0',
  },
  showtimeLabel: {
    color: '#94a3b8',
    fontSize: '0.875rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  timeSlots: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  time: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    color: '#e2e8f0',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '500',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  },
  timeHover: {
    backgroundColor: 'rgba(168, 85, 247, 0.2)',
    borderColor: '#a855f7',
    color: '#f8fafc',
  },
  bookBtn: {
    width: '100%',
    marginTop: '1rem',
    padding: '1rem',
    fontSize: '1rem',
    fontWeight: '600',
    letterSpacing: '0.5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    borderRadius: '12px',
  },
};

export default MovieList;