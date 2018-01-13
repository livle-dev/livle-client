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
// Strings
import { main_string } from '../../../assets/strings';
// Styles
import { styles, width } from '../../../assets/stylesheets/global/Style';
import Scale from '../../../assets/stylesheets/global/Scale';
import { calendarStyle } from '../../../assets/stylesheets/local/mainCalanderStyle';

const DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
const getWeek = dataIndex => {
  let week = [];
  for (let i = 0; i < 8; i++) {
    week.push({
      date: getTime(i, 'days').date,
      day: getTime(i, 'days').day,
      // TODO: 코드 최적화하기
      hasItem: dataIndex.find(item => item.calendar_index === i) !== undefined,
    });
  }
  return week;
};

const nearestIndex = (index, data) => {
  for (let i = 0; i < data.length; i++) {
    const currentData = data[i].calendar_index;
    if (index <= currentData) {
      if (i === 0) return currentData;
      else if (index - data[i - 1].calendar_index <= currentData - index)
        return data[i].calendar_index;
      else return data[i - 1].calendar_index;
    }
  }
  return data[data.length - 1].calendar_index;
};

export default class Calendar extends Component {
  state = {
    isTouched: false,
    firstIndex: this.props.dataIndex[0].calendar_index,
  };

  componentWillReceiveProps(props) {
    this.carousel.snapToItem(props.storeInfo.calendarIndex);
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
          sliderWidth={width.full}
          itemWidth={Scale.CALENDAR_ITEM_WIDTH}
          inactiveSlideScale={1}
          inactiveSlideOpacity={0.5}
          enableMomentum={true}
          firstItem={this.state.firstIndex}
          // callback
          onSnapToItem={index => {
            if (this.state.isTouched) {
              let doUpdate = false;
              const item = dataIndex.find(
                item => item.calendar_index === index
              );
              if (item) {
                doUpdate = true;
                updateIndex(item.card_start, index);
              }

              if (doUpdate) {
                this.setState({ isTouched: false });
              } else {
                showMessageBar(main_string.hasNoConcert);
                this.carousel.snapToItem(nearestIndex(index, dataIndex));
              }
            }
          }}
        />
      </View>
    );
  }
}
