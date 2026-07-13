// Central registry of every calculator on the platform.
// Used by: homepage listings/search, sitemap.xml generation, and each
// calculator page's generateMetadata() for SEO.

export const CATEGORIES = [
  { id: 'finance', en: 'Finance', ar: 'المالية' },
  { id: 'health', en: 'Health', ar: 'الصحة' },
  { id: 'education', en: 'Education', ar: 'التعليم' },
  { id: 'daily-life', en: 'Daily Life', ar: 'الحياة اليومية' },
  { id: 'conversion', en: 'Conversion', ar: 'التحويل' },
];

export const CALCULATORS = [
  {
    slug: 'loan',
    category: 'finance',
    icon: 'Landmark',
    popular: true,
    en: {
      name: 'Loan Calculator',
      title: 'Loan Calculator - Calculate Monthly Loan Payments',
      description:
        'Free loan calculator to estimate your monthly payment, total interest, and full amortization schedule for any loan amount, rate, and term.',
      h1: 'Loan Calculator',
      intro:
        'Estimate your monthly loan payment instantly. Enter the loan amount, annual interest rate, and loan term to see your monthly payment, total interest paid, total repayment, and a full amortization table.',
      keywords: ['loan calculator', 'monthly payment calculator', 'amortization schedule', 'interest calculator'],
      faq: [
        { q: 'How is a monthly loan payment calculated?', a: 'It is calculated using the loan amount, interest rate, and term with the standard amortization formula, which spreads principal and interest across equal monthly payments.' },
        { q: 'What is an amortization table?', a: 'An amortization table breaks down every payment over the life of the loan, showing how much goes toward principal versus interest each month.' },
        { q: 'Does a lower interest rate always reduce total interest?', a: 'Yes, assuming the same loan amount and term, a lower interest rate reduces both the monthly payment and the total interest paid.' },
      ],
    },
    ar: {
      name: 'حاسبة القروض',
      title: 'حاسبة القروض - احسب القسط الشهري لقرضك',
      description: 'حاسبة قروض مجانية لتقدير القسط الشهري، إجمالي الفوائد، وجدول السداد الكامل لأي مبلغ ومدة وسعر فائدة.',
      h1: 'حاسبة القروض',
      intro: 'احسب القسط الشهري لقرضك فورًا. أدخل مبلغ القرض والفائدة السنوية ومدة السداد لمعرفة القسط الشهري وإجمالي الفوائد والمبلغ الكلي مع جدول تفصيلي للسداد.',
      keywords: ['حاسبة قروض', 'حاسبة القسط الشهري', 'جدول السداد', 'حاسبة فوائد'],
      faq: [
        { q: 'كيف يتم حساب القسط الشهري للقرض؟', a: 'يُحسب باستخدام مبلغ القرض وسعر الفائدة والمدة عبر معادلة الاستهلاك القياسية التي توزع الأصل والفائدة على أقساط شهرية متساوية.' },
        { q: 'ما هو جدول السداد؟', a: 'جدول السداد يوضح تفاصيل كل قسط خلال مدة القرض، ويبين كم يذهب لسداد الأصل وكم يذهب للفائدة كل شهر.' },
        { q: 'هل تقليل سعر الفائدة يقلل دائمًا إجمالي الفائدة؟', a: 'نعم، بافتراض نفس مبلغ ومدة القرض، فإن خفض سعر الفائدة يقلل القسط الشهري وإجمالي الفوائد المدفوعة.' },
      ],
    },
  },
  {
    slug: 'installment',
    category: 'finance',
    icon: 'CreditCard',
    popular: true,
    en: {
      name: 'Installment Calculator',
      title: 'Installment Calculator - Monthly Installment Plan Estimator',
      description: 'Calculate your monthly installment plan based on product price, down payment, number of months, and interest rate.',
      h1: 'Installment Calculator',
      intro: 'Plan your purchase with confidence. Enter the product price, down payment, number of months, and interest rate to get your exact monthly installment.',
      keywords: ['installment calculator', 'monthly installment', 'down payment calculator'],
      faq: [
        { q: 'How does a down payment affect installments?', a: 'A larger down payment reduces the financed amount, which lowers both the monthly installment and total interest paid.' },
        { q: 'Can I use this for 0% interest plans?', a: 'Yes, set the interest rate to 0 to calculate a simple equal-installment plan with no added interest.' },
      ],
    },
    ar: {
      name: 'حاسبة الأقساط',
      title: 'حاسبة الأقساط - احسب القسط الشهري لمشترياتك',
      description: 'احسب خطة التقسيط الشهرية بناءً على سعر المنتج والدفعة الأولى وعدد الأشهر وسعر الفائدة.',
      h1: 'حاسبة الأقساط',
      intro: 'خطط لمشترياتك بثقة. أدخل سعر المنتج والدفعة الأولى وعدد الأشهر وسعر الفائدة للحصول على القسط الشهري الدقيق.',
      keywords: ['حاسبة أقساط', 'القسط الشهري', 'حاسبة الدفعة الأولى'],
      faq: [
        { q: 'كيف تؤثر الدفعة الأولى على الأقساط؟', a: 'الدفعة الأولى الأكبر تقلل المبلغ الممول، مما يقلل القسط الشهري وإجمالي الفوائد المدفوعة.' },
        { q: 'هل يمكن استخدامها لخطط بدون فوائد؟', a: 'نعم، اجعل سعر الفائدة صفرًا لحساب خطة تقسيط بسيطة بدون فوائد إضافية.' },
      ],
    },
  },
  {
    slug: 'discount',
    category: 'daily-life',
    icon: 'Tag',
    popular: true,
    en: {
      name: 'Discount Calculator',
      title: 'Discount Calculator - Calculate Final Price & Savings',
      description: 'Instantly calculate the final price after a discount and how much money you save with our free discount calculator.',
      h1: 'Discount Calculator',
      intro: 'Find out exactly how much you pay and how much you save. Enter the original price and discount percentage to get the final price instantly.',
      keywords: ['discount calculator', 'sale price calculator', 'percent off calculator'],
      faq: [
        { q: 'How do I calculate a discounted price?', a: 'Multiply the original price by the discount percentage to get the savings amount, then subtract that from the original price to get the final price.' },
        { q: 'Can I stack multiple discounts?', a: 'Apply each discount one after another on the resulting price, since stacked percentage discounts are not simply additive.' },
      ],
    },
    ar: {
      name: 'حاسبة الخصم',
      title: 'حاسبة الخصم - احسب السعر النهائي والتوفير',
      description: 'احسب فورًا السعر النهائي بعد الخصم ومقدار التوفير باستخدام حاسبة الخصم المجانية.',
      h1: 'حاسبة الخصم',
      intro: 'اعرف بالضبط كم ستدفع وكم ستوفر. أدخل السعر الأصلي ونسبة الخصم للحصول على السعر النهائي فورًا.',
      keywords: ['حاسبة خصم', 'حاسبة سعر التخفيض', 'حاسبة نسبة الخصم'],
      faq: [
        { q: 'كيف أحسب السعر بعد الخصم؟', a: 'اضرب السعر الأصلي في نسبة الخصم للحصول على مبلغ التوفير، ثم اطرحه من السعر الأصلي للحصول على السعر النهائي.' },
        { q: 'هل يمكن تطبيق أكثر من خصم؟', a: 'طبّق كل خصم على السعر الناتج من الخصم السابق، لأن الخصومات المتتالية لا تُجمع بشكل مباشر.' },
      ],
    },
  },
  {
    slug: 'percentage',
    category: 'education',
    icon: 'Percent',
    popular: true,
    en: {
      name: 'Percentage Calculator',
      title: 'Percentage Calculator - Percentage Increase, Decrease & Compare',
      description: 'Calculate percentages, percentage increase or decrease, and compare two values with our free online percentage calculator.',
      h1: 'Percentage Calculator',
      intro: 'A flexible tool to calculate what percentage one number is of another, find percentage increase or decrease, and compare two values.',
      keywords: ['percentage calculator', 'percentage increase calculator', 'percentage decrease calculator'],
      faq: [
        { q: 'How do I calculate percentage increase?', a: 'Subtract the original value from the new value, divide by the original value, then multiply by 100.' },
        { q: 'What is the formula for X percent of Y?', a: 'Multiply Y by X and divide by 100 to get the result.' },
      ],
    },
    ar: {
      name: 'حاسبة النسبة المئوية',
      title: 'حاسبة النسبة المئوية - الزيادة والنقصان والمقارنة',
      description: 'احسب النسب المئوية والزيادة أو النقصان المئوي وقارن بين قيمتين باستخدام حاسبة النسبة المئوية المجانية.',
      h1: 'حاسبة النسبة المئوية',
      intro: 'أداة مرنة لحساب نسبة رقم من رقم آخر، وإيجاد نسبة الزيادة أو النقصان، ومقارنة قيمتين.',
      keywords: ['حاسبة النسبة المئوية', 'حاسبة الزيادة المئوية', 'حاسبة النقصان المئوي'],
      faq: [
        { q: 'كيف أحسب نسبة الزيادة؟', a: 'اطرح القيمة الأصلية من القيمة الجديدة، ثم اقسم الناتج على القيمة الأصلية واضرب في 100.' },
        { q: 'ما معادلة حساب نسبة X من Y؟', a: 'اضرب Y في X ثم اقسم الناتج على 100 للحصول على النتيجة.' },
      ],
    },
  },
  {
    slug: 'age',
    category: 'daily-life',
    icon: 'Cake',
    popular: true,
    en: {
      name: 'Age Calculator',
      title: 'Age Calculator - Calculate Your Exact Age in Years, Months & Days',
      description: 'Find your exact age in years, months, and days from your birth date, plus a countdown to your next birthday.',
      h1: 'Age Calculator',
      intro: 'Enter your birth date to instantly see your exact age in years, months, and days, along with a live countdown to your next birthday.',
      keywords: ['age calculator', 'birthday calculator', 'date of birth calculator'],
      faq: [
        { q: 'How is exact age calculated?', a: 'The calculator finds the difference between today\'s date and your birth date, converting the result into complete years, months, and remaining days.' },
        { q: 'Does the calculator account for leap years?', a: 'Yes, all date calculations account for leap years and varying month lengths automatically.' },
      ],
    },
    ar: {
      name: 'حاسبة العمر',
      title: 'حاسبة العمر - احسب عمرك بالسنوات والأشهر والأيام',
      description: 'اعرف عمرك بالضبط بالسنوات والأشهر والأيام من تاريخ ميلادك، مع عد تنازلي لعيد ميلادك القادم.',
      h1: 'حاسبة العمر',
      intro: 'أدخل تاريخ ميلادك لمعرفة عمرك الدقيق بالسنوات والأشهر والأيام فورًا، مع عد تنازلي مباشر لعيد ميلادك القادم.',
      keywords: ['حاسبة العمر', 'حاسبة تاريخ الميلاد', 'حاسبة عيد الميلاد'],
      faq: [
        { q: 'كيف يتم حساب العمر بالضبط؟', a: 'تحسب الأداة الفرق بين تاريخ اليوم وتاريخ ميلادك، وتحوّل الناتج إلى سنوات كاملة وأشهر وأيام متبقية.' },
        { q: 'هل تراعي الحاسبة السنوات الكبيسة؟', a: 'نعم، جميع حسابات التاريخ تراعي السنوات الكبيسة واختلاف عدد أيام الأشهر تلقائيًا.' },
      ],
    },
  },
  {
    slug: 'bmi',
    category: 'health',
    icon: 'HeartPulse',
    popular: true,
    en: {
      name: 'BMI Calculator',
      title: 'BMI Calculator - Check Your Body Mass Index Instantly',
      description: 'Calculate your Body Mass Index (BMI) from your weight and height and see your health category instantly.',
      h1: 'BMI Calculator',
      intro: 'Enter your weight and height to calculate your Body Mass Index (BMI) and see whether you fall into the underweight, normal, overweight, or obese category.',
      keywords: ['bmi calculator', 'body mass index calculator', 'healthy weight calculator'],
      faq: [
        { q: 'What is a healthy BMI range?', a: 'A BMI between 18.5 and 24.9 is generally considered a healthy weight range for most adults.' },
        { q: 'Is BMI accurate for everyone?', a: 'BMI is a useful general screening tool, but it does not directly measure body fat and may be less accurate for athletes or older adults.' },
      ],
    },
    ar: {
      name: 'حاسبة كتلة الجسم',
      title: 'حاسبة مؤشر كتلة الجسم BMI - اعرف وزنك الصحي فورًا',
      description: 'احسب مؤشر كتلة جسمك (BMI) من الوزن والطول واعرف تصنيفك الصحي فورًا.',
      h1: 'حاسبة مؤشر كتلة الجسم',
      intro: 'أدخل وزنك وطولك لحساب مؤشر كتلة الجسم (BMI) ومعرفة ما إذا كنت ضمن فئة نقص الوزن أو الطبيعي أو زيادة الوزن أو السمنة.',
      keywords: ['حاسبة كتلة الجسم', 'حاسبة BMI', 'حاسبة الوزن الصحي'],
      faq: [
        { q: 'ما هو المعدل الصحي لمؤشر كتلة الجسم؟', a: 'يعتبر مؤشر كتلة الجسم بين 18.5 و24.9 ضمن النطاق الصحي لمعظم البالغين.' },
        { q: 'هل مؤشر BMI دقيق للجميع؟', a: 'مؤشر كتلة الجسم أداة فحص عامة مفيدة، لكنه لا يقيس نسبة الدهون مباشرة وقد يكون أقل دقة للرياضيين أو كبار السن.' },
      ],
    },
  },
  {
    slug: 'currency',
    category: 'conversion',
    icon: 'Banknote',
    popular: false,
    en: {
      name: 'Currency Converter',
      title: 'Currency Converter - Live Exchange Rates',
      description: 'Convert between world currencies using live exchange rates. Fast, free, and accurate currency conversion.',
      h1: 'Currency Converter',
      intro: 'Convert any amount between major world currencies using up-to-date exchange rates. Simply choose your currencies and enter an amount.',
      keywords: ['currency converter', 'exchange rate calculator', 'money converter'],
      faq: [
        { q: 'How often are exchange rates updated?', a: 'Exchange rates are pulled from a live rates API and typically refresh throughout the trading day.' },
        { q: 'Is the currency converter free to use?', a: 'Yes, the currency converter is completely free with no sign-up required.' },
      ],
    },
    ar: {
      name: 'محول العملات',
      title: 'محول العملات - أسعار الصرف المباشرة',
      description: 'حوّل بين عملات العالم باستخدام أسعار صرف مباشرة. تحويل عملات سريع ومجاني ودقيق.',
      h1: 'محول العملات',
      intro: 'حوّل أي مبلغ بين العملات العالمية الرئيسية باستخدام أسعار صرف محدثة. اختر عملاتك وأدخل المبلغ فقط.',
      keywords: ['محول العملات', 'حاسبة سعر الصرف', 'تحويل العملات'],
      faq: [
        { q: 'كم مرة يتم تحديث أسعار الصرف؟', a: 'تُسحب أسعار الصرف من واجهة برمجية مباشرة وتتحدث عادة خلال يوم التداول.' },
        { q: 'هل محول العملات مجاني؟', a: 'نعم، محول العملات مجاني بالكامل ولا يتطلب تسجيلًا.' },
      ],
    },
  },
  {
    slug: 'unit-converter',
    category: 'conversion',
    icon: 'Ruler',
    popular: false,
    en: {
      name: 'Unit Converter',
      title: 'Unit Converter - Length, Weight, Temperature, Speed, Area, Volume & Time',
      description: 'Convert length, weight, temperature, speed, area, volume, and time units instantly with our free unit converter.',
      h1: 'Unit Converter',
      intro: 'A complete unit converter covering length, weight, temperature, speed, area, volume, and time. Choose a category and convert instantly.',
      keywords: ['unit converter', 'length converter', 'weight converter', 'temperature converter'],
      faq: [
        { q: 'What unit categories are supported?', a: 'The converter supports length, weight, temperature, speed, area, volume, and time units.' },
        { q: 'Is the unit converter accurate?', a: 'Yes, all conversions use standard internationally recognized conversion factors.' },
      ],
    },
    ar: {
      name: 'محول الوحدات',
      title: 'محول الوحدات - الطول والوزن ودرجة الحرارة والسرعة والمساحة والحجم والوقت',
      description: 'حوّل وحدات الطول والوزن ودرجة الحرارة والسرعة والمساحة والحجم والوقت فورًا مع محول الوحدات المجاني.',
      h1: 'محول الوحدات',
      intro: 'محول وحدات شامل يغطي الطول والوزن ودرجة الحرارة والسرعة والمساحة والحجم والوقت. اختر الفئة وحوّل فورًا.',
      keywords: ['محول الوحدات', 'محول الطول', 'محول الوزن', 'محول درجة الحرارة'],
      faq: [
        { q: 'ما فئات الوحدات المدعومة؟', a: 'يدعم المحول وحدات الطول والوزن ودرجة الحرارة والسرعة والمساحة والحجم والوقت.' },
        { q: 'هل محول الوحدات دقيق؟', a: 'نعم، جميع التحويلات تستخدم معاملات تحويل معيارية معترف بها دوليًا.' },
      ],
    },
  },
  {
    slug: 'fuel',
    category: 'daily-life',
    icon: 'Fuel',
    popular: false,
    en: {
      name: 'Fuel Consumption Calculator',
      title: 'Fuel Consumption Calculator - Trip & Monthly Fuel Cost',
      description: 'Calculate fuel cost per trip and estimated monthly fuel expenses based on distance, consumption, and fuel price.',
      h1: 'Fuel Consumption Calculator',
      intro: 'Estimate how much you spend on fuel. Enter your distance, fuel consumed, and fuel price to get your cost per trip and projected monthly fuel cost.',
      keywords: ['fuel calculator', 'fuel cost calculator', 'gas mileage calculator'],
      faq: [
        { q: 'How is fuel cost per trip calculated?', a: 'It is calculated by multiplying the fuel consumed during the trip by the price per liter or gallon.' },
        { q: 'How do I estimate monthly fuel cost?', a: 'Multiply your average cost per trip by the number of similar trips you make in a month.' },
      ],
    },
    ar: {
      name: 'حاسبة استهلاك الوقود',
      title: 'حاسبة استهلاك الوقود - تكلفة الرحلة والتكلفة الشهرية',
      description: 'احسب تكلفة الوقود لكل رحلة والتكلفة الشهرية المقدرة بناءً على المسافة والاستهلاك وسعر الوقود.',
      h1: 'حاسبة استهلاك الوقود',
      intro: 'قدّر كم تنفق على الوقود. أدخل المسافة وكمية الوقود المستهلكة وسعر الوقود للحصول على تكلفة الرحلة والتكلفة الشهرية المتوقعة.',
      keywords: ['حاسبة الوقود', 'حاسبة تكلفة البنزين', 'حاسبة استهلاك الوقود'],
      faq: [
        { q: 'كيف تُحسب تكلفة الوقود لكل رحلة؟', a: 'تُحسب بضرب كمية الوقود المستهلكة خلال الرحلة في سعر اللتر أو الجالون.' },
        { q: 'كيف أقدّر التكلفة الشهرية للوقود؟', a: 'اضرب متوسط تكلفة الرحلة في عدد الرحلات المماثلة التي تقوم بها شهريًا.' },
      ],
    },
  },
  {
    slug: 'electricity-bill',
    category: 'daily-life',
    icon: 'Plug',
    popular: false,
    en: {
      name: 'Electricity Bill Calculator',
      title: 'Electricity Bill Calculator - Estimate Device & Monthly Cost',
      description: 'Estimate electricity consumption and monthly bill cost for any device based on wattage, hours of use, and price per kWh.',
      h1: 'Electricity Bill Calculator',
      intro: 'Estimate the electricity cost of any device. Enter the wattage, daily working hours, and price per kWh to see consumption and estimated monthly bill.',
      keywords: ['electricity bill calculator', 'power consumption calculator', 'kwh calculator'],
      faq: [
        { q: 'How is electricity consumption calculated?', a: 'Consumption in kWh is calculated by multiplying the device wattage by the hours used, then dividing by 1000.' },
        { q: 'How do I estimate the monthly bill for a device?', a: 'Multiply the daily kWh consumption by 30 and then by your price per kWh to estimate the monthly cost.' },
      ],
    },
    ar: {
      name: 'حاسبة فاتورة الكهرباء',
      title: 'حاسبة فاتورة الكهرباء - تقدير تكلفة الأجهزة والفاتورة الشهرية',
      description: 'قدّر استهلاك الكهرباء وتكلفة الفاتورة الشهرية لأي جهاز بناءً على القدرة الكهربائية وساعات التشغيل وسعر الكيلوواط ساعة.',
      h1: 'حاسبة فاتورة الكهرباء',
      intro: 'قدّر تكلفة الكهرباء لأي جهاز. أدخل القدرة بالواط وساعات التشغيل اليومية وسعر الكيلوواط ساعة لمعرفة الاستهلاك والفاتورة الشهرية المقدرة.',
      keywords: ['حاسبة فاتورة الكهرباء', 'حاسبة استهلاك الطاقة', 'حاسبة كيلوواط ساعة'],
      faq: [
        { q: 'كيف يُحسب استهلاك الكهرباء؟', a: 'يُحسب الاستهلاك بالكيلوواط ساعة بضرب قدرة الجهاز بالواط في ساعات الاستخدام ثم القسمة على 1000.' },
        { q: 'كيف أقدّر الفاتورة الشهرية لجهاز؟', a: 'اضرب الاستهلاك اليومي بالكيلوواط ساعة في 30 ثم في سعر الكيلوواط ساعة لتقدير التكلفة الشهرية.' },
      ],
    },
  },
];

export function getCalculator(slug) {
  return CALCULATORS.find((c) => c.slug === slug);
}
