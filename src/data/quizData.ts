export interface Question {
  id: string;
  text: string;
  options: string[]; // e.g. Red, Blue, Yellow, Green
  correctOptionIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  language: 'en' | 'uz';
  category: string;
  timerPerQuestion: number;
  questions: Question[];
}

export interface Analytics {
  totalPlays: number;
  averageScore: number;
  completionRate: string;
  hardestQuestions: Array<{ question: string; failRate: number }>;
  scoreDistribution: Array<{ range: string; count: number }>;
}

export const initialQuizzes: Quiz[] = [
  {
    id: 'general-knowledge-en',
    title: 'General Knowledge',
    description: 'Test your general knowledge across various topics',
    language: 'en',
    category: 'General',
    timerPerQuestion: 20,
    questions: [
      {
        id: 'q1',
        text: 'What is the capital of France?',
        options: ['London', 'Berlin', 'Paris', 'Madrid'],
        correctOptionIndex: 2,
        explanation: 'Paris is the capital and largest city of France.'
      },
      {
        id: 'q2',
        text: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correctOptionIndex: 1,
        explanation: 'Mars is called the Red Planet because of its reddish appearance.'
      },
      {
        id: 'q3',
        text: 'What is the largest ocean on Earth?',
        options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
        correctOptionIndex: 3,
        explanation: 'The Pacific Ocean is the largest and deepest ocean on Earth.'
      },
      {
        id: 'q4',
        text: 'Who painted the Mona Lisa?',
        options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
        correctOptionIndex: 2,
        explanation: 'Leonardo da Vinci painted the Mona Lisa in the early 16th century.'
      },
      {
        id: 'q5',
        text: 'What is the chemical symbol for gold?',
        options: ['Go', 'Gd', 'Au', 'Ag'],
        correctOptionIndex: 2,
        explanation: 'Au is the chemical symbol for gold, derived from the Latin word aurum.'
      }
    ]
  },
  {
    id: 'general-knowledge-uz',
    title: 'Umumiy Bilimlar',
    description: 'Turli mavzulardagi umumiy bilimlaringizni sinang',
    language: 'uz',
    category: 'Umumiy',
    timerPerQuestion: 20,
    questions: [
      {
        id: 'q1',
        text: 'Fransiya poytaxti qaysi shahar?',
        options: ['London', 'Berlin', 'Parij', 'Madrid'],
        correctOptionIndex: 2,
        explanation: 'Parij Fransiyaning poytaxti va eng yirik shahri.'
      },
      {
        id: 'q2',
        text: 'Qaysi sayyora "Qizil Sayyora" deb ataladi?',
        options: ['Venera', 'Mars', 'Yupiter', 'Saturn'],
        correctOptionIndex: 1,
        explanation: 'Mars o\'zining qizil rangi tufayli Qizil Sayyora deb ataladi.'
      },
      {
        id: 'q3',
        text: 'Yerdagi eng katta okean qaysi?',
        options: ['Atlantika okeani', 'Hind okeani', 'Arktika okeani', 'Tinch okeani'],
        correctOptionIndex: 3,
        explanation: 'Tinch okeani Yerdagi eng katta va eng chuqur okean.'
      },
      {
        id: 'q4',
        text: '"Mona Liza" rasmini kim chizgan?',
        options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
        correctOptionIndex: 2,
        explanation: 'Leonardo da Vinci 16-asr boshlarida Mona Liza rasmini chizgan.'
      },
      {
        id: 'q5',
        text: 'Oltinning kimyoviy belgisi nima?',
        options: ['Go', 'Gd', 'Au', 'Ag'],
        correctOptionIndex: 2,
        explanation: 'Au - oltinning kimyoviy belgisi, lotincha aurum so\'zidan olingan.'
      }
    ]
  },
  {
    id: 'it-coding-en',
    title: 'IT & Coding Challenge',
    description: 'Test your programming and technology knowledge',
    language: 'en',
    category: 'Technology',
    timerPerQuestion: 15,
    questions: [
      {
        id: 'q1',
        text: 'What does HTML stand for?',
        options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'],
        correctOptionIndex: 0,
        explanation: 'HTML stands for Hyper Text Markup Language, the standard language for creating web pages.'
      },
      {
        id: 'q2',
        text: 'Which programming language is known as the "mother of all languages"?',
        options: ['Python', 'Java', 'C', 'Assembly'],
        correctOptionIndex: 2,
        explanation: 'C is often called the "mother of all languages" as many modern languages are derived from it.'
      },
      {
        id: 'q3',
        text: 'What is the time complexity of binary search?',
        options: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'],
        correctOptionIndex: 2,
        explanation: 'Binary search has O(log n) time complexity as it halves the search space each iteration.'
      },
      {
        id: 'q4',
        text: 'Which company developed React?',
        options: ['Google', 'Facebook (Meta)', 'Microsoft', 'Amazon'],
        correctOptionIndex: 1,
        explanation: 'React was developed by Facebook (now Meta) and released in 2013.'
      },
      {
        id: 'q5',
        text: 'What does API stand for?',
        options: ['Application Programming Interface', 'Advanced Program Integration', 'Automated Protocol Interface', 'Application Process Integration'],
        correctOptionIndex: 0,
        explanation: 'API stands for Application Programming Interface, allowing different software to communicate.'
      }
    ]
  },
  {
    id: 'it-coding-uz',
    title: 'IT va Dasturlash',
    description: 'Dasturlash va texnologiya bilimlaringizni sinang',
    language: 'uz',
    category: 'Texnologiya',
    timerPerQuestion: 15,
    questions: [
      {
        id: 'q1',
        text: 'HTML qisqartmasi nimani anglatadi?',
        options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'],
        correctOptionIndex: 0,
        explanation: 'HTML - Hyper Text Markup Language, veb sahifalar yaratish uchun standart til.'
      },
      {
        id: 'q2',
        text: 'Qaysi dasturlash tili "barcha tillarning onasi" deb ataladi?',
        options: ['Python', 'Java', 'C', 'Assembly'],
        correctOptionIndex: 2,
        explanation: 'C ko\'pincha "barcha tillarning onasi" deb ataladi, chunki ko\'plab zamonaviy tillar undan kelib chiqqan.'
      },
      {
        id: 'q3',
        text: 'Binary search algoritmining vaqt murakkabligi qancha?',
        options: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'],
        correctOptionIndex: 2,
        explanation: 'Binary search O(log n) vaqt murakkabligiga ega, chunki u har qadamda qidiruv maydonini yarmiga qisqartiradi.'
      },
      {
        id: 'q4',
        text: 'Reactni qaysi kompaniya ishlab chiqqan?',
        options: ['Google', 'Facebook (Meta)', 'Microsoft', 'Amazon'],
        correctOptionIndex: 1,
        explanation: 'React Facebook (hozirgi Meta) tomonidan ishlab chiqilgan va 2013-yilda chiqarilgan.'
      },
      {
        id: 'q5',
        text: 'API qisqartmasi nimani anglatadi?',
        options: ['Application Programming Interface', 'Advanced Program Integration', 'Automated Protocol Interface', 'Application Process Integration'],
        correctOptionIndex: 0,
        explanation: 'API - Application Programming Interface, turli dasturiy ta\'minotlar o\'rtasida aloqa qilish imkonini beradi.'
      }
    ]
  },
  {
    id: 'uzbekistan-history-en',
    title: 'History of Uzbekistan',
    description: 'Learn about the rich history of Uzbekistan',
    language: 'en',
    category: 'History',
    timerPerQuestion: 25,
    questions: [
      {
        id: 'q1',
        text: 'Which ancient city was located on the Silk Road in present-day Uzbekistan?',
        options: ['Samarkand', 'Bukhara', 'Khiva', 'All of the above'],
        correctOptionIndex: 3,
        explanation: 'Samarkand, Bukhara, and Khiva were all major cities on the ancient Silk Road.'
      },
      {
        id: 'q2',
        text: 'Who was the famous ruler born in Shahrisabz, Uzbekistan?',
        options: ['Genghis Khan', 'Tamerlane (Amir Timur)', 'Alexander the Great', 'Cyrus the Great'],
        correctOptionIndex: 1,
        explanation: 'Tamerlane (Amir Timur) was born in Shahrisabz in 1336 and established the Timurid Empire.'
      },
      {
        id: 'q3',
        text: 'When did Uzbekistan gain independence from the Soviet Union?',
        options: ['1989', '1990', '1991', '1992'],
        correctOptionIndex: 2,
        explanation: 'Uzbekistan declared independence on August 31, 1991, following the dissolution of the Soviet Union.'
      },
      {
        id: 'q4',
        text: 'What is the name of the ancient observatory built by Ulugh Beg in Samarkand?',
        options: ['Ulugh Beg Observatory', 'Samarkand Observatory', 'Central Asian Observatory', 'Silk Road Observatory'],
        correctOptionIndex: 0,
        explanation: 'The Ulugh Beg Observatory was built in the 15th century and was one of the finest observatories in the Islamic world.'
      },
      {
        id: 'q5',
        text: 'Which UNESCO World Heritage site is known for its Islamic architecture in Uzbekistan?',
        options: ['Registan Square', 'Chorsu Bazaar', 'Tashkent Tower', 'Navoi Theater'],
        correctOptionIndex: 0,
        explanation: 'Registan Square in Samarkand is a UNESCO World Heritage site famous for its stunning Islamic architecture.'
      }
    ]
  },
  {
    id: 'uzbekistan-history-uz',
    title: 'O\'zbekiston Tarixi',
    description: 'O\'zbekistonning boy tarixi haqida ma\'lumot oling',
    language: 'uz',
    category: 'Tarix',
    timerPerQuestion: 25,
    questions: [
      {
        id: 'q1',
        text: 'Qadimgi Buyuk Ipak Yo\'lida qaysi shaharlar joylashgan edi?',
        options: ['Samarqand', 'Buxoro', 'Xiva', 'Barchasi'],
        correctOptionIndex: 3,
        explanation: 'Samarqand, Buxoro va Xiva hammasi qadimgi Buyuk Ipak Yo\'lidagi yirik shaharlar edi.'
      },
      {
        id: 'q2',
        text: 'Shahrisabzda tug\'ilgan mashhur hukmdor kim?',
        options: ['Chingizxon', 'Amir Temur', 'Aleksandr Makedonskiy', 'Kirus Buyuk'],
        correctOptionIndex: 1,
        explanation: 'Amir Temur 1336-yilda Shahrisabzda tug\'ilgan va Temuriylar imperiyasiga asos solgan.'
      },
      {
        id: 'q3',
        text: 'O\'zbekiston Sovet Ittifoqidan qachon mustaqillikka erishdi?',
        options: ['1989', '1990', '1991', '1992'],
        correctOptionIndex: 2,
        explanation: 'O\'zbekiston 1991-yil 31-avgustda mustaqillikka erishdi, Sovet Ittifoqining parchalanishidan so\'ng.'
      },
      {
        id: 'q4',
        text: 'Samarqandda Ulug\'bek qurgan qadimiy observatoriya nomi nima?',
        options: ['Ulug\'bek Observatoriyasi', 'Samarqand Observatoriyasi', 'Markaziy Osiyo Observatoriyasi', 'Ipak Yo\'li Observatoriyasi'],
        correctOptionIndex: 0,
        explanation: 'Ulug\'bek Observatoriyasi 15-asrda qurilgan va islom olamidagi eng yaxshi observatoriyalardan biri bo\'lgan.'
      },
      {
        id: 'q5',
        text: 'O\'zbekistondagi islom me\'morchilasi bilan mashhur UNESCO obyekti qaysi?',
        options: ['Registon maydoni', 'Chorsu bozori', 'Toshkent minorasi', 'Navoiy teatri'],
        correctOptionIndex: 0,
        explanation: 'Samarqanddagi Registon maydoni UNESCO Jahon merosi obyekti bo\'lib, ajoyib islom me\'morchilasi bilan mashhur.'
      }
    ]
  }
];

export const initialAnalytics: Analytics = {
  totalPlays: 1247,
  averageScore: 723,
  completionRate: '78%',
  hardestQuestions: [
    { question: 'What is the time complexity of binary search?', failRate: 45 },
    { question: 'Who was the famous ruler born in Shahrisabz?', failRate: 38 },
    { question: 'What does API stand for?', failRate: 32 }
  ],
  scoreDistribution: [
    { range: '0-250', count: 89 },
    { range: '251-500', count: 234 },
    { range: '501-750', count: 456 },
    { range: '751-1000', count: 312 },
    { range: '1000+', count: 156 }
  ]
};
