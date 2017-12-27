// Libraries
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
// Views
import _MainCard from '../partials/_MainCard';
import Calendar from '../partials/Calendar';
// Styles
import { mainpage } from '../../../assets/stylesheets/local/mainPageStyle';
import { styles } from '../../../assets/stylesheets/global/Style';
import Scale, { percent } from '../../../assets/stylesheets/global/Scale';

class CardLists extends Component {
  componentWillReceiveProps(props) {
    const { storeInfo } = props;
    this.carousel.snapToItem(storeInfo.cardIndex);
  }

  render() {
    const { data, dataIndex, updateIndex } = this.props;

    return (
      <Carousel
        ref={c => {
          this.carousel = c;
        }}
        data={data}
        renderItem={({ item, index }) => {
          return (
            <_MainCard
              data={item}
              curIndex={index}
              cardIndex={this.props.cardIndex}
            />
          );
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

          if (index !== -1) {
            updateIndex(card_i, dataIndex[index].dateIndex);
          }
        }}
      />
    );
  }
}

export default class MainPage extends Component {
  render() {
    const { ticket, storeInfo, updateIndex, showMessageBar } = this.props;

    return ticket.data.length > 0 ? (
      <View style={styles.blackBackground}>
        <CardLists
          data={ticket.data}
          dataIndex={ticket.dataIndex}
          storeInfo={storeInfo}
          updateIndex={updateIndex}
        />
        <Calendar
          dataIndex={ticket.dataIndex}
          storeInfo={storeInfo}
          showMessageBar={showMessageBar}
          updateIndex={updateIndex}
        />
      </View>
    ) : (
      <View style={[styles.blackBackground, styles.alignCenter]}>
        <Text>메인페이지 로딩중...</Text>
      </View>
    );
  }
}
