import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AmbulanceDispatch from './pages/ambulance-dispatch';
import FirstAidGuidance from './pages/first-aid-guidance';
import EmergencyCallInterface from './pages/emergency-call-interface';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AmbulanceDispatch />} />
        <Route path="/ambulance-dispatch" element={<AmbulanceDispatch />} />
        <Route path="/first-aid-guidance" element={<FirstAidGuidance />} />
        <Route path="/emergency-call-interface" element={<EmergencyCallInterface />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
