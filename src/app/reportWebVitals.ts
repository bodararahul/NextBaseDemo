import { useReportWebVitals } from 'next/web-vitals';
import { NextWebVitalsMetric } from 'next/app';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';

export function useMyReportWebVitals() {
  const pathname = usePathname();

  useEffect(() => {
    ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID);
  }, []);

  useEffect(() => {
    if (pathname) {
      // pageview(pathname);
      ReactGA.send({
        hitType: 'pageview',
        page: pathname,
      });
    }
  }, [pathname]);

  useReportWebVitals(({ id, name, value }: NextWebVitalsMetric) => {
    ReactGA.event({
      category: 'web-vital',
      label: id, // Needed to aggregate events.
      value: Math.round(name === 'CLS' ? value * 1000 : value), // Optional
      nonInteraction: true, // avoids affecting bounce rate.
      action: 'web-vital',
    });
  });
}
