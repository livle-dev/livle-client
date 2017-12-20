// Libraries
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Actions
import { ReservationAction, ModalAction } from '../../../reducers/Actions';
// Views
import FirstContent from './FirstContent';
import SecondContent from './SecondContent';
// Strings
import { main_string } from '../../../assets/strings';
// Styles
import {
  mainCard,
  mainWidth,
  mainHeight,
} from '../../../assets/stylesheets/local/mainCardStyle';
import { percent } from '../../../assets/stylesheets/global/Scale';
import Icon from '../../../assets/images/Icon';

const HoverButtons = ({ isGo, showTopButton, clickTop, ...option }) => {
  return (
    <View style={mainCard.hoverButtonContainer}>
      <Icon
        src="ic_top"
        width={showTopButton ? mainWidth.icCircle : 0}
        iconStyle={{ marginBottom: percent('height', 2) }}
        onPress={clickTop}
      />
      <Icon
        src={isGo ? 'ic_go_on' : 'ic_go_off'}
        width={mainWidth.icCircle}
        {...option}
      />
    </View>
  );
};

class _MainCard extends Component {
  _updateGoState = (data, reservation) =>
    reservation.goList.find(book => book.id === data.id) !== undefined;

  state = {
    isGo: this._updateGoState(this.props.data, this.props.reservation),
    showTopButton: false,
    scrollTarget: 0,
  };

  componentWillReceiveProps(props) {
    if (props.curIndex !== props.cardIndex) {
      // snap to item
    }

    // check once more
    this.setState({ isGo: this._updateGoState(props.data, props.reservation) });
  }

  snapToItem = index => {
    this.mainCard.scrollTo({
      y: index * mainHeight.card,
      animated: true,
    });
  };

  handleScroll = e => {
    const yPosition = e.nativeEvent.contentOffset.y;
    const pagingPoint = mainHeight.card;

    if (pagingPoint * 0.04 < yPosition && yPosition < pagingPoint * 0.92) {
      this.snapToItem(1);
    } else if (yPosition < pagingPoint * 0.98) {
      this.snapToItem(0);
    }
  };

  render() {
    const { data, dispatch } = this.props;
    const { isGo, showTopButton } = this.state;

    return (
      <View>
        <ScrollView
          ref={c => {
            this.mainCard = c;
          }}
          onScroll={this.handleScroll}
        >
          <FirstContent
            data={data}
            showDetail={() => {
              this.snapToItem(1);
            }}
          />
          <SecondContent data={data} removePlayer={!this.state.showTopButton} />
          <HoverButtons
            isGo={isGo}
            showTopButton={showTopButton}
            clickTop={() => {}}
            onPress={() => {
              this.setState({ isGo: !isGo });
              if (isGo) {
                dispatch({
                  type: ReservationAction.DELETE_RESERVATION,
                  id: data.id,
                });
              } else {
                dispatch({
                  type: ReservationAction.ADD_RESERVATION,
                  data: data,
                });
                dispatch({
                  type: ModalAction.SHOW_MODAL,
                  data: {
                    type: 'check',
                    text: main_string.concertBooked,
                    showLogo: true,
                  },
                });
              }
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { reservation: state.reservation };
};

export default connect(mapStateToProps)(_MainCard);
