// Automotive Skills Data for Skill Board
// Comprehensive skills for automotive industry professionals

export type AutomotiveSkillCategory = 
  | 'Vehicle Maintenance'
  | 'Automotive Diagnostics'
  | 'Engine Systems'
  | 'Electrical Systems'
  | 'Chassis & Suspension'
  | 'Transmission & Drivetrain'
  | 'Body & Paint'
  | 'Automotive Technology'
  | 'Performance Tuning'
  | 'Electric Vehicles'
  | 'Hybrid Systems'
  | 'Commercial Vehicles'
  | 'Motorcycles'
  | 'Heavy Machinery'
  | 'Welding & Fabrication'
  | 'HVAC & Climate Control'
  | 'Emissions & Environmental'
  | 'Car Audio & Security';

export interface AutomotiveSkill {
  id: string;
  name: string;
  slug: string;
  category: AutomotiveSkillCategory;
  description: string;
  longDescription: string;
  icon: string;
  iconColor: string;
  tags: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  salaryRange: {
    junior: number;
    mid: number;
    senior: number;
    lead: number;
  };
  demandIndex: number;
  timeToMaster: string;
  certifications: string[];
  relatedSkills: string[];
  tools: string[];
  careerPaths: string[];
}

export const AUTOMOTIVE_SKILLS: AutomotiveSkill[] = [
  // Vehicle Maintenance
  {
    id: 'oil-change',
    name: 'Oil Change & Fluid Services',
    slug: 'oil-change',
    category: 'Vehicle Maintenance',
    description: 'Essential vehicle maintenance including oil changes, filter replacements, and fluid top-ups.',
    longDescription: 'Oil change and fluid services are fundamental maintenance procedures that keep vehicles running smoothly. This skill covers different types of engine oils, oil filters, transmission fluids, coolant, brake fluid, and power steering fluid. Understanding manufacturer specifications and service intervals is crucial for preventing costly repairs.',
    icon: '🛢️',
    iconColor: '#FFD700',
    tags: ['maintenance', 'oil', 'filters', 'fluids', 'preventive'],
    difficulty: 1,
    salaryRange: { junior: 28000, mid: 38000, senior: 50000, lead: 65000 },
    demandIndex: 95,
    timeToMaster: '1-2 weeks',
    certifications: ['ASE A1', 'Basic Oil Change Certificate'],
    relatedSkills: ['Vehicle Inspection', 'Basic Mechanics', 'Tool Usage'],
    tools: ['Oil drain pan', 'Funnel', 'Socket set', 'Oil filter wrench', 'Torque wrench'],
    careerPaths: ['Mechanic', 'Service Technician', 'Fleet Manager']
  },
  {
    id: 'brake-service',
    name: 'Brake System Service',
    slug: 'brake-service',
    category: 'Vehicle Maintenance',
    description: 'Diagnosis, repair, and replacement of brake system components.',
    longDescription: 'Brake system service involves working with disc brakes, drum brakes, anti-lock braking systems (ABS), and electronic stability control. This includes pad replacement, rotor resurfacing or replacement, brake fluid flush, and ABS sensor maintenance. Safety-critical knowledge that every automotive professional must master.',
    icon: '🛑',
    iconColor: '#DC143C',
    tags: ['brakes', 'safety', 'ABS', 'rotors', 'pads', 'hydraulics'],
    difficulty: 2,
    salaryRange: { junior: 32000, mid: 45000, senior: 60000, lead: 80000 },
    demandIndex: 92,
    timeToMaster: '2-4 weeks',
    certifications: ['ASE A5', 'Brake Systems Certificate'],
    relatedSkills: ['Hydraulic Systems', 'ABS Diagnostics', 'Wheel Alignment'],
    tools: ['Brake caliper tool', 'C-clamp', 'Torque wrench', 'Brake cleaner', 'Bleeder kit'],
    careerPaths: ['Mechanic', 'Brake Specialist', 'Master Technician']
  },
  {
    id: 'tire-service',
    name: 'Tire Service & Wheel Alignment',
    slug: 'tire-service',
    category: 'Vehicle Maintenance',
    description: 'Tire installation, balancing, rotation, and wheel alignment services.',
    longDescription: 'Tire service encompasses tire mounting, balancing, rotation patterns, and pressure monitoring. Wheel alignment involves adjusting camber, caster, and toe angles to ensure proper vehicle handling and tire wear. Understanding suspension geometry and its relationship to alignment is essential.',
    icon: '🍩',
    iconColor: '#2F4F4F',
    tags: ['tires', 'wheels', 'alignment', 'balancing', 'suspension'],
    difficulty: 2,
    salaryRange: { junior: 30000, mid: 42000, senior: 55000, lead: 70000 },
    demandIndex: 88,
    timeToMaster: '2-3 weeks',
    certifications: ['ASE A4', 'Alignment Specialist'],
    relatedSkills: ['Suspension Basics', 'Wheel Balancing', 'Vehicle Dynamics'],
    tools: ['Tire machine', 'Balancer', 'Alignment machine', 'Torque wrench', 'Tire pressure gauge'],
    careerPaths: ['Tire Technician', 'Alignment Specialist', 'Shop Foreman']
  },
  {
    id: 'battery-service',
    name: 'Battery & Charging System Service',
    slug: 'battery-service',
    category: 'Vehicle Maintenance',
    description: 'Battery testing, replacement, and charging system diagnostics.',
    longDescription: 'Battery and charging system service covers battery types, testing procedures, maintenance, and replacement. Includes alternator and starter testing, voltage regulation, and electrical system troubleshooting. Modern vehicles have increasingly complex electrical systems requiring specialized knowledge.',
    icon: '🔋',
    iconColor: '#32CD32',
    tags: ['battery', 'charging', 'electrical', 'alternator', 'starter', 'voltage'],
    difficulty: 2,
    salaryRange: { junior: 30000, mid: 42000, senior: 55000, lead: 70000 },
    demandIndex: 85,
    timeToMaster: '1-2 weeks',
    certifications: ['ASE A6', 'Electrical Systems Certificate'],
    relatedSkills: ['Electrical Diagnostics', 'Multimeter Usage', 'CAN Bus Basics'],
    tools: ['Battery tester', 'Multimeter', 'Hydrometer', 'Battery charger', 'Terminal puller'],
    careerPaths: ['Electrical Specialist', 'Diagnostician', 'Master Technician']
  },

  // Automotive Diagnostics
  {
    id: 'obd-diagnostics',
    name: 'OBD-II Diagnostics',
    slug: 'obd-diagnostics',
    category: 'Automotive Diagnostics',
    description: 'Reading and interpreting On-Board Diagnostic codes and live data.',
    longDescription: 'OBD-II diagnostics involves connecting to the vehicle\'s computer system to retrieve diagnostic trouble codes (DTCs), view live data streams, and perform active tests. Understanding the OBD-II standard, code categories (P, B, C, U codes), and freeze frame data is essential for modern diagnostics.',
    icon: '📊',
    iconColor: '#00CED1',
    tags: ['OBD', 'diagnostics', 'DTC', 'scanner', 'live data', 'sensor'],
    difficulty: 2,
    salaryRange: { junior: 35000, mid: 50000, senior: 70000, lead: 90000 },
    demandIndex: 94,
    timeToMaster: '2-4 weeks',
    certifications: ['ASE L1', 'Automotive Diagnostics Certificate'],
    relatedSkills: ['Sensor Systems', 'Emissions Testing', 'CAN Bus'],
    tools: ['OBD-II scanner', 'Multimeter', 'Logic probe', 'Scan tool software'],
    careerPaths: ['Diagnostic Technician', 'Shop Foreman', 'Technical Trainer']
  },
  {
    id: 'scan-tool-mastery',
    name: 'Advanced Scan Tool Mastery',
    slug: 'scan-tool-mastery',
    category: 'Automotive Diagnostics',
    description: 'Using manufacturer-specific scan tools for deep vehicle diagnostics.',
    longDescription: 'Advanced scan tool mastery goes beyond generic OBD-II readers to use manufacturer-specific diagnostic platforms like BMW ISTA, Mercedes XENTRY, Ford IDS, and others. Includes bi-directional control, programming, and configuration functions for ECUs, modules, and control units.',
    icon: '💻',
    iconColor: '#4169E1',
    tags: ['scan tool', 'manufacturer', 'programming', 'ECU', 'bi-directional', 'modules'],
    difficulty: 4,
    salaryRange: { junior: 45000, mid: 70000, senior: 100000, lead: 130000 },
    demandIndex: 78,
    timeToMaster: '6-12 months',
    certifications: ['ASE L1', 'L2', 'Manufacturer Specific Training'],
    relatedSkills: ['OBD-II', 'Network Protocols', 'Vehicle Architecture'],
    tools: ['OEM scan tools', 'J2534 device', 'Laptop', 'Manufacturer software'],
    careerPaths: ['Diagnostic Specialist', 'Technical Advisor', 'Master Technician']
  },
  {
    id: 'noise-vibration-diagnosis',
    name: 'Noise, Vibration & Harshness (NVH)',
    slug: 'nvh-diagnosis',
    category: 'Automotive Diagnostics',
    description: 'Diagnosing and resolving noise, vibration, and harshness issues.',
    longDescription: 'NVH diagnosis involves identifying sources of unwanted noise, vibration, and harshness in vehicles. Uses specialized equipment like vibration analyzers, stethoscopes, and test drives to pinpoint issues in engine, drivetrain, suspension, body, and interior components.',
    icon: '🎧',
    iconColor: '#9932CC',
    tags: ['NVH', 'vibration', 'noise', 'diagnostics', 'acoustic', 'isolation'],
    difficulty: 4,
    salaryRange: { junior: 40000, mid: 60000, senior: 85000, lead: 110000 },
    demandIndex: 72,
    timeToMaster: '3-6 months',
    certifications: ['ASE M1', 'NVH Specialist'],
    relatedSkills: ['Suspension', 'Drivetrain', 'Engine Mounts', 'Body Components'],
    tools: ['Vibration analyzer', 'Stethoscope', 'Chassis ear', 'Road force balancer'],
    careerPaths: ['NVH Specialist', 'Diagnostic Technician', 'Quality Engineer']
  },

  // Engine Systems
  {
    id: 'engine-repair',
    name: 'Engine Repair & Rebuild',
    slug: 'engine-repair',
    category: 'Engine Systems',
    description: 'Disassembly, inspection, and reassembly of automotive engines.',
    longDescription: 'Engine repair encompasses cylinder head work, block machining, crankshaft rebuilding, and bottom-end assembly. Includes measuring engine components, determining wear limits, selecting proper clearances, and using machine shop equipment. High-skill area requiring precision and attention to detail.',
    icon: '⚙️',
    iconColor: '#FF4500',
    tags: ['engine', 'rebuild', 'machining', 'cylinder head', 'crankshaft', 'pistons'],
    difficulty: 5,
    salaryRange: { junior: 45000, mid: 70000, senior: 100000, lead: 140000 },
    demandIndex: 65,
    timeToMaster: '2-5 years',
    certifications: ['ASE A1', 'Engine Machinist Certificate'],
    relatedSkills: ['Machine Shop', 'Metrology', 'Blueprinting', 'Clearances'],
    tools: ['Micrometers', 'Dial indicators', 'Torque angles', 'Machine tools', 'Precision gauges'],
    careerPaths: ['Engine Builder', 'Machine Shop Operator', 'Master Technician']
  },
  {
    id: 'fuel-system',
    name: 'Fuel System Service',
    slug: 'fuel-system',
    category: 'Engine Systems',
    description: 'Diagnosis and repair of fuel injection and emissions systems.',
    longDescription: 'Fuel system service covers fuel pumps, injectors, pressure regulators, and emission control components. Includes cleaning fuel injectors, testing fuel pump operation, and diagnosing fuel delivery issues. Understanding different injection systems (MPI, GDI, diesel) is essential.',
    icon: '⛽',
    iconColor: '#FF8C00',
    tags: ['fuel', 'injection', 'injectors', 'pump', 'emissions', 'GDI'],
    difficulty: 3,
    salaryRange: { junior: 35000, mid: 50000, senior: 70000, lead: 90000 },
    demandIndex: 82,
    timeToMaster: '2-3 months',
    certifications: ['ASE A8', 'Emissions Certificate'],
    relatedSkills: ['OBD-II', 'Sensors', 'Emissions', 'Engine Management'],
    tools: ['Fuel pressure gauge', 'Noid light', 'Scan tool', 'Injector cleaner', 'Fuel injector tester'],
    careerPaths: ['Fuel System Specialist', 'Diagnostic Technician', 'Emissions Tech']
  },
  {
    id: 'cooling-system',
    name: 'Cooling System Service',
    slug: 'cooling-system',
    category: 'Engine Systems',
    description: 'Maintenance and repair of engine cooling systems.',
    longDescription: 'Cooling system service includes radiator replacement, water pump service, thermostat replacement, and coolant flushes. Understanding coolant types, proper mixing ratios, and system bleeding procedures prevents engine overheating and damage.',
    icon: '🌡️',
    iconColor: '#00BFFF',
    tags: ['cooling', 'radiator', 'water pump', 'thermostat', 'coolant', 'heater'],
    difficulty: 2,
    salaryRange: { junior: 30000, mid: 42000, senior: 55000, lead: 70000 },
    demandIndex: 80,
    timeToMaster: '1-2 weeks',
    certifications: ['ASE A1', 'Cooling System Certificate'],
    relatedSkills: ['Hoses', 'Belts', 'Heater Systems', 'Temperature Sensors'],
    tools: ['Coolant tester', 'Funnel', 'Socket set', 'Hose clamp tool', 'Thermostat gasket scraper'],
    careerPaths: ['Radiator Specialist', 'General Mechanic', 'Service Technician']
  },

  // Electrical Systems
  {
    id: 'automotive-electrical',
    name: 'Automotive Electrical Systems',
    slug: 'automotive-electrical',
    category: 'Electrical Systems',
    description: 'Comprehensive automotive electrical system diagnosis and repair.',
    longDescription: 'Automotive electrical systems cover starting, charging, lighting, accessories, and body electronics. Includes circuit analysis, wire repair, connector service, and using wiring diagrams. Modern vehicles have extensive electrical content requiring strong diagnostic skills.',
    icon: '⚡',
    iconColor: '#FFD700',
    tags: ['electrical', 'circuits', 'wiring', 'lighting', 'accessories', 'sensors'],
    difficulty: 3,
    salaryRange: { junior: 35000, mid: 50000, senior: 70000, lead: 90000 },
    demandIndex: 90,
    timeToMaster: '3-6 months',
    certifications: ['ASE A6', 'Electrical Systems Certificate'],
    relatedSkills: ['OBD-II', 'Multimeter', 'Wiring Diagrams', 'Soldering'],
    tools: ['Multimeter', 'Test lights', 'Circuit tester', 'Soldering iron', 'Wire stripper'],
    careerPaths: ['Electrical Specialist', 'Diagnostic Technician', 'Master Technician']
  },
  {
    id: 'can-lin-networks',
    name: 'CAN & LIN Network Diagnostics',
    slug: 'can-lin-networks',
    category: 'Electrical Systems',
    description: 'Diagnosing and troubleshooting vehicle network communication systems.',
    longDescription: 'CAN (Controller Area Network) and LIN (Local Interconnect Network) are vehicle communication protocols. Understanding network topology, message formats, and fault isolation is critical for modern vehicle diagnostics. Includes using oscilloscopes and network analyzers.',
    icon: '🌐',
    iconColor: '#32CD32',
    tags: ['CAN', 'LIN', 'network', 'communication', 'bus', 'protocol', 'oscilloscope'],
    difficulty: 4,
    salaryRange: { junior: 45000, mid: 70000, senior: 100000, lead: 130000 },
    demandIndex: 75,
    timeToMaster: '6-12 months',
    certifications: ['ASE L1', 'Network Specialist'],
    relatedSkills: ['OBD-II', 'Digital Electronics', 'Data Communication', 'Oscilloscope'],
    tools: ['Oscilloscope', 'CAN analyzer', 'Breakout box', 'Multimeter', 'Scan tool'],
    careerPaths: ['Network Specialist', 'Diagnostic Technician', 'Electrical Engineer']
  },
  {
    id: 'body-electronics',
    name: 'Body & Comfort Systems',
    slug: 'body-electronics',
    category: 'Electrical Systems',
    description: 'Power windows, locks, seats, climate control, and infotainment systems.',
    longDescription: 'Body electronics encompass power accessories, climate control, infotainment, and comfort systems. Includes diagnosing switches, motors, relays, and control modules. Integration with vehicle networks requires understanding of system architecture.',
    icon: '🚗',
    iconColor: '#6B8E23',
    tags: ['power accessories', 'seats', 'climate', 'infotainment', 'comfort', 'body control'],
    difficulty: 3,
    salaryRange: { junior: 35000, mid: 50000, senior: 70000, lead: 90000 },
    demandIndex: 78,
    timeToMaster: '2-4 months',
    certifications: ['ASE A6', 'HVAC Certificate'],
    relatedSkills: ['Electrical', 'CAN Networks', 'HVAC Fundamentals'],
    tools: ['Multimeter', 'Scan tool', 'Circuit diagrams', 'Relay puller', 'Screwdriver set'],
    careerPaths: ['Electrical Specialist', 'HVAC Technician', 'Infotainment Specialist']
  },

  // Chassis & Suspension
  {
    id: 'suspension-repair',
    name: 'Suspension System Repair',
    slug: 'suspension-repair',
    category: 'Chassis & Suspension',
    description: 'Repair and replacement of suspension components.',
    longDescription: 'Suspension repair covers struts, shocks, springs, control arms, bushings, and related components. Includes ride height adjustment, component inspection, and steering geometry understanding. Critical for vehicle handling and tire wear.',
    icon: '🔧',
    iconColor: '#4682B4',
    tags: ['suspension', 'struts', 'shocks', 'springs', 'control arms', 'bushings'],
    difficulty: 3,
    salaryRange: { junior: 35000, mid: 48000, senior: 65000, lead: 85000 },
    demandIndex: 85,
    timeToMaster: '2-3 months',
    certifications: ['ASE M1', 'Suspension Certificate'],
    relatedSkills: ['Wheel Alignment', 'Tires', 'Steering', 'Brakes'],
    tools: ['Spring compressor', 'Ball joint separator', 'Torque wrench', 'Pry bars', 'Floor jack'],
    careerPaths: ['Suspension Specialist', 'Steering & Suspension Tech', 'Shop Foreman']
  },
  {
    id: 'steering-repair',
    name: 'Steering System Repair',
    slug: 'steering-repair',
    category: 'Chassis & Suspension',
    description: 'Repair of power steering and steering components.',
    longDescription: 'Steering system repair includes rack-and-pinion, steering gear, power steering pump, and tie rod service. Covers both hydraulic and electric power steering systems. Understanding steering geometry and its relationship to suspension is essential.',
    icon: '🎮',
    iconColor: '#DC143C',
    tags: ['steering', 'rack', 'pinion', 'power steering', 'tie rods', 'EPS'],
    difficulty: 3,
    salaryRange: { junior: 38000, mid: 52000, senior: 70000, lead: 90000 },
    demandIndex: 80,
    timeToMaster: '2-4 months',
    certifications: ['ASE M1', 'Steering Certificate'],
    relatedSkills: ['Suspension', 'Alignment', 'Electrical (for EPS)'],
    tools: ['Tie rod puller', 'Steering rack boots', 'Pressure gauge', 'Torque wrench'],
    careerPaths: ['Steering Specialist', 'Chassis Technician', 'Master Technician']
  },

  // Transmission & Drivetrain
  {
    id: 'transmission-repair',
    name: 'Transmission Repair',
    slug: 'transmission-repair',
    category: 'Transmission & Drivetrain',
    description: 'Diagnosis and repair of automatic and manual transmissions.',
    longDescription: 'Transmission repair covers automatic, manual, CVT, and dual-clutch transmissions. Includes clutch replacement, band adjustment, valve body service, and transmission rebuild. Highly specialized skill with strong earning potential.',
    icon: '🔄',
    iconColor: '#9932CC',
    tags: ['transmission', 'automatic', 'manual', 'CVT', 'DCT', 'clutch', 'drivetrain'],
    difficulty: 5,
    salaryRange: { junior: 45000, mid: 70000, senior: 100000, lead: 150000 },
    demandIndex: 70,
    timeToMaster: '2-5 years',
    certifications: ['ASE A2', 'Transmission Certificate'],
    relatedSkills: ['Engine Repair', 'Drivetrain', 'Hydraulics'],
    tools: ['Transmission jack', 'Clutch alignment tool', 'Snap ring pliers', 'Pressure gauge'],
    careerPaths: ['Transmission Specialist', 'Rebuilder', 'Master Technician']
  },
  {
    id: 'drivetrain-service',
    name: 'Drivetrain & Differential Service',
    slug: 'drivetrain-service',
    category: 'Transmission & Drivetrain',
    description: 'Service and repair of drivetrain components and differentials.',
    longDescription: 'Drivetrain service covers CV joints, driveshafts, differentials, and transfer cases. Includes fluid changes, bearing replacement, and gear setup. Four-wheel-drive systems require additional knowledge of locking differentials and traction control.',
    icon: '🔗',
    iconColor: '#DAA520',
    tags: ['drivetrain', 'differential', 'CV joint', 'driveshaft', '4WD', 'AWD'],
    difficulty: 3,
    salaryRange: { junior: 38000, mid: 55000, senior: 75000, lead: 100000 },
    demandIndex: 75,
    timeToMaster: '3-6 months',
    certifications: ['ASE A3', 'Drivetrain Certificate'],
    relatedSkills: ['Transmission', 'Suspension', '4WD Systems'],
    tools: ['Differential bearing puller', 'Seal driver', 'Axle socket', 'Torque wrench'],
    careerPaths: ['Drivetrain Specialist', '4WD Technician', 'Master Technician']
  },

  // Body & Paint
  {
    id: 'auto-body-repair',
    name: 'Auto Body Repair',
    slug: 'auto-body-repair',
    category: 'Body & Paint',
    description: 'Collision repair and structural damage correction.',
    longDescription: 'Auto body repair involves metal straightening, panel replacement, and structural repair. Includes using measuring systems, frame machines, and welding equipment. Understanding of vehicle construction (unibody vs body-on-frame) is essential.',
    icon: '🔨',
    iconColor: '#708090',
    tags: ['body', 'collision', 'repair', 'structural', 'welding', 'panels'],
    difficulty: 4,
    salaryRange: { junior: 35000, mid: 55000, senior: 80000, lead: 120000 },
    demandIndex: 75,
    timeToMaster: '1-3 years',
    certifications: ['ASE B2', 'ICAR Certification', 'Welding Certificate'],
    relatedSkills: ['Welding', 'Painting', 'Dent Removal', 'Frame Straightening'],
    tools: ['Frame machine', 'Measuring system', 'Welder', 'Pulling tools', 'Body filler'],
    careerPaths: ['Body Technician', 'Collision Repair Specialist', 'Body Shop Manager']
  },
  {
    id: 'auto-painting',
    name: 'Automotive Painting',
    slug: 'auto-painting',
    category: 'Body & Paint',
    description: 'Professional automotive painting and finishing.',
    longDescription: 'Automotive painting includes surface preparation, priming, basecoat application, and clearcoat finishing. Understanding paint chemistry, spray gun operation, and booth environment is crucial. Includes color matching and blending techniques.',
    icon: '🎨',
    iconColor: '#FF69B4',
    tags: ['paint', 'painting', 'finishing', 'basecoat', 'clearcoat', 'color matching'],
    difficulty: 4,
    salaryRange: { junior: 35000, mid: 55000, senior: 80000, lead: 110000 },
    demandIndex: 72,
    timeToMaster: '1-3 years',
    certifications: ['ASE B3', 'Paint Training Certificate'],
    relatedSkills: ['Body Repair', 'Surface Prep', 'Paint Chemistry'],
    tools: ['Spray gun', 'Paint booth', 'Sandpaper', 'Masking materials', 'Mixing scale'],
    careerPaths: ['Painter', 'Paint Technician', 'Color Matcher']
  },
  {
    id: 'glass-service',
    name: 'Automotive Glass Service',
    slug: 'glass-service',
    category: 'Body & Paint',
    description: 'Windshield and glass replacement and repair.',
    longDescription: 'Automotive glass service covers windshield replacement, side window repair, and ADAS calibration. Modern vehicles require camera and sensor calibration after glass replacement due to advanced driver assistance systems.',
    icon: '🪟',
    iconColor: '#87CEEB',
    tags: ['glass', 'windshield', 'windows', 'ADAD calibration', 'urethane', 'safety'],
    difficulty: 2,
    salaryRange: { junior: 32000, mid: 45000, senior: 60000, lead: 80000 },
    demandIndex: 78,
    timeToMaster: '2-4 weeks',
    certifications: ['Auto Glass Safety Certificate', 'ADAS Calibration'],
    relatedSkills: ['Body Repair', 'Electrical', 'Calibration Procedures'],
    tools: ['Glass removal tool', 'Urethane applicator', 'Priming gun', 'Calibration equipment'],
    careerPaths: ['Glass Technician', 'Auto Glass Installer', 'ADAS Calibration Specialist']
  },

  // Automotive Technology
  {
    id: 'adas-calibration',
    name: 'ADAS Calibration',
    slug: 'adas-calibration',
    category: 'Automotive Technology',
    description: 'Calibration of Advanced Driver Assistance Systems after repairs.',
    longDescription: 'ADAS calibration involves aligning and calibrating cameras, radar, and sensors after windshield replacement, alignment, or suspension work. Includes static and dynamic calibration procedures using manufacturer-specific equipment and targets.',
    icon: '📷',
    iconColor: '#00CED1',
    tags: ['ADAS', 'calibration', 'cameras', 'radar', 'sensors', 'lane assist', 'cruise'],
    difficulty: 4,
    salaryRange: { junior: 45000, mid: 70000, senior: 100000, lead: 130000 },
    demandIndex: 85,
    timeToMaster: '3-6 months',
    certifications: ['ADAS Calibration Certificate', 'Manufacturer Training'],
    relatedSkills: ['Scan Tool Mastery', 'Alignment', 'Glass Service', 'Electrical'],
    tools: ['Calibration targets', 'Scan tool', 'Wheel alignment sensors', 'Floor markings'],
    careerPaths: ['ADAS Calibration Specialist', 'Diagnostic Technician', 'Technical Advisor']
  },
  {
    id: 'key-programming',
    name: 'Key Programming & Immobilizer',
    slug: 'key-programming',
    category: 'Automotive Technology',
    description: 'Programming vehicle keys, fobs, and immobilizer systems.',
    longDescription: 'Key programming involves adding, replacing, or deleting keys and fobs for vehicles. Includes understanding immobilizer systems, transponder chips, and smart key functionality. Requires access to manufacturer-specific programming equipment.',
    icon: '🔑',
    iconColor: '#FFD700',
    tags: ['keys', 'programming', 'immobilizer', 'transponder', 'fob', 'security'],
    difficulty: 3,
    salaryRange: { junior: 40000, mid: 60000, senior: 85000, lead: 110000 },
    demandIndex: 80,
    timeToMaster: '2-4 months',
    certifications: ['Locksmith License', 'Key Programming Certificate'],
    relatedSkills: ['Electrical', 'Scan Tool Mastery', 'Security Systems'],
    tools: ['Key programmer', 'Lock pick set', 'Transponder reader', 'Scan tool'],
    careerPaths: ['Key Specialist', 'Locksmith', 'Security Technician']
  },

  // Performance Tuning
  {
    id: 'engine-tuning',
    name: 'Engine Performance Tuning',
    slug: 'engine-tuning',
    category: 'Performance Tuning',
    description: 'Modifying and tuning engines for enhanced performance.',
    longDescription: 'Engine performance tuning involves modifying air intake, exhaust, fuel delivery, and ignition systems. Includes ECU tuning, dyno testing, and performance optimization. Requires deep understanding of engine dynamics and combustion theory.',
    icon: '🔥',
    iconColor: '#FF4500',
    tags: ['tuning', 'performance', 'ECU', 'dyno', 'horsepower', 'boost', 'nitrous'],
    difficulty: 5,
    salaryRange: { junior: 50000, mid: 80000, senior: 120000, lead: 180000 },
    demandIndex: 60,
    timeToMaster: '3-5 years',
    certifications: ['EFI Tuning Certificate', 'Dyno Operator'],
    relatedSkills: ['Engine Repair', 'Fuel Systems', 'Electronics', 'Engine Building'],
    tools: ['Dyno', 'Wideband O2', 'Tuning software', 'Boost controller', 'Nitrous kit'],
    careerPaths: ['Tuner', 'Performance Shop Owner', 'Engine Builder']
  },
  {
    id: 'suspension-tuning',
    name: 'Performance Suspension Tuning',
    slug: 'suspension-tuning',
    category: 'Performance Tuning',
    description: 'Setting up suspension for motorsports and performance driving.',
    longDescription: 'Performance suspension tuning involves adjusting damping, spring rates, and alignment for track or performance use. Includes corner balancing, bump steer adjustment, and setup optimization using data acquisition.',
    icon: '🏎️',
    iconColor: '#FF0000',
    tags: ['suspension', 'tuning', 'motorsports', 'damping', 'corner balance', 'setup'],
    difficulty: 4,
    salaryRange: { junior: 45000, mid: 70000, senior: 100000, lead: 140000 },
    demandIndex: 55,
    timeToMaster: '2-4 years',
    certifications: ['Suspension Tuning Certificate', 'Motorsports Experience'],
    relatedSkills: ['Suspension Repair', 'Wheel Alignment', 'Data Acquisition'],
    tools: ['Corner weight scale', 'Damping tester', 'Setup tools', 'Data logger'],
    careerPaths: ['Suspension Tuner', 'Race Engineer', 'Performance Shop Tech']
  },

  // Electric Vehicles
  {
    id: 'ev-systems',
    name: 'Electric Vehicle Systems',
    slug: 'ev-systems',
    category: 'Electric Vehicles',
    description: 'High-voltage battery and electric motor systems for EVs.',
    longDescription: 'EV systems cover high-voltage battery packs, electric motors, inverters, and charging systems. Requires understanding of high-voltage safety, battery chemistry, and regenerative braking. Growing skill area as EV adoption increases.',
    icon: '🔌',
    iconColor: '#00FF7F',
    tags: ['EV', 'electric', 'battery', 'motor', 'high voltage', 'charging', 'hybrid'],
    difficulty: 4,
    salaryRange: { junior: 50000, mid: 80000, senior: 120000, lead: 160000 },
    demandIndex: 90,
    timeToMaster: '6-12 months',
    certifications: ['EV Safety Certificate', 'High Voltage Certification'],
    relatedSkills: ['Electrical', 'Battery Systems', 'Charging Infrastructure', 'CAN Networks'],
    tools: ['HV tester', 'Insulated tools', 'Battery analyzer', 'Charger', 'Scan tool'],
    careerPaths: ['EV Technician', 'Battery Specialist', 'EV Shop Manager']
  },
  {
    id: 'ev-battery-service',
    name: 'EV Battery Service',
    slug: 'ev-battery-service',
    category: 'Electric Vehicles',
    description: 'Battery pack diagnosis, module replacement, and thermal management.',
    longDescription: 'EV battery service involves diagnosing cell issues, module replacement, and thermal management system service. Requires specialized training in high-voltage safety and battery chemistry. Critical skill for EV maintenance.',
    icon: '��',
    iconColor: '#32CD32',
    tags: ['EV', 'battery', 'cells', 'modules', 'thermal', 'BMS', 'recycling'],
    difficulty: 5,
    salaryRange: { junior: 55000, mid: 90000, senior: 140000, lead: 200000 },
    demandIndex: 85,
    timeToMaster: '1-2 years',
    certifications: ['HV Battery Certificate', 'Battery Safety'],
    relatedSkills: ['EV Systems', 'Electrical', 'Thermal Systems', 'Data Analysis'],
    tools: ['Battery analyzer', 'HV insulation tester', 'Module balancer', 'Thermal imaging'],
    careerPaths: ['Battery Specialist', 'EV Master Technician', 'Battery Engineer']
  },
  {
    id: 'ev-charging',
    name: 'EV Charging Systems',
    slug: 'ev-charging',
    category: 'Electric Vehicles',
    description: 'Installation, service, and troubleshooting of EV charging equipment.',
    longDescription: 'EV charging systems cover Level 1, Level 2, and DC fast charging equipment. Includes home charger installation, public charging station service, and troubleshooting charging issues. Requires electrical certification.',
    icon: '⚡',
    iconColor: '#00CED1',
    tags: ['charging', 'EVSE', 'Level 2', 'DC fast', 'installation', 'grid'],
    difficulty: 3,
    salaryRange: { junior: 45000, mid: 70000, senior: 100000, lead: 130000 },
    demandIndex: 88,
    timeToMaster: '3-6 months',
    certifications: ['Electrical License', 'EVSE Training'],
    relatedSkills: ['Electrical', 'EV Systems', 'Power Systems'],
    tools: ['EV charger tester', 'Multimeter', 'Wire trace', 'Installation tools'],
    careerPaths: ['EV Charger Installer', 'Charging Station Technician', 'EV Infrastructure Tech']
  },

  // Hybrid Systems
  {
    id: 'hybrid-systems',
    name: 'Hybrid Vehicle Systems',
    slug: 'hybrid-systems',
    category: 'Hybrid Systems',
    description: 'Integrated gasoline-electric hybrid powertrain systems.',
    longDescription: 'Hybrid systems combine internal combustion engines with electric motors and batteries. Includes regenerative braking, power splitting devices, and hybrid-specific maintenance. Understanding how systems interact is critical.',
    icon: '🔄',
    iconColor: '#9370DB',
    tags: ['hybrid', 'HEV', 'electric motor', 'regenerative braking', 'power split', 'mild hybrid'],
    difficulty: 4,
    salaryRange: { junior: 50000, mid: 80000, senior: 120000, lead: 150000 },
    demandIndex: 85,
    timeToMaster: '6-12 months',
    certifications: ['Hybrid Safety Certificate', 'Manufacturer Training'],
    relatedSkills: ['Engine Systems', 'EV Systems', 'Brake Systems', 'Electrical'],
    tools: ['HV tester', 'Scan tool', 'Battery analyzer', 'Brake fluid tester'],
    careerPaths: ['Hybrid Technician', 'Master Technician', 'Technical Trainer']
  },

  // Commercial Vehicles
  {
    id: 'commercial-vehicle-service',
    name: 'Commercial Vehicle Service',
    slug: 'commercial-vehicle',
    category: 'Commercial Vehicles',
    description: 'Service and repair of trucks, buses, and commercial vehicles.',
    longDescription: 'Commercial vehicle service covers heavy-duty trucks, buses, and vocational vehicles. Includes diesel engines, air brake systems, and DOT inspections. Requires different tools and procedures than passenger vehicles.',
    icon: '🚛',
    iconColor: '#8B4513',
    tags: ['truck', 'commercial', 'heavy-duty', 'diesel', 'fleet', 'DOT'],
    difficulty: 4,
    salaryRange: { junior: 40000, mid: 60000, senior: 85000, lead: 120000 },
    demandIndex: 82,
    timeToMaster: '1-2 years',
    certifications: ['ASE T Series', 'CDL', 'DOT Inspector'],
    relatedSkills: ['Diesel Engines', 'Air Brakes', 'HVAC', 'Electrical'],
    tools: ['Heavy-duty lift', 'Air tools', 'Diesel scanner', 'Wheel dolly'],
    careerPaths: ['Truck Technician', 'Fleet Mechanic', 'Shop Manager']
  },
  {
    id: 'diesel-systems',
    name: 'Diesel Engine Systems',
    slug: 'diesel-systems',
    category: 'Commercial Vehicles',
    description: 'Diagnosis and repair of diesel engines.',
    longDescription: 'Diesel engine systems cover fuel injection, turbochargers, emission systems (SCR, DPF), and aftertreatment. Modern diesels use complex electronic controls requiring specialized diagnostics.',
    icon: '🚚',
    iconColor: '#CD853F',
    tags: ['diesel', 'turbo', 'injectors', 'SCR', 'DPF', 'emissions', 'heavy-duty'],
    difficulty: 4,
    salaryRange: { junior: 45000, mid: 70000, senior: 100000, lead: 140000 },
    demandIndex: 80,
    timeToMaster: '1-2 years',
    certifications: ['ASE T2-T8', 'Diesel Certification'],
    relatedSkills: ['Fuel Systems', 'Engine Repair', 'Emissions', 'Turbochargers'],
    tools: ['Diesel scan tool', 'Compression tester', 'Injector tester', 'Pyrometer'],
    careerPaths: ['Diesel Technician', 'Truck Mechanic', 'Diesel Engine Specialist']
  },

  // Motorcycles
  {
    id: 'motorcycle-service',
    name: 'Motorcycle Service',
    slug: 'motorcycle-service',
    category: 'Motorcycles',
    description: 'Maintenance and repair of motorcycles and ATVs.',
    longDescription: ' motorcycle service covers typical maintenance, engine work, suspension, and electrical systems specific to motorcycles. Includes clutch adjustment, chain maintenance, and carburetor/EFI service.',
    icon: '🏍️',
    iconColor: '#FF6347',
    tags: ['motorcycle', 'ATV', 'scooter', 'motorbike', 'street', 'dirt bike'],
    difficulty: 3,
    salaryRange: { junior: 32000, mid: 48000, senior: 70000, lead: 100000 },
    demandIndex: 70,
    timeToMaster: '1-2 years',
    certifications: ['Motorcycle Safety Foundation', 'Manufacturer Training'],
    relatedSkills: ['Engine Repair', 'Electrical', 'Suspension', 'Chassis'],
    tools: ['Motorcycle lift', 'Chain breaker', 'Carb tuner', 'Specialty sockets'],
    careerPaths: ['Motorcycle Technician', 'Rider Coach', 'Shop Owner']
  },

  // Heavy Machinery
  {
    id: 'heavy-equipment',
    name: 'Heavy Equipment Service',
    slug: 'heavy-equipment',
    category: 'Heavy Machinery',
    description: 'Service and repair of construction and agricultural equipment.',
    longDescription: 'Heavy equipment service covers excavators, loaders, dozers, and agricultural machinery. Includes hydraulic systems, undercarriage, and power train. Often involves field service and welding.',
    icon: '🚜',
    iconColor: '#FF8C00',
    tags: ['heavy equipment', 'construction', 'agricultural', 'hydraulics', 'excavator', 'loader'],
    difficulty: 4,
    salaryRange: { junior: 42000, mid: 65000, senior: 95000, lead: 130000 },
    demandIndex: 78,
    timeToMaster: '2-4 years',
    certifications: ['ASE H Series', 'Hydraulics Certificate', 'Welding'],
    relatedSkills: ['Hydraulics', 'Diesel Engines', 'Welding', 'Electrical'],
    tools: ['Hydraulic tester', 'Welding equipment', 'Undercarriage tools', 'Specialty lifts'],
    careerPaths: ['Heavy Equipment Technician', 'Field Service Tech', 'Equipment Mechanic']
  },
  {
    id: 'hydraulic-systems',
    name: 'Hydraulic System Service',
    slug: 'hydraulic-systems',
    category: 'Heavy Machinery',
    description: 'Diagnosis and repair of hydraulic systems.',
    longDescription: 'Hydraulic systems are found in heavy equipment, agricultural machinery, and some passenger vehicles. Covers pumps, cylinders, valves, hoses, and fluid maintenance. Includes contamination control and system flushing.',
    icon: '💧',
    iconColor: '#4169E1',
    tags: ['hydraulics', 'pumps', 'cylinders', 'valves', 'hose', 'fluid power'],
    difficulty: 3,
    salaryRange: { junior: 40000, mid: 60000, senior: 85000, lead: 120000 },
    demandIndex: 75,
    timeToMaster: '6-12 months',
    certifications: ['Hydraulics Certificate', 'Fluid Power Certificate'],
    relatedSkills: ['Heavy Equipment', 'Commercial Vehicles', 'Agriculture Machinery'],
    tools: ['Hydraulic tester', 'Flow meter', 'Pressure gauge', 'Hose crimper'],
    careerPaths: ['Hydraulic Specialist', 'Heavy Equipment Tech', 'Fluid Power Technician']
  },

  // Welding & Fabrication
  {
    id: 'welding-fabrication',
    name: 'Welding & Metal Fabrication',
    slug: 'welding-fabrication',
    category: 'Welding & Fabrication',
    description: 'Metal joining and fabrication for automotive applications.',
    longDescription: 'Welding and fabrication skills include MIG, TIG, and stick welding for automotive body and structural repairs. Covers metal cutting, bending, and shaping for custom parts and repair work. Essential for exhaust fabrication, roll cages, and collision repair.',
    icon: '🔥',
    iconColor: '#FF6B35',
    tags: ['welding', 'MIG', 'TIG', 'fabrication', 'metal', 'structural', 'exhaust', 'roll cage'],
    difficulty: 4,
    salaryRange: { junior: 35000, mid: 55000, senior: 80000, lead: 110000 },
    demandIndex: 75,
    timeToMaster: '1-3 years',
    certifications: ['AWS Certification', 'MIG/TIG Certificate', 'Structural Welding'],
    relatedSkills: ['Body Repair', 'Exhaust Systems', 'Heavy Equipment', 'Custom Fabrication'],
    tools: ['MIG welder', 'TIG welder', 'Plasma cutter', 'Metal brake', 'Hammer & dolly'],
    careerPaths: ['Welder/Fabricator', 'Exhaust Specialist', 'Race Car Fabricator', 'Collision Repair Tech']
  },
  {
    id: 'exhaust-systems',
    name: 'Exhaust System Service',
    slug: 'exhaust-systems',
    category: 'Welding & Fabrication',
    description: 'Installation, repair, and custom fabrication of exhaust systems.',
    longDescription: 'Exhaust system service covers catalytic converters, mufflers, resonators, and exhaust pipes. Includes welding, bending, and fabricating custom exhaust systems. Understanding emissions requirements and sound engineering is important.',
    icon: '💨',
    iconColor: '#708090',
    tags: ['exhaust', 'muffler', 'catalytic', 'welding', 'fabrication', 'emissions', 'performance'],
    difficulty: 3,
    salaryRange: { junior: 32000, mid: 48000, senior: 70000, lead: 95000 },
    demandIndex: 72,
    timeToMaster: '6-12 months',
    certifications: ['Emissions Certificate', 'Welding Certification'],
    relatedSkills: ['Welding & Fabrication', 'Emissions & Environmental', 'Engine Systems'],
    tools: ['Pipe bender', 'Welding equipment', 'Exhaust hanger tool', 'Emissions analyzer'],
    careerPaths: ['Exhaust Technician', 'Custom Exhaust Fabricator', 'Performance Exhaust Specialist']
  },

  // HVAC & Climate Control
  {
    id: 'hvac-systems',
    name: 'HVAC & Climate Control',
    slug: 'hvac-systems',
    category: 'HVAC & Climate Control',
    description: 'Heating, ventilation, and air conditioning systems service.',
    longDescription: 'HVAC systems cover refrigerant handling, compressor service, heater cores, and climate control electronics. Includes leak detection, system recharge, and electrical diagnosis of climate control modules.',
    icon: '❄️',
    iconColor: '#00BFFF',
    tags: ['HVAC', 'A/C', 'refrigerant', 'compressor', 'heating', 'climate control', 'R-134a', 'R-1234yf'],
    difficulty: 3,
    salaryRange: { junior: 35000, mid: 52000, senior: 75000, lead: 100000 },
    demandIndex: 78,
    timeToMaster: '6-12 months',
    certifications: ['EPA 609 Certification', 'HVAC Training Certificate'],
    relatedSkills: ['Electrical', 'Refrigeration', 'Climate Control Electronics'],
    tools: ['Refrigerant recovery machine', 'Manifold gauge set', 'Leak detector', 'OBD scanner'],
    careerPaths: ['HVAC Technician', 'A/C Specialist', 'Climate Control Engineer']
  },
  {
    id: 'climate-electronics',
    name: 'Climate Control Electronics',
    slug: 'climate-electronics',
    category: 'HVAC & Climate Control',
    description: 'Electronic climate control systems and sensors.',
    longDescription: 'Climate control electronics involves diagnosing and repairing automatic temperature control systems, blend door actuators, temperature sensors, and control modules. Integration with body control systems is common in modern vehicles.',
    icon: '🌡️',
    iconColor: '#20B2AA',
    tags: ['climate control', 'electronics', 'sensors', 'actuators', 'modules', 'temperature', 'blend door'],
    difficulty: 3,
    salaryRange: { junior: 38000, mid: 58000, senior: 80000, lead: 110000 },
    demandIndex: 74,
    timeToMaster: '6-12 months',
    certifications: ['Electrical Certificate', 'Climate Control Training'],
    relatedSkills: ['HVAC Systems', 'Electrical', 'Scan Tool Mastery', 'Body Control Systems'],
    tools: ['Multimeter', 'Scan tool', 'Actuator test tool', 'Wiring diagrams'],
    careerPaths: ['Climate Control Specialist', 'Electrical Technician', 'HVAC/Electronics Tech']
  },

  // Emissions & Environmental
  {
    id: 'emissions-testing',
    name: 'Emissions Testing (STK)',
    slug: 'emissions-testing',
    category: 'Emissions & Environmental',
    description: 'Vehicle emissions testing and inspection procedures.',
    longDescription: 'Emissions testing covers OBD inspection, tailpipe emissions measurement, and visual inspections for emission control components. Includes understanding of emission standards, test equipment operation, and certification requirements for STK inspections.',
    icon: '🏭',
    iconColor: '#32CD32',
    tags: ['emissions', 'STK', 'inspection', 'OBD', 'tailpipe', 'catalytic converter', 'smog', 'clean air'],
    difficulty: 2,
    salaryRange: { junior: 30000, mid: 45000, senior: 65000, lead: 90000 },
    demandIndex: 85,
    timeToMaster: '2-4 weeks',
    certifications: ['Emissions Inspector License', 'STK Certification'],
    relatedSkills: ['Emissions Systems', 'Scan Tool Mastery', 'Visual Inspection'],
    tools: ['Emissions analyzer', 'OBD scanner', 'Smoke machine', 'Gas analyzer'],
    careerPaths: ['Emissions Inspector', 'STK Examiner', 'Environmental Compliance Tech']
  },
  {
    id: 'evap-systems',
    name: 'Evaporative Emission Systems',
    slug: 'evap-systems',
    category: 'Emissions & Environmental',
    description: 'EVAP system diagnosis and repair.',
    longDescription: 'Evaporative emission systems prevent fuel vapor escape from the fuel tank and fuel system. Covers charcoal canisters, purge valves, leak detection pumps, and related hoses. Includes smoke testing and leak detection procedures.',
    icon: '🫧',
    iconColor: '#90EE90',
    tags: ['EVAP', 'emissions', 'fuel vapor', 'charcoal canister', 'purge valve', 'leak detection', 'fuel tank'],
    difficulty: 3,
    salaryRange: { junior: 35000, mid: 52000, senior: 75000, lead: 100000 },
    demandIndex: 70,
    timeToMaster: '3-6 months',
    certifications: ['Emissions Certificate', 'EVAP System Training'],
    relatedSkills: ['Emissions Testing', 'Fuel Systems', 'Electrical', 'Scan Tool Mastery'],
    tools: ['Smoke machine', 'Nitrogen tank', 'EVAP tester', 'Scan tool', 'UV dye kit'],
    careerPaths: ['Emissions Technician', 'Diagnostic Specialist', 'EVAP System Expert']
  },
  {
    id: 'aftertreatment',
    name: 'Aftertreatment Systems',
    slug: 'aftertreatment',
    category: 'Emissions & Environmental',
    description: 'Diesel particulate filters and SCR systems.',
    longDescription: 'Aftertreatment systems include diesel particulate filters (DPF), selective catalytic reduction (SCR), and exhaust gas recirculation (EGR). Covers regeneration procedures, filter cleaning, and system diagnosis for both light and heavy-duty applications.',
    icon: '🌿',
    iconColor: '#228B22',
    tags: ['DPF', 'SCR', 'aftertreatment', 'diesel', 'particulate', 'NOx', 'DEF', 'regeneration'],
    difficulty: 4,
    salaryRange: { junior: 42000, mid: 65000, senior: 95000, lead: 130000 },
    demandIndex: 82,
    timeToMaster: '6-12 months',
    certifications: ['Diesel Emissions Certificate', 'Aftertreatment Training'],
    relatedSkills: ['Diesel Systems', 'Emissions Testing', 'Exhaust Systems', 'Scan Tool Mastery'],
    tools: ['DPF tester', 'SCR analyzer', 'Regeneration equipment', 'Diesel scan tool'],
    careerPaths: ['Aftertreatment Specialist', 'Diesel Emissions Tech', 'Heavy-Duty Emissions Expert']
  },

  // Car Audio & Security
  {
    id: 'car-audio',
    name: 'Car Audio & Infotainment',
    slug: 'car-audio',
    category: 'Car Audio & Security',
    description: 'Installation and repair of audio and infotainment systems.',
    longDescription: 'Car audio and infotainment covers head units, speakers, amplifiers, subwoofers, and navigation systems. Includes integration with factory systems, Bluetooth, and smartphone connectivity. Modern systems involve complex networking and module programming.',
    icon: '🔊',
    iconColor: '#9932CC',
    tags: ['audio', 'infotainment', 'speakers', 'amplifier', 'subwoofer', 'navigation', 'Bluetooth', 'Apple CarPlay', 'Android Auto'],
    difficulty: 2,
    salaryRange: { junior: 30000, mid: 45000, senior: 70000, lead: 100000 },
    demandIndex: 68,
    timeToMaster: '3-6 months',
    certifications: ['Car Audio Certificate', 'MECP Certification'],
    relatedSkills: ['Electrical', 'Electronics', 'Car Security', 'Networking'],
    tools: ['Oscilloscope', 'Multimeter', 'Audio test equipment', 'Soldering station', 'Wire harness tools'],
    careerPaths: ['Car Audio Installer', 'Infotainment Specialist', 'Custom Audio Fabricator', 'Mobile Electronics Tech']
  },
  {
    id: 'car-security',
    name: 'Car Security Systems',
    slug: 'car-security',
    category: 'Car Audio & Security',
    description: 'Alarm systems, GPS tracking, and anti-theft devices.',
    longDescription: 'Car security systems include alarm installations, GPS tracking devices, starter kill relays, and wheel locks. Covers both aftermarket and factory security system integration. Understanding immobilizer systems and bypass modules is essential.',
    icon: '🔒',
    iconColor: '#DC143C',
    tags: ['security', 'alarm', 'GPS', 'tracking', 'immobilizer', 'starter kill', 'theft', 'lock'],
    difficulty: 3,
    salaryRange: { junior: 32000, mid: 48000, senior: 72000, lead: 100000 },
    demandIndex: 65,
    timeToMaster: '3-6 months',
    certifications: ['Security Installation Certificate', 'Alarm Training'],
    relatedSkills: ['Electrical', 'Key Programming', 'Car Audio', 'GPS Systems'],
    tools: ['Multimeter', 'Test led', 'Soldering station', 'Wire diagram software', 'Programming equipment'],
    careerPaths: ['Security Installer', 'GPS Tracking Tech', 'Theft Prevention Specialist', 'Security System Designer']
  },
  {
    id: 'remote-start',
    name: 'Remote Start & Convenience Systems',
    slug: 'remote-start',
    category: 'Car Audio & Security',
    description: 'Remote start, keyless entry, and convenience accessories.',
    longDescription: 'Remote start and convenience systems cover aftermarket remote starters, keyless entry modules, power window systems, and heated seat controls. Includes integration with factory security and convenience features. Understanding data bus systems is increasingly important.',
    icon: '📱',
    iconColor: '#4169E1',
    tags: ['remote start', 'keyless entry', 'convenience', 'power accessories', 'smartphone control', 'module', 'data bus'],
    difficulty: 2,
    salaryRange: { junior: 30000, mid: 45000, senior: 68000, lead: 95000 },
    demandIndex: 62,
    timeToMaster: '2-4 months',
    certifications: ['Remote Start Certificate', 'Convenience System Training'],
    relatedSkills: ['Electrical', 'Car Security', 'Key Programming', 'Car Audio'],
    tools: ['Data bypass module', 'Multimeter', 'Wire harness tools', 'Test equipment'],
    careerPaths: ['Remote Start Installer', 'Convenience System Tech', 'Accessory Installation Specialist']
  }
];

// Group skills by category for UI display
export const AUTOMOTIVE_SKILLS_BY_CATEGORY = AUTOMOTIVE_SKILLS.reduce((acc, skill) => {
  if (!acc[skill.category]) {
    acc[skill.category] = [];
  }
  acc[skill.category].push(skill);
  return acc;
}, {} as Record<AutomotiveSkillCategory, AutomotiveSkill[]>);

// Export as default
export default AUTOMOTIVE_SKILLS;
