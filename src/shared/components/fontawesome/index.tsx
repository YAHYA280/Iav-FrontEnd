'use client';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

// Tell Font Awesome to skip adding the CSS automatically since it's already imported above
config.autoAddCss = false;

// Export FontAwesome components
export { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export { library } from '@fortawesome/fontawesome-svg-core';

// Import and add icons to library
import {
  faChartBar,
  faLink,
  faShoppingCart,
  faChartLine,
  faGift,
  faCog,
  faBook,
  faBell,
  faUser,
  faCoins,
  faBars,
  faTimes,
  faComment,
  faChevronLeft,
  faChevronRight,
  faLightbulb,
  faCalendarDays,
  faImages,
  faCheck,
  faPlus
} from '@fortawesome/free-solid-svg-icons';

import { library } from '@fortawesome/fontawesome-svg-core';

library.add(
  faChartBar,
  faLink,
  faShoppingCart,
  faChartLine,
  faGift,
  faCog,
  faBook,
  faBell,
  faUser,
  faCoins,
  faBars,
  faTimes,
  faComment,
  faChevronLeft,
  faChevronRight,
  faLightbulb,
  faCalendarDays,
  faImages,
  faCheck,
  faPlus
);
