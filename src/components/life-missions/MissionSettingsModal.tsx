'use client';

import React from 'react';
import { Modal, Button, Form, Badge } from 'react-bootstrap';
import { LifeMission, LifeMissionTemplate } from '@/types/life-missions';
import { MISSION_TEMPLATES } from '@/data/life-missions/templates';

interface MissionSettingsModalProps {
  show: boolean;
  onHide: () => void;
  mission: LifeMission;
  onUpdateCategories: (categories: string[]) => void;
}

const OPTIONAL_CATEGORIES: Record<string, { label: string; description: string; icon: string }> = {
  'detailni-finance': { label: 'Detailní finanční příprava', description: 'Registry dlužníků, stavební spoření, daňové odpočty', icon: '💰' },
  'hluboka-lokalita': { label: 'Hluboký průzkum lokality', description: 'Územní plán, hluk, školy, kriminalita', icon: '🗺️' },
  'expertni-proverka': { label: 'Expertní prověrka nemovitosti', description: 'Revize elektro, tlakové zkoušky, termovize', icon: '🔧' },
  'pravni-jistoty': { label: 'Právní jistoty', description: 'Exekuce prodávajícího, forma vlastnictví, nájemní vztahy', icon: '⚖️' },
  'hypoteka-extra': { label: 'Extra hypotéka', description: 'Pojištění splácení, životní pojištění, refinancování', icon: '🏦' },
  'stehovani-extra': { label: 'Rozšířené stěhování', description: 'Kompletní změny adresy, zabezpečení, adaptace', icon: '📦' },
  'frontend-advanced': { label: 'Pokročilý Frontend', description: 'TypeScript, state management, testing, build tools', icon: '🎨' },
  'backend-advanced': { label: 'Pokročilý Backend', description: 'NoSQL databáze, autentizace, microservices, Docker', icon: '⚙️' },
  'devops-advanced': { label: 'Pokročilý DevOps', description: 'Terraform, monitoring, logging, advanced cloud', icon: '🚀' },
  'data-advanced': { label: 'Pokročilá Data Science', description: 'Deep Learning, NLP, Computer Vision, pokročilé ML', icon: '🤖' },
  'kariera-advanced': { label: 'Kariérní růst', description: 'Certifikace, mentoring, Senior/Lead pozice', icon: '💼' },
  'krcni-pater': { label: 'Krční páteř', description: 'Rotace, zdvihy, protažení krční páteře', icon: '🦒' },
  'ramena': { label: 'Ramena', description: 'Kroužení, přítahy, tlaky, protažení ramen', icon: '🏋️' },
  'ruce-prsty': { label: 'Ruce a prsty', description: 'Posílení rukou, zápěstí, úchop a prstů', icon: '✋' },
  'zapesti': { label: 'Zápěstí', description: 'Rotace, protažení, posílení zápěstí', icon: '⌚' },
  'horni-zada': { label: 'Horní záda', description: 'Přítahy, face pulls, dveřní rám', icon: '🔺' },
  'dolni-zada': { label: 'Dolní záda', description: 'Mrtvý tah, hyperextenze, kolébka', icon: '🔻' },
};

export default function MissionSettingsModal({ show, onHide, mission, onUpdateCategories }: MissionSettingsModalProps) {
  // Try to find template by templateId, or by title match as fallback
  let template = MISSION_TEMPLATES.find(t => t.id === mission.templateId);
  
  // Fallback: try to match by title if templateId is missing or not found
  if (!template && mission.title) {
    template = MISSION_TEMPLATES.find(t => 
      t.title.toLowerCase() === mission.title.toLowerCase() ||
      mission.title.toLowerCase().includes(t.title.toLowerCase()) ||
      t.title.toLowerCase().includes(mission.title.toLowerCase())
    );
  }
  
  // Get available optional categories from template
  const availableCategories = React.useMemo(() => {
    if (!template) {
      console.log('MissionSettingsModal: No template found for mission', mission.title, 'templateId:', mission.templateId);
      return [];
    }
    const categories = new Set<string>();
    template.phases.forEach(phase => {
      phase.steps.forEach(step => {
        if (step.isOptional && step.category) {
          categories.add(step.category);
        }
      });
    });
    const result = Array.from(categories);
    console.log('MissionSettingsModal: Found categories for', template.title, ':', result);
    return result;
  }, [template, mission]);

  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    mission.enabledOptionalCategories || []
  );

  const handleToggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSave = () => {
    onUpdateCategories(selectedCategories);
    onHide();
  };

  // Count steps in each category
  const getCategoryStepCount = (category: string) => {
    if (!template) return 0;
    let count = 0;
    template.phases.forEach(phase => {
      phase.steps.forEach(step => {
        if (step.isOptional && step.category === category) {
          count++;
        }
      });
    });
    return count;
  };

  if (availableCategories.length === 0) {
    return (
      <Modal show={show} onHide={onHide} centered size="lg">
        <Modal.Header closeButton style={{ background: '#1a1a2e', borderColor: 'rgba(255,255,255,0.1)' }}>
          <Modal.Title style={{ color: '#fff' }}>⚙️ Nastavení mise</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: '#1a1a2e', color: 'rgba(255,255,255,0.6)', textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📋</div>
          <p>Tato mise nemá žádné volitelné kroky.</p>
        </Modal.Body>
        <Modal.Footer style={{ background: '#1a1a2e', borderColor: 'rgba(255,255,255,0.1)' }}>
          <Button variant="outline-secondary" onClick={onHide} style={{ borderRadius: '10px' }}>
            Zavřít
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton style={{ background: '#1a1a2e', borderColor: 'rgba(255,255,255,0.1)' }}>
        <Modal.Title style={{ color: '#fff' }}>⚙️ Rozšířené kroky mise</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: '#1a1a2e' }}>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '20px' }}>
          Vyber, které volitelné kroky chceš zobrazovat v této misi. 
          Základní kroky jsou vždy viditelné.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {availableCategories.map(category => {
            const config = OPTIONAL_CATEGORIES[category];
            const isSelected = selectedCategories.includes(category);
            const stepCount = getCategoryStepCount(category);

            return (
              <div
                key={category}
                onClick={() => handleToggleCategory(category)}
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  border: `2px solid ${isSelected ? mission.color : 'rgba(255,255,255,0.1)'}`,
                  background: isSelected ? `${mission.color}15` : 'rgba(255,255,255,0.03)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '1.5rem' }}>{config?.icon || '📋'}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ color: '#fff', fontWeight: 600 }}>
                        {config?.label || category}
                      </span>
                      <Badge 
                        bg="" 
                        style={{ 
                          background: isSelected ? `${mission.color}30` : 'rgba(255,255,255,0.08)',
                          color: isSelected ? mission.color : 'rgba(255,255,255,0.4)',
                          fontSize: '0.75rem'
                        }}
                      >
                        {stepCount} kroků
                      </Badge>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', margin: '4px 0 0 0' }}>
                      {config?.description || ''}
                    </p>
                  </div>
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '6px',
                      border: `2px solid ${isSelected ? mission.color : 'rgba(255,255,255,0.3)'}`,
                      background: isSelected ? mission.color : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {isSelected && <span style={{ color: '#fff', fontSize: '0.8rem' }}>✓</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', margin: 0 }}>
            💡 <strong>Tip:</strong> Volitelné kroky ti pomohou provést nákup nemovitosti důkladněji a vyhnout se problémům. 
            Můžeš je kdykoliv zapnout nebo vypnout.
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ background: '#1a1a2e', borderColor: 'rgba(255,255,255,0.1)' }}>
        <Button variant="outline-secondary" onClick={onHide} style={{ borderRadius: '10px' }}>
          Zrušit
        </Button>
        <Button 
          variant="warning" 
          onClick={handleSave} 
          style={{ borderRadius: '10px' }}
        >
          Uložit změny
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
