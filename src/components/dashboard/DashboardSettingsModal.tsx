'use client';

import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { DashboardSectionConfig } from './types';
import { FiEye, FiEyeOff, FiRotateCcw, FiSave } from 'react-icons/fi';

interface DashboardSettingsModalProps {
  show: boolean;
  onHide: () => void;
  config: DashboardSectionConfig[];
  onUpdateOrder: (newOrder: DashboardSectionConfig[]) => void;
  onToggleVisibility: (id: string) => void;
  onReset: () => void;
}

export function DashboardSettingsModal({
  show,
  onHide,
  config,
  onUpdateOrder,
  onToggleVisibility,
  onReset,
}: DashboardSettingsModalProps) {
  const [localConfig, setLocalConfig] = useState<DashboardSectionConfig[]>(config);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  // Update local config when prop changes
  React.useEffect(() => {
    setLocalConfig(config);
  }, [config]);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
    // Set transparent drag image
    const el = e.currentTarget as HTMLElement;
    if (el) {
      el.style.opacity = '0.5';
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setDraggedId(null);
    const el = e.currentTarget as HTMLElement;
    if (el) {
      el.style.opacity = '1';
    }
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) return;

    setLocalConfig((items) => {
      const draggedIndex = items.findIndex((item) => item.id === draggedId);
      const targetIndex = items.findIndex((item) => item.id === targetId);
      
      if (draggedIndex === -1 || targetIndex === -1) return items;

      const newItems = [...items];
      const [removed] = newItems.splice(draggedIndex, 1);
      newItems.splice(targetIndex, 0, removed);
      
      // Update order numbers
      return newItems.map((item, index) => ({
        ...item,
        order: index + 1,
      }));
    });
  };

  const handleSave = () => {
    onUpdateOrder(localConfig);
    onHide();
  };

  const handleReset = () => {
    if (confirm('Opravdu chceš resetovat na výchozí pořadí?')) {
      onReset();
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header
        closeButton
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Modal.Title className="text-white d-flex align-items-center gap-2">
          <span>⚙️</span>
          Nastavení Dashboardu
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          background: '#1a1a2e',
          maxHeight: '60vh',
          overflowY: 'auto',
        }}
      >
        <p className="text-white-50 mb-4">
          Přetáhni sekce pro změnu pořadí. Kliknutím na očko je můžeš skrýt nebo zobrazit.
        </p>

        {localConfig.map((section) => (
          <div
            key={section.id}
            draggable
            onDragStart={(e) => handleDragStart(e, section.id)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => handleDragOver(e, section.id)}
            className={`d-flex align-items-center gap-3 p-3 mb-2 rounded cursor-move ${
              section.isVisible ? 'bg-dark bg-opacity-50' : 'bg-dark bg-opacity-25'
            } ${draggedId === section.id ? 'opacity-50' : ''}`}
            style={{
              transition: 'all 0.2s ease',
              border: draggedId === section.id ? '2px dashed #667eea' : '2px solid transparent',
            }}
          >
            {/* Drag Handle */}
            <div className="text-white-50" style={{ cursor: 'grab' }}>
              <span style={{ fontSize: '1.2rem' }}>⋮⋮</span>
            </div>

            {/* Order Number */}
            <div
              className="d-flex align-items-center justify-content-center rounded-circle"
              style={{
                width: '28px',
                height: '28px',
                background: 'rgba(102, 126, 234, 0.3)',
                color: '#fff',
                fontSize: '0.8rem',
                fontWeight: 'bold',
              }}
            >
              {section.order}
            </div>

            {/* Icon & Name */}
            <div className="d-flex align-items-center gap-2 flex-grow-1">
              <span style={{ fontSize: '1.5rem' }}>{section.icon}</span>
              <span className={section.isVisible ? 'text-white' : 'text-white-50'}>
                {section.name}
              </span>
            </div>

            {/* Visibility Toggle */}
            <Button
              variant={section.isVisible ? 'outline-success' : 'outline-secondary'}
              size="sm"
              onClick={() => onToggleVisibility(section.id)}
              className="d-flex align-items-center gap-2"
            >
              {section.isVisible ? <FiEye size={16} /> : <FiEyeOff size={16} />}
              <span className="d-none d-sm-inline">
                {section.isVisible ? 'Viditelné' : 'Skryté'}
              </span>
            </Button>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer
        style={{
          background: '#1a1a2e',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Button variant="outline-secondary" onClick={onHide}>
          Zrušit
        </Button>
        <Button variant="outline-warning" onClick={handleReset} className="d-flex align-items-center gap-2">
          <FiRotateCcw size={16} />
          Resetovat
        </Button>
        <Button variant="success" onClick={handleSave} className="d-flex align-items-center gap-2">
          <FiSave size={16} />
          Uložit změny
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
