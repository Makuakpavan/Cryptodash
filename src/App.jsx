import { AppProvider } from "./context/AppContext";
import CryptoDashApp from "./components/CryptoDashApp";

export default function App() {
  return (
    <AppProvider>
      <CryptoDashApp />
    </AppProvider>
  );
}


