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

  return tour;
};

// Example steps - customize per page
export const addDashboardSteps = (tour: Shepherd.Tour) => {
  tour.addStep({
    id: 'welcome',
    text: 'Welcome to Tomas Learning Platform! Let\'s take a quick tour.',
    attachTo: { element: '.navbar-brand', on: 'bottom' },
    buttons: [
      {
        text: 'Next',
        action: tour.next,
      },
    ],
  });

  // Add more steps as needed
};

export default Shepherd;