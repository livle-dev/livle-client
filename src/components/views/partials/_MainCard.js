// Libraries
import React, { Component } from 'react';
import { View, ScrollView, Platform } from 'react-native';
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux';
// Networks
import pusher from '../../../network/pusher';
import { canReserveTicket, cancelTicket } from '../../../network';
// Views
import FirstContent from './FirstContent';
import SecondContent from './SecondContent';
// Actions
import { TicketAction, ImageFullAction } from '../../../reducers/Actions';
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

class _MainCard extends Component {
  /* UTILS */
  _snapToTop() {
    if (Platform.OS === 'ios') {
      this.carousel.snapToPrev();
    } else {
      this.setState({ showTopButton: false });
    }
  }
  /* END */

  /* VIEWS */
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
            showImageFull={this.props.showImageFull}
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
        startAt: data.startAt,
        endAt: data.endAt,
        vacancies: data.vacancies,
        artists: data.artists,
      },
      {
        artists: data.artists,
        music_id: data.music_id,
        videoId: data.videoId,
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
  /* END */

  state = { showTopButton: false };

  componentDidMount() {
    const { data, updateTicket } = this.props;
    vacancies = pusher.subscribe('vacancies');
    vacancies.bind(`ticket-${data.id}`, vacancies =>
      updateTicket(data.id, vacancies)
    );
  }

  componentWillReceiveProps(props) {
    if (props.curIndex !== props.cardIndex) this._snapToTop();
  }

  render() {
    const { auth, data, dispatch } = this.props;
    const { isGo, showTopButton } = this.state;
    const hasReservation = data.reservationId !== null;

    return (
      <View>
        {this._snapCard()}
        <HoverButtons
          isGo={hasReservation}
          showTopButton={showTopButton}
          clickTop={() => this._snapToTop()}
          onPress={() => {
            if (hasReservation) cancelTicket(data.reservationId)(dispatch);
            else canReserveTicket(auth, data)(dispatch);
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

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch,
    updateTicket: (id, vacancies) =>
      dispatch({
        type: TicketAction.UPDATE_TICKET,
        data: { id: id, vacancies: vacancies },
      }),
    showImageFull: uri =>
      dispatch({
        type: ImageFullAction.SHOW_IMAGE,
        uri: uri,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(_MainCard);
