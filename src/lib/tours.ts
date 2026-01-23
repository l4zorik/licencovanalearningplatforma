import Shepherd from 'shepherd.js';

// Basic tour setup
export const createBasicTour = () => {
  const tour = new Shepherd.Tour({
    useModalOverlay: true,
    defaultStepOptions: {
      classes: 'shepherd-theme-arrows',
      scrollTo: true,
    },
  });

  // Set high z-index to appear in front
  tour.on('show', () => {
    const shepherdElements = document.querySelectorAll('.shepherd-element');
    shepherdElements.forEach(el => {
      (el as HTMLElement).style.zIndex = '9999';
    });
  });

  return tour;
};

// Comprehensive tour steps - customize per page
export const addDashboardSteps = (tour: Shepherd.Tour) => {
  tour.addStep({
    id: 'welcome',
    text: 'Vítej v Pracovním Vzdělávacím Portálu! Začneme kompletní prohlídkou všech sekcí.',
    attachTo: { element: '.navbar-brand', on: 'bottom' },
    buttons: [
      {
        text: 'Začít prohlídku',
        action: tour.next,
      },
    ],
  });

  // All sections in navbar - use data-tour attributes
  tour.addStep({
    id: 'profile-section',
    text: 'Sekce Profile - zde spravuješ svůj profil a osobní údaje.',
    attachTo: { element: 'button[data-tour="profile"]', on: 'bottom' },
    buttons: [
      {
        text: 'Další',
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: 'analytics-section',
    text: 'Analytics - podrobné statistiky tvého pokroku a učení.',
    attachTo: { element: 'button[data-tour="analytics"]', on: 'bottom' },
    buttons: [
      {
        text: 'Další',
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: 'missions-section',
    text: 'Mise - aktivní úkoly a výzvy pro tvůj rozvoj.',
    attachTo: { element: 'button[data-tour="missions"]', on: 'bottom' },
    buttons: [
      {
        text: 'Další',
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: 'training-section',
    text: 'Training - výcvikové kurzy a školení.',
    attachTo: { element: 'button[data-tour="training"]', on: 'bottom' },
    buttons: [
      {
        text: 'Další',
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: 'career-report-section',
    text: 'Career Report - celková zpráva o tvé kariéře.',
    attachTo: { element: 'button[data-tour="career-report"]', on: 'bottom' },
    buttons: [
      {
        text: 'Další',
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: 'courses-section',
    text: 'Kurzy - online kurzy pro rozšíření znalostí.',
    attachTo: { element: 'button[data-tour="courses"]', on: 'bottom' },
    buttons: [
      {
        text: 'Další',
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: 'quick-courses-section',
    text: 'Rychlokurzy - krátké a rychlé kurzy.',
    attachTo: { element: 'button[data-tour="quick-courses"]', on: 'bottom' },
    buttons: [
      {
        text: 'Další',
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: 'articles-section',
    text: 'Články - vzdělávací články a materiály.',
    attachTo: { element: 'button[data-tour="articles"]', on: 'bottom' },
    buttons: [
      {
        text: 'Další',
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: 'tools-section',
    text: 'Tools - nástroje pro práci a vývoj.',
    attachTo: { element: 'button[data-tour="tools"]', on: 'bottom' },
    buttons: [
      {
        text: 'Další',
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: 'agencies-section',
    text: 'Agentury - pracovní agentury a zprostředkovatelé.',
    attachTo: { element: 'button[data-tour="agencies"]', on: 'bottom' },
    buttons: [
      {
        text: 'Další',
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: 'colleagues-section',
    text: 'Kolegové - síť kontaktů a spolupracovníků.',
    attachTo: { element: 'button[data-tour="colleagues"]', on: 'bottom' },
    buttons: [
      {
        text: 'Další',
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: 'achievements-section',
    text: 'Achievements - odemčené úspěchy a ocenění.',
    attachTo: { element: 'button[data-tour="achievements"]', on: 'bottom' },
    buttons: [
      {
        text: 'Další',
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: 'roadmap-section',
    text: 'Roadmap - plán tvého kariérního rozvoje.',
    attachTo: { element: 'button[data-tour="roadmap"]', on: 'bottom' },
    buttons: [
      {
        text: 'Další',
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: 'journey-section',
    text: 'Journey - tvá cesta učením.',
    attachTo: { element: 'button[data-tour="journey"]', on: 'bottom' },
    buttons: [
      {
        text: 'Další',
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: 'career-advice-section',
    text: 'Rady - kariérní poradenství a tipy.',
    attachTo: { element: 'button[data-tour="career-advice"]', on: 'bottom' },
    buttons: [
      {
        text: 'Další',
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: 'recipes-section',
    text: 'Recepty - kuchařské recepty a tipy.',
    attachTo: { element: 'button[data-tour="recipes"]', on: 'bottom' },
    buttons: [
      {
        text: 'Další',
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: 'trendy-section',
    text: 'Trendy - aktuální trendy ve vzdělávání a kariéře.',
    attachTo: { element: 'button[data-tour="trendy"]', on: 'bottom' },
    buttons: [
      {
        text: 'Další',
        action: tour.next,
      },
    ],
  });

  // Job board explanation
  tour.addStep({
    id: 'job-board-explanation',
    text: 'Nyní se podíváme na Job Board. Zde můžeš hledat pracovní příležitosti.',
    attachTo: { element: '[data-tour="work-section"]', on: 'top' },
    buttons: [
      {
        text: 'Další',
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: 'job-board-filters',
    text: 'Filtry pro hledání: To apply (k aplikaci), Applied (podané), Interview (pohovor). Také filtry podle firmy.',
    attachTo: { element: '[data-tour="work-section"]', on: 'top' },
    buttons: [
      {
        text: 'Další',
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: 'find-quest-button',
    text: '+Find Quest tlačítko - rychlé hledání pracovních příležitostí.',
    attachTo: { element: '[data-tour="work-section"]', on: 'top' },
    buttons: [
      {
        text: 'Další',
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: 'selected-job',
    text: 'Vybraná práce lakýrník s požadovanými skilly: Lakování, Příprava, Tmelení, Barevné spektrum, Lakovací pistole.',
    attachTo: { element: '[data-tour="work-section"]', on: 'top' },
    buttons: [
      {
        text: 'Další',
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: 'archived-jobs',
    text: 'Archived Jobs - archivované pracovní nabídky.',
    attachTo: { element: '[data-tour="work-section"]', on: 'top' },
    buttons: [
      {
        text: 'Další',
        action: tour.next,
      },
    ],
  });

  // Skill board
  tour.addStep({
    id: 'skill-board',
    text: 'Skill Board - tabulka tvých dovedností.',
    attachTo: { element: '[data-tour="education-section"]', on: 'top' },
    buttons: [
      {
        text: 'Další',
        action: tour.next,
      },
    ],
  });

  // Achievements
  tour.addStep({
    id: 'achievements-below',
    text: 'Achievements - úspěchy a odznaky pod skill board.',
    attachTo: { element: '[data-tour="achievements"]', on: 'bottom' },
    buttons: [
      {
        text: 'Další',
        action: tour.next,
      },
    ],
  });

  // Certification board
  tour.addStep({
    id: 'certification-board',
    text: 'Certification Board - certifikace a osvědčení.',
    attachTo: { element: '[data-tour="certification-section"]', on: 'top' },
    buttons: [
      {
        text: 'Další',
        action: tour.next,
      },
    ],
  });

  // AI Assistant Akize
  tour.addStep({
    id: 'akize-assistant',
    text: 'AI asistent Akize - tvůj kariérní průvodce. Klikni na smajlíka v pravém dolním rohu.',
    attachTo: { element: '[data-tour="akize-guide"]', on: 'left' },
    buttons: [
      {
        text: 'Další',
        action: tour.next,
      },
    ],
  });

  // Akize content explanation
  tour.addStep({
    id: 'akize-content',
    text: 'Akize nabízí: 📚 Kariérní poradenství, 💼 Osobní rozvoj, ⚡ Rychlé příkazy, 📊 Pokrok, 💼 Kariérní rady, 🎯 Doporučení kurzů, 📋 Nabídky práce, 🎓 Skill gap, 📚 Kurzy, ⏱️ Čas studia, ✅ Dokončené moduly, 📈 Streak, 🎓 Nový skill, 🏆 Achievements, ⭐ Level & XP, 🎖️ Zbývající achievements, 🔥 Streak, 💪 Motivace, 🎯 Cíle, 📅 Plán, 🌟 Úspěchy, 🤔 Prokrastinace, 🔗 Career Report, 📈 Analytics, 🎮 Missions, 🎓 Training, 📝 Články, 🐍 Python, ⚛️ React/Next.js, 🤖 AI & ML, ☁️ Cloud & DevOps, 🔒 Cybersecurity, 🎨 3D & GameDev, 🎵 Hudba, ✍️ Psaní, 📷 Fotografie, 🎬 Video editing, 💰 Investování, 🚀 Podnikání, 💼 Freelancing, 📊 Finanční cíle, 🏠 FIRE, 🎯 Life OS, 💕 Vztahy, 👨‍👩‍👧 Rodina, 🧠 Psychika, ⛔ Závislosti, 🤖 Co umíš?, ❓ Nápověda, 💬 Chat, 🌍 Novinky, 📧 Feedback.',
    attachTo: { element: '[data-tour="akize-guide"]', on: 'top' },
    buttons: [
      {
        text: 'Další',
        action: tour.next,
      },
    ],
  });

  // Career advice above Akize
  tour.addStep({
    id: 'career-advice-above',
    text: 'Career Advice - kariérní poradenství nad Akize.',
    attachTo: { element: '[data-tour="career-advice-section"]', on: 'bottom' },
    buttons: [
      {
        text: 'Další',
        action: tour.next,
      },
    ],
  });

  // Recipes next to career advice
  tour.addStep({
    id: 'recipes-next',
    text: 'Recipes - kuchařské recepty vedle career advice.',
    attachTo: { element: '[data-tour="recipes-section"]', on: 'left' },
    buttons: [
      {
        text: 'Další',
        action: tour.next,
      },
    ],
  });

  // Goals section above
  tour.addStep({
    id: 'goals-above',
    text: 'Goals - cíle pro tvůj rozvoj.',
    attachTo: { element: '[data-tour="goals-section"]', on: 'bottom' },
    buttons: [
      {
        text: 'Další',
        action: tour.next,
      },
    ],
  });

  // Projects section above goals
  tour.addStep({
    id: 'projects-above',
    text: 'Projects - tvé aktivní projekty.',
    attachTo: { element: '[data-tour="projects-section"]', on: 'bottom' },
    buttons: [
      {
        text: 'Další',
        action: tour.next,
      },
    ],
  });

  // Další Krok at the very top
  tour.addStep({
    id: 'další-krok-top',
    text: 'Další Krok - náhled budoucích benefitů, jako "Pravidelný spací režim ⏱️ 2h".',
    attachTo: { element: '[data-tour="next-step"]', on: 'bottom' },
    buttons: [
      {
        text: 'Dokončit prohlídku',
        action: tour.complete,
      },
    ],
  });
};

export const addCoursesSteps = (tour: Shepherd.Tour) => {
  tour.addStep({
    id: 'courses-welcome',
    text: 'Welcome to our Courses section! Here you can explore various online courses.',
    attachTo: { element: 'h1.display-4', on: 'bottom' },
    buttons: [
      {
        text: 'Next',
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: 'featured-course',
    text: 'This is our featured course. Check out the details and enroll!',
    attachTo: { element: '.bg-gradient-primary', on: 'top' },
    buttons: [
      {
        text: 'Next',
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: 'course-content',
    text: 'Browse through the course modules and lessons here.',
    attachTo: { element: '.card.shadow h3', on: 'top' },
    buttons: [
      {
        text: 'Finish',
        action: tour.complete,
      },
    ],
  });
};

export default Shepherd;