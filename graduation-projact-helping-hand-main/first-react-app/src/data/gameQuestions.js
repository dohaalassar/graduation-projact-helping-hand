// Import all game images
import game1Img from '../assets/Game1.jpg';
import game11Img from '../assets/Game11.png';
import game12Img from '../assets/Game12.png';
import game13Img from '../assets/Game13.png';
import game14Img from '../assets/Game14.jpg';
import game15Img from '../assets/Game15.jpg';
import game16Img from '../assets/Game16.jpg';
import game17Img from '../assets/Game17.jpg';
import game18Img from '../assets/Game18.jpg';

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
  },
  {
    id: 5,
    text: 'بماذا تشعر اذا سمعت والديك يتحدثان عن الانتقال الى منطقة نزوح جديدة ؟',
    image: game14Img,
    alt: 'الانتقال الى منطقة نزوح جديدة',
    options: [
      { id: 'anxiety_extreme', label: 'أشعر بالقلق كبيراً' },
      { id: 'anxiety', label: 'أشعر بالقلق' },
      { id: 'safe_prepared', label: 'أشعر بأني بخير وأجهز نفسي' }
    ]
  },
  {
    id: 6,
    text: 'بماذا تشعر اذا سمعت والديك يتحدثان عن نفاد الطعام ؟',
    image: game15Img,
    alt: 'نفاد الطعام',
    options: [
      { id: 'anxiety_extreme', label: 'أشعر بالقلق كثيراً' },
      { id: 'anxiety', label: 'أشعر بالقلق' },
      { id: 'safe_confident', label: 'أشعر بالثقة والامان' }
    ]
  },
  {
    id: 7,
    text: 'بماذا تشعر عندما تتهز الخيمة في ليلة الشتاء الباردة العاصفة ؟',
    image: game16Img,
    alt: 'خيمة في الشتاء',
    options: [
      { id: 'fear_continuous', label: 'أشعر بالخوف المستمر' },
      { id: 'anxiety', label: 'أشعر بالقلق' },
      { id: 'safe_sleep', label: 'أشعر بالأمان وأكمل النوم' }
    ]
  },
  {
    id: 8,
    text: 'بماذا تشعر عندما تتذكر مدرستك القديمة وأنت تدرس الان في خيمة ؟',
    image: game17Img,
    alt: 'تذكر المدرسة',
    options: [
      { id: 'sadness_extreme', label: 'أشعر بالحزن كثيراً' },
      { id: 'sadness_little', label: 'أشعر بالحزن قليلاً' },
      { id: 'happy_learning', label: 'سعيد لأني أستطيع أن أتعلم' }
    ]
  },
  {
    id: 9,
    text: 'بماذا تشعر عندما ترى صور أصدقائك الذين لا تستطيع لقاءهم ؟',
    image: game18Img,
    alt: 'صور الأصدقاء',
    options: [
      { id: 'loneliness', label: 'أشعر بالوحدة' },
      { id: 'sadness', label: 'أشعر بالحزن' },
      { id: 'happy_seeing', label: 'سعيد لأني أستطيع رؤية صورهم' }
    ]
  }
];
