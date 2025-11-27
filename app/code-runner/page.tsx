'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ViewCounter } from '@/components/common';

const GAME_WIDTH = 375;
const GAME_HEIGHT = 580;

interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
}

interface Bug {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  type: string;
  dodged?: boolean;
}

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
}

export default function CodeRunner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState('');
  const [inputName, setInputName] = useState('');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const scoreRef = useRef(0);
  const timeAlive = useRef(0);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const savedName = localStorage.getItem('codeRunnerName');
    if (savedName) setName(savedName);

    const savedHighScore = localStorage.getItem('codeRunnerHighScore');
    if (savedHighScore) setHighScore(parseInt(savedHighScore));
  }, []);

  useEffect(() => {
    if (!name) return;
    startGame();
    fetchLeaderboard();
  }, [name]);

  const startGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let bugTimer: NodeJS.Timeout;
    let bossTimer: NodeJS.Timeout;
    let gameActive = true;
    let lastScoreTime = Date.now();

    const player: Player = {
      x: GAME_WIDTH / 2 - 20,
      y: GAME_HEIGHT - 60,
      width: 40,
      height: 40,
      speed: 5,
    };
    let bugs: Bug[] = [];
    const keys: { [key: string]: boolean } = {};

    // Keyboard controls
    window.addEventListener('keydown', (e) => (keys[e.key] = true));
    window.addEventListener('keyup', (e) => (keys[e.key] = false));

    // Touch controls
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      touchX.current = e.touches[0].clientX - canvas.getBoundingClientRect().left;
    });
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      touchX.current = e.touches[0].clientX - canvas.getBoundingClientRect().left;
    });
    canvas.addEventListener('touchend', () => {
      touchX.current = null;
    });

    const getBugType = (): Bug => {
      const rand = Math.random();
      if (rand < 0.4) {
        return { type: 'basic', speed: 2 + timeAlive.current * 0.02, width: 30, height: 30 } as Bug;
      } else if (rand < 0.6) {
        return { type: 'fast', speed: 4 + timeAlive.current * 0.03, width: 25, height: 25 } as Bug;
      } else if (rand < 0.75) {
        return { type: 'tank', speed: 1.5 + timeAlive.current * 0.015, width: 40, height: 40 } as Bug;
      } else if (rand < 0.9) {
        return { type: 'spider', speed: 2.5 + timeAlive.current * 0.02, width: 30, height: 30 } as Bug;
      } else {
        return { type: 'kamikaze', speed: 6 + timeAlive.current * 0.04, width: 20, height: 20 } as Bug;
      }
    };

    const gameLoop = () => {
      if (!gameActive) return;

      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      ctx.font = '40px Arial';
      ctx.fillText('👨‍💻', player.x, player.y);

      // Handle keyboard movement
      if (keys['ArrowLeft'] && player.x > 0) player.x -= player.speed;
      if (keys['ArrowRight'] && player.x < GAME_WIDTH - player.width) player.x += player.speed;

      // Handle touch movement
      if (touchX.current !== null) {
        const targetX = touchX.current - player.width / 2;
        if (targetX > 0 && targetX < GAME_WIDTH - player.width) {
          player.x += (targetX - player.x) * 0.2; // Smooth movement
        }
      }

      bugs.forEach((bug, index) => {
        bug.y += bug.speed;
        const emoji = bug.type === 'basic' ? '💾'      // basic bug - floppy disk, old tech vibes
          : bug.type === 'fast' ? '⚙️'      // fast bug - gears, moving parts
            : bug.type === 'tank' ? '🖥️'     // tank bug - heavy computer/server
              : bug.type === 'spider' ? '🧬'
                : '❓';
        ctx.fillText(emoji, bug.x, bug.y);

        if (
          player.x < bug.x + bug.width &&
          player.x + player.width > bug.x &&
          player.y < bug.y + bug.height &&
          player.y + player.height > bug.y
        ) {
          gameActive = false;
          cancelAnimationFrame(animationFrameId);
          clearInterval(bugTimer);
          clearInterval(bossTimer);
          setGameOver(true);
          if (scoreRef.current > highScore) {
            setHighScore(scoreRef.current);
            localStorage.setItem('codeRunnerHighScore', scoreRef.current.toString());
          }
          setScore(scoreRef.current);
          storeScore(name, scoreRef.current);
          return;
        }

        if (bug.y > player.y && !bug.dodged) {
          bug.dodged = true;
          scoreRef.current += 5;
          setScore(scoreRef.current);
        }

        if (bug.y > GAME_HEIGHT) {
          bugs.splice(index, 1);
        }
      });

      const now = Date.now();
      if (now - lastScoreTime >= 1000) {
        scoreRef.current += 1;
        timeAlive.current += 1;
        setScore(scoreRef.current);
        lastScoreTime = now;
      }

      if (gameActive) {
        animationFrameId = requestAnimationFrame(gameLoop);
      }
    };

    const spawnBug = () => {
      if (!gameActive) return;
      const base = getBugType();
      const bug: Bug = {
        x: Math.random() * (GAME_WIDTH - base.width),
        y: -base.height,
        width: base.width,
        height: base.height,
        speed: base.speed,
        type: base.type,
        dodged: false,
      };
      bugs.push(bug);
    };

    const spawnBossBug = () => {
      if (!gameActive) return;
      const bug: Bug = {
        x: Math.random() * (GAME_WIDTH - 50),
        y: -50,
        width: 50,
        height: 50,
        speed: 5 + timeAlive.current * 0.02,
        type: 'boss',
        dodged: false,
      };
      bugs.push(bug);
    };

    gameLoop();
    bugTimer = setInterval(spawnBug, Math.max(400, 1500 - timeAlive.current * 10));
    bossTimer = setInterval(spawnBossBug, 20000);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(bugTimer);
      clearInterval(bossTimer);
      window.removeEventListener('keydown', () => { });
      window.removeEventListener('keyup', () => { });
      canvas.removeEventListener('touchstart', () => { });
      canvas.removeEventListener('touchmove', () => { });
      canvas.removeEventListener('touchend', () => { });
    };
  };

  const storeScore = async (name: string, score: number) => {
    try {
      console.log('Checking score before POST:', { name, score });
      if (score === 0) {
        console.log('Score is 0, skipping leaderboard entry');
        fetchLeaderboard();
        return;
      }

      console.log('POST /api/leaderboard:', { name, score });
      const response = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, score }),
      });

      const text = await response.text();
      if (!response.ok) {
        console.error('Store score failed:', { status: response.status, text });
        return;
      }

      console.log('Score stored:', text);
      fetchLeaderboard();
    } catch (err) {
      console.error('Store score network error:', err);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      console.log('GET /api/leaderboard');
      const response = await fetch('/api/leaderboard', { method: 'GET' });
      const text = await response.text();
      if (!response.ok) {
        throw new Error(`Fetch leaderboard failed: ${text || 'No body'} (Status: ${response.status})`);
      }
      const data = JSON.parse(text);
      console.log('Leaderboard data:', data);
      setLeaderboard(data);
    } catch (err) {
      console.error('Fetch leaderboard error:', err);
    }
  };

  const handleNameSubmit = () => {
    if (!inputName.trim()) return;
    localStorage.setItem('codeRunnerName', inputName.trim());
    setName(inputName.trim());
  };

  if (!name) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4 bg-background">
        <div className="bg-card p-8 rounded-lg shadow-lg shadow-primary/15 border border-border text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground  text-tracking-tight">Code Runner - Enter Your Name</h1>
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            className="border border-border rounded-lg shadow-sm shadow-primary/15 px-4 py-2 w-full max-w-sm bg-background dark:bg-background text-foreground placeholder:text-muted-foreground focus-ring transition-colors" 
            placeholder="Your coder alias"
          />
          <button
            onClick={handleNameSubmit}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors focus-ring font-medium shadow-sm shadow-primary/15"
          >
            Start Coding
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-4">
      
      <div className="flex items-center justify-between">
        <Link 
          href="/projects" 
          className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors focus-ring rounded-lg"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Link>
        <div className="flex items-center text-sm text-muted-foreground">
          <ViewCounter slug="code-runner" readOnly={false} />
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 w-full">
        <h1 className="text-3xl font-bold text-foreground  text-tracking-tight">Code Runner</h1>
        <p className="text-sm text-muted-foreground">Welcome, <span className="text-primary font-medium">{name}</span>!</p>
        <div className="flex gap-4 text-foreground">
          <p className="bg-secondary text-secondary-foreground px-3 py-1 rounded-lg border border-border">
            Score: <span className="font-bold text-primary">{score}</span>
          </p>
          <p className="bg-secondary text-secondary-foreground px-3 py-1 rounded-lg border border-border">
            High Score: <span className="font-bold text-chart-1">{highScore}</span>
          </p>
        </div>
        <div
          ref={containerRef}
          className="w-full max-w-[390px]"
          style={{
            aspectRatio: `${GAME_WIDTH}/${GAME_HEIGHT}`,
          }}
        >
          <canvas
            ref={canvasRef}
            width={GAME_WIDTH}
            height={GAME_HEIGHT}
            className="border border-border rounded-lg w-full h-full touch-none shadow-lg shadow-primary/15"
          />
        </div>
        {gameOver && (
          <div className="space-y-4 bg-card p-6 rounded-lg border border-border shadow-md shadow-primary/15 text-center">
            <p className="text-xl font-bold text-foreground">Game Over!</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setGameOver(false);
                  setScore(0);
                  scoreRef.current = 0;
                  startGame();
                }}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors focus-ring font-medium shadow-sm shadow-primary/15"
              >
                Run Again
              </button>
            </div>
          </div>
        )}
        <div className="text-sm text-muted-foreground text-center px-4 py-2 rounded-lg border border-border">
          Use arrow keys or touch to dodge bugs
        </div>

        <div className="w-full max-w-md mt-8 bg-card p-6 rounded-lg border border-border shadow-md shadow-primary/15">
          <h2 className="text-xl font-bold mb-4 text-foreground  text-tracking-normal">🏆 Leaderboard (Top 10)</h2>
          <ul className="space-y-2 text-sm">
            {leaderboard.map((entry, index) => (
              <li 
                key={entry.id} 
                className={`flex justify-between p-2 rounded-lg transition-colors ${
                  index === 0 
                    ? 'bg-chart-1/10 text-chart-1 border border-chart-1/20' 
                    : index === 1 
                      ? 'bg-chart-2/10 text-chart-2 border border-chart-2/20'
                      : index === 2
                        ? 'bg-chart-3/10 text-chart-6 border border-chart-6/20'
                        : 'bg-secondary dark:bg-secondary/80 text-secondary-foreground border border-border'
                }`}
              >
                <span className="font-medium">
                  {index + 1}. {entry.name}
                  {index === 0 && ' 👑'}
                  {index === 1 && ' 🥈'}
                  {index === 2 && ' 🥉'}
                </span>
                <span className="font-bold">{entry.score}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}