import styles from "./App.module.css";
import { Home } from "./pages";

export default function App() {
  return (
    <div className={styles.container}>
      <Home />
    </div>
  );
}
