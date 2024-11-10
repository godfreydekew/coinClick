// google-analytics.d.ts
declare global {
    interface Window {
      gtag: (command: string, targetId: string, config: object) => void;
    }
  }
  
  export {};
  