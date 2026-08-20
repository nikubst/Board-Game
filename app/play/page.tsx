'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { soundFx } from '@/lib/audio';
import { getStoredPrefs, savePrefs, Language } from '@/lib/storage';
import { Gamepad2, Volume2, VolumeX, Sparkles, RefreshCw, Trophy, Crown } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PlayArenaPage() {
  const [lang, setLang] = useState<Language>('fa');
  const [muted, setMuted] = useState(false);
  const [activeGame, setActiveGame] = useState<'connect4' | 'tictactoe' | 'memory'>('connect4');

  useEffect(() => {
    const prefs = getStoredPrefs();
    setLang(prefs.lang);
    setMuted(prefs.muted);
    soundFx.setMuted(prefs.muted);
  }, []);

  const handleToggleLang = () => {
    const newLang = lang === 'fa' ? 'en' : 'fa';
    setLang(newLang);
    savePrefs({ lang: newLang });
  };

  const handleToggleMute = () => {
    const newMute = !muted;
    setMuted(newMute);
    soundFx.setMuted(newMute);
    savePrefs({ muted: newMute });
  };

  const isFa = lang === 'fa';

  // --- CONNECT 4 ENGINE ---
  const [c4Board, setC4Board] = useState<(number | null)[][]>(Array(6).fill(null).map(() => Array(7).fill(null)));
  const [c4Turn, setC4Turn] = useState<number>(1); // 1 = Red, 2 = Yellow
  const [c4Winner, setC4Winner] = useState<number | null>(null);

  const resetC4 = () => {
    setC4Board(Array(6).fill(null).map(() => Array(7).fill(null)));
    setC4Turn(1);
    setC4Winner(null);
    soundFx.playClick();
  };

  const checkC4Win = (board: (number | null)[][]) => {
    // Rows
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        const val = board[r][c];
        if (val && val === board[r][c+1] && val === board[r][c+2] && val === board[r][c+3]) return val;
      }
    }
    // Cols
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 7; c++) {
        const val = board[r][c];
        if (val && val === board[r+1][c] && val === board[r+2][c] && val === board[r+3][c]) return val;
      }
    }
    // Diag Down
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        const val = board[r][c];
        if (val && val === board[r+1][c+1] && val === board[r+2][c+2] && val === board[r+3][c+3]) return val;
      }
    }
    // Diag Up
    for (let r = 3; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        const val = board[r][c];
        if (val && val === board[r-1][c+1] && val === board[r-2][c+2] && val === board[r-3][c+3]) return val;
      }
    }
    return null;
  };

  const dropC4Chip = (colIndex: number) => {
    if (c4Winner) return;
    const newBoard = c4Board.map(row => [...row]);
    
    // Find lowest empty spot
    let targetRow = -1;
    for (let r = 5; r >= 0; r--) {
      if (newBoard[r][colIndex] === null) {
        targetRow = r;
        break;
      }
    }

    if (targetRow === -1) return; // Column full

    newBoard[targetRow][colIndex] = c4Turn;
    setC4Board(newBoard);
    soundFx.playMove();

    const win = checkC4Win(newBoard);
    if (win) {
      setC4Winner(win);
      soundFx.playWin();
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } else {
      setC4Turn(c4Turn === 1 ? 2 : 1);
    }
  };

  // --- TIC TAC TOE ENGINE ---
  const [tttBoard, setTttBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [tttTurn, setTttTurn] = useState<'X' | 'O'>('X');
  const [tttWinner, setTttWinner] = useState<string | null>(null);

  const resetTTT = () => {
    setTttBoard(Array(9).fill(null));
    setTttTurn('X');
    setTttWinner(null);
    soundFx.playClick();
  };

  const checkTTTWin = (board: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    if (board.every(cell => cell !== null)) return 'draw';
    return null;
  };

  const handleTTTClick = (index: number) => {
    if (tttBoard[index] || tttWinner) return;

    const newBoard = [...tttBoard];
    newBoard[index] = tttTurn;
    setTttBoard(newBoard);
    soundFx.playMove();

    const win = checkTTTWin(newBoard);
    if (win) {
      setTttWinner(win);
      if (win !== 'draw') {
        soundFx.playWin();
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      }
    } else {
      setTttTurn(tttTurn === 'X' ? 'O' : 'X');
    }
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 ${isFa ? 'rtl' : 'ltr'}`} dir={isFa ? 'rtl' : 'ltr'}>
      <Navbar lang={lang} onToggleLang={handleToggleLang} />

      {/* Header Banner */}
      <div className="bg-slate-900/80 border-b border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
              <Gamepad2 className="w-4 h-4" />
              <span>{isFa ? 'تست و بازی آنلاین رومیزی' : 'Playable Board Game Arena'}</span>
            </div>
            <h1 className="text-3xl font-black text-slate-100 mt-2">
              {isFa ? 'میدان بازی‌های آنلاین تعاملی' : 'Interactive Online Games Arena'}
            </h1>
          </div>

          <button
            onClick={handleToggleMute}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-amber-400 hover:bg-slate-900 transition-colors"
          >
            {muted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            <span>{muted ? (isFa ? 'صدا غیرفعال' : 'Muted') : (isFa ? 'صدا فعال' : 'Sound ON')}</span>
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Game Switcher Tabs */}
        <div className="flex items-center justify-center gap-3 bg-slate-900 p-2 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveGame('connect4')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeGame === 'connect4'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isFa ? 'چهار در یک خط (Connect 4)' : 'Connect 4'}
          </button>
          <button
            onClick={() => setActiveGame('tictactoe')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeGame === 'tictactoe'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isFa ? 'دوز کلاسیک (Tic-Tac-Toe)' : 'Tic-Tac-Toe'}
          </button>
        </div>

        {/* CONNECT 4 BOARD VIEW */}
        {activeGame === 'connect4' && (
          <div className="bg-slate-900/80 p-6 md:p-8 rounded-3xl border border-slate-800 space-y-6 max-w-xl mx-auto text-center">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="text-xs font-bold text-slate-300">
                {c4Winner
                  ? (isFa ? `برنده: بازیکن ${c4Winner === 1 ? 'قرمز 🔴' : 'زرد 🟡'}` : `Winner: Player ${c4Winner === 1 ? 'Red 🔴' : 'Yellow 🟡'}`)
                  : (isFa ? `نوبت: بازیکن ${c4Turn === 1 ? 'قرمز 🔴' : 'زرد 🟡'}` : `Turn: Player ${c4Turn === 1 ? 'Red 🔴' : 'Yellow 🟡'}`)}
              </span>

              <button
                onClick={resetC4}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-bold text-amber-400 hover:bg-slate-900"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{isFa ? 'بازی جدید' : 'New Game'}</span>
              </button>
            </div>

            {/* Connect 4 Matrix Grid */}
            <div className="bg-blue-900/60 p-4 rounded-2xl border-4 border-blue-800 shadow-2xl grid grid-cols-7 gap-2">
              {Array(7).fill(null).map((_, colIdx) => (
                <button
                  key={colIdx}
                  onClick={() => dropC4Chip(colIdx)}
                  className="flex flex-col gap-2 p-1 hover:bg-blue-800/40 rounded-xl transition-colors"
                >
                  {Array(6).fill(null).map((_, rowIdx) => {
                    const val = c4Board[rowIdx][colIdx];
                    return (
                      <div
                        key={rowIdx}
                        className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-slate-950 transition-all ${
                          val === 1
                            ? 'bg-rose-500 shadow-md shadow-rose-500/50 scale-105'
                            : val === 2
                            ? 'bg-amber-400 shadow-md shadow-amber-400/50 scale-105'
                            : 'bg-slate-950'
                        }`}
                      />
                    );
                  })}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TIC TAC TOE BOARD VIEW */}
        {activeGame === 'tictactoe' && (
          <div className="bg-slate-900/80 p-6 md:p-8 rounded-3xl border border-slate-800 space-y-6 max-w-sm mx-auto text-center">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="text-xs font-bold text-slate-300">
                {tttWinner
                  ? tttWinner === 'draw'
                    ? (isFa ? 'بازی مساوی شد! 🤝' : 'Game Draw! 🤝')
                    : (isFa ? `برنده: بازیکن ${tttWinner} 🎉` : `Winner: Player ${tttWinner} 🎉`)
                  : (isFa ? `نوبت: بازیکن ${tttTurn}` : `Turn: Player ${tttTurn}`)}
              </span>

              <button
                onClick={resetTTT}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-bold text-amber-400 hover:bg-slate-900"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{isFa ? 'شروع مجدد' : 'Reset'}</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
              {tttBoard.map((cell, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTTTClick(idx)}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-3xl font-black flex items-center justify-center transition-all"
                >
                  <span className={cell === 'X' ? 'text-amber-400' : 'text-sky-400'}>
                    {cell}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      <Footer lang={lang} />
    </div>
  );
}
