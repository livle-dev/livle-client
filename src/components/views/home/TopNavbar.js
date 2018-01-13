// Libraries
import React, { Component } from 'react';
import { View, Image, StatusBar, TouchableOpacity, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux';
// Actions
import { HomeAction } from '../../../reducers/Actions';
// Styles
import {
  width,
  styles,
  container,
} from '../../../assets/stylesheets/global/Style';
import Scale, {
  width_height_ratio,
} from '../../../assets/stylesheets/global/Scale';
// Icons
import { NAV_ICONS } from '../../../assets/images/Icon';

// function Badge({ length }) {
//   return length > 0 ? (
//     <View style={[container.absoluteContainer, styles.alignCenter]}>
//       <Text style={styles.textDefault}>{length}</Text>
//     </View>
//   ) : null;
// }

class TopNavbar extends Component {
  state = {
    // reservationLength: 0,
    navState: [
      {
        width: Scale.NAVBAR_ICON_HEIGHT * width_height_ratio(176, 211),
        navigate: () => this.props.toGo(),
      },
      {
        width: Scale.NAVBAR_ICON_HEIGHT * width_height_ratio(104, 100),
        navigate: () => this.props.toMain(),
      },
      {
        width: Scale.NAVBAR_ICON_HEIGHT * width_height_ratio(94, 96),
        navigate: () => this.props.toSetting(),
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
        style={[{ width: width.navbar }, styles.flex_1, styles.alignCenter]}
        activeOpacity={1}
        onPress={() => {
          item.navigate();
          this.carousel.snapToItem(index);
        }}>
        <Image
          key={renderIcon}
          source={renderIcon}
          style={[styles.navbarLogo, { width: item.width }]}
        />
        {/*index === 0 && <Badge index={this.state.reservationLength} />*/}
      </TouchableOpacity>
    );
  };

  // componentWillReceiveProps(props) {
  //   this.setState({ reservationLength: props.reservation.length });
  // }

  render() {
    const { navIndex, disableNavbar } = this.props;

    return (
      <View
        style={[
          disableNavbar ? styles.displayNone : container.navbarContainer,
          styles.alignCenter,
        ]}>
        <StatusBar translucent barStyle="light-content" />
        <View style={styles.flex_1}>
          <Carousel
            ref={c => {
              this.carousel = c;
            }}
            data={this.state.navState}
            renderItem={this._renderButton}
            sliderWidth={width.full}
            itemWidth={width.navbar}
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
    // reservation: state.ticket.reservation,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toGo: () => dispatch({ type: HomeAction.GO }),
    toMain: () => dispatch({ type: HomeAction.MAIN }),
    toSetting: () => dispatch({ type: HomeAction.SETTING }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopNavbar);
