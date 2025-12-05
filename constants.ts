import { Question } from './types';

export const INITIAL_QUESTIONS: Omit<Question, 'isFavorite'>[] = [
  { id: '1', text: '此时此刻，你最想对我做的一个动作是什么？', source: 'builtin' },
  { id: '2', text: '如果不考虑现实因素，你最想和我去哪里生活？', source: 'builtin' },
  { id: '3', text: '最近一次对我有“非分之想”是在什么时候？', source: 'builtin' },
  { id: '4', text: '说出我身上你最喜欢的三个部位。', source: 'builtin' },
  { id: '5', text: '如果在梦里梦见我，你希望剧情是什么样的？', source: 'builtin' },
  { id: '6', text: '我有哪个瞬间让你觉得“这个人由于可爱而想要一口吃掉”？', source: 'builtin' },
  { id: '7', text: '分享一个我们之间你最不想忘记的画面。', source: 'builtin' },
  { id: '8', text: '如果是初见，你觉得自己会对我一见钟情吗？', source: 'builtin' },
  { id: '9', text: '我们之间有没有什么秘密是你一直没告诉我的？', source: 'builtin' },
  { id: '10', text: '如果我们可以互换身体一天，你最想用我的身体做什么？', source: 'builtin' },
  { id: '11', text: '觉得我穿哪一种风格的衣服（或者不穿）最吸引你？', source: 'builtin' },
  { id: '12', text: '上一次对我说谎是为了什么？', source: 'builtin' },
  { id: '13', text: '给我的吻技打分（1-10分），并说明扣分项。', source: 'builtin' },
  { id: '14', text: '如果世界末日只剩下一小时，我们要做什么？', source: 'builtin' },
  { id: '15', text: '看着我的眼睛，深情地说一句你平时不好意思说的话。', source: 'builtin' },
  { id: '16', text: '有没有哪个异性朋友让你曾经有过一瞬间的心动？', source: 'builtin' },
  { id: '17', text: '描述一下你心目中完美的约会。', source: 'builtin' },
  { id: '18', text: '对我哪一次生气印象最深刻？', source: 'builtin' },
  { id: '19', text: '如果可以改变我性格中的一个缺点，你希望是什么？', source: 'builtin' },
  { id: '20', text: '现在拿出手机，展示相册里最新一张我的照片。', source: 'builtin' },
  { id: '21', text: '模仿我生气时的样子。', source: 'builtin' },
  { id: '22', text: '如果我们要养一只宠物来代表我们的爱情，会是什么动物？', source: 'builtin' },
  { id: '23', text: '有没有想过和我分手？在什么情况下？', source: 'builtin' },
  { id: '24', text: '用一种食物来形容我，并解释为什么。', source: 'builtin' },
  { id: '25', text: '做过最羞耻的一个梦是什么？', source: 'builtin' },
];

export const APP_TITLE = "情侣微醺真心话";
export const APP_SUBTITLE = "酒酣夜话抽卡机";
