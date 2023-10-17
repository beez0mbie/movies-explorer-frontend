import {
  DESKTOP_MIN_WIDTH,
  MOBILE_MAX_WIDTH,
  DESKTOP_CARDS_TO_SHOW,
  TABLET_CARDS_TO_SHOW,
  MOBILE_CARDS_TO_SHOW,
} from './constants';

export const getMaxPossibleCards = (windowWidth) => {
  if (windowWidth >= DESKTOP_MIN_WIDTH) {
    return DESKTOP_CARDS_TO_SHOW;
  } else if (windowWidth < DESKTOP_MIN_WIDTH && windowWidth > MOBILE_MAX_WIDTH) {
    return TABLET_CARDS_TO_SHOW;
  } else {
    return MOBILE_CARDS_TO_SHOW;
  }
};
