/* ==========================================================================
   METAFOOD — CENTRALIZED APPLICATION ENGINE
   Sections:
   1. Centralized Restaurant Configuration
   2. Product Catalog (42 Distinct Products)
   3. Translations Dictionary (UZ default, RU, EN)
   4. State & LocalStorage Persistence
   5. Formatting & Translation Helpers
   6. Reusable HTML Component Renderers
   7. View Renderers (All 13 SPA Views)
   8. Cart, Slide-Over Drawer, Quick View & Form Validation
   9. GSAP Page Transitions, Hero Tilt & Swipers
   10. Hash Router & Event Delegation
   ========================================================================== */

(function () {
  'use strict';

  /* ========================================================================
     1. CENTRALIZED RESTAURANT CONFIGURATION
     ======================================================================== */
  const METAFOOD_CONFIG = {
    brandName: 'MetaFood',
    defaultLanguage: 'uz',
    supportedLanguages: ['uz', 'ru', 'en'],
    currency: 'UZS',
    theme: {
      primary: '#FF5500',
      primaryHover: '#E04800',
      secondary: '#DC2626',
      accent: '#F59E0B',
    },
    location: {
      uz: 'Andijon, Mumtoz',
      ru: 'Андижан, Мумтоз',
      en: 'Andijan, Mumtoz',
    },
    contact: {
      phonePlaceholder: '+998 (XX) XXX-XX-XX',
      instagramPlaceholder: '@metafood_andijon_placeholder',
      telegramPlaceholder: '@metafood_andijon_placeholder',
      emailPlaceholder: 'info@metafood-example.uz',
      address: {
        uz: 'Andijon shahri, Mumtoz hududi (namuna manzil)',
        ru: 'г. Андижан, район Мумтоз (образец адреса)',
        en: 'Andijan city, Mumtoz district (sample address)',
      },
      hours: {
        uz: 'Har kuni: 09:00 – 23:00 (namuna jadval)',
        ru: 'Ежедневно: 09:00 – 23:00 (образец графика)',
        en: 'Daily: 09:00 – 23:00 (sample hours)',
      },
    },
    delivery: {
      areaPlaceholder: {
        uz: 'Andijon shahri, Mumtoz va atrofidagi markaziy hududlar (namuna hudud)',
        ru: 'г. Андижан, Мумтоз и прилегающие центральные районы (образец зоны)',
        en: 'Andijan city, Mumtoz and central neighborhoods (sample coverage)',
      },
      etaSample: '25–40',
      sampleFeeUzs: 12000,
      freeThresholdUzs: 120000,
    },
    images: {
      hero: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=2160&q=92',
      about: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1800&q=92',
      catBurgers: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1600&q=90',
      catPizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=90',
      catFried: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=1600&q=90',
      catSandwiches: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1600&q=90',
      catDrinks: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1600&q=90',
      catDesserts: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1600&q=90',
    },
  };

  /* ========================================================================
     2. CENTRALIZED PRODUCT CATALOG (42 DISTINCT PRODUCTS)
     ======================================================================== */
  const PRODUCTS = [
    // BURGERS (8)
    {
      id: 101,
      name: 'Classic Burger',
      category: 'burgers',
      price: 34000,
      discountPercent: 0,
      featured: true,
      bestSeller: true,
      prepTime: '12',
      weight: '260 g',
      calories: '520 kcal',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Shirali mol go‘shti kotleti, yangi pomidor, aysberg salati, tuzlangan bodring va maxsus MetaFood sousi.',
        ru: 'Сочная говяжья котлета, свежие томаты, салат айсберг, маринованные огурчики и фирменный соус MetaFood.',
        en: 'Juicy grilled beef patty, fresh tomatoes, crisp iceberg lettuce, pickles, and signature MetaFood sauce.',
      },
    },
    {
      id: 102,
      name: 'Cheeseburger',
      category: 'burgers',
      price: 38000,
      discountPercent: 10,
      featured: true,
      bestSeller: true,
      prepTime: '12',
      weight: '275 g',
      calories: '580 kcal',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Grilda pishgan mol go‘shti, eritilgan chedder pishlog‘i, qizil piyoz va yumshoq kunjutli bulochka.',
        ru: 'Говяжья котлета на гриле, расплавленный сыр чеддер, красный лук и мягкая булочка с кунжутом.',
        en: 'Flame-grilled beef patty topped with melted cheddar cheese, red onion, and toasted sesame bun.',
      },
    },
    {
      id: 103,
      name: 'Double Cheeseburger',
      category: 'burgers',
      price: 49000,
      discountPercent: 0,
      featured: true,
      bestSeller: true,
      prepTime: '14',
      weight: '360 g',
      calories: '790 kcal',
      image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Ikki qavat mol go‘shti kotleti va ikki qavat haqiqiy chedder pishlog‘i bilan to‘yimli klassika.',
        ru: 'Двойная порция сочной говядины с двумя ломтиками сыра чеддер и пикантным соусом.',
        en: 'Double flame-seared beef patties layered with double melted cheddar and house relish.',
      },
    },
    {
      id: 104,
      name: 'Chicken Burger',
      category: 'burgers',
      price: 33000,
      discountPercent: 0,
      featured: false,
      bestSeller: true,
      prepTime: '11',
      weight: '250 g',
      calories: '490 kcal',
      image: 'https://images.unsplash.com/photo-1615297928064-24977384d0da?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Qarsildoq panirovkadagi tovuq filesi, mayin sarimsoqli sous va yangi salat bargi.',
        ru: 'Хрустящее куриное филе в золотистой панировке, нежный чесночный соус и свежий лист салата.',
        en: 'Crispy golden chicken fillet, creamy garlic dressing, and fresh lettuce on a warm brioche bun.',
      },
    },
    {
      id: 105,
      name: 'Spicy Burger',
      category: 'burgers',
      price: 41000,
      discountPercent: 0,
      featured: true,
      bestSeller: false,
      prepTime: '13',
      weight: '285 g',
      calories: '560 kcal',
      image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Achchiq xalapenyo qalampiri, olovli chili sousi va shirali mol go‘shti uyg‘unligi.',
        ru: 'Пикантный перец халапеньо, жгучий соус чили, сыр и сочная котлета для любителей острого.',
        en: 'Fiery jalapeno slices, smoky chili glaze, pepper cheese, and seared beef patty.',
      },
    },
    {
      id: 106,
      name: 'BBQ Burger',
      category: 'burgers',
      price: 44000,
      discountPercent: 15,
      featured: true,
      bestSeller: false,
      prepTime: '13',
      weight: '300 g',
      calories: '640 kcal',
      image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Tutunli barbekyu sousi, qarsildoq piyoz halqasi, chedder pishlog‘i va gril kotleti.',
        ru: 'Дымный соус барбекю, хрустящее луковое кольцо, сыр чеддер и ароматная котлета.',
        en: 'Smoky hickory BBQ glaze, crispy onion ring, cheddar slice, and char-grilled beef.',
      },
    },
    {
      id: 107,
      name: 'Mushroom Burger',
      category: 'burgers',
      price: 43000,
      discountPercent: 0,
      featured: false,
      bestSeller: false,
      prepTime: '14',
      weight: '295 g',
      calories: '610 kcal',
      image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Qovurilgan shampinyon qo‘ziqorinlari, qaymoqli sous va eritilgan pishloq bilan boyitilgan burger.',
        ru: 'Обжаренные шампиньоны в сливочном соусе, расплавленный сыр и нежная говяжья котлета.',
        en: 'Sauteed button mushrooms in creamy peppercorn sauce with melted cheese and beef patty.',
      },
    },
    {
      id: 108,
      name: 'Double Beef Burger',
      category: 'burgers',
      price: 52000,
      discountPercent: 0,
      featured: true,
      bestSeller: true,
      prepTime: '15',
      weight: '390 g',
      calories: '840 kcal',
      image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'MetaFood flagmani: ikki katta mol go‘shti kotleti, karamellangan piyoz va maxsus qayla.',
        ru: 'Флагман MetaFood: две крупные говяжьи котлеты, карамелизированный лук и фирменный соус.',
        en: 'Our flagship double-patty beef burger with caramelized onions and signature house sauce.',
      },
    },

    // PIZZA (7)
    {
      id: 109,
      name: 'Margherita',
      category: 'pizza',
      price: 65000,
      discountPercent: 0,
      featured: true,
      bestSeller: true,
      prepTime: '16',
      weight: '520 g',
      calories: '1120 kcal',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Italyancha klassik pitsa: yetilgan pomidor sousi, cho‘ziluvchan motsarella va yangi rayhon barglari.',
        ru: 'Классическая пицца с томатным соусом из спелых томатов, нежной моцареллой и свежим базиликом.',
        en: 'Classic hand-stretched dough with San Marzano style tomato sauce, mozzarella, and fresh basil.',
      },
    },
    {
      id: 110,
      name: 'Pepperoni',
      category: 'pizza',
      price: 78000,
      discountPercent: 10,
      featured: true,
      bestSeller: true,
      prepTime: '16',
      weight: '560 g',
      calories: '1340 kcal',
      image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Qarsildoq halol pepperoni kolbasasi, ko‘p motsarella pishlog‘i va oregano ziravori.',
        ru: 'Щедрый слой пикантной халяль пепперони, тянущаяся моцарелла и ароматный орегано.',
        en: 'Generous slices of savory halal pepperoni over rich tomato sauce and melted mozzarella.',
      },
    },
    {
      id: 111,
      name: 'Four Cheese',
      category: 'pizza',
      price: 82000,
      discountPercent: 0,
      featured: true,
      bestSeller: false,
      prepTime: '15',
      weight: '540 g',
      calories: '1290 kcal',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Motsarella, chedder, parmezan va qaymoqli pishloqning to‘rtta muvozanatli uyg‘unligi.',
        ru: 'Гармония четырёх сыров: моцарелла, чеддер, пармезан и нежный сливочный крем-сыр.',
        en: 'Rich blend of mozzarella, aged cheddar, parmesan, and creamy Alfredo base.',
      },
    },
    {
      id: 112,
      name: 'BBQ Chicken Pizza',
      category: 'pizza',
      price: 84000,
      discountPercent: 0,
      featured: true,
      bestSeller: true,
      prepTime: '17',
      weight: '590 g',
      calories: '1310 kcal',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Tovuq go‘shti, qizil piyoz, barbekyu sousi va oltinrang pishgan motsarella.',
        ru: 'Сочное куриное филе, сладкий красный лук, дымный соус барбекю и моцарелла.',
        en: 'Tender grilled chicken strips, red onion rings, smoky BBQ drizzle, and mozzarella.',
      },
    },
    {
      id: 113,
      name: 'Hawaiian Pizza',
      category: 'pizza',
      price: 76000,
      discountPercent: 0,
      featured: false,
      bestSeller: false,
      prepTime: '16',
      weight: '560 g',
      calories: '1190 kcal',
      image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Dudlangan tovuq bo‘laklari va shirin ananasning yengil, yoqimli uyg‘unligi.',
        ru: 'Копчёная курочка и сочные кусочки ананаса на тонком хрустящем тесте с моцареллой.',
        en: 'Smoked chicken slices paired with sweet golden pineapple and bubbling mozzarella.',
      },
    },
    {
      id: 114,
      name: 'Vegetarian Pizza',
      category: 'pizza',
      price: 69000,
      discountPercent: 15,
      featured: false,
      bestSeller: false,
      prepTime: '15',
      weight: '530 g',
      calories: '980 kcal',
      image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Bulg‘or qalampiri, shampinyon, zaytun, makkajo‘xori va yangi pomidorlar bilan rang-barang pitsa.',
        ru: 'Яркий микс из болгарского перца, шампиньонов, маслин, сладкой кукурузы и томатов.',
        en: 'Crisp bell peppers, mushrooms, black olives, sweet corn, and vine tomatoes on mozzarella.',
      },
    },
    {
      id: 115,
      name: 'Meat Lovers Pizza',
      category: 'pizza',
      price: 92000,
      discountPercent: 0,
      featured: true,
      bestSeller: true,
      prepTime: '18',
      weight: '640 g',
      calories: '1520 kcal',
      image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Mol go‘shti qiymasi, dudlangan kolbasa, tovuq filesi va ikki hissa pishloq bilan to‘yimli pitsa.',
        ru: 'Мясной хит: говяжий фарш, копчёные колбаски, куриное филе и двойная порция сыра.',
        en: 'Loaded with seasoned ground beef, halal salami, roasted chicken, and extra mozzarella.',
      },
    },

    // FRIED FOOD (8)
    {
      id: 116,
      name: 'Chicken Nuggets (9 pcs)',
      category: 'fried-food',
      price: 29000,
      discountPercent: 0,
      featured: true,
      bestSeller: true,
      prepTime: '9',
      weight: '210 g',
      calories: '460 kcal',
      image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Yumshoq tovuq go‘shtidan qarsildoq oltinrang naggetslar, maxsus sous bilan.',
        ru: 'Нежные куриные наггетсы в хрустящей золотистой корочке с соусом на выбор.',
        en: 'Nine tender all-white meat chicken nuggets in a crispy golden coating with dipping sauce.',
      },
    },
    {
      id: 117,
      name: 'Chicken Wings (6 pcs)',
      category: 'fried-food',
      price: 36000,
      discountPercent: 10,
      featured: true,
      bestSeller: true,
      prepTime: '11',
      weight: '290 g',
      calories: '590 kcal',
      image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Ziravorlarda marinadlangan va qarsildoq qilib qovurilgan shirali tovuq qanotchalari.',
        ru: 'Сочные куриные крылышки в пряном маринаде с хрустящей корочкой.',
        en: 'Six crispy marinated chicken wings glazed with savory spices and served hot.',
      },
    },
    {
      id: 118,
      name: 'Crispy Chicken Box',
      category: 'fried-food',
      price: 42000,
      discountPercent: 0,
      featured: true,
      bestSeller: false,
      prepTime: '12',
      weight: '340 g',
      calories: '680 kcal',
      image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Suvli tovuq bo‘laklari maxsus ziravorli panirovkada — tashqarisi qarsildoq, ichi yumshoq.',
        ru: 'Фирменная хрустящая курочка по секретному рецепту специй: нежная внутри и хрустящая снаружи.',
        en: 'Signature spiced crispy fried chicken pieces cooked golden to order.',
      },
    },
    {
      id: 119,
      name: 'French Fries (Large)',
      category: 'fried-food',
      price: 18000,
      discountPercent: 0,
      featured: false,
      bestSeller: true,
      prepTime: '7',
      weight: '160 g',
      calories: '390 kcal',
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Yengil dengiz tuzi sepilgan klassik issiq va qarsildoq kartoshka fri.',
        ru: 'Классический горячий хрустящий картофель фри с щепоткой морской соли.',
        en: 'Golden shoestring french fries tossed with fine sea salt and served piping hot.',
      },
    },
    {
      id: 120,
      name: 'Curly Fries',
      category: 'fried-food',
      price: 22000,
      discountPercent: 0,
      featured: false,
      bestSeller: false,
      prepTime: '8',
      weight: '180 g',
      calories: '430 kcal',
      image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Paprika va sarimsoq ziravorlari bilan qovurilgan spiral shaklidagi kartoshka fri.',
        ru: 'Спиральный картофель фри в ароматной панировке с паприкой и чесноком.',
        en: 'Seasoned spiral-cut fries dusted with sweet paprika and roasted garlic spices.',
      },
    },
    {
      id: 121,
      name: 'Chicken Strips (5 pcs)',
      category: 'fried-food',
      price: 34000,
      discountPercent: 0,
      featured: true,
      bestSeller: false,
      prepTime: '10',
      weight: '240 g',
      calories: '510 kcal',
      image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Uzunchoq tovuq filesi bo‘laklari oltinrang qarsildoq qobiqda, pishloqli sous bilan.',
        ru: 'Нежные полоски куриного филе в хрустящей панировке с сырным дип-соусом.',
        en: 'Five crispy hand-breaded chicken tender strips served with warm cheese dip.',
      },
    },
    {
      id: 122,
      name: 'Onion Rings',
      category: 'fried-food',
      price: 20000,
      discountPercent: 0,
      featured: false,
      bestSeller: false,
      prepTime: '7',
      weight: '150 g',
      calories: '360 kcal',
      image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Shirin piyozdan tayyorlangan yengil va qarsildoq oltin halqachalar.',
        ru: 'Хрустящие золотистые кольца из сладкого лука, идеальная закуска к бургерам.',
        en: 'Crispy beer-free golden battered sweet onion rings fried until crunch-ready.',
      },
    },
    {
      id: 123,
      name: 'Loaded Fries',
      category: 'fried-food',
      price: 32000,
      discountPercent: 15,
      featured: true,
      bestSeller: true,
      prepTime: '10',
      weight: '280 g',
      calories: '650 kcal',
      image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Issiq chedder sousi, qovurilgan go‘sht bo‘laklari va ko‘k piyoz bilan qoplangan kartoshka fri.',
        ru: 'Картофель фри под густым сырным соусом чеддер с кусочками говядины и зеленью.',
        en: 'Crispy fries smothered in warm cheddar sauce, seasoned beef bits, and fresh scallions.',
      },
    },

    // SANDWICHES & WRAPS (5)
    {
      id: 124,
      name: 'MetaHot Dog',
      category: 'sandwiches',
      price: 24000,
      discountPercent: 0,
      featured: false,
      bestSeller: true,
      prepTime: '8',
      weight: '210 g',
      calories: '440 kcal',
      image: 'https://images.unsplash.com/photo-1612392062631-94dd858cba88?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Grilda qizartirilgan halol sosiska, karamellangan piyoz, xantal va maxsus sous.',
        ru: 'Сосиска халяль на гриле в мягкой булке с карамелизированным луком и горчичным соусом.',
        en: 'Char-grilled halal sausage in a warm split bun with crispy onions and signature mustard glaze.',
      },
    },
    {
      id: 125,
      name: 'Club Sandwich',
      category: 'sandwiches',
      price: 37000,
      discountPercent: 0,
      featured: true,
      bestSeller: true,
      prepTime: '11',
      weight: '310 g',
      calories: '620 kcal',
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Uch qavat qovurilgan tost, gril tovuq, pishloq, yangi sabzavotlar va kartoshka fri.',
        ru: 'Трёхслойный тост с курицей гриль, сыром, свежими овощами и порцией картофеля фри.',
        en: 'Triple-decker toasted sandwich stacked with grilled chicken, cheddar, tomatoes, and fries.',
      },
    },
    {
      id: 126,
      name: 'Chicken Wrap',
      category: 'sandwiches',
      price: 33000,
      discountPercent: 10,
      featured: true,
      bestSeller: false,
      prepTime: '10',
      weight: '270 g',
      calories: '510 kcal',
      image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Yumshoq lavash ichida qarsildoq tovuq, pomidor, bodring va sarimsoqli qaymoq sousi.',
        ru: 'Пшеничная тортилья с хрустящей курочкой, свежими овощами и сливочно-чесночным соусом.',
        en: 'Warm tortilla wrap filled with crispy chicken strips, crisp veggies, and creamy garlic sauce.',
      },
    },
    {
      id: 127,
      name: 'Beef Wrap',
      category: 'sandwiches',
      price: 39000,
      discountPercent: 0,
      featured: false,
      bestSeller: true,
      prepTime: '11',
      weight: '290 g',
      calories: '590 kcal',
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Grilda pishgan mol go‘shti bo‘laklari, qarsildoq salat va tutunli sous bilan o‘ralgan lavash.',
        ru: 'Лаваш с рубленой говядиной на гриле, хрустящим салатом и дымным соусом.',
        en: 'Seared beef strips rolled in toasted flatbread with fresh greens and smoky house dressing.',
      },
    },
    {
      id: 128,
      name: 'Chicken Sandwich',
      category: 'sandwiches',
      price: 31000,
      discountPercent: 0,
      featured: false,
      bestSeller: false,
      prepTime: '10',
      weight: '245 g',
      calories: '480 kcal',
      image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Qarsildoq chiabatta noni orasida marinadlangan tovuq filesi va yangi ko‘katlar.',
        ru: 'Маринованное куриное филе в хрустящей чиабатте со свежей зеленью и соусом.',
        en: 'Herb-marinated chicken breast served in toasted artisan ciabatta with crisp greens.',
      },
    },

    // DRINKS (7)
    {
      id: 129,
      name: 'Coca-Cola (0.5 L)',
      category: 'drinks',
      price: 12000,
      discountPercent: 0,
      featured: false,
      bestSeller: true,
      prepTime: '2',
      weight: '500 ml',
      calories: '210 kcal',
      image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Muzdek klassik Coca-Cola — burger va pitsalar bilan ideal hamroh.',
        ru: 'Охлаждённая классическая Coca-Cola — идеальная пара к бургерам и пицце.',
        en: 'Ice-cold classic Coca-Cola served chilled to pair with any burger or pizza.',
      },
    },
    {
      id: 130,
      name: 'Fanta Orange (0.5 L)',
      category: 'drinks',
      price: 12000,
      discountPercent: 0,
      featured: false,
      bestSeller: false,
      prepTime: '2',
      weight: '500 ml',
      calories: '220 kcal',
      image: 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Yorqin apelsin ta’mli salqin gazlangan ichimlik.',
        ru: 'Яркий освежающий газированный напиток со вкусом спелого апельсина.',
        en: 'Sparkling orange soda served ice-cold with bright citrus flavor.',
      },
    },
    {
      id: 131,
      name: 'Sprite (0.5 L)',
      category: 'drinks',
      price: 12000,
      discountPercent: 0,
      featured: false,
      bestSeller: false,
      prepTime: '2',
      weight: '500 ml',
      calories: '190 kcal',
      image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Limon va laym tetikligi bilan salqin ichimlik.',
        ru: 'Кристально свежий напиток со вкусом лимона и лайма.',
        en: 'Crisp lemon-lime sparkling drink for instant refreshment.',
      },
    },
    {
      id: 132,
      name: 'Peach Iced Tea',
      category: 'drinks',
      price: 15000,
      discountPercent: 0,
      featured: true,
      bestSeller: false,
      prepTime: '3',
      weight: '450 ml',
      calories: '140 kcal',
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Shaftoli va yalpiz bo‘laklari bilan damlangan salqin yaxna choy.',
        ru: 'Освежающий холодный чай со вкусом спелого персика и свежей мятой.',
        en: 'Freshly brewed chilled black tea infused with ripe peach and garden mint.',
      },
    },
    {
      id: 133,
      name: 'Citrus Lemonade',
      category: 'drinks',
      price: 18000,
      discountPercent: 10,
      featured: true,
      bestSeller: true,
      prepTime: '4',
      weight: '450 ml',
      calories: '150 kcal',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Yangi siqilgan limon sharbati, laym va yalpiz barglaridan uy usulida tayyorlangan limonad.',
        ru: 'Домашний лимонад из свежего лимонного сока, лайма и ароматной мяты.',
        en: 'House-crafted citrus lemonade made with fresh lemon, lime, and crushed mint.',
      },
    },
    {
      id: 134,
      name: 'Vanilla Milkshake',
      category: 'drinks',
      price: 25000,
      discountPercent: 0,
      featured: true,
      bestSeller: true,
      prepTime: '5',
      weight: '400 ml',
      calories: '420 kcal',
      image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Qaymoqli muzqaymoq va tabiiy vanildan tayyorlangan quyuq sutli kokteyl.',
        ru: 'Густой молочный коктейль из сливочного пломбира и натуральной ванили.',
        en: 'Thick creamy milkshake spun with real vanilla bean ice cream and whipped topping.',
      },
    },
    {
      id: 135,
      name: 'Iced Caramel Latte',
      category: 'drinks',
      price: 24000,
      discountPercent: 0,
      featured: false,
      bestSeller: false,
      prepTime: '4',
      weight: '380 ml',
      calories: '240 kcal',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Ikki hissa espresso, salqin sut va shirin karamel siropi bilan yaxna kofe.',
        ru: 'Двойной эспрессо с охлаждённым молоком, льдом и нежным карамельным сиропом.',
        en: 'Chilled double espresso layered over cold milk, ice, and golden caramel drizzle.',
      },
    },

    // DESSERTS (7)
    {
      id: 136,
      name: 'Chocolate Cake',
      category: 'desserts',
      price: 28000,
      discountPercent: 0,
      featured: true,
      bestSeller: true,
      prepTime: '4',
      weight: '160 g',
      calories: '460 kcal',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Qora shokoladli ganash bilan qoplangan nam va mayin uch qavatli tort bo‘lagi.',
        ru: 'Нежный трёхслойный шоколадный торт под бархатным ганашем из тёмного шоколада.',
        en: 'Rich triple-layer chocolate sponge finished with silky dark cocoa ganache.',
      },
    },
    {
      id: 137,
      name: 'New York Cheesecake',
      category: 'desserts',
      price: 30000,
      discountPercent: 10,
      featured: true,
      bestSeller: true,
      prepTime: '4',
      weight: '150 g',
      calories: '430 kcal',
      image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Qaymoqli tvorogli asos va qarsildoq pechenye taglikdan iborat klassik chizkeyk.',
        ru: 'Классический сливочный чизкейк на рассыпчатой песочной основе.',
        en: 'Velvety baked cream cheese cake resting on a golden butter biscuit crust.',
      },
    },
    {
      id: 138,
      name: 'Berry Sundae Ice Cream',
      category: 'desserts',
      price: 19000,
      discountPercent: 0,
      featured: false,
      bestSeller: false,
      prepTime: '3',
      weight: '170 g',
      calories: '310 kcal',
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Vanilli qaymoq muzqaymoq ustida o‘rmon mevalari sousi va bodom bo‘lakchalari.',
        ru: 'Сливочное мороженое с ягодным топпингом и хрустящими орешками.',
        en: 'Creamy vanilla ice cream topped with warm wild berry compote and toasted nuts.',
      },
    },
    {
      id: 139,
      name: 'Warm Chocolate Brownie',
      category: 'desserts',
      price: 25000,
      discountPercent: 0,
      featured: true,
      bestSeller: false,
      prepTime: '5',
      weight: '140 g',
      calories: '440 kcal',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Ichi yumshoq erigan shokoladli issiq brauni bo‘lagi.',
        ru: 'Тёплый шоколадный брауни с насыщенной тающей серединкой.',
        en: 'Warm fudgy dark chocolate brownie square with crisp crackle top.',
      },
    },
    {
      id: 140,
      name: 'Glazed Donuts (2 pcs)',
      category: 'desserts',
      price: 22000,
      discountPercent: 0,
      featured: false,
      bestSeller: true,
      prepTime: '3',
      weight: '150 g',
      calories: '410 kcal',
      image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Shokolad va qulupnay glazuriga botirilgan ikki dona yumshoq ponchik.',
        ru: 'Два воздушных пончика в шоколадной и ягодной глазури.',
        en: 'Two pillowy-soft ring donuts dipped in chocolate and strawberry glaze.',
      },
    },
    {
      id: 141,
      name: 'Classic Tiramisu',
      category: 'desserts',
      price: 31000,
      discountPercent: 0,
      featured: false,
      bestSeller: false,
      prepTime: '4',
      weight: '155 g',
      calories: '390 kcal',
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Maskarpone kremi, espresso bilan namlangan savoyardi va kakao kukuni.',
        ru: 'Итальянский десерт с кремом маскарпоне, эспрессо и пудрой из какао.',
        en: 'Layered espresso-soaked ladyfingers, mascarpone cream, and fine Dutch cocoa.',
      },
    },
    {
      id: 142,
      name: 'Belgian Waffle',
      category: 'desserts',
      price: 27000,
      discountPercent: 15,
      featured: true,
      bestSeller: false,
      prepTime: '6',
      weight: '190 g',
      calories: '470 kcal',
      image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=1600&q=90',
      description: {
        uz: 'Issiq qarsildoq Belgiya vaflisi yangi rezavorlar va shokolad sousi bilan.',
        ru: 'Тёплая бельгийская вафля со свежими ягодами и шоколадным сиропом.',
        en: 'Crisp golden Belgian waffle finished with fresh berries and warm chocolate drizzle.',
      },
    },
  ];

  /* ========================================================================
     3. TRANSLATIONS DICTIONARY (UZ DEFAULT, RU, EN)
     ======================================================================== */
  const TRANSLATIONS = {
    uz: {
      meta: {
        homeTitle: 'MetaFood — Andijon, Mumtoz | Tezkor va Mazali Fast-Food',
        homeDesc: 'MetaFood (Andijon, Mumtoz) — yangi tayyorlangan burgerlar, issiq pitsa, qarsildoq tovuq, ichimliklar va shirinliklar.',
      },
      a11y: {
        skipToContent: "Asosiy kontentga o'tish",
        openMenu: 'Menyuni ochish',
        closeMenu: 'Menyuni yopish',
        cartLink: 'Savatga o‘tish',
        addToCart: 'Savatga qo‘shish',
        increaseQty: 'Miqdorni oshirish',
        decreaseQty: 'Miqdorni kamaytirish',
        removeItem: 'O‘chirish',
        mainNav: 'Asosiy navigatsiya',
        langSwitcher: 'Tilni tanlash',
        closeModal: 'Yopish',
        quickView: 'Tezkor ko‘rish',
        searchShortcut: 'Menyudan qidirish',
        scrollDown: 'Pastga tushish',
      },
      common: {
        currencyUnit: "so'm",
        min: 'daq',
        view: "Ko'rish",
        addToCart: "Savatga qo'shish",
        addedToast: 'savatga qo‘shildi',
        backToMenu: 'Menyuga qaytish',
        home: 'Bosh sahifa',
        itemsCountSuffix: 'ta taom',
        popularTag: 'Xit',
        quickView: 'Tezkor ko‘rish',
        viewFullPage: 'To‘liq sahifa',
        close: 'Yopish',
      },
      nav: {
        home: 'Bosh sahifa',
        menu: 'Menyu',
        burgers: 'Burgerlar',
        pizza: 'Pitsa',
        delivery: 'Yetkazish',
        about: 'Biz haqimizda',
        contact: 'Aloqa',
        faq: 'Savollar',
        cart: 'Savat',
      },
      categories: {
        all: 'Barchasi',
        burgers: 'Burgerlar',
        pizza: 'Pitsa',
        'fried-food': 'Qarsildoq taomlar',
        friedFood: 'Qarsildoq taomlar',
        sandwiches: 'Sendvichlar',
        drinks: 'Ichimliklar',
        desserts: 'Shirinliklar',
        burgersSub: 'Shirali & Issiq',
        pizzaSub: 'Tandir pechdan',
        friedFoodSub: 'Oltin qarsildoq',
        sandwichesSub: 'Yumshoq & To‘yimli',
        drinksSub: 'Salqin & Tetik',
        dessertsSub: 'Shirin lazzat',
      },
      hero: {
        kicker: 'Andijon, Mumtoz · Har kuni issiq',
        title: 'Haqiqiy olovda pishgan lazzat markazi',
        titleLead: 'Haqiqiy olovda',
        titleAccent: 'pishgan lazzat markazi',
        subtitle:
          "MetaFood oshxonasida har bir burger yangi maydalangan go'shtdan, har bir pitsa esa qarsildoq xamirdan buyurtma asosida tayyorlanadi.",
        ctaPrimary: "To'liq menyuni ko'rish",
        ctaSecondary: 'Mashhur burgerlar',
        stat1Label: 'Menyuda taomlar',
        stat2Label: 'Tayyorlash vaqti',
        stat2Value: '10–15 daq',
        stat3Label: 'Manzil',
        floatPizzaTitle: 'Margarita Pitsa',
        floatBurgerTitle: 'Double Beef Burger',
      },
      home: {
        categoriesKicker: "Yo'nalishlar",
        categoriesTitle: "Ommabop bo'limlar",
        viewAllMenu: 'Barcha taomlar →',
        bestSellersKicker: "Eng ko'p tanlangan",
        bestSellersTitle: 'Xit taomlarimiz',
        galleryKicker: '4K HD Galereya',
        galleryTitle: 'Oshxonamizdan ishtaha ochar kadrlar',
        gallerySubtitle:
          "Har qanday rasm ustiga bosing — taom tafsilotini oching va bir zumda savatga qo'shing.",
        promosKicker: 'Maxsus takliflar',
        promosTitle: 'Haftalik aksiyalar va setlar',
        popularKicker: 'Mehmonlar tanlovi',
        popularTitle: 'Mashhur pitsalar va gazaklar',
        aboutKicker: 'MetaFood hikoyasi',
        aboutTitle: 'Andijonda zamonaviy fast-food madaniyati',
        aboutBody:
          "MetaFood restorani Mumtoz hududida mehmonlarga tezkor xizmat, toza masalliqlar va muvozanatli ta'm uyg'unligini taqdim etadi. Har bir buyurtma issiq holda dasturxonga tortiladi.",
        aboutCta: 'Batafsil tanishish',
        testimonialsKicker: 'Namuna fikrlar (Demo)',
        testimonialsTitle: 'Mehmonlar taassurotlari',
        testimonialsNote: "Quyida sayt maketi uchun namunaviy ko'rinishdagi fikrlar keltirilgan.",
        contactKicker: 'Tashrif buyuring',
        contactTitle: "Biz bilan bog'laning",
        contactDesc: "Aloqa ma'lumotlari markazlashtirilgan sozlamalar orqali oson tahrirlanadi.",
        contactCta: 'Aloqa sahifasi',
        deliveryCta: 'Yetkazib berish shartlari',
      },
      promos: [
        {
          kicker: 'Hafta taklifi · -15%',
          title: 'BBQ Burger va Loaded Fries juftligi',
          desc: "Tutunli BBQ sousli burger va pishloqli kartoshka fri chegirmali narxlarda.",
          cta: 'Burgerlarni ko‘rish',
          href: '#/burgers',
          image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=1600&q=90',
        },
        {
          kicker: 'Oilaviy tanlov · -10%',
          title: 'Pepperoni Pitsa — issiq va cho‘ziluvchan',
          desc: "Kechki uchrashuvlar uchun yangi pishirilgan pitsa va salqin ichimliklar to‘plami.",
          cta: 'Pitsalarga o‘tish',
          href: '#/pizza',
          image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=1600&q=90',
        },
        {
          kicker: 'Shirin tanaffus · -15%',
          title: 'Belgiya vaflisi va Citrus Lemonade',
          desc: "Tushlikdan keyingi yoqimli shirinlik va yangi siqilgan sitrusli limonad.",
          cta: 'Shirinliklarni ko‘rish',
          href: '#/desserts',
          image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=1600&q=90',
        },
      ],
      testimonials: [
        {
          name: 'Azizbek K. (Namuna)',
          role: 'Andijon, Mumtoz · Demo fikr',
          quote: 'Double Beef Burger va issiq kartoshka fri juda tez tayyorlandi. Tovuq qanotchalari ham qarsildoq chiqdi.',
        },
        {
          name: 'Madina R. (Namuna)',
          role: 'Doimiy mehmon · Demo fikr',
          quote: 'Four Cheese pitsasi hamda sitrusli limonad birga ajoyib mos keladi. Zal shinam va toza.',
        },
        {
          name: 'Sardor T. (Namuna)',
          role: 'Tushlik buyurtmasi · Demo fikr',
          quote: 'Menyudan qidirish va savatga qo‘shish juda qulay. Narxlar va porsiya hajmi aniq ko‘rsatilgan.',
        },
        {
          name: 'Dilnoza M. (Namuna)',
          role: 'Oilaviy tashrif · Demo fikr',
          quote: 'Shokoladli tort va chizkeyk bolalarga juda yoqdi. Xizmat ko‘rsatish tezligi a’lo darajada.',
        },
      ],
      menu: {
        kicker: 'Barcha taomlar',
        title: "MetaFood To'liq Menyusi",
        subtitle: "Burgerlar, pitsa, qarsildoq tovuq, sendvichlar, ichimliklar va shirinliklarni qidiring hamda saralang.",
        searchLabel: 'Taom qidirish',
        searchPlaceholder: "Taom nomi yoki tarkibi bo'yicha qidiring...",
        sortLabel: 'Saralash',
        sortFeatured: 'Tavsiya etilgan',
        sortPopular: 'Eng mashhurlari',
        sortPriceAsc: 'Narx: arzondan qimmatga',
        sortPriceDesc: 'Narx: qimmatdan arzonga',
        onlyFeatured: 'Faqat xit taomlar',
        onlyDeals: 'Chegirmalar (-%)',
        maxPriceLabel: 'Maks. narx:',
        clearFilters: 'Tozalash',
        emptyTitle: 'Hech qanday taom topilmadi',
        emptyDesc: "Qidiruv so'zini o'zgartirib ko'ring yoki filtrlarni tozalang.",
        resultsFound: 'ta taom topildi',
        otherCategories: "Boshqa bo'limlar:",
      },
      categoryViews: {
        burgers: {
          kicker: 'Gril va bulochka',
          title: 'MetaFood Burgerlari',
          subtitle: 'Shirali mol va tovuq go‘shtli, chedder pishloqli hamda maxsus sousli 8 xil burger.',
        },
        pizza: {
          kicker: 'Issiq tandir pechdan',
          title: 'Pitsalar Kolleksiyasi',
          subtitle: 'Cho‘ziluvchan motsarella va boy nachinkali 7 xil yangi pishgan pitsa.',
        },
        'fried-food': {
          kicker: 'Qarsildoq lazzat',
          title: 'Qarsildoq Taomlar va Kartoshka Fri',
          subtitle: 'Naggetslar, qanotchalar, stripslar, piyoz halqalari va issiq kartoshka fri turlari.',
        },
        drinks: {
          kicker: 'Salqin va tetiklantiruvchi',
          title: 'Ichimliklar va Kokteyllar',
          subtitle: 'Gazlangan ichimliklar, uy limonadi, yaxna choy, sutli kokteyl va kofe.',
        },
        desserts: {
          kicker: 'Shirin yakun',
          title: 'Shirinliklar Menyusi',
          subtitle: 'Shokoladli tort, Nyu-York chizkeyki, brauni, ponchiklar va Belgiya vaflisi.',
        },
      },
      pdp: {
        weight: 'Vazn / Hajm',
        calories: 'Energiya',
        prepTime: 'Tayyorlanishi',
        addToCart: "Savatga qo'shish",
        goToCart: "Savatga o'tish",
        relatedKicker: "Qo'shimcha tavsiya",
        relatedTitle: "O'xshash taomlar",
        notFoundTitle: 'Taom topilmadi',
        notFoundDesc: 'Tanlangan taom menyudan topilmadi. Iltimos, umumiy menyuga qayting.',
      },
      cart: {
        kicker: 'Buyurtma savati',
        title: 'Sizning savatingiz',
        clearCart: 'Savatni tozalash',
        clearedToast: 'Savat tozalandi',
        emptyTitle: 'Savatingiz hozircha bo‘sh',
        emptyDesc: 'Mazali burgerlar, issiq pitsa yoki salqin ichimliklarni menyudan tanlang.',
        browseMenu: 'Menyuga o‘tish',
        drawerItemsSuffix: 'ta mahsulot',
        freeDeliveryReached: 'Bepul yetkazish (namuna) ochildi!',
        freeDeliveryRemaining: 'Bepul yetkazishgacha (namuna) yana:',
        goToCheckout: "To'liq savat va buyurtma",
        continueBrowsing: 'Menyuni ko‘rish',
        summaryTitle: 'Buyurtma hisobi',
        subtotal: 'Taomlar qiymati',
        savings: 'Aksiya tejovi',
        deliverySampleLabel: 'Yetkazib berish (namuna)',
        freeLabel: 'Bepul (namuna)',
        total: 'Jami (namuna)',
        demoNotice:
          'Frontend Namoyish Rejimi: Ushbu savat va buyurtma shakli faqat sayt imkoniyatlarini ko‘rsatish uchun ishlaydi. Haqiqiy to‘lov olinmaydi va buyurtma restoranga yuborilmaydi.',
        nameLabel: 'Ismingiz',
        namePlaceholder: 'Masalan: Jasur Alimov',
        phoneLabel: 'Telefon raqamingiz',
        phonePlaceholder: '+998 90 000 00 00',
        addressLabel: 'Manzil (Andijon)',
        addressPlaceholder: 'Mumtoz, ko‘cha va uy raqami',
        notesLabel: 'Izoh (ixtiyoriy)',
        notesPlaceholder: 'Sous yoki tayyorlash bo‘yicha istaklar',
        submitDemo: 'Namuna buyurtmani rasmiylashtirish',
        errName: 'Iltimos, kamida 2 ta harfdan iborat ismingizni kiriting.',
        errPhone: 'Iltimos, to‘g‘ri telefon raqamini kiriting.',
        errAddress: 'Iltimos, manzilni kiriting.',
        receiptKicker: 'FRONTEND NAMUNA CHEKI (REAL BUYURTMA EMAS)',
        receiptTitle: 'Namuna buyurtma shakllantirildi',
        receiptDesc: 'Bu faqat interfeys namoyishi. Haqiqiy restoran buyurtmasi yaratilmadi.',
        receiptCustomer: 'Mijoz',
        receiptNewOrder: 'Menyuga qaytish',
      },
      about: {
        kicker: 'Biz haqimizda',
        title: 'MetaFood — Andijon, Mumtozda yaratilgan sifatli ta’m',
        lead: "MetaFood har bir tashrif buyuruvchiga tezkor, ozoda va mazali ovqatlanish tajribasini ulashish maqsadida Andijon, Mumtoz hududida faoliyat yuritadi.",
        story: "Oshxonamizda yarim tayyor uzoq saqlangan mahsulotlar o'rniga har kuni yangi sabzavotlar, yumshoq nonlar va saralangan go'shtdan foydalanamiz. Buyurtma berilgan zahoti gril va pech ishga tushadi.",
        pillar1Title: 'Saralangan masalliqlar',
        pillar1Desc: "Kundalik yangi sabzavotlar, yumshoq bulochka va halol standartlarga mos go'sht.",
        pillar2Title: 'Ochiq oshxona',
        pillar2Desc: 'Tozalik va harorat nazorati ostida tezkor tayyorlash jarayoni.',
        pillar3Title: 'Muvozanatli menyu',
        pillar3Desc: 'Kattalar va bolalar uchun birdek ma’qul 42 dan ortiq taom va shirinliklar.',
        cta: 'Menyuni ko‘rish',
      },
      contact: {
        kicker: 'Aloqa',
        title: 'MetaFood bilan bog‘lanish',
        subtitle: 'Quyidagi telefon raqami, ijtimoiy tarmoqlar va manzil namuna placeholder sifatida keltirilgan.',
        phoneLabel: 'Telefon (placeholder)',
        instagramLabel: 'Instagram (placeholder)',
        telegramLabel: 'Telegram (placeholder)',
        addressLabel: 'Manzil',
        hoursLabel: 'Ish vaqti',
        mapSubtitle: 'Andijon shahri, Mumtoz hududi (namuna xarita nuqtasi)',
        mapExternal: 'OpenStreetMap orqali ochish',
        formTitle: 'Xabar yuborish (Demo shakl)',
        formNotice: 'Namoyish shakli: Xabarlar real serverga yoki restoranga yuborilmaydi.',
        formName: 'Ismingiz',
        formEmail: 'Elektron pochta',
        formMessage: 'Xabaringiz',
        formSubmit: 'Namuna xabarni yuborish',
        errEmail: 'Iltimos, to‘g‘ri elektron pochta manzilini kiriting.',
        errMessage: 'Iltimos, kamida 10 ta belgidan iborat xabar yozing.',
        formSuccess: 'Namuna xabar muvaffaqiyatli tekshirildi (frontend demo).',
      },
      delivery: {
        kicker: 'Yetkazib berish',
        title: 'Yetkazib berish ma’lumotlari (Namuna)',
        subtitle: 'Quyidagi hudud, vaqt va narxlar tahrirlanadigan namuna ma’lumotlar bo‘lib, real yetkazib berish kafolatini anglatmaydi.',
        areaLabel: 'Namuna hudud',
        etaLabel: 'Taxminiy vaqt (namuna)',
        etaValue: '25–40 daqiqa',
        feeLabel: 'Namuna yetkazish narxi',
        freeRuleLabel: 'Bepul yetkazish chegarasi (namuna)',
        stepsTitle: 'Jarayon qanday ishlaydi',
        steps: [
          { num: '01', title: 'Taomlarni tanlash', desc: 'Menyudan burger, pitsa yoki ichimliklarni savatga qo‘shing.' },
          { num: '02', title: 'Tasdiqlash (Demo)', desc: 'Savatda manzil va aloqa ma’lumotlarini tekshiring.' },
          { num: '03', title: 'Issiq tayyorlash', desc: 'Taomlar buyurtma tushgandan so‘ng yangidan pishiriladi.' },
          { num: '04', title: 'Eshikgacha eltish', desc: 'Issiqlikni saqlovchi qadoqda kuryer orqali topshiriladi.' },
        ],
        faqTitle: 'Yetkazib berish bo‘yicha ko‘p beriladigan savollar',
        faqs: [
          {
            q: 'Qaysi hududlarga yetkazib berish ko‘zda tutilgan?',
            a: 'Ushbu maketda Andijon shahri, Mumtoz va yaqin ko‘chalar namuna hudud sifatida ko‘rsatilgan. Haqiqiy qamrov restoran konfiguratsiyasiga qarab belgilanadi.',
          },
          {
            q: 'Yetkazib berish vaqti qancha davom etadi?',
            a: 'Namuna hisob-kitobga ko‘ra tayyorlash va yo‘l uchun taxminan 25–40 daqiqa ko‘rsatilgan (tirbandlikka qarab o‘zgarishi mumkin).',
          },
          {
            q: 'Sayt orqali real to‘lov qilish mumkinmi?',
            a: 'Yo‘q, bu veb-sayt backend va to‘lov tizimisiz frontend namoyish sifatida yaratilgan.',
          },
        ],
      },
      faq: {
        kicker: 'Yordam markazi',
        title: 'Ko‘p beriladigan savollar',
        subtitle: 'MetaFood menyusi, masalliqlar va savat ishlashi haqida asosiy javoblar.',
        items: [
          {
            q: 'MetaFood restorani qayerda joylashgan?',
            a: 'MetaFood Andijon shahri, Mumtoz hududida joylashgan brend sifatida taqdim etilgan. Aniq manzil va mo‘ljal Aloqa sahifasida tahrirlanadi.',
          },
          {
            q: 'Go‘sht mahsulotlari halol standartlarga mosmi?',
            a: 'Ha, menyudagi barcha mol va tovuq go‘shtlari halol talablarga mos ravishda tayyorlanishi ko‘zda tutilgan.',
          },
          {
            q: 'Savatga qo‘shilgan taomlar sahifa yangilanganda saqlanadimi?',
            a: 'Ha! Savatingiz va tanlangan tilingiz (UZ / RU / EN) brauzeringizning LocalStorage xotirasida saqlanadi.',
          },
          {
            q: 'Saytda nechta taom mavjud va qanday izlash mumkin?',
            a: 'Menyuda 42 ta taom mavjud. Menyu sahifasida nom yoki tarkib bo‘yicha qidirish, toifaga ajratish va narx bo‘yicha saralash ishlaydi.',
          },
          {
            q: 'Buyurtma yuborsam, haqiqiy kuryer keladimi?',
            a: 'Yo‘q. Sayt sof frontend loyiha bo‘lgani sababli buyurtma shakli faqat namoyish chekini chiqaradi va hech qayerga yuborilmaydi.',
          },
          {
            q: 'Kontakt ma’lumotlari va narxlarni o‘zgartirish osonmi?',
            a: 'Albatta. Barcha konfiguratsiya, ranglar, telefon/ijtimoiy placeholderlar va mahsulotlar app.js ichida markazlashtirilgan.',
          },
        ],
      },
      footer: {
        brandDesc: 'Andijon, Mumtoz hududida joylashgan zamonaviy fast-food restorani. Har kuni yangi va issiq taomlar.',
        menuTitle: 'Menyu',
        infoTitle: "Ma'lumotlar",
        contactTitle: 'Aloqa va tarmoqlar',
        languageLabel: 'Til:',
        copyright: '© 2026 MetaFood — Andijon, Mumtoz. Frontend namoyish loyihasi.',
      },
    },

    ru: {
      meta: {
        homeTitle: 'MetaFood — Андижан, Мумтоз | Быстрый и вкусный фастфуд',
        homeDesc: 'MetaFood (Андижан, Мумтоз) — свежеприготовленные бургеры, горячая пицца, хрустящая курица, напитки и десерты.',
      },
      a11y: {
        skipToContent: 'Перейти к основному содержанию',
        openMenu: 'Открыть меню',
        closeMenu: 'Закрыть меню',
        cartLink: 'Перейти в корзину',
        addToCart: 'Добавить в корзину',
        increaseQty: 'Увеличить количество',
        decreaseQty: 'Уменьшить количество',
        removeItem: 'Удалить',
        mainNav: 'Основная навигация',
        langSwitcher: 'Выбор языка',
        closeModal: 'Закрыть',
        quickView: 'Быстрый просмотр',
        searchShortcut: 'Поиск по меню',
        scrollDown: 'Прокрутить вниз',
      },
      common: {
        currencyUnit: 'сум',
        min: 'мин',
        view: 'Открыть',
        addToCart: 'В корзину',
        addedToast: 'добавлено в корзину',
        backToMenu: 'Вернуться в меню',
        home: 'Главная',
        itemsCountSuffix: 'блюд',
        popularTag: 'Хит',
        quickView: 'Быстрый просмотр',
        viewFullPage: 'Полная страница',
        close: 'Закрыть',
      },
      nav: {
        home: 'Главная',
        menu: 'Меню',
        burgers: 'Бургеры',
        pizza: 'Пицца',
        delivery: 'Доставка',
        about: 'О нас',
        contact: 'Контакты',
        faq: 'Вопросы',
        cart: 'Корзина',
      },
      categories: {
        all: 'Все',
        burgers: 'Бургеры',
        pizza: 'Пицца',
        'fried-food': 'Хрустящее меню',
        friedFood: 'Хрустящее меню',
        sandwiches: 'Сэндвичи',
        drinks: 'Напитки',
        desserts: 'Десерты',
        burgersSub: 'Сочные & Горячие',
        pizzaSub: 'Из жаркой печи',
        friedFoodSub: 'Золотая корочка',
        sandwichesSub: 'Сытно & Быстро',
        drinksSub: 'Освежающие',
        dessertsSub: 'Сладкий финал',
      },
      hero: {
        kicker: 'Андижан, Мумтоз · Всегда горячее',
        title: 'Настоящий вкус с огня каждый день',
        titleLead: 'Настоящий вкус',
        titleAccent: 'с огня каждый день',
        subtitle:
          'На кухне MetaFood каждый бургер готовится из свежей рубленной говядины, а пицца выпекается до хрустящей корочки сразу после заказа.',
        ctaPrimary: 'Смотреть всё меню',
        ctaSecondary: 'Популярные бургеры',
        stat1Label: 'Позиций в меню',
        stat2Label: 'Время готовки',
        stat2Value: '10–15 мин',
        stat3Label: 'Локация',
        floatPizzaTitle: 'Пицца Маргарита',
        floatBurgerTitle: 'Double Beef Burger',
      },
      home: {
        categoriesKicker: 'Разделы',
        categoriesTitle: 'Популярные категории',
        viewAllMenu: 'Все блюда →',
        bestSellersKicker: 'Чаще всего заказывают',
        bestSellersTitle: 'Хиты продаж',
        galleryKicker: '4K HD Галерея',
        galleryTitle: 'Аппетитные кадры с нашей кухни',
        gallerySubtitle:
          'Нажмите на любое фото — откройте описание блюда и мгновенно добавьте в корзину.',
        promosKicker: 'Спецпредложения',
        promosTitle: 'Акции и комбо недели',
        popularKicker: 'Выбор гостей',
        popularTitle: 'Популярная пицца и закуски',
        aboutKicker: 'История MetaFood',
        aboutTitle: 'Современная культура фастфуда в Андижане',
        aboutBody:
          'Ресторан MetaFood в районе Мумтоз объединяет быстрый сервис, отборные ингредиенты и яркие вкусы. Каждое блюдо подаётся горячим.',
        aboutCta: 'Подробнее о нас',
        testimonialsKicker: 'Демо-отзывы',
        testimonialsTitle: 'Впечатления гостей',
        testimonialsNote: 'Ниже приведены демонстрационные отзывы для макета сайта.',
        contactKicker: 'Ждём вас',
        contactTitle: 'Свяжитесь с нами',
        contactDesc: 'Контактные данные удобно редактируются в единой конфигурации.',
        contactCta: 'Страница контактов',
        deliveryCta: 'Условия доставки',
      },
      promos: [
        {
          kicker: 'Предложение недели · -15%',
          title: 'BBQ Burger и Loaded Fries',
          desc: 'Сочный бургер с дымным соусом барбекю и картофель фри с сыром чеддер.',
          cta: 'Смотреть бургеры',
          href: '#/burgers',
          image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=1600&q=90',
        },
        {
          kicker: 'Выбор для компании · -10%',
          title: 'Пицца Пепперони из горячей печи',
          desc: 'Сытная пицца с тянущейся моцареллой для тёплых встреч с друзьями.',
          cta: 'Перейти к пицце',
          href: '#/pizza',
          image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=1600&q=90',
        },
        {
          kicker: 'Сладкий перерыв · -15%',
          title: 'Бельгийская вафля и цитрусовый лимонад',
          desc: 'Тёплый десерт со свежими ягодами и освежающий домашний лимонад.',
          cta: 'К десертам',
          href: '#/desserts',
          image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=1600&q=90',
        },
      ],
      testimonials: [
        {
          name: 'Азизбек К. (Образец)',
          role: 'Андижан, Мумтоз · Демо-отзыв',
          quote: 'Double Beef Burger и горячий картофель фри приготовили очень быстро. Крылышки тоже приятно хрустящие.',
        },
        {
          name: 'Мадина Р. (Образец)',
          role: 'Постоянный гость · Демо-отзыв',
          quote: 'Пицца «Четыре сыра» с цитрусовым лимонадом — отличное сочетание. В зале уютно и чисто.',
        },
        {
          name: 'Сардор Т. (Образец)',
          role: 'Обеденный заказ · Демо-отзыв',
          quote: 'Очень удобно искать блюда в меню и собирать корзину. Цены и граммовка сразу видны.',
        },
        {
          name: 'Дилноза М. (Образец)',
          role: 'Семейный визит · Демо-отзыв',
          quote: 'Шоколадный торт и чизкейк особенно понравились детям. Отличная скорость подачи.',
        },
      ],
      menu: {
        kicker: 'Весь ассортимент',
        title: 'Полное меню MetaFood',
        subtitle: 'Ищите и фильтруйте бургеры, пиццу, хрустящую курицу, сэндвичи, напитки и десерты.',
        searchLabel: 'Поиск блюд',
        searchPlaceholder: 'Поиск по названию или описанию...',
        sortLabel: 'Сортировка',
        sortFeatured: 'Рекомендуемые',
        sortPopular: 'Самые популярные',
        sortPriceAsc: 'Цена: по возрастанию',
        sortPriceDesc: 'Цена: по убыванию',
        onlyFeatured: 'Только хиты',
        onlyDeals: 'Со скидкой (-%)',
        maxPriceLabel: 'Макс. цена:',
        clearFilters: 'Сбросить',
        emptyTitle: 'Блюда не найдены',
        emptyDesc: 'Попробуйте изменить поисковый запрос или сбросить фильтры.',
        resultsFound: 'позиций найдено',
        otherCategories: 'Другие разделы:',
      },
      categoryViews: {
        burgers: {
          kicker: 'Гриль и свежая булочка',
          title: 'Бургеры MetaFood',
          subtitle: '8 видов сочных бургеров с говядиной, курицей, сыром чеддер и фирменными соусами.',
        },
        pizza: {
          kicker: 'Из горячей печи',
          title: 'Коллекция пиццы',
          subtitle: '7 видов свежеиспечённой пиццы с тянущейся моцареллой.',
        },
        'fried-food': {
          kicker: 'Хрустящая корочка',
          title: 'Хрустящие закуски и фри',
          subtitle: 'Наггетсы, крылышки, стрипсы, луковые кольца и горячий картофель фри.',
        },
        drinks: {
          kicker: 'Прохлада и свежесть',
          title: 'Напитки и коктейли',
          subtitle: 'Газированные напитки, домашний лимонад, холодный чай, милкшейк и айс-латте.',
        },
        desserts: {
          kicker: 'Сладкое завершение',
          title: 'Меню десертов',
          subtitle: 'Шоколадный торт, чизкейк Нью-Йорк, брауни, пончики и бельгийская вафля.',
        },
      },
      pdp: {
        weight: 'Вес / Объём',
        calories: 'Калорийность',
        prepTime: 'Приготовление',
        addToCart: 'Добавить в корзину',
        goToCart: 'Перейти в корзину',
        relatedKicker: 'Рекомендуем также',
        relatedTitle: 'Похожие блюда',
        notFoundTitle: 'Блюдо не найдено',
        notFoundDesc: 'Выбранная позиция отсутствует. Вернитесь в общее меню.',
      },
      cart: {
        kicker: 'Оформление',
        title: 'Ваша корзина',
        clearCart: 'Очистить корзину',
        clearedToast: 'Корзина очищена',
        emptyTitle: 'Ваша корзина пока пуста',
        emptyDesc: 'Выберите сочные бургеры, горячую пиццу или прохладные напитки из меню.',
        browseMenu: 'Перейти в меню',
        drawerItemsSuffix: 'позиций',
        freeDeliveryReached: 'Бесплатная доставка (образец) открыта!',
        freeDeliveryRemaining: 'До бесплатной доставки (образец):',
        goToCheckout: 'Корзина и оформление',
        continueBrowsing: 'Смотреть меню',
        summaryTitle: 'Итого по заказу',
        subtotal: 'Стоимость блюд',
        savings: 'Выгода по акциям',
        deliverySampleLabel: 'Доставка (образец)',
        freeLabel: 'Бесплатно (образец)',
        total: 'Итого (образец)',
        demoNotice:
          'Демонстрация фронтенда: корзина и форма оформления показывают работу интерфейса. Реальная оплата не списывается, заказы в ресторан не отправляются.',
        nameLabel: 'Ваше имя',
        namePlaceholder: 'Например: Жасур Алимов',
        phoneLabel: 'Номер телефона',
        phonePlaceholder: '+998 90 000 00 00',
        addressLabel: 'Адрес (Андижан)',
        addressPlaceholder: 'Мумтоз, улица и номер дома',
        notesLabel: 'Комментарий (необязательно)',
        notesPlaceholder: 'Пожелания к заказу',
        submitDemo: 'Оформить демо-заказ',
        errName: 'Пожалуйста, введите имя (минимум 2 символа).',
        errPhone: 'Пожалуйста, введите корректный номер телефона.',
        errAddress: 'Пожалуйста, укажите адрес доставки.',
        receiptKicker: 'ДЕМО-ЧЕК ИНТЕРФЕЙСА (НЕ РЕАЛЬНЫЙ ЗАКАЗ)',
        receiptTitle: 'Демонстрационный заказ сформирован',
        receiptDesc: 'Это предпросмотр фронтенда. Настоящий заказ в ресторан не отправлялся.',
        receiptCustomer: 'Клиент',
        receiptNewOrder: 'Вернуться в меню',
      },
      about: {
        kicker: 'О бренде',
        title: 'MetaFood — качественный фастфуд в Андижане, Мумтоз',
        lead: 'MetaFood работает в районе Мумтоз города Андижана, чтобы дарить гостям быстрый, чистый и по-настоящему вкусный сервис каждый день.',
        story: 'На нашей кухне мы используем свежие овощи, мягкую выпечку и отборное мясо. Гриль и печь включаются сразу после поступления заказа.',
        pillar1Title: 'Отборные продукты',
        pillar1Desc: 'Свежие овощи, мягкие булочки и мясо по стандартам халяль.',
        pillar2Title: 'Открытая кухня',
        pillar2Desc: 'Строгий контроль температуры и чистоты на каждом этапе.',
        pillar3Title: 'Разнообразие вкусов',
        pillar3Desc: 'Более 42 позиций: от классических бургеров до нежных десертов.',
        cta: 'Открыть меню',
      },
      contact: {
        kicker: 'Контакты',
        title: 'Связаться с MetaFood',
        subtitle: 'Телефон, соцсети и адрес ниже представлены в виде редактируемых шаблонных данных.',
        phoneLabel: 'Телефон (placeholder)',
        instagramLabel: 'Instagram (placeholder)',
        telegramLabel: 'Telegram (placeholder)',
        addressLabel: 'Адрес',
        hoursLabel: 'Часы работы',
        mapSubtitle: 'г. Андижан, район Мумтоз (демонстрационная точка карты)',
        mapExternal: 'Открыть в OpenStreetMap',
        formTitle: 'Написать сообщение (Демо-форма)',
        formNotice: 'Демо-режим: сообщения проверяются локально и не отправляются в ресторан.',
        formName: 'Ваше имя',
        formEmail: 'Электронная почта',
        formMessage: 'Сообщение',
        formSubmit: 'Отправить демо-сообщение',
        errEmail: 'Введите корректный адрес электронной почты.',
        errMessage: 'Введите сообщение длиной не менее 10 символов.',
        formSuccess: 'Демо-сообщение успешно проверено (фронтенд).',
      },
      delivery: {
        kicker: 'Доставка',
        title: 'Информация о доставке (Образец)',
        subtitle: 'Зона, время и тарифы ниже приведены как редактируемый пример и не гарантируют фактическую доставку.',
        areaLabel: 'Образец зоны',
        etaLabel: 'Примерное время',
        etaValue: '25–40 минут',
        feeLabel: 'Образец тарифа',
        freeRuleLabel: 'Порог бесплатной доставки (образец)',
        stepsTitle: 'Как устроен процесс',
        steps: [
          { num: '01', title: 'Выбор блюд', desc: 'Добавьте любимые бургеры, пиццу или напитки в корзину.' },
          { num: '02', title: 'Проверка (Демо)', desc: 'Укажите ориентир адреса и телефон в форме корзины.' },
          { num: '03', title: 'Свежая готовка', desc: 'Блюда готовятся на огне сразу после подтверждения.' },
          { num: '04', title: 'Термоупаковка', desc: 'Заказ аккуратно упаковывается для сохранения тепла.' },
        ],
        faqTitle: 'Частые вопросы о доставке',
        faqs: [
          {
            q: 'Какие районы указаны в примере доставки?',
            a: 'В шаблоне указан Андижан, район Мумтоз и центральные улицы. Реальная зона покрытия задаётся владельцем ресторана.',
          },
          {
            q: 'Сколько времени занимает доставка по примеру?',
            a: 'В образце указано ориентировочное время 25–40 минут с учётом приготовления.',
          },
          {
            q: 'Принимаются ли реальные заказы на этом сайте?',
            a: 'Нет, это автономная фронтенд-демонстрация без подключения к серверу и платёжным шлюзам.',
          },
        ],
      },
      faq: {
        kicker: 'Помощь',
        title: 'Часто задаваемые вопросы',
        subtitle: 'Ответы о меню MetaFood, ингредиентах и работе корзины.',
        items: [
          {
            q: 'Где находится ресторан MetaFood?',
            a: 'MetaFood представлен в Андижане, в районе Мумтоз. Точный ориентир и контакты редактируются в app.js.',
          },
          {
            q: 'Соответствуют ли мясные блюда стандартам халяль?',
            a: 'Да, для всех мясных бургеров, пиццы и сэндвичей используется продукция стандарта халяль.',
          },
          {
            q: 'Сохраняется ли корзина при обновлении страницы?',
            a: 'Да, выбранные товары и активный язык (UZ / RU / EN) сохраняются в LocalStorage вашего браузера.',
          },
          {
            q: 'Сколько блюд доступно в каталоге?',
            a: 'В каталоге 42 различных блюда с поиском, фильтрацией по категориям и сортировкой по цене.',
          },
          {
            q: 'Отправляются ли заказы из формы корзины в реальную кухню?',
            a: 'Нет, оформление заказа работает как интерактивная демонстрация фронтенда и формирует локальный демо-чек.',
          },
          {
            q: 'Как обновить телефон, ссылки или цены?',
            a: 'Все настройки бренда, цвета, контакты и список блюд централизованы в верхней части файла app.js.',
          },
        ],
      },
      footer: {
        brandDesc: 'Современный фастфуд-ресторан в Андижане, Мумтоз. Свежие и горячие блюда каждый день.',
        menuTitle: 'Меню',
        infoTitle: 'Информация',
        contactTitle: 'Контакты и сети',
        languageLabel: 'Язык:',
        copyright: '© 2026 MetaFood — Андижан, Мумтоз. Демонстрационный фронтенд-проект.',
      },
    },

    en: {
      meta: {
        homeTitle: 'MetaFood — Andijan, Mumtoz | Modern Fast-Food Kitchen',
        homeDesc: 'MetaFood (Andijan, Mumtoz) — freshly grilled burgers, oven-baked pizza, crispy chicken, drinks, and desserts.',
      },
      a11y: {
        skipToContent: 'Skip to main content',
        openMenu: 'Open navigation menu',
        closeMenu: 'Close navigation menu',
        cartLink: 'Go to shopping cart',
        addToCart: 'Add to cart',
        increaseQty: 'Increase quantity',
        decreaseQty: 'Decrease quantity',
        removeItem: 'Remove',
        mainNav: 'Main navigation',
        langSwitcher: 'Select language',
        closeModal: 'Close',
        quickView: 'Quick view',
        searchShortcut: 'Search menu',
        scrollDown: 'Scroll down',
      },
      common: {
        currencyUnit: 'UZS',
        min: 'min',
        view: 'View',
        addToCart: 'Add to cart',
        addedToast: 'added to cart',
        backToMenu: 'Back to menu',
        home: 'Home',
        itemsCountSuffix: 'items',
        popularTag: 'Best Seller',
        quickView: 'Quick view',
        viewFullPage: 'Full product page',
        close: 'Close',
      },
      nav: {
        home: 'Home',
        menu: 'Menu',
        burgers: 'Burgers',
        pizza: 'Pizza',
        delivery: 'Delivery',
        about: 'About',
        contact: 'Contact',
        faq: 'FAQ',
        cart: 'Cart',
      },
      categories: {
        all: 'All',
        burgers: 'Burgers',
        pizza: 'Pizza',
        'fried-food': 'Fried Food',
        friedFood: 'Fried Food',
        sandwiches: 'Sandwiches',
        drinks: 'Drinks',
        desserts: 'Desserts',
        burgersSub: 'Fresh & Juicy',
        pizzaSub: 'Hot & Cheesy',
        friedFoodSub: 'Crispy & Golden',
        sandwichesSub: 'Toasted & Bold',
        drinksSub: 'Cool & Refreshing',
        dessertsSub: 'Sweet Moments',
      },
      hero: {
        kicker: 'Andijan, Mumtoz · Served Hot Daily',
        title: 'Fresh From The Grill, Crafted For Flavor',
        titleLead: 'Fresh From The Grill',
        titleAccent: 'Crafted For Flavor',
        subtitle:
          'Inside the MetaFood kitchen, every burger is seared fresh and every pizza is baked crisp the moment you place your order.',
        ctaPrimary: 'Explore Full Menu',
        ctaSecondary: 'Signature Burgers',
        stat1Label: 'Menu items',
        stat2Label: 'Prep window',
        stat2Value: '10–15 min',
        stat3Label: 'Location',
        floatPizzaTitle: 'Margherita Pizza',
        floatBurgerTitle: 'Double Beef Burger',
      },
      home: {
        categoriesKicker: 'Explore',
        categoriesTitle: 'Popular Categories',
        viewAllMenu: 'View Full Menu →',
        bestSellersKicker: 'Most Ordered',
        bestSellersTitle: 'Our Best Sellers',
        galleryKicker: '4K HD Gallery',
        galleryTitle: 'Fresh Shots From Our Kitchen',
        gallerySubtitle:
          'Tap any dish frame to inspect details and add straight to your order bag.',
        promosKicker: 'Weekly Highlights',
        promosTitle: 'Featured Deals & Combos',
        popularKicker: 'Guest Favorites',
        popularTitle: 'Popular Pizzas & Sides',
        aboutKicker: 'The MetaFood Story',
        aboutTitle: 'Modern Fast-Food Craft in Andijan',
        aboutBody:
          'MetaFood in Mumtoz pairs fast hospitality with crisp produce, toasted buns, and consistent kitchen standards so every order arrives hot.',
        aboutCta: 'Read our story',
        testimonialsKicker: 'Sample Reviews (Demo)',
        testimonialsTitle: 'What Guests Say',
        testimonialsNote: 'Below are demonstration testimonials included for interface showcase.',
        contactKicker: 'Visit Us',
        contactTitle: 'Get in Touch',
        contactDesc: 'All contact placeholders are centralized and easy to customize.',
        contactCta: 'Contact Page',
        deliveryCta: 'Delivery Information',
      },
      promos: [
        {
          kicker: 'Weekly Highlight · -15%',
          title: 'BBQ Burger & Loaded Fries Pairing',
          desc: 'Smoky grilled beef burger paired with warm cheddar-loaded fries at a special price.',
          cta: 'Browse Burgers',
          href: '#/burgers',
          image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=1600&q=90',
        },
        {
          kicker: 'Shareable Classic · -10%',
          title: 'Hot Oven Pepperoni Pizza',
          desc: 'Hand-stretched crust, rich tomato sauce, and bubbling mozzarella ready for sharing.',
          cta: 'Browse Pizza',
          href: '#/pizza',
          image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=1600&q=90',
        },
        {
          kicker: 'Sweet Break · -15%',
          title: 'Belgian Waffle & Citrus Lemonade',
          desc: 'Golden crisp waffle with fresh berries paired with cold-pressed house lemonade.',
          cta: 'Browse Desserts',
          href: '#/desserts',
          image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=1600&q=90',
        },
      ],
      testimonials: [
        {
          name: 'Azizbek K. (Sample)',
          role: 'Andijan, Mumtoz · Demo Review',
          quote: 'Double Beef Burger and hot french fries came out fast and fresh. The chicken wings stayed crisp.',
        },
        {
          name: 'Madina R. (Sample)',
          role: 'Regular Guest · Demo Review',
          quote: 'Four Cheese pizza with house citrus lemonade is a great combination. Clean dining space.',
        },
        {
          name: 'Sardor T. (Sample)',
          role: 'Lunch Order · Demo Review',
          quote: 'Searching the menu and building a cart order is fast and straightforward with clear UZS pricing.',
        },
        {
          name: 'Dilnoza M. (Sample)',
          role: 'Family Visit · Demo Review',
          quote: 'The chocolate cake and cheesecake were a hit with everyone at the table.',
        },
      ],
      menu: {
        kicker: 'Full Catalog',
        title: 'MetaFood Complete Menu',
        subtitle: 'Search, filter, and sort across burgers, pizza, fried food, sandwiches, drinks, and desserts.',
        searchLabel: 'Search dishes',
        searchPlaceholder: 'Search by dish name or ingredients...',
        sortLabel: 'Sort by',
        sortFeatured: 'Featured first',
        sortPopular: 'Most popular',
        sortPriceAsc: 'Price: Low to High',
        sortPriceDesc: 'Price: High to Low',
        onlyFeatured: 'Featured only',
        onlyDeals: 'Deals (-%)',
        maxPriceLabel: 'Max price:',
        clearFilters: 'Clear filters',
        emptyTitle: 'No matching dishes found',
        emptyDesc: 'Try adjusting your search keywords or reset the active filters.',
        resultsFound: 'dishes found',
        otherCategories: 'Explore other categories:',
      },
      categoryViews: {
        burgers: {
          kicker: 'Flame Grilled',
          title: 'MetaFood Burgers',
          subtitle: '8 signature beef and crispy chicken burgers made on toasted buns.',
        },
        pizza: {
          kicker: 'Stone Oven Baked',
          title: 'Artisan Fast Pizza',
          subtitle: '7 freshly baked pizzas topped with melting mozzarella and bold sauces.',
        },
        'fried-food': {
          kicker: 'Golden Crunch',
          title: 'Fried Chicken & Crispy Sides',
          subtitle: 'Nuggets, wings, strips, onion rings, and loaded fries cooked crisp.',
        },
        drinks: {
          kicker: 'Chilled Refreshment',
          title: 'Drinks & Milkshakes',
          subtitle: 'Sparkling sodas, fresh citrus lemonade, iced tea, thick milkshakes, and iced latte.',
        },
        desserts: {
          kicker: 'Sweet Finish',
          title: 'Desserts & Pastries',
          subtitle: 'Chocolate layer cake, New York cheesecake, warm brownie, donuts, and waffles.',
        },
      },
      pdp: {
        weight: 'Portion',
        calories: 'Energy',
        prepTime: 'Prep time',
        addToCart: 'Add to cart',
        goToCart: 'View cart',
        relatedKicker: 'Recommended Pairings',
        relatedTitle: 'Related Dishes',
        notFoundTitle: 'Dish not found',
        notFoundDesc: 'The requested dish could not be found. Please return to the menu.',
      },
      cart: {
        kicker: 'Order Bag',
        title: 'Your Shopping Cart',
        clearCart: 'Clear cart',
        clearedToast: 'Cart cleared',
        emptyTitle: 'Your cart is currently empty',
        emptyDesc: 'Browse our burgers, hot pizzas, and cold drinks to add items.',
        browseMenu: 'Browse menu',
        drawerItemsSuffix: 'items',
        freeDeliveryReached: 'Free sample delivery unlocked!',
        freeDeliveryRemaining: 'Add for free sample delivery:',
        goToCheckout: 'Full Cart & Checkout',
        continueBrowsing: 'Browse Menu',
        summaryTitle: 'Order Summary',
        subtotal: 'Items subtotal',
        savings: 'Discount savings',
        deliverySampleLabel: 'Delivery (sample)',
        freeLabel: 'Free (sample)',
        total: 'Estimated total',
        demoNotice:
          'Frontend Demonstration Only: This cart and checkout form simulate an ordering interface. No real payment is processed and no order is sent to the restaurant.',
        nameLabel: 'Full name',
        namePlaceholder: 'e.g. Jasur Alimov',
        phoneLabel: 'Phone number',
        phonePlaceholder: '+998 90 000 00 00',
        addressLabel: 'Delivery address (Andijan)',
        addressPlaceholder: 'Mumtoz district, street & house',
        notesLabel: 'Order notes (optional)',
        notesPlaceholder: 'Extra sauce or preparation preferences',
        submitDemo: 'Complete Demo Order',
        errName: 'Please enter your name (at least 2 characters).',
        errPhone: 'Please enter a valid phone number.',
        errAddress: 'Please enter a delivery address.',
        receiptKicker: 'FRONTEND DEMO RECEIPT (NOT A REAL ORDER)',
        receiptTitle: 'Demonstration order preview created',
        receiptDesc: 'This is a frontend simulation only. No real restaurant order was transmitted.',
        receiptCustomer: 'Customer',
        receiptNewOrder: 'Back to menu',
      },
      about: {
        kicker: 'About MetaFood',
        title: 'Fresh fast-food craft in Andijan, Mumtoz',
        lead: 'MetaFood serves guests in the Mumtoz district of Andijan with fast hospitality, clean preparation, and bold everyday flavors.',
        story: 'Instead of pre-cooked holding trays, our kitchen prepares crisp produce daily and grills every patty or stretches every pizza dough when ordered.',
        pillar1Title: 'Quality Ingredients',
        pillar1Desc: 'Daily fresh vegetables, soft toasted buns, and halal-certified meats.',
        pillar2Title: 'Open Kitchen Discipline',
        pillar2Desc: 'Strict temperature and hygiene control from prep table to counter.',
        pillar3Title: '42+ Menu Choices',
        pillar3Desc: 'From hearty double beef burgers to light salads, wraps, and desserts.',
        cta: 'Explore the Menu',
      },
      contact: {
        kicker: 'Contact',
        title: 'Contact MetaFood',
        subtitle: 'Phone, social links, and address below are editable placeholders in centralized configuration.',
        phoneLabel: 'Phone (placeholder)',
        instagramLabel: 'Instagram (placeholder)',
        telegramLabel: 'Telegram (placeholder)',
        addressLabel: 'Address',
        hoursLabel: 'Opening hours',
        mapSubtitle: 'Andijan, Mumtoz district (sample map marker)',
        mapExternal: 'Open in OpenStreetMap',
        formTitle: 'Send a Message (Demo Form)',
        formNotice: 'Demonstration notice: Form submissions validate locally and are not sent to a live server.',
        formName: 'Your name',
        formEmail: 'Email address',
        formMessage: 'Message',
        formSubmit: 'Submit Demo Inquiry',
        errEmail: 'Please enter a valid email address.',
        errMessage: 'Please enter a message of at least 10 characters.',
        formSuccess: 'Demo inquiry validated locally (no message sent).',
      },
      delivery: {
        kicker: 'Delivery',
        title: 'Delivery Information (Sample)',
        subtitle: 'Coverage areas, times, and fees shown here are editable sample placeholders and do not guarantee live delivery availability.',
        areaLabel: 'Sample area',
        etaLabel: 'Estimated window (sample)',
        etaValue: '25–40 minutes',
        feeLabel: 'Sample delivery fee',
        freeRuleLabel: 'Free delivery threshold (sample)',
        stepsTitle: 'How Delivery Works',
        steps: [
          { num: '01', title: 'Select Dishes', desc: 'Add burgers, pizzas, sides, and drinks to your cart.' },
          { num: '02', title: 'Review Details (Demo)', desc: 'Confirm your sample address and contact details.' },
          { num: '03', title: 'Cooked Fresh', desc: 'Kitchen starts grilling and baking immediately.' },
          { num: '04', title: 'Insulated Drop-off', desc: 'Packed in heat-retaining boxes for crisp arrival.' },
        ],
        faqTitle: 'Delivery Questions',
        faqs: [
          {
            q: 'Which areas are shown in the sample delivery guide?',
            a: 'The template lists Andijan, Mumtoz and nearby central streets as editable sample coverage.',
          },
          {
            q: 'How long is the sample delivery estimate?',
            a: 'Sample documentation estimates 25–40 minutes including fresh preparation.',
          },
          {
            q: 'Does this website dispatch real couriers?',
            a: 'No. This is a static frontend website without backend dispatch or live payment processing.',
          },
        ],
      },
      faq: {
        kicker: 'Help Center',
        title: 'Frequently Asked Questions',
        subtitle: 'Common answers about MetaFood menu items, languages, and cart behavior.',
        items: [
          {
            q: 'Where is MetaFood located?',
            a: 'MetaFood is branded for Andijan, Mumtoz. Exact street directions and contact placeholders can be updated in app.js.',
          },
          {
            q: 'Are meat items halal-certified?',
            a: 'Yes, all beef, chicken, and sausage items in the MetaFood menu follow halal kitchen standards.',
          },
          {
            q: 'Do my cart and language stay saved after refresh?',
            a: 'Yes. Both your shopping cart items and chosen language (UZ / RU / EN) persist via browser LocalStorage.',
          },
          {
            q: 'How many dishes are in the catalog?',
            a: 'There are 42 distinct products with live search, category filtering, featured toggle, and price sorting.',
          },
          {
            q: 'Is checkout connected to real payment or a restaurant POS?',
            a: 'No. Checkout is clearly marked as a frontend demonstration that validates inputs and shows a preview receipt.',
          },
          {
            q: 'Can brand colors and contact info be customized easily?',
            a: 'Yes. METAFOOD_CONFIG at the top of app.js controls brand colors, contact placeholders, and delivery sample values.',
          },
        ],
      },
      footer: {
        brandDesc: 'Modern fast-food kitchen in Andijan, Mumtoz. Fresh burgers, hot pizza, and crispy bites every day.',
        menuTitle: 'Menu',
        infoTitle: 'Information',
        contactTitle: 'Contact & Social',
        languageLabel: 'Language:',
        copyright: '© 2026 MetaFood — Andijan, Mumtoz. Frontend demonstration project.',
      },
    },
  };

  /* ========================================================================
     4. STATE & LOCALSTORAGE PERSISTENCE
     ======================================================================== */
  const STORAGE_KEYS = {
    lang: 'metafood_lang_v1',
    cart: 'metafood_cart_v1',
  };

  const state = {
    lang: loadSavedLanguage(),
    cart: loadSavedCart(),
    currentRoute: 'home',
    currentProductId: null,
    menuFilters: {
      search: '',
      category: 'all',
      sort: 'featured',
      featuredOnly: false,
      dealsOnly: false,
      maxPrice: 95000,
    },
    categoryFilters: {
      burgers: { search: '', sort: 'featured' },
      pizza: { search: '', sort: 'featured' },
      'fried-food': { search: '', sort: 'featured' },
      drinks: { search: '', sort: 'featured' },
      desserts: { search: '', sort: 'featured' },
    },
    pdpQty: 1,
    quickViewId: null,
    quickViewQty: 1,
    cartDrawerOpen: false,
    isTransitioning: false,
    isInternalHashChange: false,
    demoOrderReceipt: null,
    swipers: [],
  };

  function safeStorageGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (_err) {
      return null;
    }
  }

  function safeStorageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (_err) {
      // Ignore storage quota / private mode restrictions gracefully
    }
  }

  function loadSavedLanguage() {
    const saved = safeStorageGet(STORAGE_KEYS.lang);
    if (saved && METAFOOD_CONFIG.supportedLanguages.includes(saved)) {
      return saved;
    }
    return METAFOOD_CONFIG.defaultLanguage;
  }

  function loadSavedCart() {
    const raw = safeStorageGet(STORAGE_KEYS.cart);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed
        .filter((item) => item && typeof item.id === 'number' && Number.isInteger(item.qty) && item.qty > 0)
        .filter((item) => PRODUCTS.some((p) => p.id === item.id))
        .map((item) => ({ id: item.id, qty: Math.min(99, item.qty) }));
    } catch (_err) {
      return [];
    }
  }

  function saveCart() {
    safeStorageSet(STORAGE_KEYS.cart, JSON.stringify(state.cart));
  }

  function applyThemeConfig() {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', METAFOOD_CONFIG.theme.primary);
    root.style.setProperty('--color-primary-hover', METAFOOD_CONFIG.theme.primaryHover);
    root.style.setProperty('--color-secondary', METAFOOD_CONFIG.theme.secondary);
    root.style.setProperty('--color-accent', METAFOOD_CONFIG.theme.accent);
  }

  /* ========================================================================
     5. FORMATTING & TRANSLATION HELPERS
     ======================================================================== */
  function t(path) {
    const dict = TRANSLATIONS[state.lang] || TRANSLATIONS.uz;
    const parts = path.split('.');
    let cursor = dict;
    for (let i = 0; i < parts.length; i += 1) {
      if (cursor && Object.prototype.hasOwnProperty.call(cursor, parts[i])) {
        cursor = cursor[parts[i]];
      } else {
        cursor = null;
        break;
      }
    }
    if (cursor !== null && cursor !== undefined) return cursor;
    // Fallback to Uzbek
    let fb = TRANSLATIONS.uz;
    for (let i = 0; i < parts.length; i += 1) {
      if (fb && Object.prototype.hasOwnProperty.call(fb, parts[i])) {
        fb = fb[parts[i]];
      } else {
        return path;
      }
    }
    return fb;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getDiscountedPrice(product) {
    if (!product.discountPercent || product.discountPercent <= 0) {
      return product.price;
    }
    return Math.round((product.price * (100 - product.discountPercent)) / 100 / 500) * 500;
  }

  function formatUZS(amount) {
    const num = Math.round(Number(amount) || 0);
    const formatted =
      state.lang === 'en'
        ? num.toLocaleString('en-US')
        : num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return `${formatted} ${t('common.currencyUnit')}`;
  }

  function getProductById(id) {
    return PRODUCTS.find((p) => p.id === Number(id)) || null;
  }

  function getCategoryLabel(catKey) {
    return t(`categories.${catKey}`) || catKey;
  }

  function applyStaticTranslations() {
    document.documentElement.lang = state.lang;

    const i18nNodes = document.querySelectorAll('[data-i18n]');
    i18nNodes.forEach((node) => {
      const key = node.getAttribute('data-i18n');
      const val = t(key);
      if (typeof val === 'string') {
        node.textContent = val;
      }
    });

    const placeholderNodes = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderNodes.forEach((node) => {
      const key = node.getAttribute('data-i18n-placeholder');
      const val = t(key);
      if (typeof val === 'string') {
        node.setAttribute('placeholder', val);
      }
    });

    // Update language switchers active state
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      const btnLang = btn.getAttribute('data-lang');
      btn.setAttribute('aria-pressed', btnLang === state.lang ? 'true' : 'false');
    });

    // Dynamic aria-labels
    const menuToggle = document.getElementById('mobile-menu-toggle');
    if (menuToggle) menuToggle.setAttribute('aria-label', t('a11y.openMenu'));
    const menuClose = document.getElementById('mobile-drawer-close');
    if (menuClose) menuClose.setAttribute('aria-label', t('a11y.closeMenu'));
    const cartBtn = document.getElementById('header-cart-btn');
    if (cartBtn) cartBtn.setAttribute('aria-label', t('a11y.cartLink'));
    const cartDrawerClose = document.getElementById('cart-drawer-close');
    if (cartDrawerClose) cartDrawerClose.setAttribute('aria-label', t('a11y.closeModal'));
    const qvClose = document.getElementById('quick-view-close');
    if (qvClose) qvClose.setAttribute('aria-label', t('a11y.closeModal'));
    const mainNav = document.getElementById('main-nav');
    if (mainNav) mainNav.setAttribute('aria-label', t('a11y.mainNav'));
    const searchBtn = document.getElementById('header-search-btn');
    if (searchBtn) searchBtn.setAttribute('aria-label', t('a11y.searchShortcut'));
    const scrollCue = document.getElementById('hero-scroll-cue');
    if (scrollCue) scrollCue.setAttribute('aria-label', t('a11y.scrollDown'));
    document.querySelectorAll('.lang-switcher').forEach((grp) => {
      grp.setAttribute('aria-label', t('a11y.langSwitcher'));
    });

    const priceReadout = document.getElementById('menu-price-readout');
    if (priceReadout) {
      priceReadout.textContent = formatUZS(state.menuFilters.maxPrice);
    }

    const heroLocation = document.getElementById('hero-location-text');
    if (heroLocation) {
      heroLocation.textContent = METAFOOD_CONFIG.location[state.lang] || METAFOOD_CONFIG.location.uz;
    }

    const mapTitle = document.getElementById('home-map-title');
    if (mapTitle) {
      mapTitle.textContent = `${METAFOOD_CONFIG.brandName} — ${METAFOOD_CONFIG.location[state.lang]}`;
    }

    renderFooterContactAndCopyright();
    updateDocumentMetadata();
    if (state.cartDrawerOpen) renderCartDrawer();
    if (state.quickViewId) renderQuickViewContent();
  }

  function updateDocumentMetadata() {
    const route = state.currentRoute;
    const brand = METAFOOD_CONFIG.brandName;
    let title = t('meta.homeTitle');
    let desc = t('meta.homeDesc');

    if (route === 'menu') {
      title = `${t('menu.title')} | ${brand}`;
    } else if (['burgers', 'pizza', 'fried-food', 'drinks', 'desserts'].includes(route)) {
      title = `${t(`categoryViews.${route}.title`)} | ${brand}`;
    } else if (route === 'product' && state.currentProductId) {
      const prod = getProductById(state.currentProductId);
      if (prod) {
        title = `${prod.name} — ${formatUZS(getDiscountedPrice(prod))} | ${brand}`;
        desc = prod.description[state.lang] || prod.description.uz;
      }
    } else if (route === 'cart') {
      title = `${t('cart.title')} | ${brand}`;
    } else if (route === 'about') {
      title = `${t('nav.about')} | ${brand}`;
    } else if (route === 'contact') {
      title = `${t('nav.contact')} | ${brand}`;
    } else if (route === 'delivery') {
      title = `${t('nav.delivery')} | ${brand}`;
    } else if (route === 'faq') {
      title = `${t('nav.faq')} | ${brand}`;
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', desc);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
  }

  /* ========================================================================
     6. REUSABLE HTML COMPONENT RENDERERS
     ======================================================================== */
  function getCartItemQty(productId) {
    const item = state.cart.find((entry) => entry.id === Number(productId));
    return item ? item.qty : 0;
  }

  function renderProductCardFooterAction(product) {
    const qty = getCartItemQty(product.id);
    if (qty > 0) {
      return `
        <div class="card-inline-qty" data-card-action="${product.id}">
          <button type="button" data-cart-dec="${product.id}" aria-label="${escapeHtml(t('a11y.decreaseQty'))} ${escapeHtml(product.name)}">-</button>
          <span class="tabular-nums">${qty}</span>
          <button type="button" data-cart-inc="${product.id}" aria-label="${escapeHtml(t('a11y.increaseQty'))} ${escapeHtml(product.name)}">+</button>
        </div>
      `;
    }
    const addLabel = t('common.addToCart');
    const ariaAdd = `${addLabel}: ${product.name}`;
    return `
      <button
        type="button"
        class="add-to-cart-btn"
        data-card-action="${product.id}"
        data-add-to-cart="${product.id}"
        aria-label="${escapeHtml(ariaAdd)}"
      >
        ${escapeHtml(addLabel)}
      </button>
    `;
  }

  function syncAllProductCardActions() {
    document.querySelectorAll('[data-card-action]').forEach((el) => {
      const pid = el.getAttribute('data-card-action');
      const product = getProductById(pid);
      if (product) {
        el.outerHTML = renderProductCardFooterAction(product);
      }
    });
  }

  function renderProductCard(product, isSlide) {
    const finalPrice = getDiscountedPrice(product);
    const hasDiscount = product.discountPercent > 0;
    const desc = product.description[state.lang] || product.description.uz;
    const catLabel = getCategoryLabel(product.category);
    const wrapperClass = isSlide ? 'swiper-slide' : '';
    const qvLabel = `${t('a11y.quickView')}: ${product.name}`;

    const cardHtml = `
      <article class="product-card" data-product-id="${product.id}">
        <div class="product-img-box">
          <a href="#/product/${product.id}" class="product-img-wrap" aria-label="${escapeHtml(product.name)}">
            <img
              src="${escapeHtml(product.image)}"
              alt="${escapeHtml(product.name)}"
              class="product-img"
              loading="lazy"
              width="400"
              height="300"
              referrerpolicy="no-referrer"
              onerror="this.parentElement.classList.add('is-fallback')"
            />
            <div class="product-img-fallback" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 11h18M5 11a7 7 0 0 1 14 0M5 15h14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"/></svg>
              <span>${escapeHtml(product.name)}</span>
            </div>
            ${
              hasDiscount
                ? `<span class="product-discount-mark">-${product.discountPercent}%</span>`
                : ''
            }
          </a>
          <button
            type="button"
            class="product-quickview-btn"
            data-quick-view="${product.id}"
            aria-label="${escapeHtml(qvLabel)}"
            title="${escapeHtml(t('common.quickView'))}"
          >
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
        </div>
        <div class="product-card-body">
          <div class="product-meta-line">
            <span>${escapeHtml(catLabel)}</span>
            <span aria-hidden="true">&middot;</span>
            <span class="tabular-nums">${escapeHtml(product.prepTime)} ${escapeHtml(t('common.min'))}</span>
          </div>
          <a href="#/product/${product.id}" class="product-title-link">
            <h3 class="product-title">${escapeHtml(product.name)}</h3>
          </a>
          <p class="product-desc">${escapeHtml(desc)}</p>
          <div class="product-card-footer">
            <div class="price-block">
              <span class="price-current tabular-nums">${escapeHtml(formatUZS(finalPrice))}</span>
              ${
                hasDiscount
                  ? `<span class="price-original tabular-nums">${escapeHtml(formatUZS(product.price))}</span>`
                  : ''
              }
            </div>
            ${renderProductCardFooterAction(product)}
          </div>
        </div>
      </article>
    `;

    return isSlide ? `<div class="${wrapperClass}">${cardHtml}</div>` : cardHtml;
  }

  /* ========================================================================
     7. VIEW RENDERERS (ALL 13 SPA VIEWS)
     ======================================================================== */
  function getInitials(nameStr) {
    const clean = String(nameStr || 'MF').replace(/\(.*?\)/g, '').trim();
    const words = clean.split(/\s+/).filter(Boolean);
    if (words.length >= 2) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }
    return clean.slice(0, 2).toUpperCase();
  }

  function renderHomeView() {
    // 1. Photo-Rich 6 Category Cards (4K/HD Food Photography)
    const homeCats = [
      {
        key: 'burgers',
        subKey: 'categories.burgersSub',
        route: '#/burgers',
        img: METAFOOD_CONFIG.images.catBurgers,
      },
      {
        key: 'pizza',
        subKey: 'categories.pizzaSub',
        route: '#/pizza',
        img: METAFOOD_CONFIG.images.catPizza,
      },
      {
        key: 'fried-food',
        subKey: 'categories.friedFoodSub',
        route: '#/fried-food',
        img: METAFOOD_CONFIG.images.catFried,
      },
      {
        key: 'sandwiches',
        subKey: 'categories.sandwichesSub',
        route: '#/sandwiches',
        img: METAFOOD_CONFIG.images.catSandwiches,
      },
      {
        key: 'drinks',
        subKey: 'categories.drinksSub',
        route: '#/drinks',
        img: METAFOOD_CONFIG.images.catDrinks,
      },
      {
        key: 'desserts',
        subKey: 'categories.dessertsSub',
        route: '#/desserts',
        img: METAFOOD_CONFIG.images.catDesserts,
      },
    ];

    const catsGrid = document.getElementById('home-categories-grid');
    if (catsGrid) {
      catsGrid.innerHTML = homeCats
        .map((c) => {
          const count = PRODUCTS.filter((p) => p.category === c.key).length;
          return `
            <a href="${c.route}" class="category-card">
              <img
                src="${escapeHtml(c.img)}"
                alt="${escapeHtml(getCategoryLabel(c.key))}"
                class="category-card-img"
                loading="lazy"
                width="640"
                height="480"
                referrerpolicy="no-referrer"
              />
              <span class="category-card-scrim" aria-hidden="true"></span>
              <div class="category-card-body">
                <span class="category-card-count tabular-nums">${count} ${escapeHtml(t('common.itemsCountSuffix'))}</span>
                <h3 class="category-card-title">${escapeHtml(getCategoryLabel(c.key))}</h3>
                <p class="category-card-sub">${escapeHtml(t(c.subKey))}</p>
              </div>
            </a>
          `;
        })
        .join('');
    }

    // 2. Best Sellers Carousel
    const bestSellers = PRODUCTS.filter((p) => p.bestSeller).slice(0, 10);
    const bestWrapper = document.getElementById('home-bestsellers-wrapper');
    if (bestWrapper) {
      bestWrapper.innerHTML = bestSellers.map((p) => renderProductCard(p, true)).join('');
    }

    // 2B. Interactive 4K HD Food Photography Showcase
    const showcaseIds = [108, 110, 118, 125, 133, 142];
    const galleryGrid = document.getElementById('home-gallery-grid');
    if (galleryGrid) {
      galleryGrid.innerHTML = showcaseIds
        .map((pid) => {
          const p = getProductById(pid);
          if (!p) return '';
          const hiResUrl = p.image.replace(/w=\d+(&q=\d+)?/, 'w=1800&q=92');
          return `
            <button type="button" class="hd-gallery-card" data-quick-view="${p.id}">
              <img
                src="${escapeHtml(hiResUrl)}"
                alt="${escapeHtml(p.name)}"
                class="hd-gallery-img"
                loading="lazy"
                width="600"
                height="412"
                referrerpolicy="no-referrer"
              />
              <span class="hd-gallery-scrim" aria-hidden="true"></span>
              <span class="hd-gallery-badge">${escapeHtml(getCategoryLabel(p.category))}</span>
              <span class="hd-gallery-qv-pill">${escapeHtml(t('common.quickView'))}</span>
              <div class="hd-gallery-caption">
                <h3 class="hd-gallery-title">${escapeHtml(p.name)}</h3>
                <span class="hd-gallery-price tabular-nums">${escapeHtml(formatUZS(getDiscountedPrice(p)))}</span>
              </div>
            </button>
          `;
        })
        .join('');
    }

    // 3. Promotions Carousel
    const promos = t('promos');
    const promoWrapper = document.getElementById('home-promos-wrapper');
    if (promoWrapper && Array.isArray(promos)) {
      promoWrapper.innerHTML = promos
        .map(
          (pr) => `
          <div class="swiper-slide">
            <article class="promo-card">
              <div class="promo-card-copy">
                <p class="promo-card-kicker">${escapeHtml(pr.kicker)}</p>
                <h3 class="promo-card-title">${escapeHtml(pr.title)}</h3>
                <p class="promo-card-desc">${escapeHtml(pr.desc)}</p>
                <a href="${escapeHtml(pr.href)}" class="btn btn-primary">${escapeHtml(pr.cta)}</a>
              </div>
              <div class="promo-card-media">
                <img src="${escapeHtml(pr.image)}" alt="${escapeHtml(pr.title)}" loading="lazy" width="520" height="390" referrerpolicy="no-referrer" />
              </div>
            </article>
          </div>
        `
        )
        .join('');
    }

    // 4. Popular Products Carousel (Pizza, Sides & Sandwiches)
    const popularItems = PRODUCTS.filter((p) => ['pizza', 'fried-food', 'sandwiches'].includes(p.category) && p.featured).slice(0, 10);
    const popWrapper = document.getElementById('home-popular-wrapper');
    if (popWrapper) {
      popWrapper.innerHTML = popularItems.map((p) => renderProductCard(p, true)).join('');
    }

    // 5. Demo Testimonials Carousel (Avatar Initials + Stars + Quote)
    const testimonials = t('testimonials');
    const testWrapper = document.getElementById('home-testimonials-wrapper');
    if (testWrapper && Array.isArray(testimonials)) {
      testWrapper.innerHTML = testimonials
        .map(
          (item) => `
          <div class="swiper-slide">
            <article class="testimonial-card">
              <div class="testimonial-head">
                <span class="testimonial-avatar" aria-hidden="true">${escapeHtml(getInitials(item.name))}</span>
                <div class="testimonial-author">
                  <div>
                    <strong>${escapeHtml(item.name)}</strong>
                    <span>${escapeHtml(item.role)}</span>
                    <div class="testimonial-stars" aria-label="5 / 5">★★★★★</div>
                  </div>
                </div>
                <span class="testimonial-demo-label">Demo</span>
              </div>
              <p class="testimonial-quote">“${escapeHtml(item.quote)}”</p>
            </article>
          </div>
        `
        )
        .join('');
    }

    // 6. Homepage Contact Specs
    const specs = document.getElementById('home-contact-specs');
    if (specs) {
      specs.innerHTML = renderContactSpecRows();
    }
  }

  function renderContactSpecRows() {
    const locAddress = METAFOOD_CONFIG.contact.address[state.lang] || METAFOOD_CONFIG.contact.address.uz;
    const hours = METAFOOD_CONFIG.contact.hours[state.lang] || METAFOOD_CONFIG.contact.hours.uz;
    return `
      <div class="contact-spec-row">
        <dt>${escapeHtml(t('contact.phoneLabel'))}</dt>
        <dd class="tabular-nums">${escapeHtml(METAFOOD_CONFIG.contact.phonePlaceholder)}</dd>
      </div>
      <div class="contact-spec-row">
        <dt>${escapeHtml(t('contact.instagramLabel'))}</dt>
        <dd>${escapeHtml(METAFOOD_CONFIG.contact.instagramPlaceholder)}</dd>
      </div>
      <div class="contact-spec-row">
        <dt>${escapeHtml(t('contact.telegramLabel'))}</dt>
        <dd>${escapeHtml(METAFOOD_CONFIG.contact.telegramPlaceholder)}</dd>
      </div>
      <div class="contact-spec-row">
        <dt>${escapeHtml(t('contact.addressLabel'))}</dt>
        <dd>${escapeHtml(locAddress)}</dd>
      </div>
      <div class="contact-spec-row">
        <dt>${escapeHtml(t('contact.hoursLabel'))}</dt>
        <dd>${escapeHtml(hours)}</dd>
      </div>
    `;
  }

  function filterAndSortProducts(list, { search, category, sort, featuredOnly, dealsOnly, maxPrice }) {
    const q = (search || '').trim().toLowerCase();
    const filtered = list.filter((p) => {
      if (category && category !== 'all' && p.category !== category) return false;
      if (featuredOnly && !p.featured) return false;
      if (dealsOnly && !(p.discountPercent > 0)) return false;
      if (typeof maxPrice === 'number' && getDiscountedPrice(p) > maxPrice) return false;
      if (q) {
        const nameMatch = p.name.toLowerCase().includes(q);
        const descMatch =
          (p.description[state.lang] || '').toLowerCase().includes(q) ||
          (p.description.uz || '').toLowerCase().includes(q) ||
          (p.description.en || '').toLowerCase().includes(q);
        if (!nameMatch && !descMatch) return false;
      }
      return true;
    });

    const sorted = filtered.slice();
    if (sort === 'price-asc') {
      sorted.sort((a, b) => getDiscountedPrice(a) - getDiscountedPrice(b));
    } else if (sort === 'price-desc') {
      sorted.sort((a, b) => getDiscountedPrice(b) - getDiscountedPrice(a));
    } else if (sort === 'bestseller') {
      sorted.sort((a, b) => Number(b.bestSeller) - Number(a.bestSeller) || Number(b.featured) - Number(a.featured));
    } else {
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured) || Number(b.bestSeller) - Number(a.bestSeller));
    }
    return sorted;
  }

  function renderMenuView() {
    const categories = ['all', 'burgers', 'pizza', 'fried-food', 'sandwiches', 'drinks', 'desserts'];
    const tabsEl = document.getElementById('menu-category-tabs');
    if (tabsEl) {
      tabsEl.innerHTML = categories
        .map((cat) => {
          const isSelected = state.menuFilters.category === cat;
          const count = cat === 'all' ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === cat).length;
          return `
            <button
              type="button"
              role="tab"
              class="category-tab-btn"
              data-menu-category="${cat}"
              aria-selected="${isSelected ? 'true' : 'false'}"
            >
              ${escapeHtml(getCategoryLabel(cat))} (${count})
            </button>
          `;
        })
        .join('');
    }

    const searchInput = document.getElementById('menu-search-input');
    if (searchInput && searchInput.value !== state.menuFilters.search) {
      searchInput.value = state.menuFilters.search;
    }

    const sortSelect = document.getElementById('menu-sort-select');
    if (sortSelect) {
      sortSelect.value = state.menuFilters.sort;
    }

    const featBtn = document.getElementById('menu-featured-toggle');
    if (featBtn) {
      featBtn.setAttribute('aria-pressed', state.menuFilters.featuredOnly ? 'true' : 'false');
    }

    const dealsBtn = document.getElementById('menu-deals-toggle');
    if (dealsBtn) {
      dealsBtn.setAttribute('aria-pressed', state.menuFilters.dealsOnly ? 'true' : 'false');
    }

    const priceRange = document.getElementById('menu-price-range');
    if (priceRange) {
      priceRange.value = String(state.menuFilters.maxPrice);
    }

    const priceReadout = document.getElementById('menu-price-readout');
    if (priceReadout) {
      priceReadout.textContent = formatUZS(state.menuFilters.maxPrice);
    }

    const results = filterAndSortProducts(PRODUCTS, state.menuFilters);
    const countEl = document.getElementById('menu-results-count');
    if (countEl) {
      countEl.textContent = `${results.length} ${t('menu.resultsFound')}`;
    }

    const gridEl = document.getElementById('menu-product-grid');
    const emptyEl = document.getElementById('menu-empty-state');
    if (gridEl && emptyEl) {
      if (results.length === 0) {
        gridEl.innerHTML = '';
        emptyEl.hidden = false;
      } else {
        emptyEl.hidden = true;
        gridEl.innerHTML = results.map((p) => renderProductCard(p, false)).join('');
      }
    }
  }

  function renderCategoryView(categoryKey) {
    const container = document.querySelector(`[data-category-view="${categoryKey}"]`);
    if (!container) return;

    const filterState = state.categoryFilters[categoryKey] || { search: '', sort: 'featured' };
    const categoryProducts = PRODUCTS.filter((p) => p.category === categoryKey);
    const results = filterAndSortProducts(categoryProducts, {
      search: filterState.search,
      category: 'all',
      sort: filterState.sort,
      featuredOnly: false,
    });

    const otherCats = ['burgers', 'pizza', 'fried-food', 'drinks', 'desserts'].filter((c) => c !== categoryKey);

    container.innerHTML = `
      <div class="page-banner">
        <div class="container">
          <p class="section-kicker">${escapeHtml(t(`categoryViews.${categoryKey}.kicker`))}</p>
          <h1 class="page-title" id="${escapeHtml(categoryKey)}-view-title">${escapeHtml(t(`categoryViews.${categoryKey}.title`))}</h1>
          <p class="page-subtitle">${escapeHtml(t(`categoryViews.${categoryKey}.subtitle`))}</p>
        </div>
      </div>

      <div class="container menu-workspace">
        <div class="menu-toolbar" role="search">
          <div class="search-field-wrap">
            <label for="cat-search-${categoryKey}" class="sr-only">${escapeHtml(t('menu.searchLabel'))}</label>
            <svg class="search-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="search"
              id="cat-search-${categoryKey}"
              class="search-input"
              data-cat-search="${categoryKey}"
              value="${escapeHtml(filterState.search)}"
              placeholder="${escapeHtml(t('menu.searchPlaceholder'))}"
            />
          </div>
          <div class="toolbar-controls">
            <div class="sort-field-wrap">
              <label for="cat-sort-${categoryKey}" class="sr-only">${escapeHtml(t('menu.sortLabel'))}</label>
              <select id="cat-sort-${categoryKey}" class="select-input" data-cat-sort="${categoryKey}">
                <option value="featured" ${filterState.sort === 'featured' ? 'selected' : ''}>${escapeHtml(t('menu.sortFeatured'))}</option>
                <option value="bestseller" ${filterState.sort === 'bestseller' ? 'selected' : ''}>${escapeHtml(t('menu.sortPopular'))}</option>
                <option value="price-asc" ${filterState.sort === 'price-asc' ? 'selected' : ''}>${escapeHtml(t('menu.sortPriceAsc'))}</option>
                <option value="price-desc" ${filterState.sort === 'price-desc' ? 'selected' : ''}>${escapeHtml(t('menu.sortPriceDesc'))}</option>
              </select>
            </div>
            <a href="#/menu" class="btn btn-outline">${escapeHtml(t('nav.menu'))}</a>
          </div>
        </div>

        <div class="results-meta">
          <p class="results-count tabular-nums">${results.length} ${escapeHtml(t('menu.resultsFound'))}</p>
        </div>

        ${
          results.length > 0
            ? `<div class="product-grid">${results.map((p) => renderProductCard(p, false)).join('')}</div>`
            : `<div class="empty-state">
                <h2>${escapeHtml(t('menu.emptyTitle'))}</h2>
                <p>${escapeHtml(t('menu.emptyDesc'))}</p>
                <button type="button" class="btn btn-primary" data-cat-reset="${categoryKey}">${escapeHtml(t('menu.clearFilters'))}</button>
              </div>`
        }

        <div class="category-crosslinks">
          <span class="category-crosslinks-label">${escapeHtml(t('menu.otherCategories'))}</span>
          ${otherCats
            .map((c) => `<a href="#/${c}" class="btn btn-sm btn-outline">${escapeHtml(getCategoryLabel(c))}</a>`)
            .join('')}
        </div>
      </div>
    `;
  }

  function renderProductDetailView(productId) {
    const contentEl = document.getElementById('pdp-content');
    const relatedWrapper = document.getElementById('pdp-related-wrapper');
    if (!contentEl) return;

    const product = getProductById(productId);
    if (!product) {
      contentEl.innerHTML = `
        <div class="empty-state">
          <h1 id="pdp-title">${escapeHtml(t('pdp.notFoundTitle'))}</h1>
          <p>${escapeHtml(t('pdp.notFoundDesc'))}</p>
          <a href="#/menu" class="btn btn-primary">${escapeHtml(t('common.backToMenu'))}</a>
        </div>
      `;
      if (relatedWrapper) relatedWrapper.innerHTML = '';
      return;
    }

    const finalPrice = getDiscountedPrice(product);
    const hasDiscount = product.discountPercent > 0;
    const catRoute = product.category === 'sandwiches' ? 'menu' : product.category;
    const desc = product.description[state.lang] || product.description.uz;

    contentEl.innerHTML = `
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="#/home">${escapeHtml(t('common.home'))}</a>
        <span aria-hidden="true">/</span>
        <a href="#/${catRoute}">${escapeHtml(getCategoryLabel(product.category))}</a>
        <span aria-hidden="true">/</span>
        <span>${escapeHtml(product.name)}</span>
      </nav>

      <div class="pdp-grid">
        <div class="pdp-gallery">
          <img
            src="${escapeHtml(product.image)}"
            alt="${escapeHtml(product.name)}"
            width="640"
            height="480"
            referrerpolicy="no-referrer"
          />
        </div>

        <div class="pdp-purchase-panel">
          <p class="section-kicker">${escapeHtml(getCategoryLabel(product.category))}</p>
          <h1 class="pdp-title" id="pdp-title">${escapeHtml(product.name)}</h1>

          <div class="pdp-price-row">
            <span class="pdp-price-now tabular-nums">${escapeHtml(formatUZS(finalPrice))}</span>
            ${
              hasDiscount
                ? `<span class="pdp-price-old tabular-nums">${escapeHtml(formatUZS(product.price))}</span>`
                : ''
            }
          </div>

          <p class="pdp-desc">${escapeHtml(desc)}</p>

          <dl class="pdp-specs">
            <div class="pdp-spec">
              <dt>${escapeHtml(t('pdp.weight'))}</dt>
              <dd>${escapeHtml(product.weight)}</dd>
            </div>
            <div class="pdp-spec">
              <dt>${escapeHtml(t('pdp.calories'))}</dt>
              <dd>${escapeHtml(product.calories)}</dd>
            </div>
            <div class="pdp-spec">
              <dt>${escapeHtml(t('pdp.prepTime'))}</dt>
              <dd>${escapeHtml(product.prepTime)} ${escapeHtml(t('common.min'))}</dd>
            </div>
          </dl>

          <div class="pdp-buy-row">
            <div class="qty-stepper" aria-label="Quantity">
              <button type="button" class="qty-btn" id="pdp-qty-dec" aria-label="${escapeHtml(t('a11y.decreaseQty'))}">-</button>
              <span class="qty-value" id="pdp-qty-val">${state.pdpQty}</span>
              <button type="button" class="qty-btn" id="pdp-qty-inc" aria-label="${escapeHtml(t('a11y.increaseQty'))}">+</button>
            </div>
            <button type="button" class="btn btn-primary btn-lg" id="pdp-add-btn" data-pdp-add="${product.id}">
              ${escapeHtml(t('pdp.addToCart'))}
            </button>
            <a href="#/cart" class="btn btn-outline btn-lg">${escapeHtml(t('pdp.goToCart'))}</a>
          </div>
        </div>
      </div>
    `;

    if (relatedWrapper) {
      let related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id);
      if (related.length < 4) {
        const extras = PRODUCTS.filter((p) => p.id !== product.id && !related.includes(p));
        related = related.concat(extras);
      }
      relatedWrapper.innerHTML = related.slice(0, 8).map((p) => renderProductCard(p, true)).join('');
    }
  }

  function renderCartView() {
    const workspace = document.getElementById('cart-workspace');
    const clearBtn = document.getElementById('cart-clear-btn');
    if (!workspace) return;

    if (state.demoOrderReceipt) {
      if (clearBtn) clearBtn.hidden = true;
      const r = state.demoOrderReceipt;
      workspace.innerHTML = `
        <div class="demo-receipt-card">
          <p class="receipt-id">${escapeHtml(t('cart.receiptKicker'))} · ${escapeHtml(r.refId)}</p>
          <h2 class="section-title">${escapeHtml(t('cart.receiptTitle'))}</h2>
          <p class="section-note">${escapeHtml(t('cart.receiptDesc'))}</p>
          <div class="summary-rows" style="margin-top: 1.5rem;">
            <div class="summary-row">
              <span>${escapeHtml(t('cart.receiptCustomer'))}</span>
              <strong>${escapeHtml(r.name)} (${escapeHtml(r.phone)})</strong>
            </div>
            <div class="summary-row">
              <span>${escapeHtml(t('cart.addressLabel'))}</span>
              <strong>${escapeHtml(r.address)}</strong>
            </div>
            <div class="summary-row">
              <span>${escapeHtml(t('cart.total'))}</span>
              <strong>${escapeHtml(formatUZS(r.total))}</strong>
            </div>
          </div>
          <div style="margin-top: 1.5rem; display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <a href="#/menu" class="btn btn-primary" id="demo-receipt-done">${escapeHtml(t('cart.receiptNewOrder'))}</a>
          </div>
        </div>
      `;
      return;
    }

    if (state.cart.length === 0) {
      if (clearBtn) clearBtn.hidden = true;
      workspace.innerHTML = `
        <div class="empty-state">
          <h2>${escapeHtml(t('cart.emptyTitle'))}</h2>
          <p>${escapeHtml(t('cart.emptyDesc'))}</p>
          <a href="#/menu" class="btn btn-primary">${escapeHtml(t('cart.browseMenu'))}</a>
        </div>
      `;
      return;
    }

    if (clearBtn) clearBtn.hidden = false;
    const totals = calculateCartTotals();

    const itemsHtml = state.cart
      .map((entry) => {
        const product = getProductById(entry.id);
        if (!product) return '';
        const unitPrice = getDiscountedPrice(product);
        const lineTotal = unitPrice * entry.qty;
        return `
          <article class="cart-item-card" data-cart-id="${product.id}">
            <a href="#/product/${product.id}">
              <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" class="cart-item-img" width="104" height="82" referrerpolicy="no-referrer" />
            </a>
            <div class="cart-item-info">
              <a href="#/product/${product.id}">
                <h3>${escapeHtml(product.name)}</h3>
              </a>
              <p class="cart-item-unit tabular-nums">${escapeHtml(formatUZS(unitPrice))}</p>
            </div>
            <div class="cart-item-controls">
              <strong class="cart-item-subtotal tabular-nums">${escapeHtml(formatUZS(lineTotal))}</strong>
              <div class="cart-item-actions-row">
                <div class="qty-stepper">
                  <button type="button" class="qty-btn" data-cart-dec="${product.id}" aria-label="${escapeHtml(t('a11y.decreaseQty'))} ${escapeHtml(product.name)}">-</button>
                  <span class="qty-value">${entry.qty}</span>
                  <button type="button" class="qty-btn" data-cart-inc="${product.id}" aria-label="${escapeHtml(t('a11y.increaseQty'))} ${escapeHtml(product.name)}">+</button>
                </div>
                <button type="button" class="cart-remove-btn" data-cart-remove="${product.id}" aria-label="${escapeHtml(t('a11y.removeItem'))} ${escapeHtml(product.name)}">
                  ${escapeHtml(t('a11y.removeItem'))}
                </button>
              </div>
            </div>
          </article>
        `;
      })
      .join('');

    workspace.innerHTML = `
      <div class="cart-layout">
        <div class="cart-items-list">${itemsHtml}</div>

        <aside class="cart-summary-card">
          <h2 class="cart-summary-title">${escapeHtml(t('cart.summaryTitle'))}</h2>
          <div class="summary-rows">
            <div class="summary-row">
              <span>${escapeHtml(t('cart.subtotal'))}</span>
              <strong>${escapeHtml(formatUZS(totals.subtotal))}</strong>
            </div>
            ${
              totals.savings > 0
                ? `<div class="summary-row">
                    <span>${escapeHtml(t('cart.savings'))}</span>
                    <strong>-${escapeHtml(formatUZS(totals.savings))}</strong>
                  </div>`
                : ''
            }
            <div class="summary-row">
              <span>${escapeHtml(t('cart.deliverySampleLabel'))}</span>
              <strong>${
                totals.deliveryFee === 0
                  ? escapeHtml(t('cart.freeLabel'))
                  : escapeHtml(formatUZS(totals.deliveryFee))
              }</strong>
            </div>
          </div>

          <div class="summary-total-row">
            <span>${escapeHtml(t('cart.total'))}</span>
            <strong>${escapeHtml(formatUZS(totals.total))}</strong>
          </div>

          <div class="demo-notice">${escapeHtml(t('cart.demoNotice'))}</div>

          <form class="checkout-form" id="demo-checkout-form" novalidate>
            <div class="form-field">
              <label for="checkout-name" class="form-label">${escapeHtml(t('cart.nameLabel'))}</label>
              <input type="text" id="checkout-name" name="name" class="form-input" placeholder="${escapeHtml(t('cart.namePlaceholder'))}" required />
              <span class="form-error" id="err-checkout-name" hidden></span>
            </div>
            <div class="form-field">
              <label for="checkout-phone" class="form-label">${escapeHtml(t('cart.phoneLabel'))}</label>
              <input type="tel" id="checkout-phone" name="phone" class="form-input" placeholder="${escapeHtml(t('cart.phonePlaceholder'))}" required />
              <span class="form-error" id="err-checkout-phone" hidden></span>
            </div>
            <div class="form-field">
              <label for="checkout-address" class="form-label">${escapeHtml(t('cart.addressLabel'))}</label>
              <input type="text" id="checkout-address" name="address" class="form-input" placeholder="${escapeHtml(t('cart.addressPlaceholder'))}" required />
              <span class="form-error" id="err-checkout-address" hidden></span>
            </div>
            <div class="form-field">
              <label for="checkout-notes" class="form-label">${escapeHtml(t('cart.notesLabel'))}</label>
              <textarea id="checkout-notes" name="notes" rows="2" class="form-textarea" placeholder="${escapeHtml(t('cart.notesPlaceholder'))}"></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-lg">${escapeHtml(t('cart.submitDemo'))}</button>
          </form>
        </aside>
      </div>
    `;
  }

  function renderAboutView() {
    const el = document.getElementById('about-content');
    if (!el) return;
    el.innerHTML = `
      <div class="editorial-hero-split">
        <div>
          <p class="section-kicker">${escapeHtml(t('about.kicker'))}</p>
          <h1 class="page-title" id="about-view-title">${escapeHtml(t('about.title'))}</h1>
          <p class="body-lead" style="margin-top: 1rem;">${escapeHtml(t('about.lead'))}</p>
          <p class="body-muted" style="margin-top: 1rem; line-height: 1.7;">${escapeHtml(t('about.story'))}</p>
          <div style="margin-top: 1.5rem;">
            <a href="#/menu" class="btn btn-primary btn-lg">${escapeHtml(t('about.cta'))}</a>
          </div>
        </div>
        <div class="editorial-media">
          <img src="${METAFOOD_CONFIG.images.about}" alt="MetaFood kitchen Andijon Mumtoz" width="600" height="450" referrerpolicy="no-referrer" />
        </div>
      </div>

      <div class="pillars-grid">
        <article class="info-card">
          <p class="info-card-index">01</p>
          <h2>${escapeHtml(t('about.pillar1Title'))}</h2>
          <p>${escapeHtml(t('about.pillar1Desc'))}</p>
        </article>
        <article class="info-card">
          <p class="info-card-index">02</p>
          <h2>${escapeHtml(t('about.pillar2Title'))}</h2>
          <p>${escapeHtml(t('about.pillar2Desc'))}</p>
        </article>
        <article class="info-card">
          <p class="info-card-index">03</p>
          <h2>${escapeHtml(t('about.pillar3Title'))}</h2>
          <p>${escapeHtml(t('about.pillar3Desc'))}</p>
        </article>
      </div>
    `;
  }

  function renderContactView() {
    const el = document.getElementById('contact-content');
    if (!el) return;
    el.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <p class="section-kicker">${escapeHtml(t('contact.kicker'))}</p>
        <h1 class="page-title" id="contact-view-title">${escapeHtml(t('contact.title'))}</h1>
        <p class="page-subtitle">${escapeHtml(t('contact.subtitle'))}</p>
      </div>

      <div class="contact-grid">
        <div class="contact-panel">
          <dl class="contact-spec-list">${renderContactSpecRows()}</dl>
          <div class="map-embed-wrap" style="margin-top: 1.5rem; border-radius: 14px; overflow: hidden;">
            <iframe
              title="MetaFood Andijon Mumtoz"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              src="https://www.openstreetmap.org/export/embed.html?bbox=72.3100%2C40.7650%2C72.3750%2C40.8050&amp;layer=mapnik&amp;marker=40.7834%2C72.3442"
            ></iframe>
          </div>
          <div style="margin-top: 0.85rem;">
            <a
              href="https://www.openstreetmap.org/?mlat=40.7834&amp;mlon=72.3442#map=15/40.7834/72.3442"
              target="_blank"
              rel="noopener noreferrer"
              class="section-link"
            >
              ${escapeHtml(t('contact.mapExternal'))}
            </a>
          </div>
        </div>

        <div class="contact-panel">
          <h2 class="cart-summary-title">${escapeHtml(t('contact.formTitle'))}</h2>
          <div class="demo-notice">${escapeHtml(t('contact.formNotice'))}</div>
          <form class="checkout-form" id="demo-contact-form" novalidate>
            <div class="form-field">
              <label for="contact-name" class="form-label">${escapeHtml(t('contact.formName'))}</label>
              <input type="text" id="contact-name" name="name" class="form-input" placeholder="${escapeHtml(t('cart.namePlaceholder'))}" required />
              <span class="form-error" id="err-contact-name" hidden></span>
            </div>
            <div class="form-field">
              <label for="contact-email" class="form-label">${escapeHtml(t('contact.formEmail'))}</label>
              <input type="email" id="contact-email" name="email" class="form-input" placeholder="${escapeHtml(METAFOOD_CONFIG.contact.emailPlaceholder)}" required />
              <span class="form-error" id="err-contact-email" hidden></span>
            </div>
            <div class="form-field">
              <label for="contact-message" class="form-label">${escapeHtml(t('contact.formMessage'))}</label>
              <textarea id="contact-message" name="message" rows="4" class="form-textarea" required></textarea>
              <span class="form-error" id="err-contact-message" hidden></span>
            </div>
            <button type="submit" class="btn btn-primary btn-lg">${escapeHtml(t('contact.formSubmit'))}</button>
          </form>
        </div>
      </div>
    `;
  }

  function renderDeliveryView() {
    const el = document.getElementById('delivery-content');
    if (!el) return;
    const steps = t('delivery.steps');
    const faqs = t('delivery.faqs');
    const areaText = METAFOOD_CONFIG.delivery.areaPlaceholder[state.lang] || METAFOOD_CONFIG.delivery.areaPlaceholder.uz;

    el.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <p class="section-kicker">${escapeHtml(t('delivery.kicker'))}</p>
        <h1 class="page-title" id="delivery-view-title">${escapeHtml(t('delivery.title'))}</h1>
        <p class="page-subtitle">${escapeHtml(t('delivery.subtitle'))}</p>
      </div>

      <div class="pillars-grid">
        <article class="info-card">
          <p class="info-card-index">01</p>
          <h2>${escapeHtml(t('delivery.areaLabel'))}</h2>
          <p>${escapeHtml(areaText)}</p>
        </article>
        <article class="info-card">
          <p class="info-card-index">02</p>
          <h2>${escapeHtml(t('delivery.etaLabel'))}</h2>
          <p class="tabular-nums">${escapeHtml(t('delivery.etaValue'))}</p>
        </article>
        <article class="info-card">
          <p class="info-card-index">03</p>
          <h2>${escapeHtml(t('delivery.feeLabel'))}</h2>
          <p class="tabular-nums">${escapeHtml(formatUZS(METAFOOD_CONFIG.delivery.sampleFeeUzs))} · ${escapeHtml(t('delivery.freeRuleLabel'))}: ${escapeHtml(formatUZS(METAFOOD_CONFIG.delivery.freeThresholdUzs))}</p>
        </article>
      </div>

      <h2 class="section-title" style="margin-top: 2rem;">${escapeHtml(t('delivery.stepsTitle'))}</h2>
      <div class="steps-grid">
        ${(Array.isArray(steps) ? steps : [])
          .map(
            (s) => `
          <article class="info-card">
            <p class="info-card-index">${escapeHtml(s.num)}</p>
            <h3>${escapeHtml(s.title)}</h3>
            <p>${escapeHtml(s.desc)}</p>
          </article>
        `
          )
          .join('')}
      </div>

      <h2 class="section-title" style="margin-top: 2.5rem; margin-bottom: 1.25rem;">${escapeHtml(t('delivery.faqTitle'))}</h2>
      <div class="faq-list">
        ${renderFaqItems(Array.isArray(faqs) ? faqs : [], 'delivery-faq')}
      </div>
    `;
  }

  function renderFaqView() {
    const el = document.getElementById('faq-content');
    if (!el) return;
    const items = t('faq.items');
    el.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <p class="section-kicker">${escapeHtml(t('faq.kicker'))}</p>
        <h1 class="page-title" id="faq-view-title">${escapeHtml(t('faq.title'))}</h1>
        <p class="page-subtitle">${escapeHtml(t('faq.subtitle'))}</p>
      </div>
      <div class="faq-list">
        ${renderFaqItems(Array.isArray(items) ? items : [], 'main-faq')}
      </div>
    `;
  }

  function renderFaqItems(items, prefix) {
    return items
      .map(
        (item, idx) => `
        <article class="faq-item">
          <button
            type="button"
            class="faq-trigger"
            aria-expanded="${idx === 0 ? 'true' : 'false'}"
            aria-controls="${prefix}-panel-${idx}"
            data-faq-toggle="${prefix}-panel-${idx}"
          >
            <span>${escapeHtml(item.q)}</span>
            <svg class="faq-chevron" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="faq-answer" id="${prefix}-panel-${idx}" ${idx === 0 ? '' : 'hidden'}>
            ${escapeHtml(item.a)}
          </div>
        </article>
      `
      )
      .join('');
  }

  function renderFooterContactAndCopyright() {
    const listEl = document.getElementById('footer-contact-list');
    if (listEl) {
      const addr = METAFOOD_CONFIG.contact.address[state.lang] || METAFOOD_CONFIG.contact.address.uz;
      const hrs = METAFOOD_CONFIG.contact.hours[state.lang] || METAFOOD_CONFIG.contact.hours.uz;
      listEl.innerHTML = `
        <li><strong>${escapeHtml(t('contact.phoneLabel'))}:</strong> ${escapeHtml(METAFOOD_CONFIG.contact.phonePlaceholder)}</li>
        <li><strong>Instagram:</strong> ${escapeHtml(METAFOOD_CONFIG.contact.instagramPlaceholder)}</li>
        <li><strong>Telegram:</strong> ${escapeHtml(METAFOOD_CONFIG.contact.telegramPlaceholder)}</li>
        <li><strong>${escapeHtml(t('contact.addressLabel'))}:</strong> ${escapeHtml(addr)}</li>
        <li><strong>${escapeHtml(t('contact.hoursLabel'))}:</strong> ${escapeHtml(hrs)}</li>
      `;
    }
    const copyEl = document.getElementById('footer-copyright');
    if (copyEl) copyEl.textContent = t('footer.copyright');
  }

  /* ========================================================================
     8. CART, DEMO CHECKOUT & NOTIFICATIONS
     ======================================================================== */
  function calculateCartTotals() {
    let originalSubtotal = 0;
    let subtotal = 0;
    let count = 0;

    state.cart.forEach((entry) => {
      const product = getProductById(entry.id);
      if (!product) return;
      const unitFinal = getDiscountedPrice(product);
      originalSubtotal += product.price * entry.qty;
      subtotal += unitFinal * entry.qty;
      count += entry.qty;
    });

    const savings = Math.max(0, originalSubtotal - subtotal);
    const deliveryFee =
      subtotal === 0 || subtotal >= METAFOOD_CONFIG.delivery.freeThresholdUzs
        ? 0
        : METAFOOD_CONFIG.delivery.sampleFeeUzs;

    return {
      count,
      subtotal,
      savings,
      deliveryFee,
      total: subtotal + deliveryFee,
    };
  }

  function updateCartBadge(animate) {
    const badge = document.getElementById('header-cart-count');
    const trigger = document.getElementById('header-cart-btn');
    const { count } = calculateCartTotals();
    if (badge) badge.textContent = String(count);
    if (trigger && animate) {
      trigger.classList.remove('is-bumped');
      void trigger.offsetWidth;
      trigger.classList.add('is-bumped');
      setTimeout(() => trigger.classList.remove('is-bumped'), 260);
    }
  }

  function syncAfterCartMutation(animateBadge) {
    saveCart();
    updateCartBadge(animateBadge);
    syncAllProductCardActions();
    if (state.cartDrawerOpen) renderCartDrawer();
    if (state.currentRoute === 'cart') renderCartView();
  }

  function addToCart(productId, qty) {
    const product = getProductById(productId);
    if (!product) return;
    const validQty = Math.max(1, Math.min(99, parseInt(qty, 10) || 1));
    state.demoOrderReceipt = null;

    const existing = state.cart.find((item) => item.id === product.id);
    if (existing) {
      existing.qty = Math.min(99, existing.qty + validQty);
    } else {
      state.cart.push({ id: product.id, qty: validQty });
    }

    syncAfterCartMutation(true);
    showToast(`${product.name} ${t('common.addedToast')}`, 'success');
  }

  function updateCartQuantity(productId, delta) {
    const idx = state.cart.findIndex((item) => item.id === Number(productId));
    if (idx === -1) return;
    const nextQty = state.cart[idx].qty + delta;
    if (nextQty <= 0) {
      state.cart.splice(idx, 1);
    } else {
      state.cart[idx].qty = Math.min(99, nextQty);
    }
    syncAfterCartMutation(true);
  }

  function removeFromCart(productId) {
    state.cart = state.cart.filter((item) => item.id !== Number(productId));
    syncAfterCartMutation(true);
  }

  function clearCart() {
    state.cart = [];
    syncAfterCartMutation(false);
    showToast(t('cart.clearedToast'), 'success');
  }

  function renderCartDrawer() {
    const countEl = document.getElementById('cart-drawer-count-label');
    const bodyEl = document.getElementById('cart-drawer-body');
    const footEl = document.getElementById('cart-drawer-foot');
    if (!bodyEl || !footEl) return;

    const totals = calculateCartTotals();
    if (countEl) {
      countEl.textContent = `${totals.count} ${t('cart.drawerItemsSuffix')}`;
    }

    const threshold = METAFOOD_CONFIG.delivery.freeThresholdUzs;
    const remaining = Math.max(0, threshold - totals.subtotal);
    const pct = Math.min(100, Math.round((totals.subtotal / threshold) * 100));

    const progressHtml = `
      <div class="delivery-progress-box">
        <p class="delivery-progress-text tabular-nums">
          ${
            remaining === 0 && totals.subtotal > 0
              ? escapeHtml(t('cart.freeDeliveryReached'))
              : `${escapeHtml(t('cart.freeDeliveryRemaining'))} <strong>${escapeHtml(formatUZS(remaining))}</strong>`
          }
        </p>
        <div class="delivery-progress-track">
          <div class="delivery-progress-fill" style="width: ${pct}%;"></div>
        </div>
      </div>
    `;

    if (state.cart.length === 0) {
      bodyEl.innerHTML = `
        <div class="empty-state" style="margin-top: 0.5rem;">
          <h2>${escapeHtml(t('cart.emptyTitle'))}</h2>
          <p>${escapeHtml(t('cart.emptyDesc'))}</p>
        </div>
      `;
      footEl.innerHTML = `
        <a href="#/menu" class="btn btn-primary btn-lg" id="drawer-browse-link">${escapeHtml(t('cart.continueBrowsing'))}</a>
      `;
      return;
    }

    const rowsHtml = state.cart
      .map((entry) => {
        const product = getProductById(entry.id);
        if (!product) return '';
        const unit = getDiscountedPrice(product);
        return `
          <div class="drawer-item-row">
            <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" width="64" height="54" referrerpolicy="no-referrer" />
            <div class="drawer-item-info">
              <strong>${escapeHtml(product.name)}</strong>
              <span>${escapeHtml(formatUZS(unit * entry.qty))}</span>
            </div>
            <div class="qty-stepper">
              <button type="button" class="qty-btn" style="width:32px;height:36px;" data-cart-dec="${product.id}" aria-label="${escapeHtml(t('a11y.decreaseQty'))}">-</button>
              <span class="qty-value" style="min-width:1.75rem;font-size:0.875rem;">${entry.qty}</span>
              <button type="button" class="qty-btn" style="width:32px;height:36px;" data-cart-inc="${product.id}" aria-label="${escapeHtml(t('a11y.increaseQty'))}">+</button>
            </div>
          </div>
        `;
      })
      .join('');

    bodyEl.innerHTML = `${progressHtml}${rowsHtml}`;
    footEl.innerHTML = `
      <div class="drawer-total-row">
        <span>${escapeHtml(t('cart.subtotal'))}</span>
        <strong>${escapeHtml(formatUZS(totals.subtotal))}</strong>
      </div>
      <a href="#/cart" class="btn btn-primary btn-lg" id="drawer-checkout-link">${escapeHtml(t('cart.goToCheckout'))}</a>
    `;
  }

  function openCartDrawer() {
    closeMobileDrawer();
    closeQuickViewModal();
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-drawer-backdrop');
    const trigger = document.getElementById('header-cart-btn');
    if (!drawer || !backdrop) return;
    state.cartDrawerOpen = true;
    renderCartDrawer();
    backdrop.hidden = false;
    drawer.setAttribute('aria-hidden', 'false');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => {
      backdrop.classList.add('is-open');
      drawer.classList.add('is-open');
    });
  }

  function closeCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-drawer-backdrop');
    const trigger = document.getElementById('header-cart-btn');
    if (!drawer || !backdrop || !state.cartDrawerOpen) return;
    state.cartDrawerOpen = false;
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    setTimeout(() => {
      if (!state.cartDrawerOpen) backdrop.hidden = true;
    }, 260);
  }

  function renderQuickViewContent() {
    const bodyEl = document.getElementById('quick-view-body');
    const product = getProductById(state.quickViewId);
    if (!bodyEl || !product) return;

    const finalPrice = getDiscountedPrice(product);
    const hasDiscount = product.discountPercent > 0;
    const desc = product.description[state.lang] || product.description.uz;

    bodyEl.innerHTML = `
      <div class="quick-view-grid">
        <div class="quick-view-media">
          <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" width="480" height="360" referrerpolicy="no-referrer" />
        </div>
        <div>
          <p class="section-kicker">${escapeHtml(getCategoryLabel(product.category))}</p>
          <h2 class="pdp-title" id="quick-view-title" style="font-size: clamp(1.35rem, 2.4vw, 1.85rem);">${escapeHtml(product.name)}</h2>
          <div class="pdp-price-row" style="margin-bottom: 0.9rem;">
            <span class="pdp-price-now" style="font-size: 1.5rem;">${escapeHtml(formatUZS(finalPrice))}</span>
            ${hasDiscount ? `<span class="pdp-price-old">${escapeHtml(formatUZS(product.price))}</span>` : ''}
          </div>
          <p class="pdp-desc" style="font-size: 0.925rem; margin-bottom: 1rem;">${escapeHtml(desc)}</p>
          <dl class="pdp-specs" style="margin-bottom: 1.1rem; padding-block: 0.75rem;">
            <div class="pdp-spec">
              <dt>${escapeHtml(t('pdp.weight'))}</dt>
              <dd>${escapeHtml(product.weight)}</dd>
            </div>
            <div class="pdp-spec">
              <dt>${escapeHtml(t('pdp.calories'))}</dt>
              <dd>${escapeHtml(product.calories)}</dd>
            </div>
            <div class="pdp-spec">
              <dt>${escapeHtml(t('pdp.prepTime'))}</dt>
              <dd>${escapeHtml(product.prepTime)} ${escapeHtml(t('common.min'))}</dd>
            </div>
          </dl>
          <div class="pdp-buy-row">
            <div class="qty-stepper" aria-label="Quantity">
              <button type="button" class="qty-btn" id="qv-qty-dec" aria-label="${escapeHtml(t('a11y.decreaseQty'))}">-</button>
              <span class="qty-value" id="qv-qty-val">${state.quickViewQty}</span>
              <button type="button" class="qty-btn" id="qv-qty-inc" aria-label="${escapeHtml(t('a11y.increaseQty'))}">+</button>
            </div>
            <button type="button" class="btn btn-primary" id="qv-add-btn" data-qv-add="${product.id}">
              ${escapeHtml(t('pdp.addToCart'))}
            </button>
            <a href="#/product/${product.id}" class="btn btn-outline" id="qv-fullpage-link">${escapeHtml(t('common.viewFullPage'))}</a>
          </div>
        </div>
      </div>
    `;
  }

  function openQuickViewModal(productId) {
    const product = getProductById(productId);
    const modal = document.getElementById('quick-view-modal');
    const backdrop = document.getElementById('quick-view-backdrop');
    if (!product || !modal || !backdrop) return;
    closeMobileDrawer();
    closeCartDrawer();
    state.quickViewId = product.id;
    state.quickViewQty = 1;
    renderQuickViewContent();
    backdrop.hidden = false;
    modal.hidden = false;
    requestAnimationFrame(() => {
      backdrop.classList.add('is-open');
      modal.classList.add('is-open');
    });
  }

  function closeQuickViewModal() {
    const modal = document.getElementById('quick-view-modal');
    const backdrop = document.getElementById('quick-view-backdrop');
    if (!modal || !backdrop || !state.quickViewId) return;
    state.quickViewId = null;
    modal.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    setTimeout(() => {
      if (!state.quickViewId) {
        modal.hidden = true;
        backdrop.hidden = true;
      }
    }, 240);
  }

  function showToast(message, type) {
    const region = document.getElementById('toast-region');
    if (!region) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'toast-error' : 'toast-success'}`;
    toast.textContent = message;
    region.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      toast.style.transition = 'opacity 180ms ease, transform 180ms ease';
      setTimeout(() => toast.remove(), 200);
    }, 2800);
  }

  function handleDemoCheckoutSubmit(form) {
    const nameInput = form.querySelector('#checkout-name');
    const phoneInput = form.querySelector('#checkout-phone');
    const addrInput = form.querySelector('#checkout-address');

    const nameVal = (nameInput?.value || '').trim();
    const phoneVal = (phoneInput?.value || '').trim();
    const addrVal = (addrInput?.value || '').trim();

    let valid = true;
    setFieldError(nameInput, 'err-checkout-name', nameVal.length < 2 ? t('cart.errName') : '');
    if (nameVal.length < 2) valid = false;

    const digitsCount = phoneVal.replace(/\D/g, '').length;
    setFieldError(phoneInput, 'err-checkout-phone', digitsCount < 7 ? t('cart.errPhone') : '');
    if (digitsCount < 7) valid = false;

    setFieldError(addrInput, 'err-checkout-address', addrVal.length < 4 ? t('cart.errAddress') : '');
    if (addrVal.length < 4) valid = false;

    if (!valid) return;

    const totals = calculateCartTotals();
    state.demoOrderReceipt = {
      refId: `DEMO-${Math.floor(1000 + Math.random() * 9000)}`,
      name: nameVal,
      phone: phoneVal,
      address: addrVal,
      total: totals.total,
    };
    state.cart = [];
    saveCart();
    updateCartBadge(false);
    renderCartView();
    showToast(t('cart.receiptTitle'), 'success');
  }

  function handleDemoContactSubmit(form) {
    const nameInput = form.querySelector('#contact-name');
    const emailInput = form.querySelector('#contact-email');
    const msgInput = form.querySelector('#contact-message');

    const nameVal = (nameInput?.value || '').trim();
    const emailVal = (emailInput?.value || '').trim();
    const msgVal = (msgInput?.value || '').trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);

    let valid = true;
    setFieldError(nameInput, 'err-contact-name', nameVal.length < 2 ? t('cart.errName') : '');
    if (nameVal.length < 2) valid = false;

    setFieldError(emailInput, 'err-contact-email', !emailOk ? t('contact.errEmail') : '');
    if (!emailOk) valid = false;

    setFieldError(msgInput, 'err-contact-message', msgVal.length < 10 ? t('contact.errMessage') : '');
    if (msgVal.length < 10) valid = false;

    if (!valid) return;
    form.reset();
    showToast(t('contact.formSuccess'), 'success');
  }

  function setFieldError(inputEl, errorId, message) {
    const errEl = document.getElementById(errorId);
    if (!inputEl || !errEl) return;
    if (message) {
      inputEl.classList.add('is-invalid');
      inputEl.setAttribute('aria-invalid', 'true');
      errEl.textContent = message;
      errEl.hidden = false;
    } else {
      inputEl.classList.remove('is-invalid');
      inputEl.removeAttribute('aria-invalid');
      errEl.textContent = '';
      errEl.hidden = true;
    }
  }

  /* ========================================================================
     9. GSAP PAGE TRANSITIONS, HERO TILT & SWIPER CAROUSELS
     ======================================================================== */
  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function initHeroTilt() {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia || !window.matchMedia('(hover: hover)').matches) return;
    const frame = document.querySelector('.hero-image-frame');
    if (!frame) return;

    frame.addEventListener('mousemove', (e) => {
      const rect = frame.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      frame.style.transform = `perspective(1000px) rotateY(${(nx * 6).toFixed(2)}deg) rotateX(${(-ny * 5).toFixed(2)}deg)`;
    });

    frame.addEventListener('mouseleave', () => {
      frame.style.transition = 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)';
      frame.style.transform = '';
      setTimeout(() => {
        frame.style.transition = '';
      }, 320);
    });
  }

  function destroyActiveSwipers() {
    state.swipers.forEach((instance) => {
      if (instance && typeof instance.destroy === 'function') {
        instance.destroy(true, true);
      }
    });
    state.swipers = [];
  }

  function initViewSwipers(route) {
    destroyActiveSwipers();
    if (typeof window.Swiper !== 'function') return;

    if (route === 'home') {
      const productBreakpoints = {
        320: { slidesPerView: 1.15, spaceBetween: 14 },
        560: { slidesPerView: 2, spaceBetween: 16 },
        960: { slidesPerView: 3, spaceBetween: 20 },
        1200: { slidesPerView: 4, spaceBetween: 24 },
      };

      if (document.getElementById('bestsellers-swiper')) {
        state.swipers.push(
          new window.Swiper('#bestsellers-swiper', {
            slidesPerView: 1.15,
            spaceBetween: 14,
            navigation: { nextEl: '#bestsellers-next', prevEl: '#bestsellers-prev' },
            pagination: { el: '#bestsellers-pagination', clickable: true },
            breakpoints: productBreakpoints,
          })
        );
      }

      if (document.getElementById('promos-swiper')) {
        state.swipers.push(
          new window.Swiper('#promos-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            navigation: { nextEl: '#promos-next', prevEl: '#promos-prev' },
            pagination: { el: '#promos-pagination', clickable: true },
          })
        );
      }

      if (document.getElementById('popular-swiper')) {
        state.swipers.push(
          new window.Swiper('#popular-swiper', {
            slidesPerView: 1.15,
            spaceBetween: 14,
            navigation: { nextEl: '#popular-next', prevEl: '#popular-prev' },
            pagination: { el: '#popular-pagination', clickable: true },
            breakpoints: productBreakpoints,
          })
        );
      }

      if (document.getElementById('testimonials-swiper')) {
        state.swipers.push(
          new window.Swiper('#testimonials-swiper', {
            slidesPerView: 1,
            spaceBetween: 18,
            navigation: { nextEl: '#testimonials-next', prevEl: '#testimonials-prev' },
            pagination: { el: '#testimonials-pagination', clickable: true },
            breakpoints: {
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            },
          })
        );
      }
    } else if (route === 'product' && document.getElementById('related-swiper')) {
      state.swipers.push(
        new window.Swiper('#related-swiper', {
          slidesPerView: 1.15,
          spaceBetween: 14,
          navigation: { nextEl: '#related-next', prevEl: '#related-prev' },
          pagination: { el: '#related-pagination', clickable: true },
          breakpoints: {
            560: { slidesPerView: 2, spaceBetween: 16 },
            960: { slidesPerView: 3, spaceBetween: 20 },
            1200: { slidesPerView: 4, spaceBetween: 24 },
          },
        })
      );
    }
  }

  function runViewAnimations(route, fromTransition) {
    if (prefersReducedMotion() || !window.gsap) return;
    const gsap = window.gsap;

    if (route === 'home' && !fromTransition) {
      gsap.from('.hero-copy > *', {
        y: 16,
        opacity: 0,
        duration: 0.45,
        stagger: 0.06,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      });
      gsap.from('.hero-image-frame', {
        scale: 0.97,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      });
    } else {
      const activeSection = document.querySelector('.spa-view.is-active');
      if (activeSection) {
        gsap.fromTo(
          activeSection,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.34,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
          }
        );

        const entryItems = activeSection.querySelectorAll(
          '.page-banner .container, .menu-workspace, .category-page-root, .pdp-container, .pdp-related-section, .cart-workspace, .about-page, .contact-page, .delivery-page, .faq-page'
        );
        if (entryItems.length) {
          gsap.from(entryItems, {
            y: 18,
            opacity: 0,
            duration: 0.42,
            stagger: 0.07,
            delay: 0.04,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
          });
        }
      }
    }
  }

  function dismissPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    window.setTimeout(() => {
      preloader.classList.add('is-done');
    }, 260);
  }

  /* ========================================================================
     10. HASH ROUTER, NAVIGATION & EVENT DELEGATION
     ======================================================================== */
  const VALID_ROUTES = [
    'home',
    'menu',
    'burgers',
    'pizza',
    'fried-food',
    'drinks',
    'desserts',
    'product',
    'cart',
    'about',
    'contact',
    'delivery',
    'faq',
  ];

  function parseHash() {
    const rawHash = window.location.hash || '#/home';
    const cleaned = rawHash.replace(/^#\/?/, '').trim();
    if (!cleaned) return { route: 'home', param: null };
    const segments = cleaned.split('/');
    const head = segments[0].toLowerCase();

    if (head === 'product' && segments[1]) {
      return { route: 'product', param: segments[1] };
    }
    if (head === 'sandwiches') {
      state.menuFilters.category = 'sandwiches';
      return { route: 'menu', param: null };
    }
    if (VALID_ROUTES.includes(head)) {
      return { route: head, param: null };
    }
    return { route: 'home', param: null };
  }

  function navigateWithTransition(targetHash) {
    const normalizedTarget = targetHash.startsWith('#/') ? targetHash : `#/${targetHash.replace(/^#?\/?/, '')}`;
    const currentHash = window.location.hash || '#/home';
    if (normalizedTarget === currentHash) {
      closeMobileDrawer();
      closeCartDrawer();
      closeQuickViewModal();
      window.scrollTo(0, 0);
      return;
    }

    closeMobileDrawer();
    closeCartDrawer();
    closeQuickViewModal();

    const curtain = document.getElementById('page-transition-curtain');
    const amberLayer = curtain ? curtain.querySelector('.curtain-layer-amber') : null;
    const accentLayer = curtain ? curtain.querySelector('.curtain-layer-accent') : null;
    const mainLayer = curtain ? curtain.querySelector('.curtain-layer-main') : null;
    const ringEl = curtain ? curtain.querySelector('.curtain-mark-ring') : null;
    const markEl = curtain ? curtain.querySelector('.curtain-mark') : null;
    const brandEl = curtain ? curtain.querySelector('.curtain-brand') : null;

    if (prefersReducedMotion() || !window.gsap || !curtain || !amberLayer || !accentLayer || !mainLayer || state.isTransitioning) {
      window.location.hash = normalizedTarget;
      return;
    }

    const gsap = window.gsap;
    state.isTransitioning = true;
    curtain.classList.add('is-active');

    gsap.set([amberLayer, accentLayer, mainLayer], { yPercent: 106 });
    if (ringEl) gsap.set(ringEl, { opacity: 0, scale: 0.68, rotate: -18 });
    if (markEl) gsap.set(markEl, { opacity: 0, scale: 0.8 });
    if (brandEl) gsap.set(brandEl, { opacity: 0, y: 8 });

    const tl = gsap.timeline({
      onComplete: () => {
        curtain.classList.remove('is-active');
        gsap.set([amberLayer, accentLayer, mainLayer], { yPercent: 106 });
        state.isTransitioning = false;
      },
    });

    tl.to([amberLayer, accentLayer, mainLayer], {
      yPercent: 0,
      duration: 0.32,
      stagger: 0.045,
      ease: 'power3.out',
    })
      .to(
        [markEl, brandEl],
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.2,
          stagger: 0.035,
          ease: 'power3.out',
        },
        '-=0.1'
      )
      .to(
        ringEl,
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.24,
          ease: 'power3.out',
        },
        '<'
      )
      .add(() => {
        state.isInternalHashChange = true;
        window.location.hash = normalizedTarget;
        navigateToCurrentHash(true);
      })
      .to([markEl, ringEl, brandEl], {
        opacity: 0,
        scale: 0.94,
        y: -4,
        duration: 0.14,
        ease: 'power2.inOut',
      })
      .to(
        [mainLayer, accentLayer, amberLayer],
        {
          yPercent: -106,
          duration: 0.34,
          stagger: 0.045,
          ease: 'power3.inOut',
        },
        '-=0.05'
      );
  }

  function navigateToCurrentHash(fromTransition) {
    const { route, param } = parseHash();
    state.currentRoute = route;
    state.currentProductId = param ? Number(param) : null;
    if (route === 'product') state.pdpQty = 1;

    closeMobileDrawer();
    closeCartDrawer();
    closeQuickViewModal();

    // Toggle visible view section
    document.querySelectorAll('.spa-view').forEach((sec) => {
      const isMatch = sec.getAttribute('data-view') === route;
      sec.hidden = !isMatch;
      sec.classList.toggle('is-active', isMatch);
    });

    // Active nav highlight
    document.querySelectorAll('[data-route]').forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('data-route') === route);
    });

    renderActiveRouteContent();
    applyStaticTranslations();
    updateDocumentMetadata();
    initViewSwipers(route);
    runViewAnimations(route, Boolean(fromTransition));

    window.scrollTo(0, 0);
  }

  function renderActiveRouteContent() {
    const route = state.currentRoute;
    if (route === 'home') renderHomeView();
    else if (route === 'menu') renderMenuView();
    else if (['burgers', 'pizza', 'fried-food', 'drinks', 'desserts'].includes(route)) {
      renderCategoryView(route);
    } else if (route === 'product') renderProductDetailView(state.currentProductId);
    else if (route === 'cart') renderCartView();
    else if (route === 'about') renderAboutView();
    else if (route === 'contact') renderContactView();
    else if (route === 'delivery') renderDeliveryView();
    else if (route === 'faq') renderFaqView();
  }

  function setLanguage(nextLang) {
    if (!METAFOOD_CONFIG.supportedLanguages.includes(nextLang) || nextLang === state.lang) return;
    state.lang = nextLang;
    safeStorageSet(STORAGE_KEYS.lang, nextLang);
    applyStaticTranslations();
    renderActiveRouteContent();
    initViewSwipers(state.currentRoute);
  }

  function openMobileDrawer() {
    const drawer = document.getElementById('mobile-drawer');
    const backdrop = document.getElementById('mobile-drawer-backdrop');
    const toggle = document.getElementById('mobile-menu-toggle');
    if (!drawer || !backdrop) return;
    backdrop.hidden = false;
    drawer.setAttribute('aria-hidden', 'false');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => {
      backdrop.classList.add('is-open');
      drawer.classList.add('is-open');
    });
  }

  function closeMobileDrawer() {
    const drawer = document.getElementById('mobile-drawer');
    const backdrop = document.getElementById('mobile-drawer-backdrop');
    const toggle = document.getElementById('mobile-menu-toggle');
    if (!drawer || !backdrop) return;
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    setTimeout(() => {
      if (!drawer.classList.contains('is-open')) {
        backdrop.hidden = true;
      }
    }, 260);
  }

  function initPointerEffects() {
    const cursor = document.getElementById('custom-cursor');
    const progress = document.getElementById('scroll-progress');
    const pointerFine = window.matchMedia && window.matchMedia('(pointer: fine)').matches;

    if (cursor && pointerFine && !prefersReducedMotion()) {
      let pointerFrame = 0;
      let pointerX = 0;
      let pointerY = 0;

      document.addEventListener('pointermove', (event) => {
        pointerX = event.clientX;
        pointerY = event.clientY;
        if (pointerFrame) return;
        pointerFrame = window.requestAnimationFrame(() => {
          cursor.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
          cursor.classList.add('is-visible');
          pointerFrame = 0;
        });
      }, { passive: true });

      window.addEventListener('pointerout', (event) => {
        if (!event.relatedTarget) cursor.classList.remove('is-visible');
      });

      const getInteractiveTarget = (target) => {
        return target instanceof Element
          ? target.closest('a, button, [role="button"], input, select, textarea, .product-card, .category-card')
          : null;
      };

      document.addEventListener('pointerover', (event) => {
        if (getInteractiveTarget(event.target)) cursor.classList.add('is-hovered');
      });

      document.addEventListener('pointerout', (event) => {
        const previousTarget = getInteractiveTarget(event.target);
        const nextTarget = getInteractiveTarget(event.relatedTarget);
        if (previousTarget !== nextTarget) cursor.classList.toggle('is-hovered', Boolean(nextTarget));
      });
    }
  }

  function bindGlobalEvents() {
    // Sticky header scroll state
    const header = document.getElementById('site-header');
    const progress = document.getElementById('scroll-progress');
    let scrollFrame = 0;
    const updateScrollState = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      if (header) header.classList.toggle('is-scrolled', scrollY > 18);
      if (progress) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollRatio = maxScroll > 0 ? Math.min(1, scrollY / maxScroll) : 0;
        progress.style.transform = `scaleX(${scrollRatio})`;
      }
      scrollFrame = 0;
    };
    const scheduleScrollState = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(updateScrollState);
    };

    window.addEventListener(
      'scroll',
      scheduleScrollState,
      { passive: true }
    );
    window.addEventListener('resize', scheduleScrollState, { passive: true });
    updateScrollState();

    // Hash routing (supports native back/forward + animated link transitions)
    window.addEventListener('hashchange', () => {
      if (state.isInternalHashChange) {
        state.isInternalHashChange = false;
        return;
      }
      navigateToCurrentHash(false);
    });

    // Mobile drawer, Cart drawer & Quick View modal controls
    document.getElementById('mobile-menu-toggle')?.addEventListener('click', openMobileDrawer);
    document.getElementById('mobile-drawer-close')?.addEventListener('click', closeMobileDrawer);
    document.getElementById('mobile-drawer-backdrop')?.addEventListener('click', closeMobileDrawer);

    document.getElementById('header-cart-btn')?.addEventListener('click', openCartDrawer);
    document.getElementById('cart-drawer-close')?.addEventListener('click', closeCartDrawer);
    document.getElementById('cart-drawer-backdrop')?.addEventListener('click', closeCartDrawer);

    document.getElementById('header-search-btn')?.addEventListener('click', () => {
      if (state.currentRoute !== 'menu') {
        navigateWithTransition('#/menu');
        setTimeout(() => {
          document.getElementById('menu-search-input')?.focus();
        }, 420);
      } else {
        const input = document.getElementById('menu-search-input');
        if (input) {
          input.scrollIntoView({ behavior: 'smooth', block: 'center' });
          input.focus();
        }
      }
    });

    document.getElementById('hero-scroll-cue')?.addEventListener('click', () => {
      document.getElementById('home-categories-band')?.scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('quick-view-close')?.addEventListener('click', closeQuickViewModal);
    document.getElementById('quick-view-backdrop')?.addEventListener('click', closeQuickViewModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMobileDrawer();
        closeCartDrawer();
        closeQuickViewModal();
      }
    });

    // Global click delegation
    document.addEventListener('click', (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;

      // Intercept internal SPA hash links for gorgeous page transition
      const navAnchor = target.closest('a[href^="#/"]');
      if (
        navAnchor &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.shiftKey &&
        !e.altKey &&
        navAnchor.getAttribute('target') !== '_blank'
      ) {
        e.preventDefault();
        navigateWithTransition(navAnchor.getAttribute('href') || '#/home');
        return;
      }

      const langBtn = target.closest('.lang-btn');
      if (langBtn) {
        const lang = langBtn.getAttribute('data-lang');
        if (lang) setLanguage(lang);
        return;
      }

      const qvTrigger = target.closest('[data-quick-view]');
      if (qvTrigger) {
        openQuickViewModal(qvTrigger.getAttribute('data-quick-view'));
        return;
      }

      const qvAdd = target.closest('[data-qv-add]');
      if (qvAdd) {
        addToCart(qvAdd.getAttribute('data-qv-add'), state.quickViewQty);
        closeQuickViewModal();
        return;
      }

      if (target.closest('#qv-qty-inc')) {
        state.quickViewQty = Math.min(99, state.quickViewQty + 1);
        const valEl = document.getElementById('qv-qty-val');
        if (valEl) valEl.textContent = String(state.quickViewQty);
        return;
      }

      if (target.closest('#qv-qty-dec')) {
        state.quickViewQty = Math.max(1, state.quickViewQty - 1);
        const valEl = document.getElementById('qv-qty-val');
        if (valEl) valEl.textContent = String(state.quickViewQty);
        return;
      }

      const addBtn = target.closest('[data-add-to-cart]');
      if (addBtn) {
        addToCart(addBtn.getAttribute('data-add-to-cart'), 1);
        return;
      }

      const pdpAdd = target.closest('[data-pdp-add]');
      if (pdpAdd) {
        addToCart(pdpAdd.getAttribute('data-pdp-add'), state.pdpQty);
        return;
      }

      if (target.closest('#pdp-qty-inc')) {
        state.pdpQty = Math.min(99, state.pdpQty + 1);
        const valEl = document.getElementById('pdp-qty-val');
        if (valEl) valEl.textContent = String(state.pdpQty);
        return;
      }

      if (target.closest('#pdp-qty-dec')) {
        state.pdpQty = Math.max(1, state.pdpQty - 1);
        const valEl = document.getElementById('pdp-qty-val');
        if (valEl) valEl.textContent = String(state.pdpQty);
        return;
      }

      const catTab = target.closest('[data-menu-category]');
      if (catTab) {
        state.menuFilters.category = catTab.getAttribute('data-menu-category') || 'all';
        renderMenuView();
        return;
      }

      if (target.closest('#menu-featured-toggle')) {
        state.menuFilters.featuredOnly = !state.menuFilters.featuredOnly;
        renderMenuView();
        return;
      }

      if (target.closest('#menu-deals-toggle')) {
        state.menuFilters.dealsOnly = !state.menuFilters.dealsOnly;
        renderMenuView();
        return;
      }

      if (target.closest('#menu-clear-filters') || target.closest('#menu-empty-reset')) {
        state.menuFilters = {
          search: '',
          category: 'all',
          sort: 'featured',
          featuredOnly: false,
          dealsOnly: false,
          maxPrice: 95000,
        };
        renderMenuView();
        return;
      }

      const catReset = target.closest('[data-cat-reset]');
      if (catReset) {
        const key = catReset.getAttribute('data-cat-reset');
        if (key && state.categoryFilters[key]) {
          state.categoryFilters[key] = { search: '', sort: 'featured' };
          renderCategoryView(key);
        }
        return;
      }

      const cartInc = target.closest('[data-cart-inc]');
      if (cartInc) {
        updateCartQuantity(cartInc.getAttribute('data-cart-inc'), 1);
        return;
      }

      const cartDec = target.closest('[data-cart-dec]');
      if (cartDec) {
        updateCartQuantity(cartDec.getAttribute('data-cart-dec'), -1);
        return;
      }

      const cartRem = target.closest('[data-cart-remove]');
      if (cartRem) {
        removeFromCart(cartRem.getAttribute('data-cart-remove'));
        return;
      }

      if (target.closest('#cart-clear-btn')) {
        clearCart();
        return;
      }

      if (target.closest('#demo-receipt-done')) {
        state.demoOrderReceipt = null;
        return;
      }

      const faqBtn = target.closest('[data-faq-toggle]');
      if (faqBtn) {
        const panelId = faqBtn.getAttribute('data-faq-toggle');
        const panel = panelId ? document.getElementById(panelId) : null;
        if (panel) {
          const expanded = faqBtn.getAttribute('aria-expanded') === 'true';
          faqBtn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
          panel.hidden = expanded;
        }
      }
    });

    // Input & change delegation for Menu and Category filtering
    document.addEventListener('input', (e) => {
      const target = e.target;
      if (!(target instanceof HTMLInputElement)) return;
      if (target.id === 'menu-search-input') {
        state.menuFilters.search = target.value;
        renderMenuView();
        return;
      }
      if (target.id === 'menu-price-range') {
        state.menuFilters.maxPrice = Number(target.value) || 95000;
        renderMenuView();
        return;
      }
      const catKey = target.getAttribute('data-cat-search');
      if (catKey && state.categoryFilters[catKey]) {
        state.categoryFilters[catKey].search = target.value;
        renderCategoryView(catKey);
        const restored = document.getElementById(`cat-search-${catKey}`);
        if (restored) {
          restored.focus();
          const len = restored.value.length;
          restored.setSelectionRange(len, len);
        }
      }
    });

    document.addEventListener('change', (e) => {
      const target = e.target;
      if (!(target instanceof HTMLSelectElement)) return;
      if (target.id === 'menu-sort-select') {
        state.menuFilters.sort = target.value;
        renderMenuView();
        return;
      }
      const catKey = target.getAttribute('data-cat-sort');
      if (catKey && state.categoryFilters[catKey]) {
        state.categoryFilters[catKey].sort = target.value;
        renderCategoryView(catKey);
      }
    });

    // Form submit delegation
    document.addEventListener('submit', (e) => {
      const form = e.target;
      if (!(form instanceof HTMLFormElement)) return;
      if (form.id === 'demo-checkout-form') {
        e.preventDefault();
        handleDemoCheckoutSubmit(form);
      } else if (form.id === 'demo-contact-form') {
        e.preventDefault();
        handleDemoContactSubmit(form);
      }
    });
  }

  /* ========================================================================
     11. INITIALIZATION
     ======================================================================== */
  function init() {
    applyThemeConfig();
    updateCartBadge(false);
    bindGlobalEvents();
    initPointerEffects();
    initHeroTilt();
    if (!window.location.hash) {
      window.history.replaceState(null, '', '#/home');
    }
    navigateToCurrentHash(false);
    dismissPreloader();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
