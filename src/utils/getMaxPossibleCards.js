import {
  desktopMinWidth,
  mobileMaxWidth,
  desktopCardsToShow,
  tabletCardsToShow,
  mobileCardsToShow,
  minChunk,
  maxChunk,
  moviesStore,
} from './constants';

export const getMaxPossibleCards = (windowWidth) => {
  if (windowWidth >= desktopMinWidth) {
    return desktopCardsToShow;
  } else if (windowWidth < desktopMinWidth && windowWidth > mobileMaxWidth) {
    return tabletCardsToShow;
  } else {
    return mobileCardsToShow;
  }
};