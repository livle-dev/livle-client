// Libraries
import React, { Component } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
// Functions
import { getTime } from '../../../assets/functions';
// Styles
import { styles } from '../../../assets/stylesheets/global/Style';
import Scale, { percent } from '../../../assets/stylesheets/global/Scale';
import { calendarStyle } from '../../../assets/stylesheets/local/mainCalanderStyle';

const DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
const getWeek = dataIndex => {
  let week = [];
  for (let i = 0; i < 7; i++) {
    week.push({
      date: getTime(i, 'days').date,
      day: getTime(i, 'days').day,
      // TODO: 코드 최적화하기
      hasItem: dataIndex.find(item => item.calendar_index === i) !== undefined,
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

  _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[
          { width: Scale.CALENDAR_ITEM_WIDTH },
          styles.flex_1,
          styles.alignCenter,
        ]}
        activeOpacity={1}
        // callback
        onPressIn={() => this.setState({ isTouched: true })}
        onPress={() => this.carousel.snapToItem(index)}>
        <Text
          style={[
            calendarStyle.dateText,
            !item.hasItem && calendarStyle.deactivate,
          ]}>
          {item.date}
        </Text>
        <Text
          style={[
            calendarStyle.dayText,
            !item.hasItem && calendarStyle.deactivate,
          ]}>
          {DAY[item.day]}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const { dataIndex, storeInfo, updateIndex, showMessageBar } = this.props;
    return (
      <View style={calendarStyle.calendarContainer}>
        <Carousel
          ref={c => {
            this.carousel = c;
          }}
          data={getWeek(dataIndex)}
          renderItem={this._renderItem}
          sliderWidth={percent('width', 100)}
          itemWidth={Scale.CALENDAR_ITEM_WIDTH}
          inactiveSlideScale={1}
          inactiveSlideOpacity={0.3}
          enableMomentum={true}
          firstItem={storeInfo.calendarIndex}
          // callback
          onSnapToItem={index => {
            if (this.state.isTouched) {
              let isUpdate = false;
              this.setState({ isTouched: false });
              dataIndex.map(item => {
                if (item.calendar_index === index) {
                  isUpdate = true;
                  updateIndex(item.card_start, index);
                }
              });
              if (!isUpdate) {
                showMessageBar('해당 날짜에 콘서트가 없습니다.');
                this.carousel.snapToItem(storeInfo.calendarIndex);
              }
            }
          }}
        />
      </View>
    );
  }
}
