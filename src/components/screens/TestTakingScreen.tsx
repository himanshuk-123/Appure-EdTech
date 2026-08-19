import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Clock, AlertCircle, CheckCircle2, ChevronRight, ChevronLeft, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Which method is used to attach an event handler to a DOM element in modern JavaScript?",
    options: [
      "element.attachEvent()",
      "element.addEventListener()",
      "element.bindEvent()",
      "element.listen()"
    ],
    correctIndex: 1,
    explanation: "element.addEventListener() is the standard W3C DOM method for adding event listeners."
  },
  {
    id: 2,
    text: "What is the difference between `let` and `const` variables in ES6?",
    options: [
      "`let` is function scoped while `const` is globally scoped",
      "`const` cannot be reassigned after declaration, while `let` can be reassigned",
      "`let` variables are hoisted to top, `const` are not",
      "There is no difference in ES6"
    ],
    correctIndex: 1,
    explanation: "`const` declarations create block-scoped constants that cannot be reassigned."
  },
  {
    id: 3,
    text: "Which array method returns a new array with elements that pass a given conditional test?",
    options: [
      "Array.prototype.map()",
      "Array.prototype.find()",
      "Array.prototype.filter()",
      "Array.prototype.reduce()"
    ],
    correctIndex: 2,
    explanation: "filter() creates a shallow copy of a portion of a given array, filtered down to just the elements from the given array that pass the test implemented by the provided function."
  },
  {
    id: 4,
    text: "What does the `document.querySelector('#nav > .item')` call return if no matching element exists?",
    options: [
      "undefined",
      "null",
      "Empty NodeList []",
      "Throws a DOMException"
    ],
    correctIndex: 1,
    explanation: "querySelector returns null if no matches are found."
  },
  {
    id: 5,
    text: "How do you handle asynchronous operations and rejected promises cleanly in modern JavaScript?",
    options: [
      "Using `async / await` with `try...catch` blocks",
      "Using synchronous `while(true)` spin-locks",
      "Calling `window.waitForPromise()`",
      "Using `eval()`"
    ],
    correctIndex: 0,
    explanation: "`async/await` paired with `try...catch` is the cleanest and most readable way to handle async code and error states."
  }
];

export const TestTakingScreen: React.FC = () => {
  const { brand, goBack, navigate, setLastTestResult, showToast } = useApp();
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [timeLeft, setTimeLeft] = useState(1740); // 29 mins

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optIdx: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIdx]: optIdx
    });
  };

  const handleSubmitTest = () => {
    let correctCount = 0;
    SAMPLE_QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / SAMPLE_QUESTIONS.length) * 20);
    const calculatedPercentage = Math.round((correctCount / SAMPLE_QUESTIONS.length) * 100);

    setLastTestResult({
      testTitle: 'JavaScript Fundamentals Quiz',
      score: calculatedScore,
      maxScore: 20,
      percentage: calculatedPercentage,
      correct: correctCount,
      incorrect: SAMPLE_QUESTIONS.length - correctCount,
      unanswered: 0,
      timeTaken: `${Math.floor((1800 - timeLeft) / 60)}m ${(1800 - timeLeft) % 60}s`
    });

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });

    navigate('test-result');
  };

  const q = SAMPLE_QUESTIONS[currentIdx];

  return (
    <div className="flex flex-col min-h-screen pb-24 bg-[#f8fafc] dark:bg-[#0b1c30]">
      {/* Test App Bar */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-[#e2e8f0] dark:border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={goBack}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-sm font-bold text-slate-900 dark:text-white">
              JavaScript Quiz
            </h1>
            <p className="text-[11px] text-slate-400">
              Question {currentIdx + 1} of {SAMPLE_QUESTIONS.length}
            </p>
          </div>
        </div>

        {/* Live Timer */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 font-mono text-xs font-bold">
          <Clock className="w-3.5 h-3.5" />
          <span>{formatTimer(timeLeft)}</span>
        </div>
      </header>

      <main className="px-4 py-4 flex flex-col gap-4 max-w-md md:max-w-xl mx-auto w-full">
        {/* Progress Dots Bar */}
        <div className="flex gap-2">
          {SAMPLE_QUESTIONS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIdx(idx)}
              className={`h-2 flex-1 rounded-full transition-all ${
                selectedAnswers[idx] !== undefined
                  ? 'bg-emerald-500'
                  : idx === currentIdx
                  ? 'bg-blue-600'
                  : 'bg-slate-200 dark:bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* Question Card */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0px_4px_16px_rgba(15,23,42,0.05)] border border-[#e2e8f0] dark:border-slate-800 p-5 flex flex-col gap-4">
          <div className="flex justify-between items-center text-xs text-slate-400 font-semibold uppercase tracking-wider">
            <span>QUESTION {currentIdx + 1}</span>
            <span>4 MARKS</span>
          </div>

          <h2 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
            {q.text}
          </h2>

          {/* Options */}
          <div className="space-y-2.5 pt-2">
            {q.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentIdx] === optIdx;
              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full text-left p-3.5 rounded-xl border flex items-center gap-3 transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-semibold shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 border ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-slate-300 dark:border-slate-700 text-slate-500'
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </div>
                  <span className="text-xs flex-1">{opt}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Navigation & Submit Controls */}
        <div className="flex gap-3 pt-2">
          {currentIdx > 0 && (
            <button
              onClick={() => setCurrentIdx(currentIdx - 1)}
              className="flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 flex items-center justify-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
          )}

          {currentIdx < SAMPLE_QUESTIONS.length - 1 ? (
            <button
              onClick={() => setCurrentIdx(currentIdx + 1)}
              className="flex-1 py-3 px-4 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-1 shadow-sm hover:opacity-90 transition-opacity"
              style={{ backgroundColor: brand.primaryColor }}
            >
              Next Question
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmitTest}
              className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm hover:bg-emerald-700 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              Submit Assessment
            </button>
          )}
        </div>
      </main>
    </div>
  );
};
