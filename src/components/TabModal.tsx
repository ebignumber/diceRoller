import React, { useState, useEffect } from 'react';
import {
  IonModal,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonIcon
} from '@ionic/react';
import { Tab } from '../tabs/types';
import { emptyDice, emptyRoll } from '../dice/empty';
import { add } from 'ionicons/icons'

interface TabModalProps {
  isOpen: boolean;
  currentTabs: Tab[];
  onDidDismiss: () => void;
  onSelectTab: (index: number) => void;
  onUpdateTabs: (newTabs: Tab[]) => void;
  selectedTab: number;
}

const TabModal: React.FC<TabModalProps> = ({
  isOpen,
  onDidDismiss,
  onSelectTab,
  currentTabs,
  onUpdateTabs,
  selectedTab
}) => {

  const [tabs, setTabs] = useState<Tab[]>(currentTabs);

  const handleLoadTab = (tabIndex: number) => {
    onSelectTab(tabIndex);
    onDidDismiss();
  };

  const handleDeleteTab = (tabIndex: number) => {
    let updatedTabs = [...tabs]
    updatedTabs.splice(tabIndex, 1)
    setTabs(updatedTabs)
    onUpdateTabs(updatedTabs)
    if(selectedTab == tabIndex){
      onSelectTab(updatedTabs.length - 1)
    }
    else if(tabIndex < selectedTab){
      console.log("isNotEqual")
      onSelectTab(selectedTab - 1)
    }

  }

  const handleAddTab = () => {
    let updatedTabs = [...tabs];
    updatedTabs.push({dice: emptyDice, total: 0, lastRoll: emptyRoll});
    setTabs(updatedTabs);
    onUpdateTabs(updatedTabs);
    onSelectTab(tabs.length);
    onDidDismiss();
  }

  const gridColumns = tabs.length === 1 ? '1fr' : '1fr 1fr';

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tabs</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => {handleAddTab()}}>
              <IonIcon icon={add}></IonIcon>
            </IonButton>
            <IonButton onClick={onDidDismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        {/* Load Tab Section */}
        <div>
          <h3>Your Tabs</h3>
          {tabs.length === 0 ? (
            <p>No presets saved yet.</p>
          ) : (
            <IonList 
              lines='none'
              style={{ display: 'grid', gridTemplateColumns: gridColumns, gap: '10px' }}
            >
              {tabs.map((tab, index) => (
                <IonItem
                  key={index}
                  onClick={() => {handleLoadTab(index)}}
                  style={{ border: (index == selectedTab ? '5px' : '1px') +  ' white solid', borderRadius: "9px" }}
                >
                
                  <IonLabel
                  >
                    <h2>{tab.total}</h2>
                    <p>
                      {Object.entries(tab.dice)
                        .filter(([_, count]) => count > 0)
                        .map(([key, count]) => `${count}${key}`)
                        .join(', ') || 'No dice'}
                    </p>
                    <button 
                      style={{ position: 'absolute', top: '0', right: '0', padding: '2px', backgroundColor: 'red' }}
                      onClick={(e) => {e.stopPropagation(); handleDeleteTab(index)}}
                      disabled={tabs.length == 1}
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
