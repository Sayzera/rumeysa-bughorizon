import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Contacts from "./scenes/contacts";
import Invoices from "./scenes/invoices";
import Form from "./scenes/form";
import Calendar from "./scenes/calendar";
import Bar from "./scenes/bar";
import Pie from "./scenes/pie";
import Stream from "./scenes/stream";
import Line from "./scenes/line";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import XSSPage from "./scenes/xss";
import SQLInjectionPage from "./scenes/sql-injection";
import CSRFPage from "./scenes/csrf";
import BrokenAuthPage from "./scenes/broken-auth";
import SecurityMisconfigPage from "./scenes/security-misconfig";
import SSRFPage from "./scenes/ssrf";
import CSPPage from "./scenes/csp";
import LoggingPage from "./scenes/logging";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/xss" element={<XSSPage />} />
      <Route path="/sql-injection" element={<SQLInjectionPage />} />
      <Route path="/csrf" element={<CSRFPage />} />
      <Route path="/broken-auth" element={<BrokenAuthPage />} />
      <Route path="/security-misconfig" element={<SecurityMisconfigPage />} />
      <Route path="/ssrf" element={<SSRFPage />} />
      <Route path="/csp" element={<CSPPage />} />
      <Route path="/logging" element={<LoggingPage />} />
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
    </Routes>
  );
};

export default AppRouter;
