import TextManager from '../mechanics/TextManager';

export const SET_TEXT_DATA = 'SET_TEXT_DATA';
export const SET_LINK_NODES_DATA = 'SET_LINK_NODES_DATA';
export const SET_CHOICES_DATA = 'SET_CHOICES_DATA';
export const SET_ALL_DATA = 'SET_ALL_DATA';
export const SET_LOADING = 'SET_LOADING';

export const setTextData = data => ({
  type: SET_TEXT_DATA,
  data,
});

export const setLinkNodesData = data => ({
  type: SET_LINK_NODES_DATA,
  data,
});

export const setChoicesData = data => ({
  type: SET_CHOICES_DATA,
  data,
});

export const setAllData = (textData, linkNodesData, choicesData) => ({
  type: SET_ALL_DATA,
  textData,
  linkNodesData,
  choicesData,
});

export const setLoading = loading => ({
  type: SET_LOADING,
  loading,
});

export const loadModuleData = moduleNumber => dispatch => (
  TextManager.loadModuleAsync(moduleNumber).then(data => (
    dispatch(setAllData(data.textData, data.linkNodesData, data.choicesData))
  ))
);
