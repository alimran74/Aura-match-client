import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quizQuestions = [
  {
    question: "What type of personality attracts you?",
    options: ["Adventurous", "Calm & Reserved", "Outgoing", "Thoughtful"],
  },
  {
    question: "Preferred lifestyle?",
    options: ["Active & Sporty", "Quiet & Cozy", "Social & Party", "Creative & Artistic"],
  },
  {
    question: "Ideal first date?",
    options: ["Hiking or Adventure", "Dinner at Home", "Coffee & Walk", "Museum / Art Show"],
  },
  {
    question: "Favorite conversation topic?",
    options: ["Travel", "Books & Knowledge", "Music & Art", "Sports & Fitness"],
  },
  {
    question: "Which quality matters most?",
    options: ["Humor", "Kindness", "Ambition", "Creativity"],
  },
];

// Mini Game: Spin the Wheel
const miniGames = [
  {
    name: "Love Spin",
    description: "Spin a virtual wheel to see a fun love quote or tip!",
  },
  {
    name: "Quick Match Quiz",
    description: "Answer a fun random question to see which type you match!",
  },
];

const MatchingQuiz = () => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showMiniGame, setShowMiniGame] = useState(null);

  const handleOptionClick = (option) => {
    setAnswers([...answers, option]);
    if (current < quizQuestions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setCurrent(0);
    setAnswers([]);
    setShowResult(false);
    setShowMiniGame(null);
  };

  const getResult = () => {
    const count = {};
    answers.forEach((ans) => (count[ans] = (count[ans] || 0) + 1));
    const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);
    return sorted[0][0];
  };

  const spinWheel = () => {
    const quotes = [
      "💖 Your perfect match is closer than you think!",
      "🌟 Love is in the air today!",
      "💌 A surprise connection is coming soon!",
      "✨ Smile and someone will notice you!"
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  return (
    <div className=" mx-auto p-6 bg-[#f6f4d2] shadow-2xl ">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 ">
         Find Your Perfect Match! 
      </h2>

      {/* Progress Bar */}
      {!showResult && (
        <div className="h-2 w-full bg-[#cbdfbd] rounded-full mb-6 overflow-hidden">
          <motion.div
            className="h-2 bg-[#f19c79] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((current + 1) / quizQuestions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <p className="text-lg md:text-xl font-semibold text-gray-700 text-center">
              {quizQuestions[current].question}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quizQuestions[current].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  className="bg-[#cbdfbd] hover:bg-[#d4e09b] text-gray-800 py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition transform font-medium"
                >
                  {option}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 text-center">
              Question {current + 1} of {quizQuestions.length}
            </p>
          </motion.div>
        ) : showMiniGame ? (
          <motion.div
            key="miniGame"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-4"
          >
            <p className="text-2xl font-bold text-[#5d149e]">{showMiniGame.name}</p>
            <p className="text-gray-700 mb-4">{showMiniGame.description}</p>
            {showMiniGame.name === "Love Spin" && (
              <p className="text-xl font-semibold text-[#f19c79] animate-pulse">{spinWheel()}</p>
            )}
            <button
              onClick={handleReset}
              className="mt-4 bg-[#f19c79] hover:bg-[#e6855f] text-white py-2 px-6 rounded-xl transition font-medium"
            >
              Back to Quiz
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-6"
          >
            <p className="text-xl md:text-2xl font-semibold text-gray-700">
              Your Perfect Match Type is:
            </p>
            <p className="text-3xl md:text-4xl font-bold text-[#f19c79] animate-pulse">{getResult()}</p>
            <div className="flex justify-center gap-4 flex-wrap mt-4">
              {miniGames.map((game) => (
                <button
                  key={game.name}
                  onClick={() => setShowMiniGame(game)}
                  className="bg-[#cbdfbd] hover:bg-[#d4e09b] py-2 px-4 rounded-xl shadow-lg hover:scale-105 transition transform font-medium"
                >
                  {game.name}
                </button>
              ))}
            </div>
            <button
              onClick={handleReset}
              className="mt-6 bg-[#f19c79] hover:bg-[#e6855f] text-white py-2 px-6 rounded-xl transition font-medium"
            >
              Retake Quiz
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MatchingQuiz;
