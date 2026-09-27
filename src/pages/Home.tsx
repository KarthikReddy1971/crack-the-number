type Difficulty = {
  id: string;
  name: string;
  range: string;
  maxNumber: number;
  description: string;
};

const difficulties: Difficulty[] = [
  {
    id: "easy",
    name: "Easy",
    range: "1 – 50",
    maxNumber: 50,
    description: "Perfect for beginners",
  },
  {
    id: "medium",
    name: "Medium",
    range: "1 – 100",
    maxNumber: 100,
    description: "A balanced challenge",
  },
  {
    id: "difficult",
    name: "Difficult",
    range: "1 – 300",
    maxNumber: 300,
    description: "Things get serious",
  },
  {
    id: "hard",
    name: "Hard",
    range: "1 – 500",
    maxNumber: 500,
    description: "For experienced players",
  },
  {
    id: "insane",
    name: "Insane",
    range: "1 – 1000",
    maxNumber: 1000,
    description: "Can you crack it?",
  },
];

type HomeProps = {
  onStart: (difficulty: Difficulty) => void;
};

function Home({ onStart }: HomeProps) {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="text-center">
          <div className="mb-4 text-5xl">🎯</div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Crack The Number
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Guess smarter. Use fewer attempts. Protect your score.
          </p>
        </div>

        {/* Difficulty */}
        <div className="mt-12">
          <h2 className="text-center text-xl font-semibold">
            Choose Your Difficulty
          </h2>

          <p className="mt-2 text-center text-sm text-slate-500">
            The higher the difficulty, the larger the search space.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty.id}
                onClick={() => onStart(difficulty)}
                className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left transition duration-200 hover:-translate-y-1 hover:border-slate-600 hover:bg-slate-800"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold capitalize">
                    {difficulty.name}
                  </h3>

                  <span className="text-slate-500 transition group-hover:text-white">
                    →
                  </span>
                </div>

                <p className="mt-5 text-2xl font-bold">
                  {difficulty.range}
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  {difficulty.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Game information */}
        <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-center">
            <div className="text-2xl">💯</div>
            <p className="mt-2 font-semibold">1000 Starting Points</p>
            <p className="mt-1 text-xs text-slate-500">
              Protect your score
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-center">
            <div className="text-2xl">🎯</div>
            <p className="mt-2 font-semibold">Limited Attempts</p>
            <p className="mt-1 text-xs text-slate-500">
              Every guess matters
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-center">
            <div className="text-2xl">🧠</div>
            <p className="mt-2 font-semibold">Smart Hints</p>
            <p className="mt-1 text-xs text-slate-500">
              Spend points wisely
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;