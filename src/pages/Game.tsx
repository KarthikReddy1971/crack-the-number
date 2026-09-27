import { useState } from "react";

type GameProps = {
  difficulty: {
    id: string;
    name: string;
    range: string;
    maxNumber: number;
  };
  onBack: () => void;
};

type GuessHistory = {
  guess: number;
  result: "low" | "high" | "correct";
  closeness: "far" | "close" | "very-close" | "correct";
};

function Game({ difficulty, onBack }: GameProps) {
  const maxNumber = difficulty.maxNumber;

  const [secretNumber, setSecretNumber] = useState(
    () => Math.floor(Math.random() * maxNumber) + 1
  );

  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(10);
  const [score, setScore] = useState(1000);
  const [history, setHistory] = useState<GuessHistory[]>([]);
  const [message, setMessage] = useState("Enter your first guess!");
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const [hint, setHint] = useState("");
  const [hintsUsed, setHintsUsed] = useState(0);

  const getCloseness = (guessNumber: number) => {
    const difference = Math.abs(
      guessNumber - secretNumber
    );

    const percentage =
      (difference / maxNumber) * 100;

    if (difference === 0) {
      return "correct";
    }

    if (percentage <= 5) {
      return "very-close";
    }

    if (percentage <= 15) {
      return "close";
    }

    return "far";
  };

  const getClosenessText = (
    closeness: GuessHistory["closeness"]
  ) => {
    switch (closeness) {
      case "very-close":
        return "🔥 Very Close";

      case "close":
        return "🟡 Close";

      case "far":
        return "🥶 Far";

      case "correct":
        return "🎯 Correct";

      default:
        return "";
    }
  };

  const getClosenessStyle = (
    closeness: GuessHistory["closeness"]
  ) => {
    switch (closeness) {
      case "very-close":
        return "border-red-500/30 bg-red-500/10 text-red-400";

      case "close":
        return "border-yellow-500/30 bg-yellow-500/10 text-yellow-400";

      case "far":
        return "border-blue-500/30 bg-blue-500/10 text-blue-400";

      case "correct":
        return "border-green-500/30 bg-green-500/10 text-green-400";

      default:
        return "";
    }
  };

  const handleGuess = () => {
    if (gameOver) return;

    if (!guess.trim()) {
      setMessage("⚠️ Please enter a number.");
      return;
    }

    const number = Number(guess);

    if (!Number.isInteger(number)) {
      setMessage("⚠️ Please enter a whole number.");
      return;
    }

    if (number < 1 || number > maxNumber) {
      setMessage(
        `⚠️ Enter a number between 1 and ${maxNumber}.`
      );
      return;
    }

    const closeness = getCloseness(number);

    if (number === secretNumber) {
      setHistory((previous) => [
        ...previous,
        {
          guess: number,
          result: "correct",
          closeness: "correct",
        },
      ]);

      setMessage("🎉 You cracked the number!");

      setWon(true);
      setGameOver(true);
      setGuess("");

      return;
    }

    const result =
      number < secretNumber ? "low" : "high";

    const newAttempts = attempts - 1;

    setAttempts(newAttempts);

    setScore((previous) =>
      Math.max(0, previous - 50)
    );

    setHistory((previous) => [
      ...previous,
      {
        guess: number,
        result,
        closeness,
      },
    ]);

    if (result === "low") {
      setMessage(
        `⬆️ Too Low! ${getClosenessText(closeness)}`
      );
    } else {
      setMessage(
        `⬇️ Too High! ${getClosenessText(closeness)}`
      );
    }

    setGuess("");

    if (newAttempts === 0) {
      setGameOver(true);
      setWon(false);

      setMessage(
        `The secret number was ${secretNumber}.`
      );
    }
  };

  const useHint = () => {
    if (gameOver) return;

    if (score < 100) {
      setMessage(
        "⚠️ You don't have enough points for a hint."
      );
      return;
    }

    const hintNumber = hintsUsed + 1;

    let newHint = "";

    if (hintNumber === 1) {
      newHint =
        secretNumber % 2 === 0
          ? "The number is EVEN."
          : "The number is ODD.";
    } else if (hintNumber === 2) {
      if (secretNumber % 5 === 0) {
        newHint =
          "The number is a multiple of 5.";
      } else if (secretNumber % 3 === 0) {
        newHint =
          "The number is divisible by 3.";
      } else {
        newHint =
          "The number is NOT a multiple of 5.";
      }
    } else {
      const midpoint = Math.floor(maxNumber / 2);

      if (secretNumber > midpoint) {
        newHint =
          `The number is greater than ${midpoint}.`;
      } else {
        newHint =
          `The number is less than or equal to ${midpoint}.`;
      }
    }

    setScore((previous) =>
      Math.max(0, previous - 100)
    );

    setHint(newHint);

    setHintsUsed((previous) => previous + 1);
  };

  const restartGame = () => {
    setSecretNumber(
      Math.floor(Math.random() * maxNumber) + 1
    );

    setGuess("");
    setAttempts(10);
    setScore(1000);
    setHistory([]);
    setMessage("Enter your first guess!");
    setGameOver(false);
    setWon(false);
    setHint("");
    setHintsUsed(0);
  };

  const attemptsPercentage = attempts * 10;

  return (
    <div className="game-background px-4 py-8 text-white sm:px-6 sm:py-10">

      {/* Animated background */}
      <div className="glow-orb glow-orb-one" />
      <div className="glow-orb glow-orb-two" />
      <div className="glow-orb glow-orb-three" />

      <div className="particle particle-one" />
      <div className="particle particle-two" />
      <div className="particle particle-three" />
      <div className="particle particle-four" />
      <div className="particle particle-five" />

      <div className="relative z-10 mx-auto max-w-4xl">

        {/* TOP BAR */}
        <div className="flex items-center justify-between">

          <button
            onClick={onBack}
            className="text-sm text-slate-400 transition hover:text-white sm:text-base"
          >
            ← Change Difficulty
          </button>

          <span className="rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm backdrop-blur sm:text-base">
            {difficulty.name}
          </span>

        </div>

        {/* HEADER */}
        <div className="mt-10 text-center">

          <div className="target-animation">
            🎯
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Crack The Number
          </h1>

          <p className="mt-3 text-base text-slate-400 sm:text-lg">
            Guess the secret number between{" "}
            <span className="font-semibold text-white">
              1
            </span>{" "}
            and{" "}
            <span className="font-semibold text-white">
              {maxNumber}
            </span>
          </p>

        </div>

        {/* STATS */}
        <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-5">

          <div className="stat-card rounded-2xl border border-slate-800/80 bg-slate-900/80 p-4 text-center backdrop-blur sm:p-6">
            <p className="text-sm text-slate-500 sm:text-base">
              Score
            </p>

            <p className="mt-2 text-3xl font-bold sm:text-4xl">
              {score}
            </p>
          </div>

          <div className="stat-card rounded-2xl border border-slate-800/80 bg-slate-900/80 p-4 text-center backdrop-blur sm:p-6">
            <p className="text-sm text-slate-500 sm:text-base">
              Attempts
            </p>

            <p className="mt-2 text-3xl font-bold sm:text-4xl">
              {attempts}
            </p>
          </div>

          <div className="stat-card rounded-2xl border border-slate-800/80 bg-slate-900/80 p-4 text-center backdrop-blur sm:p-6">
            <p className="text-sm text-slate-500 sm:text-base">
              Guesses
            </p>

            <p className="mt-2 text-3xl font-bold sm:text-4xl">
              {history.length}
            </p>
          </div>

        </div>

        {/* ATTEMPT PROGRESS */}
        <div className="mt-6">

          <div className="mb-2 flex justify-between text-sm text-slate-500">
            <span>
              Attempts Remaining
            </span>

            <span>
              {attempts}/10
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-800/80">

            <div
              className="progress-animation h-full rounded-full bg-white"
              style={{
                width: `${attemptsPercentage}%`,
              }}
            />

          </div>

        </div>

        {/* MAIN GAME CARD */}
        <div className="game-card-animation mt-7 rounded-3xl border border-slate-800/80 bg-slate-900/90 p-5 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-10">

          {/* ================= WIN SCREEN ================= */}
          {gameOver && won ? (
            <div className="win-animation relative overflow-hidden py-10 text-center sm:py-14">

              {/* BALLOON BURST */}
              <div
                className="balloon-burst"
                aria-hidden="true"
              >
                <span className="balloon balloon-1">
                  🎈
                </span>

                <span className="balloon balloon-2">
                  🎈
                </span>

                <span className="balloon balloon-3">
                  🎈
                </span>

                <span className="balloon balloon-4">
                  🎈
                </span>

                <span className="balloon balloon-5">
                  🎈
                </span>

                <span className="balloon balloon-6">
                  🎈
                </span>

                <span className="balloon balloon-7">
                  🎈
                </span>

                <span className="balloon balloon-8">
                  🎈
                </span>

                <span className="balloon balloon-9">
                  🎈
                </span>

                <span className="balloon balloon-10">
                  🎈
                </span>

                <span className="balloon balloon-11">
                  🎈
                </span>

                <span className="balloon balloon-12">
                  🎈
                </span>
              </div>

              {/* Celebration */}
              <div className="relative z-10">

                <div className="text-7xl sm:text-8xl">
                  🏆
                </div>

                <h2 className="mt-6 text-4xl font-bold sm:text-5xl">
                  You Cracked It!
                </h2>

                <p className="mt-4 text-base text-slate-400 sm:text-lg">
                  🎉 You found the secret number!
                </p>

                <div className="mx-auto mt-9 grid max-w-md grid-cols-2 gap-4">

                  <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 backdrop-blur">
                    <p className="text-sm text-slate-500">
                      Final Score
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                      {score}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 backdrop-blur">
                    <p className="text-sm text-slate-500">
                      Guesses
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                      {history.length}
                    </p>
                  </div>

                </div>

                <button
                  onClick={restartGame}
                  className="glow-button mt-9 rounded-xl bg-white px-8 py-4 text-base font-bold text-slate-950 sm:text-lg"
                >
                  🔄 Play Again
                </button>

              </div>

            </div>

          ) : gameOver ? (

            /* ================= GAME OVER ================= */
            <div className="game-over-animation py-10 text-center sm:py-14">

              <div className="text-7xl sm:text-8xl">
                💀
              </div>

              <h2 className="mt-6 text-4xl font-bold sm:text-5xl">
                Game Over
              </h2>

              <p className="mt-4 text-base text-slate-400 sm:text-lg">
                You ran out of attempts.
              </p>

              <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/5 p-7">

                <p className="text-sm text-slate-500">
                  The Secret Number Was
                </p>

                <p className="mt-3 text-6xl font-bold text-red-400">
                  {secretNumber}
                </p>

              </div>

              <div className="mt-7">

                <p className="text-sm text-slate-500">
                  Final Score
                </p>

                <p className="mt-2 text-4xl font-bold">
                  {score}
                </p>

              </div>

              <button
                onClick={restartGame}
                className="glow-button mt-9 rounded-xl bg-white px-8 py-4 text-base font-bold text-slate-950 sm:text-lg"
              >
                🔄 Try Again
              </button>

            </div>

          ) : (

            /* ================= ACTIVE GAME ================= */
            <>
              {/* Message */}
              <div className="feedback-animation rounded-2xl border border-slate-700/50 bg-slate-800/60 p-6 text-center">

                <p className="text-lg font-semibold sm:text-xl">
                  {message}
                </p>

              </div>

              {/* Hint */}
              {hint && (
                <div className="feedback-animation mt-4 rounded-2xl border border-yellow-900/50 bg-yellow-950/30 p-5 text-center">

                  <span className="text-base text-yellow-300 sm:text-lg">
                    💡 Hint: {hint}
                  </span>

                </div>
              )}

              {/* INPUT */}
              <div className="mt-9">

                <label
                  htmlFor="guess"
                  className="mb-3 block text-base font-medium text-slate-400 sm:text-lg"
                >
                  Enter your guess
                </label>

                <div className="flex flex-col gap-4 sm:flex-row">

                  <input
                    id="guess"
                    type="number"
                    value={guess}
                    onChange={(event) =>
                      setGuess(event.target.value)
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleGuess();
                      }
                    }}
                    placeholder={`1 – ${maxNumber}`}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/90 px-5 py-4 text-lg outline-none sm:text-xl"
                  />

                  <button
                    onClick={handleGuess}
                    className="glow-button rounded-xl bg-white px-8 py-4 text-base font-bold text-slate-950 sm:text-lg"
                  >
                    Guess 🎯
                  </button>

                </div>

                {/* Hint Button */}
                <button
                  onClick={useHint}
                  className="glow-button mt-5 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-5 py-4 text-base font-semibold text-slate-300 hover:border-yellow-500 hover:text-yellow-400 sm:text-lg"
                >
                  💡 Get Hint

                  <span className="ml-2 text-sm text-slate-500">
                    -100 points
                  </span>
                </button>

                <p className="mt-3 text-center text-sm text-slate-600">
                  Hints used: {hintsUsed}
                </p>

              </div>
            </>
          )}

          {/* ================= GUESS HISTORY ================= */}
          {history.length > 0 && (
            <div className="mt-11">

              <div className="flex items-center justify-between">

                <h2 className="text-lg font-semibold sm:text-xl">
                  Previous Guesses
                </h2>

                <span className="text-sm text-slate-500">
                  {history.length} guesses
                </span>

              </div>

              <div className="mt-5 space-y-3">

                {[...history]
                  .reverse()
                  .map((item, index) => (
                    <div
                      key={`${item.guess}-${index}`}
                      className="feedback-animation flex flex-col gap-3 rounded-xl border border-slate-800/50 bg-slate-950/80 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                    >

                      <div className="flex items-center justify-between sm:block">

                        <span className="text-lg font-bold">
                          {item.guess}
                        </span>

                        <span className="ml-4 text-sm text-slate-400 sm:hidden">
                          {item.result === "low"
                            ? "⬆️ Too Low"
                            : item.result === "high"
                              ? "⬇️ Too High"
                              : "🎯 Correct"}
                        </span>

                      </div>

                      <span className="hidden text-sm sm:block">
                        {item.result === "low"
                          ? "⬆️ Too Low"
                          : item.result === "high"
                            ? "⬇️ Too High"
                            : "🎯 Correct"}
                      </span>

                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${getClosenessStyle(
                          item.closeness
                        )}`}
                      >
                        {getClosenessText(
                          item.closeness
                        )}
                      </span>

                    </div>
                  ))}

              </div>

            </div>
          )}

          {/* EMPTY HISTORY */}
          {history.length === 0 && !gameOver && (
            <div className="mt-10">

              <div className="rounded-xl border border-dashed border-slate-800 p-7 text-center text-sm text-slate-500 sm:text-base">
                Your guesses will appear here.
              </div>

            </div>
          )}

        </div>

        {/* FOOTER */}
        <p className="mt-7 text-center text-sm text-slate-600">
          💡 Use your guesses wisely. Hints cost 100 points.
        </p>

      </div>
    </div>
  );
}

export default Game;