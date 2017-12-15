// Libraries
import React, { Component } from 'react';
import { View, Image, StatusBar, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux';
// Actions
import { HomeAction } from '../../../reducers/Actions';
// Styles
import { styles, container } from '../../../assets/stylesheets/global/Style';
import { percent } from '../../../assets/stylesheets/global/Scale';
// Icons
import { NAV_ICONS } from '../../../assets/images/Icon';

class TopNavbar extends Component {
  state = {
    navState: [
      {
        navigate: () => this.props.navigation.dispatch({ type: HomeAction.GO }),
      },
      {
        navigate: () =>
          this.props.navigation.dispatch({ type: HomeAction.MAIN }),
      },
      {
        navigate: () =>
          this.props.navigation.dispatch({ type: HomeAction.SETTING }),
      },
    ],
  };

  _renderButton = ({ item, index }) => {
    const renderIcon =
      this.props.navIndex === index
        ? NAV_ICONS[index].ON
        : NAV_ICONS[index].OFF;

    return (
      <TouchableOpacity
        style={[styles.flex_1, styles.verticalCenter]}
        activeOpacity={1}
        onPress={() => {
          item.navigate();
          this.carousel.snapToItem(index);
        }}
      >
        <Image key={renderIcon} source={renderIcon} style={styles.navbarLogo} />
      </TouchableOpacity>
    );
  };

  render() {
    const { navIndex, disableNavbar } = this.props;

    return (
      <View
        style={[
          disableNavbar ? styles.displayNone : container.navbarContainer,
          styles.alignCenter,
        ]}
      >
        <StatusBar translucent barStyle="light-content" />
        <View style={styles.flex_1}>
          <Carousel
            ref={c => {
              this.carousel = c;
            }}
            data={this.state.navState}
            renderItem={this._renderButton}
            sliderWidth={percent('width', 100)}
            itemWidth={percent('width', 42)}
            firstItem={navIndex}
            scrollEnabled={false}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    navIndex: state.navNavbar.index,
    disableNavbar: state.disableNavbar.disable,
  };
};

export default connect(mapStateToProps)(TopNavbar);
