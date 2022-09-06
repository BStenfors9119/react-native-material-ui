import {
  View,
  BackHandler
} from 'react-native';
// import PropTypes from 'prop-types';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';
// const ViewPropTypes = RNViewPropTypes || View.propTypes; // eslint-disable-line
const BackAndroid = BackHandler; // BackAndroid is not supported anymore in react-native.

export { ViewPropTypes, BackAndroid };
