import { RouterProvider } from "react-router-dom";
import router from "./router";
import { AuthProvider } from "./contexts/FakeAuthContext";
import { Suspense } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage";

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<SpinnerFullPage />}>
        <RouterProvider router={router} />
      </Suspense>
    </AuthProvider>
  );
}
export default App;
