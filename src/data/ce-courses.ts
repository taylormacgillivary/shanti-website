export type CeCourseSection = {
  title: string;
  body: string;
};

export type CeCourseInstructor = {
  name: string;
  image: string;
  role?: string;
  bio: string[];
  imageSize?: number;
  imageObjectPosition?: string;
  teachersLink?: string;
};

export type CeCourseRegistration =
  | { status: "open"; url: string }
  | { status: "not-open" }
  | { status: "closed" };

export type CeCourse = {
  id: string;
  name: string;
  description: string;
  intro: string;
  sections: CeCourseSection[];
  details: {
    date: string;
    time?: string;
    location?: string;
    cost: string;
    ceCredits: string;
  };
  registration: CeCourseRegistration;
  instructors: CeCourseInstructor[];
  instructorsHeading?: string;
  instructorsLink?: {
    href: string;
    label: string;
  };
};

export const ceCourses: CeCourse[] = [
  {
    id: "chanting-mantras-sanskrit",
    name: "Chanting | Mantras | Sanskrit",
    description: "Sacred sounds and ancient language in yoga practice",
    intro:
      "Join <strong>Andrea Gracia</strong> for a deep dive into the sounds of yoga: Mantras, Chanting, Sanskrit study and more.",
    sections: [
      {
        title: "Mantras",
        body: "Sacred sound formulas that serve as tools for meditation and transformation. Learn the power of repetitive chanting to focus the mind, connect with deeper states of consciousness, and create energetic shifts in your practice and teaching.",
      },
      {
        title: "Chanting",
        body: "The practice of vocal devotion that opens the heart and creates community. Discover how group chanting can build connection in your classes, enhance the spiritual dimension of yoga, and provide students with accessible meditation techniques.",
      },
      {
        title: "Sanskrit Study",
        body: "The ancient language of yoga that deepens understanding and authenticity in teaching. Gain confidence in pronunciation, learn the meanings behind common yoga terms, and understand how proper Sanskrit usage honors the tradition while making it accessible to students.",
      },
    ],
    details: {
      date: "TBD 2026",
      time: "1:00-5:00pm",
      cost: "$225+tax",
      ceCredits: "4 hours",
    },
    registration: { status: "not-open" },
    instructors: [
      {
        name: "Andrea Gracia",
        image: "/images-in-use/teachers-used/andrea-gracia.jpg",
        imageObjectPosition: "object-bottom",
        bio: [
          "Andrea has been practicing yoga for over 10 years, beginning her journey in her homeland of México. She has witnessed firsthand how yoga transforms life in profound ways. Her studies have taken her to the banks of the Himalayas and to South India, where she trained in traditional Ashtanga Vinyasa with Saraswati Jois in Mysore.",
          "Andrea brings her rich experience from studying with teachers in México, Canada, and India to share the authentic sounds and sacred language of yoga with her students.",
        ],
        teachersLink: "/teachers#andrea-gracia",
      },
    ],
  },
  {
    id: "yoga-in-action",
    name: "Yoga In Action",
    description: "Bringing yoga principles into daily life",
    intro:
      "<strong>Nikki Martin</strong> is passionate about moving yoga off the mat and beyond the studio walls. Join her in exploring how your yoga practice can move into action and activism in your community.",
    sections: [
      {
        title: "Yoga Beyond the Mat",
        body: "Discover how the principles of yoga extend far beyond physical postures. Learn to apply concepts of ahimsa (non-violence), dharma (purpose), and seva (service) in your daily interactions and decision-making as both a practitioner and teacher.",
      },
      {
        title: "Community Engagement",
        body: "Explore practical ways to bring yoga's transformative power into your community. From teaching in underserved populations to creating inclusive spaces, learn how to make yoga accessible and relevant to diverse communities.",
      },
      {
        title: "Yoga as Activism",
        body: "Understand how personal transformation through yoga can lead to social transformation. Examine how conscious action, mindful consumption, and compassionate leadership can create positive change in the world around you.",
      },
    ],
    details: {
      date: "TBD 2026",
      time: "1:00-5:00pm",
      cost: "$225+tax",
      ceCredits: "4 hours",
    },
    registration: { status: "not-open" },
    instructors: [
      {
        name: "Nikki Martin",
        image: "/images-in-use/teachers-used/nikki-martin.jpg",
        bio: [
          "Nikki came to yoga in 2012, drawn by both the physical challenges and a desire to find peace and happiness in her life. She quickly discovered how yoga enriched all facets of her life, evolving from someone who loved arm balances and inversions to appreciating the mental, spiritual, and philosophical aspects of the practice.",
          "Her passion for moving yoga beyond the studio walls makes her the perfect guide for exploring how ancient yogic principles can create positive change in our communities and world.",
        ],
        teachersLink: "/teachers#nikki-martin",
      },
    ],
  },
  {
    id: "meditation",
    name: "The Art of Presence",
    description: "Meditation for Modern Life",
    intro:
      "Join <strong>Emilie Fabre</strong> in exploring meditation. Whether you have a meditation practice or are looking to establish one, Emilie will guide you through techniques that facilitate stillness and presence.",
    sections: [
      {
        title: "Establishing Your Practice",
        body: "Learn foundational techniques for developing a consistent meditation practice. Discover how to create supportive conditions, work with common obstacles, and build sustainable habits that support both your personal growth and teaching skills.",
      },
      {
        title: "Techniques for Stillness",
        body: "Explore various meditation approaches including breath awareness, body scanning, loving-kindness, and mindfulness practices. Gain confidence in guiding others through these techniques and understanding when different methods are most beneficial.",
      },
      {
        title: "Cultivating Presence",
        body: "Understand how meditation deepens your capacity to be fully present in teaching and life. Learn to recognize and cultivate states of awareness that enhance your ability to hold space for students and respond skillfully to whatever arises.",
      },
    ],
    details: {
      date: "October 3rd, 2026",
      time: "1:00-5:00pm",
      location: "Dartmouth",
      cost: "$150+tax",
      ceCredits: "4 hours",
    },
    registration: {
      status: "open",
      url: "https://clients.mindbodyonline.com/classic/ws?studioid=11233&stype=41&sTG=39&prodId=1611",
    },
    instructors: [
      {
        name: "Emilie Fabre",
        image: "/images-in-use/teachers-used/emilie-fabre.jpg",
        bio: [
          'Emilie completed her 200-hour Yoga Alliance certified teacher training in Edmonton in Fall 2009. She describes this transformative experience as being "broken down into many pieces and re-sculpted," gaining new insight, perspective, and acceptance of who she is.',
          "Through her own journey of self-awareness, acceptance, and compassion, Emilie has cultivated a deep understanding of how meditation supports transformation. She brings this wisdom to guide others on their path toward stillness and presence.",
        ],
        teachersLink: "/teachers#emilie-fabre",
      },
    ],
  },
  {
    id: "advanced-asana",
    name: "Advanced Asana Practice",
    description: "Exploring advanced yoga postures",
    intro:
      'By "Advanced" Asana we present an opportunity to ask all those burning questions you\'ve always wondered in classes about how to deepen your experience in a posture. <strong>Kevin</strong> offers a wealth of knowledge and experience while creating a playful space to explore your postures, some familiar and others perhaps newer to your practice.',
    sections: [
      {
        title: "Deepening Familiar Postures",
        body: "Explore the subtleties and refinements in poses you practice regularly. Learn how to access deeper layers of understanding through breath, alignment, and energetic awareness. Discover variations and modifications that can transform your relationship with foundational postures.",
      },
      {
        title: "Exploring New Territories",
        body: "Step into postures that may be new to your practice with confidence and curiosity. Learn progressive approaches to challenging asanas, understanding the anatomical and energetic requirements while maintaining safety and playfulness in your exploration.",
      },
      {
        title: "Questions & Understanding",
        body: 'Bring all your burning questions about postures and receive expert guidance. Understand the "why" behind alignment cues, learn to troubleshoot common challenges, and develop the skills to guide students safely into deeper expressions of their practice.',
      },
    ],
    details: {
      date: "TBD",
      cost: "$225+tax",
      ceCredits: "4 hours",
    },
    registration: { status: "not-open" },
    instructors: [
      {
        name: "Kevin Dougall",
        image: "/images-in-use/teachers-used/kevin-dougall.jpg",
        bio: [
          "A yoga nerd at heart, Kevin brings his genuine passion for yoga to every class. He started his yoga journey at Shanti in 2011 and has since trained with renowned teachers including Ryan Leier, Srivatsa Ramaswami (vinyasa krama), and Manju Jois (ashtanga).",
          "Kevin holds RYT 200 and RCYT (registered children's yoga teacher) certifications with Yoga Alliance. His dynamic style of practice is fun, inspirational, and deeply rooted in the core traditions of yoga, making him the perfect guide for advanced asana exploration.",
        ],
        teachersLink: "/teachers#kevin-dougall",
      },
    ],
  },
  {
    id: "beating-burnout",
    name: "Beating Burnout",
    description: "Using yoga to prevent and recover from burnout",
    intro:
      "It is ironic that teaching yoga, a practice that supports our students' well-being, frequently leads to burnout. Join <strong>Stephanie Morton</strong> in exploring ways to continue to be inspired and supported in sharing this practice with others.",
    sections: [
      {
        title: "Recognizing Burnout Patterns",
        body: "Learn to identify the early signs of teacher burnout before they become overwhelming. Understand the common triggers and patterns that lead to exhaustion, including over-commitment, perfectionism, and the pressure to constantly give without receiving adequate support or self-care.",
      },
      {
        title: "Sustainable Teaching Practices",
        body: "Develop strategies for maintaining your own practice while teaching others. Explore boundaries, energy management, and ways to stay connected to your personal why. Learn practical tools for creating teaching schedules and environments that nourish rather than deplete you.",
      },
      {
        title: "Reigniting Inspiration",
        body: "Rediscover what drew you to teaching yoga in the first place. Explore practices and perspectives that can reignite your passion for sharing yoga. Learn how to create support systems, find mentorship, and cultivate practices that keep you inspired and growing as both teacher and student.",
      },
    ],
    details: {
      date: "TBD",
      time: "1:00-5:00pm",
      cost: "$225+tax",
      ceCredits: "4 hours",
    },
    registration: { status: "closed" },
    instructors: [
      {
        name: "Stephanie Morton",
        image: "/images-in-use/teachers-used/stephanie-morton.jpg",
        bio: [
          "Stephanie brings a wealth of experience in understanding the challenges that yoga teachers face in maintaining their own well-being while supporting others. Her approach combines practical wisdom with compassionate guidance, drawing from her own journey of navigating the demands of teaching.",
          "With a deep understanding of how the very practice meant to heal can sometimes become a source of stress, Stephanie offers valuable insights into creating sustainable, joy-filled teaching practices that honor both teacher and student needs.",
        ],
        teachersLink: "/teachers#stephanie-morton",
      },
    ],
  },
  {
    id: "development-promotion",
    name: "Development & Promotion",
    description: "Growing your yoga teaching career",
    intro:
      "Do you have ideas for workshops but not sure where to get started? Join <strong>Paighton and Uriel</strong> in understanding how to turn an interesting idea into a pop up class, workshop or course from start to finish.",
    sections: [
      {
        title: "From Idea to Reality",
        body: "Learn how to transform your creative workshop ideas into well-structured offerings. Discover techniques for developing content, creating learning objectives, and designing experiences that engage participants while staying true to your unique teaching style and expertise.",
      },
      {
        title: "Planning & Logistics",
        body: "Master the practical aspects of workshop creation including venue selection, pricing strategies, scheduling, and resource planning. Learn how to create timelines, manage logistics, and handle the behind-the-scenes work that makes workshops successful.",
      },
      {
        title: "Marketing & Promotion",
        body: "Understand how to effectively promote your workshops and reach your target audience. Explore marketing strategies, social media approaches, and communication techniques that build excitement and encourage registration while maintaining authenticity and connection with your community.",
      },
    ],
    details: {
      date: "September 12th, 2026",
      time: "1:00-5:00pm",
      cost: "$225+tax",
      ceCredits: "4 hours",
    },
    registration: {
      status: "open",
      url: "https://clients.mindbodyonline.com/classic/ws?studioid=11233&stype=41&sTG=39&prodId=1614",
    },
    instructorsHeading: "Meet Your Instructors",
    instructors: [
      {
        name: "Paighton Arsenault",
        image: "/images-in-use/teachers-used/paighton-arsenault.jpg",
        role: "Social Media Coordinator & Teacher",
        imageSize: 150,
        bio: [
          "Paighton brings her expertise in social media and community engagement to workshop promotion. As Shanti's Social Media Coordinator and a 200HR & 75HR Yin certified teacher, she understands both the creative and practical sides of bringing yoga offerings to life.",
        ],
      },
      {
        name: "Uriel MacGillivary",
        image: "/images-in-use/teachers-used/uriel-macgillivary.jpg",
        role: "Founder, E-RYT 500",
        imageSize: 150,
        bio: [
          "As Shanti's founder, Uriel brings years of experience in developing and launching successful workshops, retreats, and teacher training programs. Her business acumen combined with deep yoga knowledge makes her an invaluable guide for turning ideas into thriving offerings.",
        ],
      },
    ],
    instructorsLink: {
      href: "/teachers",
      label: "Read their full bios →",
    },
  },
];

export function getCeCourseById(id: string): CeCourse | undefined {
  return ceCourses.find((course) => course.id === id);
}

export function getCeCourseSlugs(): string[] {
  return ceCourses.map((course) => course.id);
}
