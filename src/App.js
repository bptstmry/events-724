/* istanbul ignore file */

/* Ce composant `App` est le point d'entrée principal de l'application. */
/* Il utilise le contexte `DataProvider` pour fournir des données à tous les composants. */

import "./App.scss";
import Page from "./pages/Home";
import { DataProvider } from "./contexts/DataContext";

function App() {
  return (
    <DataProvider>
      <Page />
    </DataProvider>
  );
}

export default App;
