declare const ga: GoogleAnalytics;

interface Window {
  dataLayer: any[];
  _gaq: any[];
  ga: GoogleAnalytics;
}

interface GoogleAnalytics {
  (...args: any[]): void;
  q: any[];
  l: number;
}
