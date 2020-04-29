# React-Analytics

A utility that centralize several analytics systems. This library add the neccesary scripts to run the analytics that are used on your system


Currently supports:

- [Google Tag Manager](https://tagmanager.google.com/)
- [Hotjar](https://www.hotjar.com/)
- [FullStory](https://www.fullstory.com/)
- [Segment](https://segment.com/)

## Instalation

```
npm i --save @couds/react-analytics
```

## Usage

After installing you just need to add the AnalyticsContext to on your top view, this will add only the scripts that you need (if you only pass the gtm prop will not download the rest of services for example)

```jsx
import React from 'react';
import Analytics from '@couds/react-analytics';

const App = () => {
  return (
    <Analytics gtm="XXXX" hotjar="XXXX" segment="XXXX" fullstory="xxxx">
      {/* The rest of your app */}
    </Analytics>
  );
};

export default App;
```

```jsx
import React, { useEffect, useContext } from 'react';
import { AnalyticsContext } from 'views/components/analytics';

const MyInnerView = () => {
  const { trackEvent, identify, trackPage } = useContext(AnalyticsContext);
  useEffect(() => {
    // Track this page
    trackPage();

    // Identify user on analytids that allow indentifying
    identify('user-id', {
      name: 'test',
      otherprop: 2,
    });
  }, []);

  const onClick = () => {
    // You can send custom events this way
    trackEvent('my-custom-event', {
      prop1: 'custom value',
    });
  };

  return (
    ...
  );
}

```


## NOTES:

- For Google Tag Manager we can't send the native **PageView** event `gtm.js`, because it send a event `undefined`, We send a custom event named `pageView`.

To setup the tracking when the user navigate you should create a new trigger of tyoe `Custom Event` wieh the event name `pageView`