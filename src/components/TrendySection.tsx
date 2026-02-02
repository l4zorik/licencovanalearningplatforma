"use client";

import { useState, useEffect } from 'react';
import { Card, Badge, Button, Modal, Row, Col, ListGroup, ProgressBar } from 'react-bootstrap';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

type TrendingItem = {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  previousNames?: string[];
  openclawSkills?: string[];
  cliCommands?: { command: string; description: string }[];
  installationUrl?: string;
  growth: 'rising' | 'stable' | 'declining';
  growthPercent: number;
  description: string;
  relatedSkills: string[];
  maturity: 'emerging' | 'growing' | 'maturing' | 'established';
  opportunities: number;
  salary: string;
  why: string;
  resources: { name: string; url: string }[];
  growthHistory?: { month: string; value: number }[];
};

const TREND_DATA: TrendingItem[] = [
  {
    id: 'ai-game-engine',
    name: 'AI-Powered Game Engines',
    category: 'Gaming & AI',
    growth: 'rising',
    growthPercent: 156,
    description: 'Game engines integrated with AI for procedural generation, smart NPCs, and adaptive gameplay.',
    relatedSkills: ['Unreal Engine', 'Python', 'Machine Learning', 'C++'],
    maturity: 'emerging',
    opportunities: 85,
    salary: '90k-150k',
    why: 'NPCs that learn and adapt, infinite procedural worlds, AI-driven balance',
    resources: [
      { name: 'Unreal AI Documentation', url: 'https://docs.unrealengine.com/' },
      { name: 'Game AI Pro Book', url: 'https://www.amazon.com/' }
    ],
    growthHistory: [
      { month: 'Led', value: 45 },
      { month: 'Úno', value: 52 },
      { month: 'Bře', value: 68 },
      { month: 'Dub', value: 85 },
      { month: 'Kvě', value: 102 },
      { month: 'Čer', value: 125 },
      { month: 'Čvc', value: 156 }
    ]
  },
  {
    id: 'claude-code',
    name: 'Claude Code & AI Coding',
    category: 'AI Development',
    growth: 'rising',
    growthPercent: 234,
    description: 'AI-powered coding assistants that can modify files, run commands, and manage repositories.',
    relatedSkills: ['Claude', 'CLI', 'Python', 'Git'],
    maturity: 'growing',
    opportunities: 92,
    salary: '70k-130k',
    why: '40% faster development, automated refactoring, intelligent code review',
    resources: [
      { name: 'Claude Code Docs', url: 'https://docs.anthropic.com/' },
      { name: 'Aider Chat', url: 'https://aider.chat/' }
    ],
    growthHistory: [
      { month: 'Led', value: 35 },
      { month: 'Úno', value: 55 },
      { month: 'Bře', value: 89 },
      { month: 'Dub', value: 125 },
      { month: 'Kvě', value: 168 },
      { month: 'Čer', value: 210 },
      { month: 'Čvc', value: 234 }
    ]
  },
  {
    id: 'open-code',
    name: 'Open Source AI CLI Tools',
    category: 'AI Development',
    growth: 'rising',
    growthPercent: 189,
    description: 'Self-hosted AI coding assistants for privacy and customization.',
    relatedSkills: ['OpenCode', 'Ollama', 'Local LLMs', 'CLI'],
    maturity: 'emerging',
    opportunities: 78,
    salary: '65k-110k',
    why: 'Full privacy, no API costs, custom model fine-tuning',
    resources: [
      { name: 'OpenCode.ai', url: 'https://opencode.ai/' },
      { name: 'Ollama', url: 'https://ollama.com/' }
    ],
    growthHistory: [
      { month: 'Led', value: 25 },
      { month: 'Úno', value: 42 },
      { month: 'Bře', value: 65 },
      { month: 'Dub', value: 95 },
      { month: 'Kvě', value: 128 },
      { month: 'Čer', value: 158 },
      { month: 'Čvc', value: 189 }
    ]
  },
  {
    id: 'agentic-ai',
    name: 'Agentic AI Systems',
    category: 'AI Development',
    growth: 'rising',
    growthPercent: 312,
    description: 'AI agents that can autonomously plan, execute tasks, and learn from feedback.',
    relatedSkills: ['LangChain', 'AutoGPT', 'Python', 'API Integration'],
    maturity: 'emerging',
    opportunities: 88,
    salary: '85k-140k',
    why: 'Autonomous task completion, workflow automation, intelligent agents',
    resources: [
      { name: 'LangChain Docs', url: 'https://python.langchain.com/' },
      { name: 'AutoGPT', url: 'https://github.com/Significant-Gravitas/AutoGPT' }
    ],
    growthHistory: [
      { month: 'Led', value: 18 },
      { month: 'Úno', value: 35 },
      { month: 'Bře', value: 68 },
      { month: 'Dub', value: 112 },
      { month: 'Kvě', value: 175 },
      { month: 'Čer', value: 245 },
      { month: 'Čvc', value: 312 }
    ]
  },
  {
    id: 'vibe-coding',
    name: 'Vibe Coding',
    category: 'Development Methodology',
    growth: 'rising',
    growthPercent: 278,
    description: 'AI-assisted coding where developers describe intent and AI generates implementation.',
    relatedSkills: ['Prompt Engineering', 'AI Tools', 'Code Review', 'Architecture'],
    maturity: 'growing',
    opportunities: 95,
    salary: '75k-120k',
    why: '10x productivity, focus on architecture over syntax, rapid prototyping',
    resources: [
      { name: 'Vibe Coding Guide', url: 'https://github.com/' }
    ],
    growthHistory: [
      { month: 'Led', value: 22 },
      { month: 'Úno', value: 45 },
      { month: 'Bře', value: 78 },
      { month: 'Dub', value: 118 },
      { month: 'Kvě', value: 175 },
      { month: 'Čer', value: 225 },
      { month: 'Čvc', value: 278 }
    ]
  },
  {
    id: 'webGPU',
    name: 'WebGPU Development',
    category: 'Web Development',
    growth: 'rising',
    growthPercent: 145,
    description: 'Next-gen GPU API for web browsers enabling high-performance graphics and compute.',
    relatedSkills: ['WebGPU', 'Rust', 'TypeScript', 'Graphics Programming'],
    maturity: 'growing',
    opportunities: 65,
    salary: '80k-130k',
    why: 'Native GPU performance in browser, AI inference on client, AAA web games',
    resources: [
      { name: 'WebGPU Spec', url: 'https://www.w3.org/TR/webgpu/' },
      { name: 'WebGPU Fundamentals', url: 'https://developer.mozilla.org/' }
    ],
    growthHistory: [
      { month: 'Led', value: 40 },
      { month: 'Úno', value: 52 },
      { month: 'Bře', value: 68 },
      { month: 'Dub', value: 85 },
      { month: 'Kvě', value: 105 },
      { month: 'Čer', value: 125 },
      { month: 'Čvc', value: 145 }
    ]
  },
  {
    id: 'edge-ai',
    name: 'Edge AI & On-Device ML',
    category: 'AI & Hardware',
    growth: 'rising',
    growthPercent: 198,
    description: 'Running machine learning models directly on devices for privacy and latency.',
    relatedSkills: ['TensorFlow Lite', 'ONNX', 'C++', 'Embedded Systems'],
    maturity: 'growing',
    opportunities: 72,
    salary: '85k-135k',
    why: 'Zero latency, offline capability, data privacy, cost savings',
    resources: [
      { name: 'TensorFlow Lite', url: 'https://www.tensorflow.org/lite' },
      { name: 'ONNX Runtime', url: 'https://onnxruntime.ai/' }
    ],
    growthHistory: [
      { month: 'Led', value: 32 },
      { month: 'Úno', value: 48 },
      { month: 'Bře', value: 72 },
      { month: 'Dub', value: 98 },
      { month: 'Kvě', value: 135 },
      { month: 'Čer', value: 168 },
      { month: 'Čvc', value: 198 }
    ]
  },
  {
    id: 'quantum-ml',
    name: 'Quantum Machine Learning',
    category: 'AI & Quantum',
    growth: 'rising',
    growthPercent: 167,
    description: 'Combining quantum computing with ML for solving complex problems faster.',
    relatedSkills: ['Quantum Computing', 'Python', 'Linear Algebra', 'Q#'],
    maturity: 'emerging',
    opportunities: 45,
    salary: '100k-180k',
    why: 'Exponential speedup for specific problems, next-gen cryptography',
    resources: [
      { name: 'Qiskit', url: 'https://qiskit.org/' },
      { name: 'PennyLane', url: 'https://pennylane.ai/' }
    ],
    growthHistory: [
      { month: 'Led', value: 28 },
      { month: 'Úno', value: 42 },
      { month: 'Bře', value: 58 },
      { month: 'Dub', value: 85 },
      { month: 'Kvě', value: 112 },
      { month: 'Čer', value: 142 },
      { month: 'Čvc', value: 167 }
    ]
  },
  {
    id: 'spatial-computing',
    name: 'Spatial Computing',
    category: 'AR/VR',
    growth: 'rising',
    growthPercent: 134,
    description: 'Computing that interacts with the physical world in 3D space.',
    relatedSkills: ['AR/VR', 'Unity', 'Computer Vision', 'UX Design'],
    maturity: 'growing',
    opportunities: 68,
    salary: '75k-125k',
    why: 'Apple Vision Pro ecosystem, immersive experiences, digital twins',
    resources: [
      { name: 'Vision Pro Dev', url: 'https://developer.apple.com/vision/' },
      { name: 'Unity XR', url: 'https://unity.com/xr' }
    ],
    growthHistory: [
      { month: 'Led', value: 48 },
      { month: 'Úno', value: 58 },
      { month: 'Bře', value: 72 },
      { month: 'Dub', value: 88 },
      { month: 'Kvě', value: 105 },
      { month: 'Čer', value: 120 },
      { month: 'Čvc', value: 134 }
    ]
  },
  {
    id: 'security-engineering',
    name: 'AI-Assisted Security Engineering',
    category: 'Security',
    growth: 'rising',
    growthPercent: 178,
    description: 'Using AI for vulnerability detection, penetration testing, and security automation.',
    relatedSkills: ['AI Security', 'Penetration Testing', 'Python', 'ML for Security'],
    maturity: 'growing',
    opportunities: 82,
    salary: '90k-150k',
    why: 'Automated vulnerability scanning, intelligent threat detection',
    resources: [
      { name: 'AI Security Research', url: 'https://www.google.com/' }
    ],
    growthHistory: [
      { month: 'Led', value: 38 },
      { month: 'Úno', value: 52 },
      { month: 'Bře', value: 75 },
      { month: 'Dub', value: 102 },
      { month: 'Kvě', value: 132 },
      { month: 'Čer', value: 158 },
      { month: 'Čvc', value: 178 }
    ]
  },
  {
    id: 'low-code-ai',
    name: 'Low-Code AI Platforms',
    category: 'AI Development',
    growth: 'stable',
    growthPercent: 89,
    description: 'Platforms enabling AI development without deep programming knowledge.',
    relatedSkills: ['No-Code AI', 'Workflow Design', 'API Integration'],
    maturity: 'maturing',
    opportunities: 75,
    salary: '60k-100k',
    why: 'Democratized AI, rapid deployment, business user empowerment',
    resources: [
      { name: 'Google Vertex AI', url: 'https://cloud.google.com/vertex-ai' },
      { name: 'Azure ML', url: 'https://azure.microsoft.com/' }
    ],
    growthHistory: [
      { month: 'Led', value: 68 },
      { month: 'Úno', value: 72 },
      { month: 'Bře', value: 75 },
      { month: 'Dub', value: 78 },
      { month: 'Kvě', value: 82 },
      { month: 'Čer', value: 86 },
      { month: 'Čvc', value: 89 }
    ]
  },
  {
    id: 'sustainable-tech',
    name: 'Green Computing & Sustainability',
    category: 'Environment',
    growth: 'rising',
    growthPercent: 123,
    description: 'Developing energy-efficient software and measuring carbon footprint.',
    relatedSkills: ['Energy Monitoring', 'Sustainable Architecture', 'Green Cloud'],
    maturity: 'emerging',
    opportunities: 55,
    salary: '70k-115k',
    why: 'Regulatory requirements, cost reduction, corporate ESG goals',
    resources: [
      { name: 'Green Software Foundation', url: 'https://greensoftware.io/' }
    ],
    growthHistory: [
      { month: 'Led', value: 42 },
      { month: 'Úno', value: 55 },
      { month: 'Bře', value: 68 },
      { month: 'Dub', value: 82 },
      { month: 'Kvě', value: 95 },
      { month: 'Čer', value: 110 },
      { month: 'Čvc', value: 123 }
    ]
  },
  {
    id: 'openclaw-ai-assistant',
    name: '🦞 Openclaw',
    category: 'AI Development',
    subcategory: 'AI Assistants',
    previousNames: ['Clawdbot', 'Moltbot'],
    growth: 'rising',
    growthPercent: 245,
    description: 'Self-hosted personal AI assistant that runs locally and integrates with messaging apps for 24/7 automation.',
    relatedSkills: ['Node.js', 'CLI', 'LLM Integration', 'Automation', 'Self-hosting', 'WhatsApp', 'Telegram', 'Discord'],
    openclawSkills: [
      'Openclaw Installation & Setup',
      'Gateway Configuration',
      'Channel Integration',
      'Skills System (ClawdHub)',
      'Pairing & Security',
      'Automation & Cron Jobs',
      'Voice Interaction',
      'Canvas Visual Workspace'
    ],
    cliCommands: [
      { command: 'curl -fsSL https://openclaw.ai/install.sh | bash', description: 'Install Openclaw CLI' },
      { command: 'openclaw onboard --install-daemon', description: 'Run onboarding wizard' },
      { command: 'openclaw dashboard', description: 'Open Control UI' },
      { command: 'openclaw gateway status', description: 'Check gateway status' },
      { command: 'clawdhub install <skill>', description: 'Install community skills' },
      { command: 'openclaw security audit --deep', description: 'Security audit' }
    ],
    installationUrl: 'https://openclaw.ai/',
    maturity: 'growing',
    opportunities: 88,
    salary: 'Open Source',
    why: 'Privacy-first AI, self-hosted, 700+ skills, 50+ integrations, 24/7 availability',
    resources: [
      { name: 'Official Website', url: 'https://openclaw.ai/' },
      { name: 'GitHub Repository', url: 'https://github.com/openclaw/openclaw' },
      { name: 'Documentation', url: 'https://docs.openclaw.ai/' },
      { name: 'ClawdHub Skills Registry', url: 'https://clawdhub.com/' }
    ],
    growthHistory: [
      { month: 'Srp', value: 45 },
      { month: 'Zář', value: 78 },
      { month: 'Říj', value: 125 },
      { month: 'Lis', value: 168 },
      { month: 'Pro', value: 195 },
      { month: 'Led', value: 220 },
      { month: 'Úno', value: 245 }
    ]
  },
  {
    id: 'claude-code-cli',
    name: 'Claude Code CLI',
    category: 'AI Development',
    growth: 'rising',
    growthPercent: 267,
    description: 'Anthropic\'s official CLI for Claude with MCP support, 200K context window, and agentic coding capabilities.',
    relatedSkills: ['Claude CLI', 'MCP Protocol', 'TypeScript', 'Terminal', 'Git'],
    maturity: 'growing',
    opportunities: 95,
    salary: '75k-140k',
    why: 'Official Anthropic CLI, MCP integration, premium coding agent, enterprise ready',
    resources: [
      { name: 'Claude Code', url: 'https://claude.com/claude-code' },
      { name: 'MCP Registry', url: 'https://github.com/modelcontextprotocol' }
    ],
    growthHistory: [
      { month: 'Zář', value: 45 },
      { month: 'Říj', value: 89 },
      { month: 'Lis', value: 145 },
      { month: 'Pro', value: 198 },
      { month: 'Led', value: 235 },
      { month: 'Úno', value: 267 }
    ]
  },
  {
    id: 'openai-codex',
    name: 'OpenAI Codex',
    category: 'AI Development',
    growth: 'rising',
    growthPercent: 198,
    description: 'OpenAI\'s AI system that translates natural language to code, powering GitHub Copilot and standalone Codex API.',
    relatedSkills: ['Python', 'JavaScript', 'API Integration', 'Code Generation', 'GitHub Copilot'],
    maturity: 'maturing',
    opportunities: 88,
    salary: '70k-125k',
    why: 'Production-grade code generation, GitHub Copilot foundation, enterprise adoption',
    resources: [
      { name: 'OpenAI Codex', url: 'https://openai.com/blog/codex' },
      { name: 'Copilot Docs', url: 'https://docs.github.com/copilot' }
    ],
    growthHistory: [
      { month: 'Led', value: 55 },
      { month: 'Úno', value: 72 },
      { month: 'Bře', value: 95 },
      { month: 'Dub', value: 125 },
      { month: 'Kvě', value: 156 },
      { month: 'Čer', value: 178 },
      { month: 'Čvc', value: 198 }
    ]
  },
  {
    id: 'gemini-cli',
    name: 'Gemini CLI',
    category: 'AI Development',
    growth: 'rising',
    growthPercent: 312,
    description: 'Google\'s free CLI tool with 1M context window, native MCP support, and Gemini model integration.',
    relatedSkills: ['Gemini', 'Google Cloud', 'CLI', '1M Context', 'Free Tier'],
    maturity: 'emerging',
    opportunities: 82,
    salary: '65k-115k',
    why: '1000 free requests/day, 1M context, Google ecosystem integration, completely free',
    resources: [
      { name: 'GitHub Repo', url: 'https://github.com/google-gemini/gemini-cli' },
      { name: 'Gemini API', url: 'https://ai.google.dev/gemini-api' }
    ],
    growthHistory: [
      { month: 'Lis', value: 35 },
      { month: 'Pro', value: 78 },
      { month: 'Led', value: 156 },
      { month: 'Úno', value: 312 }
    ]
  },
  {
    id: 'axiom-smart-money',
    name: 'Axiom Smart Money',
    category: 'Crypto & Trading',
    growth: 'rising',
    growthPercent: 285,
    description: 'Platform for tracking smart money flows, whale wallet analysis, and real-time on-chain data.',
    relatedSkills: ['On-Chain Analysis', 'Wallet Tracking', 'DeFi', 'Data Visualization', 'Crypto Trading'],
    maturity: 'growing',
    opportunities: 78,
    salary: 'Variable',
    why: 'Follow smart money, real-time alerts, whale tracking, copy trading signals',
    resources: [
      { name: 'Axiom', url: 'https://axiom.xyz/' },
      { name: 'Documentation', url: 'https://docs.axiom.xyz/' }
    ],
    growthHistory: [
      { month: 'Říj', value: 55 },
      { month: 'Lis', value: 98 },
      { month: 'Pro', value: 165 },
      { month: 'Led', value: 220 },
      { month: 'Úno', value: 285 }
    ]
  },
  {
    id: 'pump-fun-token-launch',
    name: 'Pump.fun Launchpad',
    category: 'Crypto & Trading',
    growth: 'rising',
    growthPercent: 425,
    description: 'Fair launch platform for meme coins with bonding curves, instant liquidity, and viral mechanics.',
    relatedSkills: ['Solana', 'Token Creation', 'DeFi', 'Bonding Curves', 'Community Building'],
    maturity: 'growing',
    opportunities: 92,
    salary: 'Variable',
    why: 'No rug pull mechanics, fair distribution, instant listings, viral token launches',
    resources: [
      { name: 'Pump.fun', url: 'https://pump.fun/' },
      { name: 'How to Launch', url: 'https://docs.pump.fun/' }
    ],
    growthHistory: [
      { month: 'Lis', value: 25 },
      { month: 'Pro', value: 78 },
      { month: 'Led', value: 185 },
      { month: 'Úno', value: 425 }
    ]
  },
  {
    id: 'polymarket-prediction',
    name: 'Polymarket Prediction Markets',
    category: 'Betting & Prediction',
    growth: 'rising',
    growthPercent: 356,
    description: 'Decentralized prediction market platform for forecasting real-world events with conditional tokens.',
    relatedSkills: ['Prediction Markets', 'Conditional Tokens', 'Polygon', 'Market Making', 'Information Markets'],
    maturity: 'growing',
    opportunities: 85,
    salary: 'Variable',
    why: 'Real-money markets, global events, conditional NFTs, information arbitrage',
    resources: [
      { name: 'Polymarket', url: 'https://polymarket.com/' },
      { name: 'Docs', url: 'https://docs.polymarket.com/' }
    ],
    growthHistory: [
      { month: 'Zář', value: 35 },
      { month: 'Říj', value: 68 },
      { month: 'Lis', value: 125 },
      { month: 'Pro', value: 198 },
      { month: 'Led', value: 285 },
      { month: 'Úno', value: 356 }
    ]
  },
  {
    id: 'meme-coin-trading',
    name: 'Meme Coin Trading',
    category: 'Crypto & Trading',
    growth: 'rising',
    growthPercent: 178,
    description: 'High-volatility trading of community-driven cryptocurrencies with viral potential and rapid price action.',
    relatedSkills: ['Technical Analysis', 'Sentiment Analysis', 'Risk Management', 'Crypto Wallets', 'DEX Trading'],
    maturity: 'maturing',
    opportunities: 88,
    salary: 'Variable',
    why: 'High leverage opportunities, community-driven gains, 24/7 markets, low entry barrier',
    resources: [
      { name: 'DEX Screener', url: 'https://dexscreener.com/' },
      { name: 'Raydium', url: 'https://raydium.io/' },
      { name: 'DexScreener', url: 'https://dexscreener.com/' }
    ],
    growthHistory: [
      { month: 'Srp', value: 65 },
      { month: 'Zář', value: 78 },
      { month: 'Říj', value: 95 },
      { month: 'Lis', value: 125 },
      { month: 'Pro', value: 145 },
      { month: 'Led', value: 158 },
      { month: 'Úno', value: 178 }
    ]
  },
  {
    id: 'blur-NFT-trading',
    name: 'Blur NFT Analytics',
    category: 'Crypto & Trading',
    growth: 'stable',
    growthPercent: 95,
    description: 'Professional NFT trading platform with real-time floor pricing, portfolio tracking, and market intelligence.',
    relatedSkills: ['NFT Analysis', 'Floor Tracking', 'Portfolio Management', 'Market Data', 'Whale Tracking'],
    maturity: 'established',
    opportunities: 65,
    salary: 'Variable',
    why: 'Professional tools, real-time data, portfolio analytics, floor monitoring',
    resources: [
      { name: 'Blur', url: 'https://blur.io/' },
      { name: 'Market Data', url: 'https://www.blur.io/market' }
    ],
    growthHistory: [
      { month: 'Srp', value: 85 },
      { month: 'Zář', value: 88 },
      { month: 'Říj', value: 90 },
      { month: 'Lis', value: 92 },
      { month: 'Pro', value: 94 },
      { month: 'Led', value: 95 },
      { month: 'Úno', value: 95 }
    ]
  },
  {
    id: 'genie-3',
    name: 'Genie 3 World Gen',
    category: 'AI & Spatial Computing',
    growth: 'rising',
    growthPercent: 445,
    description: 'Magic Leap\'s Genie 3 creates interactive 3D worlds from text/images, powering next-gen AR/VR spatial experiences.',
    relatedSkills: ['Spatial Computing', '3D Generation', 'AR/VR', 'Neural Networks', 'Magic Leap'],
    maturity: 'emerging',
    opportunities: 92,
    salary: '90k-160k',
    why: 'Text-to-3D worlds, real-time generation, spatial AI, enterprise AR/VR',
    resources: [
      { name: 'Magic Leap Genie', url: 'https://www.magicleap.com/genie' },
      { name: 'Spatial Computing', url: 'https://en.wikipedia.org/wiki/Spatial_computing' }
    ],
    growthHistory: [
      { month: 'Led', value: 45 },
      { month: 'Úno', value: 445 }
    ]
  },
  {
    id: 'ai-world-generators',
    name: 'AI World Generators',
    category: 'AI & Spatial Computing',
    growth: 'rising',
    growthPercent: 312,
    description: 'AI systems that generate complete 3D worlds, terrains, cities from text prompts or images.',
    relatedSkills: ['3D Generation', 'Procedural Content', 'Game Engines', 'Neural Radiance Fields', 'Gaussian Splatting'],
    maturity: 'emerging',
    opportunities: 88,
    salary: '80k-150k',
    why: 'Instant 3D worlds, procedural generation, game dev revolution, virtual production',
    resources: [
      { name: 'Luma AI', url: 'https://lumalabs.ai/' },
      { name: 'CSM.ai', url: 'https://csm.ai/' },
      { name: 'Meshy.ai', url: 'https://meshy.ai/' }
    ],
    growthHistory: [
      { month: 'Zář', value: 55 },
      { month: 'Říj', value: 98 },
      { month: 'Lis', value: 165 },
      { month: 'Pro', value: 225 },
      { month: 'Led', value: 275 },
      { month: 'Úno', value: 312 }
    ]
  },
  {
    id: 'gaussian-splatting',
    name: 'Gaussian Splatting 3D',
    category: 'AI & Spatial Computing',
    growth: 'rising',
    growthPercent: 245,
    description: 'Neural rendering technique for real-time 3D scene reconstruction from photos with incredible quality.',
    relatedSkills: ['3D Reconstruction', 'Neural Rendering', 'Computer Vision', 'WebGL', 'Real-Time Graphics'],
    maturity: 'growing',
    opportunities: 75,
    salary: '75k-135k',
    why: 'Real-time rendering, photo-to-3D, VR/AR, virtual tourism, heritage preservation',
    resources: [
      { name: 'Paper', url: 'https://arxiv.org/abs/2308.04079' },
      { name: 'Viewer', url: 'https://playcanvas.com/gaussian-splatting' }
    ],
    growthHistory: [
      { month: 'Čer', value: 45 },
      { month: 'Čvc', value: 78 },
      { month: 'Srp', value: 125 },
      { month: 'Zář', value: 168 },
      { month: 'Říj', value: 195 },
      { month: 'Lis', value: 218 },
      { month: 'Pro', value: 235 },
      { month: 'Led', value: 242 },
      { month: 'Úno', value: 245 }
    ]
  }
];

type Props = {
  show: boolean;
  onHide: () => void;
};

export default function TrendySection({ show, onHide }: Props) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTrend, setSelectedTrend] = useState<TrendingItem | null>(null);
  const [userTrends, setUserTrends] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('userTrends');
    if (saved) {
      setUserTrends(JSON.parse(saved));
    }
  }, []);

  const saveUserTrends = (trends: string[]) => {
    setUserTrends(trends);
    localStorage.setItem('userTrends', JSON.stringify(trends));
  };

  const toggleTrend = (trendId: string) => {
    if (userTrends.includes(trendId)) {
      saveUserTrends(userTrends.filter(id => id !== trendId));
    } else {
      saveUserTrends([...userTrends, trendId]);
    }
  };

  const getGrowthIcon = (growth: string) => {
    switch (growth) {
      case 'rising': return <span className="text-success">📈</span>;
      case 'declining': return <span className="text-danger">📉</span>;
      default: return <span className="text-warning">📊</span>;
    }
  };

  const getMaturityColor = (maturity: string) => {
    switch (maturity) {
      case 'emerging': return 'danger';
      case 'growing': return 'warning';
      case 'maturing': return 'info';
      default: return 'success';
    }
  };

  const categories = ['all', ...new Set(TREND_DATA.map(t => t.category))];

  const filteredTrends = activeTab === 'all' 
    ? TREND_DATA 
    : TREND_DATA.filter(t => t.category === activeTab);

  const sortedTrends = [...filteredTrends].sort((a, b) => b.growthPercent - a.growthPercent);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

  const getComparisonData = () => {
    return sortedTrends.slice(0, 6).map(t => ({
      name: t.name.length > 15 ? t.name.substring(0, 15) + '...' : t.name,
      growth: t.growthPercent,
      opportunities: t.opportunities
    }));
  };

  const getSkillsRadarData = () => {
    if (!selectedTrend) return [];
    return selectedTrend.relatedSkills.map(skill => ({
      subject: skill.length > 10 ? skill.substring(0, 10) : skill,
      A: Math.floor(Math.random() * 40) + 60,
      fullMark: 100
    }));
  };

  return (
    <Modal show={show} onHide={onHide} size="xl" centered contentClassName="border-0 shadow-lg">
      <Modal.Header closeButton className="bg-dark text-white border-0">
        <div className="d-flex align-items-center gap-3">
          <div className="fs-3">📈</div>
          <div>
            <Modal.Title className="fw-bold">Trendy & Emerging Technologies</Modal.Title>
            <div className="small opacity-75">Sleduj rostoucí technologie a získej konkurenční výhodu</div>
          </div>
        </div>
      </Modal.Header>
      
      <Modal.Body className="p-0">
        <div className="border-bottom px-3 pt-3">
          <div className="d-flex flex-wrap gap-2">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={activeTab === cat ? 'primary' : 'outline-secondary'}
                size="sm"
                className={activeTab === cat ? 'fw-bold' : ''}
                onClick={() => setActiveTab(cat)}
              >
                {cat === 'all' ? '📊 Všechny' : cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="p-3" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          <Row className="g-3">
            {sortedTrends.map(trend => (
              <Col key={trend.id} xs={12} md={6} lg={4}>
                <Card 
                  className={`h-100 ${selectedTrend?.id === trend.id ? 'border-primary shadow' : ''}`}
                  style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                  onClick={() => setSelectedTrend(trend)}
                >
                  <Card.Body className="p-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div className="d-flex align-items-center gap-2">
                        {getGrowthIcon(trend.growth)}
                        <Badge bg={getMaturityColor(trend.maturity)} className="small">{trend.maturity}</Badge>
                      </div>
                      <Button
                        variant={userTrends.includes(trend.id) ? 'warning' : 'outline-warning'}
                        size="sm"
                        className="p-1"
                        onClick={(e) => { e.stopPropagation(); toggleTrend(trend.id); }}
                      >
                        {userTrends.includes(trend.id) ? '★' : '☆'}
                      </Button>
                    </div>
                    
                    <h6 className="fw-bold mb-1">{trend.name}</h6>
                    <div className="small text-muted mb-2">{trend.category}</div>
                    
                    <p className="small mb-2 text-secondary" style={{ fontSize: '0.8rem' }}>
                      {trend.description.substring(0, 80)}...
                    </p>
                    
                    <div className="d-flex flex-wrap gap-1 mb-2">
                      {trend.relatedSkills.slice(0, 3).map(skill => (
                        <Badge key={skill} bg="secondary" className="small" style={{ fontSize: '0.65rem' }}>{skill}</Badge>
                      ))}
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center">
                      <Badge bg="success" className="small">+{trend.growthPercent}% růst</Badge>
                      <span className="small text-muted">💰 {trend.salary}</span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {selectedTrend && (
          <div className="border-top bg-light p-4">
            <Row>
              <Col md={8}>
                <div className="d-flex align-items-center gap-3 mb-2 flex-wrap">
                  <h4 className="fw-bold mb-0">{selectedTrend.name}</h4>
                  <Badge bg={getMaturityColor(selectedTrend.maturity)} className="fs-6">{selectedTrend.maturity}</Badge>
                  <Badge bg="success" className="fs-6">📈 +{selectedTrend.growthPercent}% růst</Badge>
                </div>
                
                {selectedTrend.subcategory && (
                  <div className="mb-2">
                    <Badge bg="info" className="me-2">📁 {selectedTrend.subcategory}</Badge>
                  </div>
                )}

                {selectedTrend.previousNames && selectedTrend.previousNames.length > 0 && (
                  <div className="name-evolution mb-3">
                    <small className="text-muted me-2">Evolution:</small>
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      {selectedTrend.previousNames.map((name, idx) => (
                        <Badge key={name} bg="secondary" className="small">
                          {name}
                        </Badge>
                      ))}
                      <span className="text-muted small">→</span>
                      <Badge bg="primary" className="small fw-bold">
                        {selectedTrend.name.replace('🦞 ', '')}
                      </Badge>
                    </div>
                  </div>
                )}

                <p className="lead mb-3">{selectedTrend.description}</p>

                <Row className="mb-4">
                  <Col xs={4}>
                    <div className="text-center p-3 bg-white rounded shadow-sm">
                      <div className="fs-4 fw-bold text-primary">{selectedTrend.opportunities}%</div>
                      <div className="small text-muted">Příležitosti</div>
                    </div>
                  </Col>
                  <Col xs={4}>
                    <div className="text-center p-3 bg-white rounded shadow-sm">
                      <div className="fs-4 fw-bold text-success">{selectedTrend.salary}</div>
                      <div className="small text-muted">Plat (CZK)</div>
                    </div>
                  </Col>
                  <Col xs={4}>
                    <div className="text-center p-3 bg-white rounded shadow-sm">
                      <div className="fs-4 fw-bold text-warning">{selectedTrend.relatedSkills.length}</div>
                      <div className="small text-muted">Související Skills</div>
                    </div>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col lg={6} className="mb-3">
                    <Card className="h-100">
                      <Card.Header className="bg-white fw-bold">📈 Růst v čase</Card.Header>
                      <Card.Body>
                        {selectedTrend.growthHistory && (
                          <ResponsiveContainer width="100%" height={200}>
                            <AreaChart data={selectedTrend.growthHistory}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" />
                              <YAxis />
                              <Tooltip 
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                              />
                              <Area type="monotone" dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                            </AreaChart>
                          </ResponsiveContainer>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col lg={6} className="mb-3">
                    <Card className="h-100">
                      <Card.Header className="bg-white fw-bold">📊 Porovnání trendů</Card.Header>
                      <Card.Body>
                        <ResponsiveContainer width="100%" height={200}>
                          <BarChart data={getComparisonData()}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                            <YAxis />
                            <Tooltip 
                              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                            />
                            <Bar dataKey="growth" fill="#6366f1" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col lg={6} className="mb-3">
                    <Card className="h-100">
                      <Card.Header className="bg-white fw-bold">🎯 Dovednosti</Card.Header>
                      <Card.Body>
                        <ResponsiveContainer width="100%" height={200}>
                          <PieChart>
                            <Pie
                              data={selectedTrend.relatedSkills.map((skill, index) => ({
                                name: skill,
                                value: 100 - (index * 15)
                              }))}
                              cx="50%"
                              cy="50%"
                              innerRadius={40}
                              outerRadius={80}
                              paddingAngle={2}
                              dataKey="value"
                            >
                              {selectedTrend.relatedSkills.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip 
                              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="text-center mt-2">
                          {selectedTrend.relatedSkills.map((skill, index) => (
                            <Badge key={skill} bg="secondary" className="me-1 mb-1" style={{ fontSize: '0.65rem' }}>
                              <span style={{ color: COLORS[index % COLORS.length] }}>●</span> {skill}
                            </Badge>
                          ))}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col lg={6} className="mb-3">
                    <Card className="h-100">
                      <Card.Header className="bg-white fw-bold">💼 Příležitosti vs Růst</Card.Header>
                      <Card.Body>
                        <ResponsiveContainer width="100%" height={200}>
                          <LineChart data={selectedTrend.growthHistory}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip 
                              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                            />
                            <Line type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', strokeWidth: 2 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                
                <div className="mb-3">
                  <h6 className="fw-bold mb-2">💡 Proč se tomu věnovat:</h6>
                  <Card className="bg-primary bg-opacity-10 border-primary">
                    <Card.Body className="py-2 px-3">
                      <span className="fw-bold text-primary">{selectedTrend.why}</span>
                    </Card.Body>
                  </Card>
                </div>
                
                <div className="mb-3">
                  <h6 className="fw-bold mb-2">🛠️ Související dovednosti:</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {selectedTrend.relatedSkills.map(skill => (
                      <Badge key={skill} bg="dark" className="p-2">{skill}</Badge>
                    ))}
                  </div>
                </div>

                {selectedTrend.openclawSkills && selectedTrend.openclawSkills.length > 0 && (
                  <div className="mb-3">
                    <h6 className="fw-bold mb-2">🎯 Openclaw Skills (700+ dostupných):</h6>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      {selectedTrend.openclawSkills.map(skill => (
                        <Badge key={skill} bg="primary" className="p-2" style={{ cursor: 'pointer' }}>
                          ⭐ {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      <Button variant="outline-primary" size="sm" href="https://clawdhub.com/" target="_blank">
                        🛒 ClawdHub Skills Registry
                      </Button>
                      <Button variant="outline-secondary" size="sm" href="https://github.com/VoltAgent/awesome-openclaw-skills" target="_blank">
                        📦 Awesome Openclaw Skills (GitHub)
                      </Button>
                    </div>
                  </div>
                )}

                {selectedTrend.cliCommands && selectedTrend.cliCommands.length > 0 && (
                  <div className="mb-3">
                    <h6 className="fw-bold mb-2">💻 CLI Commands:</h6>
                    <div className="bg-dark rounded p-2">
                      {selectedTrend.cliCommands.map((cmd, idx) => (
                        <div key={idx} className="mb-2">
                          <code className="d-block text-light small" style={{ fontSize: '0.75rem' }}>
                            {cmd.command}
                          </code>
                          <small className="text-muted">→ {cmd.description}</small>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <h6 className="fw-bold mb-2">📚 Zdroje:</h6>
                  <ListGroup variant="flush" className="bg-white rounded">
                    {selectedTrend.resources.map((resource, idx) => (
                      <ListGroup.Item key={idx} action href={resource.url} target="_blank" className="py-2">
                        🔗 {resource.name}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
              </Col>
              
              <Col md={4}>
                <Card className="bg-warning bg-opacity-10 border-warning h-100">
                  <Card.Body>
                    <h6 className="fw-bold text-warning mb-3">🎯 Akční kroky</h6>
                    
                    <div className="mb-3">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <span>⭐</span>
                        <span className="fw-bold">Sledovat</span>
                      </div>
                      <Button
                        variant={userTrends.includes(selectedTrend.id) ? 'secondary' : 'warning'}
                        className="w-100"
                        onClick={() => toggleTrend(selectedTrend.id)}
                      >
                        {userTrends.includes(selectedTrend.id) ? '✅ Sledováno' : '⭐ Sledovat trend'}
                      </Button>
                    </div>
                    
                    <div className="mb-3">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <span>⚡</span>
                        <span className="fw-bold">Začít učit</span>
                      </div>
                      <Button variant="outline-warning" className="w-100">
                        + Přidat do Skill Tree
                      </Button>
                    </div>

                    <div className="mb-3">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <span>📊</span>
                        <span className="fw-bold">Analytics</span>
                      </div>
                      <div className="bg-white rounded p-2">
                        <div className="d-flex justify-content-between small mb-1">
                          <span>Růst trendu</span>
                          <span className="fw-bold text-success">+{selectedTrend.growthPercent}%</span>
                        </div>
                        <ProgressBar now={Math.min(selectedTrend.growthPercent / 4, 100)} variant="success" style={{ height: '6px' }} />
                      </div>
                    </div>
                    
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <span>💡</span>
                        <span className="fw-bold">Tip</span>
                      </div>
                      <p className="small text-muted mb-0">
                        Tento trend má vysoký růstový potenciál. Začni s základními skills a sleduj vývoj trhu.
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </Modal.Body>
      
      <Modal.Footer className="bg-light">
        <div className="d-flex justify-content-between w-100">
          <span className="text-muted small">📊 Sleduješ {userTrends.length} trendů</span>
          <Button variant="secondary" onClick={onHide}>Zavřít</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export { TREND_DATA };
export type { TrendingItem };
