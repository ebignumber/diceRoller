import { useState, useEffect } from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import './Home.css';

const Settings = () => {
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton autoHide={false}> 
              </IonMenuButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
            </IonToolbar>
          </IonHeader>
          Welcome to Settings!
        </IonContent>
      </IonPage>
    </>
  );
};

export default Settings;
