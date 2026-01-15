'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Container, Row, Col, Card, Badge, Button, ProgressBar, ListGroup, Modal, Form, Accordion } from 'react-bootstrap'
import Link from 'next/link'
import { MISSIONS, Mission, MissionPhase, MissionTask } from '@/lib/data/missions';

const getQNAData = (missionId: string) => {
  if (missionId === 'cnc-fundamentals') {
    return [
      {
        question: "Co znamená zkratka CNC?",
        answer: "Computer Numerical Control - číslicové řízení počítačem. CNC stroje jsou automatizované obráběcí stroje řízené počítačovým programem."
      },
      {
        question: "Jaký je rozdíl mezi CNC frézou a soustruhem?",
        answer: "CNC fréza opracovává obrobek rotačním nástrojem (frézkou) při pohybu obrobku nebo nástroje. CNC soustruh opracovává rotačním pohybem obrobku při lineárním pohybu nástroje."
      },
      {
        question: "Co je G-kód?",
        answer: "G-kód je programovací jazyk pro CNC stroje. G-kódy řídí pohyby nástroje, rychlosti, nástroje atd. Např. G00 = rychlý posuv, G01 = pracovní posuv, G02/G03 = kruhové interpolace."
      },
      {
        question: "Jak se označují rozměry na technických výkresech?",
        answer: "Rozměry se označují čísly s tolerancemi (např. 50±0.1 mm). Používají se symboly pro průměry (Ø), čtverce, poloměry (R) a speciální značky pro povrchovou úpravu."
      },
      {
        question: "Jaký je rozdíl mezi HSS a karbidovými nástroji?",
        answer: "HSS (High Speed Steel) nástroje jsou levnější, vhodné pro měkké materiály a nižší rychlosti. Karbidové nástroje jsou tvrdší, odolnější, vhodné pro tvrdé materiály a vysoké rychlosti obrábění."
      },
      {
        question: "Co je to pracovní souřadnicový systém v CNC?",
        answer: "Souřadnicový systém definuje pozici nástroje v prostoru. Nejběžnější je kartézský systém XYZ. Nula stroje (G53) je pevná, pracovní nula (G54-G59) se nastavuje podle obrobku."
      },
      {
        question: "Jak se upíná obrobek na CNC stole?",
        answer: "Obrobek se upíná pomocí svěráků, přísavek, magnetických desek nebo speciálních upínacích přípravků. Důležité je zajistit stabilitu, přesnost a bezpečnost během obrábění."
      },
      {
        question: "Co znamená M-kód v CNC programech?",
        answer: "M-kódy řídí pomocné funkce stroje: M03 = start vřetena, M05 = stop vřetena, M06 = výměna nástroje, M08/M09 = chladicí kapalina zapnout/vypnout, M30 = konec programu."
      },
      {
        question: "Jak se měří přesnost vyrobeného dílu?",
        answer: "Přesnost se měří pomocí měřidel: mikrometry, posuvná měřítka, kalibry, CMM stroje (souřadnicové měřící stroje). Kontroluje se rozměry, tolerance, povrchová kvalita a geometrie."
      },
      {
        question: "Jaké jsou základní bezpečnostní pravidla při práci s CNC?",
        answer: "Nikdy nesahejte do pracovního prostoru běžícího stroje. Používejte ochranné brýle a rukavice. Zkontrolujte program před spuštěním. Používejte správné nástroje a rychlosti. Mějte nouzové tlačítko po ruce."
      }
    ];
  }

  // Default IT/programming questions
  return [
    {
      question: "Jaký programovací jazyk bych se měl naučit jako první?",
      answer: "Pro začátečníky doporučujeme Python - má jednoduchou syntaxi, je univerzální a má obrovskou komunitu. Další možností je JavaScript, pokud chcete hned vidět výsledky v prohlížeči, nebo HTML/CSS pro webový vývoj."
    },
    {
      question: "Kolik času denně bych měl věnovat učení programování?",
      answer: "Pro optimální výsledky stačí 1-2 hodiny denně. Důležitější než délka je pravidelnost. Lepší je učit se 30 minut denně než 5 hodin jednou týdně. Konzistence je klíčem k úspěchu."
    },
    {
      question: "Potřebuji vysokoškolské vzdělání pro práci v IT?",
      answer: "Ne nutně. Mnoho úspěšných programátorů nemá VŠ vzdělání. Důležitější jsou praktické dovednosti, portfolio projektů a schopnost řešit problémy. Certifikáty a bootcampy mohou být alternativou."
    },
    {
      question: "Jak se mám připravit na technický pohovor?",
      answer: "Procvičujte algoritmy a datové struktury na platformách jako LeetCode nebo HackerRank. Naučte se základy systémového designu. Připravte si příklady projektů, na kterých jste pracovali. Trénujte vysvětlování svého kódu."
    },
    {
      question: "Co je to Git a proč ho potřebuji?",
      answer: "Git je systém pro správu verzí kódu. Umožňuje sledovat změny, vracet se k předchozím verzím, spolupracovat s dalšími vývojáři a efektivně řídit vývoj projektu. Je to základní nástroj každého vývojáře."
    },
    {
      question: "Jaký rozdíl je mezi frontend a backend vývojem?",
      answer: "Frontend je to, co uživatel vidí a s čím interaguje v prohlížeči (HTML, CSS, JavaScript). Backend je serverová strana, která zpracovává data, logiku aplikace a komunikaci s databází (Python, Java, Node.js, PHP)."
    },
    {
      question: "Co je to framework a kdy ho použít?",
      answer: "Framework je předpřipravená sada nástrojů a knihoven, která zjednodušuje vývoj. Např. React, Vue, Angular pro frontend, Django, Spring pro backend. Použijte ho, když potřebujete rychle vytvořit standardní aplikaci s ověřenými postupy."
    },
    {
      question: "Jak se naučit debugovat kód?",
      answer: "Začněte čtením chybových zpráv - často přímo ukazují na problém. Používejte console.log pro výpis hodnot. Naučte se používat dev tools v prohlížeči nebo debugger v IDE. Rozdělte problém na menší části a testujte je izolovaně."
    },
    {
      question: "Je nutné umět anglicky pro práci v IT?",
      answer: "Ano, angličtina je téměř nezbytná. Většina dokumentace, tutoriálů a kurzů je v angličtině. Komunikace v týmech často probíhá anglicky. Nemusíte být dokonalí, ale základní porozumění technické angličtině je nutné."
    },
    {
      question: "Jak vytvořit dobré portfolio?",
      answer: "Zahrňte 3-5 kvalitních projektů s popisem technologie, vaší role a výsledků. Ukažte kód na GitHubu s README soubory. Popište problémy, které jste řešili, a jak jste k tomu přistoupili. Můžete přidat i blog nebo ukázky účasti na open source."
    },
    {
      question: "Co je to API a jak ho použít?",
    answer: "API (Application Programming Interface) je rozhraní pro komunikaci mezi různými částmi softwaru. REST API je nejběžnější typ - posíláte HTTP požadavky (GET, POST, PUT, DELETE) a dostáváte data, obvykle ve formátu JSON."
  },
  {
    question: "Jaký editor kódu nebo IDE mám používat?",
    answer: "Pro začátečníky doporučujeme VS Code - je zdarma, lehký a má obrovské množství rozšíření. Pokud preferujete JetBrains produkty, IntelliJ IDEA, PyCharm nebo WebStorm jsou výborné (některé mají bezplatnou licenci pro studenty)."
  },
  {
    question: "Jak se naučit pracovat s databázemi?",
    answer: "Začněte relačními databázemi (SQL) - MySQL nebo PostgreSQL. Naučte se základní příkazy SELECT, INSERT, UPDATE, DELETE. Pak pokračujte JOINy, indexy a normalizací. Později můžete prozkoušet NoSQL databáze jako MongoDB."
  },
  {
    question: "Co dělat, když se zaseknu na problému?",
    answer: "Nejprve si dejte pauzu - často pomůže. Zkuste problém popsat nahlas nebo napsat. Vyhledejte chybovou zprávu na Googlu, Stack Overflow. Podívejte se do dokumentace. Pokud nepomůže, zeptej se v komunitě nebo na fóru."
  },
  {
    question: "Jak zůstat v obraze s novinkami v IT?",
    answer: "Sledujte tech blogy (Dev.to, Medium, Hashnode), YouTube kanály (Fireship, Traversy Media), newslettery a podcasty. Sledujte relevantní lidi na Twitteru/X. Účastněte se meetupů a konferencí. Čtěte dokumentaci nových verzí frameworků."
  },
  {
    question: "Je open source přínosné pro začátečníky?",
    answer: "Ano! Pomáhá to naučit se číst cizí kód, spolupracovat s ostatními a budovat si reputaci. Začněte malými příspěvky jako opravy překlepů v dokumentaci. Hledejte projekty označené 'good first issue' pro začátečníky."
  },
  {
    question: "Jaký je rozdíl mezi junior, mid a senior vývojářem?",
    answer: "Junior (0-2 roky) - učí se základy, potřebuje vedení. Mid (2-5 let) - samostatně řeší běžné problémy, rozumí best practices. Senior (5+ let) - strategické rozhodování, mentoring, návrh architektury, řešení komplexních problémů."
  },
  {
    question: "Mám se specializovat nebo být fullstack vývojář?",
    answer: "Pro začátek doporučujeme širší záběr (fullstack základy), pak si vybrat specializaci. Specializace (např. frontend, backend, DevOps, AI) vede k vyššímu platu a expertíze. Fullstack je ale cenný pro menší týmy a startupy."
  },
  {
    question: "Jak si nastavit projektové prostředí?",
    answer: "Nainstaluj si správce verzí (Git), vhodný editor/IDE, terminál (příkazová řádka). Nauč se základní příkazy v terminálu. Používej nástroje pro správu závislostí (npm, pip, composer). Odděl pracovní a osobní projekty."
  },
  {
    question: "Co je to CI/CD a proč je to důležité?",
    answer: "CI/CD (Continuous Integration/Deployment) automatizuje testování a nasazování kódu. Při každém commitu se spustí testy, build a případně i nasazení. Šetří čas, snižuje chyby a umožňuje rychlejší vydávání nových funkcí."
  },
  {
    question: "Jak efektivně učit nové technologie?",
    answer: "Začněte oficiální dokumentací a tutoriály. Pak si vytvoř vlastní malý projekt. Čti cizí kód na GitHubu. Uč ostatním (blog, mentoring) - to nejlépe odhalí mezery ve tvém vědomí. Praktika je důležitější než pasivní sledování kurzů."
  },
  {
    question: "Jak si vybrat mezi různými IT specializacemi?",
    answer: "Zkus každou oblast krátkodobě (kurzy, projekty). Zvaž, co tě baví víc - vizuální tvorba (frontend, design), logika a data (backend, AI), systémy a infrastruktura (DevOps), nebo komunikace s uživateli (product, QA). Sleduj inzerenty a platy v různých oborech."
  }
];
}

export default function MissionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const missionId = params.id as string

  const [completedPhases, setCompletedPhases] = useState<Record<string, boolean>>({})
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({})
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [submissionText, setSubmissionText] = useState('')
  const [showIntro, setShowIntro] = useState(true)
  const [openQnaIndex, setOpenQnaIndex] = useState<number | null>(null)

  const mission = useMemo(() => MISSIONS.find(m => m.id === missionId) || null, [missionId])

  useEffect(() => {
    if (mission) {
      const savedPhases = localStorage.getItem(`mission_${missionId}_phases`)
      const savedTasks = localStorage.getItem(`mission_${missionId}_tasks`)
      if (savedPhases) {
          try {
            setCompletedPhases(JSON.parse(savedPhases))
          } catch (e) { console.error(e) }
      }
      if (savedTasks) {
          try {
            setCompletedTasks(JSON.parse(savedTasks))
          } catch (e) { console.error(e) }
      }
    }
  }, [missionId, mission])

  const totalTasks = useMemo(() => {
    if (!mission || !mission.phases) return 0
    return mission.phases.reduce((acc, phase) => acc + phase.tasks.length, 0)
  }, [mission])

  const completedTasksCount = useMemo(() => {
    return Object.keys(completedTasks).filter(k => completedTasks[k]).length
  }, [completedTasks])

  const progress = useMemo(() => {
    if (!mission || totalTasks === 0) return 0
    return Math.round((completedTasksCount / totalTasks) * 100)
  }, [mission, totalTasks, completedTasksCount])

  // Simple XP calculation for now (total mission XP * progress)
  // In a real app, sum XP of completed tasks
  const earnedXP = useMemo(() => {
     if (!mission) return 0;
     // Sum XP from all completed tasks
     let total = 0;
     mission.phases.forEach(phase => {
        phase.tasks.forEach(task => {
            if (completedTasks[task.id]) {
                total += task.xp;
            }
        });
     });
     return total;
  }, [mission, completedTasks])

  const toggleTask = useCallback((phaseId: string, taskId: string) => {
    if (!mission) return
    
    // Toggle task
    const newCompletedTasks = { ...completedTasks, [taskId]: !completedTasks[taskId] }
    setCompletedTasks(newCompletedTasks)
    localStorage.setItem(`mission_${missionId}_tasks`, JSON.stringify(newCompletedTasks))

    // Check if phase is complete
    const phase = mission.phases.find(p => p.id === phaseId)
    if (phase) {
      const allPhaseTasksCompleted = phase.tasks.every(task => newCompletedTasks[task.id])
      const newCompletedPhases = { ...completedPhases, [phaseId]: allPhaseTasksCompleted }
      setCompletedPhases(newCompletedPhases)
      localStorage.setItem(`mission_${missionId}_phases`, JSON.stringify(newCompletedPhases))
    }
  }, [completedTasks, completedPhases, mission, missionId])

  const isTaskCompleted = (taskId: string) => {
    return completedTasks[taskId] || false
  }

  const isPhaseCompleted = (phaseId: string) => {
    return completedPhases[phaseId] || false
  }

  const handleSubmit = () => {
    if (!mission) return
    alert(`Mise dokončena! Získal jsi celkem ${earnedXP} XP!`)
    setShowSubmitModal(false)
    router.push('/missions')
  }

  const startMission = () => {
    setShowIntro(false)
  }

  if (!mission) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-white">Načítám misi...</div>
      </Container>
    )
  }

  if (showIntro) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <div className="mb-4">
                <h1 className="display-4 fw-bold text-dark mb-4">🎬 MISSION BRIEFING</h1>
                <div className="bg-white p-5 rounded-3 mb-4 border border-secondary shadow">
                  <div className="d-flex align-items-center justify-content-center mb-4">
                     <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center text-white fw-bold fs-2" style={{width: '80px', height: '80px'}}>
                        {mission.instructor.name.substring(0, 1)}
                     </div>
                  </div>
                  <h4 className="text-dark mb-1">{mission.instructor.name}</h4>
                  <p className="text-secondary small mb-4">{mission.instructor.role}</p>

                  <p className="lead mb-4 text-dark fst-italic">
                    "{mission.briefing}"
                  </p>
                  <p className="mb-4 text-secondary">
                    Tato mise má <strong>{mission.estimatedTime}</strong> na splnění. Připrav se na tvrdou práci.
                  </p>
                  
                  {/* AI Video Placeholder */}
                  <div className="ratio ratio-16x9 mb-4 bg-dark rounded overflow-hidden position-relative">
                     <div className="d-flex align-items-center justify-content-center h-100 text-white-50">
                        <div className="text-center">
                            <span className="display-1">▶️</span>
                            <p className="mt-2">AI Instructor Video Placeholder</p>
                        </div>
                     </div>
                  </div>

                  <div className="d-flex justify-content-center gap-3 flex-wrap mb-4">
                    <Badge bg="primary" className="px-3 py-2">{mission.phases.length} Fází</Badge>
                    <Badge bg="success" className="px-3 py-2">{totalTasks} Úkolů</Badge>
                    <Badge bg="warning" className="px-3 py-2 text-dark">{mission.xp} XP Odměna</Badge>
                  </div>
                </div>
                <Button
                  variant="warning"
                  size="lg"
                  className="px-5 py-3 fw-bold"
                  onClick={startMission}
                >
                  🚀 PŘIJMOUT MISI
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }

  return (
    <main className="min-vh-100 text-dark pb-5">
      <nav className="navbar navbar-dark bg-secondary border-bottom border-dark">
        <Container fluid>
          <Link href="/missions" className="btn btn-dark btn-sm">
            ← Zpět na Misy
          </Link>
          <div className="text-center">
            <span className="navbar-brand mb-0 h5 text-dark">{mission.title}</span>
            <div className="small text-secondary">{mission.category} • {earnedXP} XP earned</div>
          </div>
          <div className="text-secondary small">
            {completedTasksCount}/{totalTasks} úkolů
          </div>
        </Container>
      </nav>

      <Container className="mt-4">
        <Row>
          <Col lg={8}>
            <Card className="border-0 shadow-lg mb-4">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-start mb-4">
                  <div>
                    <h1 className="fw-bold mb-2 text-dark">{mission.title}</h1>
                    <h4 className="text-secondary mb-3">{mission.subtitle}</h4>
                    <p className="text-dark mb-0">{mission.description}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fw-bold text-dark">Celkový pokrok</span>
                    <span className="text-dark">{progress}%</span>
                  </div>
                  <ProgressBar now={progress} variant="warning" style={{height: '10px'}} />
                </div>

                <div className="bg-light p-4 rounded mb-4 border border-secondary d-flex align-items-start gap-3">
                   <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0" style={{width: '40px', height: '40px'}}>
                        {mission.instructor.name.substring(0, 1)}
                   </div>
                   <div>
                        <h6 className="text-dark fw-bold mb-1">{mission.instructor.name} (Briefing)</h6>
                        <p className="mb-0 text-secondary fst-italic">"{mission.briefing}"</p>
                   </div>
                </div>

                <div className="mb-4">
                  <h5 className="text-dark mb-3">❓ Q&A - Nejčastější otázky k IT</h5>
                  <Accordion defaultActiveKey={[]} activeKey={openQnaIndex !== null ? String(openQnaIndex) : ''} onSelect={(key) => setOpenQnaIndex(key ? parseInt(key as string) : null)} flush>
                    {getQNAData(missionId).map((item, index) => (
                      <Accordion.Item key={index} eventKey={String(index)} className="border-secondary mb-2">
                        <Accordion.Header>
                          <span className="text-dark">{item.question}</span>
                        </Accordion.Header>
                        <Accordion.Body className="bg-light">
                          <p className="mb-0 text-dark">{item.answer}</p>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </div>

                <h5 className="text-dark mb-3">Fáze Mise</h5>
                <Accordion defaultActiveKey="0" flush>
                  {mission.phases.map((phase: MissionPhase, phaseIndex: number) => (
                    <Accordion.Item key={phase.id} eventKey={String(phaseIndex)} className="border-secondary mb-2">
                      <Accordion.Header>
                        <div className="d-flex align-items-center w-100 me-3">
                          <span className="me-3">
                            {isPhaseCompleted(phase.id) ? '✅' : `📍 Fáze ${phaseIndex + 1}:`}
                          </span>
                          <span className="flex-grow-1 text-start text-dark fw-bold">{phase.title}</span>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body className="bg-light">
                        <p className="text-secondary mb-3">{phase.description}</p>
                        <ListGroup variant="flush">
                          {phase.tasks.map((task: MissionTask) => (
                            <ListGroup.Item
                              key={task.id}
                              className="bg-transparent border-secondary px-0 py-2"
                            >
                              <div className="d-flex align-items-start">
                                <Form.Check
                                  type="checkbox"
                                  checked={isTaskCompleted(task.id)}
                                  onChange={() => toggleTask(phase.id, task.id)}
                                  className="me-3 mt-1"
                                  style={{ transform: 'scale(1.3)' }}
                                />
                                <div>
                                    <span className={`d-block fw-bold ${isTaskCompleted(task.id) ? "text-decoration-line-through text-secondary" : "text-dark"}`}>
                                      {task.title}
                                    </span>
                                    <small className="text-muted d-block">{task.description}</small>
                                    <Badge bg="info" className="mt-1 text-dark" style={{fontSize: '0.7em'}}>+{task.xp} XP</Badge>
                                </div>
                              </div>
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                        {phase.reward && isPhaseCompleted(phase.id) && (
                            <div className="mt-3 p-2 bg-success bg-opacity-25 rounded text-success text-center fw-bold border border-success">
                                🎁 Odměna: {phase.reward}
                            </div>
                        )}
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="border-0 shadow-lg mb-4">
              <Card.Body className="p-4">
                <h5 className="text-dark mb-3">⚡ Statistiky</h5>

                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-dark">Získané XP</span>
                    <span className="text-warning fw-bold">{earnedXP} / {mission.xp}</span>
                  </div>
                  <ProgressBar now={(earnedXP / mission.xp) * 100} variant="warning" style={{height: '8px'}} />
                </div>

                {progress === 100 ? (
                  <Button
                    variant="success"
                    className="w-100 mb-3 py-2 fw-bold"
                    onClick={() => setShowSubmitModal(true)}
                  >
                    🎉 ODEVZDAT MISI
                  </Button>
                ) : (
                  <Button variant="secondary" className="w-100 mb-3" disabled>
                    Dokonči všechny úkoly
                  </Button>
                )}

                <div className="text-center">
                  <small className="text-secondary">Celková odměna: {mission.xp} XP</small>
                </div>
              </Card.Body>
            </Card>

            <Card className="border-0 shadow-lg">
              <Card.Body className="p-4">
                <h6 className="text-dark mb-3">🛠️ Tagy</h6>
                <div className="d-flex flex-wrap gap-2">
                  {mission.tags.map((tag: string) => (
                    <Badge key={tag} bg="primary" className="text-dark">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card.Body>
            </Card>
            
            <Card className="border-0 shadow-lg mt-4">
                <Card.Body className="p-4 text-center">
                    <h6 className="text-dark mb-3">👨‍🏫 Instruktor</h6>
                     <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center text-white fw-bold mx-auto mb-2" style={{width: '64px', height: '64px'}}>
                        {mission.instructor.name.substring(0, 1)}
                     </div>
                     <h5 className="text-dark">{mission.instructor.name}</h5>
                     <p className="text-muted small">{mission.instructor.role}</p>
                </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={showSubmitModal} onHide={() => setShowSubmitModal(false)} centered>
        <Modal.Header closeButton className="bg-light border-secondary">
          <Modal.Title className="text-dark">🎉 Mise Dokončena!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light text-dark">
          <p>Gratuluji k dokončení mise <strong>{mission.title}</strong>!</p>
          <p>Získal jsi celkem <strong>{earnedXP} XP</strong> za svou práci.</p>

          <Form.Group className="mt-4">
            <Form.Label className="text-dark">Zpětná vazba pro {mission.instructor.name}:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={submissionText}
              onChange={(e) => setSubmissionText(e.target.value)}
              placeholder="Jak se ti mise líbila?"
              className="bg-white text-dark border-secondary"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="bg-light border-secondary">
          <Button variant="secondary" onClick={() => setShowSubmitModal(false)}>
            Zrušit
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Odevzdat a pokračovat
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  )
}