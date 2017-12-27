// Libraries
import React, { Component } from 'react';
import { View, ScrollView, Platform } from 'react-native';
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux';
// Networks
import { canReserveTicket, cancelTicket } from '../../../network';
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
// Icons
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

const SnapCard = ({ data, ...option }) => {};

class _MainCard extends Component {
  // utils
  _updateGoState(data) {
    const { reservation } = this.props;
    return reservation.find(item => item.ticket_id === data.id) !== undefined;
  }

  _snapToTop() {
    if (Platform.OS === 'ios') {
      this.carousel.snapToPrev();
    } else {
      this.setState({ showTopButton: false });
    }
  }
  // end

  // views
  _carousel = ticket_info => (
    <Carousel
      ref={c => {
        this.carousel = c;
      }}
      data={ticket_info}
      renderItem={({ item, index }) => {
        return index === 0 ? (
          <FirstContent
            data={item}
            showDetail={() => this.carousel.snapToNext()}
          />
        ) : (
          <SecondContent data={item} removePlayer={!this.state.showTopButton} />
        );
      }}
      vertical={true}
      sliderHeight={mainHeight.card}
      itemHeight={mainHeight.card}
      inactiveSlideScale={1}
      inactiveSlideOpacity={1}
      // callback
      onSnapToItem={index => this.setState({ showTopButton: index === 1 })}
    />
  );

  _snapCard = () => {
    // Pager를 위해 데이터를 나눔
    const { data } = this.props;
    const ticket_info = [
      {
        id: data.id,
        title: data.title,
        place: data.place,
        image: data.image,
        start_at: data.start_at,
        end_at: data.end_at,
        vacancies: data.vacancies,
        artists: data.artists,
      },
      {
        artists: data.artists,
        music_id: data.music_id,
        video_id: data.video_id,
        article: data.article,
      },
    ];

    return Platform.select({
      ios: this._carousel(ticket_info),
      android: this.state.showTopButton ? (
        <ScrollView>
          <SecondContent data={data} removePlayer={!this.state.showTopButton} />
        </ScrollView>
      ) : (
        this._carousel(ticket_info)
      ),
    });
  };
  // end

  state = {
    isGo: this._updateGoState(this.props.data),
    showTopButton: false,
  };

  componentWillReceiveProps(props) {
    if (props.curIndex !== props.cardIndex) this._snapToTop();
    this.setState({ isGo: this._updateGoState(props.data) });
  }

  render() {
    const { auth, data, dispatch } = this.props;
    const { isGo, showTopButton } = this.state;

    return (
      <View>
        {this._snapCard()}
        <HoverButtons
          isGo={isGo}
          showTopButton={showTopButton}
          clickTop={() => this._snapToTop()}
          onPress={() => {
            if (isGo) {
              cancelTicket(data.id)(dispatch);
              this.setState({ isGo: false });
            } else {
              if (canReserveTicket(auth, data)(dispatch))
                this.setState({ isGo: true });
            }
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    ticket: state.ticket.ticket,
    reservation: state.ticket.reservation,
  };
};

export default connect(mapStateToProps)(_MainCard);
