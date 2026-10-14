import { useState, useEffect, useRef } from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonTitle, IonToggle, IonToolbar, IonItem, IonLabel } from '@ionic/react';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { setSetting, getSetting } from '../hooks/settingHooks';
import './Home.css';

const Settings = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(
    () => {
      (async () => {
        setTenToZero((await getSetting("ten-to-zero")) !== 'false')
        const useCustom = (await getSetting("use-custom-background")) === 'true';
        const path = await getSetting("custom-background-path");
        if (path) {
          setCustomBackground(path);
          setUseCustomBackground(useCustom);
          try {
            const file = await Filesystem.readFile({
              path: path,
              directory: Directory.Data,
            });
            setCustomBackgroundPreview(`data:image/jpeg;base64,${file.data}`);
          } catch (error) {
            console.error('Error loading preview:', error);
          }
        }
      })()
    }, []
  )

  const [tenToZero, setTenToZero] = useState(true)
  const [useCustomBackground, setUseCustomBackground] = useState(false)
  const [customBackground, setCustomBackground] = useState('')
  const [customBackgroundPreview, setCustomBackgroundPreview] = useState('')

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const base64Data = e.target?.result as string;
          if (base64Data) {
            const base64String = base64Data.split(',')[1];
            const fileExt = file.name.split('.').pop() || 'jpg';
            const fileName = `background_${Date.now()}.${fileExt}`;
            
            await Filesystem.writeFile({
              path: fileName,
              data: base64String,
              directory: Directory.Data,
            });
            
            setCustomBackground(fileName);
            setCustomBackgroundPreview(base64Data);
            setUseCustomBackground(true);
          }
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
  };

  const triggerFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  function saveSettings(){
    setSetting("ten-to-zero", String(tenToZero))
    setSetting("use-custom-background", String(useCustomBackground))
    if (useCustomBackground && customBackground) {
      setSetting("custom-background-path", customBackground)
    } else {
      setSetting("custom-background-path", "")
    }
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
          <IonItem>
            <IonToggle checked={tenToZero} onIonChange={(e) => {setTenToZero(e.target.checked)}}>Change 10 from d10 to 0</IonToggle>
          </IonItem>
          <IonItem>
            <IonLabel>Custom Background</IonLabel>
            <IonButton onClick={triggerFilePicker}>Select Image</IonButton>
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept="image/*" 
              onChange={handleFileChange}
            />
          </IonItem>
          {customBackgroundPreview && (
            <IonItem>
              <IonLabel>Background Preview</IonLabel>
              <img src={customBackgroundPreview} style={{ maxWidth: '100px', maxHeight: '100px' }} />
            </IonItem>
          )}
          <IonItem>
            <IonToggle checked={useCustomBackground} onIonChange={(e) => setUseCustomBackground(e.target.checked)}>
              Use Custom Background
            </IonToggle>
          </IonItem>
        </IonContent>
        <IonButton onClick={saveSettings}>Save Changes</IonButton>
      </IonPage>
    </>
  );
};

export default Settings;
