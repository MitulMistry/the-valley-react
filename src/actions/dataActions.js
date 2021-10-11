export const SET_TEXT_DATA = "SET_TEXT_DATA";
export const SET_LINKS_DATA = "SET_LINKS_DATA";
export const SET_CHOICES_DATA = "SET_CHOICES_DATA";

export const setTextData = data => ({
  type: SET_TEXT_DATA,
  data,
});

export const setLinksData = data => ({
  type: SET_LINKS_DATA,
  data,
});

export const setChoicesData = data => ({
  type: SET_CHOICES_DATA,
  data,
});