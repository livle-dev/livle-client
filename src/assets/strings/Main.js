import LocalizedStrings from 'react-native-localization';

export const main_string = new LocalizedStrings({
  en: {
    vacancies: ' seats left',
    full: 'FULL',
    lineUp: 'LINE - UP',
    relatedVideo: 'Related Video',
    hasNoConcert: 'There are no concert on that date',
  },
  ko: {
    vacancies: '석 남음',
    full: '좌석 매진됨',
    lineUp: '출연진',
    relatedVideo: '관련 영상',
    hasNoConcert: '해당 날짜에 공연이 없습니다',
  },
});
