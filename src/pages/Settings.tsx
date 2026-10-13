import { useState, useEffect } from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { setSetting, getSetting } from '../hooks/settingHooks';
import './Home.css';

const Settings = () => {

  useEffect(
    () => {
      (async () => {
        setTenToZero((await getSetting("ten-to-zero")) == 'true')
      })()
    }, []
  )

  const [tenToZero, setTenToZero] = useState(true)


  function saveSettings(){
    setSetting("ten-to-zero", String(tenToZero))
  }

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
          <IonToggle checked={tenToZero} onIonChange={(e) => {setTenToZero(e.target.checked)}}>change 10 from d10 to 0</IonToggle>
        </IonContent>
        <IonButton onClick={saveSettings}>Save Changes</IonButton>
      </IonPage>
    </>
  );
};

export default Settings;
