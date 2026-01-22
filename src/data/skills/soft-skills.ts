import { SoftSkill, SoftSkillCategory, ProficiencyLevel } from '@/types';

export const SOFT_SKILLS: SoftSkill[] = [
  {
    id: 'communication',
    name: 'Effective Communication',
    category: 'Communication' as SoftSkillCategory,
    description: 'Ability to convey information clearly and effectively to individuals or groups.',
    importance: 98,
    careerImpact: 'Essential for all roles - enables collaboration, prevents misunderstandings, and drives results.',
    assessment: {
      type: 'peer',
      questions: 10,
      description: '360-degree feedback assessment focusing on clarity, listening, and adaptability.'
    },
    development: {
      methods: ['Active listening exercises', 'Presentation practice', 'Writing workshops', 'Public speaking clubs'],
      resources: ['Toastmasters International', 'Coursera Communication Skills', 'LinkedIn Learning'],
      timeline: '3-6 months for significant improvement'
    },
    relatedHardSkills: ['Technical Writing', 'Documentation', 'Presentation'],
    examples: ['Explaining complex technical concepts to non-technical stakeholders', 'Writing clear emails and documentation', 'Active listening during meetings'],
    interviewQuestions: ['Tell me about a time you had to explain a complex technical issue.', 'How do you handle communication with difficult team members?']
  },
  {
    id: 'presentation',
    name: 'Presentation Skills',
    category: 'Communication' as SoftSkillCategory,
    description: 'Ability to present ideas, information, and proposals effectively to an audience.',
    importance: 85,
    careerImpact: 'Critical for leadership roles, client meetings, and team communications.',
    assessment: {
      type: 'simulation',
      questions: 5,
      description: 'Mock presentation evaluation with rubric for clarity, engagement, and persuasion.'
    },
    development: {
      methods: ['Practice presentations', 'Video recording and review', 'Feedback from peers', 'Presentation workshops'],
      resources: ['Toastmasters', 'Garr Reynolds Presentation Zen', 'Better Speaking course'],
      timeline: '2-4 months for noticeable improvement'
    },
    relatedHardSkills: ['Public Speaking', 'Technical Writing', 'Data Visualization'],
    examples: ['Delivering project status updates to executives', 'Presenting solution designs to stakeholders', 'Leading team retrospectives'],
    interviewQuestions: ['Describe a presentation you gave that had a significant impact.', 'How do you adapt your presentation style for different audiences?']
  },
  {
    id: 'active-listening',
    name: 'Active Listening',
    category: 'Communication' as SoftSkillCategory,
    description: 'Fully concentrating, understanding, responding, and remembering what is being said.',
    importance: 92,
    careerImpact: 'Reduces errors, builds trust, improves relationships, and leads to better outcomes.',
    assessment: {
      type: 'peer',
      questions: 8,
      description: 'Feedback assessment on listening quality during meetings and conversations.'
    },
    development: {
      methods: ['Mindful listening exercises', 'Paraphrasing practice', 'Non-verbal awareness', 'Patience building'],
      resources: ['Active Listening Training', 'Counseling techniques', 'Mindfulness meditation'],
      timeline: '1-3 months for habit formation'
    },
    relatedHardSkills: ['Empathy', 'Conflict Resolution', 'Team Collaboration'],
    examples: ['Understanding user requirements without assumptions', 'Resolving conflicts by hearing all perspectives', 'Gathering complete information before acting'],
    interviewQuestions: ['How do you ensure you understand what someone is saying?', 'Describe a situation where active listening helped resolve an issue.']
  },
  {
    id: 'written-communication',
    name: 'Written Communication',
    category: 'Communication' as SoftSkillCategory,
    description: 'Ability to write clearly and effectively for different audiences and purposes.',
    importance: 90,
    careerImpact: 'Essential for documentation, emails, reports, and all professional written communication.',
    assessment: {
      type: 'peer',
      questions: 6,
      description: 'Review of written work samples for clarity, grammar, and appropriateness.'
    },
    development: {
      methods: ['Writing practice', 'Grammar review', 'Style guides', 'Peer feedback'],
      resources: ['Strunk & White Elements of Style', 'Writing workshops', 'Grammarly', 'Hemingway Editor'],
      timeline: '3-6 months for significant improvement'
    },
    relatedHardSkills: ['Technical Writing', 'Documentation', 'Report Writing'],
    examples: ['Writing clear commit messages', 'Creating technical documentation', 'Drafting professional emails'],
    interviewQuestions: ['How do you approach writing technical documentation?', 'Describe a time when your written communication prevented a problem.']
  },
  {
    id: 'leadership',
    name: 'Leadership',
    category: 'Leadership' as SoftSkillCategory,
    description: 'Ability to guide, motivate, and direct individuals and teams toward achieving goals.',
    importance: 88,
    careerImpact: 'Critical for career advancement and managing teams effectively.',
    assessment: {
      type: '360',
      questions: 15,
      description: 'Comprehensive 360-degree feedback on leadership behaviors and impact.'
    },
    development: {
      methods: ['Leadership training programs', 'Mentoring', 'Delegation practice', 'Decision-making exercises'],
      resources: ['Leadership books (Simon Sinek, Patrick Lencioni)', 'Coursera Leadership courses', 'Executive coaching'],
      timeline: '6-12 months for measurable improvement'
    },
    relatedHardSkills: ['Team Management', 'Strategic Planning', 'Decision Making'],
    examples: ['Guiding a team through a difficult project', 'Mentoring junior team members', 'Making tough decisions under pressure'],
    interviewQuestions: ['Describe a time you led a team through a challenging situation.', 'How do you motivate team members who are struggling?']
  },
  {
    id: 'team-collaboration',
    name: 'Team Collaboration',
    category: 'Leadership' as SoftSkillCategory,
    description: 'Working effectively with others to achieve shared goals and outcomes.',
    importance: 95,
    careerImpact: 'Essential in modern workplaces where most work is done in teams.',
    assessment: {
      type: 'peer',
      questions: 12,
      description: 'Feedback on teamwork behaviors including reliability, contribution, and cooperation.'
    },
    development: {
      methods: ['Team projects', 'Cross-functional work', 'Pair programming', 'Collaborative tools training'],
      resources: ['Team building activities', 'Agile methodologies', 'Collaborative software training'],
      timeline: 'Ongoing - improves with experience'
    },
    relatedHardSkills: ['Agile', 'Sprint Planning', 'Code Review'],
    examples: ['Working with designers, product managers, and developers', 'Contributing to team goals over individual goals', 'Supporting team members when they are overloaded'],
    interviewQuestions: ['Describe your ideal team environment.', 'How do you handle disagreements within a team?']
  },
  {
    id: 'delegation',
    name: 'Delegation',
    category: 'Leadership' as SoftSkillCategory,
    description: 'Assigning tasks and responsibilities appropriately while maintaining accountability.',
    importance: 78,
    careerImpact: 'Critical for leadership effectiveness and team development.',
    assessment: {
      type: 'peer',
      questions: 8,
      description: 'Review of delegation effectiveness and team development outcomes.'
    },
    development: {
      methods: ['Trust building', 'Task analysis', 'Feedback loops', 'Progress monitoring'],
      resources: ['Management training', 'Delegation frameworks', 'Coaching techniques'],
      timeline: '3-6 months to develop habits'
    },
    relatedHardSkills: ['Project Management', 'Team Management', 'Time Management'],
    examples: ['Assigning tasks based on team member strengths', 'Following up without micromanaging', 'Developing team capabilities through task delegation'],
    interviewQuestions: ['How do you decide which tasks to delegate?', 'Describe a time when delegation led to better outcomes.']
  },
  {
    id: 'decision-making',
    name: 'Decision Making',
    category: 'Leadership' as SoftSkillCategory,
    description: 'Analyzing situations, evaluating options, and choosing the best course of action.',
    importance: 85,
    careerImpact: 'Directly impacts project success and team performance.',
    assessment: {
      type: 'peer',
      questions: 10,
      description: 'Assessment of decision quality, speed, and outcomes.'
    },
    development: {
      methods: ['Decision frameworks', 'Risk assessment training', 'Past decisions review', 'Mentoring'],
      resources: ['Thinking, Fast and Slow (Kahneman)', 'Decision-making courses', 'Case study analysis'],
      timeline: '4-8 months for framework adoption'
    },
    relatedHardSkills: ['Problem Solving', 'Critical Thinking', 'Risk Management'],
    examples: ['Choosing between competing technical approaches', 'Making quick decisions under pressure', 'Involving the right people in decisions'],
    interviewQuestions: ['Describe a difficult decision you had to make.', 'How do you approach making decisions with incomplete information?']
  },
  {
    id: 'problem-solving',
    name: 'Problem Solving',
    category: 'Analytical' as SoftSkillCategory,
    description: 'Identifying problems, analyzing root causes, and developing effective solutions.',
    importance: 94,
    careerImpact: 'Core skill for all technical roles - directly impacts debugging, design, and innovation.',
    assessment: {
      type: 'simulation',
      questions: 8,
      description: 'Problem-solving scenarios with rubric for approach, analysis, and solution quality.'
    },
    development: {
      methods: ['Puzzle solving', 'Root cause analysis', 'Design thinking', 'Code debugging practice'],
      resources: ['Cracking the Coding Interview', 'LeetCode', 'Debugging exercises', 'Systems thinking courses'],
      timeline: 'Ongoing - improves with practice'
    },
    relatedHardSkills: ['Debugging', 'Root Cause Analysis', 'Troubleshooting'],
    examples: ['Debugging production issues', 'Designing solutions for complex requirements', 'Resolving team conflicts'],
    interviewQuestions: ['Describe a complex problem you solved.', 'How do you approach problems you have never seen before?']
  },
  {
    id: 'critical-thinking',
    name: 'Critical Thinking',
    category: 'Analytical' as SoftSkillCategory,
    description: 'Objectively analyzing facts and evidence to form reasoned judgments.',
    importance: 88,
    careerImpact: 'Essential for making sound decisions and avoiding cognitive biases.',
    assessment: {
      type: 'simulation',
      questions: 10,
      description: 'Logical reasoning and evidence evaluation exercises.'
    },
    development: {
      methods: ['Logical reasoning practice', 'Bias awareness', 'Evidence evaluation', 'Argument analysis'],
      resources: ['Critical Thinking courses', 'Philosophy resources', 'Bias training', 'Science of reasoning'],
      timeline: '6-12 months for significant improvement'
    },
    relatedHardSkills: ['Data Analysis', 'Research', 'Fact Checking'],
    examples: ['Evaluating competing technical solutions', 'Identifying logical fallacies in arguments', 'Questioning assumptions before acting'],
    interviewQuestions: ['How do you evaluate the credibility of a source?', 'Describe a time you changed your mind based on new evidence.']
  },
  {
    id: 'time-management',
    name: 'Time Management',
    category: 'Personal Development' as SoftSkillCategory,
    description: 'Effectively planning and controlling how time is spent on specific activities.',
    importance: 90,
    careerImpact: 'Directly impacts productivity, deadlines, and work-life balance.',
    assessment: {
      type: 'self',
      questions: 15,
      description: 'Self-assessment of time tracking, prioritization, and productivity habits.'
    },
    development: {
      methods: ['Time tracking', 'Pomodoro technique', 'Priority matrices', 'Calendar blocking'],
      resources: ['Getting Things Done', 'Deep Work', 'Productivity apps', 'Time management training'],
      timeline: '1-3 months for habit formation'
    },
    relatedHardSkills: ['Task Management', 'Project Planning', 'Productivity'],
    examples: ['Meeting deadlines consistently', 'Balancing multiple projects', 'Saying no to non-priorities'],
    interviewQuestions: ['How do you prioritize when everything seems urgent?', 'Describe your approach to managing competing deadlines.']
  },
  {
    id: 'adaptability',
    name: 'Adaptability',
    category: 'Personal Development' as SoftSkillCategory,
    description: 'Adjusting to new conditions, challenges, and changes effectively.',
    importance: 92,
    careerImpact: 'Critical in fast-changing tech environments - determines career longevity.',
    assessment: {
      type: 'peer',
      questions: 8,
      description: 'Feedback on response to change and learning from new situations.'
    },
    development: {
      methods: ['Embracing challenges', 'Learning new skills', 'Comfort zone expansion', 'Mindfulness'],
      resources: ['Growth mindset training', 'Change management courses', 'Resilience building'],
      timeline: 'Ongoing - mindset shift takes 3-6 months'
    },
    relatedHardSkills: ['Learning Agility', 'Technical Learning', 'Flexibility'],
    examples: ['Quickly learning new technologies', 'Adjusting to process changes', 'Handling unexpected project pivots'],
    interviewQuestions: ['Describe a time you had to adapt to a significant change.', 'How do you stay current with new technologies?']
  },
  {
    id: 'emotional-intelligence',
    name: 'Emotional Intelligence',
    category: 'Personal Development' as SoftSkillCategory,
    description: 'Recognizing, understanding, and managing your own emotions and those of others.',
    importance: 86,
    careerImpact: 'Key differentiator for leadership success and team dynamics.',
    assessment: {
      type: '360',
      questions: 20,
      description: 'Comprehensive emotional intelligence assessment covering self-awareness, self-regulation, motivation, empathy, and social skills.'
    },
    development: {
      methods: ['Self-reflection', 'Journaling', 'Feedback gathering', 'Meditation'],
      resources: ['Emotional Intelligence 2.0', 'Daniel Goleman books', 'EQ assessments', 'Coaching'],
      timeline: '6-12 months for significant development'
    },
    relatedHardSkills: ['Conflict Resolution', 'Leadership', 'Team Collaboration'],
    examples: ['Remaining calm under pressure', 'Understanding team member motivations', 'Managing stress effectively'],
    interviewQuestions: ['How do you handle stress and pressure?', 'Describe a situation where you had to manage your emotions.']
  },
  {
    id: 'project-management',
    name: 'Project Management',
    category: 'Business' as SoftSkillCategory,
    description: 'Planning, executing, and closing projects within scope, time, and budget constraints.',
    importance: 82,
    careerImpact: 'Essential for delivering complex work and advancing to senior roles.',
    assessment: {
      type: 'simulation',
      questions: 6,
      description: 'Project planning and execution scenarios with evaluation criteria.'
    },
    development: {
      methods: ['Project planning practice', 'Tool training', 'Methodology learning', 'Post-mortem analysis'],
      resources: ['PMP certification', 'Agile/Scrum training', 'Project management tools', 'Case studies'],
      timeline: '3-6 months for methodology understanding'
    },
    relatedHardSkills: ['Agile', 'Scrum', 'Risk Management', 'Budgeting'],
    examples: ['Managing project timelines and milestones', 'Coordinating cross-functional teams', 'Managing stakeholder expectations'],
    interviewQuestions: ['How do you keep projects on track?', 'Describe a project you managed and its outcome.']
  },
  {
    id: 'stakeholder-management',
    name: 'Stakeholder Management',
    category: 'Business' as SoftSkillCategory,
    description: 'Identifying, analyzing, and strategically engaging with individuals or groups with interest in a project.',
    importance: 80,
    careerImpact: 'Critical for project success and building professional relationships.',
    assessment: {
      type: 'peer',
      questions: 8,
      description: 'Feedback on communication and relationship management with stakeholders.'
    },
    development: {
      methods: ['Stakeholder mapping', 'Communication planning', 'Relationship building', 'Negotiation practice'],
      resources: ['Stakeholder management courses', 'Negotiation training', 'Networking skills'],
      timeline: '4-8 months for skill development'
    },
    relatedHardSkills: ['Communication', 'Presentation', 'Negotiation'],
    examples: ['Managing client expectations', 'Communicating with executives', 'Balancing competing stakeholder requests'],
    interviewQuestions: ['How do you handle difficult stakeholders?', 'Describe a situation where stakeholder management was critical to success.']
  },
  {
    id: 'negotiation',
    name: 'Negotiation',
    category: 'Business' as SoftSkillCategory,
    description: 'Reaching agreements through discussion and compromise to achieve mutually beneficial outcomes.',
    importance: 75,
    careerImpact: 'Valuable for contracts, salaries, scope discussions, and conflict resolution.',
    assessment: {
      type: 'simulation',
      questions: 5,
      description: 'Role-play negotiation scenarios with evaluation criteria.'
    },
    development: {
      methods: ['Negotiation training', 'Role-playing', 'Observation', 'Preparation frameworks'],
      resources: ['Getting to Yes', 'Negotiation courses', 'Practice scenarios', 'Mentoring'],
      timeline: '2-4 months for basic skills'
    },
    relatedHardSkills: ['Communication', 'Persuasion', 'Conflict Resolution'],
    examples: ['Salary negotiations', 'Contract discussions', 'Scope negotiation with clients'],
    interviewQuestions: ['Describe a negotiation you were involved in.', 'How do you prepare for a negotiation?']
  },
  {
    id: 'creativity',
    name: 'Creativity',
    category: 'Creative' as SoftSkillCategory,
    description: 'Generating novel and valuable ideas, solutions, or artistic expressions.',
    importance: 80,
    careerImpact: 'Differentiator for innovation and problem-solving in technical roles.',
    assessment: {
      type: 'simulation',
      questions: 6,
      description: 'Creative problem-solving and ideation exercises.'
    },
    development: {
      methods: ['Brainstorming techniques', 'Cross-domain learning', 'Creative exercises', 'Design thinking'],
      resources: ['Creative workshops', 'Design thinking training', 'Brainstorming tools', 'Artistic pursuits'],
      timeline: 'Ongoing - develops with practice'
    },
    relatedHardSkills: ['Design', 'Innovation', 'Problem Solving'],
    examples: ['Coming up with novel solutions', 'Designing user experiences', 'Finding creative workarounds'],
    interviewQuestions: ['Describe a creative solution you developed.', 'How do you approach problems that seem to have no solution?']
  },
  {
    id: 'attention-to-detail',
    name: 'Attention to Detail',
    category: 'Analytical' as SoftSkillCategory,
    description: 'Thoroughness and accuracy in completing tasks with careful observation.',
    importance: 88,
    careerImpact: 'Critical for code quality, documentation, and preventing bugs.',
    assessment: {
      type: 'simulation',
      questions: 10,
      description: 'Exercises testing ability to spot errors and inconsistencies.'
    },
    development: {
      methods: ['Checklists', 'Code reviews', 'Quality processes', 'Mindfulness practice'],
      resources: ['Quality assurance training', 'Proofreading practice', 'Style guides', 'Review checklists'],
      timeline: '1-3 months for habit formation'
    },
    relatedHardSkills: ['Quality Assurance', 'Code Review', 'Testing'],
    examples: ['Catching bugs before they reach production', 'Writing comprehensive documentation', 'Spotting edge cases'],
    interviewQuestions: ['How do you ensure attention to detail in your work?', 'Describe a time you caught an error that others missed.']
  },
  {
    id: 'perseverance',
    name: 'Perseverance',
    category: 'Personal Development' as SoftSkillCategory,
    description: 'Continuing to pursue goals despite difficulties, obstacles, or discouragement.',
    importance: 85,
    careerImpact: 'Essential for long-term success in challenging technical work.',
    assessment: {
      type: 'self',
      questions: 10,
      description: 'Self-reflection on persistence through challenges and learning from failure.'
    },
    development: {
      methods: ['Goal setting', 'Small wins tracking', 'Resilience building', 'Growth mindset'],
      resources: ['Psychology of Grit', 'Motivation training', 'Failure reframing', 'Support networks'],
      timeline: 'Ongoing - mindset development takes 3-6 months'
    },
    relatedHardSkills: ['Debugging', 'Learning Agility', 'Resilience'],
    examples: ['Working through complex bugs', 'Continuing despite setbacks', 'Learning from failed projects'],
    interviewQuestions: ['Describe a time you failed and how you responded.', 'How do you handle situations where progress is slow?']
  },
  {
    id: 'mentoring',
    name: 'Mentoring',
    category: 'Leadership' as SoftSkillCategory,
    description: 'Guiding, supporting, and developing less experienced colleagues for their growth.',
    importance: 75,
    careerImpact: 'Important for leadership progression and organizational knowledge transfer.',
    assessment: {
      type: 'peer',
      questions: 10,
      description: 'Feedback from mentees on guidance quality and development impact.'
    },
    development: {
      methods: ['Mentoring training', 'Practice sessions', 'Feedback collection', 'Mentor matching'],
      resources: ['Mentoring programs', 'Coaching certifications', 'Leadership development'],
      timeline: '3-6 months to develop effective mentoring style'
    },
    relatedHardSkills: ['Leadership', 'Communication', 'Teaching'],
    examples: ['Onboarding new team members', 'Supporting junior developers', 'Sharing knowledge through documentation and talks'],
    interviewQuestions: ['Describe your experience mentoring others.', 'How do you approach helping someone who is struggling?']
  },
  {
    id: 'career-counseling',
    name: 'Kariérové poradenství',
    category: 'Personal Development' as SoftSkillCategory,
    description: 'Schopnost pomáhat ostatním s kariérním rozhodováním, sebepoznáním a profesním rozvojem.',
    importance: 80,
    careerImpact: 'Cenná dovednost pro HR, management, a každého, kdo chce podporovat růst ostatních.',
    assessment: {
      type: 'simulation',
      questions: 8,
      description: 'Simulace kariérního poradenství s hodnocením technik naslouchání, kladení otázek a poskytování rad.'
    },
    development: {
      methods: ['Koučink kurzy', 'Aktivní naslouchání', '职业生涯规划培训', 'Mentoring praxe'],
      resources: ['Kariérní poradenství kursy', 'ICF koučink certifikace', 'Psychologie práce', 'Personální management'],
      timeline: '6-12 měsíců pro významný rozvoj'
    },
    relatedHardSkills: ['Koučink', 'Komunikace', 'Psychologie', 'Vzdělávání dospělých'],
    examples: ['Pomoc kolegům s kariérním směřováním', 'Vedeníworkshopů o kariéře', 'Individuální koučink'],
    interviewQuestions: ['Jak přistupujete k kariérnímu poradenství?', 'Popište situaci, kdy jste pomohli někomu s kariérním rozhodnutím.']
  }
];

export const getSoftSkillById = (id: string): SoftSkill | undefined => {
  return SOFT_SKILLS.find(skill => skill.id === id);
};

export const getSoftSkillsByCategory = (category: SoftSkillCategory): SoftSkill[] => {
  return SOFT_SKILLS.filter(skill => skill.category === category);
};

export const getTopSoftSkills = (limit: number = 10): SoftSkill[] => {
  return [...SOFT_SKILLS]
    .sort((a, b) => b.importance - a.importance)
    .slice(0, limit);
};

export const searchSoftSkills = (query: string): SoftSkill[] => {
  const lowerQuery = query.toLowerCase();
  return SOFT_SKILLS.filter(skill =>
    skill.name.toLowerCase().includes(lowerQuery) ||
    skill.description.toLowerCase().includes(lowerQuery) ||
    skill.category.toLowerCase().includes(lowerQuery)
  );
};
