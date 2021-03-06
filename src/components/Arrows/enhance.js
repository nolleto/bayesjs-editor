import {
  compose,
  pure,
  withStateHandlers,
  withHandlers,
} from 'recompose';
import { equals, isNil } from 'ramda';

const isKeyFocused = (key, keyFocus) => isNil(keyFocus) || equals(key, keyFocus);

const enhance = compose(
  pure,
  withStateHandlers(
    ({ initialKeyFocus = null }) => ({
      keyFocus: initialKeyFocus,
    }),
    {
      setArrowFocus: () => keyFocus => ({
        keyFocus,
      }),
      resetArrowFocus: (_, { initialKeyFocus }) => () => ({
        keyFocus: initialKeyFocus,
      }),
    },
  ),
  withHandlers({
    getStrokeOpacity: () => (key, keyFocused) => isKeyFocused(key, keyFocused) ? 1 : 0.2,
    getMarkEndStyle: () => (key, keyFocused) =>
      isKeyFocused(key, keyFocused)
        ? 'url(#triangle)'
        : 'url(##triangle-with-low-opacity)',
    onMouseOver: ({ setArrowFocus }) => (_, arrowKey) => setArrowFocus(arrowKey),
    onMouseLeave: ({ resetArrowFocus }) => (_, arrowKey) => resetArrowFocus(arrowKey),
  }),
);

export default enhance;
