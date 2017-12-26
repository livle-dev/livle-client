// Libraries
import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// Views
import TopTitle from '../partials/TopTitle';
// Styles
import { styles } from '../../../assets/stylesheets/global/Style';
import { color } from '../../../assets/stylesheets/global/Color';
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
          <LinearGradient
            colors={['#19e298', '#33f1ac', '#59ffa7']}
            style={[promotionStyle.gradientContainer, styles.alignCenter]}>
            <Text style={[promotionStyle.textTitle, styles.textCenter]}>
              이번 달은{'\n'}첫 1주일 무료!
            </Text>
          </LinearGradient>
          <View style={[promotionStyle.defaultContainer, styles.alignCenter]}>
            <Text style={[promotionStyle.textContent, styles.textCenter]}>
              자, 축제를 시작하세요.{'\n'}당신의 삶은{' '}
              <Text style={color.green_light}>라이브 그 자체</Text>입니다.
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
