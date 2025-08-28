"use client";
import { createContext, useContext, useState } from "react";

type Movie = {
  id: number;
  name: string;
  rating: string;
  img: string;
} | null;

type MovieContextType = {
  selectedMovie: Movie;
  setSelectedMovie: (movie: Movie) => void;
};

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const useMovie = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovie must be used within MovieProvider");
  }
  return context;
};

export default function Navbarmovie1({ children }: { children: React.ReactNode }) {
  const [selectedMovie, setSelectedMovie] = useState<Movie>(null);

  return (
    <MovieContext.Provider value={{ selectedMovie, setSelectedMovie }}>
      <div className="bg-gray-900 text-white p-4 flex justify-between">
        <h1>🎬 Movie App</h1>
        {selectedMovie ? (
          <p>
            Selected: <span className="font-bold">{selectedMovie.name}</span>
          </p>
        ) : (
          <p>No movie selected</p>
        )}
      </div>
      {children}
    </MovieContext.Provider>
  );
}
