import useAnonymousLogin from "./Hooks/firebase/useAnonymousLogin";
import Routes from "./Routes/Routes";
import UserAuthContextProvider from "./components/Context/UserAuthContext";

function App() {
  useAnonymousLogin();

  return (
    <UserAuthContextProvider>
      <Routes />
    </UserAuthContextProvider>
  );
}

export default App;
