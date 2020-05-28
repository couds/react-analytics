import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import useFullstory from './sources/fullstory';
import useGoogleTagManager from './sources/google-tag-manager';
import useSegment from './sources/segment';
import useHotjar from './sources/hotjar';
import useHeyflow from './sources/heyflow';
import useCrisp from './sources/crisp';

export const AnalyticsContext = React.createContext({
  trackEvent: () => {},
  identify: () => {},
  trackPage: () => {},
});

const ReactAnalytics = ({ gtm, fullstory, hotjar, segment, heyFlow, crisp, children }) => {
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
  useHeyflow(heyFlow, addTracker);
  useCrisp(crisp, addTracker);

  const trackFactory = (type) => {
    return (event, args) => {
      eventTrackers
        .filter((t) => {
          return t[type];
        })
        .forEach((tracker) => {
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

ReactAnalytics.propTypes = {
  gtm: PropTypes.string,
  fullstory: PropTypes.string,
  hotjar: PropTypes.string,
  segment: PropTypes.string,
  heyFlow: PropTypes.string,
  crisp: PropTypes.string,
  children: PropTypes.node,
};

ReactAnalytics.defaultProps = {
  gtm: undefined,
  fullstory: undefined,
  hotjar: undefined,
  segment: undefined,
  children: undefined,
  heyFlow: undefined,
  crisp: undefined,
};

export const useAnalytics = () => useContext(AnalyticsContext);

export default ReactAnalytics;
