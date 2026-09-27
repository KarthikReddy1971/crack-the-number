import { useState } from "react";
import Home from "./pages/Home";
import Game from "./pages/Game";

type Difficulty = {
  id: string;
  name: string;
  range: string;
  maxNumber: number;
  description: string;
};

function App() {
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty | null>(null);

  if (selectedDifficulty) {
    return (
      <Game
        difficulty={selectedDifficulty}
        onBack={() => setSelectedDifficulty(null)}
      />
    );
  }

  return (
    <Home
      onStart={(difficulty) =>
        setSelectedDifficulty(difficulty)
      }
    />
  );
}

export default App;