import { SkillTemplate, SkillCategory } from '@/types';

export const NON_IT_SKILL_TEMPLATES: SkillTemplate[] = [
  // === GARDENING & AGRICULTURE ===
  {
    title: 'Organic Vegetable Gardening Masterclass',
    platform: 'Self-paced Online Course',
    category: 'Gardening' as SkillCategory,
    instructor: 'Organic Farming Expert',
    totalHours: 40,
    tags: ['Gardening', 'Organic Farming', 'Vegetables', 'Composting', 'Pest Control', 'Soil Health', 'Sustainability'],
    description: 'Complete guide to starting and maintaining an organic vegetable garden. Learn soil preparation, seed selection, planting techniques, natural pest management, and harvesting methods for a bountiful harvest.',
    modules: [
      { id: 'gv1', title: 'Understanding Soil and Its Health', isCompleted: false },
      { id: 'gv2', title: 'Composting and Natural Fertilizers', isCompleted: false },
      { id: 'gv3', title: 'Seed Selection and Starting Seeds', isCompleted: false },
      { id: 'gv4', title: 'Planting Techniques and Garden Planning', isCompleted: false },
      { id: 'gv5', title: 'Watering and Irrigation Systems', isCompleted: false },
      { id: 'gv6', title: 'Natural Pest and Disease Management', isCompleted: false },
      { id: 'gv7', title: 'Companion Planting', isCompleted: false },
      { id: 'gv8', title: 'Harvesting and Storage', isCompleted: false },
      { id: 'gv9', title: 'Season Extension and Greenhouses', isCompleted: false },
      { id: 'gv10', title: 'Year-Round Garden Planning', isCompleted: false }
    ],
    resources: [
      { name: 'The Vegetable Gardener\'s Bible', url: 'https://www.amazon.com/Vegetable-Gardeners-Bible-2nd/dp/1603424764', type: 'book' },
      { name: 'Rodale\'s Organic Life', url: 'https://www.rodale.com/', type: 'doc' }
    ],
    difficulty: 2,
    careerPaths: ['Gardener', 'Farm Worker', 'Horticultural Technician', 'Sustainable Agriculture Specialist'],
    iconColor: '#228B22',
    icon: '🥕'
  },
  {
    title: 'Landscape Design Fundamentals',
    platform: 'Professional Course',
    category: 'Gardening' as SkillCategory,
    instructor: 'Landscape Architect',
    totalHours: 60,
    tags: ['Landscape Design', 'Garden Planning', 'Hardscaping', 'Plant Selection', 'Design Software', 'Visualization'],
    description: 'Learn the principles of landscape design including layout planning, plant selection, hardscape elements, and using design software to create professional garden plans.',
    modules: [
      { id: 'ld1', title: 'Principles of Landscape Design', isCompleted: false },
      { id: 'ld2', title: 'Site Analysis and Assessment', isCompleted: false },
      { id: 'ld3', title: 'Garden Styles and Themes', isCompleted: false },
      { id: 'ld4', title: 'Plant Selection and Grouping', isCompleted: false },
      { id: 'ld5', title: 'Hardscape Elements', isCompleted: false },
      { id: 'ld6', title: 'Design Software Tools', isCompleted: false },
      { id: 'ld7', title: 'Drawing and Presentation Skills', isCompleted: false },
      { id: 'ld8', title: 'Budgeting and Project Management', isCompleted: false }
    ],
    resources: [
      { name: 'SketchUp for Landscape Design', url: 'https://www.sketchup.com/', type: 'repo' },
      { name: 'Garden Design Journal', url: 'https://www.gardendesign.com/', type: 'doc' }
    ],
    difficulty: 3,
    careerPaths: ['Landscape Designer', 'Garden Architect', 'Horticultural Consultant'],
    iconColor: '#2E8B57',
    icon: '🏡'
  },
  {
    title: 'Permaculture Design Certificate',
    platform: 'Accredited Course',
    category: 'Gardening' as SkillCategory,
    instructor: 'Permaculture Institute Certified Teacher',
    totalHours: 80,
    tags: ['Permaculture', 'Sustainable Design', 'Food Forests', 'Water Management', 'Renewable Systems', 'Ecosystem Design'],
    description: 'Comprehensive permaculture design training covering sustainable agriculture, water harvesting, renewable energy integration, and ecosystem design principles.',
    modules: [
      { id: 'pd1', title: 'Ethics and Principles of Permaculture', isCompleted: false },
      { id: 'pd2', title: 'Patterns in Nature', isCompleted: false },
      { id: 'pd3', title: 'Climate and Microclimate Design', isCompleted: false },
      { id: 'pd4', title: 'Water Management Systems', isCompleted: false },
      { id: 'pd5', title: 'Soil Building and Management', isCompleted: false },
      { id: 'pd6', title: 'Food Forest Design', isCompleted: false },
      { id: 'pd7', title: 'Appropriate Technology', isCompleted: false },
      { id: 'pd8', title: 'Design Project Development', isCompleted: false }
    ],
    resources: [
      { name: 'Permaculture Designer\'s Manual', url: 'https://www.permaculture.org/', type: 'book' },
      { name: 'Permaculture Research Institute', url: 'https://permaculture.org.au/', type: 'doc' }
    ],
    difficulty: 4,
    careerPaths: ['Permaculture Designer', 'Sustainable Farm Manager', 'Environmental Consultant'],
    iconColor: '#006400',
    icon: '🌿'
  },

  // === COOKING & FOOD PRESERVATION ===
  {
    title: 'Professional Home Cooking Fundamentals',
    platform: 'Online Culinary School',
    category: 'Cooking & Preserving' as SkillCategory,
    instructor: 'Professional Chef',
    totalHours: 50,
    tags: ['Cooking', 'Culinary Skills', 'Knife Techniques', 'Sauces', 'Cooking Methods', 'Recipe Development', 'Food Safety'],
    description: 'Master essential cooking skills including knife techniques, cooking methods, sauce making, and food safety. Build a strong foundation for any culinary endeavor.',
    modules: [
      { id: 'ch1', title: 'Knife Skills and Safety', isCompleted: false },
      { id: 'ch2', title: 'Understanding Ingredients', isCompleted: false },
      { id: 'ch3', title: 'Cooking Methods - Dry Heat', isCompleted: false },
      { id: 'ch4', title: 'Cooking Methods - Moist Heat', isCompleted: false },
      { id: 'ch5', title: 'Sauce Making Fundamentals', isCompleted: false },
      { id: 'ch6', title: 'Seasoning and Flavor Building', isCompleted: false },
      { id: 'ch7', title: 'Food Safety and Hygiene', isCompleted: false },
      { id: 'ch8', title: 'Plating and Presentation', isCompleted: false }
    ],
    resources: [
      { name: 'The Professional Chef (Culinary Institute of America)', url: 'https://www.ciachef.edu/', type: 'book' },
      { name: 'Gordon Ramsay Cooking Course', url: 'https://www.gordonramsay.com/', type: 'video' }
    ],
    difficulty: 2,
    careerPaths: ['Home Cook', 'Catering Assistant', 'Food Blogger', 'Recipe Developer'],
    iconColor: '#FF6347',
    icon: '🍳'
  },
  {
    title: 'Artisan Bread Baking',
    platform: 'Specialized Course',
    category: 'Cooking & Preserving' as SkillCategory,
    instructor: 'Master Baker',
    totalHours: 30,
    tags: ['Bread Baking', 'Fermentation', 'Sourdough', 'Artisan Techniques', 'Flour Science', 'Shaping'],
    description: 'Learn the art of artisan bread baking including sourdough cultivation, fermentation science, and shaping techniques for crusty, flavorful loaves.',
    modules: [
      { id: 'bb1', title: 'Flour Science and Ingredients', isCompleted: false },
      { id: 'bb2', title: 'Yeast and Fermentation', isCompleted: false },
      { id: 'bb3', title: 'Sourdough Starter Creation', isCompleted: false },
      { id: 'bb4', title: 'Dough Development Techniques', isCompleted: false },
      { id: 'bb5', title: 'Shaping and Scoring', isCompleted: false },
      { id: 'bb6', title: 'Baking with Steam', isCompleted: false },
      { id: 'bb7', title: 'Troubleshooting Common Issues', isCompleted: false }
    ],
    resources: [
      { name: 'Flour Water Salt Yeast', url: 'https://www.amazon.com/Flour-Water-Salt-Yeast-Fundamentals/dp/160774273X', type: 'book' },
      { name: 'The Bread Baker\'s Apprentice', url: 'https://www.amazon.com/Bread-Bakers-Apprentice-Mastering-Extraordinary/dp/158047286X', type: 'book' }
    ],
    difficulty: 3,
    careerPaths: ['Artisan Baker', 'Bread Blogger', 'Bakery Assistant'],
    iconColor: '#DAA520',
    icon: '🍞'
  },
  {
    title: 'Food Preservation and Canning',
    platform: 'Self-Paced Course',
    category: 'Cooking & Preserving' as SkillCategory,
    instructor: 'Food Safety Expert',
    totalHours: 25,
    tags: ['Canning', 'Preserving', 'Pickling', 'Fermentation', 'Food Safety', 'Storage', 'Jam Making'],
    description: 'Master traditional and modern food preservation methods including water bath canning, pressure canning, pickling, fermentation, and drying for safe, delicious preserved foods.',
    modules: [
      { id: 'fp1', title: 'Food Safety Principles', isCompleted: false },
      { id: 'fp2', title: 'Water Bath Canning', isCompleted: false },
      { id: 'fp3', title: 'Pressure Canning', isCompleted: false },
      { id: 'fp4', title: 'Pickling and Brining', isCompleted: false },
      { id: 'fp5', title: 'Fermentation Basics', isCompleted: false },
      { id: 'fp6', title: 'Jam and Jelly Making', isCompleted: false },
      { id: 'fp7', title: 'Drying and Dehydrating', isCompleted: false },
      { id: 'fp8', title: 'Storage and Labeling', isCompleted: false }
    ],
    resources: [
      { name: 'Ball Canning Guide', url: 'https://www.freshpreserving.com/', type: 'doc' },
      { name: 'USDA Complete Guide to Home Canning', url: 'https://nchfp.uga.edu/', type: 'doc' }
    ],
    difficulty: 2,
    careerPaths: ['Food Preserver', 'Small-scale Food Producer', 'Farm-to-Table Specialist'],
    iconColor: '#CD853F',
    icon: '🫙'
  },

  // === ANIMAL CARE ===
  {
    title: 'Professional Pet Grooming',
    platform: 'Vocational Training',
    category: 'Animal Care' as SkillCategory,
    instructor: 'Certified Master Groomer',
    totalHours: 120,
    tags: ['Pet Grooming', 'Dog Grooming', 'Cat Grooming', 'Breed Standards', 'Animal Behavior', 'Sanitation', 'Tools'],
    description: 'Comprehensive training in professional pet grooming including breed-specific cuts, bathing, nail trimming, ear cleaning, and handling techniques for dogs and cats.',
    modules: [
      { id: 'pg1', title: 'Animal Behavior and Handling', isCompleted: false },
      { id: 'pg2', title: 'Anatomy for Groomers', isCompleted: false },
      { id: 'pg3', title: 'Tool Selection and Maintenance', isCompleted: false },
      { id: 'pg4', title: 'Bathing and Drying Techniques', isCompleted: false },
      { id: 'pg5', title: 'Clipping and Scissor Work', isCompleted: false },
      { id: 'pg6', title: 'Breed-Specific Grooming', isCompleted: false },
      { id: 'pg7', title: 'Nail, Ear, and Eye Care', isCompleted: false },
      { id: 'pg8', title: 'Sanitation and Hygiene', isCompleted: false },
      { id: 'pg9', title: 'Starting Your Grooming Business', isCompleted: false }
    ],
    resources: [
      { name: 'International Professional Groomers Association', url: 'https://ipga.groomer.net/', type: 'doc' },
      { name: 'Grooming Tool Guide', url: 'https://www.groomers-online.com/', type: 'doc' }
    ],
    difficulty: 3,
    careerPaths: ['Professional Pet Groomer', 'Grooming Salon Manager', 'Mobile Groomer'],
    iconColor: '#FF69B4',
    icon: '🐕'
  },
  {
    title: 'Small Animal Care and Husbandry',
    platform: 'Comprehensive Course',
    category: 'Animal Care' as SkillCategory,
    instructor: 'Veterinary Technician',
    totalHours: 45,
    tags: ['Small Animals', 'Hamsters', 'Guinea Pigs', 'Rabbits', 'Feeding', 'Housing', 'Health Signs', 'Behavior'],
    description: 'Learn proper care, feeding, housing, and health management for popular small companion animals including hamsters, guinea pigs, rabbits, and other small mammals.',
    modules: [
      { id: 'sa1', title: 'Species Overview and Characteristics', isCompleted: false },
      { id: 'sa2', title: 'Nutrition and Feeding Requirements', isCompleted: false },
      { id: 'sa3', title: 'Housing and Environment Setup', isCompleted: false },
      { id: 'sa4', title: 'Handling and Socialization', isCompleted: false },
      { id: 'sa5', title: 'Health Monitoring and Warning Signs', isCompleted: false },
      { id: 'sa6', title: 'Common Health Issues', isCompleted: false },
      { id: 'sa7', title: 'Breeding Basics', isCompleted: false },
      { id: 'sa8', title: 'Legal and Ethical Considerations', isCompleted: false }
    ],
    resources: [
      { name: 'RSPCA Small Animal Care Guide', url: 'https://www.rspca.org.uk/', type: 'doc' },
      { name: 'Veterinary Partner', url: 'https://veterinarypartner.vin.com/', type: 'doc' }
    ],
    difficulty: 2,
    careerPaths: ['Pet Store Specialist', 'Animal Shelter Worker', 'Veterinary Assistant', 'Pet Sitter'],
    iconColor: '#DEB887',
    icon: '🐹'
  },
  {
    title: 'Dog Training and Behavior',
    platform: 'Professional Certification Prep',
    category: 'Animal Care' as SkillCategory,
    instructor: 'Certified Dog Trainer',
    totalHours: 80,
    tags: ['Dog Training', 'Behavior Modification', 'Obedience Training', 'Positive Reinforcement', 'Puppy Training', 'Problem Behaviors', 'Canine Psychology'],
    description: 'Master dog training techniques based on positive reinforcement, understand canine behavior and psychology, and learn to address common problem behaviors.',
    modules: [
      { id: 'dt1', title: 'Canine Psychology and Communication', isCompleted: false },
      { id: 'dt2', title: 'Learning Theory and Training Principles', isCompleted: false },
      { id: 'dt3', title: 'Positive Reinforcement Techniques', isCompleted: false },
      { id: 'dt4', title: 'Basic Obedience Commands', isCompleted: false },
      { id: 'dt5', title: 'Puppy Training and Socialization', isCompleted: false },
      { id: 'dt6', title: 'Problem Behavior Analysis', isCompleted: false },
      { id: 'dt7', title: 'Behavior Modification Strategies', isCompleted: false },
      { id: 'dt8', title: 'Training for Specific Purposes', isCompleted: false },
      { id: 'dt9', title: 'Building a Training Business', isCompleted: false }
    ],
    resources: [
      { name: 'Karen Pryor Clicker Training', url: 'https://www.karenpryoracademy.com/', type: 'doc' },
      { name: 'Victoria Stilwell Academy', url: 'https://www.victoriastilwell.com/', type: 'doc' }
    ],
    difficulty: 3,
    careerPaths: ['Professional Dog Trainer', 'Behavior Consultant', 'Service Dog Trainer', 'Pet Boarding Facility Manager'],
    iconColor: '#8B4513',
    icon: '🐩'
  },

  // === TREE CARE & ARBORICULTURE ===
  {
    title: 'Professional Tree Pruning and Care',
    platform: 'Vocational Training',
    category: 'Tree Care' as SkillCategory,
    instructor: 'Certified Arborist',
    totalHours: 60,
    tags: ['Tree Pruning', 'Arboriculture', 'Tree Health', 'Safety', 'Tools', 'Crown Reduction', 'Deadwood Removal', 'Formative Pruning'],
    description: 'Learn professional tree pruning techniques, tree health assessment, safety protocols, and equipment handling for residential and commercial tree care.',
    modules: [
      { id: 'tp1', title: 'Tree Biology and Physiology', isCompleted: false },
      { id: 'tp2', title: 'Pruning Principles and Techniques', isCompleted: false },
      { id: 'tp3', title: 'Species-Specific Pruning', isCompleted: false },
      { id: 'tp4', title: 'Safety Protocols and Equipment', isCompleted: false },
      { id: 'tp5', title: 'Tree Health Assessment', isCompleted: false },
      { id: 'tp6', title: 'Crown Reduction and Thinning', isCompleted: false },
      { id: 'tp7', title: 'Deadwood and Hazard Removal', isCompleted: false },
      { id: 'tp8', title: 'Legal Considerations and Permissions', isCompleted: false }
    ],
    resources: [
      { name: 'ISA Certified Arborist Program', url: 'https://www.isa-arbor.com/', type: 'doc' },
      { name: 'Tree Care Industry Association', url: 'https://www.tcia.org/', type: 'doc' }
    ],
    difficulty: 3,
    careerPaths: ['Arborist', 'Tree Surgeon', 'Grounds Maintenance Supervisor', 'Municipal Tree Care Worker'],
    iconColor: '#228B22',
    icon: '🌳'
  },
  {
    title: 'Fruit Tree Growing and Orchard Management',
    platform: 'Specialized Course',
    category: 'Tree Care' as SkillCategory,
    instructor: 'Horticultural Specialist',
    totalHours: 40,
    tags: ['Fruit Trees', 'Orchard Management', 'Pruning', 'Pest Management', 'Harvesting', 'Pollination', 'Soil Management', 'Variety Selection'],
    description: 'Comprehensive training in establishing and maintaining home orchards including fruit tree selection, planting, training systems, pest management, and harvesting.',
    modules: [
      { id: 'ft1', title: 'Fruit Tree Species and Varieties', isCompleted: false },
      { id: 'ft2', title: 'Site Selection and Preparation', isCompleted: false },
      { id: 'ft3', title: 'Planting and Establishment', isCompleted: false },
      { id: 'ft4', title: 'Training Systems (Espalier, Standard, Dwarf)', isCompleted: false },
      { id: 'ft5', title: 'Pollination Requirements', isCompleted: false },
      { id: 'ft6', title: 'Pest and Disease Management', isCompleted: false },
      { id: 'ft7', title: 'Pruning for Fruit Production', isCompleted: false },
      { id: 'ft8', title: 'Harvesting and Storage', isCompleted: false },
      { id: 'ft9', title: 'Organic Orchard Practices', isCompleted: false }
    ],
    resources: [
      { name: 'The Apple Grower', url: 'https://www.chelseagreen.com/', type: 'book' },
      { name: 'University Extension Services', url: 'https://www.extension.org/', type: 'doc' }
    ],
    difficulty: 3,
    careerPaths: ['Orchard Worker', 'Small Fruit Producer', 'Horticultural Consultant', 'Farm Market Vendor'],
    iconColor: '#FF8C00',
    icon: '🍎'
  },
  {
    title: 'Tree Risk Assessment and Management',
    platform: 'Professional Certification',
    category: 'Tree Care' as SkillCategory,
    instructor: 'ISA Certified Master Arborist',
    totalHours: 35,
    tags: ['Tree Risk', 'Hazard Assessment', 'Failure Prediction', 'Safety Standards', 'Inspection', 'Documentation', 'Mitigation'],
    description: 'Learn systematic tree risk assessment methodologies to identify hazardous trees, evaluate failure probability, and recommend appropriate mitigation measures.',
    modules: [
      { id: 'tr1', title: 'Tree Failure Mechanics', isCompleted: false },
      { id: 'tr2', title: 'Visual Tree Assessment', isCompleted: false },
      { id: 'tr3', title: 'Advanced Diagnostic Tools', isCompleted: false },
      { id: 'tr4', title: 'Risk Calculation and Prioritization', isCompleted: false },
      { id: 'tr5', title: 'Mitigation Strategies', isCompleted: false },
      { id: 'tr6', title: 'Documentation and Reporting', isCompleted: false },
      { id: 'tr7', title: 'Legal and Liability Issues', isCompleted: false }
    ],
    resources: [
      { name: 'ANSI A300 (Tree Care Standards)', url: 'https://www.tcia.org/', type: 'doc' },
      { name: ' Bartlett Tree Experts Research', url: 'https://www.bartlett.com/', type: 'doc' }
    ],
    difficulty: 4,
    careerPaths: ['Tree Risk Assessor', 'Urban Forester', 'Municipal Arborist', 'Consulting Arborist'],
    iconColor: '#556B2F',
    icon: '🌲'
  },

  // === HOME MAINTENANCE ===
  {
    title: 'Home Repair Fundamentals',
    platform: 'Self-Paced Course',
    category: 'Gardening' as SkillCategory,
    instructor: 'Master Tradesperson',
    totalHours: 50,
    tags: ['Home Repair', 'Carpentry', 'Plumbing Basics', 'Electrical Basics', 'Painting', 'Drywall', 'Tools'],
    description: 'Master essential home repair skills including basic carpentry, plumbing fixes, electrical basics, painting, and drywall repair for confident DIY home maintenance.',
    modules: [
      { id: 'hr1', title: 'Tool Selection and Safety', isCompleted: false },
      { id: 'hr2', title: 'Basic Carpentry and Wood Repair', isCompleted: false },
      { id: 'hr3', title: 'Plumbing Basics and Common Fixes', isCompleted: false },
      { id: 'hr4', title: 'Electrical Basics and Safety', isCompleted: false },
      { id: 'hr5', title: 'Drywall Repair and Patching', isCompleted: false },
      { id: 'hr6', title: 'Painting Techniques', isCompleted: false },
      { id: 'hr7', title: 'Flooring Basics', isCompleted: false },
      { id: 'hr8', title: 'Weatherproofing and Insulation', isCompleted: false }
    ],
    resources: [
      { name: 'Home Depot Workshop Series', url: 'https://www.homedepot.com/workshops', type: 'video' },
      { name: 'This Old House', url: 'https://www.thisoldhouse.com/', type: 'doc' }
    ],
    difficulty: 2,
    careerPaths: ['DIY Homeowner', 'Property Manager', 'Maintenance Technician', 'Handyman'],
    iconColor: '#708090',
    icon: '🔧'
  },
  {
    title: 'HVAC Maintenance and Troubleshooting',
    platform: 'Technical Training',
    category: 'Gardening' as SkillCategory,
    instructor: 'HVAC Certified Technician',
    totalHours: 70,
    tags: ['HVAC', 'Heating', 'Cooling', 'Air Quality', 'Thermostats', 'Refrigeration', 'Ventilation', 'Troubleshooting'],
    description: 'Comprehensive training in heating, ventilation, and air conditioning systems including operation, maintenance, troubleshooting, and repair.',
    modules: [
      { id: 'hvac1', title: 'HVAC Fundamentals and Theory', isCompleted: false },
      { id: 'hvac2', title: 'Heating Systems (Gas, Oil, Heat Pumps)', isCompleted: false },
      { id: 'hvac3', title: 'Cooling Systems and Refrigeration', isCompleted: false },
      { id: 'hvac4', title: 'Ventilation and Air Distribution', isCompleted: false },
      { id: 'hvac5', title: 'Thermostats and Controls', isCompleted: false },
      { id: 'hvac6', title: 'Air Quality and Filtration', isCompleted: false },
      { id: 'hvac7', title: 'Preventive Maintenance', isCompleted: false },
      { id: 'hvac8', title: 'Troubleshooting and Diagnostics', isCompleted: false },
      { id: 'hvac9', title: 'Safety and Regulations', isCompleted: false }
    ],
    resources: [
      { name: 'EPA 608 Certification', url: 'https://www.epa.gov/', type: 'doc' },
      { name: 'HVAC Excellence', url: 'https://www.hvac-excellence.org/', type: 'doc' }
    ],
    difficulty: 4,
    careerPaths: ['HVAC Technician', 'Building Maintenance Engineer', 'Facilities Technician'],
    iconColor: '#4682B4',
    icon: '❄️'
  },

  // === AUTOMOTIVE ===
  {
    title: 'Základy automechaniky a údržby',
    platform: 'Vocational Training',
    category: 'Automotive' as SkillCategory,
    instructor: 'Master Mechanic',
    totalHours: 80,
    tags: ['Automotive', 'Mechanics', 'Engine Repair', 'Maintenance', 'Oil Change', 'Safety', 'Tools'],
    description: 'Komplexní úvod do automechaniky. Naučte se, jak fungují spalovací motory, provádět základní údržbu (výměna oleje, filtrů), a bezpečně pracovat v dílně.',
    modules: [
      { id: 'am1', title: 'Bezpečnost práce a nářadí', isCompleted: false },
      { id: 'am2', title: 'Princip spalovacího motoru', isCompleted: false },
      { id: 'am3', title: 'Chladicí a mazací soustava', isCompleted: false },
      { id: 'am4', title: 'Brzdový systém - základy', isCompleted: false },
      { id: 'am5', title: 'Pravidelné servisní prohlídky', isCompleted: false },
      { id: 'am6', title: 'Výměna provozních kapalin', isCompleted: false },
      { id: 'am7', title: 'Základy podvozku a řízení', isCompleted: false }
    ],
    resources: [
      { name: 'Jak na to (Service Manuals)', url: 'https://www.haynes.com/', type: 'book' },
      { name: 'Engineering Explained (YouTube)', url: 'https://www.youtube.com/user/EngineeringExplained', type: 'video' }
    ],
    difficulty: 2,
    careerPaths: ['Junior Automechanik', 'Servisní asistent', 'Hobby mechanik'],
    iconColor: '#D32F2F',
    icon: '🚗'
  },
  {
    title: 'Autodiagnostika a elektrika vozidel',
    platform: 'Technical Certification',
    category: 'Automotive' as SkillCategory,
    instructor: 'Automotive Electrician',
    totalHours: 60,
    tags: ['Diagnostics', 'OBD-II', 'Car Electrics', 'Sensors', 'Troubleshooting', 'Wiring', 'ECU'],
    description: 'Zvládněte moderní diagnostiku vozidel. Kurz pokrývá práci s OBD-II skenery, měření multimetrem, testování senzorů a řešení elektronických závad.',
    modules: [
      { id: 'ad1', title: 'Základy autoelektriky (V, A, Ohm)', isCompleted: false },
      { id: 'ad2', title: 'Práce s multimetrem a osciloskopem', isCompleted: false },
      { id: 'ad3', title: 'OBD-II diagnostika a chybové kódy', isCompleted: false },
      { id: 'ad4', title: 'Senzory motoru a jejich funkce', isCompleted: false },
      { id: 'ad5', title: 'Startovací a dobíjecí soustava', isCompleted: false },
      { id: 'ad6', title: 'Komfortní elektronika', isCompleted: false },
      { id: 'ad7', title: 'Čtení elektrických schémat', isCompleted: false }
    ],
    resources: [
      { name: 'Ross-Tech VCDS', url: 'https://www.ross-tech.com/', type: 'doc' },
      { name: 'AutoCodes.com', url: 'https://www.autocodes.com/', type: 'doc' }
    ],
    difficulty: 4,
    careerPaths: ['Autoelektrikář', 'Diagnostik', 'Mechatronik'],
    iconColor: '#FFC107',
    icon: '⚡'
  },
  {
    title: 'Pneuservis a geometrie podvozku',
    platform: 'Specialized Workshop',
    category: 'Automotive' as SkillCategory,
    instructor: 'Chassis Specialist',
    totalHours: 40,
    tags: ['Tires', 'Suspension', 'Alignment', 'Brakes', 'Wheels', 'Safety Systems', 'TPMS'],
    description: 'Specializace na podvozkové části. Výměna a vyvažování pneumatik, opravy defektů, seřízení geometrie kol a servis brzdových systémů.',
    modules: [
      { id: 'pg1', title: 'Konstrukce a značení pneumatik', isCompleted: false },
      { id: 'pg2', title: 'Demontáž, montáž a vyvažování kol', isCompleted: false },
      { id: 'pg3', title: 'Opravy průpichů pneumatik', isCompleted: false },
      { id: 'pg4', title: 'Systémy TPMS (tlak v pneu)', isCompleted: false },
      { id: 'pg5', title: 'Geometrie podvozku - teorie a praxe', isCompleted: false },
      { id: 'pg6', title: 'Kontrola tlumičů a zavěšení', isCompleted: false },
      { id: 'pg7', title: 'Servis kotoučových a bubnových brzd', isCompleted: false }
    ],
    resources: [
      { name: 'Tire Review Magazine', url: 'https://www.tirereview.com/', type: 'doc' },
      { name: 'Brembo Brake Guide', url: 'https://www.bremboparts.com/', type: 'doc' }
    ],
    difficulty: 3,
    careerPaths: ['Pneuservisní mechanik', 'Podvozkový specialista'],
    iconColor: '#212121',
    icon: '🔧'
  }
];

export const getNonItSkillTemplates = (category: string): SkillTemplate[] => {
  return NON_IT_SKILL_TEMPLATES.filter(skill => skill.category === category);
};

export const searchNonItSkills = (query: string): SkillTemplate[] => {
  const lowerQuery = query.toLowerCase();
  return NON_IT_SKILL_TEMPLATES.filter(skill =>
    skill.title.toLowerCase().includes(lowerQuery) ||
    skill.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    skill.description.toLowerCase().includes(lowerQuery)
  );
};
