import useAnonymousLogin from "./Hooks/firebase/useAnonymousLogin";
import Routes from "./Routes/Routes";
import UserAuthContextProvider from "./components/Context/UserAuthContext";
import ErrorBoundary from "./components/ErrorBoundray/ErrorBoundary";

function App() {
  useAnonymousLogin();

  return (
    <ErrorBoundary>
      <UserAuthContextProvider>
        <Routes />
      </UserAuthContextProvider>
    </ErrorBoundary>
  );
}

export default App;
