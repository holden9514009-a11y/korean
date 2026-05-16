/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, CheckCircle, Info, RotateCcw, Trophy } from 'lucide-react';

// --- 데이터 구성 ---

type Vowel = 'ㅣ' | 'ㅔ' | 'ㅐ' | 'ㅟ' | 'ㅚ' | 'ㅡ' | 'ㅓ' | 'ㅏ' | 'ㅜ' | 'ㅗ';
type Consonant = 'ㄱ' | 'ㄲ' | 'ㅋ' | 'ㄴ' | 'ㄷ' | 'ㄸ' | 'ㅌ' | 'ㄹ' | 'ㅁ' | 'ㅂ' | 'ㅃ' | 'ㅍ' | 'ㅅ' | 'ㅆ' | 'ㅇ' | 'ㅈ' | 'ㅉ' | 'ㅊ' | 'ㅎ';

interface VowelCell {
  id: string;
  answer: Vowel;
  position: '전설' | '후설';
  lip: '평순' | '원순';
  height: '고' | '중' | '저';
}

interface ConsonantCell {
  id: string;
  answer: Consonant;
  place: '입술' | '잇몸' | '센입천장' | '여린입천장' | '목청';
  method: '파열음' | '파찰음' | '마찰음' | '비음' | '유음';
  intensity: '예사' | '된' | '거센' | '없음';
}

const VOWELS: Vowel[] = ['ㅣ', 'ㅔ', 'ㅐ', 'ㅟ', 'ㅚ', 'ㅡ', 'ㅓ', 'ㅏ', 'ㅜ', 'ㅗ'];
const CONSONANTS: Consonant[] = ['ㄱ', 'ㄲ', 'ㅋ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㅌ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅍ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅎ'];

const VOWEL_SYSTEM: VowelCell[] = [
  { id: 'v1', answer: 'ㅣ', position: '전설', lip: '평순', height: '고' },
  { id: 'v2', answer: 'ㅟ', position: '전설', lip: '원순', height: '고' },
  { id: 'v3', answer: 'ㅔ', position: '전설', lip: '평순', height: '중' },
  { id: 'v4', answer: 'ㅚ', position: '전설', lip: '원순', height: '중' },
  { id: 'v5', answer: 'ㅐ', position: '전설', lip: '평순', height: '저' },
  { id: 'v6', answer: 'ㅡ', position: '후설', lip: '평순', height: '고' },
  { id: 'v7', answer: 'ㅜ', position: '후설', lip: '원순', height: '고' },
  { id: 'v8', answer: 'ㅓ', position: '후설', lip: '평순', height: '중' },
  { id: 'v9', answer: 'ㅗ', position: '후설', lip: '원순', height: '중' },
  { id: 'v10', answer: 'ㅏ', position: '후설', lip: '평순', height: '저' },
];

const CONSONANT_SYSTEM: ConsonantCell[] = [
  // 입술소리
  { id: 'c1', answer: 'ㅂ', place: '입술', method: '파열음', intensity: '예사' },
  { id: 'c2', answer: 'ㅃ', place: '입술', method: '파열음', intensity: '된' },
  { id: 'c3', answer: 'ㅍ', place: '입술', method: '파열음', intensity: '거센' },
  { id: 'c4', answer: 'ㅁ', place: '입술', method: '비음', intensity: '없음' },
  // 잇몸소리
  { id: 'c5', answer: 'ㄷ', place: '잇몸', method: '파열음', intensity: '예사' },
  { id: 'c6', answer: 'ㄸ', place: '잇몸', method: '파열음', intensity: '된' },
  { id: 'c7', answer: 'ㅌ', place: '잇몸', method: '파열음', intensity: '거센' },
  { id: 'c8', answer: 'ㅅ', place: '잇몸', method: '마찰음', intensity: '예사' },
  { id: 'c9', answer: 'ㅆ', place: '잇몸', method: '마찰음', intensity: '된' },
  { id: 'c10', answer: 'ㄴ', place: '잇몸', method: '비음', intensity: '없음' },
  { id: 'c11', answer: 'ㄹ', place: '잇몸', method: '유음', intensity: '없음' },
  // 센입천장소리
  { id: 'c12', answer: 'ㅈ', place: '센입천장', method: '파찰음', intensity: '예사' },
  { id: 'c13', answer: 'ㅉ', place: '센입천장', method: '파찰음', intensity: '된' },
  { id: 'c14', answer: 'ㅊ', place: '센입천장', method: '파찰음', intensity: '거센' },
  // 여린입천장소리
  { id: 'c15', answer: 'ㄱ', place: '여린입천장', method: '파열음', intensity: '예사' },
  { id: 'c16', answer: 'ㄲ', place: '여린입천장', method: '파열음', intensity: '된' },
  { id: 'c17', answer: 'ㅋ', place: '여린입천장', method: '파열음', intensity: '거센' },
  { id: 'c18', answer: 'ㅇ', place: '여린입천장', method: '비음', intensity: '없음' },
  // 목청소리
  { id: 'c19', answer: 'ㅎ', place: '목청', method: '마찰음', intensity: '없음' },
];

// --- 유틸리티 ---

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// --- 메인 컴포넌트 ---

export default function App() {
  const [activeTab, setActiveTab] = useState<'vowel' | 'consonant'>('vowel');
  const [placedVowels, setPlacedVowels] = useState<Record<string, Vowel>>({});
  const [placedConsonants, setPlacedConsonants] = useState<Record<string, Consonant>>({});
  const [vowelPool, setVowelPool] = useState<Vowel[]>([]);
  const [consonantPool, setConsonantPool] = useState<Consonant[]>([]);
  const [shake, setShake] = useState<string | null>(null);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const resetGame = () => {
    setVowelPool(shuffle(VOWELS));
    setConsonantPool(shuffle(CONSONANTS));
    setPlacedVowels({});
    setPlacedConsonants({});
    setIsGameFinished(false);
    setShake(null);
  };

  // 초기 풀 섞기
  useEffect(() => {
    resetGame();
  }, [activeTab]);

  // 게임 완성 체크
  useEffect(() => {
    if (activeTab === 'vowel') {
      if (Object.keys(placedVowels).length === VOWELS.length && VOWELS.length > 0) {
        setIsGameFinished(true);
        triggerConfetti();
      }
    } else {
      if (Object.keys(placedConsonants).length === CONSONANTS.length && CONSONANTS.length > 0) {
        setIsGameFinished(true);
        triggerConfetti();
      }
    }
  }, [placedVowels, placedConsonants]);

  const triggerConfetti = () => {
    const colors = ['#f472b6', '#60a5fa', '#34d399', '#fbbf24', '#a78bfa'];
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.opacity = Math.random().toString();
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      document.body.appendChild(confetti);

      const animation = confetti.animate([
        { transform: `translate3d(0, 0, 0) rotate(0deg)`, opacity: 1 },
        { transform: `translate3d(${(Math.random() - 0.5) * 200 + 'px'}, 100vh, 0) rotate(${Math.random() * 360}deg)`, opacity: 0 }
      ], {
        duration: 2000 + Math.random() * 2000,
        easing: 'cubic-bezier(0, .9, .6, 1)',
        fill: 'forwards'
      });

      animation.onfinish = () => confetti.remove();
    }
  };

  // --- 포인터 이벤트 기반 드래그 앤 드롭 (모바일/데스크톱 모두 지원) ---
  
  const [dragInfo, setDragInfo] = useState<{
    active: boolean;
    item: string | null;
    x: number;
    y: number;
    startX: number;
    startY: number;
  }>({ active: false, item: null, x: 0, y: 0, startX: 0, startY: 0 });

  const handlePointerDown = (e: React.PointerEvent, item: string) => {
    if (isGameFinished) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setDragInfo({
      active: true,
      item,
      x: rect.left,
      y: rect.top,
      startX: e.clientX - rect.left,
      startY: e.clientY - rect.top,
    });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragInfo.active) return;
    setDragInfo(prev => ({
      ...prev,
      x: e.clientX - prev.startX,
      y: e.clientY - prev.startY
    }));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!dragInfo.active) return;
    
    // 드롭 대상 확인 (hit test)
    const elements = document.elementsFromPoint(e.clientX, e.clientY);
    const dropZone = elements.find(el => el.hasAttribute('data-drop-id'));
    
    if (dropZone) {
      const cellId = dropZone.getAttribute('data-drop-id')!;
      const answer = dropZone.getAttribute('data-answer')!;
      
      if (dragInfo.item === answer) {
        if (activeTab === 'vowel') {
          if (!placedVowels[cellId]) {
            setPlacedVowels(prev => ({ ...prev, [cellId]: dragInfo.item as Vowel }));
            setVowelPool(prev => prev.filter(v => v !== dragInfo.item));
            // 성공 사운드 느낌의 진동
            if (navigator.vibrate) navigator.vibrate(10);
          }
        } else {
          if (!placedConsonants[cellId]) {
            setPlacedConsonants(prev => ({ ...prev, [cellId]: dragInfo.item as Consonant }));
            setConsonantPool(prev => prev.filter(c => c !== dragInfo.item));
            if (navigator.vibrate) navigator.vibrate(10);
          }
        }
      } else {
        setShake(cellId);
        setTimeout(() => setShake(null), 300);
        if (navigator.vibrate) navigator.vibrate([50, 30, 50]);
      }
    }
    
    setDragInfo({ active: false, item: null, x: 0, y: 0, startX: 0, startY: 0 });
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center max-w-5xl mx-auto font-sans touch-none select-none bg-brand-bg">
      {/* Header */}
      <header className="w-full bg-white px-8 py-6 rounded-2xl border-2 border-brand-border mb-8 flex flex-col md:flex-row items-center justify-between shadow-sm">
        <div className="text-left">
          <h1 className="text-2xl md:text-3xl font-extrabold text-brand-dark flex items-center gap-3 tracking-tighter">
            국어 음운 체계 마스터 <span className="font-light opacity-60">| 20년 경력의 비법</span>
          </h1>
        </div>
        
        {/* Tabs inside header area as per theme */}
        <div className="flex bg-slate-100 p-1.5 rounded-[12px] mt-4 md:mt-0 shadow-inner">
          <button
            onClick={() => { setActiveTab('vowel'); setIsGameFinished(false); }}
            className={`px-6 py-2.5 rounded-[10px] font-bold text-sm transition-all duration-200 ${activeTab === 'vowel' ? 'bg-brand-success text-white shadow-lg' : 'bg-slate-200 text-brand-muted hover:bg-slate-300'}`}
          >
            단모음 체계표
          </button>
          <button
            onClick={() => { setActiveTab('consonant'); setIsGameFinished(false); }}
            className={`px-6 py-2.5 rounded-[10px] font-bold text-sm transition-all duration-200 ml-1.5 ${activeTab === 'consonant' ? 'bg-brand-success text-white shadow-lg' : 'bg-slate-200 text-brand-muted hover:bg-slate-300'}`}
          >
            자음 체계표
          </button>
        </div>
      </header>

      {/* Status Bar */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center mb-4 px-2 gap-4">
        <div className="text-brand-muted font-semibold text-sm flex items-center gap-2">
          <span className="w-2 h-2 bg-brand-success rounded-full animate-pulse" />
          {activeTab === 'vowel' ? '전설 모음과 후설 모음의 위치를 생각하며 드래그 해보세요!' : '조음 위치와 조음 방법을 구분하여 배치해보세요!'}
        </div>
        <div className="flex gap-4">
          <span className="text-sm font-bold text-brand-muted bg-white px-4 py-1.5 rounded-full border border-brand-border shadow-sm">
            진행도: <strong className="text-brand-success">{activeTab === 'vowel' ? Object.keys(placedVowels).length : Object.keys(placedConsonants).length} / {activeTab === 'vowel' ? VOWELS.length : CONSONANTS.length}</strong>
          </span>
          <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase border border-blue-100 shadow-sm">LV. 초급</span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="w-full geometric-card p-4 md:p-8 relative overflow-hidden">
        {/* Help Info */}
        <div className="mb-6 flex items-center gap-2 text-sm text-slate-500 bg-blue-50/50 p-3 rounded-xl border border-blue-100">
          <Info className="w-4 h-4 text-blue-500 shrink-0" />
          <span>하단의 음운 블록을 알맞은 빈칸으로 드래그 하세요.</span>
        </div>

        {activeTab === 'vowel' ? (
          <VowelTable 
            placed={placedVowels} 
            shakeId={shake}
          />
        ) : (
          <ConsonantTable 
            placed={placedConsonants} 
            shakeId={shake}
          />
        )}

        {/* Floating Reset Button */}
        <button 
          onClick={resetGame}
          className="absolute top-4 right-4 p-3 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-all active:rotate-180 duration-500"
          title="처음부터 다시하기"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </main>

      {/* Item Pool Area */}
      <div className="w-full mt-10 mb-20 px-4 md:px-0">
        <div className="flex flex-wrap justify-center gap-3 min-h-[140px] p-6 bg-white rounded-[20px] shadow-sm border-2 border-brand-border">
          <AnimatePresence mode="popLayout">
            {(activeTab === 'vowel' ? vowelPool : consonantPool).map((item) => (
              <motion.div
                key={item}
                layout
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
                onPointerDown={(e) => handlePointerDown(e, item)}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                className="w-14 h-14 md:w-16 md:h-16 bg-[#EBF4FF] border-2 border-[#BEE3F8] rounded-[12px] shadow-sm flex items-center justify-center text-2xl font-extrabold cursor-grab active:cursor-grabbing hover:border-blue-400 hover:scale-105 hover:shadow-xl transition-all duration-200 select-none text-blue-700 touch-none"
              >
                {item}
              </motion.div>
            ))}
          </AnimatePresence>
          {(activeTab === 'vowel' ? vowelPool : consonantPool).length === 0 && !isGameFinished && (
            <div className="flex items-center gap-3 text-brand-muted italic">
              <CheckCircle className="w-5 h-5 text-brand-success" />
              <span>모든 음운을 배치했습니다!</span>
            </div>
          )}
        </div>
      </div>

      {/* Drag Proxy */}
      {dragInfo.active && (
        <div 
          className="fixed z-100 w-16 h-16 bg-brand-success text-white border-2 border-white rounded-[12px] shadow-2xl flex items-center justify-center text-3xl font-black pointer-events-none scale-110"
          style={{ 
            left: dragInfo.x, 
            top: dragInfo.y,
            transition: 'none'
          }}
        >
          {dragInfo.item}
        </div>
      )}

      {/* Success Modal */}
      <AnimatePresence>
        {isGameFinished && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] p-10 md:p-14 text-center shadow-2xl max-w-sm w-full border border-white/20"
            >
              <div className="w-24 h-24 bg-gradient-to-tr from-brand-success to-emerald-300 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-brand-success/30 rotate-12">
                <Trophy className="w-12 h-12 text-white -rotate-12" />
              </div>
              <h2 className="text-3xl font-black text-brand-dark mb-3 tracking-tighter">완벽하게 외웠어요!</h2>
              <p className="text-brand-muted mb-10 leading-relaxed font-medium">
                {activeTab === 'vowel' ? '단모음' : '자음'} 체계를 마스터하셨네요!<br/>여러분의 정성이 정말 대단해요. 👏
              </p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={resetGame}
                  className="w-full bg-brand-success hover:bg-emerald-600 text-white text-lg font-bold py-4 rounded-[16px] shadow-lg shadow-brand-success/20 transition-all active:scale-[0.98]"
                >
                  명예의 전당 도전하기
                </button>
                <button 
                  onClick={() => setIsGameFinished(false)}
                  className="w-full text-slate-400 hover:text-slate-600 py-2 text-sm font-semibold"
                >
                  성적표 확인하기
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Vowel Table Subcomponent ---

function VowelTable({ placed, shakeId }: { 
  placed: Record<string, Vowel>, 
  shakeId: string | null 
}) {
  const heights: ('고' | '중' | '저')[] = ['고', '중', '저'];
  const sections: { pos: '전설' | '후설', lips: ('평순' | '원순')[] }[] = [
    { pos: '전설', lips: ['평순', '원순'] },
    { pos: '후설', lips: ['평순', '원순'] }
  ];

  return (
    <div className="w-full overflow-x-auto pb-6">
      <div className="grid grid-cols-[120px_1fr_1fr_1fr_1fr] gap-[4px] border-2 border-brand-bg rounded-xl overflow-hidden bg-brand-bg shadow-inner">
        <div className="bg-white flex items-center justify-center font-bold text-xs text-brand-muted">구분</div>
        <div className="col-span-2 bg-white flex items-center justify-center font-black text-sm text-brand-dark p-3">전설 모음 (앞)</div>
        <div className="col-span-2 bg-white flex items-center justify-center font-black text-sm text-brand-dark p-3">후설 모음 (뒤)</div>
        
        <div className="bg-[#F7FAFC] flex items-center justify-center font-bold text-xs text-brand-muted">혀의 높이</div>
        <div className="bg-[#F7FAFC] flex items-center justify-center font-bold text-[10px] text-brand-muted uppercase">평순</div>
        <div className="bg-[#F7FAFC] flex items-center justify-center font-bold text-[10px] text-brand-muted uppercase">원순</div>
        <div className="bg-[#F7FAFC] flex items-center justify-center font-bold text-[10px] text-brand-muted uppercase">평순</div>
        <div className="bg-[#F7FAFC] flex items-center justify-center font-bold text-[10px] text-brand-muted uppercase">원순</div>

        {heights.map((h) => (
          <div key={h} className="contents">
            <div className="bg-white flex items-center justify-center font-black text-sm text-brand-dark h-20 border-r border-brand-bg">
              {h}모음
            </div>
            {VOWEL_SYSTEM.filter(cell => cell.height === h).map((cell) => {
              const isPlaced = !!placed[cell.id];
              const isShaking = shakeId === cell.id;
              
              return (
                <div 
                  key={cell.id} 
                  className={`bg-white flex items-center justify-center relative ${isPlaced ? '' : 'border border-dashed border-[#BCCCDC]'}`}
                  data-drop-id={cell.id}
                  data-answer={cell.answer}
                >
                  <div className={`
                    w-14 h-14 md:w-16 md:h-16 rounded-[12px] flex items-center justify-center transition-all duration-300 pointer-events-none
                    ${isPlaced ? 'bg-brand-success text-white animate-pop shadow-md scale-100' : 'bg-transparent text-transparent'}
                    ${isShaking ? 'animate-shake bg-red-50 border-2 border-red-200' : ''}
                  `}>
                    <span className="text-2xl font-black">{isPlaced ? placed[cell.id] : '?'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Consonant Table Subcomponent ---

function ConsonantTable({ placed, shakeId }: { 
  placed: Record<string, Consonant>, 
  shakeId: string | null 
}) {
  const places: ('입술' | '잇몸' | '센입천장' | '여린입천장' | '목청')[] = ['입술', '잇몸', '센입천장', '여린입천장', '목청'];
  
  const getCell = (place: string, method: string, intensity: string) => {
    return CONSONANT_SYSTEM.find(c => c.place === place && c.method === method && (c.intensity === intensity || c.intensity === '없음'));
  };

  return (
    <div className="w-full overflow-x-auto pb-6">
      <div className="grid grid-cols-[120px_60px_repeat(5,1fr)] gap-[2px] border-2 border-brand-bg rounded-xl overflow-hidden bg-brand-bg shadow-inner min-w-[900px]">
        {/* Headers */}
        <div className="col-span-2 bg-[#F7FAFC] flex items-center justify-center font-bold text-xs text-brand-muted p-2">조음 방법 \ 위치</div>
        {places.map(p => (
          <div key={p} className="bg-[#EBF8FF] flex items-center justify-center font-black text-xs text-blue-600 p-2 uppercase tracking-widest">{p}</div>
        ))}

        {/* Rows */}
        {['파열음', '파찰음', '마찰음'].map(methodName => {
          const subs = methodName === '마찰음' ? ['예사', '된'] : ['예사', '된', '거센'];
          return (
            subs.map((intensity, idx) => (
              <div key={`${methodName}-${intensity}`} className="contents">
                {idx === 0 && (
                  <div 
                    className="bg-white flex items-center justify-center font-black text-sm text-brand-dark border-r border-brand-bg px-2 text-center"
                    style={{ gridRow: `span ${subs.length}` }}
                  >
                    {methodName}
                  </div>
                )}
                <div className="bg-[#F7FAFC] flex items-center justify-center font-bold text-[9px] text-brand-muted uppercase border-r border-brand-bg h-14">
                  {intensity}
                </div>
                {places.map(place => {
                  const hCell = methodName === '마찰음' && place === '목청' && intensity === '예사';
                  const cellData = hCell ? CONSONANT_SYSTEM.find(c => c.answer === 'ㅎ') : getCell(place, methodName, intensity);
                  
                  const isPlaced = cellData ? !!placed[cellData.id] : false;
                  const isShaking = cellData ? shakeId === cellData.id : false;

                  if (!cellData) return <div key={place} className="bg-white opacity-40"></div>;

                  return (
                    <div 
                      key={place} 
                      className="bg-white flex items-center justify-center relative"
                      data-drop-id={cellData.id}
                      data-answer={cellData.answer}
                    >
                      <div className={`
                        w-11 h-11 rounded-[10px] flex items-center justify-center transition-all duration-300 pointer-events-none
                        ${isPlaced ? 'bg-brand-success text-white animate-pop shadow-sm' : 'bg-transparent border border-dashed border-[#BCCCDC]'}
                        ${isShaking ? 'animate-shake bg-red-50 border-2 border-red-200' : ''}
                      `}>
                        <span className="text-xl font-black">{isPlaced ? placed[cellData.id] : ''}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))
          );
        })}
        {['비음', '유음'].map((methodName) => (
          <div key={methodName} className="contents">
            <div className="col-span-2 bg-white flex items-center justify-center font-black text-sm text-brand-dark h-14 border-t border-brand-bg">
              {methodName}
            </div>
            {places.map(place => {
              const cell = CONSONANT_SYSTEM.find(c => c.place === place && c.method === methodName);
              const isPlaced = cell ? !!placed[cell.id] : false;
              const isShaking = cell ? shakeId === cell.id : false;

              if (!cell) return <div key={place} className="bg-white opacity-40 border-t border-brand-bg"></div>;

              return (
                <div 
                  key={place} 
                  className="bg-white flex items-center justify-center relative border-t border-brand-bg"
                  data-drop-id={cell.id}
                  data-answer={cell.answer}
                >
                  <div className={`
                    w-11 h-11 rounded-[10px] flex items-center justify-center transition-all duration-300 pointer-events-none
                    ${isPlaced ? 'bg-brand-success text-white animate-pop shadow-sm' : 'bg-transparent border border-dashed border-[#BCCCDC]'}
                    ${isShaking ? 'animate-shake bg-red-50 border-2 border-red-200' : ''}
                  `}>
                    <span className="text-xl font-black">{isPlaced ? placed[cell.id] : ''}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

