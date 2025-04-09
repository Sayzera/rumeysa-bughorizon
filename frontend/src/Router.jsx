import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import {
  Dashboard,
  Team,
  Invoices,
  Contacts,
  Form,
  Bar,
  Line,
  Pie,
  FAQ,
  Geography,
  Calendar,
  Stream,
} from "./scenes";
import Register from "./scenes/auth/register";
import Login from "./scenes/auth/login";
import BrokenAuthScreen from "./scenes/broken-auth";
import SqlInjectionScreen from "./scenes/sql-injection";
import SecurityMisconfigScreen from "./scenes/security-misconfig";
import XssScreen from "./scenes/xss";
import CsrfScreen from "./scenes/csrf"
import LoggingDeficienciesScreen from "./scenes/logging-deficiencies"
import SsrfScreen from "./scenes/ssrf"
import CspScreen from "./scenes/csp"

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          

          <Route path="/broken-auth" element={<BrokenAuthScreen />} />
          <Route path="/sql-injection" element={<SqlInjectionScreen />} />
          <Route path="/xss" element={<XssScreen />} />
          <Route path="/security-misconfig" element={<SecurityMisconfigScreen />} />
          <Route path="/csrf" element={<CsrfScreen />} />
          <Route path="/logging-deficiencies" element={<LoggingDeficienciesScreen />} />
          <Route path="/ssrf" element={<SsrfScreen />} />
          <Route path="/csp" element={<CspScreen />} />

          <Route path="/team" element={<Team />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/form" element={<Form />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/bar" element={<Bar />} />
          <Route path="/pie" element={<Pie />} />
          <Route path="/stream" element={<Stream />} />
          <Route path="/line" element={<Line />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/geography" element={<Geography />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
