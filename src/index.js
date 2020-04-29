import React, { useState } from 'react';
import useFullstory from './sources/fullstory';
import useGoogleTagManager from './sources/google-tag-manager';
import useSegment from './sources/segment';
import useHotjar from './sources/hotjar';

export const AnalyticsContext = React.createContext({
  trackEvent: () => {},
  identify: () => {},
  trackPage: () => {},
});

// eslint-disable-next-line react/prop-types
const ReactAnalytics = ({ gtm, fullstory, hotjar, segment, children }) => {
  const [eventTrackers, setEventTrackers] = useState([]);

  const addTracker = (id, { eventTracker, identify, trackPage }) => {
    setEventTrackers((trackers) => {
      return trackers
        .filter((t) => {
          return t.id !== id;
        })
        .concat([{ id, eventTracker, identify, trackPage }]);
    });
  };

  useGoogleTagManager(gtm, addTracker);
  useSegment(segment, addTracker);

  useFullstory(fullstory, addTracker);
  useHotjar(hotjar, addTracker);

  const trackFactory = (type) => {
    return (event, args) => {
      eventTrackers
        .filter((t) => {
          console.log('filter', type, t[type], t);
          return t[type];
        })
        .forEach((tracker) => {
          console.log('track', type, event, tracker);
          tracker[type](event, args);
        });
    };
  };

  return (
    <AnalyticsContext.Provider
      value={{
        trackEvent: trackFactory('trackEvent'),
        identify: trackFactory('identify'),
        trackPage: trackFactory('trackPage'),
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

export default ReactAnalytics;
