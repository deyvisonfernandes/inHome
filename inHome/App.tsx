import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PaginaInicial from './src/pages/PaginaInicial';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <PaginaInicial />
    </SafeAreaProvider>
  );
}