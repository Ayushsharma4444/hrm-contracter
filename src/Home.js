import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, useNavigate } from "react-router-dom";
import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";

import Topbar from "./pages/global/Topbar";
import EmployeeInvoice from "./pages/EmployeeInvoice/EmployeeInvoice";
import Team from "./pages/team";
import Invoices from "./pages/invoices/Index";
import Form from "./pages/form";
import Calendar from "./pages/calendar";
import Bar from "./pages/bar";
import Line from "./pages/line";
import Pie from "./pages/pie";
import FAQ from "./pages/faq";
import Geography from "./pages/geography";
import { useEffect, useState } from "react";
import ForgotPassword from "./pages/forgotpassword/ForgotPassword";
import Profile from "./pages/Profile/Profile";
import Holiday from "./pages/Holidays/Holiday";
import Leaves from "./pages/Leaves/Leaves";
import AttendanceEmployee from "./pages/Attendance(employee)/AttendanceEmployee";
import { useStopwatch } from "react-timer-hook";
import Timestamp from "./pages/Timestamp/Timestamp";
import FillEmployee from "./pages/EmployeeInvoice/FillEmployee"
import GetContractorInvoice from "./pages/invoices/GetContractorInvoice";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [theme, colorMode] = useMode();

  useEffect(() => {
    if (!localStorage.getItem("Token")) {
      navigate("/login");
    }
  }, []);

  // const previousSession = localStorage.getItem("Timesheet").split(" ");

  // const previousHours = previousSession[0];
  // const previousMinutes = previousSession[1];

  // const stopwatchOffset = new Date();
  // stopwatchOffset.setHours(stopwatchOffset.getHours() + +previousHours);
  // stopwatchOffset.setMinutes(stopwatchOffset.getMinutes() + +previousMinutes);


  const { seconds, minutes, hours, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false});

  const [totalHours, setTotalHours] = useState("");

  useEffect(() => {
    setTotalHours(`${hours} ${minutes} ${seconds}`);
    localStorage.setItem("Timesheet", totalHours);
  }, [minutes]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
          <div style={{ height: "100%", width: "100%" }}>
            <main>
              <Topbar />
              <Routes>
                <Route path="/holiday" element={<Holiday />} />
                <Route path="/invoice/getinvoice" element={<GetContractorInvoice />} />
                {/* <Route path="/leaves" element={<Leaves />} /> */}
                <Route
                  path="/attendanceEmployee"
                  element={
                    <AttendanceEmployee
                      hours={hours}
                       minutes={minutes}
                      seconds={seconds}
                      isRunning={isRunning}
                      start={start}
                      pause={pause}
                      reset={reset}
                    />
                  }
                />
                {/* <Route path="/contacts" element={<Contacts />} /> */}
                <Route path="/timesheet/view/:pan" element={<EmployeeInvoice />} />
                <Route path="/timesheet/fill/:id" element={<FillEmployee />} />
                
                <Route path="/form" element={<Form />} />
                <Route path="/timestamp" element={<Timestamp />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/invoice" element={<Invoices />} />
                <Route path="/calendar" element={<Calendar />} />
              </Routes>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Home;
