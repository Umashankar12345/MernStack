// import axios from "axios";
// import { useEffect, useState } from "react";
// import { BackgroundGradient } from "./ui/background-gradient";

// function FetchMovie() {
//   const [movie, setMovie] = useState([]); // must be array

//   useEffect(() => {
//     axios
//       .get("https://api.tvmaze.com/search/shows?q=batman")
//       .then((res) => {
//         console.log(res.data); // array
//         setMovie(res.data);    // ✅ correct
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <div>
//       <h1 className="font-bold text-5xl text-center text-purple-300/70">
        
//       </h1>

//       <div className="m-20 flex flex-wrap gap-20">
//         {movie.map((item) => (
//           <BackgroundGradient
//             key={item.show.id}
//             className="border-2 p-4 rounded-xl w-72 bg-white dark:bg-zinc-900"
//           >
//             <img
//               src={item.show.image?.medium || ""}
//               alt={item.show.name}
//               className="object-contain w-full h-48"
//             />
//             <h2 className="mt-2 font-semibold">{item.show.name}</h2>
//             <p className="text-sm text-neutral-600">Premiered: {item.show.premiered}</p>
//           </BackgroundGradient>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Movie;
