// Libraries
import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// Views
import StackPage from '../partials/StackPage';
import _SquareButton from '../partials/_SquareButton';
// Icons
import Icon from '../../../assets/images/Icon';
import { ticket, promotion } from '../../../assets/images/Background';
// Styles
import { styles, container } from '../../../assets/stylesheets/global/Style';
import { color, color_string } from '../../../assets/stylesheets/global/Color';
import { promotionStyle } from '../../../assets/stylesheets/local/promotionPageStyle';

const TicketRow = ({ text }) => {
  return (
    <View
      style={[
        promotionStyle.ticketRowMargin,
        styles.rowDirection,
        styles.horizontalCenter,
      ]}>
      <Icon
        src="ic_check_white"
        height={12}
        disabled={true}
        style={{ marginRight: 8 }}
      />
      <Text style={promotionStyle.textTicket}>{text}</Text>
    </View>
  );
};

export default class PromotionPage extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <StackPage
        title="이벤트"
        navigation={navigation}
        isTransparent
        disablePadding>
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
            첫 한달,{'\n'}공연 2회 무료!
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
              <View
                style={[promotionStyle.ticketContainer, styles.verticalCenter]}>
                <TicketRow text="앱으로 간편하게 입장" />
                <TicketRow text="한달 2번의 라이브 콘서트" />
                <TicketRow text="언제든지 해지 가능" />
              </View>
            </ImageBackground>
            <Text style={[promotionStyle.textContent, styles.textCenter]}>
              자, 축제를 시작하세요.{'\n'}당신의 삶은{' '}
              <Text style={color.green_light}>라이브 그 자체</Text>입니다.
            </Text>
          </View>
          <View style={[promotionStyle.buttonContainer, styles.verticalCenter]}>
            <Text style={promotionStyle.textContent}>기본 이용권</Text>
            <View style={promotionStyle.button}>
              <_SquareButton
                backgroundColor={color_string.green_light}
                text="첫 1달 이후 매달 | 14,900원"
                onPress={() => navigation.navigate('Subscribe')}
              />
            </View>
          </View>
        </View>
      </StackPage>
    );
  }
}
