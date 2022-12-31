import { Navigate, Route, Routes } from "react-router-dom";
import { Cheatsheet } from "./pages/Cheatsheet";
import { CheatsheetList } from "./pages/CheatsheetList";
import Login from "./pages/Login";
import { AuthProvider } from "./Utils/AuthProvider";
import { Layout } from "./pages/Layout";
import { RequireAuth } from "./Utils/RequireAuth";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="" element={<Navigate to="cheatsheets"/>} />
            <Route path="cheatsheets" element={<CheatsheetList />} />
            <Route path="cheatsheets/:id" element={
                <RequireAuth>
                  <Cheatsheet />
                </RequireAuth>
              }
            />
            <Route path="register" element={<Register />}/>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<p>Hola, no hay nada aqui</p>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
