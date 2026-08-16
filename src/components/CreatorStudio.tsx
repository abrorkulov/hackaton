import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Quiz, Question } from '../data/quizData';
import { Plus, Trash2, Save, Play, Clock, Wand2 } from 'lucide-react';
import { playClick } from '../utils/audio';

const CreatorStudio: React.FC = () => {
  const { lang, addCustomQuiz, setActiveQuiz, setCurrentScreen } = useGame();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [timerPerQuestion, setTimerPerQuestion] = useState(20);
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 'q1',
      text: '',
      options: ['', '', '', ''],
      correctOptionIndex: 0,
      explanation: '',
    }
  ]);

  const addQuestion = () => {
    playClick();
    setQuestions([
      ...questions,
      {
        id: `q${questions.length + 1}`,
        text: '',
        options: ['', '', '', ''],
        correctOptionIndex: 0,
        explanation: '',
      }
    ]);
  };

  const removeQuestion = (index: number) => {
    playClick();
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const updated = [...questions];
    updated[questionIndex].options[optionIndex] = value;
    setQuestions(updated);
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    playClick();
    const updated = [...questions];
    const question = updated[questionIndex];
    
    // Remove the option
    question.options = question.options.filter((_, i) => i !== optionIndex);
    
    // Adjust correct answer index if needed
    if (question.correctOptionIndex > optionIndex) {
      question.correctOptionIndex--;
    } else if (question.correctOptionIndex === optionIndex) {
      question.correctOptionIndex = 0;
    }
    
    setQuestions(updated);
  };

  const addOption = (questionIndex: number) => {
    playClick();
    const updated = [...questions];
    if (updated[questionIndex].options.length < 6) {
      updated[questionIndex].options = [...updated[questionIndex].options, ''];
      setQuestions(updated);
    }
  };

  const validateQuiz = (): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (!title.trim()) {
      errors.push(lang === 'en' ? 'Title is required' : 'Sarlavha majburiy');
    }
    
    if (questions.length === 0) {
      errors.push(lang === 'en' ? 'At least one question is required' : 'Kamida bitta savol majburiy');
    }
    
    questions.forEach((q, index) => {
      if (!q.text.trim()) {
        errors.push(`${lang === 'en' ? 'Question' : 'Savol'} ${index + 1}: ${lang === 'en' ? 'Question text is required' : 'Savol matni majburiy'}`);
      }
      
      const filledOptions = q.options.filter(o => o.trim());
      if (filledOptions.length < 2) {
        errors.push(`${lang === 'en' ? 'Question' : 'Savol'} ${index + 1}: ${lang === 'en' ? 'At least 2 answer options required' : 'Kamida 2 javob varianti majburiy'}`);
      }
      
      if (q.correctOptionIndex >= q.options.length || q.correctOptionIndex < 0) {
        errors.push(`${lang === 'en' ? 'Question' : 'Savol'} ${index + 1}: ${lang === 'en' ? 'Invalid correct answer selection' : 'Noto\'g\'ri to\'g\'ri javob tanlovi'}`);
      }
    });
    
    if (timerPerQuestion < 5 || timerPerQuestion > 120) {
      errors.push(lang === 'en' ? 'Time per question must be between 5 and 120 seconds' : 'Har bir savol uchun vaqt 5-120 soniya orasida bo\'lishi kerak');
    }
    
    return { isValid: errors.length === 0, errors };
  };

  const handleSave = () => {
    const validation = validateQuiz();
    if (!validation.isValid) {
      alert(validation.errors.join('\n'));
      return;
    }

    const newQuiz: Quiz = {
      id: `custom-${Date.now()}`,
      title,
      description,
      language: lang,
      category: category || (lang === 'en' ? 'Custom' : 'Maxsus'),
      timerPerQuestion,
      questions,
    };

    addCustomQuiz(newQuiz);
    playClick();
    alert(lang === 'en' ? 'Quiz saved successfully!' : 'Viktorina muvaffaqiyatli saqlandi!');
    setCurrentScreen('HOME');
  };

  const handlePlay = () => {
    const validation = validateQuiz();
    if (!validation.isValid) {
      alert(validation.errors.join('\n'));
      return;
    }

    const newQuiz: Quiz = {
      id: `custom-${Date.now()}`,
      title,
      description,
      language: lang,
      category: category || (lang === 'en' ? 'Custom' : 'Maxsus'),
      timerPerQuestion,
      questions,
    };

    addCustomQuiz(newQuiz);
    setActiveQuiz(newQuiz);
    playClick();
    setCurrentScreen('LOBBY');
  };

  const optionColors = ['bg-accent-500', 'bg-primary-500', 'bg-amber-500', 'bg-emerald-500'];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background depth */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.25) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 sm:gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-2xl shadow-purple-500/30">
              <Wand2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              {lang === 'en' ? 'Creator Studio' : 'Yaratuvchi Studiyasi'}
            </h1>
          </div>
          <p className="text-white/60">
            {lang === 'en' 
              ? 'Create your own interactive quiz' 
              : 'O\'zingizning interaktiv viktorinangizni yarating'}
          </p>
        </motion.div>

        {/* Quiz Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 mb-8"
        >
          <h2 className="text-xl font-bold text-white mb-4">
            {lang === 'en' ? 'Quiz Details' : 'Viktorina Tafsilotlari'}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-white/80 mb-2">
                {lang === 'en' ? 'Title' : 'Sarlavha'} *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={lang === 'en' ? 'Enter quiz title' : 'Viktorina sarlavhasini kiriting'}
                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 transition-all"
              />
            </div>
            <div>
              <label className="block text-white/80 mb-2">
                {lang === 'en' ? 'Description' : 'Tavsif'}
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={lang === 'en' ? 'Enter quiz description' : 'Viktorina tavsifini kiriting'}
                rows={2}
                className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-primary-500 resize-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/80 mb-2">
                  {lang === 'en' ? 'Category' : 'Kategoriya'}
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder={lang === 'en' ? 'e.g., Science, History' : 'Masalan, Fan, Tarix'}
                  className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-white/80 mb-2">
                  {lang === 'en' ? 'Time per Question (seconds)' : 'Har bir savol uchun vaqt (soniya)'}
                </label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                  <input
                    type="number"
                    value={timerPerQuestion}
                    onChange={(e) => setTimerPerQuestion(Number(e.target.value))}
                    min={5}
                    max={120}
                    className="w-full bg-white/10 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Questions */}
        <div className="space-y-6 mb-8">
          {questions.map((question, qIndex) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + qIndex * 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">
                  {lang === 'en' ? 'Question' : 'Savol'} {qIndex + 1}
                </h3>
                {questions.length > 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => removeQuestion(qIndex)}
                    className="p-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-lg transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 mb-2">
                    {lang === 'en' ? 'Question Text' : 'Savol Matni'} *
                  </label>
                  <textarea
                    value={question.text}
                    onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
                    placeholder={lang === 'en' ? 'Enter your question' : 'Savolingizni kiriting'}
                    rows={2}
                    className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-primary-500 resize-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-white/80">
                      {lang === 'en' ? 'Answer Options' : 'Javob Variantlari'} *
                    </label>
                    {question.options.length < 6 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addOption(qIndex)}
                        className="text-xs bg-success-500/20 text-success-400 px-3 py-1 rounded-full hover:bg-success-500/30 transition-all"
                      >
                        + {lang === 'en' ? 'Add Option' : 'Variant Qo\'shish'}
                      </motion.button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {question.options.map((option, oIndex) => (
                      <div key={oIndex} className="relative">
                        <div className={`absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 ${optionColors[oIndex % 4]} rounded-md flex items-center justify-center text-white font-bold text-sm`}>
                          {oIndex + 1}
                        </div>
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                          placeholder={`${lang === 'en' ? 'Option' : 'Variant'} ${oIndex + 1}`}
                          className="w-full bg-white/10 border border-white/10 rounded-xl pl-14 pr-12 py-3 text-white placeholder-white/40 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 transition-all"
                        />
                        {question.correctOptionIndex === oIndex && (
                          <div className="absolute right-10 top-1/2 -translate-y-1/2 text-amber-400 font-bold text-sm">
                            ✓
                          </div>
                        )}
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuestion(qIndex, 'correctOptionIndex', oIndex)}
                            className={`p-1 rounded ${
                              question.correctOptionIndex === oIndex
                                ? 'bg-warning-500 text-slate-900'
                                : 'bg-white/20 text-white/60 hover:bg-white/30'
                            }`}
                            title={lang === 'en' ? 'Set as correct' : 'To\'g\'ri deb belgilash'}
                          >
                            {question.correctOptionIndex === oIndex ? '✓' : '○'}
                          </motion.button>
                          {question.options.length > 2 && (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeOption(qIndex, oIndex)}
                              className="p-1 bg-red-500/20 text-red-400 hover:bg-red-500/40 rounded"
                              title={lang === 'en' ? 'Delete option' : 'Variantni o\'chirish'}
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 mb-2">
                    {lang === 'en' ? 'Explanation (shown after answer)' : 'Izoh (javobdan keyin ko\'rsatiladi)'}
                  </label>
                  <textarea
                    value={question.explanation}
                    onChange={(e) => updateQuestion(qIndex, 'explanation', e.target.value)}
                    placeholder={lang === 'en' ? 'Explain why this is the correct answer' : 'Nega bu to\'g\'ri javob ekanligini tushuntiring'}
                    rows={2}
                    className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-primary-500 resize-none"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Question Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={addQuestion}
          className="w-full mb-8 bg-white/10 hover:bg-white/20 border-2 border-dashed border-white/30 rounded-2xl p-4 text-white font-medium transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {lang === 'en' ? 'Add Question' : 'Savol Qo\'shish'}
        </motion.button>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all"
          >
            <Save className="w-5 h-5" />
            {lang === 'en' ? 'Save Quiz' : 'Viktorinani Saqlash'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePlay}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 transition-all"
          >
            <Play className="w-5 h-5" />
            {lang === 'en' ? 'Save & Play' : 'Saqlash va O\'ynash'}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default CreatorStudio;
