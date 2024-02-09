import useAnonymousLogin from "./Hooks/firebase/useAnonymousLogin";
import Routes from "./Routes/Routes";

function App() {
  // creates anonymous user in database when first render
  useAnonymousLogin();
  return <Routes />;
}

export default App;
