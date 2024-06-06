import Home from "./view/home";

import UserProvider from "./context/userProvider";

function App() {
  return (
    <UserProvider>
      <Home />
    </UserProvider>
  );
}

export default App;
