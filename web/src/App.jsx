import CustomToast from "./components/CustomToast";
import AppRoutes from "./Routes/AppRoutes";

const App = () => {
  return (
    <div className="min-h-screen ">
      <AppRoutes />
       <CustomToast />
    </div>
  );
};

export default App;
