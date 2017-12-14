// Libraries
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
// Views
import _MainCard from '../partials/_MainCard';
import Calendar from '../partials/Calendar';
// Actions
import { MainAction } from '../../../reducers/Actions';
// Styles
import { mainpage } from '../../../assets/stylesheets/local/mainPageStyle';
import { styles } from '../../../assets/stylesheets/global/Style';
import Scale, { percent } from '../../../assets/stylesheets/global/Scale';
// Test
import { ticket } from '../../../test/TestData';

class CardLists extends Component {
  componentWillReceiveProps(props) {
    const { cardIndex } = props;
    this.carousel.snapToItem(cardIndex);
  }

  render() {
    const { dispatch, dataIndex, calendarIndex } = this.props;

    return (
      <Carousel
        ref={c => {
          this.carousel = c;
        }}
        data={ticket}
        renderItem={({ item, index }) => {
          return <_MainCard data={item} />;
        }}
        sliderWidth={percent('width', 100)}
        itemWidth={percent('width', 88)}
        lockScrollWhileSnapping={true}
        inactiveSlideScale={0.98}
        // callback
        onSnapToItem={card_i => {
          const index = dataIndex.findIndex((data, current) => {
            // card가 해당하는 calendar index를 반환
            return dataIndex[current + 1]
              ? data.cardIndex <= card_i &&
                  card_i < dataIndex[current + 1].cardIndex
              : -1;
          });

          if (index !== -1)
            dispatch({
              type: MainAction.UPDATE_INDEX,
              cardIndex: card_i,
              calendarIndex: dataIndex[index].dateIndex,
            });
        }}
      />
    );
  }
}

export default class MainPage extends Component {
  constructor() {
    super();
    const ticketSort = ticket.sort((x, y) => x.start_at - y.start_at);
    let dataIndex = []; //cardIndex, dateIndex간 관계를 담아둔 array
    let saveDate;

    for (let i = 0; i < ticketSort.length; i++) {
      let getDate = ticketSort[i].start_at.getDate();
      if (!saveDate || saveDate !== getDate) {
        saveDate = getDate;
        dataIndex.push({ cardIndex: i, dateIndex: dataIndex.length });
      }
    }

    this.state = {
      dataIndex: dataIndex,
    };
  }

  render() {
    const { cardIndex, calendarIndex, dispatch } = this.props;

    return (
      <View style={styles.blackBackground}>
        <CardLists
          dispatch={dispatch}
          dataIndex={this.state.dataIndex}
          cardIndex={cardIndex}
          calendarIndex={calendarIndex}
        />
        <Calendar
          dispatch={dispatch}
          dataIndex={this.state.dataIndex}
          calendarIndex={calendarIndex}
        />
      </View>
    );
  }
}
