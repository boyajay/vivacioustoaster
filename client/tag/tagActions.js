export const toggleTag = (tagName) => ({
  type: 'TOGGLE_TAG',
  payload: {
    tagName,
  },
});

export const clearTags = () => ({
  type: 'CLEAR_TAGS',
});

export const startLoad = () => ({
  type: 'START_LOAD',
});

export const endLoad = () => ({
  type: 'END_LOAD',
});
