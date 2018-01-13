// Libraries
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
// Views
import _MainCard from '../partials/_MainCard';
import Calendar from '../partials/Calendar';
// Actions
import { LoadingAction } from '../../../reducers/Actions';
// Styles
import { mainpage } from '../../../assets/stylesheets/local/mainPageStyle';
import { styles } from '../../../assets/stylesheets/global/Style';
import Scale, { percent } from '../../../assets/stylesheets/global/Scale';

class CardLists extends Component {
  componentWillReceiveProps(props) {
    this.carousel.snapToItem(props.storeInfo.cardIndex);
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
        onSnapToItem={card_index => {
          dataIndex.map(item => {
            if (item.card_start <= card_index && card_index <= item.card_end)
              updateIndex(card_index, item.calendar_index);
          });
        }}
      />
    );
  }
}

export default class MainPage extends Component {
  state = { isLoaded: false };

  componentWillReceiveProps(props) {
    if (!this.state.isLoaded && props.ticket.data.length > 0) {
      props.navigation.dispatch({ type: LoadingAction.HIDE_LOADING });
      this.setState({ isLoaded: true });
    }
  }

  render() {
    const { ticket, storeInfo, updateIndex, showMessageBar } = this.props;
    return this.state.isLoaded ? (
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
      <View style={styles.blackBackground} />
    );
  }
}
