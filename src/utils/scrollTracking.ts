import { trackEvent } from './analytics';

// Non-hook scroll tracking for initialization
export const initializeScrollTracking = () => {
  const trackedDepths = new Set<number>();
  const startTime = Date.now();

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);

    // Track scroll milestones: 25%, 50%, 75%, 90%
    const milestones = [25, 50, 75, 90];
    
    milestones.forEach(milestone => {
      if (scrollPercentage >= milestone && !trackedDepths.has(milestone)) {
        trackedDepths.add(milestone);
        
        trackEvent({
          action: 'scroll',
          category: 'engagement',
          label: `${milestone}%`,
          value: milestone,
          customParameters: {
            scroll_depth: milestone,
            page_path: window.location.pathname,
            time_to_depth: Date.now() - startTime
          }
        });
      }
    });
  };

  const handleBeforeUnload = () => {
    const timeOnPage = Math.round((Date.now() - startTime) / 1000);
    
    trackEvent({
      action: 'time_on_page',
      category: 'engagement',
      value: timeOnPage,
      customParameters: {
        time_seconds: timeOnPage,
        page_path: window.location.pathname,
        max_scroll_depth: Math.max(...Array.from(trackedDepths), 0)
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('beforeunload', handleBeforeUnload);

  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
};

// Track section visibility (non-hook version)
export const trackSectionVisibility = (element: HTMLElement, sectionName: string, threshold = 0.5) => {
  let hasTracked = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasTracked) {
          hasTracked = true;
          
          trackEvent({
            action: 'section_view',
            category: 'navigation',
            label: sectionName,
            customParameters: {
              section_name: sectionName,
              intersection_ratio: entry.intersectionRatio
            }
          });
        }
      });
    },
    { threshold }
  );

  observer.observe(element);

  return () => {
    observer.unobserve(element);
  };
};

// React hook versions (for components that can use hooks)
import { useEffect, useRef } from 'react';

// Track scroll depth milestones
export const useScrollTracking = () => {
  const trackedDepths = useRef(new Set<number>());
  const startTime = useRef<number>(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);

      // Track scroll milestones: 25%, 50%, 75%, 90%
      const milestones = [25, 50, 75, 90];
      
      milestones.forEach(milestone => {
        if (scrollPercentage >= milestone && !trackedDepths.current.has(milestone)) {
          trackedDepths.current.add(milestone);
          
          trackEvent({
            action: 'scroll',
            category: 'engagement',
            label: `${milestone}%`,
            value: milestone,
            customParameters: {
              scroll_depth: milestone,
              page_path: window.location.pathname,
              time_to_depth: Date.now() - startTime.current
            }
          });
        }
      });
    };

    const handleBeforeUnload = () => {
      const timeOnPage = Math.round((Date.now() - startTime.current) / 1000);
      
      trackEvent({
        action: 'time_on_page',
        category: 'engagement',
        value: timeOnPage,
        customParameters: {
          time_seconds: timeOnPage,
          page_path: window.location.pathname,
          max_scroll_depth: Math.max(...Array.from(trackedDepths.current), 0)
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
};

// Track section visibility
export const useSectionTracking = (sectionName: string, threshold = 0.5) => {
  const ref = useRef<HTMLElement>(null);
  const hasTracked = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTracked.current) {
            hasTracked.current = true;
            
            trackEvent({
              action: 'section_view',
              category: 'navigation',
              label: sectionName,
              customParameters: {
                section_name: sectionName,
                intersection_ratio: entry.intersectionRatio
              }
            });
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [sectionName, threshold]);

  return ref;
}; 