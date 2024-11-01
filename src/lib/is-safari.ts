/**
 * Determines if the current browser is Safari.
 */
export const isSafari: boolean = /^((?!chrome|android).)*safari/i.test(
  window.navigator.userAgent,
);
