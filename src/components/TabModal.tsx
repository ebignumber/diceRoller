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
import { Tab } from '../tabs/types';
import { emptyDice, emptyRoll } from '../dice/empty';

interface TabModalProps {
  isOpen: boolean;
  currentTabs: Tab[];
  onDidDismiss: () => void;
  onSelectTab: (index: number) => void;
  onAddTab: () => void;
}

const TabModal: React.FC<TabModalProps> = ({
  isOpen,
  onDidDismiss,
  onSelectTab,
  currentTabs,
  onAddTab
}) => {

  useEffect(() => {
    setTabs(currentTabs)
  }, [isOpen])

  const [tabs, setTabs] = useState<Tab[]>(currentTabs);

  const handleLoadTab = (tabIndex: number) => {
    onSelectTab(tabIndex);
    onDidDismiss;
  };

  const handleDeleteTab = (tabIndex: number) => {
    let updatedTabs = [...tabs]
    updatedTabs.splice(tabIndex, 1)
    setTabs(updatedTabs)
  }

  const handleAddTab = () => {
    onAddTab()
  }

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tabs</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDidDismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* Add Tab */}
        <div style={{ marginBottom: '20px' }}>
          <h3>Add Tab</h3>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <IonButton
              onClick={() => handleAddTab()}
            >
              Add Tab
            </IonButton>
          </div>
        </div>

        {/* Load Tab Section */}
        <div>
          <h3>Your Tabs</h3>
          {tabs.length === 0 ? (
            <p>No presets saved yet.</p>
          ) : (
            <IonList>
              {tabs.map((tab, index) => (
                <IonItem
                  key={index}
                >
                  <IonLabel>
                    <h2>{tab.total}</h2>
                    <p>
                      {Object.entries(tab.dice)
                        .filter(([_, count]) => count > 0)
                        .map(([key, count]) => `${count}${key}`)
                        .join(', ') || 'No dice'}
                    </p>
                    <IonButton style={{ width: "100%" }} onClick={() => handleLoadTab(index)}>Use Tab</IonButton>
                    <button 
                      style={{ position: 'absolute', top: '0', right: '0', padding: '2px', backgroundColor: 'red' }}
                      onClick={() => {handleDeleteTab(index)}}
                    >X</button>
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

export default TabModal;
