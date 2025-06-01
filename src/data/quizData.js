export const quizzes = [
  {
    id: 1,
    title: "General Knowledge Quiz",
    description: "Test your knowledge on various topics from history to science.",
    code: "GK123",
    timePerQuestion: 30,
    questions: [
      {
        id: "gk1",
        text: "What is the capital of France?",
        options: [
          { id: "a", text: "London" },
          { id: "b", text: "Berlin" },
          { id: "c", text: "Paris" },
          { id: "d", text: "Rome" }
        ],
        correctOption: "c",
        points: 10
      },
      {
        id: "gk2",
        text: "Who painted the Mona Lisa?",
        options: [
          { id: "a", text: "Vincent Van Gogh" },
          { id: "b", text: "Leonardo da Vinci" },
          { id: "c", text: "Pablo Picasso" },
          { id: "d", text: "Michelangelo" }
        ],
        correctOption: "b",
        points: 10
      },
      {
        id: "gk3",
        text: "What is the chemical symbol for gold?",
        options: [
          { id: "a", text: "Go" },
          { id: "b", text: "Gd" },
          { id: "c", text: "Gl" },
          { id: "d", text: "Au" }
        ],
        correctOption: "d",
        points: 10
      },
      {
        id: "gk4",
        text: "Which planet is known as the Red Planet?",
        options: [
          { id: "a", text: "Jupiter" },
          { id: "b", text: "Mars" },
          { id: "c", text: "Venus" },
          { id: "d", text: "Saturn" }
        ],
        correctOption: "b",
        points: 10
      },
      {
        id: "gk5",
        text: "What is the largest organ in the human body?",
        options: [
          { id: "a", text: "Heart" },
          { id: "b", text: "Liver" },
          { id: "c", text: "Skin" },
          { id: "d", text: "Brain" }
        ],
        correctOption: "c",
        points: 10
      }
    ]
  },
  {
    id: 2,
    title: "Programming Basics",
    description: "Test your knowledge of programming fundamentals.",
    code: "CODE42",
    timePerQuestion: 45,
    questions: [
      {
        id: "pb1",
        text: "Which of these is not a programming language?",
        options: [
          { id: "a", text: "Python" },
          { id: "b", text: "Java" },
          { id: "c", text: "Banana" },
          { id: "d", text: "JavaScript" }
        ],
        correctOption: "c",
        points: 10
      },
      {
        id: "pb2",
        text: "What does HTML stand for?",
        options: [
          { id: "a", text: "Hyper Text Markup Language" },
          { id: "b", text: "High Tech Modern Language" },
          { id: "c", text: "Hyper Transfer Markup Language" },
          { id: "d", text: "Home Tool Markup Language" }
        ],
        correctOption: "a",
        points: 10
      },
      {
        id: "pb3",
        text: "What symbol is used for single-line comments in JavaScript?",
        options: [
          { id: "a", text: "#" },
          { id: "b", text: "//" },
          { id: "c", text: "--" },
          { id: "d", text: "/**/" }
        ],
        correctOption: "b",
        points: 15
      },
      {
        id: "pb4",
        text: "Which data structure operates on a Last In First Out (LIFO) principle?",
        options: [
          { id: "a", text: "Queue" },
          { id: "b", text: "Linked List" },
          { id: "c", text: "Stack" },
          { id: "d", text: "Tree" }
        ],
        correctOption: "c",
        points: 15
      },
      {
        id: "pb5",
        text: "Which of these is NOT a JavaScript framework/library?",
        options: [
          { id: "a", text: "React" },
          { id: "b", text: "Angular" },
          { id: "c", text: "Django" },
          { id: "d", text: "Vue" }
        ],
        correctOption: "c",
        points: 10
      }
    ]
  }
];

// Sample quiz codes that users can use
export const sampleCodes = [
  { code: "GK123", name: "General Knowledge Quiz" },
  { code: "CODE42", name: "Programming Basics" }
];