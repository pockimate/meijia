export default defineNuxtPlugin(() => {
  if (process.client && 'PerformanceObserver' in window) {
    // Monitor Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      const lcpValue = lastEntry.renderTime || lastEntry.loadTime;
      
      console.log('🎯 LCP:', lcpValue.toFixed(2) + 'ms', lcpValue < 2500 ? '✅' : '⚠️');
      
      // Send to analytics (optional)
      // analytics.track('web_vitals', { metric: 'LCP', value: lcpValue });
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Monitor First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        const fidValue = entry.processingStart - entry.startTime;
        console.log('⚡ FID:', fidValue.toFixed(2) + 'ms', fidValue < 100 ? '✅' : '⚠️');
        
        // Send to analytics (optional)
        // analytics.track('web_vitals', { metric: 'FID', value: fidValue });
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Monitor Cumulative Layout Shift (CLS)
    let clsScore = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutShift = entry as any;
        if (!layoutShift.hadRecentInput) {
          clsScore += layoutShift.value;
          console.log('📐 CLS:', clsScore.toFixed(4), clsScore < 0.1 ? '✅' : '⚠️');
          
          // Send to analytics (optional)
          // analytics.track('web_vitals', { metric: 'CLS', value: clsScore });
        }
      }
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // Monitor Time to First Byte (TTFB)
    const navigationObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        const ttfb = entry.responseStart - entry.requestStart;
        console.log('🚀 TTFB:', ttfb.toFixed(2) + 'ms', ttfb < 600 ? '✅' : '⚠️');
        
        // Send to analytics (optional)
        // analytics.track('web_vitals', { metric: 'TTFB', value: ttfb });
      });
    });
    navigationObserver.observe({ entryTypes: ['navigation'] });

    // Log performance summary on page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0] as any;
        
        console.log('📊 Performance Summary:');
        console.log('  DOM Content Loaded:', perfData.domContentLoadedEventEnd.toFixed(2) + 'ms');
        console.log('  Load Complete:', perfData.loadEventEnd.toFixed(2) + 'ms');
        console.log('  DOM Interactive:', perfData.domInteractive.toFixed(2) + 'ms');
      }, 0);
    });
  }
});
