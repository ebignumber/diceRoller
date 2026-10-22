import { useState, useEffect, useRef } from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonTitle, IonToggle, IonToolbar, IonItem, IonLabel } from '@ionic/react';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { useSaveSettings, useGetSettings } from '../settings/settingUtils';
import type Settings from '../settings/types';
import useReadImage from '../hooks/useReadImage';

const currentSettings = await useGetSettings()

const SettingsPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(
    () => {
      (async () => {
        const path = currentSettings['custom-background-path'];
        const useCustomBackground = currentSettings['use-custom-background']
        if (path && useCustomBackground) {
          setCustomBackgroundPreview(await useReadImage(path));
        }
      })()
    }, []
  )

  const [savedSettings, setSavedSettings] = useState<Settings>(currentSettings)

  const [settings, setSettings] = useState<Settings>(currentSettings)

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

            changeSetting("custom-background-path", fileName)
            setCustomBackgroundPreview(base64Data);
            changeSetting("use-custom-background", true)
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

  function changeSetting<Property extends keyof Settings, Value extends Settings[Property]>(setting: Property, value: Value){
    setSettings(prev => ({ ...prev, [setting]: value }))
  }

  function saveSettings(){
    useSaveSettings(settings)
    setSavedSettings(settings)
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
            <IonToggle checked={settings['ten-to-zero']} onIonChange={(e) => {changeSetting("ten-to-zero", e.target.checked)}}>
              Change 10 from d10 to 0
            </IonToggle>
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
            <IonToggle checked={settings['use-custom-background']} onIonChange={(e) => {changeSetting("use-custom-background", e.target.checked)}}>
              Use Custom Background
            </IonToggle>
          </IonItem>
          <IonItem>
            <IonToggle checked={settings['notify-for-updates']} onIonChange={(e) => {changeSetting("notify-for-updates", e.target.checked)}}>
              Notify for Updates
            </IonToggle>
          </IonItem>
          <IonItem>
            <IonToggle checked={settings['confirm-before-clear']} onIonChange={(e) => {changeSetting("confirm-before-clear", e.target.checked)}}>
              Confirm Before Clear
            </IonToggle>
          </IonItem>

        </IonContent>
        <IonButton onClick={saveSettings} disabled={savedSettings === settings}>Save Changes</IonButton>
      </IonPage>
    </>
  );
};

export default SettingsPage;
