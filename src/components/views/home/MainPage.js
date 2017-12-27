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
// Network
import { getAllTicket } from '../../../network';

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
  constructor() {
    super();
    this.state = { data: null, dataIndex: null };
  }

  getData(isLoggedIn) {
    getAllTicket().then(response => this.setState(response));
  }

  componentWillMount() {
    const { isLoggedIn } = this.props.auth;
    this.getData();
  }

  componentWillReceiveProps(props) {
    if (props.auth.isLoggedIn && !this.state.data) {
      this.getData(props.auth.isLoggedIn);
    }
  }

  render() {
    const { storeInfo, updateIndex, showMessageBar } = this.props;

    return this.state.data ? (
      <View style={styles.blackBackground}>
        <CardLists
          data={this.state.data}
          updateIndex={updateIndex}
          dataIndex={this.state.dataIndex}
          storeInfo={storeInfo}
        />
        <Calendar
          showMessageBar={showMessageBar}
          updateIndex={updateIndex}
          dataIndex={this.state.dataIndex}
          storeInfo={storeInfo}
        />
      </View>
    ) : (
      <View style={[styles.blackBackground, styles.alignCenter]}>
        <Text>메인페이지 로딩중...</Text>
      </View>
    );
  }
}
