import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { HealthScreen } from './src/features/health/screens/HealthScreen';
import { getFirebaseClientApp } from './src/config/firebase';

export default function App() {
  useEffect(() => {
    getFirebaseClientApp();
  }, []);

  return (
    <>
      <HealthScreen />
      <StatusBar style="auto" />
    </>
  );
}
