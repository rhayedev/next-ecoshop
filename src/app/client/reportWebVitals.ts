import { onCLS, onLCP, onINP, onTTFB } from 'web-vitals';

export function reportWebVitals() {
  onCLS(console.log);
  onLCP(console.log);
  onINP?.(console.log);
  onTTFB(console.log);
}