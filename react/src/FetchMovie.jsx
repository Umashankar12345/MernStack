import axios from "axios";
import { useEffect, useState } from "react";

function FetchMovie() {
  const [movie, setMovie] = useState([]); // must be array

  useEffect(() => {
    axios
      .get("https://api.tvmaze.com/search/shows?q=batman")
      .then((res) => {
        console.log(res.data); // array
        setMovie(res.data);    // ✅ correct
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1 className="font-bold text-5xl text-center text-purple-300/70">
        NET_MIRROR
      </h1>

      <div className="m-20 flex flex-wrap gap-20">
        {movie.map((item) => (
          <div
            key={item.show.id}
            className="border-2 p-4 rounded-xl w-72"
          >
            <img
              src={item.show.image?.medium || ""}
              alt={item.show.name}
            />
            <h2>{item.show.name}</h2>
            <p>Premiered: {item.show.premiered}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FetchMovie;
