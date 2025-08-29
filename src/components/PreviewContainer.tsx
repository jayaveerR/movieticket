"use client";

import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import Mainnav from "./Mainnav";

// ✅ Movie data
const movies = [
  { id: 1, name: "Mowgli", rating: "4.5/5", img: "https://i.pinimg.com/1200x/1a/46/e5/1a46e50e758874b6f30fa03b7fdde8b0.jpg" },
  { id: 2, name: "Narasimha", rating: "4.2/5", img: "https://i.pinimg.com/736x/21/0f/24/210f24664e5c0b2173f6f3a4bbf47733.jpg" },
  { id: 3, name: "Paradise", rating: "4.7/5", img: "https://i.pinimg.com/1200x/f4/5c/1b/f45c1b5b4e46cc8e973424faa990289f.jpg" },
  { id: 4, name: "Ramayana", rating: "4.0/5", img: "https://i.pinimg.com/1200x/09/15/79/091579525fc32329483371c986c0de34.jpg" },
  { id: 5, name: "Coolie", rating: "4.8/5", img: "https://i.pinimg.com/736x/34/db/20/34db2068fb86afc3a5ccfdebb53a1c32.jpg" },
  { id: 6, name: "Merai", rating: "4.6/5", img: "https://i.pinimg.com/736x/20/08/99/2008992ac772e0515b7009be92204624.jpg" },
  { id: 7, name: "Movie Seven", rating: "4.4/5", img: "https://i.pinimg.com/736x/a7/a1/90/a7a190f2222f646d0d7bc3615f68f338.jpg" },
  { id: 8, name: "Movie Eight", rating: "4.3/5", img: "https://i.pinimg.com/736x/0c/52/9e/0c529eba8f0f25bccc6c5e6881335d62.jpg" },
  { id: 9, name: "Movie Nine", rating: "4.1/5", img: "https://i.pinimg.com/736x/e5/b0/d4/e5b0d4c02674fe0b807168ba80673101.jpg" },
  { id: 10, name: "Movie Ten", rating: "4.9/5", img: "https://i.pinimg.com/1200x/ca/c5/9e/cac59e4da04c33082848e1a2cb30c043.jpg" },
];

export default function MovieGrid() {
  const router = useRouter();

  // ✅ Navigate based on movie ID
  const handleMovieClick = (movieId: number) => {
    switch (movieId) {
      case 1:
        router.push("/previewcontainer/mowgli");
        break;
      case 2:
        router.push("/previewcontainer/narasimha");
        break;
      case 3:
        router.push("/previewcontainer/paradise");
        break;
      case 4:
        router.push("/previewcontainer/movies/ramayana");
        break;
      case 5:
        router.push("/previewcontainer/movies/coolie");
        break;
      case 6:
        router.push("/previewcontainer/movies/merai");
        break;
      default:
        router.push("/previewcontainer/movies");
        break;
    }
  };

  return (
    <>
      <Mainnav />
      {/* 👇 Push content below navbar */}
      <div className="w-full bg-white flex justify-center items-start pt-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex flex-col items-center"
              onClick={() => handleMovieClick(movie.id)}
            >
              {/* 🎬 Poster Card */}
              <div className="relative w-[180px] h-[270px] rounded-xl overflow-hidden shadow-lg cursor-pointer group">
                <img
                  src={movie.img}
                  alt={movie.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* ⬇️ Info below poster */}
              <div className="mt-2 text-center">
                <h3 className="text-gray-800 font-semibold text-base">{movie.name}</h3>
                <div className="flex items-center justify-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-yellow-500" />
                  <span className="text-sm text-gray-700">{movie.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
