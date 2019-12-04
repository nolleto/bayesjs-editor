import { CHANGE_NETWORK_PROPERTY, LOAD_NETWORK, NEW_NETWORK } from 'actions';
import { updateNetworkProperty } from 'utils/network';
import { pathOr } from 'ramda';

const defaultValue = 500;
const getNetworkHeight = pathOr(defaultValue, ['payload', 'state', 'network', 'height']);
const updateProperty = updateNetworkProperty('height');

export default (state = defaultValue, action) => {
  switch (action.type) {
    case LOAD_NETWORK:
      return getNetworkHeight(action);
    case NEW_NETWORK:
      return defaultValue;
    case CHANGE_NETWORK_PROPERTY:
      return updateProperty(state, action);
    default:
      return state;
  }
};