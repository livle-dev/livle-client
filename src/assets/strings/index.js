// Libraries
import LocalizedStrings from 'react-native-localization';

export * from './Notice';

export const login_string = new LocalizedStrings({
  en: {
    signUp: 'Sign Up',
    logIn: 'Login',
    facebook: 'Start with Facebook',
    findPassword: 'Find Password',
    email: 'E-mail',
    password: 'Password',
    newPassword: 'Password (at least 6 characters)',
    confirmPassword: 'Confirm Password',
    changePassword: 'Change Password',
    confirmEmail: 'Confirm E-mail',
    nickname: 'Nickname',
    alreadyHaveId: 'Already have an ID? ',
  },
  ko: {
    signUp: '회원가입',
    logIn: '로그인',
    facebook: '페이스북으로 시작하기',
    findPassword: '비밀번호 찾기',
    email: '이메일',
    password: '비밀번호',
    newPassword: '비밀번호 (6자리 이상)',
    confirmPassword: '비밀번호 확인',
    changePassword: '비밀번호 변경',
    confirmEmail: '이메일 인증하기',
    nickname: '닉네임',
    alreadyHaveId: '이미 아이디가 있으신가요? ',
  },
});

export const main_string = new LocalizedStrings({
  en: {
    vacancies: ' seats left',
    booked: 'FULL',
    lineUP: 'LINE - UP',
  },
  ko: {
    vacancies: '석 남음',
    booked: '좌석 매진됨',
    lineUp: '출연진',
  },
});

export const go_string = new LocalizedStrings({
  en: {
    noReservation: 'No Reservation Available.',
    bookTicket: 'Press Ticket',
    toEnjoyConcert: ' to enjoy concert!',
    confirmEntry: 'Confirm Entry',
    entryConfirmed: 'Entry Confirmed!',
    showToStaff: 'Show to Staff When Entering',
    cancelReservation: 'Cancel Reservation',
  },
  ko: {
    noReservation: '예약내역이 없습니다.',
    bookTicket: '티켓 버튼',
    toEnjoyConcert: '을 눌러 콘서트를 즐기세요!',
    confirmEntry: '입장 확인',
    entryConfirmed: '입장이 확인되었습니다',
    showToStaff: '공연장에 입장할 때 보여주세요',
    cancelReservation: '예약취소',
  },
});

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
    logout: 'Logout',
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
    logout: '로그아웃',
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
