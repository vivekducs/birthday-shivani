import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Play, Pause, Heart, Star, Sparkles, Volume2, VolumeX, MessageCircle, Gift, Wind } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import Confetti from 'react-confetti';

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);
  const [started, setStarted] = useState(false);
  const [candleBlown, setCandleBlown] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  
  const personalizedMsgs = [
    "I still miss your chocolate coffee ☕",
    "I miss our late-night discussions 🌙",
    "You are the best sister anyone could ask for ❤️",
    "I'll never forget how much fun we had playing Ludo and Uno together 🎲",
    "We always enjoy so much when we watch movies together 🎬",
    "No one can beat the special coffee and pasta you make for me! 🍝😋",
    "Thanks for always having my back, no matter what 🛡️",
    "Can't wait to create more beautiful memories together ✨",
    "You light up our home with your smile 🌸",
    "Wishing you all the happiness and success in the world! 🌟"
  ];
  const [msgIndex, setMsgIndex] = useState(0);

  const handleNextMsg = () => {
    setMsgIndex((prev) => (prev + 1) % personalizedMsgs.length);
  };
  
  const bgMusicRef = useRef(new Audio('/mixkit-hip-hop-02-738.mp3'));
  const hbdMusicRef = useRef(new Audio('/hbd.mp3'));

  useEffect(() => {
    bgMusicRef.current.loop = true;
    
    const handleResize = () => {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      bgMusicRef.current.pause();
      hbdMusicRef.current.pause();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleStart = () => {
    setStarted(true);
    bgMusicRef.current.play().catch(e => console.log("Audio play failed:", e));
    setIsPlaying(true);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      bgMusicRef.current.pause();
    } else {
      bgMusicRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const blowCandle = () => {
    setCandleBlown(true);
    bgMusicRef.current.pause();
    hbdMusicRef.current.currentTime = 0;
    hbdMusicRef.current.play();
    setIsPlaying(true);
  };

  if (!started) {
    return (
      <div className="h-screen w-full bg-gradient-to-br from-pink-100 via-pink-50 to-pink-200 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Decorative glowing background blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-yellow-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob" style={{animationDelay: '4s'}}></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="z-10 text-center px-6 py-12 max-w-lg bg-white/40 backdrop-blur-md rounded-[3rem] border border-white/60 shadow-2xl relative"
        >
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-4 shadow-xl border-4 border-pink-100">
            <Gift size={40} className="text-pink-500 animate-bounce" />
          </div>

          <h1 className="text-pink-700 font-handwritten text-5xl md:text-6xl mb-4 leading-tight font-bold drop-shadow-sm mt-6">
            For the most special sister in the world...
          </h1>
          <p className="text-pink-600/80 font-serif text-lg mb-8 italic">
            "Turn up your volume and open your gift 🎧💖"
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            className="px-8 py-4 bg-pink-500 border border-pink-400 rounded-full text-white font-bold tracking-widest uppercase text-sm flex items-center justify-center gap-3 mx-auto shadow-[0_10px_25px_rgba(236,72,153,0.5)] hover:bg-pink-600 transition-all"
          >
            <Sparkles size={18} className="text-pink-100" />
            See your surprise! 🎁
          </motion.button>
        </motion.div>
        
        {/* Floating flowers and hearts */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300 opacity-70 text-3xl"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, Math.random() * 30 - 15, 0],
              rotate: [0, 20, -20, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {['🌸', '💖', '✨', '🎂'][i % 4]}
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-pink-50 text-slate-800 font-sans min-h-screen selection:bg-pink-200 selection:text-pink-900 relative">
      {candleBlown && <Confetti width={windowDimensions.width} height={windowDimensions.height} recycle={true} numberOfPieces={150} colors={['#ffd1dc', '#ffb6c1', '#ff69b4', '#ffffff', '#e6e6fa']} style={{ position: 'fixed', zIndex: 9999, pointerEvents: 'none' }} />}
      
      {/* Audio Control */}
      <button 
        onClick={toggleAudio}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/60 backdrop-blur-md border border-pink-200 text-pink-500 shadow-md hover:bg-white/90 transition-all"
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      {/* Floating Elements globally */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="absolute animate-float opacity-30 text-3xl" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s` }}>
            {['🎈', '🌸', '✨', '💖'][Math.floor(Math.random() * 4)]}
          </div>
        ))}
      </div>

      {/* 2. Hero Section */}
      <section className="relative h-[100svh] flex flex-col justify-end pb-16 items-center overflow-hidden z-10">
        <div className="absolute inset-0 z-0 bg-pink-50">
          <img src="/main banner.png" alt="Shivani" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-pink-50 via-pink-50/50 to-transparent"></div>
        </div>
        
        <div className="z-10 text-center px-6 w-full max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-5xl md:text-7xl font-bold mb-6 font-serif text-pink-700"
            style={{ textShadow: '0 4px 12px rgba(255,255,255,0.9)' }}
          >
            Happy Birthday<br/>Shivani <span className="text-pink-500 inline-block animate-pulse">❤️</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="text-sm md:text-lg text-pink-900 tracking-widest font-bold uppercase bg-white/60 inline-block px-6 py-3 rounded-full backdrop-blur-md border border-white/80 shadow-lg"
          >
            A digital surprise from your annoying but loving brother
          </motion.p>
        </div>
      </section>

      {/* Virtual Cake Cutting */}
      <section className="py-24 bg-white px-6 z-10 relative text-center border-y-4 border-dashed border-pink-100">
        <h2 className="text-4xl md:text-5xl font-serif text-pink-500 mb-4">Virtual Cake Cutting 🎂</h2>
        <p className="text-3xl font-handwritten text-pink-400 mb-12">Tap the candle</p>
        
        <div className="max-w-md mx-auto relative h-[450px] flex flex-col items-center justify-end pb-4">
          
          <AnimatePresence>
            {!candleBlown && (
              <motion.div 
                exit={{ opacity: 0, scale: 0, y: 20 }}
                className="absolute top-8 cursor-pointer z-20 flex flex-col items-center group"
                onClick={blowCandle}
              >
                {/* Flame */}
                <motion.div 
                  animate={{ scale: [1, 1.1, 0.9, 1], rotate: [0, -2, 2, 0] }}
                  transition={{ repeat: Infinity, duration: 0.3 }}
                  className="w-8 h-12 bg-gradient-to-t from-yellow-400 to-orange-500 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] shadow-[0_0_30px_#f59e0b] group-hover:scale-110 transition-transform"
                />
                {/* Candle Body */}
                <div className="w-5 h-24 bg-gradient-to-r from-pink-100 via-white to-pink-200 rounded-sm border border-pink-200 mt-1 flex flex-col justify-evenly shadow-sm">
                  <div className="w-full h-1.5 bg-pink-400 transform -rotate-12"></div>
                  <div className="w-full h-1.5 bg-pink-400 transform -rotate-12"></div>
                  <div className="w-full h-1.5 bg-pink-400 transform -rotate-12"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Premium 2-Tier Cake */}
          <div className="relative flex flex-col items-center z-10">
            
            {/* Top Tier */}
            <div className="w-48 h-28 bg-gradient-to-b from-pink-200 to-pink-300 rounded-t-xl relative border-b-4 border-pink-400 shadow-md flex justify-center">
              {/* Drip icing */}
              <div className="absolute top-0 w-full flex justify-around">
                {['h-6', 'h-8', 'h-5', 'h-9', 'h-7', 'h-6'].map((h, i) => (
                  <div key={i} className={`w-8 bg-white rounded-b-full shadow-sm ${h}`}></div>
                ))}
              </div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-6">
                <span className="text-pink-600 font-serif font-bold text-2xl drop-shadow-sm">Happy Bdy</span>
              </div>
              
              {/* Sprinkles */}
              {[...Array(12)].map((_, i) => (
                 <div key={`sprinkle-top-${i}`} className="absolute w-2 h-1 rounded-full opacity-80"
                   style={{
                     backgroundColor: ['#ffb6c1', '#e6e6fa', '#fffdd0', '#ff69b4', '#d4af37'][Math.floor(Math.random()*5)],
                     top: Math.random() * 40 + 40 + '%',
                     left: Math.random() * 80 + 10 + '%',
                     transform: `rotate(${Math.random() * 180}deg)`
                   }}
                 />
              ))}
            </div>

            {/* Bottom Tier */}
            <div className="w-72 h-36 bg-gradient-to-b from-pink-300 to-pink-400 rounded-lg relative border-b-[12px] border-pink-500 shadow-2xl flex justify-center">
              {/* Drip icing */}
              <div className="absolute top-0 w-full flex justify-around overflow-hidden">
                {['h-8', 'h-6', 'h-10', 'h-7', 'h-9', 'h-5', 'h-8', 'h-6'].map((h, i) => (
                  <div key={i} className={`w-9 bg-white rounded-b-full shadow-sm ${h}`}></div>
                ))}
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center pt-8">
                <span className="text-white font-handwritten text-5xl drop-shadow-md font-bold tracking-wider">Dear Sister!</span>
              </div>
              
              {/* Decorative bottom border */}
              <div className="absolute bottom-0 w-full flex justify-around mb-[-6px]">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-5 h-5 rounded-full bg-pink-100 border-2 border-pink-400 shadow-sm"></div>
                ))}
              </div>
            </div>
            
            {/* Cake Plate */}
            <div className="w-80 h-5 bg-slate-200 rounded-full mt-2 shadow-xl border-b-4 border-slate-300"></div>
          </div>
          
          <AnimatePresence>
            {candleBlown && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5, y: 100 }}
                animate={{ opacity: 1, scale: 1, y: -60 }}
                className="absolute top-0 z-30"
              >
                <div className="p-3 bg-white rounded-2xl shadow-2xl rotate-3 border-4 border-pink-100">
                  <img src="/shivani with cake.png" alt="Birthday Celebration" className="w-72 h-auto rounded-xl object-contain" />
                  <p className="font-handwritten text-pink-500 text-3xl mt-3">Yay! Time to party! 🎉🎂</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* 3. Memory Journey */}
      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto z-10 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-pink-500 mb-4">Our Beautiful Journey</h2>
          <p className="text-pink-400 font-handwritten text-3xl">Moments that I cherish forever...</p>
        </div>

        <div className="space-y-32">
          <MemoryCard 
            img="/shivani1.png"
            date="A Special Day"
            desc="You've always brought so much light and joy into our lives."
            align="left"
          />
          <MemoryCard 
            img="/in nature.jpeg"
            date="Adventures Together"
            desc="Exploring the world and making memories."
            align="right"
          />
          <MemoryCard 
            img="/with friends.png"
            date="Always Smiling"
            desc="Your happiness is truly contagious. Never lose that smile."
            align="left"
          />
        </div>
      </section>

      {/* 5. Why You Are Special */}
      <section className="py-24 bg-gradient-to-b from-pink-50 to-pink-100 px-6 z-10 relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif text-center text-pink-600 mb-16">Why You Are So Special</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <QualityCard title="Kind Heart" icon={<Heart className="text-pink-500" fill="currentColor" />} />
            <QualityCard title="Beautiful Soul" icon={<Sparkles className="text-purple-400" />} />
            <QualityCard title="My Best Friend" icon={<Star className="text-yellow-400" fill="currentColor" />} />
            <QualityCard title="Family's Happiness" icon={<Heart className="text-pink-400" />} />
            <QualityCard title="Strong Personality" icon={<Sparkles className="text-pink-500" />} />
          </div>
        </div>
      </section>

      {/* 6. Hidden Surprise */}
      <section className="py-32 flex flex-col items-center justify-center text-center px-6 relative z-10">
        <h2 className="text-2xl font-serif text-pink-300 mb-8 opacity-70">Nothing to see here...</h2>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowSurprise(true)}
          className="px-8 py-4 bg-pink-100 border-2 border-pink-300 rounded-full text-pink-500 uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(255,192,203,0.5)] hover:bg-pink-200 transition-colors"
        >
          Do Not Click
        </motion.button>

        <AnimatePresence>
          {showSurprise && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-sm p-4"
              onClick={() => setShowSurprise(false)}
            >
              <div className="bg-white p-4 rounded-xl rotate-[-2deg] max-w-md w-full border-8 border-pink-100 shadow-2xl relative">
                <img src="/cutee.png" alt="Cute" className="w-full h-auto rounded object-contain max-h-[60vh]" />
                <p className="font-handwritten text-pink-600 text-3xl mt-4 text-center">Haha! Still the cutest!</p>
                <div className="absolute -top-4 -right-4 text-4xl animate-bounce">🌸</div>
                <div className="absolute -bottom-4 -left-4 text-4xl animate-bounce" style={{animationDelay: '0.2s'}}>💖</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 9. Emotional Letter */}
      <section className="py-24 px-6 relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-pink-100/50"></div>
        <div className="max-w-2xl mx-auto relative z-10 bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-xl border border-pink-100 flex flex-col items-center text-center min-h-[400px] justify-center">
          <h3 className="text-pink-400 uppercase tracking-widest font-bold text-sm mb-6">A message for you</h3>
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={msgIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full flex-grow flex flex-col justify-center items-center"
            >
              <p className="font-handwritten text-3xl md:text-5xl text-slate-700 leading-relaxed mb-8">
                "{personalizedMsgs[msgIndex]}"
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextMsg}
            className="px-10 py-4 bg-pink-500 border border-pink-400 rounded-full text-white font-bold tracking-widest uppercase text-sm shadow-[0_4px_15px_rgba(236,72,153,0.4)] hover:bg-pink-600 transition-all mt-4"
          >
            Thanks
          </motion.button>
          
          <div className="w-full mt-8 border-t border-pink-200 pt-6">
             <p className="text-right text-pink-600 font-bold tracking-widest uppercase text-sm">Your brother, Ashish</p>
          </div>
        </div>
      </section>

      {/* 10. Grand Finale */}
      <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-pink-100 to-pink-200 z-10 py-20">
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating light particles instead of stars */}
          {[...Array(30)].map((_, i) => (
            <div 
              key={i} 
              className="absolute rounded-full bg-white opacity-60 animate-float"
              style={{
                width: Math.random() * 10 + 5 + 'px',
                height: Math.random() * 10 + 5 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${Math.random() * 4 + 4}s`
              }}
            />
          ))}
        </div>

        <div className="z-10 text-center px-4 max-w-3xl bg-white/40 p-10 rounded-[3rem] backdrop-blur-md shadow-2xl border border-white">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="text-2xl md:text-4xl font-serif text-pink-600 mb-12 leading-relaxed"
          >
            "No matter how old we become,<br />
            you will always be my little sister."
          </motion.p>
          
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="text-6xl md:text-8xl font-bold font-serif text-pink-500 drop-shadow-md"
          >
            Happy Birthday<br />Shivani ❤️
          </motion.h2>

        </div>
      </section>

      {/* 11. Footer / Contact Section */}
      <section className="py-16 bg-[#3d2f2f] text-white flex flex-col items-center text-center z-10 relative border-t-8 border-pink-900/20">
        <h2 className="font-handwritten text-4xl md:text-6xl text-[#d4af37] mb-2 drop-shadow-md">
          Designed with love <span className="text-pink-500">❤️</span> by Ashish
        </h2>
        <p className="text-xs md:text-sm tracking-widest uppercase text-white/50 mb-10">
          Made specifically for Shivani's birthday
        </p>

        <a 
          href="https://wa.me/919354368207?text=Thank%20you%20bhaiji" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 mb-6 shadow-lg hover:scale-105 transition-transform"
        >
          <MessageCircle size={24} /> Message Ashish
        </a>

        <div className="flex gap-4 mb-12">
          <a 
            href="https://www.instagram.com/ashish._.pal3/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
          >
            <FaInstagram size={20} /> Ashish
          </a>
          <a 
            href="https://www.instagram.com/shivani._.pal/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
          >
            <FaInstagram size={20} /> Shivani
          </a>
        </div>

        <p className="text-white/40 text-sm">
          © 2026 Ashish. All rights reserved.
        </p>
      </section>

    </div>
  );
};

const MemoryCard = ({ img, date, desc, align }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className={`flex flex-col ${align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 lg:gap-16 items-center`}
    >
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="relative group p-3 bg-white rounded-2xl rotate-1 hover:rotate-0 transition-transform duration-500 shadow-xl border border-pink-100 max-w-md w-full">
          {/* Changed object-cover to object-contain and removed strict height limit to prevent cropping */}
          <img src={img} alt="Memory" className="w-full h-auto max-h-[600px] object-contain rounded-xl" />
          <div className="absolute inset-0 bg-pink-200/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </div>
      </div>
      <div className={`w-full md:w-1/2 ${align === 'right' ? 'md:text-right' : 'text-left'}`}>
        <span className="inline-block px-4 py-1 bg-pink-100 text-pink-600 font-mono text-sm tracking-widest uppercase mb-4 rounded-full font-bold">{date}</span>
        <p className="text-xl md:text-3xl text-slate-700 font-serif leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
};

const QualityCard = ({ title, icon }) => {
  return (
    <motion.div 
      whileHover={{ y: -10, scale: 1.02 }}
      className="bg-white p-8 rounded-3xl flex flex-col items-center justify-center text-center gap-4 cursor-pointer shadow-lg border border-pink-50 hover:shadow-pink-200/50 transition-all duration-300"
    >
      <div className="p-4 bg-pink-50 rounded-full shadow-inner">
        {icon}
      </div>
      <h3 className="text-xl font-serif text-slate-700">{title}</h3>
    </motion.div>
  );
};

export default App;
