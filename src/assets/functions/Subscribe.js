import { isFuture, getDday } from './Moment';

export const status = {
  NEW: 'NEW',
  BASIC: 'BASIC',
  UNSUBSCRIBE: 'UNSUBSCRIBE',
  FREE_TRIAL: 'FREE_TRIAL',
  WILL_TERMINATE: 'WILL_TERMINATE',
  SUSPENDED: 'SUSPENDED',
};

export function subscriptionStatus(auth) {
  const {
    currentSubscription,
    nextSubscription,
    freeTrial,
    suspendedBy,
  } = auth;

  if (currentSubscription) {
    // 구독중
    if (nextSubscription) {
      // 구독 유지
      if (!suspendedBy || !isFuture(suspendedBy)) {
        // 패널티가 없거나 만료됨
        if (
          freeTrial &&
          getDday(freeTrial.createdAt, currentSubscription.paidAt) === 0
        ) {
          // 무료체험중
          return status.FREE_TRIAL;
        } else {
          // 무료체험을 이용했었음
          return status.BASIC;
        }
      } else {
        // 패널티 받는 중
        return status.SUSPENDED;
      }
    } else {
      // 구독 취소
      if (!suspendedBy || !isFuture(suspendedBy)) {
        // 패널티가 없거나 만료됨
        return status.WILL_TERMINATE;
      } else {
        // 패널티 받는 중
        return status.SUSPENDED;
      }
    }
  } else {
    // 구독하지 않는중
    if (!freeTrial) {
      // 무료체험을 이용해본 적이 없음
      return status.NEW;
    } else {
      // 무료체험을 이용했었음
      return status.UNSUBSCRIBE;
    }
  }
}
