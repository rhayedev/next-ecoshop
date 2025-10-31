'use client';
import { useEffect } from "react";
import { reportWebVitals } from '../client/reportWebVitals';

export default function WebVitalsLogger() {
  useEffect(() => {
    reportWebVitals();
  }, []);
  return null;
}