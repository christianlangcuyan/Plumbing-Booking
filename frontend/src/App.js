import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import Quotes from "./pages/Quotes";
import WorkOrder from "./pages/workOrders";
import Form from './pages/WorkOrderForm'
import Schedule from "./pages/Schedule";
import Employee from "./pages/Employee";
import Reports from "./pages/Reports";
// import WorkOrderform from "./scenes/form";

function App() {

  const [theme, colorMode] = useMode();
  return (<ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Sidebar />
        <main className="content">
          <Topbar />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/workOrderform" element={<WorkOrderForm />} /> */}
            <Route path="/Quotes" element={<Quotes />} />
            <Route path="/WorkOrder" element={<WorkOrder />} />
            <Route path="/WorkOrder/Form" element={<Form />} />
            <Route path="/Schedule" element={<Schedule />} />
            <Route path="/Employee" element={<Employee />} />
            <Route path="/Reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
  );
}

export default App;
