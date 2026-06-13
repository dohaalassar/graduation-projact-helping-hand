import game41Img from '../assets/4.1.png';
import game42Img from '../assets/4.2.png';
import game43Img from '../assets/4.3.png';
import game44Img from '../assets/4.4.png';
import game45Img from '../assets/4.5.png';
import game46Img from '../assets/4.6.png';

export const game4Questions = [
  {
    id: 1,
    text: 'ماذا تفعل اذا رأيت طفلاً يتصعب في حمل قِربة المياه ؟',
    image: game41Img,
    alt: 'طفل يتصعب في حمل قربة المياه',
    options: [
      { id: 'help', label: 'أسرع لمساعدته في حملها' },
      { id: 'encourage', label: 'أقول له بالتوفيق في حملها' },
      { id: 'ignore', label: 'أتجاهله وأكمل طريقي' }
    ]
  },
  {
    id: 2,
    text: 'ماذا تفعل اذا رأيت طفلاً يبكي في المخيم لانه ضائع ؟',
    image: game42Img,
    alt: 'طفل يبكي لأنه ضائع',
    options: [
      { id: 'help', label: 'أساعده للوصول لوالديه' },
      { id: 'point', label: 'أُشير له على طريق العودة' },
      { id: 'ignore', label: 'لا أفعل شيء' }
    ]
  },
  {
    id: 3,
    text: 'ماذا تفعل اذا طلب جارك الكبير بالسن مساعدته في شد حبال الخيمة ؟',
    image: game43Img,
    alt: 'جار كبير بالسن يطلب المساعدة',
    options: [
      { id: 'help', label: 'أساعده في شد حبال الخيمة' },
      { id: 'watch', label: 'أقف متفرجاً' },
      { id: 'play', label: 'أذهب لألعب مع أصحابي' }
    ]
  },
  {
    id: 4,
    text: 'ماذا تفعل اذا رأيت طفل نازح جديد في المخيم يجلس لوحده ؟',
    image: game44Img,
    alt: 'طفل نازح يجلس لوحده',
    options: [
      { id: 'invite', label: 'أدعوه ليلعب معي' },
      { id: 'greet', label: 'أقول له مرحباً' },
      { id: 'ignore', label: 'أتجاهله وأكمل اللعب' }
    ]
  },
  {
    id: 5,
    text: 'ماذا تفعل اذا كنت تمتلك علبة ألوان وأنت في مدرسة الخيمة ؟',
    image: game45Img,
    alt: 'امتلاك علبة ألوان في مدرسة الخيمة',
    options: [
      { id: 'share_all', label: 'أسمح للجميع باستخدامها' },
      { id: 'share_friend', label: 'أسمح فقط لصديقي المفضل' },
      { id: 'no_share', label: 'لا أسمح لأحد غيري باستخدامها' }
    ]
  },
  {
    id: 6,
    text: 'ماذا تفعل اذا كنت تمتلك قطعة حلوى والآخرين لا يمتلكون ؟',
    image: game46Img,
    alt: 'امتلاك قطعة حلوى',
    options: [
      { id: 'share', label: 'أقسمها ونتشارك الحلوى' },
      { id: 'eat_fast', label: 'آكلها بسرعة قبل أن يراني أحد' },
      { id: 'refuse', label: 'أرفض مشاركتها مع الآخرين' }
    ]
  }
];
