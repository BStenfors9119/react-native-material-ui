/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {TextPropTypes, ViewPropTypes} from 'deprecated-react-native-prop-types';
import { View, Text, StyleSheet, Image } from 'react-native';
/* eslint-enable import/no-unresolved, import/extensions */
import Icon from '../Icon';
import withTheme from '../styles/withTheme';

const propTypes = {
  /**
   * If passed in, this component will render image.
   */
  image: PropTypes.element,
  /**
   * If passed in, this component will render icon element inside avatar.
   */
  icon: PropTypes.string,
  /**
   * If passed in, this component will render an icon with this color.
   */
  iconColor: PropTypes.string,
  /**
   * If passed in, this component will render an icon with this size.
   */
  iconSize: PropTypes.number,
  /**
   * If passed in, this component will render text element inside avatar.
   */
  text: PropTypes.string,
  /**
   * It's just sugar for: style: { width: size, height: size, borderRadius: size / 2 }
   */
  size: PropTypes.number,
  /**
   * Inline style of avatar
   */
  style: PropTypes.shape({
    container: ViewPropTypes.style,
    content: TextPropTypes.style, // eslint-disable-line
  }),
  iconSet: PropTypes.string,
  /**
   * Theme
   */
  theme: PropTypes.any, // eslint-disable-line
};
const defaultProps = {
  image: null,
  icon: null,
  iconColor: null,
  iconSize: null,
  text: null,
  size: 48,
  style: {},
  iconSet: null,
};

function getStyles(props) {
  const { size, theme } = props;
  const { avatar } = theme;

  const local = {};

  if (size) {
    local.container = {
      height: size,
      width: size,
      borderRadius: size / 2,
    };
  }

  return {
    container: [avatar.container, local.container, props.style.container],
    content: [avatar.content, local.content, props.style.content],
  };
}

class Avatar extends PureComponent {
  render() {
    const {
      image,
      icon,
      iconSet,
      iconSize,
      iconColor,
      text,
      theme,
      size,
    } = this.props;
    const { avatar, spacing } = theme;

    let content = null;

    const styles = getStyles(this.props);

    if (icon) {
      content = (
        <Icon
          iconSet={iconSet}
          name={icon}
          color={iconColor || StyleSheet.flatten(avatar.content).color}
          size={iconSize || spacing.iconSize}
        />
      );
    } else if (text) {
      content = <Text style={styles.content}>{text}</Text>;
    } else if (React.isValidElement(image)) {
      content = image;
    } else if (typeof image === 'string') {
      content = (
        <Image
          style={{ width: size, height: size, borderRadius: size / 2 }}
          source={{ uri: image }}
        />
      );
    }

    return (
      <View style={{ flexGrow: 1 }}>
        <View style={styles.container}>{content}</View>
      </View>
    );
  }
}

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default withTheme(Avatar);
