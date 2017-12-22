// Libraries
import React, { Component } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
// Actions
import { MainAction } from '../../../reducers/Actions';
// Styles
import { styles } from '../../../assets/stylesheets/global/Style';
import Scale, { percent } from '../../../assets/stylesheets/global/Scale';
import { calendarStyle } from '../../../assets/stylesheets/local/mainCalanderStyle';

const DAY = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
const getWeek = () => {
  let week = [];
  for (let i = 0; i < 7; i++) {
    let update = new Date(); //get current time
    update.setDate(update.getDate() + i);

    week.push({
      date: update.getDate(),
      day: update.getDay(),
    });
  }

  return week;
};

export default class Calendar extends Component {
  state = { isTouched: false };

  componentWillReceiveProps(props) {
    const { storeInfo } = props;
    this.carousel.snapToItem(storeInfo.calendarIndex);
  }

  render() {
    const { dispatch, dataIndex, storeInfo } = this.props;
    return (
      <View style={calendarStyle.calendarContainer}>
        <Carousel
          ref={c => {
            this.carousel = c;
          }}
          data={getWeek()}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={[
                  { width: Scale.CALENDAR_ITEM_WIDTH },
                  styles.flex_1,
                  styles.alignCenter,
                ]}
                activeOpacity={1}
                onPress={() => {
                  this.setState({ isTouched: true });
                  this.carousel.snapToItem(index);
                }}>
                <Text style={calendarStyle.dateText}>{item.date}</Text>
                <Text style={calendarStyle.dayText}>{DAY[item.day]}</Text>
              </TouchableOpacity>
            );
          }}
          sliderWidth={percent('width', 100)}
          itemWidth={Scale.CALENDAR_ITEM_WIDTH}
          inactiveSlideScale={1}
          inactiveSlideOpacity={0.3}
          scrollEnabled={true}
          enableMomentum={true}
          // callback
          onMomentumScrollEnd={() => this.setState({ isTouched: true })}
          onSnapToItem={index => {
            if (this.state.isTouched) {
              try {
                dispatch({
                  type: MainAction.UPDATE_INDEX,
                  cardIndex: dataIndex[index].cardIndex,
                  calendarIndex: dataIndex[index].dateIndex,
                });
                this.setState({ isTouched: false });
              } catch (e) {
                console.log('has no data'); //TODO: 정보 없음을 보여줘야함
                this.carousel.snapToItem(storeInfo.calendarIndex);
              }
            }
          }}
        />
      </View>
    );
  }
}
