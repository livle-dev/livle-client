import LocalizedStrings from 'react-native-localization';

export const membership_string = new LocalizedStrings({
  en: {
    membershipInfo: 'Membership Info',
    plan: 'Plan',
    renewal: 'Renewal Date',
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
    failedVerifyPayment: 'Failed To Verify Payment Information',
    restoreMembership: 'Restore Membership',
  },
  ko: {
    membershipInfo: '멤버십 정보',
    plan: '멤버십 플랜',
    renewal: '갱신일',
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
    failedVerifyPayment: '결제정보 인증에 실패하였습니다',
    restoreMembership: '멤버십 재신청하기',
  },
});
