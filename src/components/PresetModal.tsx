import React, { useState, useEffect } from 'react';
import {
  IonModal,
  IonButton,
  IonInput,
  IonList,
  IonItem,
  IonLabel,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
} from '@ionic/react';
import { DiceConfig } from '../dice/types';
import DicePreset from '../presets/types';
import { useGetPresets, useSavePreset } from '../presets/presetUtils';

interface PresetModalProps {
  isOpen: boolean;
  onDidDismiss: () => void;
  currentDice: DiceConfig;
  onLoadPreset: (dice: DiceConfig) => void;
}

const PresetModal: React.FC<PresetModalProps> = ({
  isOpen,
  onDidDismiss,
  currentDice,
  onLoadPreset,
}) => {
  const [presets, setPresets] = useState<DicePreset[]>([]);
  const [newPresetName, setNewPresetName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Load presets when modal opens
  useEffect(() => {
    if (isOpen) {
      const loadPresets = async () => {
        const loadedPresets = await useGetPresets();
        setPresets(loadedPresets);
      };
      loadPresets();
    }
  }, [isOpen]);

  const handleSavePreset = async () => {
    if (!newPresetName.trim()) {
      return;
    }

    setIsSaving(true);
    try {
      await useSavePreset(currentDice, newPresetName.trim());
      const updatedPresets = await useGetPresets();
      setPresets(updatedPresets);
      setNewPresetName('');
    } catch (error) {
      console.error('Failed to save preset:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLoadPreset = (preset: DicePreset) => {
    onLoadPreset(preset.dice);
    onDidDismiss();
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Presets</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDidDismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Save Preset Section */}
        <div style={{ marginBottom: '20px' }}>
          <h3>Save Current Configuration</h3>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <IonInput
              value={newPresetName}
              placeholder="Enter preset name"
              onIonChange={(e) => setNewPresetName(e.detail.value || '')}
              style={{ flexGrow: 1 }}
            />
            <IonButton
              onClick={handleSavePreset}
              disabled={!newPresetName.trim() || isSaving}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </IonButton>
          </div>
        </div>

        {/* Load Preset Section */}
        <div>
          <h3>Your Presets</h3>
          {presets.length === 0 ? (
            <p>No presets saved yet.</p>
          ) : (
            <IonList>
              {presets.map((preset, index) => (
                <IonItem
                  key={index}
                  button
                  onClick={() => handleLoadPreset(preset)}
                >
                  <IonLabel>
                    <h2>{preset.name}</h2>
                    <p>
                      {Object.entries(preset.dice)
                        .filter(([_, count]) => count > 0)
                        .map(([key, count]) => `${key}: ${count}`)
                        .join(', ') || 'No dice'}
                    </p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          )}
        </div>
      </IonContent>
    </IonModal>
  );
};

export default PresetModal;
