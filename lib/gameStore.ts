import { BoardGame, UserComment } from '@/types/boardgame';

export const INITIAL_GAMES: BoardGame[] = [
  {
    id: 'mensch-game',
    title: { fa: 'بازی منچ (Mensch)', en: 'Mensch (Ludo Classic)' },
    subtitle: { fa: 'بازی فکری نوستالژیک استراتژی، مدیریت هیجان و احتمالات', en: 'Classic Tabletop Mind Game of Emotion Control & Probabilities' },
    shortDescription: {
      fa: 'محبوب‌ترین و اصیل‌ترین بازی فکری رومیزی در ایران. بازی هیجان‌انگیز تاس و مهره برای ۲ تا ۴ بازیکن.',
      en: 'The most iconic nostalgic tabletop board game in Iran. A classic game of dice, pawns, patience and strategy for 2-4 players.'
    },
    fullDescription: {
      fa: 'منچ یکی از کهن‌ترین و محبوب‌ترین بازی‌های فکری رومیزی جهان است که در ایران جایگاه ویژه‌ای در دورهمی‌ها دارد. هر بازیکن دارای ۴ مهره همرنگ است و باید با تاس ریختن (آوردن عدد ۶ برای ورود به زمین) و طی کردن مسیر مشخص، مهره‌های خود را به خانه امن نهایی برساند. این بازی درس‌های ارزشمندی در زمینه مدیریت ریسک، صبر، تصمیم‌گیری تاکتیکی و مدیریت هیجان دارد.',
      en: 'Mensch is one of the most famous classic board games in the world and Iran. Each player has 4 pawns and must roll a 6 to enter the board, racing pawns to safety while knocking back opponents.'
    },
    rulesOverview: {
      fa: 'برای خارج کردن مهره نیاز به تاس ۶ دارید. اگر روی مهره حریف بروید، آن مهره به نقطه شروع بازمی‌گردد! برنده کسی است که هر ۴ مهره را زودتر به خانه امن برساند.',
      en: 'Roll a 6 to bring pawns into play. Landing on an opponent pawn sends it back to start. First to bring all 4 pawns home wins.'
    },
    coverImage: '/games/mensch-game.jpg',
    images: [
      '/games/mensch-game.jpg'
    ],
    designers: [
      {
        name: { fa: 'یوزف فریدریش اشمیت', en: 'Josef Friedrich Schmidt' },
        country: { fa: 'آلمان (محبوب‌ترین بازی ایران)', en: 'Germany / Popular in Iran' }
      }
    ],
    publisher: { fa: 'بازی‌های فکری کلاسیک ایرانی', en: 'Classic Board Game Publishers' },
    releaseYear: 1914,
    origin: 'iranian',
    minPlayers: 2,
    maxPlayers: 4,
    bestPlayerCount: 4,
    playingTimeMinutes: 30,
    minAge: 6,
    complexity: 1.1,
    rating: 9.5,
    categories: [
      { fa: 'بازی فکری کلاسیک', en: 'Classic Mind Game' },
      { fa: 'تاس و مهره', en: 'Dice & Pawns' },
      { fa: 'دورهمی نوستالژیک', en: 'Family Classic' }
    ],
    skills: [
      {
        key: 'decision_making',
        title: { fa: 'مدیریت ریسک و تصمیم‌گیری تحت فشار', en: 'Risk & Emotion Management' },
        score: 9.0,
        description: { fa: 'کنترل هیجانات هنگام روبه‌رو شدن با موقعیت‌های غیرمنتظره و مواجهه با برد و باخت.', en: 'Emotional control during unexpected roll reversals and managing win/loss balance.' }
      },
      {
        key: 'strategic_thinking',
        title: { fa: 'تفکر احتمالات و تاکتیک حرکت مهره‌ها', en: 'Probability & Pawn Movement Strategy' },
        score: 8.5,
        description: { fa: 'محاسبه شانسی و اولویت‌بندی حرکت مهره‌های مختلف برای حفظ امنیت.', en: 'Calculating odds and prioritizing moves to keep pawns safe.' }
      }
    ],
    availableInIran: true,
    bggUrl: 'https://boardgamegeek.com/boardgame/2378/mensch-argere-dich-nicht'
  },
  {
    id: 'stojoit-game',
    title: { fa: 'استوژیت (Stojoit)', en: 'Stojoit (Dixit Persian Edition)' },
    subtitle: { fa: 'بازی فکری، خلاقیت، تصویرسازی و هوش هیجانی', en: 'A Mind Game of Creativity, Storytelling & Visual Intuition' },
    shortDescription: {
      fa: 'محبوب‌ترین بازی فکری تصویرسازی ایرانی برای ۲ تا ۸ بازیکن. یک بازی فکری شگفت‌انگیز برای تقویت خلاقیت و ذهن‌خوانی.',
      en: 'The most popular Iranian visual storytelling mind game for 2-8 players. Enhances creativity and emotional intelligence.'
    },
    fullDescription: {
      fa: 'در بازی فکری استوژیت، بازیکنان در نقش قصه‌گو و خیال‌پرداز قرار می‌گیرند. راوی یکی از کارت‌های تصویرسازی‌شده و رویایی دست خود را انتخاب کرده و یک کلمه، شعر، مثل یا عبارت مبهم برای آن می‌گوید. سایر بازیکنان باید از بین کارت‌های خود تصویری نزدیک به توصیف راوی انتخاب کنند. سپس کارت‌ها رو شده و همگی حدس می‌زنند کارت اصلی راوی کدام بوده است!',
      en: 'In Stojoit, players use surreal visual cards. The storyteller picks a card and gives a subtle clue (word, phrase, poem). Players choose a card from their own hand matching the clue, then everyone votes on the storyteller’s original card.'
    },
    rulesOverview: {
      fa: 'هر نوبت یک راوی دارد. توصیف راوی نباید خیلی واضح یا خیلی گنگ باشد، زیرا اگر همه یا هیچ‌کس درست حدس نزنند، راوی امتیازی نمی‌گیرد!',
      en: 'The storyteller gives a clue. Clues must be balanced—if everyone or no one guesses correctly, the storyteller gets 0 points.'
    },
    coverImage: '/games/stojoit-game.jpg',
    images: [
      '/games/stojoit-game.jpg'
    ],
    designers: [
      {
        name: { fa: 'جان لوئیز روویرا (بازطراحی استودیو هوپا)', en: 'Jean-Louis Roubira (Hoopa Games)' },
        country: { fa: 'فرانسه / بازطراحی در ایران', en: 'France / Adapted in Iran' }
      }
    ],
    publisher: { fa: 'نشر بازی‌های فکری هوپا (Hoopa)', en: 'Hoopa Games' },
    releaseYear: 2017,
    origin: 'iranian',
    minPlayers: 2,
    maxPlayers: 8,
    bestPlayerCount: 5,
    playingTimeMinutes: 30,
    minAge: 8,
    complexity: 1.5,
    rating: 9.3,
    categories: [
      { fa: 'بازی فکری', en: 'Mind Game' },
      { fa: 'تصویرسازی و تخیل', en: 'Storytelling' },
      { fa: 'هوش هیجانی', en: 'Emotional Intelligence' },
      { fa: 'دورهمی', en: 'Party Game' }
    ],
    skills: [
      {
        key: 'creativity',
        title: { fa: 'تفکر خلاق و هوش تصویری', en: 'Creative Thinking & Visualization' },
        score: 9.8,
        description: { fa: 'پرورش قدرت تخیل، استعاره‌سازی و برداشت‌های تصویری عمیق.', en: 'Develops imagination, metaphors, and deep visual interpretation.' }
      },
      {
        key: 'negotiation',
        title: { fa: 'همدلی و ذهن‌خوانی مخاطب', en: 'Empathy & Mind Reading' },
        score: 9.2,
        description: { fa: 'تحلیل ذهنیت و نحوه تفکر سایر بازیکنان.', en: 'Analyzing the mindset and thought patterns of other players.' }
      }
    ],
    availableInIran: true,
    bggUrl: 'https://boardgamegeek.com/boardgame/39856/dixit'
  },
  {
    id: 'coup-iranian-ver',
    title: { fa: 'کودتا (Coup)', en: 'Coup (Persian Edition)' },
    subtitle: { fa: 'بازی فکری بلوف، قدرت و استنتاج ذهن', en: 'A Mind Game of Bluffing, Power, and Clever Deception' },
    shortDescription: {
      fa: 'یک بازی فکری کارتی رومیزی بسیار جذاب بر پایه بلوف‌زنی، استنتاج و تفکر استراتژیک برای ۲ تا ۶ بازیکن.',
      en: 'A thrilling mind & card game focused on bluffing, deduction, and hidden roles for 2 to 6 players.'
    },
    fullDescription: {
      fa: 'در بازی فکری کودتا، شما در نقش رهبران نفوذی در یک شهر سلطنتی به مبارزه برای باقی ماندن آخرین بازمانده قدرت می‌پردازید. هر بازیکن بازی را با دو کارت مخفی و دو سکه آغاز می‌کند. می‌توانید از قابلیت‌های واقعی کارت‌های خود استفاده کنید یا ادعای داشتن نقشی را بکنید که اصلاً در دست ندارید! توانایی تشخیص بلوف حریفان و ریسک‌پذیری حساب‌شده کلید پیروزی در این بازی است.',
      en: 'In Coup, players represent influential leaders in a royal city battling to be the last surviving power. Players start with two hidden cards and two coins. You can use your true characters or lie about roles you do not hold! Reading opponents and calculated risk-taking are keys to victory.'
    },
    rulesOverview: {
      fa: 'در هر نوبت می‌توانید یکی از نوبت‌های استاندارد (سکه‌گیری، کودتا) یا قابلیت یکی از شخصیت‌ها (شاهزاده، قاتل، فرمانده، سفیر، کنتس) را ادعا کنید. حریفان می‌توانند شما را چالش بکشند یا دفاع کنند. اگر بلوف بزنید و لو بروید، یکی از کارت‌های خود را از دست می‌دهید.',
      en: 'On your turn, you can take standard actions or claim character abilities (Duke, Assassin, Captain, Ambassador, Contessa). Opponents can challenge your claims or block actions. Losing a challenge costs one of your influence cards.'
    },
    coverImage: '/games/coup-iranian-ver.jpg',
    images: [
      '/games/coup-iranian-ver.jpg'
    ],
    designers: [
      {
        name: { fa: 'ریکه تایبائولت', en: 'Rikki Tahta' },
        country: { fa: 'بریتانیا (بازطراحی در ایران)', en: 'UK (Adapted in Iran)' }
      }
    ],
    publisher: { fa: 'نشر رومیز / دورهمی', en: 'Roomiz Games / Doorehami' },
    releaseYear: 2018,
    origin: 'iranian',
    minPlayers: 2,
    maxPlayers: 6,
    bestPlayerCount: 4,
    playingTimeMinutes: 15,
    minAge: 10,
    complexity: 2.1,
    rating: 8.8,
    categories: [
      { fa: 'بازی فکری کارتی', en: 'Mind Card Game' },
      { fa: 'بلوف‌زنی و استنتاج', en: 'Bluffing & Deduction' },
      { fa: 'نقش مخفی', en: 'Hidden Roles' }
    ],
    skills: [
      {
        key: 'decision_making',
        title: { fa: 'تصمیم‌گیری سریع و بحرانی', en: 'Critical Decision Making' },
        score: 9,
        description: { fa: 'تقویت توانایی ارزیابی خطر و انتخاب بهترین گزینه تحت فشار.', en: 'Enhances risk assessment and choosing the best option under pressure.' }
      },
      {
        key: 'negotiation',
        title: { fa: 'زبان بدن و روان‌شناسی رفتاری', en: 'Body Language & Psychology' },
        score: 9.5,
        description: { fa: 'افزایش هوش هیجانی و تحلیل رفتار و لحن صحبت مخاطب.', en: 'Improves emotional intelligence and reading behavioral cues.' }
      },
      {
        key: 'strategic_thinking',
        title: { fa: 'تفکر تاکتیکی', en: 'Tactical Thinking' },
        score: 8,
        description: { fa: 'برنامه‌ریزی متغیر بر اساس رفتار حریفان در لحظه.', en: 'Dynamic planning based on real-time opponent moves.' }
      }
    ],
    availableInIran: true,
    bggUrl: 'https://boardgamegeek.com/boardgame/131357/coup'
  },
  {
    id: 'zar-game',
    title: { fa: 'بازی فکری زار (Zar)', en: 'Zar: The Haunted Ritual' },
    subtitle: { fa: 'بازی فکری استراتژیک بر اساس افسانه‌های فولکلور ایرانی', en: 'A Strategic Horror Mind Game Based on Iranian Folklore' },
    shortDescription: {
      fa: 'یک بازی فکری تماتیک، همکاری‌محور و معمامحور ایرانی که بر اساس مراسم‌ها و افسانه‌های جنوبی ایران طراحی شده است.',
      en: 'A rich thematic, cooperative Iranian horror board game rooted in southern Iranian folklore and mystic rituals.'
    },
    fullDescription: {
      fa: 'در بازی فکری زار، بازیکنان در نقش جادوگران و اسطرلاب‌دانانی قرار می‌گیرند که وارد یک خانه جن‌زده و نفرین‌شده می‌شوند. هدف گروه پاکسازی خانه از وجود ارواح و طلسم‌های زار قبل از طغیان کامل نیروهای تاریکی است. طراحی تماتیک فوق‌العاده و گرافیک فارسی باکلاس، این بازی را به یکی از شاخص‌ترین محصولات ایرانی تبدیل کرده است.',
      en: 'In Zar, players step into the shoes of mystics and astrologers entering a haunted house. The team must cleanse the house of malevolent spirits before dark forces consume them all. Exceptional thematic design and Persian artwork make it an Iranian board game icon.'
    },
    rulesOverview: {
      fa: 'هر بازیکن در نوبت خود اکشن‌های اکتشاف اتاق‌ها، خواندن طلسم، بستن درها و پاکسازی روح را انجام می‌دهد. کاشی‌های خانه به شکل تصادفی چیده شده و هر بازی تجربه‌ای کاملاً جدید ایجاد می‌کند.',
      en: 'Players explore room tiles, cast cleansing spells, lock doors, and exorcise spirits. Randomly generated layout ensures high replayability.'
    },
    coverImage: '/games/zar-game.jpg',
    images: [
      '/games/zar-game.jpg'
    ],
    designers: [
      {
        name: { fa: 'مهدیار شریف', en: 'Mahdyar Sharif' },
        country: { fa: 'ایران', en: 'Iran' }
      }
    ],
    publisher: { fa: 'استودیو بازی‌سازی زار', en: 'Zar Games Studio' },
    releaseYear: 2020,
    origin: 'iranian',
    minPlayers: 1,
    maxPlayers: 5,
    bestPlayerCount: 3,
    playingTimeMinutes: 60,
    minAge: 14,
    complexity: 3.2,
    rating: 9.1,
    categories: [
      { fa: 'بازی فکری استراتژیک', en: 'Strategic Mind Game' },
      { fa: 'همکاری (Co-op)', en: 'Cooperative' },
      { fa: 'تماتیک و معمامحور', en: 'Thematic Puzzle' }
    ],
    skills: [
      {
        key: 'collaboration',
        title: { fa: 'همکاری و حل مسئله گروهی', en: 'Team Collaboration' },
        score: 9.5,
        description: { fa: 'تقویت روحیه کار گروهی و اشتراک‌گذاری منابع برای هدف مشترک.', en: 'Fosters teamwork and joint resource sharing toward a shared objective.' }
      },
      {
        key: 'problem_solving',
        title: { fa: 'مدیریت بحران و ریسک', en: 'Crisis Management' },
        score: 9,
        description: { fa: 'تحلیل حوادث غیرمنتظره و اتخاذ تصمیمات بهینه.', en: 'Analyzing unexpected events and executing fallback plans.' }
      }
    ],
    availableInIran: true
  },
  {
    id: 'shah-thief-minister',
    title: { fa: 'شاه، دزد، وزیر', en: 'Shah, Thief, Minister' },
    subtitle: { fa: 'بازی فکری سنتی و دورهمی ایرانی', en: 'Traditional Iranian Mind & Deduction Game' },
    shortDescription: {
      fa: 'بازی فکری کلاسیک ایرانی برای ۳ تا ۶ بازیکن. بازی هوش، حدس زدن چهره، استنتاج و نقش‌های مخفی.',
      en: 'Classic Iranian mind game for 3-6 players focusing on deduction, face reading, and role guessing.'
    },
    fullDescription: {
      fa: 'یکی از قدیمی‌ترین و محبوب‌ترین بازی‌های فکری ایرانی که به شکل کارت‌های بازطراحی‌شده فیزیکی عرضه شده است. بازیکنان نقش‌های شاه، وزیر، جلاد و دزد را به صورت مخفیانه قرعه‌کشی می‌کنند. وزیر باید با تحلیل رفتاری و نگاه کردن به چهره بازیکنان، دزد واقعی را شناسایی کند.',
      en: 'A legendary Iranian parlor mind game adapted into physical cards. Players draw hidden cards (King, Minister, Executioner, Thief). The Minister must deduce the Thief by reading expressions.'
    },
    rulesOverview: {
      fa: 'وزیر با فرمان شاه به چهره‌ها نگاه کرده و دزد را حدس می‌زند. اگر اشتباه بگوبد مجازات می‌شود و اگر درست بگوید دزد جریمه می‌گردد.',
      en: 'The King orders the Minister to find the Thief. Incorrect guesses penalize the Minister; correct guesses penalize the Thief.'
    },
    coverImage: '/games/shah-thief-minister.jpg',
    images: [
      '/games/shah-thief-minister.jpg'
    ],
    designers: [
      {
        name: { fa: 'طراحی سنتی ایرانی', en: 'Traditional Iranian Design' },
        country: { fa: 'ایران', en: 'Iran' }
      }
    ],
    publisher: { fa: 'نشر بازی‌های فکری ایرانی', en: 'Iranian Board Game Publishers' },
    releaseYear: 2016,
    origin: 'iranian',
    minPlayers: 3,
    maxPlayers: 6,
    bestPlayerCount: 4,
    playingTimeMinutes: 20,
    minAge: 8,
    complexity: 1.2,
    rating: 8.5,
    categories: [
      { fa: 'بازی فکری سنتّی', en: 'Traditional Mind Game' },
      { fa: 'استنتاج چهره', en: 'Deduction' }
    ],
    skills: [
      {
        key: 'negotiation',
        title: { fa: 'تحلیل رفتار و روان‌شناسی چهره', en: 'Face Reading & Psychology' },
        score: 9.4,
        description: { fa: 'افزایش دقت در نشانه‌های غیرکلامی و زبان بدن.', en: 'Enhances attention to non-verbal cues and facial expressions.' }
      }
    ],
    availableInIran: true
  },
  {
    id: 'catan-settlers',
    title: { fa: 'کاتان (Catan)', en: 'Catan: Settlers of Catan' },
    subtitle: { fa: 'بازی فکری ساخت‌وساز، تجارت و توسعه قلمرو', en: 'The Ultimate Mind Game of Trading & Strategy' },
    shortDescription: {
      fa: 'پادشاه بازی‌های فکری و رومیزی نوین؛ بازی استراتژیک تجارت، ساخت جاده، شهر و مدیریت منابع برای ۳ تا ۴ بازیکن.',
      en: 'The crown jewel of modern board gaming; trade, build roads and settlements, and collect resources.'
    },
    fullDescription: {
      fa: 'در بازی فکری کاتان شما هدایت گروهی از کاشفان را به عهده دارید که وارد جزیره‌ای ناشناخته و غنی از منابع می‌شوند. با تاس ریختن، منابع (چوب، گندم، سنگ، آجر، پشم) تولید می‌شود و بازیکنان باید با چانه‌زنی و مبادله منابع با یکدیگر، ساخت‌وساز خود را گسترش دهند تا به ۱۰ امتیاز پیروزی برسند.',
      en: 'In Catan, players guide discoverers exploring an uncharted island. Dice rolls produce resources (Lumber, Brick, Wool, Grain, Ore). Negotiating trades with opponents and expanding your infrastructure leads to reaching 10 victory points.'
    },
    rulesOverview: {
      fa: 'تاس بریزید، منابع بگیرید، تجارت کنید، جاده و خانه بسازید و از دزد محافظت کنید.',
      en: 'Roll dice, collect tiles, trade with players or bank, build roads & settlements, manage the robber.'
    },
    coverImage: '/games/catan-settlers.jpg',
    images: [
      '/games/catan-settlers.jpg'
    ],
    designers: [
      {
        name: { fa: 'کلاوس توبر', en: 'Klaus Teuber' },
        country: { fa: 'آلمان', en: 'Germany' }
      }
    ],
    publisher: { fa: 'کاسموس / بازتولید در ایران', en: 'Kosmos / Iranian Editions' },
    releaseYear: 1995,
    origin: 'international',
    minPlayers: 3,
    maxPlayers: 4,
    bestPlayerCount: 4,
    playingTimeMinutes: 75,
    minAge: 10,
    complexity: 2.3,
    rating: 9.0,
    categories: [
      { fa: 'بازی فکری استراتژیک', en: 'Strategy Mind Game' },
      { fa: 'مدیریت منابع', en: 'Resource Management' },
      { fa: 'تجارت و مبادله', en: 'Trading' }
    ],
    skills: [
      {
        key: 'resource_management',
        title: { fa: 'برنامه‌ریزی و مدیریت منابع', en: 'Resource Allocation' },
        score: 9.5,
        description: { fa: 'یادگیری بهینه‌سازی مصرف دارایی‌ها و سرمایه‌گذاری بلندمدت.', en: 'Teaches optimizing asset usage and long-term infrastructure investment.' }
      },
      {
        key: 'negotiation',
        title: { fa: 'اصول مذاکره و چانه‌زنی موفق', en: 'Effective Negotiation' },
        score: 9,
        description: { fa: 'ایجاد معاملاتی که سود طرفین در آن لحاظ شده باشد.', en: 'Crafting win-win agreements through persuasive trading.' }
      }
    ],
    availableInIran: true,
    bggUrl: 'https://boardgamegeek.com/boardgame/13/catan'
  },
  {
    id: 'splendor-game',
    title: { fa: 'اسپلندور / کهربا (Splendor)', en: 'Splendor' },
    subtitle: { fa: 'بازی فکری تفکر ریاضی و موتورسازی اقتصادی', en: 'Renaissance Gem Merchant Engine Building Mind Game' },
    shortDescription: {
      fa: 'بازی فکری محبوب موتورسازی اقتصادی؛ جمع‌آوری توکن‌های گوهر، خرید معادن و تفکر الگوریتمی.',
      en: 'A fast-paced engine-building game of acquiring gem mines, transport, and shops to win noble prestige.'
    },
    fullDescription: {
      fa: 'بازیکنان بازرگانان ثروتمند رنسانس هستند که جواهرفروشی‌های بزرگ ایجاد می‌کنند. با سکه‌های گوهر (یاقوت، الماس، زمرد، فیروزه، عقیق) کارت‌های معدن خریده و با تخفیف‌های به‌دست آمده کارت‌های ارزشمندتر را تصاحب کنید تا نظر اشراف‌زادگان را جلب نمایید.',
      en: 'Players are Renaissance merchants buying gem mines, transportation, and artisans. Spend gem tokens to buy development cards that permanently lower future costs and net victory points.'
    },
    rulesOverview: {
      fa: 'در هر نوبت یا ۳ توکن گوهر مختلف بردارید، یا ۲ توکن هم‌رنگ، یا یک کارت رزرو کنید، یا یک کارت بخرید.',
      en: 'Take 3 different gems, take 2 same gems, reserve a card with gold, or purchase a development card.'
    },
    coverImage: '/games/splendor-game.jpg',
    images: [
      '/games/splendor-game.jpg'
    ],
    designers: [
      {
        name: { fa: 'مارک آندره', en: 'Marc André' },
        country: { fa: 'فرانسه', en: 'France' }
      }
    ],
    publisher: { fa: 'Space Cowboys', en: 'Space Cowboys' },
    releaseYear: 2014,
    origin: 'international',
    minPlayers: 2,
    maxPlayers: 4,
    bestPlayerCount: 3,
    playingTimeMinutes: 30,
    minAge: 10,
    complexity: 1.8,
    rating: 8.7,
    categories: [
      { fa: 'بازی فکری ریاضی', en: 'Mathematical Mind Game' },
      { fa: 'موتورسازی اقتصادی', en: 'Engine Building' }
    ],
    skills: [
      {
        key: 'strategic_thinking',
        title: { fa: 'تفکر الگوریتمی و موتور‌سازی', en: 'Engine Optimization' },
        score: 9.0,
        description: { fa: 'یادگیری ایجاد بازده متصاعدی از سرمایه‌گذاری‌های کوچک ابتدایی.', en: 'Teaches creating compound returns from small initial assets.' }
      }
    ],
    availableInIran: true,
    bggUrl: 'https://boardgamegeek.com/boardgame/148228/splendor'
  },
  {
    id: 'backgammon-game',
    title: { fa: 'تخته نرد (Backgammon)', en: 'Backgammon (Persian Heritage)' },
    subtitle: { fa: 'کهن‌ترین بازی فکری ایرانی؛ ترکیب ریاضی، احتمالات و استراتژی', en: 'Ancient Persian Tabletop Mind Game of Probabilities & Strategy' },
    shortDescription: {
      fa: 'شناخته‌شده‌ترین بازی فکری رومیزی در تاریخ ایران با قدمت بیش از ۵۰۰۰ سال. بازی دو نفره تاس، محاسبات و تاکتیک سدسازی.',
      en: 'The most iconic ancient Persian mind game with over 5,000 years of history. A 2-player strategic battle of dice and positioning.'
    },
    fullDescription: {
      fa: 'تخته نرد اصیل‌ترین بازی فکری رومیزی ایرانی است که طبق روایات تاریخی توسط بزرگمهر وزیر انوشیروان ساسانی در پاسخ به شطرنج هندیان ابداع شد. هر بازیکن ۱۵ مهره دارد که باید با تاس ریختن دقیق و محاسبات ریاضی، مهره‌ها را در خانه خود جمع کرده و سریع‌تر خارج کند. مدیریت ریسک، تاکتیک بستن خانه‌ها و کنترل هیجان در هنگام تاس‌های بد، از برجسته‌ترین ویژگی‌های این بازی است.',
      en: 'Backgammon is the oldest Persian tabletop board game created in the Sassanid era. Each player moves 15 checkers according to dice rolls. Winning requires probability calculation, defensive positioning, and risk management.'
    },
    rulesOverview: {
      fa: 'مهره‌ها را به سمت خانه خود حرکت دهید. اگر مهره تک حریف در خانه‌ای باشد می‌توانید آن را زده و به بیرون بفرستید. بازیکنی که زودتر تمام ۱۵ مهره را خارج کند برنده است.',
      en: 'Move checkers to home board according to dice values. Hit single opponent checkers to send them to the bar. First to bear off all 15 checkers wins.'
    },
    coverImage: '/games/backgammon-game.jpg',
    images: [
      '/games/backgammon-game.jpg'
    ],
    designers: [
      {
        name: { fa: 'بزرگمهر (وزیر انوشیروان ساسانی)', en: 'Bozorgmehr (Sassanid Era)' },
        country: { fa: 'ایران باستان', en: 'Ancient Persia' }
      }
    ],
    publisher: { fa: 'میراث فکری سنتی ایران', en: 'Persian Traditional Mind Games' },
    releaseYear: -3000,
    origin: 'iranian',
    minPlayers: 2,
    maxPlayers: 2,
    bestPlayerCount: 2,
    playingTimeMinutes: 30,
    minAge: 8,
    complexity: 2.2,
    rating: 9.7,
    categories: [
      { fa: 'بازی فکری اصیل ایرانی', en: 'Ancient Persian Mind Game' },
      { fa: 'تاس و محاسبات ریاضی', en: 'Math & Probabilities' }
    ],
    skills: [
      {
        key: 'decision_making',
        title: { fa: 'محاسبه احتمالات و ریاضیات ذهنی', en: 'Probability & Mental Math' },
        score: 9.7,
        description: { fa: 'محاسبه دقیق شانس آمدن تاس‌های ترکیبی و ارزیابی ریسک حرکت مهره‌ها.', en: 'Calculating precise dice odds and analyzing risk of single checker exposures.' }
      },
      {
        key: 'strategic_thinking',
        title: { fa: 'تفکر استراتژیک سدسازی و دفاع', en: 'Blocking & Defensive Strategy' },
        score: 9.3,
        description: { fa: 'ایجاد زنجیره‌های بسته برای محبوس کردن مهره حریف.', en: 'Building point-chains to trap opponent checkers and maintain tactical dominance.' }
      }
    ],
    availableInIran: true
  },
  {
    id: 'chess-game',
    title: { fa: 'شطرنج (Chess)', en: 'Chess' },
    subtitle: { fa: 'پادشاه بازی‌های فکری و تفکر عمیق استراتژیک', en: 'The Ultimate Mind Game of Deep Strategy & foresight' },
    shortDescription: {
      fa: 'عمیق‌ترین بازی فکری تاریخ بشر. بازی دو نفره کامل بدون عنصر شانس بر پایه پیش‌بینی حرکات حریف و تفکر الگوریتمی.',
      en: 'The world standard of intellectual board gaming. A 100% deterministic strategy game of predicting moves and tactics.'
    },
    fullDescription: {
      fa: 'شطرنج برجسته‌ترین نماد هوش، برنامه‌ریزی و تفکر استراتژیک در تمام دوران‌هاست. دو بازیکن با ۱۶ مهره متقارن (شاه، وزیر، رخ، فیل، اسب، پیاده) در یک صفحه ۶۴ خانه‌ای به نبرد ذهنی می‌پردازند. هدف کیش و مات کردن شاه حریف است. این بازی حافظه، تمرکز، حل مسئله و تفکر چندمرحله‌ای را به اوج می‌رساند.',
      en: 'Chess is the ultimate test of strategy. 2 players control 16 pieces to checkmate the opponent King. It develops spatial awareness, deep calculation, patience, and tactical memory.'
    },
    rulesOverview: {
      fa: 'هر مهره الگوی حرکت خاص خود را دارد. نوبت‌ها متناوب است. اگر شاه حریف زیر حمله باشد و راه فراری نداشته باشد کیش و مات رخ داده است.',
      en: 'Pieces move in specific patterns. Alternating turns. Game ends when a King is threatened and cannot escape (Checkmate).'
    },
    coverImage: '/games/chess-game.jpg',
    images: [
      '/games/chess-game.jpg'
    ],
    designers: [
      {
        name: { fa: 'طراحی کهن تاریخی', en: 'Ancient Historical Design' },
        country: { fa: 'ایران و هند باستان', en: 'Ancient Persia & India' }
      }
    ],
    publisher: { fa: 'فدراسیون بین‌المللی شطرنج (FIDE)', en: 'FIDE' },
    releaseYear: 600,
    origin: 'iranian',
    minPlayers: 2,
    maxPlayers: 2,
    bestPlayerCount: 2,
    playingTimeMinutes: 45,
    minAge: 6,
    complexity: 3.8,
    rating: 9.8,
    categories: [
      { fa: 'بازی فکری استراتژیک', en: 'Pure Strategy Mind Game' },
      { fa: 'استراتژی محض', en: 'Deterministic Game' }
    ],
    skills: [
      {
        key: 'strategic_thinking',
        title: { fa: 'تفکر استراتژیک عمیق و پیش‌بینی چند مرحله‌ای', en: 'Deep Foresight & Multi-step Calculation' },
        score: 9.9,
        description: { fa: 'پیش‌بینی ۵ تا ۱۰ حرکت بعدی حریف و ساخت برنامه‌های بلندمدت.', en: 'Predicting 5-10 moves ahead and building long-term positional structures.' }
      },
      {
        key: 'problem_solving',
        title: { fa: 'حل مسائل پیچیده و تحلیل تاکتیکی', en: 'Tactical Problem Solving' },
        score: 9.8,
        description: { fa: 'شناسایی نقاط ضعف حریف و استفاده از تاکتیک‌های چنگال، سیخ و قربانی.', en: 'Identifying positional weaknesses and applying forks, pins, and sacrifices.' }
      }
    ],
    availableInIran: true,
    bggUrl: 'https://boardgamegeek.com/boardgame/171/chess'
  },
  {
    id: 'haunted-forest',
    title: { fa: 'جنگل مخوف (Haunted Forest)', en: 'Haunted Forest' },
    subtitle: { fa: 'بازی فکری کارتی هیجان‌انگیز و طلسم‌های اسرارآمیز', en: 'Exciting Iranian Card Mind Game of Spells & Combing' },
    shortDescription: {
      fa: 'یکی از پرفروش‌ترین بازی‌های فکری کارتی در ایران برای ۲ تا ۶ بازیکن. مدیریت ریسک، ساخت ترکیب کارت‌ها و طلسم‌زنی.',
      en: 'One of Iran’s bestselling card mind games. Combine magical creatures, cast spells, and outsmart rivals.'
    },
    fullDescription: {
      fa: 'در بازی فکری جنگل مخوف، بازیکنان وارد یک جنگل جادویی می‌شوند و با جمع‌آوری خفاش‌ها، جن‌ها، طلسم‌ها و کیمیاگران به ساخت ترکیب‌های امتیازی می‌پردازند. این بازی فکری سرعت تصمیم‌گیری، حافظه و ریسک‌پذیری را به چالش می‌کشد.',
      en: 'In Haunted Forest, players venture into a enchanted forest collecting magical creatures and artifacts. Fast decisions and card combo optimization drive victory.'
    },
    rulesOverview: {
      fa: 'در هر نوبت کارت بکشید، کمبوهای ۳ تایی یا ۵ تایی بسازید، یا با کارت‌های طلسم به مجموعه حریفان حمله کنید.',
      en: 'Draw cards, complete set combinations of 3 or 5 matched symbols, or cast spell cards to disrupt opponents.'
    },
    coverImage: '/games/haunted-forest.jpg',
    images: [
      '/games/haunted-forest.jpg'
    ],
    designers: [
      {
        name: { fa: 'ارسلان صبوری', en: 'Arsalan Sabouri' },
        country: { fa: 'ایران', en: 'Iran' }
      }
    ],
    publisher: { fa: 'استودیو بازی فکری مستر ذهن', en: 'Mr. Mind Studio' },
    releaseYear: 2019,
    origin: 'iranian',
    minPlayers: 2,
    maxPlayers: 6,
    bestPlayerCount: 4,
    playingTimeMinutes: 25,
    minAge: 10,
    complexity: 1.6,
    rating: 8.9,
    categories: [
      { fa: 'بازی فکری کارتی', en: 'Mind Card Game' },
      { fa: 'مدیریت کارت', en: 'Hand Management' }
    ],
    skills: [
      {
        key: 'decision_making',
        title: { fa: 'مدیریت ریسک و نقدینگی دست', en: 'Hand Management & Risk' },
        score: 8.8,
        description: { fa: 'نگه‌داشتن کارت‌های کلیدی و زمان‌بندی رو کردن مجموعه‌ها.', en: 'Holding high-value combo cards and timing when to reveal sets.' }
      }
    ],
    availableInIran: true
  },
  {
    id: 'codenames-game',
    title: { fa: 'کدنامز / شفرات (Codenames)', en: 'Codenames (Persian Edition)' },
    subtitle: { fa: 'بازی فکری تداعی کلمات، ذهن‌خوانی و هوش کلامی', en: 'Top Rated Association & Word Mind Game' },
    shortDescription: {
      fa: 'رتبه ۱ بازی‌های فکری دورهمی و کلامی در جهان. دو تیم جاسوسی با کدریفر و تداعی رمزهای کلامی برای ۴ تا ۸ بازیکن.',
      en: 'The #1 word association mind game globally. Two spy chiefs give one-word clues to guide agents to secret cards.'
    },
    fullDescription: {
      fa: 'در بازی فکری کدنامز، بازیکنان به دو تیم قرمز و آبی تقسیم می‌شوند. سرتیم‌های هر گروه با گفتن یک کلمه کلیدی و یک عدد، تلاش می‌کنند اعضای تیم خود را به سمت کارت‌های کلمات هم‌گروه هدایت کنند بدون اینکه کارت‌های حریف یا کارت قاتل سیاه لمس شود! این بازی هوش کلامی، خلاقیت ذهنی و ارتباط مفهومی را فوق‌العاده تقویت می‌کند.',
      en: 'Two rival spymasters know the secret identities of 25 agents. Teammates see only card words. Spymasters give one-word clues pointing to multiple words while avoiding the assassin.'
    },
    rulesOverview: {
      fa: 'سرتیم یک رمز (مثلاً «دریا: ۲») می‌گوید. تیم باید کلمات مربوط به رمز را حدس بزند. اشتباه حدس زدن نوبت را تمام می‌کند.',
      en: 'Spymaster gives a single-word clue + number. Team guesses cards. Hitting enemy color ends turn; hitting assassin loses instantly.'
    },
    coverImage: '/games/codenames-game.jpg',
    images: [
      '/games/codenames-game.jpg'
    ],
    designers: [
      {
        name: { fa: 'والتار چواتیل', en: 'Vlaada Chvátil' },
        country: { fa: 'جمهوری چک / بازطراحی هوپا در ایران', en: 'Czech / Adapted by Hoopa' }
      }
    ],
    publisher: { fa: 'Czech Games Edition / نشر هوپا', en: 'CGE / Hoopa Games' },
    releaseYear: 2015,
    origin: 'iranian',
    minPlayers: 4,
    maxPlayers: 8,
    bestPlayerCount: 6,
    playingTimeMinutes: 20,
    minAge: 12,
    complexity: 1.3,
    rating: 9.4,
    categories: [
      { fa: 'بازی فکری کلامی', en: 'Word Association Mind Game' },
      { fa: 'تیم‌سازی و هوش مفهومی', en: 'Conceptual Intelligence' }
    ],
    skills: [
      {
        key: 'creativity',
        title: { fa: 'هوش کلامی و تداعی مفاهیم', en: 'Verbal Intelligence & Conceptual Linkage' },
        score: 9.7,
        description: { fa: 'یافتن وجه تشابهات عمیق و غیرمستقیم بین واژه‌های بی‌ارتباط.', en: 'Finding deep abstract connections between unrelated words.' }
      },
      {
        key: 'collaboration',
        title: { fa: 'همدلی و ذهن‌خوانی اعضای تیم', en: 'Team Mind Reading' },
        score: 9.4,
        description: { fa: 'درک نحوه فکر کردن و اطلاعات عمومی هم‌تیمی‌ها.', en: 'Understanding the knowledge base and mental patterns of teammates.' }
      }
    ],
    availableInIran: true,
    bggUrl: 'https://boardgamegeek.com/boardgame/178900/codenames'
  },
  {
    id: 'jaliz-game',
    title: { fa: 'جالیز (Jaliz)', en: 'Jaliz (Bohnanza Persian Adaptation)' },
    subtitle: { fa: 'بازی فکری اقتصادی، کشاورزی، تجارت و چانه‌زنی', en: 'Iranian Economic Mind Game of Trading & Farming' },
    shortDescription: {
      fa: 'پرفروش‌ترین بازی فکری اقتصادی ایرانی برای ۳ تا ۷ بازیکن. کاشت محصولات، چانه‌زنی، مدیریت زمین و خریدهای استراتژیک.',
      en: 'Iran’s favorite economic mind game of planting crops, trading with rivals, and upgrading fields.'
    },
    fullDescription: {
      fa: 'در بازی فکری جالیز شما کشاورزانی هستید که تلاش می‌کنید بهترین محصولات (سیب‌زمینی، شلغم، هویج، گوجه، خیار و...) را در زمین‌های خود بکرید و در بهترین زمان بفروشید. چون فضای زمین محدود است، مجبورید کارت‌های اضافه خود را با سایر بازیکنان معامله کنید! قدرت چانه‌زنی، مدیریت منابع و تجارت کلید موفقیت در جالیز است.',
      en: 'Players manage bean fields, plant crops in strict sequence, and trade cards with rivals to maximize harvest gold coins.'
    },
    rulesOverview: {
      fa: 'محصول بکرید، از بازار کارت رو کنید و حتماً با دیگران معامله کنید. محصول کامل‌شده را بفروشید و سکه بگیرید.',
      en: 'Plant mandatory cards, reveal market cards, negotiate trades, harvest fields for gold coins.'
    },
    coverImage: '/games/jaliz-game.jpg',
    images: [
      '/games/jaliz-game.jpg'
    ],
    designers: [
      {
        name: { fa: 'اوه روزنبرگ (بازطراحی استودیو هوپا)', en: 'Uwe Rosenberg (Hoopa Games)' },
        country: { fa: 'آلمان / ایران', en: 'Germany / Iran' }
      }
    ],
    publisher: { fa: 'نشر بازی‌های فکری هوپا (Hoopa)', en: 'Hoopa Games' },
    releaseYear: 2018,
    origin: 'iranian',
    minPlayers: 3,
    maxPlayers: 7,
    bestPlayerCount: 5,
    playingTimeMinutes: 45,
    minAge: 9,
    complexity: 2.0,
    rating: 9.1,
    categories: [
      { fa: 'بازی فکری اقتصادی', en: 'Economic Mind Game' },
      { fa: 'تجارت و کشاورزی', en: 'Trading & Negotiation' }
    ],
    skills: [
      {
        key: 'negotiation',
        title: { fa: 'فن بیان، چانه‌زنی و مذاکره اقتصادی', en: 'Economic Trading & Negotiation' },
        score: 9.6,
        description: { fa: 'متقاعدسازی حریفان برای انجام مبادلات دو سر برد.', en: 'Persuading rivals into mutually profitable crop exchanges.' }
      },
      {
        key: 'resource_management',
        title: { fa: 'سرمایه‌گذاری و مدیریت دارایی', en: 'Asset Investment' },
        score: 9.1,
        description: { fa: 'توسعه زمین‌های کشاورزی و خریدهای به موقع کود و تراکتور.', en: 'Expanding farm capacity and purchasing equipment upgrades.' }
      }
    ],
    availableInIran: true
  },
  {
    id: 'mafia-nights',
    title: { fa: 'شب‌های مافیا / استنتاج کلامی', en: 'Mafia Nights (Secret Deduction)' },
    subtitle: { fa: 'بازی فکری استنتاج، روان‌شناسی رفتار و نقش‌های مخفی', en: 'Social Deduction & Behavioral Psychology Mind Game' },
    shortDescription: {
      fa: 'محبوب‌ترین بازی فکری استنتاج کلامی و نقش مخفی برای ۶ تا ۱۸ بازیکن. تحلیل صحبت‌ها، تشخیص دروغ و نبرد شهروندان با مافیا.',
      en: 'The premier social deduction mind game. Citizens use reasoning to identify hidden Mafia members.'
    },
    fullDescription: {
      fa: 'بازی فکری مافیا نبرد بین اکثریت ناآگاه (شهروندان) و اقلیت آگاه (مافیا) است. در فاز شب، مافیا مخفیانه شلیک می‌کند و در فاز روز، تمام بازیکنان با صحبت کردن، متقاعدسازی و تحلیل رفتاری تلاش می‌کنند اعضای مافیا را کشف و با رای‌گیری اخراج نمایند. این بازی استدلال منطقی، سخنوری و زبان بدن را تقویت می‌کند.',
      en: 'In Mafia, hidden informed villains compete against an uninformed majority of townsfolk. Day discussions and voting uncover deceptions.'
    },
    rulesOverview: {
      fa: 'شب‌ها نقش‌ها اکشن خود را انجام می‌دهند. روزها اتهام‌زنی، دفاع کلامی و رای‌گیری برای خروج متهم انجام می‌پذیرد.',
      en: 'Night actions take place in secrecy. Day discussions involve arguments, defenses, and vote-offs.'
    },
    coverImage: '/games/mafia-nights.jpg',
    images: [
      '/games/mafia-nights.jpg'
    ],
    designers: [
      {
        name: { fa: 'دیمیتری دافیدوف', en: 'Dimitry Davidoff' },
        country: { fa: 'روسیه (نسخه‌های ایرانی)', en: 'Russia / Iranian Editions' }
      }
    ],
    publisher: { fa: 'ناشران متعدد بازی‌های فکری ایران', en: 'Iranian Board Game Publishers' },
    releaseYear: 1986,
    origin: 'iranian',
    minPlayers: 6,
    maxPlayers: 18,
    bestPlayerCount: 10,
    playingTimeMinutes: 60,
    minAge: 12,
    complexity: 1.9,
    rating: 9.2,
    categories: [
      { fa: 'بازی فکری استنتاجی', en: 'Deduction Mind Game' },
      { fa: 'نقش مخفی و سخنوری', en: 'Hidden Roles & Rhetoric' }
    ],
    skills: [
      {
        key: 'negotiation',
        title: { fa: 'فن سخنوری، استدلال و نفوذ کلامی', en: 'Rhetoric & Persuasive Reasoning' },
        score: 9.8,
        description: { fa: 'ارائه دلایل منطقی قاطع برای جلب اعتماد جمعی.', en: 'Presenting logical arguments to win group consensus.' }
      },
      {
        key: 'problem_solving',
        title: { fa: 'استنتاج منطقی و تحلیل تناقض‌ها', en: 'Logical Deduction & Contradiction Analysis' },
        score: 9.5,
        description: { fa: 'کشف تناقض در صحبت‌های بازیکنان و تشخیص سناریوهای واقعی.', en: 'Spotting verbal contradictions and constructing true game timelines.' }
      }
    ],
    availableInIran: true
  },
  {
    id: 'azul-game',
    title: { fa: 'آزول (Azul)', en: 'Azul' },
    subtitle: { fa: 'بازی فکری زیبای الگوریتم ریاضی و چیدن کاشی‌های الحمرا', en: 'Award Winning Tile Placement & Mathematical Mind Game' },
    shortDescription: {
      fa: 'شاهکار جهانی بازی‌های فکری الگوریتمی برای ۲ تا ۴ بازیکن. جمع‌آوری کاشی‌های رنگین و تزئین کاخ پادشاهی.',
      en: 'The worldwide award winning mind game of collecting porcelain tiles and ornamenting royal walls.'
    },
    fullDescription: {
      fa: 'در بازی فکری آزول شما هنرمندانی هستید که دیوار کاخ‌های سلطنتی را با کاشی‌های سرامیکی موزاییکی تزئین می‌کنید. با نوبت‌گیری هماهنگ کاشی‌ها از کارگاه‌ها و چیدن آن‌ها در الگوی ردیفی، امتیازات متوالی می‌گیرید. این بازی تفکر فضایی، برنامه‌ریزی ریاضی و پیش‌بینی حرکت حریفان را به اوج می‌رساند.',
      en: 'Players draft colored tiles to complete pattern rows on their board. Points score based on tile placement combinations and set completions.'
    },
    rulesOverview: {
      fa: 'از کارگاه‌ها کاشی‌های یک‌رنگ بردارید، در ردیف‌های دیوار بچینید. کاشی‌های اضافه منفی می‌خورند!',
      en: 'Draft matching tiles from market disks, fill wall pattern lines, score completed rows without overflowing into penalty spots.'
    },
    coverImage: '/games/azul-game.jpg',
    images: [
      '/games/azul-game.jpg'
    ],
    designers: [
      {
        name: { fa: 'مایکل کیسلینگ', en: 'Michael Kiesling' },
        country: { fa: 'آلمان', en: 'Germany' }
      }
    ],
    publisher: { fa: 'Plan B Games / بازتولید ایران', en: 'Plan B Games' },
    releaseYear: 2017,
    origin: 'international',
    minPlayers: 2,
    maxPlayers: 4,
    bestPlayerCount: 3,
    playingTimeMinutes: 40,
    minAge: 8,
    complexity: 1.8,
    rating: 9.3,
    categories: [
      { fa: 'بازی فکری الگوریتمی', en: 'Abstract Pattern Mind Game' },
      { fa: 'چینش کاشی', en: 'Tile Placement' }
    ],
    skills: [
      {
        key: 'strategic_thinking',
        title: { fa: 'تفکر الگوریتمی و هوش فضایی', en: 'Spatial Logic & Pattern Building' },
        score: 9.4,
        description: { fa: 'چیدمان بهینه هندسی برای ایجاد کمبوهای امتیازی.', en: 'Optimizing spatial tile layout for max scoring combos.' }
      }
    ],
    availableInIran: true,
    bggUrl: 'https://boardgamegeek.com/boardgame/230802/azul'
  },
  {
    id: 'citadels-game',
    title: { fa: 'دژ (Citadels)', en: 'Citadels (Persian Edition)' },
    subtitle: { fa: 'بازی فکری نقش‌های مخفی و معماری شهر سلطنتی', en: 'Role Selection & City Building Mind Game' },
    shortDescription: {
      fa: 'بازی فکری تاکتیکی فوق‌العاده برای ۲ تا ۸ بازیکن. انتخاب مخفیانه شخصیتی هر نوبت، کسب طلا و ساخت دژهای شکوهمند.',
      en: 'Classic mind game of hidden drafting character roles each round to build medieval city districts.'
    },
    fullDescription: {
      fa: 'در بازی فکری دژ، بازیکنان هر نوبت به صورت مخفیانه یکی از نقش‌های شهری (شاه، زاهد، تاجر، معمار، آدم‌کش، دزد، سردار، جادوگر) را انتخاب می‌کنند. سپس بر اساس قدرت نقش خود طلا گرفته و کارت‌های سازه شهری می‌سازند. پیش‌بینی اینکه حریفان چه نقشی را برداشته‌اند، کلید برتری در این بازی است.',
      en: 'Players draft character cards secretly each round (Assassin, Thief, King, Merchant, Architect, etc.), using unique powers to build district cards.'
    },
    rulesOverview: {
      fa: 'کارت نقش انتخاب کنید، طلا یا کارت سازه بگیرید، از قابلیت نقش استفاده کرده و شهر خود را توسعه دهید.',
      en: 'Draft character role, collect gold or draw district cards, use role action, build district structures.'
    },
    coverImage: '/games/citadels-game.jpg',
    images: [
      '/games/citadels-game.jpg'
    ],
    designers: [
      {
        name: { fa: 'برونو فایدوتی', en: 'Bruno Faidutti' },
        country: { fa: 'فرانسه / بازطراحی هوپا', en: 'France / Hoopa Games' }
      }
    ],
    publisher: { fa: 'نشر بازی‌های فکری هوپا (Hoopa)', en: 'Hoopa Games' },
    releaseYear: 2000,
    origin: 'iranian',
    minPlayers: 2,
    maxPlayers: 8,
    bestPlayerCount: 5,
    playingTimeMinutes: 45,
    minAge: 10,
    complexity: 2.0,
    rating: 9.0,
    categories: [
      { fa: 'بازی فکری کارتی', en: 'Mind Card Game' },
      { fa: 'انتخاب نقش و ساخت شهر', en: 'Role Drafting & City Building' }
    ],
    skills: [
      {
        key: 'decision_making',
        title: { fa: 'پیش‌بینی تفکر حریف و تصمیم‌گیری مخفیانه', en: 'Opponent Mind Prediction' },
        score: 9.2,
        description: { fa: 'حدس زدن استراتژی حریفان و انتخاب نقشی که بیشترین ضربه را وارد کند.', en: 'Deducing opponent draft choices and picking counter-roles.' }
      }
    ],
    availableInIran: true,
    bggUrl: 'https://boardgamegeek.com/boardgame/478/citadels'
  }
];

export const INITIAL_COMMENTS: UserComment[] = [
  {
    id: 'c1',
    gameId: 'coup-iranian-ver',
    userName: 'علی رضایی',
    rating: 5,
    content: 'یکی از هیجان‌انگیزترین بازی‌های دورهمی است که تا به حال بازی کرده‌ام. نسخه فارسی کیفیت چاپ و ترجمه خیلی خوبی دارد.',
    createdAt: '2026-08-10',
    approved: true
  },
  {
    id: 'c2',
    gameId: 'zar-game',
    userName: 'سارا تهرانی',
    rating: 5,
    content: 'فضاسازی و داستان بازی زار بی‌نظیر است. گرافیک و هنر ایرانی آن فوق‌العاده زیبا کار شده.',
    createdAt: '2026-08-12',
    approved: true
  },
  {
    id: 'c3',
    gameId: 'catan-settlers',
    userName: 'امیرحسین',
    rating: 4,
    content: 'کاتان همیشه کلاسیک و جذابه. برای کسانی که می‌خوان تازه وارد دنیای بردگیم بشن بهترین گزینه است.',
    createdAt: '2026-08-14',
    approved: true
  }
];

// LocalStorage Persistence Helpers
const GAMES_STORAGE_KEY = 'bg_portal_games_v5';
const COMMENTS_STORAGE_KEY = 'bg_portal_comments_v1';

export function getGames(): BoardGame[] {
  if (typeof window === 'undefined') return INITIAL_GAMES;
  try {
    const raw = localStorage.getItem(GAMES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(GAMES_STORAGE_KEY, JSON.stringify(INITIAL_GAMES));
      return INITIAL_GAMES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_GAMES;
  }
}

export function saveGames(games: BoardGame[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(GAMES_STORAGE_KEY, JSON.stringify(games));
  } catch (e) {
    console.error('Failed to save games', e);
  }
}

export function getComments(): UserComment[] {
  if (typeof window === 'undefined') return INITIAL_COMMENTS;
  try {
    const raw = localStorage.getItem(COMMENTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(INITIAL_COMMENTS));
      return INITIAL_COMMENTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_COMMENTS;
  }
}

export function saveComments(comments: UserComment[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(comments));
  } catch (e) {
    console.error('Failed to save comments', e);
  }
}
