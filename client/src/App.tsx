import { Toaster } from "react-hot-toast";
import AppRoutes from "./Routes/AppRoutes";

const App = () => {
  return (
    <>
      <AppRoutes />
      <Toaster />
    </>
  );
};

export default App;
