import React, { useState } from 'react';
import useFullstory from './sources/fullstory';
import useGoogleTagManager from './sources/google-tag-manager';
import useSegment from './sources/segment';
import useHotjar from './sources/hotjar';

export const AnalyticsContext = React.createContext({
  trackEvent: () => {},
});

// eslint-disable-next-line react/prop-types
const ReactAnalytics = ({ gtm, fullstory, hotjar, segment, children }) => {
  const [eventTrackers, setEventTrackers] = useState([]);

  const addTracker = (id, tracker) => {
    setEventTrackers((trackers) => {
      return trackers
        .filter((t) => {
          return t.id !== id;
        })
        .concat([{ id, tracker }])
        .filter((t) => {
          return !!t.tracker;
        });
    });
  };

  useGoogleTagManager(gtm, addTracker);
  useSegment(segment, addTracker);

  useFullstory(fullstory);
  useHotjar(hotjar);

  const trackEvent = (event, args) => {
    eventTrackers.forEach((track) => {
      track.tracker(event, args);
    });
  };
  // Google Tag Manager

  return <AnalyticsContext.Provider value={{ trackEvent }}>{children}</AnalyticsContext.Provider>;
};

export default ReactAnalytics;
