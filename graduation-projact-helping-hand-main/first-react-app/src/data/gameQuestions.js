// Import all game images
import game1Img from '../assets/Game1.jpg';
import game11Img from '../assets/Game11.png';
import game12Img from '../assets/Game12.png';
import game13Img from '../assets/Game13.png';

export const gameQuestions = [
  {
    id: 1,
    text: 'بماذا تشعر اذا سمعت صوت الزنانة العالي ؟',
    image: game1Img,
    alt: 'طفل في خيمة ويسمع صوت زنانة',
    options: [
      { id: 'fear', label: 'أشعر بالخوف 😱' },
      { id: 'safe', label: 'أشعر بالاطمئنان 😊' },
      { id: 'anxiety', label: 'أشعر بالقلق 😟' }
    ]
  },
  {
    id: 2,
    text: 'بماذا تشعر عندما تمشي الى الحمام البعيد في الليل ؟',
    image: game11Img,
    alt: 'طفل يمشي في الليل',
    options: [
      { id: 'fear', label: 'أشعر بالخوف 😱' },
      { id: 'safe', label: 'أشعر بالاطمئنان 😊' },
      { id: 'anxiety', label: 'أشعر بالقلق 😟' }
    ]
  },
  {
    id: 3,
    text: 'بماذا تشعر عندما تسمع صوت قصف قريب ؟',
    image: game12Img,
    alt: 'طفل يسمع قصف',
    options: [
      { id: 'fear', label: 'أشعر بالخوف وأبكي 😭' },
      { id: 'shock', label: 'أشعر بصدمة ولا أدري ماذا افعل 😫' },
      { id: 'anxiety', label: 'أشعر بالقلق لكن أبقى هادئا 😟' }
    ]
  },
  {
    id: 4,
    text: 'بماذا تشعر عندما تتذكر حياتك قبل الحرب وترى صورا لها؟',
    image: game13Img,
    alt: 'طفل يتذكر',
    options: [
      { id: 'sadness_extreme', label: 'أشعر بالحزن الشديد 😭' },
      { id: 'sadness', label: 'أشعر بالحزن 😢' },
      { id: 'optimism', label: 'أشعر بالتفاؤل 🙂' }
    ]
  }
];
