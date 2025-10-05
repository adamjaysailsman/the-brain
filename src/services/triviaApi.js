const API_URL = "https://opentdb.com/api.php";
let sessionToken = null;

// Available categories from Open Trivia DB
const CATEGORIES = [
  { id: 9, name: "General Knowledge" },
  { id: 17, name: "Science & Nature" },
  { id: 21, name: "Sports" },
  { id: 22, name: "Geography" },
  { id: 23, name: "History" },
  { id: 27, name: "Animals" },
  { id: 18, name: "Computers" },
  { id: 11, name: "Film" },
  { id: 12, name: "Music" },
  { id: 15, name: "Video Games" },
  { id: 10, name: "Books" },
  { id: 25, name: "Art" },
  { id: 26, name: "Celebrities" },
  { id: 14, name: "Television" },
];

const mockQuestions = [
  {
    question: "What is the largest planet in our solar system?",
    correct_answer: "Jupiter",
    incorrect_answers: ["Saturn", "Neptune", "Earth"],
    category: "Science & Nature",
    difficulty: "easy",
  },
  {
    question: "Who painted the Mona Lisa?",
    correct_answer: "Leonardo da Vinci",
    incorrect_answers: ["Michelangelo", "Raphael", "Donatello"],
    category: "Art",
    difficulty: "easy",
  },
  {
    question: "What is the speed of light?",
    correct_answer: "299,792,458 m/s",
    incorrect_answers: ["150,000,000 m/s", "500,000,000 m/s", "1,000,000 m/s"],
    category: "Science & Nature",
    difficulty: "hard",
  },
  {
    question: "Which element has the chemical symbol 'Au'?",
    correct_answer: "Gold",
    incorrect_answers: ["Silver", "Aluminum", "Copper"],
    category: "Science & Nature",
    difficulty: "medium",
  },
  {
    question: "What year did World War II end?",
    correct_answer: "1945",
    incorrect_answers: ["1944", "1946", "1943"],
    category: "History",
    difficulty: "medium",
  },
  {
    question: "What is the capital of Japan?",
    correct_answer: "Tokyo",
    incorrect_answers: ["Osaka", "Kyoto", "Nagoya"],
    category: "Geography",
    difficulty: "easy",
  },
  {
    question: "How many continents are there?",
    correct_answer: "7",
    incorrect_answers: ["5", "6", "8"],
    category: "Geography",
    difficulty: "easy",
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    correct_answer: "Harper Lee",
    incorrect_answers: [
      "Mark Twain",
      "Ernest Hemingway",
      "F. Scott Fitzgerald",
    ],
    category: "Literature",
    difficulty: "medium",
  },
  {
    question: "What is the smallest country in the world?",
    correct_answer: "Vatican City",
    incorrect_answers: ["Monaco", "San Marino", "Liechtenstein"],
    category: "Geography",
    difficulty: "medium",
  },
  {
    question: "What is the hardest natural substance on Earth?",
    correct_answer: "Diamond",
    incorrect_answers: ["Gold", "Iron", "Platinum"],
    category: "Science & Nature",
    difficulty: "easy",
  },
  {
    question: "In which year did the Titanic sink?",
    correct_answer: "1912",
    incorrect_answers: ["1905", "1915", "1920"],
    category: "History",
    difficulty: "medium",
  },
  {
    question: "What is the largest ocean on Earth?",
    correct_answer: "Pacific Ocean",
    incorrect_answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
    category: "Geography",
    difficulty: "easy",
  },
  {
    question: "Who is known as the father of modern physics?",
    correct_answer: "Albert Einstein",
    incorrect_answers: ["Isaac Newton", "Galileo Galilei", "Nikola Tesla"],
    category: "Science & Nature",
    difficulty: "medium",
  },
  {
    question: "Which planet is closest to the sun?",
    correct_answer: "Mercury",
    incorrect_answers: ["Venus", "Earth", "Mars"],
    category: "Science & Nature",
    difficulty: "easy",
  },
  {
    question: "What is the chemical formula for water?",
    correct_answer: "H2O",
    incorrect_answers: ["CO2", "O2", "H2SO4"],
    category: "Science & Nature",
    difficulty: "easy",
  },
  {
    question: "In which country would you find the Great Barrier Reef?",
    correct_answer: "Australia",
    incorrect_answers: ["Brazil", "Indonesia", "Philippines"],
    category: "Geography",
    difficulty: "easy",
  },
  {
    question: "Who wrote '1984'?",
    correct_answer: "George Orwell",
    incorrect_answers: ["Aldous Huxley", "Ray Bradbury", "Ernest Hemingway"],
    category: "Books",
    difficulty: "medium",
  },
  {
    question: "What is the tallest mountain in the world?",
    correct_answer: "Mount Everest",
    incorrect_answers: ["K2", "Kangchenjunga", "Lhotse"],
    category: "Geography",
    difficulty: "easy",
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    correct_answer: "Carbon Dioxide",
    incorrect_answers: ["Oxygen", "Nitrogen", "Hydrogen"],
    category: "Science & Nature",
    difficulty: "easy",
  },
  {
    question: "What is the capital of France?",
    correct_answer: "Paris",
    incorrect_answers: ["London", "Berlin", "Madrid"],
    category: "Geography",
    difficulty: "easy",
  },
];

const getSessionToken = async () => {
  if (sessionToken) return sessionToken;

  const response = await fetch(
    "https://opentdb.com/api_token.php?command=request"
  );
  const data = await response.json();
  sessionToken = data.token;
  return sessionToken;
};

// Seeded random number generator
class SeededRandom {
  constructor(seed) {
    this.seed = seed;
  }

  next() {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
}

// NEW: Fetch a large pool of questions from multiple categories
export const fetchDailyTriviaQuestions = async (amount = 10, seed) => {
  try {
    const token = await getSessionToken();
    const rng = new SeededRandom(seed);

    // NEW: Fetch MORE questions per category to create a large pool
    const questionsPerCategory = 20; // Fetch 20 from each category
    const numberOfCategories = 5; // Use 5 different categories

    // Shuffle categories using seeded random
    const shuffledCategories = [...CATEGORIES].sort(() => rng.next() - 0.5);

    // Select first N categories
    const selectedCategories = shuffledCategories.slice(0, numberOfCategories);

    console.log(
      "Fetching from categories:",
      selectedCategories.map((c) => c.name)
    );

    // Fetch questions from each category
    const allQuestions = [];

    for (const category of selectedCategories) {
      try {
        const response = await fetch(
          `${API_URL}?amount=${questionsPerCategory}&category=${category.id}&type=multiple&token=${token}`
        );

        if (response.ok) {
          const data = await response.json();
          if (data.response_code === 0) {
            console.log(
              `Fetched ${data.results.length} questions from ${category.name}`
            );
            allQuestions.push(...data.results);
          }
        }
      } catch (error) {
        console.warn(`Failed to fetch from category ${category.name}:`, error);
      }
    }

    console.log(`Total questions in pool: ${allQuestions.length}`);

    // If we got a good pool of questions
    if (allQuestions.length >= amount * 2) {
      // NEW: Shuffle the entire pool using seeded random
      const shuffledPool = allQuestions.slice();
      for (let i = shuffledPool.length - 1; i > 0; i--) {
        const j = Math.floor(rng.next() * (i + 1));
        [shuffledPool[i], shuffledPool[j]] = [shuffledPool[j], shuffledPool[i]];
      }

      // Select the first 'amount' questions from shuffled pool
      const selectedQuestions = shuffledPool.slice(0, amount);

      console.log(
        "Selected questions categories:",
        selectedQuestions.map((q) => q.category)
      );

      return formatQuestions(selectedQuestions, seed);
    }

    // Fallback to mock data if API failed
    console.warn("Using mock data due to insufficient questions from API");
    return formatQuestions(mockQuestions, seed);
  } catch (error) {
    console.warn("API fetch failed, using mock data:", error);
    return formatQuestions(mockQuestions, seed);
  }
};

// Format questions with deterministic shuffling using seed
const formatQuestions = (questions, seed) => {
  const rng = new SeededRandom(seed);

  return questions.map((q, index) => {
    const allAnswers = [...q.incorrect_answers, q.correct_answer];

    // Deterministic shuffle using seeded random
    const shuffledAnswers = allAnswers.slice();
    for (let i = shuffledAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(rng.next() * (i + 1));
      [shuffledAnswers[i], shuffledAnswers[j]] = [
        shuffledAnswers[j],
        shuffledAnswers[i],
      ];
    }

    return {
      id: index + 1,
      question: decodeHTML(q.question),
      options: shuffledAnswers.map((a) => decodeHTML(a)),
      correctAnswer: decodeHTML(q.correct_answer),
      difficulty: q.difficulty || "medium",
      category: q.category || "General Knowledge",
    };
  });
};

const decodeHTML = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

// Keep the original function for practice mode
export const fetchTriviaQuestions = async (amount = 10) => {
  return fetchDailyTriviaQuestions(amount, Date.now());
};
