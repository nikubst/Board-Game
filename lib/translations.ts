// Translation dictionary for the application
// Structure: { [language]: { [namespace]: { [key]: string } } }

// Actual translations object - using 'as const' for type inference
const translations = {
  en: {
    common: {
      home: 'Home',
      dashboard: 'Dashboard',
      login: 'Login',
      logout: 'Logout',
      getStarted: 'Get Started',
      viewGallery: 'View Gallery',
      exploreStudio: 'Explore Studio',
      viewOurWork: 'View Our Work',
      startYourProject: 'Start Your Project',
      letCollaborate: "Let's Collaborate",
      letsCreate: "Let's Create Something Amazing Together",
      contactUs: 'Contact us today to discuss your design project and how we can help bring your vision to life.',
      studioName: 'Board Game',
    },
    hero: {
      tagline: 'Tabletop Mind Games &bull; Strategy &bull; Intelligence Analysis',
      title: 'Board Game Hub',
      subtitle: 'Where ideas become striking visual experiences',
      description: 'We craft thoughtful brand systems, refined visual identities and immersive digital experiences that feel as polished as they are memorable.',
    },
    features: {
      title: 'Why clients choose our studio',
      subtitle: 'Every detail is shaped with intention, calm structure and a clear visual language that supports your goals.',
      items: {
        strategy: {
          title: 'Strategy-led direction',
          text: 'We connect your message, audience and visual identity into a coherent and memorable experience.',
        },
        visual: {
          title: 'Refined visual systems',
          text: 'From typography to color, each choice is designed to feel consistent, modern and easy to scale.',
        },
        collaboration: {
          title: 'Smooth collaboration',
          text: 'Feedback becomes clear progress through a simple, structured workflow and thoughtful creative review.',
        },
      },
    },
    featureCards: {
      creativeConcepts: {
        title: 'Creative Concepts',
        description: 'Explore unique design ideas and visual concepts crafted by our team of expert designers.',
      },
      projectManagement: {
        title: 'Project Management',
        description: 'Manage your design projects efficiently from initial concept to final delivery.',
      },
      colorSystems: {
        title: 'Color Systems',
        description: 'Discover and save professional color palettes curated for modern design projects.',
      },
      designGallery: {
        title: 'Design Gallery',
        description: 'View our collection of design works and get inspired by professional creations.',
      },
    },
    stats: {
      completedProjects: 'Completed Projects',
      satisfiedClients: 'Satisfied Clients',
      colorSystems: 'Color Systems',
      designPieces: 'Design Pieces',
      creativeCollaboration: 'Creative collaboration',
    },
    studioFocus: {
      title: 'Studio Focus',
      thisMonth: 'This month',
      newConcepts: 'new concepts',
      brandSystems: 'Brand systems',
      brandSystemsDesc: 'Refined identity kits with modern visual direction.',
      creativeCampaigns: 'Creative campaigns',
      creativeCampaignsDesc: 'Story-led visuals designed to feel fresh and memorable.',
      digitalExperiences: 'Digital experiences',
      digitalExperiencesDesc: 'Elegant interfaces crafted for clarity and impact.',
    },
    gallery: {
      title: 'Art Gallery',
      subtitle: 'Inspiring visuals from NIKOO Art Studio',
      description: 'A curated collection of artistic work and visual explorations to spark your creativity and support your next project.',
      updated: 'Regularly updated with new design explorations and gallery works.',
      featuredStudy: 'Featured study',
    },
    cta: {
      title: "Let's Create Something Amazing Together",
      description: 'Contact us today to discuss your design project and how we can help bring your vision to life.',
    },
    footer: {
      description: 'Professional design studio delivering modern digital experiences.',
      copyright: '&copy; {year} NIKOO Art Studio. All rights reserved.',
    },
    auth: {
      login: 'Login',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      forgotPassword: 'Forgot Password?',
      alreadyHaveAccount: 'Already have an account?',
      dontHaveAccount: "Don't have an account?",
      signIn: 'Sign In',
      signUp: 'Sign Up',
      welcomeBack: 'Welcome Back',
      signInToContinue: 'Sign in to your account to continue',
      createAccount: 'Create Your Account',
      joinStudio: 'Join NIKOO Art Studio and start creating amazing designs',
      backToHome: 'Back to Home',
      fillAllFields: 'Please fill in all fields',
      loginFailed: 'Login failed. Please check your credentials.',
      loginSuccess: 'Login successful! Redirecting...',
      registrationFailed: 'Registration failed. Please try again.',
      registrationSuccess: 'Registration successful! Redirecting to dashboard...',
      passwordsNotMatch: 'Passwords do not match',
      passwordTooShort: 'Password must be at least 6 characters',
      orContinueWith: 'Or continue with',
      orSignUpWith: 'Or sign up with',
      termsAgreement: 'By signing in, you agree to our Terms of Service and Privacy Policy.',
      termsAgreementRegister: 'By creating an account, you agree to our Terms of Service and Privacy Policy.',
      emailPlaceholder: 'your@email.com',
      passwordPlaceholder: '••••••••',
      emailHint: "We'll never share your email with anyone else.",
      passwordHint: 'Minimum 6 characters',
      socialLoginComingSoon: 'Social login coming soon!',
    },
    navbar: {
      artStudio: 'Art Studio',
    },
    dashboard: {
      creativeWorkspace: 'Creative workspace',
      yourDashboard: 'Your design studio dashboard',
      welcomeUser: 'Welcome back, {name} 👋',
      profileCardTitle: 'Designer & Artist Profile',
      dashboardDescription: 'Keep your ideas, palettes and projects aligned in one polished space built for focused creative work.',
      todaysFocus: "Today's focus",
      todaysFocusText: 'Refine one concept and ship one project',
      activeProjects: 'Active Projects',
      designConcepts: 'Design Concepts',
      colorSystems: 'Color Systems',
      studioActions: 'Studio actions',
      studioActionsDescription: 'Jump into the next creative step with one clear action.',
      newProject: 'New project',
      designBrief: 'Design brief',
      colorSystemsLink: 'Color systems',
      currentProjects: 'Current Projects',
      viewAll: 'View All',
      noActiveProjects: 'No Active Projects',
      noActiveProjectsDescription: 'Begin your first design project to track progress here',
      startNewProject: 'Start a New Project',
      recentConcepts: 'Recent Concepts',
      noActiveProjectsEmpty: 'No active projects. Create a new project to get started!',
    },
    ideas: {
      myIdeas: 'My Ideas',
      ideasDescription: 'Browse and manage your generated design ideas',
      generateNewIdea: 'Generate New Idea',
      searchIdeas: 'Search ideas...',
      filter: 'Filter',
      all: 'All',
      recent: 'Recent',
      popular: 'Popular',
      withProjects: 'With Projects',
      noIdeasFound: 'No Ideas Found',
      noIdeasDescription: "You haven't generated any ideas yet. Use the idea generator to create your first design concept!",
      generateFirstIdea: 'Generate Your First Idea',
      submitBrief: 'Submit Design Brief',
      briefDescription: 'Provide details about your project to receive a customized design proposal',
      viewAllBriefs: 'View All Briefs',
      briefGuidelines: 'Design Brief Guidelines',
      describeProject: 'Describe Your Project',
      describeProjectDesc: 'Include information about your business, target audience, and design objectives',
      specifyRequirements: 'Specify Requirements',
      specifyRequirementsDesc: 'Mention any specific colors, fonts, or brand guidelines we should follow',
      shareInspiration: 'Share Inspiration',
      shareInspirationDesc: 'Upload reference images or describe visual styles that inspire you',
      designServices: 'Our Design Services',
    },
    palettes: {
      myPalettes: 'My Color Palettes',
      palettesDescription: 'Create, organize, and save beautiful color combinations',
      createNewPalette: 'Create New Palette',
      paletteName: 'Palette Name',
      palettePlaceholder: 'e.g., Summer Sunset, Ocean Blues',
      associateWithProject: 'Associate with Project (Optional)',
      noProject: 'No Project',
      cancel: 'Cancel',
      createPalette: 'Create Palette',
      noPalettesFound: 'No Palettes Found',
      noPalettesDescription: "You haven't created any color palettes yet. Start by creating your first palette!",
      createFirstPalette: 'Create Your First Palette',
    },
    projects: {
      myProjects: 'My Projects',
      projectsDescription: 'Manage and organize your creative projects',
      newProject: 'New Project',
      allProjects: 'All Projects',
      inProgress: 'In Progress',
      completed: 'Completed',
      ideas: 'Ideas',
      noProjectsFound: 'No Projects Found',
      noProjectsDescription: "You haven't created any projects yet. Start your first creative project!",
      createNewProject: 'Create New Project',
      createNewProjectDesc: 'Start a new creative project and bring your ideas to life',
      cancel: 'Cancel',
      projectTitle: 'Project Title',
      projectTitlePlaceholder: 'e.g., Coffee Brand Identity',
      descriptionLabel: 'Description',
      descriptionPlaceholder: 'Describe your project goals, scope, and requirements...',
      statusLabel: 'Status',
      statusIdea: 'Idea',
      statusInProgress: 'In Progress',
      statusCompleted: 'Completed',
      editProject: 'Edit Project',
      updateProject: 'Update Project',
      createProject: 'Create Project',
      updateProjectDetails: 'Update your project details',
    },
    sidebar: {
      dashboard: 'Dashboard',
      projects: 'Projects',
      ideas: 'Ideas',
      palettes: 'Palettes',
      inspirations: 'Inspirations',
      studioName: 'NIKOO Art Studio',
      workspace: 'Creative Workspace',
    },
    inspirations: {
      title: 'Visual Inspirations',
      subtitle: 'Explore artistic benchmarks and reference visual directions',
      all: 'All',
      branding: 'Branding',
      digital: 'Digital',
      artDirection: 'Art Direction',
    },
  },
  fa: {
    common: {
      home: 'خانه',
      dashboard: 'داشبورد',
      login: 'ورود',
      logout: 'خروج',
      getStarted: 'شروع کنید',
      viewGallery: 'مشاهده گالری',
      exploreStudio: 'کشف استودیو',
      viewOurWork: 'مشاهده آثار ما',
      startYourProject: 'شروع پروژه شما',
      letCollaborate: 'با ما همکاری کنید',
      letsCreate: 'بیایید چیز شگفت‌انگیزی با هم خلق کنیم',
      contactUs: 'برای ثبت یا بررسی بازی‌های فکری خود با ما در تماس باشید.',
      studioName: 'برد گیم',
    },
    hero: {
      tagline: 'مرجع تحلیل مهارتی &bull; بازی‌های فکری &bull; تفکر استراتژیک',
      title: 'مرجع بازی‌های فکری (Board Game)',
      subtitle: 'جایی که ایده‌ها به تجربیات دیداری چشمگیر تبدیل می‌شوند',
      description: 'ما سیستم‌های برند اندیشیده، هویت‌های بصری پالایش شده و تجربیات دیجیتال غرق‌شونده‌ای خلق می‌کنیم که به اندازه حافظه ماندگار، صیقل یافته هستند.',
    },
    features: {
      title: 'چرا مشتریان استودیو ما را انتخاب می کنند',
      subtitle: 'هر جزئیات با نیت، ساختار آرام و زبان بصری روشنی شکل گرفته است که اهداف شما را پشتیبانی می کند.',
      items: {
        strategy: {
          title: 'راهبری استراتژیک',
          text: 'ما پیام، مخاطب و هویت بصری شما را به تجربه‌ای منسجم و به یاد ماندنی متصل می‌کنیم.',
        },
        visual: {
          title: 'سیستم‌های بصری پالایش شده',
          text: 'از تایپوگرافی تا رنگ، هر انتخاب برای احساس یکپارچگی، مدرن بودن و سهولت مقیاس‌پذیری طراحی شده است.',
        },
        collaboration: {
          title: 'همکاری روان',
          text: ' بازخورد از طریق گردش کار ساده و ساختاریافته و بررسی خلاقانه اندیشمندانه به پیشرفت واضح تبدیل می‌شود.',
        },
      },
    },
    featureCards: {
      creativeConcepts: {
        title: 'مفاهیم خلاقانه',
        description: 'ایده‌های طراحی منحصر به فرد و مفاهیم بصری خلق شده توسط تیم متخصص طراحان ما را کشف کنید.',
      },
      projectManagement: {
        title: 'مدیریت پروژه',
        description: 'پروژه‌های طراحی خود را از مفهوم اولیه تا تحویل نهایی به طور کارآمد مدیریت کنید.',
      },
      colorSystems: {
        title: 'سیستم‌های رنگی',
        description: 'پالت‌های رنگی حرفه‌ای را کشف و ذخیره کنید که برای پروژه‌های طراحی مدرن گردآوری شده‌اند.',
      },
      designGallery: {
        title: 'گالری طراحی',
        description: 'مجموعه آثار طراحی ما را مشاهده کنید و از خلقت‌های حرفه‌ای الهام بگیرید.',
      },
    },
    stats: {
      completedProjects: 'پروژه‌های تکمیل شده',
      satisfiedClients: 'مشتریان راضی',
      colorSystems: 'سیستم‌های رنگی',
      designPieces: 'اثار طراحی',
      creativeCollaboration: 'همکاری خلاقانه',
    },
    studioFocus: {
      title: 'تمرکز استودیو',
      thisMonth: 'این ماه',
      newConcepts: 'مفهوم جدید',
      brandSystems: 'سیستم‌های برند',
      brandSystemsDesc: 'کیت‌های هویت پالایش شده با جهت بصری مدرن.',
      creativeCampaigns: 'کمپین‌های خلاقانه',
      creativeCampaignsDesc: 'تصاویر داستانی طراحی شده برای احساس تازگی و به یاد ماندنی.',
      digitalExperiences: 'تجربیات دیجیتال',
      digitalExperiencesDesc: ' رابط‌های کاربری شیک ساخته شده برای وضوح و تاثیر.',
    },
    gallery: {
      title: 'گالری هنر',
      subtitle: 'الگوهای الهام بخش از استودیو هنر نیکو',
      description: 'مجموعه‌ای گردآوری شده از آثار هنری و اکتشافات بصری برای تحریک خلاقیت شما و حمایت از پروژه بعدی شما.',
      updated: 'به طور منظم با اکتشافات طراحی جدید و آثار گالری به روز می شود.',
      featuredStudy: 'مطالعه ویژه',
    },
    cta: {
      title: 'بیایید چیز شگفت‌انگیزی با هم خلق کنیم',
      description: 'برای بحث درباره پروژه طراحی خود و چگونگی کمک ما برای تحقق بخشیدن به دیدگاه شما، امروز با ما تماس بگیرید.',
    },
    footer: {
      description: 'استودیو طراحی حرفه‌ای که تجربیات دیجیتال مدرن را ارائه می‌دهد.',
      copyright: '© {year} استودیو هنر نیکو. تمام حقوق محفوظ است.',
    },
    auth: {
      login: 'ورود',
      register: 'ثبت نام',
      email: 'ایمیل',
      password: 'رمز عبور',
      confirmPassword: 'تکرار رمز عبور',
      forgotPassword: 'رمز عبور را فراموش کرده‌اید؟',
      alreadyHaveAccount: 'قبلاً حساب کاربری دارید؟',
      dontHaveAccount: 'حساب کاربری ندارید؟',
      signIn: 'ورود',
      signUp: 'ثبت نام',
      welcomeBack: 'خوش آمدید',
      signInToContinue: 'برای ادامه وارد حساب خود شوید',
      createAccount: 'ثبت نام',
      joinStudio: 'به NIKOO Art Studio بپیوندید و ساخت طراحی‌های شگفت‌انگیز را آغاز کنید',
      backToHome: 'بازگشت به خانه',
      fillAllFields: 'لطفاً تمام فیلدها را پر کنید',
      loginFailed: 'ورود ناموفق بود. لطفاً اعتبارنامه‌های خود را بررسی کنید.',
      loginSuccess: 'ورود موفق! در حال انتقال...',
      registrationFailed: 'ثبت نام ناموفق بود. لطفاً دوباره تلاش کنید.',
      registrationSuccess: 'ثبت نام موفق! در حال انتقال به داشبورد...',
      passwordsNotMatch: 'رمز عبور مطابقت ندارد',
      passwordTooShort: 'رمز عبور باید حداقل ۶ کاراکتر باشد',
      orContinueWith: 'یا ادامه با',
      orSignUpWith: 'یا ثبت نام با',
      termsAgreement: 'با ورود، شما با شرایط خدمات و سیاست حفظ حریم خصوصی ما موافقت می‌کنید.',
      termsAgreementRegister: 'با ایجاد حساب، شما با شرایط خدمات و سیاست حفظ حریم خصوصی ما موافقت می‌کنید.',
      emailPlaceholder: 'your@email.com',
      passwordPlaceholder: '••••••••',
      emailHint: 'ما هرگز ایمیل شما را با کس دیگری به اشتراک نمی‌گذاریم.',
      passwordHint: 'حداقل ۶ کاراکتر',
      socialLoginComingSoon: 'ورود اجتماعی به زودی!',
    },
    navbar: {
      artStudio: 'استودیو هنر',
    },
    dashboard: {
      creativeWorkspace: 'فضای کاری خلاقانه',
      yourDashboard: 'داشبورد استودیوی طراحی شما',
      welcomeUser: 'خوش آمدید، {name} 👋',
      profileCardTitle: 'پروفایل طراح و هنرمند',
      dashboardDescription: 'ایده‌ها، پالت‌ها و پروژه‌های شما را در یک فضای حرفه‌ای و منظم نگه می‌دارد.',
      todaysFocus: 'تمرکز امروز',
      todaysFocusText: 'یک مفهوم را اصلاح کنید و یک پروژه را تحویل دهید',
      activeProjects: 'پروژه‌های فعال',
      designConcepts: 'مفاهیم طراحی',
      colorSystems: 'سیستم‌های رنگ',
      studioActions: 'اقدامات استودیو',
      studioActionsDescription: 'با یک اقدام واضح، به گام خلاقانه بعدی بروید.',
      newProject: 'پروژه جدید',
      designBrief: 'بریف طراحی',
      colorSystemsLink: 'سیستم‌های رنگ',
      currentProjects: 'پروژه‌های جاری',
      viewAll: 'مشاهده همه',
      noActiveProjects: 'هیچ پروژه فعالی وجود ندارد',
      noActiveProjectsDescription: 'اولین پروژه طراحی خود را آغاز کنید تا پیشرفت را از اینجا دنبال کنید',
      startNewProject: 'شروع پروژه جدید',
      recentConcepts: 'مفاهیم اخیر',
      noActiveProjectsEmpty: 'پروژه فعالی وجود ندارد. یک پروژه جدید بسازید تا شروع کنید!',
    },
    ideas: {
      myIdeas: 'ایده‌های من',
      ideasDescription: 'ایده‌های طراحی تولیدشده خود را مرور و مدیریت کنید',
      generateNewIdea: 'ساخت ایده جدید',
      searchIdeas: 'جستجوی ایده‌ها...',
      filter: 'فیلتر',
      all: 'همه',
      recent: 'اخیر',
      popular: 'محبوب',
      withProjects: 'با پروژه',
      noIdeasFound: 'هیچ ایده‌ای یافت نشد',
      noIdeasDescription: 'شما هنوز ایده‌ای تولید نکرده‌اید. از ایده‌ساز برای ایجاد اولین مفهوم طراحی خود استفاده کنید!',
      generateFirstIdea: 'اولین ایده خود را بسازید',
      submitBrief: 'ارسال بریف طراحی',
      briefDescription: 'جزئیات پروژه خود را ثبت کنید تا یک پیشنهاد طراحی سفارشی دریافت کنید',
      viewAllBriefs: 'مشاهده همه بریف‌ها',
      briefGuidelines: 'راهنمای بریف طراحی',
      describeProject: 'پروژه خود را توضیح دهید',
      describeProjectDesc: 'اطلاعاتی درباره کسب‌وکار، مخاطب هدف و اهداف طراحی خود ارائه دهید',
      specifyRequirements: 'نیازمندی‌ها را مشخص کنید',
      specifyRequirementsDesc: 'هر رنگ، فونت یا دستورالعمل برندسازی خاصی که باید دنبال کنیم ذکر کنید',
      shareInspiration: 'الهام خود را به اشتراک بگذارید',
      shareInspirationDesc: 'تصاویر مرجع را آپلود کنید یا سبک‌های بصری الهام‌بخش خود را توضیح دهید',
      designServices: 'خدمات طراحی ما',
    },
    palettes: {
      myPalettes: 'پالت‌های رنگ من',
      palettesDescription: 'ترکیب‌های رنگی زیبا را ایجاد، سازماندهی و ذخیره کنید',
      createNewPalette: 'ساخت پالت جدید',
      paletteName: 'نام پالت',
      palettePlaceholder: 'برای مثال: غروب تابستانی، آبی‌های اقیانوسی',
      associateWithProject: 'همراه با پروژه (اختیاری)',
      noProject: 'بدون پروژه',
      cancel: 'لغو',
      createPalette: 'ایجاد پالت',
      noPalettesFound: 'هیچ پالت رنگی یافت نشد',
      noPalettesDescription: 'شما هنوز هیچ پالت رنگی ایجاد نکرده‌اید. با ساخت اولین پالت خود شروع کنید!',
      createFirstPalette: 'اولین پالت خود را بسازید',
    },
    projects: {
      myProjects: 'پروژه‌های من',
      projectsDescription: 'پروژه‌های خلاقانه خود را مدیریت و سازماندهی کنید',
      newProject: 'پروژه جدید',
      allProjects: 'همه پروژه‌ها',
      inProgress: 'در حال پیشرفت',
      completed: 'تکمیل‌شده',
      ideas: 'ایده‌ها',
      noProjectsFound: 'هیچ پروژه‌ای یافت نشد',
      noProjectsDescription: 'شما هنوز هیچ پروژه‌ای ایجاد نکرده‌اید. اولین پروژه خلاقانه خود را شروع کنید!',
      createNewProject: 'پروژه جدید بسازید',
      createNewProjectDesc: 'یک پروژه خلاقانه جدید آغاز کنید و ایده‌های خود را زنده کنید',
      cancel: 'لغو',
      projectTitle: 'عنوان پروژه',
      projectTitlePlaceholder: 'مانند: هویت بصری برند کافه',
      descriptionLabel: 'توضیحات',
      descriptionPlaceholder: 'اهداف، دامنه و نیازمندی‌های پروژه خود را توضیح دهید...',
      statusLabel: 'وضعیت',
      statusIdea: 'ایده',
      statusInProgress: 'در حال پیشرفت',
      statusCompleted: 'تکمیل‌شده',
      editProject: 'ویرایش پروژه',
      updateProject: 'به‌روزرسانی پروژه',
      createProject: 'ایجاد پروژه',
      updateProjectDetails: 'جزئیات پروژه خود را به‌روزرسانی کنید',
    },
    sidebar: {
      dashboard: 'داشبورد',
      projects: 'پروژه‌ها',
      ideas: 'ایده‌ها',
      palettes: 'پالت‌ها',
      inspirations: 'الهامات',
      studioName: 'استودیو هنر نیکو',
      workspace: 'فضای کاری خلاقانه',
    },
    inspirations: {
      title: 'الهام‌های بصری',
      subtitle: 'مرور نمونه‌های شاخص هنری و جهت‌گیری‌های بصری مرجع',
      all: 'همه',
      branding: 'برندسازی',
      digital: 'دیجیتال',
      artDirection: 'هدایت هنری',
    },
  },
} as const;

// Type exports
export type Translations = typeof translations;
export type TranslationKeys = keyof typeof translations.en;
export type NamespaceKeys<T extends TranslationKeys> = keyof typeof translations.en[T];

// Function exports
export function getTranslations(lang: keyof typeof translations) {
  return translations[lang];
}

export function t(
  lang: keyof typeof translations,
  namespace: TranslationKeys,
  key: string
): string {
  const namespaceObj = translations[lang][namespace] as Record<string, unknown>;
  if (!namespaceObj) {
    console.warn(`Namespace '${namespace}' not found in ${String(lang)} translations`);
    return key;
  }
  
  // Handle nested keys like 'creativeConcepts.title'
  const keys = key.split('.');
  let value: unknown = namespaceObj;
  
  for (const k of keys) {
    if (typeof value === 'object' && value !== null && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      console.warn(
        `Translation key '${key}' not found in namespace '${namespace}' for language ${String(lang)}`
      );
      return key;
    }
  }
  
  if (typeof value === 'string') {
    return value;
  }
  
  console.warn(
    `Translation key '${key}' is not a string in namespace '${namespace}' for language ${String(lang)}`
  );
  return key;
}

// Default export
export default translations;
