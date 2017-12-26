// Libraries
import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
// Views
import TopTitle from '../partials/TopTitle';
// Styles
import { styles } from '../../../assets/stylesheets/global/Style';
import { promotionStyle } from '../../../assets/stylesheets/local/promotionPageStyle';

export default class PromotionPage extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.flex_1}>
        <TopTitle
          title="멤버십"
          onPress={() => navigation.goBack()}
          isTransparent={true}
        />
        <ScrollView style={styles.blackBackground}>
          <View style={promotionStyle.gradientContainer}>
            <Text style={[styles.textDefault, styles.textCenter]}>
              이번 달은{'\n'}첫 1주일 무료!
            </Text>
          </View>
          <View style={promotionStyle.blackContainer}>
            <Text style={[styles.textDefault, styles.textCenter]}>
              자, 축제를 시작하세요{'\n'}당신의 삶은 라이브 그 자체입니다.
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
