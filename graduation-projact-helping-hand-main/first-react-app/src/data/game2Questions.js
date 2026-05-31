import game21Img from '../assets/Game21.jpg';
import game22Img from '../assets/Game22.jpg';
import game23Img from '../assets/Game23.jpg';
import game24Img from '../assets/Game24.jpg';

export const game2Questions = [
  {
    id: 1,
    text: 'ماذا تفعل اذا قطع أحد الاطفال دورك في طابور المياه ؟',
    image: game21Img,
    alt: 'أطفال في طابور المياه',
    options: [
      { id: 'shout', label: 'أصرخ وأتشاجر' },
      { id: 'angry', label: 'أشعر بالغضب' },
      { id: 'calm', label: 'أتحدث بهدوء' }
    ]
  },
  {
    id: 2,
    text: 'ماذا تفعل اذا طلب منك والديك المساعدة في تنظيف الخيمة وانت تشعر بالتعب؟',
    image: game22Img,
    alt: 'طفل متعب ووالديه يطلبان المساعدة',
    options: [
      { id: 'shout_no', label: 'أصرخ وأقول لا!' },
      { id: 'complain', label: 'أتذمر!' },
      { id: 'obey', label: 'أطيع وأساعد' }
    ]
  },
  {
    id: 3,
    text: 'ماذا تفعل اذا كسر صديقك لعبتك الوحيدة عن طريق الخطأ؟',
    image: game23Img,
    alt: 'طفل مكسورة لعبته',
    options: [
      { id: 'attack', label: 'أهجم عليه وأضربه' },
      { id: 'stay_angry', label: 'أبقى غاضباً' },
      { id: 'forgive', label: 'أسامحه' }
    ]
  },
  {
    id: 4,
    text: 'ماذا تفعل اذا وجدت علبة طعام ملقاة على الأرض ؟',
    image: game24Img,
    alt: 'طفل يجد علبة طعام',
    options: [
      { id: 'hide', label: 'اخذها وأخبئها' },
      { id: 'leave', label: 'أتركها مكانها' },
      { id: 'return', label: 'أعيدها لصاحبها' }
    ]
  }
];
