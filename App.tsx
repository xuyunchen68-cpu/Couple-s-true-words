import React, { useState, useEffect, useCallback } from 'react';
import { Wine, Heart, Plus, Sparkles, X, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GameCard from './components/GameCard';
import Button from './components/Button';
import { INITIAL_QUESTIONS, APP_TITLE, APP_SUBTITLE } from './constants';
import { Question } from './types';

const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState('');

  // Initialize questions
  useEffect(() => {
    const loadedQuestions = INITIAL_QUESTIONS.map(q => ({ ...q, isFavorite: false }));
    setQuestions(loadedQuestions);
  }, []);

  const getRandomQuestion = useCallback(() => {
    if (questions.length === 0) return;
    const randomIndex = Math.floor(Math.random() * questions.length);
    // Avoid repeating the exact same question immediately if possible
    let nextQuestion = questions[randomIndex];
    if (questions.length > 1 && currentQuestion && nextQuestion.id === currentQuestion.id) {
       const nextIndex = (randomIndex + 1) % questions.length;
       nextQuestion = questions[nextIndex];
    }
    
    setCurrentQuestion(nextQuestion);
  }, [questions, currentQuestion]);

  // Handle drawing a card
  const handleDrawCard = () => {
    if (isFlipped) {
      // If currently showing a question, flip back first
      setIsFlipped(false);
      setTimeout(() => {
        getRandomQuestion();
      }, 400); // Wait for animation
    } else {
      // If currently showing back, just pick one and flip
      if (!currentQuestion) getRandomQuestion();
      setIsFlipped(true);
    }
  };

  // Direct flip action on card
  const handleCardClick = () => {
     if (!isFlipped && !currentQuestion) {
        getRandomQuestion();
     }
     setIsFlipped(!isFlipped);
  };

  // Add Custom Question
  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;
    
    const newQ: Question = {
      id: Date.now().toString(),
      text: newQuestionText,
      source: 'custom',
      isFavorite: false
    };
    
    setQuestions(prev => [...prev, newQ]);
    setNewQuestionText('');
    setShowAddModal(false);
    alert('题目添加成功！下一张可能就是它哦～');
  };

  // Toggle Favorite
  const toggleFavorite = () => {
    if (!currentQuestion) return;
    
    const updatedQ = { ...currentQuestion, isFavorite: !currentQuestion.isFavorite };
    setCurrentQuestion(updatedQ);
    
    setQuestions(prev => prev.map(q => q.id === updatedQ.id ? updatedQ : q));
  };

  const favoriteList = questions.filter(q => q.isFavorite);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-purple-50 to-blue-50 text-gray-800 font-sans overflow-hidden flex flex-col">
      
      {/* Header */}
      <header className="pt-8 pb-4 text-center relative z-10 px-4">
        <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-md mb-3 animate-bounce">
           <Wine className="text-rose-400 w-6 h-6 mr-2" />
           <span className="text-xs font-bold text-rose-400 tracking-widest uppercase">For Couples</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-['ZCOOL_KuaiLe'] text-gray-800 drop-shadow-sm mb-1">
          {APP_TITLE}
        </h1>
        <p className="text-gray-500 font-medium tracking-wide text-sm">{APP_SUBTITLE}</p>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative">
        
        {/* Background Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 right-10 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

        {/* Card Component */}
        <div className="z-20 mb-8 w-full max-w-sm flex justify-center">
            <GameCard 
                question={currentQuestion} 
                isFlipped={isFlipped} 
                onFlip={handleCardClick} 
            />
        </div>

        {/* Action Controls */}
        <div className="flex flex-col items-center gap-4 z-20 w-full max-w-md">
           
           {/* Primary Actions */}
           <div className="flex gap-4 w-full justify-center">
             <Button onClick={handleDrawCard} className="w-48 text-lg">
               {isFlipped ? '换一张' : '抽一张'}
             </Button>
           </div>

           {/* Secondary Actions */}
           <div className="flex gap-4 mt-2">
              <Button variant="icon" onClick={() => setShowFavorites(true)} title="收藏夹">
                 <List className="w-5 h-5" />
              </Button>
              
              <Button 
                variant="icon" 
                onClick={toggleFavorite} 
                className={currentQuestion?.isFavorite ? "text-rose-500 bg-rose-50 border-rose-200" : ""}
                disabled={!currentQuestion || !isFlipped}
                title="收藏当前题目"
              >
                 <Heart className={`w-5 h-5 ${currentQuestion?.isFavorite ? 'fill-current' : ''}`} />
              </Button>

              <Button variant="icon" onClick={() => setShowAddModal(true)} title="添加题目">
                 <Plus className="w-5 h-5" />
              </Button>
           </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 text-center z-10">
        <div className="inline-block bg-white/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/50 shadow-sm">
          <p className="text-sm text-gray-500 flex items-center gap-2">
            💡 小提示：建议搭配红酒/果酒，微醺状态更敢说哦～
          </p>
        </div>
      </footer>

      {/* Add Question Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl"
            >
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-xl font-bold text-gray-700">添加自定义题目</h3>
                 <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5 text-gray-500" /></button>
               </div>
               <form onSubmit={handleAddQuestion}>
                 <textarea 
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    placeholder="输入你想问对方的问题..."
                    className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none resize-none h-32 mb-4 text-gray-700"
                 />
                 <Button type="submit" className="w-full">确认添加</Button>
               </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Favorites Modal */}
      <AnimatePresence>
        {showFavorites && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4"
          >
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              className="bg-white rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-md h-[80vh] sm:h-[600px] shadow-2xl flex flex-col"
            >
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xl font-bold text-gray-700 flex items-center gap-2">
                    <Heart className="w-5 h-5 fill-rose-500 text-rose-500" /> 收藏夹
                 </h3>
                 <button onClick={() => setShowFavorites(false)} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5 text-gray-500" /></button>
               </div>
               
               <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                 {favoriteList.length === 0 ? (
                    <div className="text-center text-gray-400 mt-20">
                        <Heart className="w-12 h-12 mx-auto mb-3 text-gray-200" />
                        <p>还没有收藏任何题目哦</p>
                    </div>
                 ) : (
                    favoriteList.map(q => (
                      <div key={q.id} className="bg-rose-50 p-4 rounded-xl border border-rose-100 text-gray-700 text-sm leading-relaxed relative group">
                          {q.text}
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <Sparkles className="w-3 h-3 text-rose-300" />
                          </div>
                      </div>
                    ))
                 )}
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default App;