// Libraries
import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux';
// Actions
import { ReservationAction, ModalAction } from '../../../reducers/Actions';
// Views
import _ArtistProfile from './_ArtistProfile';
import FirstContent from './FirstContent';
import SecondContent from './SecondContent';
// Strings
import { main_string } from '../../../assets/strings';
// Styles
import {
  mainCard,
  mainWidth,
  HEIGHT,
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
  state = {
    isGo: false, //initial state
    showTopButton: false,
  };

  _renderContent = ({ item, index }) => {
    return index === 0 ? (
      <FirstContent
        data={item}
        showDetail={() => {
          this.carousel.snapToNext();
        }}
      />
    ) : (
      <SecondContent data={item} />
    );
  };

  _updateGoState = (data, reservation) => {
    this.setState({
      isGo: reservation.goList.find(book => book.id === data.id) ? true : false,
    });
  };

  componentDidMount() {
    this._updateGoState(this.props.data, this.props.reservation);
  }

  componentWillReceiveProps(props) {
    this._updateGoState(props.data, props.reservation);
  }

  render() {
    const { data, dispatch } = this.props;
    const { isGo, showTopButton } = this.state;
    // Pager를 위해 데이터를 나눔
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

    return (
      <View>
        <Carousel
          ref={c => {
            this.carousel = c;
          }}
          data={ticket_info}
          renderItem={this._renderContent}
          vertical={true}
          sliderHeight={HEIGHT.card}
          itemHeight={HEIGHT.card}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          onSnapToItem={index => {
            switch (index) {
              case 0:
                this.setState({ showTopButton: false });
                break;
              case 1:
                this.setState({ showTopButton: true });
                break;
            }
          }}
        />
        <HoverButtons
          isGo={isGo}
          showTopButton={showTopButton}
          clickTop={() => this.carousel.snapToPrev()}
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
      </View>
    );
  }
}

export default connect(state => {
  return {
    reservation: state.reservation,
  };
})(_MainCard);
