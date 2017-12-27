// Libraries
import React, { Component } from 'react';
import { ScrollView, View, Text, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// Views
import TopTitle from '../partials/TopTitle';
import _SquareButton from '../partials/_SquareButton';
// Icons
import Icon from '../../../assets/images/Icon';
import { ticket, promotion } from '../../../assets/images/Background';
// Styles
import { styles, container } from '../../../assets/stylesheets/global/Style';
import { color, color_string } from '../../../assets/stylesheets/global/Color';
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
            colors={['#767976', '#4EAA4C', '#32D675', '#4BFFA3']}
            style={[promotionStyle.gradientContainer, styles.alignCenter]}>
            <Icon
              src="logo_livle"
              height={16}
              disabled={true}
              style={promotionStyle.iconMargin}
            />
            <ImageBackground
              source={promotion}
              style={[promotionStyle.promotionSize, styles.alignCenter]}
              imageStyle={promotionStyle.background}>
              <Text style={promotionStyle.textPromotion}>멤버십 이벤트</Text>
            </ImageBackground>
            <Text style={[promotionStyle.textTitle, styles.textCenter]}>
              이번 달은{'\n'}첫 1주일 무료!
            </Text>
            <Icon
              src="ic_ticket_blink"
              height={80}
              disabled={true}
              style={promotionStyle.blinkMargin}
            />
          </LinearGradient>
          <View style={container.textContainer}>
            <View style={[promotionStyle.infoContainer, styles.alignCenter]}>
              <ImageBackground
                source={ticket.horizontal}
                style={[promotionStyle.ticketSize, styles.alignCenter]}
                imageStyle={promotionStyle.background}>
                <Text>멤버십 이벤트</Text>
              </ImageBackground>
              <Text style={[promotionStyle.textContent, styles.textCenter]}>
                자, 축제를 시작하세요.{'\n'}당신의 삶은{' '}
                <Text style={color.green_light}>라이브 그 자체</Text>입니다.
              </Text>
            </View>
            <View
              style={[promotionStyle.buttonContainer, styles.verticalCenter]}>
              <Text style={promotionStyle.textContent}>기본 이용권</Text>
              <View style={promotionStyle.button}>
                <_SquareButton
                  backgroundColor={color_string.green_light}
                  text="첫 1주일 이후 매달 | 14,900원"
                  onPress={() => {}}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
