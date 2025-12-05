import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { CardProps } from '../types';

const GameCard: React.FC<CardProps> = ({ question, isFlipped, onFlip }) => {
  return (
    <div className="relative w-full max-w-sm aspect-[3/4] perspective-1000 cursor-pointer group" onClick={onFlip}>
       <AnimatePresence mode="wait">
        {!isFlipped ? (
           // Card Back (Cover)
          <motion.div
            key="back"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-rose-300 via-pink-200 to-blue-200 shadow-xl border-4 border-white flex flex-col items-center justify-center p-6"
          >
            <div className="bg-white/30 backdrop-blur-sm rounded-full p-6 mb-4 shadow-inner">
               <Heart className="w-12 h-12 text-white fill-white animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-widest drop-shadow-md">
              点击抽卡
            </h3>
            <p className="text-white/80 mt-2 text-sm font-medium">Spicy & Sweet</p>
            
            {/* Decorative Patterns */}
            <div className="absolute top-4 right-4 opacity-50"><Sparkles className="text-white w-6 h-6" /></div>
            <div className="absolute bottom-4 left-4 opacity-50"><Sparkles className="text-white w-6 h-6" /></div>
          </motion.div>
        ) : (
          // Card Front (Content)
          <motion.div
            key="front"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full rounded-3xl bg-white shadow-2xl border-2 border-rose-100 flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200" />
            
            <span className="absolute top-6 right-6 text-6xl text-rose-50 opacity-50 select-none">”</span>
            <span className="absolute bottom-6 left-6 text-6xl text-rose-50 opacity-50 select-none rotate-180">”</span>

            <div className="flex-1 flex flex-col justify-center items-center z-10">
              <h2 className="text-xl md:text-2xl font-bold text-gray-700 leading-relaxed tracking-wide">
                {question?.text}
              </h2>
            </div>
            
            <div className="mt-4 text-xs text-gray-400 font-medium uppercase tracking-widest">
              {question?.source === 'custom' ? '✏️ 自定义题目' : '❤️ 经典题目'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameCard;