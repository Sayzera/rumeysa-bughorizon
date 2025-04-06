import React, { createContext, useContext, useState, useEffect } from 'react';

const TestCountContext = createContext();

export const TestCountProvider = ({ children }) => {
  const [testCounts, setTestCounts] = useState({
    xss: 0,
    sqlInjection: 0,
    csrf: 0,
    brokenAuth: 0,
    securityMisconfig: 0,
    ssrf: 0,
    csp: 0,
    loggingDeficiencies: 0
  });

  // Load test counts from localStorage
  useEffect(() => {
    const savedCounts = localStorage.getItem('vulnerabilityTestCounts');
    if (savedCounts) {
      setTestCounts(JSON.parse(savedCounts));
    }
  }, []);

  // Save test counts to localStorage
  useEffect(() => {
    localStorage.setItem('vulnerabilityTestCounts', JSON.stringify(testCounts));
  }, [testCounts]);

  const incrementTestCount = (vulnerability) => {
    setTestCounts(prev => ({
      ...prev,
      [vulnerability]: prev[vulnerability] + 1
    }));
  };

  return (
    <TestCountContext.Provider value={{ testCounts, incrementTestCount }}>
      {children}
    </TestCountContext.Provider>
  );
};

export const useTestCount = () => {
  const context = useContext(TestCountContext);
  if (!context) {
    throw new Error('useTestCount must be used within a TestCountProvider');
  }
  return context;
}; 