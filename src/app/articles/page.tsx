"use client";

import { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ArticleCard from '@/components/ArticleCard';
import SearchBar from '@/components/SearchBar';
import FilterPills from '@/components/FilterPills';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  tags: string[];
  featured: boolean;
  color?: string;
}

const ARTICLES: Article[] = [
  {
    id: "nvidia-groq-acquisition",
    title: "💥 NVIDIA kupuje Groq za miliardy: Největší akvizice AI čipů",
    excerpt: "NVIDIA oznámila akvizici startupu Groq zabývajícího se AI akcelerátory. Hodnota transakce přesahuje 20 miliard dolarů a představuje největší akvizici v historii AI čipového průmyslu. Groq se zaměřuje na inference čipy pro velké jazykové modely.",
    category: "Breaking News",
    readTime: "6 min",
    publishedAt: "2026-01-06",
    tags: ["NVIDIA", "Groq", "AI čipy", "Akvizice", "Hardware"],
    featured: true,
    color: "danger"
  },
  {
    id: "waymo-gemini-ai-assistant",
    title: "🚕 Waymo testuje Google Gemini jako AI asistenta v robotaxících",
    excerpt: "Waymo, dceřiná společnost Alphabet, údajně testuje Google Gemini jako AI asistenta ve svých samořízených taxících. Chatbot dokáže ovládat klimatizaci, osvětlení, odpovídat na otázky cestujících a personalizovat zážitek z jízdy.",
    category: "Breaking News",
    readTime: "5 min",
    publishedAt: "2026-01-06",
    tags: ["Waymo", "Google Gemini", "Robotaxi", "AI asistent", "Autonomní vozidla"],
    featured: true,
    color: "primary"
  },
  {
    id: "minimax-m2-1-model",
    title: "💻 MiniMax představuje M2.1: Nový model překonává konkurenci",
    excerpt: "MiniMax oznámil uvedení nového modelu M2.1 s vylepšeným multi-language programováním v Rust, Java, Golang a C++. Model podporuje nativní vývoj pro Android/iOS, automatizaci kancelářských úkolů a autonomní spouštění nástrojů. V benchmarkech překonává špičkové konkurenty.",
    category: "Breaking News",
    readTime: "5 min",
    publishedAt: "2026-01-06",
    tags: ["MiniMax", "AI model", "Programování", "M2.1", "Benchmarky"],
    featured: true,
    color: "success"
  },
  {
    id: "windsurf-wave-13-multi-agent",
    title: "🚀 Windsurf Wave 13: Revoluce v multi-agent programování",
    excerpt: "Windsurf přináší Wave 13 s podporou paralelních multi-agent sessions, Git worktrees, side-by-side panely a dedikovaný terminál. SWE-1.5 je nyní zdarma pro všechny uživatele na 3 měsíce.",
    category: "AI & Tech",
    readTime: "8 min",
    publishedAt: "2026-01-06",
    tags: ["Windsurf", "Wave 13", "Multi-agent", "Cascade", "IDE"],
    featured: true,
    color: "primary"
  },
  {
    id: "windsurf-git-worktrees",
    title: "🌳 Git Worktrees ve Windsurf: Multiple sessions bez konfliktů",
    excerpt: "Windsurf nyní podporuje Git worktrees, což umožňuje spouštět více Cascade sessions v jednom repozitáři současně. Každá session má svůj vlastní adresář, ale sdílí Git historii.",
    category: "AI & Tech",
    readTime: "6 min",
    publishedAt: "2026-01-06",
    tags: ["Windsurf", "Git", "Worktrees", "Multi-agent", "Cascade"],
    featured: true,
    color: "success"
  },
  {
    id: "windsurf-multi-cascade-panes",
    title: "🖥️ Multi-Cascade Panes: Sledujte více agentů současně",
    excerpt: "Windsurf Wave 13 přináší možnost zobrazit více Cascade sessions v samostatných panelech a záložkách. Můžete sledovat pokrok, porovnávat výstupy a využít Windsurf jako plnohodnotné multi-agent prostředí.",
    category: "AI & Tech",
    readTime: "5 min",
    publishedAt: "2026-01-06",
    tags: ["Windsurf", "Multi-agent", "Cascade", "Panels", "Produktivita"],
    featured: true,
    color: "info"
  },
  {
    id: "windsurf-dedicated-terminal",
    title: "🎯 Cascade Dedicated Terminal: Spolehlivější spouštění příkazů",
    excerpt: "Windsurf zavádí dedikovaný zsh terminál pro agenty místo výchozího shellu. Tato změna zlepšuje spolehlivost a rychlost spouštění shell příkazů, zejména pro uživatele s komplexními konfiguracemi jako powerlevel10k.",
    category: "AI & Tech",
    readTime: "5 min",
    publishedAt: "2026-01-06",
    tags: ["Windsurf", "Terminal", "Cascade", "Shell", "Reliabilita"],
    featured: true,
    color: "warning"
  },
  {
    id: "windsurf-swe-1-5-free",
    title: "🎁 SWE-1.5 Zdarma: 3 měsíce plné AI inteligence",
    excerpt: "Cascade Labs daruje všem uživatelům SWE-1.5 zdarma na 3 měsíce. Model má stejnou inteligenci jako placená verze, jen pomalejší throughput (~900 tokenů/sec). Nahrazuje SWE-1 jako výchozí model ve Windsurf.",
    category: "AI & Tech",
    readTime: "5 min",
    publishedAt: "2026-01-06",
    tags: ["SWE-1.5", "Windsurf", "Zdarma", "AI model", "Cascade"],
    featured: true,
    color: "danger"
  },
  {
    id: "meta-alexandr-wang-micromanagement",
    title: "😤 Meta's top AI hire Alexandr Wang se pod Zuckerbergovým mikromanagementem dusí",
    excerpt: "Alexandr Wang, nejlépe placený zaměstnanec Mety, údajně není spokojený s přehnaným dohledem CEO Marka Zuckerberga. Wang přešel do Mety poté, co firma koupila 49% podíl v jeho startupu Scale AI za více než 14 miliard dolarů. Těsné kontrola údajně zpomaluje pokrok klíčových AI projektů. Napětí přichází v době propouštění, odchodů vedoucích pracovníků a zklamání kolem modelu Llama 4.",
    category: "AI & Tech",
    readTime: "7 min",
    publishedAt: "2026-01-06",
    tags: ["Meta", "Alexandr Wang", "Scale AI", "Zuckerberg", "Micromanagement", "AI"],
    featured: true,
    color: "warning"
  },
  {
    id: "ai-browsers-prompt-injection",
    title: "⚠️ AI prohlížeče čelí trvalým rizikům prompt injection útoků",
    excerpt: "OpenAI varuje, že útoky prompt injection proti AI prohlížečům pravděpodobně nikdy nebudou zcela vyřešeny. Společnost upozorňuje, že agentní rozšíření prohlížečů zvětšují bezpečnostní rizikovou plochu. OpenAI reaguje vrstvami obrany, rychlými cykly oprav a automatizovaným AI útočníkem trénovaným na hledání chyb. Experti varují, že dnešní agentní prohlížeče stále nesou vysoké riziko kvůli přístupu k citlivým datům.",
    category: "AI & Tech",
    readTime: "6 min",
    publishedAt: "2026-01-06",
    tags: ["AI prohlížeče", "Prompt injection", "OpenAI", "Bezpečnost", "Agentic AI"],
    featured: true,
    color: "danger"
  },
  {
    id: "mit-robotics-expert-musk-humanoid",
    title: "🤔 MIT robotik se ostře opřel do Muskovy vize humanoidních robotů",
    excerpt: "Rodney Brooks, renomovaný robotik z MIT, označil vizi Elona Muska o humanoidních robotech za nerealistickou a přehnaně propagovanou. Brooks argumentuje, že současné roboty postrádají zručnost a dotykovou citlivost potřebnou k nahrazení lidí v dohledné době. Nazývá blízké průlomy \"čistou fantazií\" a varuje, že mnoho investic bude promarněno a humanoidní roboty zmizí, jak pokročí specializované roboty.",
    category: "AI & Tech",
    readTime: "6 min",
    publishedAt: "2026-01-06",
    tags: ["Humanoidní roboti", "Elon Musk", "MIT", "Rodney Brooks", "Robotika", "Tesla Optimus"],
    featured: true,
    color: "info"
  },
  {
    id: "chatgpt-replit-app-builder",
    title: "🛠️ Nyní můžete stavět aplikace přímo v ChatGPT s Replitem",
    excerpt: "Uživatelé ChatGPT nyní mohou vytvářet kompletní aplikace přímo v chatu pomocí nového agenta od Replit. Stačí označit @Replit a popsat nápad - agent vytvoří aplikaci, nastaví prostředí a ukáže živý náhled okamžitě. Uživatelé mohou požadovat úpravy jako změny layoutu nebo nové stránky, které se aktualizují v reálném čase. Funkce odstraňuje tření nastavení a přepínání záložek, čímž snižuje bariéru vytváření aplikací.",
    category: "AI & Tech",
    readTime: "5 min",
    publishedAt: "2026-01-06",
    tags: ["ChatGPT", "Replit", "App Builder", "No-code", "AI agent", "Vývoj"],
    featured: true,
    color: "success"
  },
  {
    id: "clickup-codegen-acquisition",
    title: "🚀 ClickUp kupuje Codegen: První background coding agent na světě",
    excerpt: "ClickUp oznámil akvizici Codegen, startupu vytvářejícího první background coding agenty na světě. Tato akvizice fundamentálně posílí schopnosti ClickUp Super Agent. Brzy budou moci uživatelé transformovat nápady, plány a dokumenty do živých workflow přímo v ClickUp bez nutnosti programovat.",
    category: "AI & Tech",
    readTime: "6 min",
    publishedAt: "2026-01-06",
    tags: ["ClickUp", "Codegen", "Acquisition", "Super Agent", "No-code", "Workflow", "AI"],
    featured: true,
    color: "primary"
  },
  {
    id: "windsurf-context-indicator",
    title: "📊 Context Window Indicator: Vizuální přehled o využití kontextu",
    excerpt: "Windsurf Wave 13 přidává vizuální indikátor využití context window. Uživatelé nyní vidí, kolik kontextu je aktuálně spotřebováno, což pomáhá předvídat limity a rozhodnout se, kdy začít novou session.",
    category: "AI & Tech",
    readTime: "4 min",
    publishedAt: "2026-01-06",
    tags: ["Windsurf", "Context", "UX", "Indikátor", "Produktivita"],
    featured: false,
    color: "info"
  },
  {
    id: "leania-ai-audit",
    title: "⚙️ Leania.ai: Audit vašeho workflow a technologického stacku",
    excerpt: "Leania.ai analyzuje vaše pracovní postupy a technologický stack. Zobrazí vám, co ponechat, zrušit, nahradit nebo automatizovat s měřitelnými úsporami nákladů.",
    category: "AI Tools",
    readTime: "6 min",
    publishedAt: "2026-01-06",
    tags: ["Leania", "Audit", "Workflow", "Automatizace"],
    featured: true,
    color: "success"
  },
  {
    id: "automateed-ebooks",
    title: "📔 Automateed: Generujte ebooky a knihy pomocí hlasu",
    excerpt: "Automateed vytváří ebooky, pohádky, omalovánky, deníky a další - jen pomocí vašeho hlasu. Včetně obrázků a obsahu. Ideální pro autory a podnikatele.",
    category: "AI Tools",
    readTime: "5 min",
    publishedAt: "2026-01-06",
    tags: ["Automateed", "Ebooky", "Generování obsahu", "Hlas"],
    featured: true,
    color: "warning"
  },
  {
    id: "market-alerts",
    title: "📈 MarketAlerts.ai: AI hlídá vaše portfolio 24/7",
    excerpt: "MarketAlerts.ai sleduje vaše investiční portfolio nepřetržitě a posílá upozornění, když AI najde insights odpovídající vašemu investičnímu stylu.",
    category: "AI Tools",
    readTime: "5 min",
    publishedAt: "2026-01-06",
    tags: ["MarketAlerts", "Investice", "Portfolio", "AI"],
    featured: true,
    color: "danger"
  },
  {
    id: "notis-ai-intern",
    title: "🚀 Notis: AI intern, který vám aktualizuje úkoly z WhatsApp",
    excerpt: "Notis je AI intern, který aktualizuje vaše úkoly, kalendář, e-maily, sociální sítě, CRM, výdaje a bug tracker - přímo z WhatsApp, iMessage nebo Telegramu.",
    category: "AI Tools",
    readTime: "6 min",
    publishedAt: "2026-01-06",
    tags: ["Notis", "AI asistent", "Produktivita", "Messaging"],
    featured: true,
    color: "primary"
  },
  {
    id: "hello-history",
    title: "📜 Hello History: Živé konverzace s Einsteinem, Kleopatrou a dalšími",
    excerpt: "Hello History vám umožňuje vést autentické konverzace s Einsteinem, Kleopatrou, Buddou a dalšími historickými osobnostmi pomocí AI s pokročilým uvažováním.",
    category: "AI Tools",
    readTime: "5 min",
    publishedAt: "2026-01-06",
    tags: ["Hello History", "Historie", "Vzdělávání", "AI"],
    featured: true,
    color: "info"
  },
  {
    id: "rabbit-holes-ai",
    title: "🐰 RabbitHoles AI: Organizujte chaty jako uzly na nekonečném plátně",
    excerpt: "RabbitHoles AI organizuje konverzace jako uzly na nekonečném plátně. Přepínejte mezi modely a znovu používejte prompty napříč větvemi.",
    category: "AI Tools",
    readTime: "5 min",
    publishedAt: "2026-01-06",
    tags: ["RabbitHoles", "Organizace", "AI chat", "Produktivita"],
    featured: true,
    color: "success"
  },
  {
    id: "color-penguin",
    title: "🐧 ColorPenguin: Proměňte jakýkoli nápad v omalovánku",
    excerpt: "ColorPenguin promění jakýkoli nápad v printable omalovánku. Přestaňte hledat a začněte navrhovat přesně to, co chcete.",
    category: "AI Tools",
    readTime: "4 min",
    publishedAt: "2026-01-06",
    tags: ["ColorPenguin", "Omalovánky", "Design", "Tisk"],
    featured: true,
    color: "warning"
  },
  {
    id: "anam-ai-video",
    title: "🎭 Anam: Tvořte fotorealistické AI video agenty s vlastní tváří",
    excerpt: "Anam vám umožňuje vytvářet fotorealistické AI video agenty s vlastními tvářemi, hlasy a emocemi. Nasazení pomocí pár řádků kódu.",
    category: "AI Tools",
    readTime: "6 min",
    publishedAt: "2026-01-06",
    tags: ["Anam", "Video AI", "Agenti", "Automatizace"],
    featured: true,
    color: "danger"
  },
  {
    id: "deepwander-ai",
    title: "🧘 Deepwander: Objevte kořenovou příčinu vašich pocitů a skryté vzorce",
    excerpt: "Deepwander vám pomůže pochopit kořenovou příčinu zmatení nebo uvízlých pocitů. Ponoří se do vaší situace a odhalí skryté vzorce v myšlení.",
    category: "AI Tools",
    readTime: "5 min",
    publishedAt: "2026-01-06",
    tags: ["Deepwander", "Wellness", "Mentální zdraví", "AI"],
    featured: true,
    color: "info"
  },
  {
    id: "scan-relief",
    title: "🧾 ScanRelief: Skenujte účtenky a automaticky generujte Excel report",
    excerpt: "ScanRelief skenuje účtenky na vašem disku, přejmenuje soubory podle data, částky a dodavatele a automaticky vygeneruje Excel report.",
    category: "AI Tools",
    readTime: "4 min",
    publishedAt: "2026-01-06",
    tags: ["ScanRelief", "Účtenky", "Excel", "Automatizace"],
    featured: true,
    color: "success"
  },
  {
    id: "nova-kategorie-design-modeling",
    title: "🎨 Nové vzdělávací kategorie: Design, Móda, Modeling a Sportovní sázky",
    excerpt: "Platforma Tomas Learning Platform rozšiřuje své vzdělávací možnosti o čtyři zcela nové kategorie. Naučte se grafický design, vytvářet vlastní oblečení, stát se modelkou nebo pochopit svět sportovních sázek.",
    category: "Novinky",
    readTime: "12 min",
    publishedAt: "2026-01-06",
    tags: ["Nové kategorie", "Design", "Móda", "Modeling", "Sportovní sázky", "Vzdělávání"],
    featured: true,
    color: "danger"
  },
  {
    id: "graficky-design-kurz",
    title: "🎨 Grafický design: Od nulových znalostí k profesionálnímu portfoliu",
    excerpt: "Kompletní průvodce naším novým kurzem grafického designu. Naučte se teorii barev, typografii, kompozici a vytvářejte úžasné vizuální obsah pro sociální sítě, web i tisk.",
    category: "Design",
    readTime: "15 min",
    publishedAt: "2026-01-06",
    tags: ["Grafický design", "Photoshop", "Typografie", "Barvy", "Kurz"],
    featured: true,
    color: "warning"
  },
  {
    id: "modni-navrh-a-vyroba-obleceni",
    title: "👗 Od skicy k hotovému kusu: Kompletní průvodce módního návrhářství",
    excerpt: "Ponořte se do světa módy s naším novým kurzem módního návrhářství. Naučte se kreslit módní skici, vytvářet střihy, pracovat s textiliemi a šít profesionální oděvy.",
    category: "Móda",
    readTime: "18 min",
    publishedAt: "2026-01-06",
    tags: ["Módní návrhářství", "Střihy", "Textil", "Šití", "Móda"],
    featured: true,
    color: "danger"
  },
  {
    id: "modeling-kariera",
    title: "📸 Modeling: Jak začít a budovat úspěšnou kariéru před kamerou",
    excerpt: "Vše, co potřebujete vědět o kariéře v modelingu. Od základů pozování, přes passerunning, až po budování profesionálního portfolia a spolupráci s agenturami.",
    category: "Modeling",
    readTime: "14 min",
    publishedAt: "2026-01-06",
    tags: ["Modeling", "Portfolia", "Kariéra", "Fotografie", "Pasen"],
    featured: true,
    color: "pink"
  },
  {
    id: "nvidia-rubin",
    title: "🚀 NVIDIA představuje revoluční Rubin architekturu pro AI superpočítače",
    excerpt: "NVIDIA odhalila Rubin, zcela novou rack-scale AI platformu složenou ze šesti vlastních čipů fungujících jako jeden superpočítač. Tato architektura slibuje 10× nižší náklady na token a výrazně vyšší výkon než předchozí Blackwell generace.",
    category: "AI & Tech",
    readTime: "10 min",
    publishedAt: "2026-01-06",
    tags: ["NVIDIA", "Rubin", "AI", "Čipy", "Superpočítač"],
    featured: true,
    color: "success"
  },
  {
    id: "nvidia-alpamayo",
    title: "🚗 NVIDIA spouští Alpamayo: Open-source modely pro autonomní vozidla",
    excerpt: "NVIDIA představila Alpamayo, sadu open-source AI modelů a nástrojů pro vývoj autonomních vozidel. Srdcem je model Alpamayo 1 s 10 miliardami parametrů, který využívá vision-language-action reasoning pro interpretaci dopravních situací.",
    category: "AI & Tech",
    readTime: "8 min",
    publishedAt: "2026-01-06",
    tags: ["NVIDIA", "Alpamayo", "Autonomní vozidla", "AI", "Open-source"],
    featured: true,
    color: "primary"
  },
  {
    id: "meta-ai-vedeni",
    title: "👨‍💼 Meta AI: Obavy o talentované výzkumníky po jmenování mladého šéfa",
    excerpt: "Yann LeCun, bývalý šéf AI v Meta, varoval před odlivem výzkumníků po jmenování 29letého Alexandra Wanga jako hlavního AI officer. Wang, spoluzakladatel Scale AI, přešel do Meti poté, co firma koupila 49% podíl v jeho společnosti.",
    category: "AI & Tech",
    readTime: "6 min",
    publishedAt: "2026-01-06",
    tags: ["Meta", "AI", "Yann LeCun", "Alexandr Wang", "Kariéra"],
    featured: true,
    color: "info"
  },
  {
    id: "alexida-web",
    title: "👩‍💻 Alexa vstupuje do boje chatovacích asistentů na webu",
    excerpt: "Amazon spustil Alexa.com s AI asistentem Alexa+ pro webové prohlížeče. Synchronizace napříč zařízeními a e-commerce integrace.",
    category: "AI & Tech",
    readTime: "5 min",
    publishedAt: "2026-01-06",
    tags: ["Amazon", "Alexa", "AI asistent", "Web"],
    featured: true,
    color: "warning"
  },
  {
    id: "investice-2026-prehled",
    title: "📈 Investice v roce 2026: Přehled globálních trhů a příležitostí",
    excerpt: "Komplexní přehled investičních příležitostí v roce 2026. Dow Jones na rekordech, měď na maximálních hodnotách, Bitcoin se vrací. Jak se orientovat v dynamickém tržním prostředí?",
    category: "Investice",
    readTime: "12 min",
    publishedAt: "2026-01-06",
    tags: ["Investice", "Akcie", "Krypto", "Komodity", "2026"],
    featured: true,
    color: "success"
  },
  {
    id: "bitcoin-rally-2026",
    title: "₿ Bitcoin se vrací: Cena překonává 93 700 $ a analytici jsou bullish",
    excerpt: "Bitcoin na začátku roku 2026 překonal hranici 93 700 $. Analytici poukazují na vyšší objemy, institucionální toky a býčí pozice opcí. Co pohání rally a kam míří cena?",
    category: "Investice",
    readTime: "8 min",
    publishedAt: "2026-01-06",
    tags: ["Bitcoin", "Kryptoměny", "Investice", "Cena BTC"],
    featured: true,
    color: "warning"
  },
  {
    id: "med-rally-cena",
    title: "📈 Měď v plamenech: Cena poprvé přes 13 000 $ za tunu",
    excerpt: "Měď poprvé vzrostla nad 13 000 $ za tunu. Rally od listopadu přesáhla 20 %. Obavy z cel, spekulativní nákupy a rostoucí poptávka z energetiky a technologií pohánějí růst.",
    category: "Investice",
    readTime: "6 min",
    publishedAt: "2026-01-06",
    tags: ["Měď", "Komodity", "Investice", "Cena"],
    featured: true,
    color: "danger"
  },
  {
    id: "amd-nvidia-ai-zavod",
    title: "🎯 AMD vs NVIDIA: Závod o dominanci v AI čipech se vyostřuje",
    excerpt: "AMD představila na CES čip MI455 s 70 % více tranzistory. Generální ředitelka Lisa Su zdůraznila revoluční výkon racku Helios. Jaké jsou vyhlídky obou gigantů v roce 2026?",
    category: "Investice",
    readTime: "10 min",
    publishedAt: "2026-01-06",
    tags: ["AMD", "NVIDIA", "AI čipy", "Investice", "Technologie"],
    featured: true,
    color: "primary"
  },
  {
    id: "nejdulezitejsi-novinky-trhy",
    title: "📊 Nejdůležitější novinky: Dow na rekordech, evropské akcie rostou",
    excerpt: "Americké futures beze změny po rekordním Dow, trhy ignorují geopolitiku. Energetické akcie vedou zisky. Evropa otevřela výše po svržení Madura a před inflací.",
    category: "Investice",
    readTime: "7 min",
    publishedAt: "2026-01-06",
    tags: ["Dow Jones", "Akcie", "Wall Street", "Evropské trhy"],
    featured: true,
    color: "info"
  },
  {
    id: "movers-shakers-akcie",
    title: "Movers & Shakers: Chevron, GM, Costco a Nvidia v centru pozornosti",
    excerpt: "Chevron prudce vzrostl díky venezuelské ropě, GM hlásí růst prodeje, Costco na comebacku, Nvidia na CES. Přehled největších pohybů na trzích.",
    category: "Investice",
    readTime: "9 min",
    publishedAt: "2026-01-06",
    tags: ["Chevron", "GM", "Costco", "Nvidia", "Akcie"],
    featured: true,
    color: "success"
  },
  {
    id: "openai-audio-first",
    title: "🗣️ OpenAI sází na Audio-First AI: Nové ChatGPT modely mluví přirozeně",
    excerpt: "OpenAI plánuje nové audio modely ChatGPT, které budou mluvit přirozeně, reagovat na přerušení a mluvit současně s uživateli. V roce 2026 se očekává ekosystém audio zařízení.",
    category: "AI & Tech",
    readTime: "7 min",
    publishedAt: "2026-01-06",
    tags: ["OpenAI", "ChatGPT", "Audio AI", "Hlasoví asistenti"],
    featured: true,
    color: "primary"
  },
  {
    id: "deepseek-manifold",
    title: "💡 DeepSeek přepisuje AI architekturu: Nový design bez vysokých nákladů",
    excerpt: "Čínský startup DeepSeek navrhl \"manifold-constrained hyper-connection\" design, který vylepšuje ResNet a škáluje LLM výkon bez vysokých výpočetních nákladů. Výzkumníci diskutují.",
    category: "AI & Tech",
    readTime: "8 min",
    publishedAt: "2026-01-06",
    tags: ["DeepSeek", "AI", "Architektura", "Čína"],
    featured: true,
    color: "success"
  },
  {
    id: "india-x-grok",
    title: "👨‍⚖️ Indie nařídila X opravit Grok: 72 hodin na nápravu \"obscénního\" obsahu",
    excerpt: "Nové Dillí nařídilo Elona Muska X opravit ochranné prvky Groku do 72 hodin. Neuposlechnutí by mohlo zbavit platformu právní imunity.",
    category: "AI & Tech",
    readTime: "5 min",
    publishedAt: "2026-01-06",
    tags: ["Indie", "X", "Grok", "Regulace"],
    featured: true,
    color: "warning"
  },
  {
    id: "xai-grok-enterprise",
    title: "🚀 xAI spouští Grok pro podniky: Vault zabezpečení a firemní funkce",
    excerpt: "Muskovo xAI spustilo Grok Business a Enterprise se zabezpečeným \"Vaultem\" pro týmy. Spuštění zastíněno skandály s deepfake a nesouhlasnými obrázky.",
    category: "AI & Tech",
    readTime: "6 min",
    publishedAt: "2026-01-06",
    tags: ["xAI", "Grok", "Enterprise", "Musk"],
    featured: true,
    color: "danger"
  },
  {
    id: "15-black-swans-2026",
    title: "🫨 15 Černých labutí pro 2026: Nepravděpodobné, ale možné šoky",
    excerpt: "POLITICO požádalo futuristy a analytiky o mapování nepravděpodobných, ale plausibilních šoků od AI chaosu po deepfake politiku, které mohou otřást globální stabilitou.",
    category: "AI & Tech",
    readTime: "10 min",
    publishedAt: "2026-01-06",
    tags: ["Black Swan", "2026", "Futurismus", "Rizika"],
    featured: true,
    color: "info"
  },
  {
    id: "european-banks-ai-cuts",
    title: "🚪 Evropské banky se připravují na AI propouštění: 200 000 míst do 2030",
    excerpt: "Analýza Morgan Stanley říká, že banky mohou snížit 200 000 pracovních míst do roku 2030 díky AI. Nejhůře zasaženy back-office, risk a compliance role.",
    category: "AI & Tech",
    readTime: "7 min",
    publishedAt: "2026-01-06",
    tags: ["Banky", "AI", "Propouštění", "Evropa"],
    featured: true,
    color: "success"
  },
  {
    id: "nikdy-chatgpt",
    title: "🤐 5 věcí, které nikdy neříkejte ChatGPT: Osobní, finanční a pracovní údaje",
    excerpt: "Technologický průvodce varuje před sdílením osobních, finančních, zdravotních, pracovních nebo nelegálních detailů s AI chatboty. Důvodem jsou úniky dat a slabé ochrany.",
    category: "AI & Tech",
    readTime: "6 min",
    publishedAt: "2026-01-06",
    tags: ["ChatGPT", "Soukromí", "Bezpečnost", "AI"],
    featured: true,
    color: "warning"
  },
  {
    id: "nvidia-investice",
    title: "💸 NVIDIA investuje miliardy: Rozšiřování vlivu daleko za GPU",
    excerpt: "NVIDIA, nyní hodnota 4,6 bilionu dolarů, podpořila desítky AI startupů s investicemi přes 100 milionů dolarů od roku 2023. Vliv sahá do modelů, datových center a robotiky.",
    category: "AI & Tech",
    readTime: "8 min",
    publishedAt: "2026-01-06",
    tags: ["NVIDIA", "Investice", "AI", "Startupy"],
    featured: true,
    color: "primary"
  },
    {
        id: "instagram-reality-optional",
        title: "⚠️ Instagram varuje: Realita je volitelná, AI smazalo důvěru v obrázky",
        excerpt: "CEO Adam Mosseri říká, že AI smazalo výchozí důvěru v obrázky. Platformy by měly přidat štítky a signály důvěryhodnosti.",
        category: "AI & Tech",
        readTime: "5 min",
        publishedAt: "2026-01-06",
        tags: ["Instagram", "AI", "Deepfake", "Důvěryhodnost"],
        featured: true,
        color: "info"
    },
    {
        id: "ai-agentic-patterns",
        title: "🚀 Agentic Design Patterns: 21 kapitol o budování fungujících AI agentů",
        excerpt: "Kompletní průvodce budováním AI agentů, kteří skutečně fungují. Pokrývá prompt chaining, plánování, MCP, guardrails a multi-agent komunikaci.",
        category: "AI & Tech",
        readTime: "12 min",
        publishedAt: "2026-01-06",
        tags: ["AI Agenti", "Agentic AI", "Prompt Engineering", "Design Patterns"],
        featured: true,
        color: "primary"
    },
    {
        id: "ai-threat-is-us",
        title: "🌍 Nebezpečí není AI, jsme to my",
        excerpt: "Mnozí věří, že AGI přijde letos. Ale skutečné nebezpečí? Lidé zneužijí AI dříve, než bude dost chytrá na to, aby odmítla.",
        category: "AI & Tech",
        readTime: "8 min",
        publishedAt: "2026-01-06",
        tags: ["AGI", "Bezpečnost AI", "Etika", "Lidský faktor"],
        featured: true,
        color: "danger"
    },
    {
        id: "ai-interview-coach",
        title: "🎓 Vytvořte AI kouče na přijímačky: Praktický video kurz",
        excerpt: "Hands-on video kurz pokrývající memory, APIs, prompt chaining a task routing. Na konci budete mít funkčního AI agenta.",
        category: "AI & Tech",
        readTime: "10 min",
        publishedAt: "2026-01-06",
        tags: ["AI Coach", "Video kurz", "AI Agent", "Vzdělávání"],
        featured: true,
        color: "success"
    },
    {
        id: "nano-banana-prompting",
        title: "🍌 Nano-Banana Pro: Oficiální průvodce promptováním",
        excerpt: "Naučte se o text renderingu, konzistenci postav, 4K výstupu a 2D-to-3D translaci. Kompletní playbook pro Nano-Banana Pro.",
        category: "AI & Tech",
        readTime: "7 min",
        publishedAt: "2026-01-06",
        tags: ["Nano-Banana", "Prompting", "AI", "Guide"],
        featured: true,
        color: "warning"
    },
    {
        id: "claude-nes-emulator",
        title: "🎮 Claude vytvořil funkční NES emulátor",
        excerpt: "Vývojář požádal Clauda, aby napsal funkční NES emulátor v Lua. Kód ho bez problémů. Můžete hrát Donkey Kong v prohlížeči.",
        category: "AI & Tech",
        readTime: "5 min",
        publishedAt: "2026-01-06",
        tags: ["Claude", "NES Emulator", "AI", "Programování"],
        featured: true,
        color: "info"
    },
    {
        id: "europe-ai-climate",
        title: "⚡ Evropa: Konflikt mezi AI a klimatem",
        excerpt: "Evropská snaha o konkurenceschopnost v AI se střetává s klimatickými závazky. Energeticky náročná datová centra nutí vlády revidovat udržitelné politiky.",
        category: "AI & Tech",
        readTime: "7 min",
        publishedAt: "2026-01-06",
        tags: ["Evropa", "AI", "Klima", "Datová centra"],
        featured: true,
        color: "success"
    },
    {
        id: "ram-prices-ai",
        title: "💾 AI boom dělá RAM nedostupnou",
        excerpt: "Framework zvyšuje ceny DDR5 na $10 za GB, další růst očekáván v roce 2026. Výrobci pamětí přesměrovávají zásoby na AI trhy, spotřebitelé čelí vyšším cenám.",
        category: "AI & Tech",
        readTime: "6 min",
        publishedAt: "2026-01-06",
        tags: ["RAM", "DDR5", "AI", "Hardware", "Ceny"],
        featured: true,
        color: "warning"
    },
    {
        id: "senators-ai-guard-act",
        title: "🏛️ Senátoři požadují akci proti rizikům AI",
        excerpt: "Bernie Sanders a Katie Britt varují před riziky AI pro děti, pracovníky a demokracii. Navrhovaný GUARD Act by donutil tech firmy ověřovat věk.",
        category: "AI & Tech",
        readTime: "8 min",
        publishedAt: "2026-01-06",
        tags: ["Senát", "GUARD Act", "Regulace", "AI bezpečnost"],
        featured: true,
        color: "danger"
    },
    {
        id: "watch-my-competitor",
        title: "🔎 WatchMyCompetitor: Sledujte konkurenci v reálném čase",
        excerpt: "WatchMyCompetitor sleduje cenové politiky, produktové inovace a kampaně vašich konkurentů. Denní ověřené insights pro vaše rozhodování.",
        category: "AI Tools",
        readTime: "5 min",
        publishedAt: "2026-01-06",
        tags: ["Konkurence", "Monitoring", "Business", "Analytics"],
        featured: true,
        color: "success"
    },
    {
        id: "remio",
        title: "👀 Remio: Zachycujte a synchronizujte vše",
        excerpt: "Remio zachytí vše, co vidíte, synchronizuje lokální soubory a nabízí neomezené nahrávky a přepisy. Nyní dostupné pro Windows.",
        category: "AI Tools",
        readTime: "5 min",
        publishedAt: "2026-01-06",
        tags: ["Zachycení", "Synchronizace", "Přepisy", "Produktivita"],
        featured: true,
        color: "primary"
    },
    {
        id: "novakit-cli",
        title: "⌨️ NovaKit CLI: AI coding agent v terminálu",
        excerpt: "NovaKit CLI vám dává AI coding agent přímo do terminálu. Multi-provider podpora, okamžité rewind a sémantické vyhledávání kódu.",
        category: "AI Tools",
        readTime: "6 min",
        publishedAt: "2026-01-06",
        tags: ["CLI", "AI Coding", "Terminal", "Vývoj"],
        featured: true,
        color: "warning"
    },
    {
        id: "indie-gtm",
        title: "📹 IndieGTM: 28denní kampaň z jednoho nápadu",
        excerpt: "IndieGTM promění jeden nápad v 28denní content kampaň s denními videi, příspěvky a obrázky. Už nikdy nebudete váhat co publikovat.",
        category: "AI Tools",
        readTime: "5 min",
        publishedAt: "2026-01-06",
        tags: ["Content", "Marketing", "Social Media", "Automation"],
        featured: true,
        color: "danger"
    },
    {
        id: "lotus-eye",
        title: "⚠️ LotusEye: AI hlídač anomálií",
        excerpt: "LotusEye se učí normálnímu chování senzorů z vašich dat a upozorní vás na anomálie. Zdarma vytvoření modelu.",
        category: "AI Tools",
        readTime: "5 min",
        publishedAt: "2026-01-06",
        tags: ["Anomálie", "Sensory", "Monitoring", "Analytics"],
        featured: true,
        color: "info"
    },
    {
        id: "bugfree-ai",
        title: "🎯 Bugfree.ai: LeetCode pro system design pohovory",
        excerpt: "Bugfree.ai je LeetCode pro system design a behaviorální pohovory. 150+ guided problems a AI mock interviews s hodnocením odpovědí.",
        category: "AI Tools",
        readTime: "6 min",
        publishedAt: "2026-01-06",
        tags: ["Pohovory", "System Design", "Vzdělávání", "AI"],
        featured: true,
        color: "success"
    },
    {
        id: "free-text-to-speech",
        title: "🔊 Free Text-To-Speech: Microsoft AI s 330+ hlasy",
        excerpt: "Převede text na živoucí audio pomocí Microsoft AI. 330+ neural hlasů v 129 jazycích. Zcela zdarma.",
        category: "AI Tools",
        readTime: "4 min",
        publishedAt: "2026-01-06",
        tags: ["TTS", "Audio", "Microsoft", "Free"],
        featured: true,
        color: "primary"
    },
    {
        id: "humanoidni-roboty-2026",
    title: "Humanoidní Roboti 2026: Nová éra robotiky",
    excerpt: "Přehled nejnovějších humanoidních robotů od Figure AI, Boston Dynamics, Tesla a dalších. Jak se mění průmysl a co přinese budoucnost.",
    category: "Robotika",
    readTime: "20 min",
    publishedAt: "2025-01-06",
    tags: ["Humanoidní roboti", "Figure AI", "Boston Dynamics", "Tesla Optimus", "Robotika", "AI"],
    featured: true,
    color: "primary"
  },
  {
    id: "mcp-model-context-protocol",
    title: "MCP - Model Context Protocol: Revoluce v AI",
    excerpt: "Anthropic představuje MCP protokol pro propojení AI modelů s datovými zdroji. Jak změní architekturu aplikací a vývoj AI.",
    category: "AI",
    readTime: "18 min",
    publishedAt: "2025-01-06",
    tags: ["MCP", "Model Context Protocol", "Anthropic", "AI", "API", "Integrace"],
    featured: true,
    color: "success"
  },
  {
    id: "vnozene-uceni",
    title: "Vnořené učení: Nová dimenze v architektuře AI",
    excerpt: "Google DeepMind představuje Nested Learning, paradigma které odhaluje komplexní architekturu moderních ML modelů a nabízí nové cesty pro vývoj sebezdokonalující se umělé inteligence.",
    category: "AI",
    readTime: "25 min",
    publishedAt: "2024-12-15",
    tags: ["Vnořené učení", "DeepMind", "AI Architectures", "Machine Learning"],
    featured: true,
    color: "primary"
  },
  {
    id: "prvni-prototyp",
    title: "První prototyp Tomas Learning Platform",
    excerpt: "Příběh o vzniku prvního prototypu osobní platformy pro vzdělávání a kariéru.",
    category: "Vývoj",
    readTime: "5 min",
    publishedAt: "2025-01-15",
    tags: ["Platforma", "Prototyp", "Vývoj"],
    featured: false,
    color: "primary"
  },
  {
    id: "koncepce-a-vize",
    title: "Koncepce a vize platformy",
    excerpt: "Jak vznikla myšlenka propojit vzdělávání, práci a osobní rozvoj do jedné aplikace.",
    category: "Návrh",
    readTime: "7 min",
    publishedAt: "2025-01-20",
    tags: ["Koncepce", "Vize", "Design"],
    featured: false,
    color: "success"
  },
  {
    id: "technologicky-stack",
    title: "Výběr technologie: Next.js + TypeScript",
    excerpt: "Proč jsme zvolili Next.js, React a TypeScript jako základ pro platformu.",
    category: "Technologie",
    readTime: "6 min",
    publishedAt: "2025-01-25",
    tags: ["Next.js", "TypeScript", "React"],
    featured: false,
    color: "info"
  },
  {
    id: "databaze-a-model",
    title: "Návrh databázového modelu",
    excerpt: "Jak jsme navrhli strukturu dat pro ukládání kurzů, úkolů a uživatelského pokroku.",
    category: "Backend",
    readTime: "8 min",
    publishedAt: "2025-02-01",
    tags: ["Databáze", "Prisma", "Model"],
    featured: false,
    color: "warning"
  },
  {
    id: "ui-design-system",
    title: "Vytvoření UI design systému",
    excerpt: "Postupné budování konzistentního designu pomocí Bootstrap 5 a vlastních komponent.",
    category: "Frontend",
    readTime: "9 min",
    publishedAt: "2025-02-10",
    tags: ["UI", "Design", "Bootstrap"],
    featured: false,
    color: "danger"
  },
  {
    id: "mise-system",
    title: "Implementace misí a úkolů",
    excerpt: "Jak funguje systém misí, úkolů a sledování pokroku v reálném čase.",
    category: "Funkcionalita",
    readTime: "10 min",
    publishedAt: "2025-02-15",
    tags: ["Mise", "Úkoly", "Gamifikace"],
    featured: true,
    color: "dark"
  },
  {
    id: "job-board",
    title: "Job board s drag & drop",
    excerpt: "Vytvoření interaktivní nabídky práce s možností archivovat pozice.",
    category: "Funkcionalita",
    readTime: "7 min",
    publishedAt: "2025-02-20",
    tags: ["Job Board", "Drag & Drop", "práce"],
    featured: false,
    color: "secondary"
  },
  {
    id: "ai-integrace",
    title: "AI chat bot 'Akize'",
    excerpt: "Integrace AI chat bota pro kariérové poradenství a otázky o platformě.",
    category: "AI",
    readTime: "11 min",
    publishedAt: "2025-02-25",
    tags: ["AI", "Chat Bot", "Akize"],
    featured: true,
    color: "primary"
  },
  {
    id: "online-kurzy",
    title: "Systém online kurzů",
    excerpt: "Jak jsme implementovali kompletní systém kurzů s lekcemi a sledováním pokroku.",
    category: "Vzdělávání",
    readTime: "9 min",
    publishedAt: "2025-03-01",
    tags: ["Kurzy", "Vzdělávání", "Lekce"],
    featured: false,
    color: "success"
  },
  {
    id: "analyticky-dashboard",
    title: "Analytický dashboard",
    excerpt: "Vizualizace statistik, pokroku a úspěchů uživatele v přehledných grafech.",
    category: "Analytics",
    readTime: "8 min",
    publishedAt: "2025-03-05",
    tags: ["Dashboard", "Statistiky", "Vizualizace"],
    featured: false,
    color: "info"
  },
  {
    id: "reklamni-system",
    title: "Reklamní systém a monetizace",
    excerpt: "Návrh a implementace reklamního systému s freemium modelem pro příjmy z aplikace.",
    category: "Business",
    readTime: "10 min",
    publishedAt: "2025-03-10",
    tags: ["Monetizace", "Reklamy", "Freemium"],
    featured: true,
    color: "warning"
  },
  {
    id: "career-report",
    title: "Komplexní kariérní report",
    excerpt: "Průvodce všemi typy prací na světě, platy a kariérními cestami.",
    category: "Kariéra",
    readTime: "15 min",
    publishedAt: "2025-03-15",
    tags: ["Kariéra", "Práce", "Platy"],
    featured: true,
    color: "danger"
  },
  {
    id: "clanky-system",
    title: "Systém článků a obsahu",
    excerpt: "Jak funguje systém pro správu článků, kategorií a newsletterů.",
    category: "CMS",
    readTime: "6 min",
    publishedAt: "2025-03-20",
    tags: ["Články", "CMS", "Obsah"],
    featured: false,
    color: "dark"
  },
  {
    id: "testovani-a-deploy",
    title: "Testování a nasazení",
    excerpt: "Jak jsme nastavili testování, CI/CD a nasazení aplikace na produkční prostředí.",
    category: "DevOps",
    readTime: "9 min",
    publishedAt: "2025-03-25",
    tags: ["Testování", "CI/CD", "Deploy"],
    featured: false,
    color: "primary"
  },
  {
    id: "uzivatelsky-testing",
    title: "Uživatelské testování",
    excerpt: "Zpětná vazba od prvních uživatelů a zjištěné problémy a úpravy.",
    category: "UX",
    readTime: "8 min",
    publishedAt: "2025-03-28",
    tags: ["UX", "Testování", "Zpětná vazba"],
    featured: false,
    color: "success"
  },
  {
    id: "vylepseni-beta",
    title: "Vylepšení pro beta verzi",
    excerpt: "Seznam vylepšení, nové funkce a opravy chyb před uvedením beta verze.",
    category: "Vývoj",
    readTime: "12 min",
    publishedAt: "2025-03-31",
    tags: ["Beta", "Vylepšení", "Bug fixes"],
    featured: true,
    color: "info"
  },
  {
    id: "skip-to-content",
    title: "Skip to Content - Přeskočení navigace pro přístupný web",
    excerpt: "Naučte se implementovat Skip to Content odkaz - klíčový prvek webové přístupnosti, který umožňuje uživatelům s klávesnicí rychle se dostat k hlavnímu obsahu stránky bez nutnosti procházet opakující se navigaci.",
    category: "Web",
    readTime: "8 min",
    publishedAt: "2025-01-05",
    tags: ["Accessibility", "WCAG", "A11y", "HTML", "CSS", "UX"],
    featured: true,
    color: "primary"
  },
  {
    id: "kalendarni-vek-vs-biologicky-vek",
    title: "📅 Kalendářní věk měj v piči, důležitej je biologickej věk",
    excerpt: "Proč je číslo v občance jen statistika a skutečný věk se skrývá hlouběji. Jak měřit skutečný biologický stav těla a proč byste měli přestat sledovat narozeniny.",
    category: "Zdraví",
    readTime: "10 min",
    publishedAt: "2026-01-08",
    tags: ["Zdraví", "Biologický věk", "Stárnutí", "Wellness", "Delší život"],
    featured: true,
    color: "success"
  },
  {
    id: "nvidia-older-gpus",
    title: "🔄 NVIDIA zvažuje oživení starších GPU",
    excerpt: "Generální ředitel Jensen Huang naznačil, že by NVIDIA mohla obnovit výrobu starších grafických karet, aby zmírnila nedostatek na trhu. Nápad kombinovat starší architektury s novými AI funkcemi by mohl nabídnout levnější možnosti pro hráče.",
    category: "Hardware",
    readTime: "5 min",
    publishedAt: "2026-01-08",
    tags: ["NVIDIA", "GPU", "Hardware", "Gaming", "AI"],
    featured: true,
    color: "success"
  },
  {
    id: "anthropic-350b-valuation",
    title: "💰 Anthropic míří na valuaci 350 miliard dolarů",
    excerpt: "Anthropic údajně získává 10 miliard dolarů při valuaci 350 miliard, což je téměř zdvojnásobení hodnoty za pouhé tři měsíce. Kolo vede Coatue a singapurský GIC. Akvizice následuje po 13miliardovém raise při valuaci 183 miliard.",
    category: "AI & Tech",
    readTime: "6 min",
    publishedAt: "2026-01-08",
    tags: ["Anthropic", "Claude", "AI", "Investice", "Valuace"],
    featured: true,
    color: "warning"
  },
  {
    id: "ai-battle-planning",
    title: "🦾 AI porazilo lidi v plánování bitev",
    excerpt: "Experimenty amerického letectva ukázaly, že AI nástroje generují plány pro řízení boje rychleji a s menším počtem chyb než lidské týmy. V komplexních scénářích nejlepší AI systémy produkovaly životaschopné plány až o 90 % rychleji.",
    category: "AI & Tech",
    readTime: "7 min",
    publishedAt: "2026-01-08",
    tags: ["AI", "Vojenství", "Battle Planning", "USAF", "Automatizace"],
    featured: true,
    color: "danger"
  },
  {
    id: "openai-chatgpt-health",
    title: "👩‍⚕️ OpenAI spouští ChatGPT Health",
    excerpt: "Přes 230 milionů lidí týdně vyhledává zdravotní a wellness otázky na platformě. ChatGPT Health je nový dedikovaný zdravotní zážitek.",
    category: "AI & Tech",
    readTime: "5 min",
    publishedAt: "2026-01-08",
    tags: ["OpenAI", "ChatGPT", "Health", "Wellness", "AI asistent"],
    featured: true,
    color: "primary"
  },
  {
    id: "cnc-programming-web-developer",
    title: "🔧 CNC Programování pro Web Vývojáře - Úvod do G-kódu",
    excerpt: "Máte IT background a chcete se naučit CNC programování? Tento průvodce vám ukáže, jak využít své programátorské dovednosti ve světě výroby.",
    category: "CNC & Engineering",
    readTime: "12 min",
    publishedAt: "2026-01-08",
    tags: ["CNC", "G-kód", "CAD", "CAM", "Programování", "Výroba"],
    featured: true,
    color: "success"
  },
  {
    id: "cad-cam-software-srovnani-2026",
    title: "📊 Srovnání CAD/CAM Softwaru 2026 - Autodesk vs Alternativy",
    excerpt: "Kompletní srovnání Fusion 360, FreeCAD, Mastercam, SolidWorks a dalších. Který software je pro vás ten pravý? ROI analýza a doporučení.",
    category: "CNC & Engineering",
    readTime: "15 min",
    publishedAt: "2026-01-08",
    tags: ["CAD", "CAM", "Fusion 360", "FreeCAD", "Mastercam", "Software", "Výroba"],
    featured: true,
    color: "warning"
  },
  {
    id: "cnc-simulatory-kde-trenovat",
    title: "🖥️ CNC Simulátory - Kde Trénovat G-kód Bez Stroje",
    excerpt: "Přehled dostupných CNC simulátorů od zdarma po profesionální. Fagor, CAMotics, CNC Simulator Pro a jak si postavit vlastní.",
    category: "CNC & Engineering",
    readTime: "10 min",
    publishedAt: "2026-01-08",
    tags: ["CNC", "Simulátor", "G-kód", "Trénink", "CAMotics", "Fagor"],
    featured: true,
    color: "info"
  },
  {
    id: "vlastni-cnc-simulator-nextjs",
    title: "🚀 Jak Postavit Vlastní CNC Simulator v Next.js",
    excerpt: "Využijte svůj IT background k vytvoření vlastního CNC simulátoru. Architektura, G-code parser, 3D vizualizace.",
    category: "CNC & Engineering",
    readTime: "18 min",
    publishedAt: "2026-01-08",
    tags: ["CNC", "Next.js", "JavaScript", "Three.js", "Simulátor", "Programování"],
    featured: true,
    color: "danger"
  },
  {
    id: "meta-manus-acquisition-scrutiny",
    title: "🇨🇳🇺🇸 Meta's Manus Akvizice Pod Drobnohledem",
    excerpt: "Meta koupila AI startup Manus za 2 miliardy dolarů. Zatímco USA jsou v klidu, Čína přezkoumává, zda obchod neporušuje exportní kontroly. Peking zkoumá přesun firmy z Pekingu do Singapuru.",
    category: "AI & Tech",
    readTime: "6 min",
    publishedAt: "2026-01-08",
    tags: ["Meta", "Manus", "AI", "Akvizice", "Čína", "Regulace"],
    featured: true,
    color: "warning"
  },
  {
    id: "manufacturing-automation-breakthrough",
    title: "🏭 AI Tlačí Výrobu k Dlouho Slíbenému Průlomu v Automatizaci",
    excerpt: "Pokroky v umělé inteligenci posouvají výrobu k dlouho očekávanému bodu zlomu po desetiletích stagnace. Klesající náklady na roboty, nedostatek pracovních sil a generativní AI nástroje mění průmysl.",
    category: "AI & Tech",
    readTime: "7 min",
    publishedAt: "2026-01-08",
    tags: ["Výroba", "Automatizace", "AI", "Robotika", "Průmysl 4.0"],
    featured: true,
    color: "success"
  },
  {
    id: "kilo-new-features-january-2026",
    title: "⚡ Kilo Code Update: Agent Skills, CLI Paste & MiniMax M2.1 Zdarma",
    excerpt: "Kilo přináší Agent Skills pro rozšíření AI agentů, CLI podporu pro paste obrázků, MiniMax M2.1 model zdarma a další vylepšení. Připojte se na live show!",
    category: "AI & Tech",
    readTime: "5 min",
    publishedAt: "2026-01-08",
    tags: ["Kilo", "AI Coding", "Agent Skills", "CLI", "MiniMax", "Update"],
    featured: true,
    color: "info"
  },
  {
    id: "clickup-super-agents-introduction",
    title: "🤖 Introducing: Super Agents™ - AI Týmoví Spolupracovníci",
    excerpt: "ClickUp představuje Super Agents - první AI kolegy, kteří pracují jako lidé, ale mají nadlidské schopnosti. Mohou pracovat na čemkoliv, s kýmkoliv, kdykoliv.",
    category: "AI & Tech",
    readTime: "10 min",
    publishedAt: "2026-01-08",
    tags: ["ClickUp", "Super Agents", "AI", "Productivity", "Automation", "MCP"],
    featured: true,
    color: "primary"
  },
  {
    id: "clickup-super-agents-human-collaboration",
    title: "👥 Spolupráce s Super Agents jako s Týmem",
    excerpt: "Jak používat @zmínky, přiřazování úkolů a přímé zprávy s AI agenty. Integrace do vašeho workflow.",
    category: "AI & Tech",
    readTime: "8 min",
    publishedAt: "2026-01-08",
    tags: ["ClickUp", "Super Agents", "Collaboration", "AI", "Productivity"],
    featured: false,
    color: "success"
  },
  {
    id: "clickup-super-agents-human-abilities",
    title: "💪 500+ Lidských Schopností v ClickUp",
    excerpt: "Co všechno Super Agents umí? Od triáže přes plánování až po kódování a design. Kompletní přehled dovedností.",
    category: "AI & Tech",
    readTime: "12 min",
    publishedAt: "2026-01-08",
    tags: ["ClickUp", "Super Agents", "AI", "Skills", "Automation"],
    featured: false,
    color: "warning"
  },
  {
    id: "clickup-super-agents-super-powers",
    title: "🦸 Nadlidské Schopnosti: Nekonečná Znalost a Dokonalá Paměť",
    excerpt: "Proč jsou Super Agents lepší než lidé v mnoha ohledech. Věčná pracovní doba, instantní učení a nekonečná paměť.",
    category: "AI & Tech",
    readTime: "7 min",
    publishedAt: "2026-01-08",
    tags: ["ClickUp", "Super Agents", "AI", "Super Powers", "Memory"],
    featured: false,
    color: "danger"
  },
  {
    id: "mcp-model-context-protocol-guide",
    title: "🔌 MCP: Model Context Protocol - Průvodce Pro Začátečníky",
    excerpt: "Co je MCP a proč je důležitý pro AI aplikace. Jak používat MCP v praxi a propojit AI s vašimi nástroji.",
    category: "AI & Tech",
    readTime: "15 min",
    publishedAt: "2026-01-08",
    tags: ["MCP", "AI", "Protocol", "Integration", "Context"],
    featured: true,
    color: "info"
  },
  {
    id: "g-code-exercises-1-zaklady",
    title: "📝 G-Code Cvičení 1: Základní Příkazy pro Začátečníky",
    excerpt: "10 praktických cvičení na G0, G1, G2, G3. Od jednoduchého bodu po kružnici. Ideální pro první kroky v CNC programování.",
    category: "CNC & Engineering",
    readTime: "8 min",
    publishedAt: "2026-01-08",
    tags: ["G-Code", "CNC", "Cvičení", "Programování", "Začátečník"],
    featured: false,
    color: "success"
  },
  {
    id: "g-code-exercises-2-drilovací-cykly",
    title: "🔩 G-Code Cvičení 2: Vrtací Cykly G73, G81, G83",
    excerpt: "Naučte se programovat otvory efektivně. G73 peck drilling, G81 standard vrtání, G83 deep drilling - vše vysvětleno na praktických příkladech.",
    category: "CNC & Engineering",
    readTime: "10 min",
    publishedAt: "2026-01-08",
    tags: ["G-Code", "CNC", "Vrtání", "Cykly", "Programování"],
    featured: false,
    color: "primary"
  },
  {
    id: "g-code-exercises-3-kompenzace-nástroje",
    title: "⚔️ G-Code Cvičení 3: Kompenzace Nástroje G41/G42",
    excerpt: "K cutter radius compensation v praxi. Jak psát programy bez přesných rozměrů nástroje a nechat to na stroj.",
    category: "CNC & Engineering",
    readTime: "7 min",
    publishedAt: "2026-01-08",
    tags: ["G-Code", "CNC", "Kompenzace", "Nástroj", "Programování"],
    featured: false,
    color: "warning"
  },
  {
    id: "g-code-exercises-4-subprogramy",
    title: "🔄 G-Code Cvičení 4: Subprogramy M98/M99",
    excerpt: "Naučte se znovupoužívat kód. Opakující se vzory, bolt circles, mřížky - vše efektivně s subprogramy.",
    category: "CNC & Engineering",
    readTime: "9 min",
    publishedAt: "2026-01-08",
    tags: ["G-Code", "CNC", "Subprogramy", "M98", "M99", "Programování"],
    featured: false,
    color: "info"
  },
  {
    id: "g-code-kompletni-pruvodce",
    title: "📚 G-Code Kompletní Příručka: Všechny Příkazy na Jednom Místě",
    excerpt: "Od A do Z - kompletní reference všech G a M kódů s příklady. G0-G99, M0-M99, pomocné kódy a speciální funkce.",
    category: "CNC & Engineering",
    readTime: "25 min",
    publishedAt: "2026-01-08",
    tags: ["G-Code", "CNC", "Reference", "Příručka", "Programování"],
    featured: true,
    color: "danger"
  },
  {
    id: "cnc-machine-anatomy",
    title: "🔧 CNC Stroj Od A do Z: Anatomie Frézy",
    excerpt: "Pojďme se podívat na to, z čeho se skládá CNC fréza. Vřeteno, osy, řídící systém, chlazení, upínání - vše vysvětleno.",
    category: "CNC & Engineering",
    readTime: "12 min",
    publishedAt: "2026-01-08",
    tags: ["CNC", "Stroj", "Anatomie", "Fréza", "Hardware"],
    featured: false,
    color: "success"
  },
  {
    id: "cnc-tools-cutting-parameters",
    title: "🔪 Řezné Nástroje a Parametry: Jak Správně Nastavit Rychlosti",
    excerpt: "Feed, speed, chipload - vše co potřebujete vědět o řezných parametrech. Tabulky pro různé materiály a nástroje.",
    category: "CNC & Engineering",
    readTime: "15 min",
    publishedAt: "2026-01-08",
    tags: ["CNC", "Nástroje", "Řezné parametry", "Feed", "Speed", "Materiály"],
    featured: false,
    color: "primary"
  },
  {
    id: "cnc-workholding-fixturing",
    title: "📌 Upínání a Přípravky: Jak Bezpečně Upevnit Obrobek",
    excerpt: "Šroubování, magnetické upínání, vakuum, přípravky - přehled metod upínání pro různé aplikace a materiály.",
    category: "CNC & Engineering",
    readTime: "10 min",
    publishedAt: "2026-01-08",
    tags: ["CNC", "Upínání", "Přípravky", "Fixturing", "Bezpečnost"],
    featured: false,
    color: "warning"
  },
  {
    id: "cnc-measuring-quality-control",
    title: "📐 Měření a Kontrola Kvality v CNC",
    excerpt: "Posuvky, mikrometry, úchylkoměry, CMM. Jak měřit a kontrolovat rozměry vašich výrobků.",
    category: "CNC & Engineering",
    readTime: "12 min",
    publishedAt: "2026-01-08",
    tags: ["CNC", "Měření", "Kontrola", "Kvalita", "Metrologie"],
    featured: false,
    color: "info"
  }
];

const CATEGORIES = ['Všechny', ...Array.from(new Set(ARTICLES.map(a => a.category)))];

export default function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState('Všechny');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const filteredArticles = ARTICLES.filter(article => {
    const matchesCategory = selectedCategory === 'Všechny' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = ARTICLES.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-bg-primary)',
      color: 'var(--color-text-primary)',
      padding: 'var(--space-6) 0',
    }}>
      <Container style={{ maxWidth: '1400px' }}>
        
        <div style={{
          textAlign: 'center',
          marginBottom: 'var(--space-10)',
          animation: 'slideDown 0.6s ease',
        }}>
          <h1 style={{
            fontSize: 'var(--text-6xl)',
            fontWeight: 'var(--font-bold)',
            marginBottom: 'var(--space-4)',
            background: 'var(--color-accent-gradient)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            letterSpacing: '-0.02em',
          }}>
            📝 Články o Tomas Learning Platform
          </h1>
          <p style={{
            fontSize: 'var(--text-xl)',
            color: 'var(--color-text-secondary)',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: 'var(--leading-relaxed)',
          }}>
            Kompletní příběh vývoje osobní platformy pro vzdělávání a kariéru od začátku do ledna 2026
          </p>
        </div>

        <Row className="mb-4" style={{ alignItems: 'center' }}>
          <Col lg={8} className="mb-3 mb-lg-0">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </Col>
          <Col lg={4}>
            <FilterPills
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </Col>
        </Row>

        <div style={{
          background: 'var(--color-glass-bg)',
          backdropFilter: 'blur(var(--glass-blur))',
          WebkitBackdropFilter: 'blur(var(--glass-blur))',
          border: '1px solid var(--color-glass-border)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-5)',
          marginBottom: 'var(--space-8)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
        }}>
          <div style={{
            display: 'flex',
            gap: 'var(--space-2)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-secondary)',
          }}>
            <Badge
              style={{
                background: 'var(--color-accent-primary)',
                color: 'var(--color-text-inverse)',
                border: 'none',
                padding: 'var(--space-2) var(--space-3)',
                fontSize: 'var(--text-sm)',
              }}
            >
              {filteredArticles.length}
            </Badge>
            <span>{filteredArticles.length === 1 ? 'článek' : filteredArticles.length >= 2 && filteredArticles.length <= 4 ? 'články' : 'článků'}</span>
          </div>
          <Badge
            style={{
              background: selectedCategory === 'Všechny' ? 'var(--color-accent-primary)' : 'var(--color-bg-tertiary)',
              color: selectedCategory === 'Všechny' ? 'var(--color-text-inverse)' : 'var(--color-text-secondary)',
              border: '1px solid var(--color-glass-border)',
              padding: 'var(--space-2) var(--space-3)',
              fontSize: 'var(--text-sm)',
            }}
          >
            {selectedCategory}
          </Badge>
        </div>

        {featuredArticles.length > 0 && (
          <div style={{
            marginBottom: 'var(--space-10)',
            animation: 'slideUp 0.8s ease',
          }}>
            <h2 style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-semibold)',
              marginBottom: 'var(--space-6)',
              color: 'var(--color-text-primary)',
            }}>
              ⭐ Doporučené články
            </h2>
            <Row className="g-4">
              {featuredArticles.slice(0, 1).map(article => (
                <Col key={article.id} lg={12} className="mb-4">
                  <ArticleCard article={article} variant="featured" />
                </Col>
              ))}
              {featuredArticles.slice(1).map(article => (
                <Col key={article.id} lg={6} className="mb-4">
                  <ArticleCard article={article} variant="default" />
                </Col>
              ))}
            </Row>
          </div>
        )}

        <div style={{
          animation: 'slideUp 0.8s ease 0.2s both',
        }}>
          <h2 style={{
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--font-semibold)',
            marginBottom: 'var(--space-6)',
            color: 'var(--color-text-primary)',
          }}>
            📚 Všechny články
          </h2>
          {regularArticles.length === 0 ? (
            <Card style={{
              background: 'var(--color-card-bg)',
              border: '1px solid var(--color-card-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-12)',
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: 'var(--text-5xl)',
                marginBottom: 'var(--space-4)',
                opacity: '0.5',
              }}>
                🔍
              </div>
              <h3 style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--font-semibold)',
                marginBottom: 'var(--space-3)',
                color: 'var(--color-text-primary)',
              }}>
                Žádné články nenalezeny
              </h3>
              <p style={{
                color: 'var(--color-text-tertiary)',
                marginBottom: '0',
              }}>
                Zkuste změnit vyhledávací dotaz nebo kategorii
              </p>
            </Card>
          ) : (
            <Row className="g-4">
              {regularArticles.map(article => (
                <Col key={article.id} xs={12} sm={6} md={4} lg={3} xl={3} className="mb-4">
                  <ArticleCard article={article} variant="default" />
                </Col>
              ))}
            </Row>
          )}
        </div>

        <Card style={{
          background: 'var(--color-accent-gradient)',
          color: 'var(--color-text-inverse)',
          border: 'none',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-8)',
          marginTop: 'var(--space-10)',
        }}>
          <Row className="align-items-center">
            <Col md={8} style={{ marginBottom: 'var(--space-4) md: 0' }}>
              <h3 style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-bold)',
                marginBottom: 'var(--space-3)',
              }}>
                📧 Odebírejte nové články
              </h3>
              <p style={{
                fontSize: 'var(--text-base)',
                marginBottom: '0',
                opacity: '0.95',
              }}>
                Dostávejte pravidelně nové články o IT, AI a kariérovém rozvoji přímo do emailu
              </p>
            </Col>
            <Col md={4} className="text-md-end mt-3 mt-md-0">
              <Button
                variant="light"
                style={{
                  fontWeight: 'var(--font-bold)',
                  padding: 'var(--space-3) var(--space-6)',
                  background: 'var(--color-bg-elevated)',
                  border: '1px solid var(--color-glass-border)',
                  color: 'var(--color-text-primary)',
                }}
              >
                Odebírat
              </Button>
            </Col>
          </Row>
        </Card>

        <div style={{
          textAlign: 'center',
          marginTop: 'var(--space-12)',
          paddingTop: 'var(--space-8)',
          borderTop: '1px solid var(--color-glass-border)',
        }}>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              padding: 'var(--space-3) var(--space-6)',
              background: 'var(--color-card-bg)',
              border: '1px solid var(--color-card-border)',
              borderRadius: 'var(--radius-lg)',
              color: 'var(--color-text-primary)',
              fontWeight: 'var(--font-medium)',
              transition: 'all var(--transition-normal)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-card-bg-hover)';
              e.currentTarget.style.borderColor = 'var(--color-accent-secondary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--color-card-bg)';
              e.currentTarget.style.borderColor = 'var(--color-card-border)';
            }}
          >
            ← Zpět na hlavní stránku
          </Link>
        </div>

      </Container>

      <style jsx global>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}