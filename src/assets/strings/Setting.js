import LocalizedStrings from 'react-native-localization';

export const setting_string = new LocalizedStrings({
  en: {
    loginInfo: 'Login Info',
    membership: 'Membership',
    changeMembership: 'Change Membership',
    pushAlarm: 'Push Alarm',
    goAlarm: 'Start Concert',
    listUpdate: 'Concert List Update',
    contact: 'Contact',
    helpSupport: 'Help & Support',
    policies: 'Policies',
    privacy: 'Privacy',
    terms: 'Terms',
    license: 'License',
    wantToLogout: 'Want to logout?',
    logout: 'Logout',
    wantToWithdraw: 'Want to WITHDRAW?',
    withdraw: 'Withdraw',
  },
  ko: {
    loginInfo: '계정정보',
    membership: '멤버십',
    changeMembership: '멤버십 변경',
    pushAlarm: '푸쉬알림',
    goAlarm: '공연시작',
    listUpdate: '공연 목록 업데이트',
    contact: '연락',
    helpSupport: '도움말 & 고객지원',
    policies: '법적고지',
    privacy: '개인정보처리방침',
    terms: '서비스 약관',
    license: '라이선스',
    wantToLogout: '로그아웃 하시겠어요?',
    logout: '로그아웃',
    wantToWithdraw: '정말 탈퇴하시겠어요?',
    withdraw: '탈퇴하기',
  },
});

export const membership_string = new LocalizedStrings({
  en: {
    membershipInfo: 'Membership Info',
    plan: 'Plan',
    renewal: 'Renewal Date',
    payment: 'Payment',
    paymentInfo: 'Payment Info',
    name: 'Name',
  },
  ko: {
    membershipInfo: '멤버십 정보',
    plan: '멤버십 플랜',
    renewal: '갱신일',
    payment: '지불',
    paymentInfo: '지불 정보',
    name: '이름',
  },
});
