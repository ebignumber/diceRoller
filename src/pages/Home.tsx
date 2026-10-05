import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Counter from '../components/Counter';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
          </IonToolbar>
        </IonHeader>
        <Counter label='4 sided'/>
        <Counter label='6 sided'/>
        <Counter label='10 sided'/>
        <Counter label='12 sided'/>
        <Counter label='20 sided'/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
