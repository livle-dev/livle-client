import LocalizedStrings from 'react-native-localization';

export const membership_string = new LocalizedStrings({
  en: {
    membershipInfo: 'Membership Info',
    plan: 'Plan',
    renewal: 'Renewal Date',
    reservationCount: 'Remain Reservation Number',
    payment: 'Payment',
    paymentInfo: 'Payment Info',
    endDate: 'End Date',
    unsubscribe: 'Unsubscribe',
    terminateMembership: 'Terminate Membership',
    reallyTerminate: `There are many concerts waiting for you
that make your heart shaking

Do you really want to terminate Membership?`,
    terminate: 'Terminate',
    completeTerminate: 'Membership has been terminated',
    applyMembership: 'Apply Membership',
    compleltApplying: 'Complete Applying Membership',
    alreadyUsedFreeTrial:
      "You've already used Free Trial. Membership fee will be charged from this month.",
    failedVerifyPayment: 'Failed To Verify Payment Information',
    restoreMembership: 'Restore Membership',
    subscriptionFee: 'Subscription fee',
    cardNumber: 'Card Number',
    birth: 'Date of Birth (6 digits)',
    cardPassword: 'Card Password (first 2 digits)',
    validity: 'Validity',
    registerMembership: 'Register Membership',
    enterAllInfo: 'Please enter all your payment information',
  },
  ko: {
    membershipInfo: '멤버십 정보',
    plan: '멤버십 플랜',
    renewal: '갱신일',
    reservationCount: '예약 가능 횟수',
    payment: '지불',
    paymentInfo: '지불 정보',
    endDate: '종료일',
    unsubscribe: '미등록',
    terminateMembership: '멤버십 해지하기',
    reallyTerminate: `당신의 가슴을 뛰게 할
수 많은 공연들이 기다리고 있습니다.

정말 멤버십을 해지하시겠어요?`,
    terminate: '해지하기',
    completeTerminate: '멤버십이 해지되었습니다',
    applyMembership: '멤버십 신청하기',
    compleltApplying: '멤버십 등록이 완료되었습니다',
    alreadyUsedFreeTrial:
      '무료 체험을 이용하셨습니다. 이번달부터 멤버십 요금이 청구됩니다.',
    failedVerifyPayment: '결제정보 인증에 실패하였습니다',
    restoreMembership: '멤버십 재신청하기',
    subscriptionFee: '구독료',
    cardNumber: '카드번호 입력',
    birth: '생년월일 (6자리)',
    cardPassword: '카드 비밀번호 (앞 2자리)',
    validity: '유효기간',
    registerMembership: '멤버십 등록하기',
    enterAllInfo: '모든 결제정보를 입력해주세요',
  },
});
