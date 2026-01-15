"use client";

import { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, Form, InputGroup, Accordion } from 'react-bootstrap';
import Link from 'next/link';

interface Tool {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: string;
    tags: string[];
}

interface ToolCategory {
    id: string;
    name: string;
    icon: string;
    description: string;
    color: string;
    tools: Tool[];
}

// AI Tools (současné)
const AI_TOOLS: Tool[] = [
    {
        id: "leania",
        name: "Leania.ai",
        description: "Audit vašeho workflow a technologického stacku. Zobrazí co ponechat, zrušit, nahradit nebo automatizovat s měřitelnými úsporami.",
        icon: "⚙️",
        category: "Produktivita",
        tags: ["Audit", "Workflow", "Automatizace"]
    },
    {
        id: "automateed",
        name: "Automateed",
        description: "Generuje ebooky, pohádky, omalovánky a deníky pomocí hlasu. Včetně obrázků a obsahu.",
        icon: "📔",
        category: "Tvorba obsahu",
        tags: ["Ebooky", "Hlas", "Generování"]
    },
    {
        id: "market-alerts",
        name: "MarketAlerts.ai",
        description: "Sleduje vaše investiční portfolio 24/7 a posílá upozornění, když AI najde insights odpovídající vašemu stylu.",
        icon: "📈",
        category: "Investice",
        tags: ["Portfolio", "AI", "Notifikace"]
    },
    {
        id: "notis",
        name: "Notis",
        description: "AI intern, který aktualizuje úkoly, kalendář, e-maily, sociální sítě, CRM přímo z WhatsApp, iMessage nebo Telegramu.",
        icon: "🚀",
        category: "Produktivita",
        tags: ["AI asistent", "Messaging", "Automatizace"]
    },
    {
        id: "hello-history",
        name: "Hello History",
        description: "Živé konverzace s Einsteinem, Kleopatrou, Buddou a dalšími historickými osobnostmi pomocí AI.",
        icon: "📜",
        category: "Vzdělávání",
        tags: ["Historie", "AI", "Konverzace"]
    },
    {
        id: "rabbit-holes",
        name: "RabbitHoles AI",
        description: "Organizuje chaty jako uzly na nekonečném plátně. Přepínejte mezi modely a znovu používejte prompty.",
        icon: "🐰",
        category: "Produktivita",
        tags: ["Organizace", "AI chat", "Prompts"]
    },
    {
        id: "color-penguin",
        name: "ColorPenguin",
        description: "Promění jakýkoli nápad v printable omalovánku. Přestaňte hledat a začněte navrhovat.",
        icon: "🐧",
        category: "Design",
        tags: ["Omalovánky", "Design", "Tisk"]
    },
    {
        id: "anam",
        name: "Anam",
        description: "Tvoří fotorealistické AI video agenty s vlastními tvářemi, hlasy a emocemi. Nasazení pomocí pár řádků kódu.",
        icon: "🎭",
        category: "Video",
        tags: ["Video AI", "Agenti", "Automatizace"]
    },
    {
        id: "deepwander",
        name: "Deepwander",
        description: "Pomáhá pochopit kořenovou příčinu zmatení nebo uvízlých pocitů. Odhaluje skryté vzorce v myšlení.",
        icon: "🧘",
        category: "Wellness",
        tags: ["Mentální zdraví", "Sebepoznání", "AI"]
    },
    {
        id: "scan-relief",
        name: "ScanRelief",
        description: "Skenuje účtenky na vašem disku, přejmenuje soubory podle data, částky a dodavatele a vygeneruje Excel report.",
        icon: "🧾",
        category: "Produktivita",
        tags: ["Účtenky", "Excel", "Automatizace"]
    },
    {
        id: "watch-my-competitor",
        name: "WatchMyCompetitor",
        description: "Sleduje cenové politiky, produktové inovace a kampaně vašich konkurentů v reálném čase. Denní ověřené insights.",
        icon: "🔎",
        category: "Business",
        tags: ["Konkurence", "Monitoring", "Analytics"]
    },
    {
        id: "remio",
        name: "Remio",
        description: "Zachytí vše, co vidíte, synchronizuje lokální soubory a nabízí neomezené nahrávky a přepisy. Nyní dostupné pro Windows.",
        icon: "👀",
        category: "Produktivita",
        tags: ["Zachycení", "Synchronizace", "Přepisy"]
    },
    {
        id: "novakit-cli",
        name: "NovaKit CLI",
        description: "AI coding agent přímo v terminálu. Multi-provider podpora, okamžité rewind a sémantické vyhledávání kódu.",
        icon: "⌨️",
        category: "Vývoj",
        tags: ["CLI", "AI Coding", "Terminal"]
    },
    {
        id: "indie-gtm",
        name: "IndieGTM",
        description: "Promění jeden nápad v 28denní content kampaň s denními videi, příspěvky a obrázky. Už nikdy nebudete váhat co publikovat.",
        icon: "📹",
        category: "Marketing",
        tags: ["Content", "Marketing", "Social Media"]
    },
    {
        id: "lotus-eye",
        name: "LotusEye",
        description: "Učí se normálnímu chování senzorů z vašich dat a upozorní vás na anomálie. Zdarma vytvoření modelu.",
        icon: "⚠️",
        category: "Analytics",
        tags: ["Anomálie", "Sensory", "Monitoring"]
    },
    {
        id: "bugfree-ai",
        name: "Bugfree.ai",
        description: "LeetCode pro system design a behaviorální pohovory. 150+ guided problems a AI mock interviews s hodnocením odpovědí.",
        icon: "🎯",
        category: "Vzdělávání",
        tags: ["Pohovory", "System Design", "AI"]
    },
    {
        id: "free-text-to-speech",
        name: "Free Text-To-Speech",
        description: "Převede text na živoucí audio pomocí Microsoft AI. 330+ neural hlasů v 129 jazycích. Zcela zdarma.",
        icon: "🔊",
        category: "Audio",
        tags: ["TTS", "Audio", "Microsoft AI"]
    }
];

// Detailní nástroje - začínáme s Autodesk
const TOOL_CATEGORIES: ToolCategory[] = [
    {
        id: "autodesk",
        name: "Autodesk",
        icon: "🏗️",
        description: "Světový lídr v oblasti softwaru pro architekty, stavitele, inženýry, designéry, výrobce, 3D umělce a výrobní týmy. Nástroje pro návrhy a výrobu pokrývající širokou škálu průmyslových odvětví.",
        color: "success",
        tools: [
            {
                id: "autodesk-autocad",
                name: "AutoCAD",
                description: "2D a 3D nástroje CAD pro navrhování, přidávání poznámek a automatizaci úloh kreslení v přizpůsobeném pracovním prostoru. Průmyslový standard pro technické kreslení.",
                icon: "📐",
                category: "CAD",
                tags: ["2D CAD", "3D CAD", "Technické kreslení", "Architektura", "Engineering"]
            },
            {
                id: "autodesk-fusion",
                name: "Fusion",
                description: "Návrh a výroba s integrovaným prostředím CAD, CAM, CAE, PCB a PDM. Kompletní řešení pro produkt design od konceptu po výrobu. Nyní se slevou 20%!",
                icon: "🔧",
                category: "CAD",
                tags: ["CAD", "CAM", "CAE", "PCB", "PDM", "Produkt design"]
            },
            {
                id: "autodesk-3ds-max",
                name: "3ds Max",
                description: "Software pro 3D modelování a animace pohlcujících světů a detailní návrhy. Profesionální nástroj pro herní průmysl, architektonickou vizualizaci a motion graphics.",
                icon: "🎮",
                category: "3D",
                tags: ["3D modelování", "Animace", "Rendering", "Herní design", "Vizualizace"]
            },
            {
                id: "autodesk-revit",
                name: "Revit",
                description: "Výkonné nástroje pro BIM k plánování, navrhování, konstruování a správě budov. Komplexní řešení pro stavební projekty a životní cyklus budov.",
                icon: "🏢",
                category: "BIM",
                tags: ["BIM", "Stavebnictví", "Architektura", "MEP", "Structural"]
            },
            {
                id: "autodesk-civil-3d",
                name: "Civil 3D",
                description: "Nástroje pro projektování staveb a návrh, plánování a vytváření dokumentací. Infrastrukturní projekty, silnice, mosty a terénní úpravy.",
                icon: "🛣️",
                category: "CAD",
                tags: ["Inženýrství", "Infrastruktura", "GIS", "Terén", "Silnice"]
            },
            {
                id: "autodesk-autocad-lt",
                name: "AutoCAD LT",
                description: "Nejlepší nástroje pro 2D CAD ve své třídě pro navrhování, kreslení a dokumentaci. Odlehčená verze AutoCADu za nižší cenu.",
                icon: "📏",
                category: "CAD",
                tags: ["2D CAD", "Kreslení", "Dokumentace", "Ekonomická verze"]
            },
            {
                id: "autodesk-bim-collaborate",
                name: "BIM Collaborate Pro",
                description: "Cloudový software pro společnou tvorbu, správu návrhů a spolupráci na projektech v reálném čase. Týmová spolupráce na BIM projektech.",
                icon: "☁️",
                category: "BIM",
                tags: ["Cloud", "Spolupráce", "BIM 360", "Teamwork", "Data management"]
            },
            {
                id: "autodesk-maya",
                name: "Maya",
                description: "Software pro 3D animace realistických postav a vizuální efekty. Průmyslový standard pro filmový a herní průmysl.",
                icon: "🎬",
                category: "3D",
                tags: ["3D animace", "VFX", "Character animation", "Film", "Herní průmysl"]
            },
            {
                id: "autodesk-inventor",
                name: "Inventor",
                description: "Strojírenské návrhy pro 3D modelování, simulaci, vizualizaci a mnohem více. Profesionální nástroj pro strojírenství a výrobu.",
                icon: "⚙️",
                category: "CAD",
                tags: ["Strojírenství", "3D modelování", "Simulace", "Výroba", "CAD"]
            },
            {
                id: "autodesk-flow",
                name: "Flow Production Tracking",
                description: "Cloudové řízení výroby a nástroje pro kontrolu produkce. Sledování úkolů, prostředků a zdrojů v reálném čase.",
                icon: "📊",
                category: "Produkce",
                tags: ["Produkce", "Tracking", "Management", "Cloud", "Media"]
            },
            {
                id: "autodesk-flow-studio",
                name: "Autodesk Flow Studio",
                description: "Nástroje pro snímání pohybu, trasování kamery, animace a kompozici používající umělou inteligenci. Pro stávající produkční řetězce.",
                icon: "🎥",
                category: "Produkce",
                tags: ["Motion capture", "Camera tracking", "AI", "Kompozice", "VFX"]
            },
            {
                id: "autodesk-flow-capture",
                name: "Flow Capture (Moxion)",
                description: "Cloudový software pro digitální každodenní agendu a kontrolu dat. Optimalizace workflow pro filmovou a televizní produkci.",
                icon: "💾",
                category: "Produkce",
                tags: ["Digital dailies", "Data management", "Cloud", "Media production"]
            },
            {
                id: "autodesk-docs",
                name: "Autodesk Docs",
                description: "Cloudový software pro správu dokumentů a společné datové prostředí. Centralizovaná správa projektové dokumentace.",
                icon: "📁",
                category: "Management",
                tags: ["Dokumenty", "Cloud", "Collaboration", "Data management"]
            },
            {
                id: "autodesk-build",
                name: "Autodesk Build",
                description: "Komplexní software pro správu terénu a projektů pro stavitele. Propojení kanceláře a terénu v jednom řešení.",
                icon: "🏗️",
                category: "Construction",
                tags: ["Construction", "Project management", "Field work", "BIM"]
            },
            {
                id: "autodesk-forma",
                name: "Forma Site Design",
                description: "Nástroj založený na umělé inteligenci pro rychlý a informovaný předběžný návrh a analýzu s využitím reálného kontextu. Rychlé rozhodování v raných fázích projektu.",
                icon: "🤖",
                category: "AI",
                tags: ["AI", "Site design", "Analysis", "Early stage", "Urban planning"]
            },
            {
                id: "autodesk-platform-services",
                name: "Autodesk Platform Services",
                description: "Přístup k rozhraním API a službám pro využití dat návrhů a konstrukcí v cloudu. Automatizace a integrace s vlastními systémy.",
                icon: "🔌",
                category: "API",
                tags: ["API", "Integrace", "Cloud", "Automatizace", "Data"]
            }
        ]
    },
    {
        id: "cadcam-alternatives",
        name: "CAD/CAM Alternativy",
        icon: "🔄",
        description: "Profesionální alternativy k Autodesku - open-source, levnější nebo specializované nástroje pro CNC programování a strojírenství.",
        color: "info",
        tools: [
            {
                id: "freecad",
                name: "FreeCAD",
                description: "Open-source 3D CAD s Path modulem pro CAM operace. Cross-platform, plně přizpůsobitelný. Ideální pro začátečníky a open-source nadšence.",
                icon: "🆓",
                category: "CAD",
                tags: ["Open-source", "CAD", "CAM", "Path", "Free", "Python"]
            },
            {
                id: "mastercam",
                name: "Mastercam",
                description: "Průmyslový standard pro CAM s nejrychlejšími toolpath algoritmy na trhu. Rozšířený ve výrobních firmách po celém světě.",
                icon: "🏭",
                category: "CAM",
                tags: ["CAM", "Professional", "Industry standard", "Toolpath", "Milling", "Turning"]
            },
            {
                id: "hs_works",
                name: "HSMWorks",
                description: "CAM plugin pro SolidWorks srovnatelný s Fusion 360. Ideální pokud již máte SolidWorks licenci.",
                icon: "🔧",
                category: "CAM",
                tags: ["CAM", "Plugin", "SolidWorks", "Milling", "3+2 Axis"]
            },
            {
                id: "sprutcam",
                name: "SprutCAM",
                description: "Specializovaný CAM software vynikající v komplexních 3D operacích. Výborný poměr cena/výkon pro menší firmy.",
                icon: "🎯",
                category: "CAM",
                tags: ["CAM", "3D machining", "Complex geometry", "Cost-effective"]
            },
            {
                id: "bricscad",
                name: "BricsCAD",
                description: "Levnější alternativa k AutoCADu s AI nástroji. Podporuje formáty DWG a nabízí solids modeling.",
                icon: "💰",
                category: "CAD",
                tags: ["CAD", "DWG", "AI", "Budget", "2D/3D"]
            },
            {
                id: "rhino",
                name: "Rhino 3D",
                description: "Výkonný NURBS modeler oblíbený designéry a umělci. Rozsáhlý ekosystém pluginů včetně CAM řešení.",
                icon: "🦏",
                category: "3D",
                tags: ["3D modeling", "NURBS", "Design", "Plugins", "Art", "Architecture"]
            },
            {
                id: "shapr3d",
                name: "Shapr3D",
                description: "Parametrický CAD běžící na iPad, Windows a macOS. Synchronizace s desktop workflow.",
                icon: "📱",
                category: "CAD",
                tags: ["CAD", "iPad", "Mobile", "Parametric", "Cross-platform"]
            },
            {
                id: "onshape",
                name: "Onshape",
                description: "Cloud-native CAD s vestavěným PDM. Týmová spolupráce a version control pro CAD soubory.",
                icon: "☁️",
                category: "CAD",
                tags: ["CAD", "Cloud", "PDM", "Collaboration", "SaaS"]
            }
        ]
    },
    {
        id: "cnc-simulators",
        name: "CNC Simulátory",
        icon: "🖥️",
        description: "Simulátory pro trénink CNC programování a testování G-kódu bez rizika poškození stroje nebo materiálu.",
        color: "warning",
        tools: [
            {
                id: "fagor-simulator",
                name: "Fagor CNC Simulator",
                description: "Zdarma simulátor od Fagor Automation. Podporuje frézky (3 osy) a soustruhy (2 osy). Ideální pro začátečníky.",
                icon: "🆓",
                category: "Simulator",
                tags: ["Free", "G-code", "ISO", "Milling", "Turning", "Beginner"]
            },
            {
                id: "cnc-simulator-pro",
                name: "CNC Simulator Pro",
                description: "Profesionální simulátor s podporou 5-osého frézování. 30denní trial, pak $300/lícence.",
                icon: "💎",
                category: "Simulator",
                tags: ["Professional", "5-axis", "Milling", "Turning", "Advanced"]
            },
            {
                id: "camotics",
                name: "CAMotics",
                description: "Open-source simulátor dostupný na Windows, Linux a macOS. Skvělý pro learning curve a customization.",
                icon: "🔓",
                category: "Simulator",
                tags: ["Open-source", "Cross-platform", "G-code", "3-axis", "Customizable"]
            },
            {
                id: "cnc-macro-simulator",
                name: "CNC Macro Simulator II",
                description: "Simulátor zaměřený na Fanuc, Haas, Centroid a Sinumerik macro programování. Freemium model.",
                icon: "📟",
                category: "Simulator",
                tags: ["Macro", "Fanuc", "Haas", "Sinumerik", "Custom cycles"]
            },
            {
                id: "nc-viewer",
                name: "NC Viewer",
                description: "Online G-code viewer a simulátor v prohlížeči. Rychlá vizualizace bez instalace.",
                icon: "🌐",
                category: "Simulator",
                tags: ["Online", "Web-based", "G-code", "Quick", "No install"]
            },
            {
                id: "ugs",
                name: "Universal Gcode Sender",
                description: "Open-source software pro ovládání GRBL, FluidNC a TinyG strojů. Spojuje simulaci s reálným řízením.",
                icon: "🔗",
                category: "Simulator",
                tags: ["Open-source", "GRBL", "Control", "Machine connection", "Stream"]
            },
            {
                id: "opensim",
                name: "OpenSim",
                description: "Simulátor zaměřený na vzdělávání s vizualizací toolpath a collision detection.",
                icon: "🎓",
                category: "Simulator",
                tags: ["Education", "Collision", "Toolpath", "Learning"]
            },
            {
                id: "g-wizard",
                name: "G-Wizard Editor",
                description: "G-code editor s simulací a optimalizací. Zahrnuje kalkulátory pro řezné podmínky.",
                icon: "✏️",
                category: "Editor",
                tags: ["Editor", "Optimization", "Feeds & speeds", "G-code"]
            }
        ]
    }
];

const CATEGORIES = ["Vše", ...new Set(AI_TOOLS.map(t => t.category))];

export default function ToolsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Vše");
    const [activeTab, setActiveTab] = useState<'ai' | 'detailed'>('ai');

    const filteredTools = AI_TOOLS.filter(tool => {
        const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = selectedCategory === "Vše" || tool.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <main className="min-vh-100 bg-dark text-white pb-5">
            <nav className="navbar navbar-dark bg-black border-bottom border-warning mb-4">
                <Container fluid>
                    <Link href="/" className="btn btn-outline-light btn-sm">
                        ← Zpět na Dashboard
                    </Link>
                    <span className="navbar-brand mb-0 h5 mx-auto text-warning">
                        🛠️ Nástroje
                    </span>
                    <div></div>
                </Container>
            </nav>

            <Container>
                {/* Tab přepínač */}
                <Row className="mb-4">
                    <Col>
                        <div className="d-flex gap-3 border-bottom border-secondary pb-3">
                            <Button 
                                variant={activeTab === 'ai' ? 'warning' : 'outline-warning'}
                                onClick={() => setActiveTab('ai')}
                            >
                                🤖 AI Nástroje
                            </Button>
                            <Button 
                                variant={activeTab === 'detailed' ? 'warning' : 'outline-warning'}
                                onClick={() => setActiveTab('detailed')}
                            >
                                🏗️ Profesionální Nástroje
                            </Button>
                        </div>
                    </Col>
                </Row>

                {activeTab === 'ai' && (
                    <>
                        <Row className="mb-4">
                            <Col>
                                <h1 className="display-5 fw-bold">AI Nástroje</h1>
                                <p className="text-white-50">Objevte nejlepší AI nástroje pro vaši práci a osobní rozvoj</p>
                            </Col>
                        </Row>

                        <Row className="mb-4">
                            <Col md={6}>
                                <InputGroup>
                                    <InputGroup.Text>🔍</InputGroup.Text>
                                    <Form.Control 
                                        placeholder="Hledat nástroje..." 
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="bg-dark text-white border-secondary"
                                    />
                                </InputGroup>
                            </Col>
                            <Col md={6}>
                                <div className="d-flex flex-wrap gap-2">
                                    {CATEGORIES.map(cat => (
                                        <Button 
                                            key={cat}
                                            variant={selectedCategory === cat ? "warning" : "outline-warning"}
                                            size="sm"
                                            onClick={() => setSelectedCategory(cat)}
                                        >
                                            {cat}
                                        </Button>
                                    ))}
                                </div>
                            </Col>
                        </Row>

                        <Row className="mb-4">
                            <Col>
                                <small className="text-muted">Nalezeno {filteredTools.length} nástrojů</small>
                            </Col>
                        </Row>

                        <Row className="g-4">
                            {filteredTools.map(tool => (
                                <Col md={6} lg={4} key={tool.id}>
                                    <Card className="bg-dark border-warning h-100">
                                        <Card.Body>
                                            <div className="d-flex align-items-start mb-3">
                                                <span className="fs-2 me-3">{tool.icon}</span>
                                                <div className="flex-grow-1">
                                                    <h5 className="mb-1">{tool.name}</h5>
                                                    <Badge bg="warning" text="dark" className="small">{tool.category}</Badge>
                                                </div>
                                            </div>
                                            <p className="text-white-50 small mb-3">{tool.description}</p>
                                            <div className="d-flex flex-wrap gap-1 mb-3">
                                                {tool.tags.map(tag => (
                                                    <Badge key={tag} bg="secondary" className="small">{tag}</Badge>
                                                ))}
                                            </div>
                                            <Link href={`/articles/${tool.id}`}>
                                                <Button variant="outline-warning" size="sm" className="w-100">
                                                    📝 Více informací
                                                </Button>
                                            </Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>

                        {filteredTools.length === 0 && (
                            <Row className="mt-5">
                                <Col className="text-center">
                                    <div className="fs-1 mb-3">🔍</div>
                                    <h4>Nenalezeno</h4>
                                    <p className="text-white-50">Zkuste změnit parametry vyhledávání</p>
                                </Col>
                            </Row>
                        )}
                    </>
                )}

                {activeTab === 'detailed' && (
                    <>
                        <Row className="mb-4">
                            <Col>
                                <h1 className="display-5 fw-bold">🏗️ Profesionální Nástroje</h1>
                                <p className="text-white-50">Kompletní přehled profesionálního softwaru pro návrh, výrobu a stavebnictví</p>
                            </Col>
                        </Row>

                        {/* Autodesk sekce */}
                        {TOOL_CATEGORIES.map(category => (
                            <div key={category.id} className="mb-5">
                                <Row className="mb-4">
                                    <Col>
                                        <div className="d-flex align-items-center gap-3 mb-3">
                                            <span className="fs-2">{category.icon}</span>
                                            <div>
                                                <h2 className="mb-0">{category.name}</h2>
                                                <p className="text-white-50 mb-0 small">{category.description}</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>

                                <Accordion defaultActiveKey={[]} className="mb-4">
                                    {category.tools.map((tool, index) => (
                                        <Accordion.Item key={tool.id} eventKey={String(index)} className="border-secondary">
                                            <Accordion.Header>
                                                <div className="d-flex align-items-center w-100">
                                                    <span className="me-3 fs-4">{tool.icon}</span>
                                                    <span className="flex-grow-1 text-start">{tool.name}</span>
                                                    <Badge bg="success" className="me-3">{tool.category}</Badge>
                                                </div>
                                            </Accordion.Header>
                                            <Accordion.Body className="bg-dark">
                                                <Row>
                                                    <Col md={8}>
                                                        <p className="text-white mb-3">{tool.description}</p>
                                                        <div className="d-flex flex-wrap gap-2">
                                                                {tool.tags.map(tag => (
                                                                    <Badge key={tag} bg="success" className="text-light border border-success">
                                                                        {tag}
                                                                    </Badge>
                                                                ))}
                                                        </div>
                                                    </Col>
                                                    <Col md={4} className="text-md-end mt-3 mt-md-0">
                                                        <Button variant="success" size="sm">
                                                            🌐 Oficiální stránky
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    ))}
                                </Accordion>
                            </div>
                        ))}

                        {/* Placeholder pro další kategorie */}
                        <Row className="mt-5">
                            <Col>
                                <Card className="bg-dark border-secondary border-dashed">
                                    <Card.Body className="text-center py-5">
                                        <div className="fs-1 mb-3">🚧</div>
                                        <h4>Další kategorie již brzy!</h4>
                                        <p className="text-white-50">
                                            Připravujeme další sekce nástrojů. Zůstaňte sledováni pro aktualizace.
                                        </p>
                                        <div className="d-flex justify-content-center gap-3 flex-wrap mt-3">
                                            <Badge bg="secondary">Adobe Creative Cloud</Badge>
                                            <Badge bg="secondary">Microsoft 365</Badge>
                                            <Badge bg="secondary">JetBrains</Badge>
                                            <Badge bg="secondary">Visual Studio</Badge>
                                            <Badge bg="secondary">Další...</Badge>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </>
                )}
            </Container>
        </main>
    );
}
