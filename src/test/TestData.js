// Libraries
import faker from 'faker';

// test_images
const test_image = require('../assets/images/img_test.jpg');
const test_profile = require('../assets/images/img_artist.jpg');
// test_date
const today = new Date();
let week_after = new Date(today);
week_after.setDate(today.getDate() + 7);
// test_places
const places = [
  '잠실 종합운동장 주경기장',
  '가로수길',
  '홍대 놀이터 앞',
  '경희대학교 평화의전당',
  '인천 문학경기장',
  '삼성 코엑스',
  '판교 스타트업캠퍼스 컨퍼런스홀',
];

// TICKET
const TICKET_SIZE = 16;
const MAX = {
  VACANCIES: 20,
  RUNTIME: 4,
  ARTISTS: 6,
};
const test_ticket = [];

for (let i = 0; i < TICKET_SIZE; i++) {
  const random_date = faker.date.between(today, week_after);
  let more_time = new Date(random_date);
  more_time.setHours(random_date.getHours() + faker.random.number(MAX.RUNTIME));

  test_ticket.push({
    id: i,
    title: faker.name.title(),
    artists: [],
    start_at: random_date,
    end_at: more_time,
    image: test_image,
    vacancies: faker.random.number(MAX.VACANCIES),
    place: places[faker.random.number(places.length - 1)],
    music_id: null,
    video_id: 'T9fKvVGBBy4',
    article: null,
  });
  for (let a = 0; a < faker.random.number({ min: 1, max: MAX.ARTISTS }); a++) {
    test_ticket[i].artists.push({
      id: a,
      name: faker.name.findName(),
      image: test_profile,
    });
  }
}

export const ticket = [...test_ticket];
// END
