const API_URL = "https://opentdb.com/api.php";
let sessionToken = null;

// Fallback questions if API is down or rate limited
const mockQuestions = [
  {
    question: "What is the largest planet in our solar system?",
    correct_answer: "Jupiter",
    incorrect_answers: ["Saturn", "Neptune", "Earth"],
  },
  {
    question: "Who painted the Mona Lisa?",
    correct_answer: "Leonardo da Vinci",
    incorrect_answers: ["Michelangelo", "Raphael", "Donatello"],
  },
  {
    question: "What is the speed of light?",
    correct_answer: "299,792,458 m/s",
    incorrect_answers: ["150,000,000 m/s", "500,000,000 m/s", "1,000,000 m/s"],
  },
  {
    question: "Which element has the chemical symbol 'Au'?",
    correct_answer: "Gold",
    incorrect_answers: ["Silver", "Aluminum", "Copper"],
  },
  {
    question: "What year did World War II end?",
    correct_answer: "1945",
    incorrect_answers: ["1944", "1946", "1943"],
  },
  {
    question: "What is the capital of Japan?",
    correct_answer: "Tokyo",
    incorrect_answers: ["Osaka", "Kyoto", "Nagoya"],
  },
  {
    question: "How many continents are there?",
    correct_answer: "7",
    incorrect_answers: ["5", "6", "8"],
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    correct_answer: "Harper Lee",
    incorrect_answers: [
      "Mark Twain",
      "Ernest Hemingway",
      "F. Scott Fitzgerald",
    ],
  },
  {
    question: "What is the smallest country in the world?",
    correct_answer: "Vatican City",
    incorrect_answers: ["Monaco", "San Marino", "Liechtenstein"],
  },
  {
    question: "What is the hardest natural substance on Earth?",
    correct_answer: "Diamond",
    incorrect_answers: ["Gold", "Iron", "Platinum"],
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

export const fetchTriviaQuestions = async (amount = 10) => {
  try {
    const token = await getSessionToken();

    const response = await fetch(
      `${API_URL}?amount=${amount}&type=multiple&token=${token}`
    );

    if (!response.ok) {
      console.warn("API returned error, using mock data");
      return formatQuestions(mockQuestions);
    }

    const data = await response.json();

    if (data.response_code !== 0) {
      console.warn("API response code error, using mock data");
      return formatQuestions(mockQuestions);
    }

    return formatQuestions(data.results);
  } catch (error) {
    console.warn("API fetch failed, using mock data:", error);
    return formatQuestions(mockQuestions);
  }
};

const formatQuestions = (questions) => {
  return questions.map((q, index) => {
    const allAnswers = [...q.incorrect_answers, q.correct_answer];
    const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

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
