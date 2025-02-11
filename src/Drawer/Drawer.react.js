/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';
/* eslint-enable import/no-unresolved, import/extensions */
import Container from '../Container';
import withTheme from '../styles/withTheme';

import Header from './Header.react';
import Section from './Section.react';

const propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.shape({
    container: ViewPropTypes.style,
    contentContainer: ViewPropTypes.style,
  }),
};
const defaultProps = {
  style: {},
};

function getStyles(props) {
  const { drawer } = props.theme;

  return {
    container: [drawer.container, props.style.container],
    contentContainer: [drawer.contentContainer, props.style.contentContainer],
  };
}

class Drawer extends PureComponent {
  render() {
    const { children } = this.props;

    const styles = getStyles(this.props);

    return (
      <Container>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          style={styles.container}
        >
          {children}
        </ScrollView>
      </Container>
    );
  }
}

Drawer.propTypes = propTypes;
Drawer.defaultProps = defaultProps;

Drawer.Header = Header;
Drawer.Section = Section;

export default withTheme(Drawer);
