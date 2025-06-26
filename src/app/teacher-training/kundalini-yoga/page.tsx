import { CoursePage } from "@/components/course-page";
import { Zap, Brain, Heart } from "lucide-react";

const whoIsThisFor = [
    {
        icon: <Zap className="h-8 w-8 text-sage-green" />,
        text: "To what extent have you transformed your personal yoga practice to include the holistic unfolding of Kundalini Energy?",
    },
    {
        icon: <Brain className="h-8 w-8 text-sage-green" />,
        text: "Are you searching to gain the freedom from fear and access the intelligence of your higher mind?",
    },
    {
        icon: <Heart className="h-8 w-8 text-sage-green" />,
        text: "Are you ready to step into your power as a teacher and practitioner and tap into the totality of yoga to transform your life and yours students' lives?",
    }
]

const learningOutcomes = [
    "Gain the confidence to step into your power as a yoga teacher steeped with the knowledge of the ancient teachings",
    "Expand the reach of your practice with the philosophical principles and wisdom of the tantric tradition",
    "Develop your capacity to apply a unique set of techniques to your teaching and practice that will evolve you as a teacher and a person",
    "Be capable of designing the most effective practices possible to accommodate a wide variety of students and levels of ability while working towards a specific energetic outcome.",
    "Experience Tantra as a methodology for empowerment and self-mastery",
    "Develop your spiritual progress and open the door to help your students thrive"
];

const curriculum = [
    {
      title: "Program Overview",
      duration: "",
      content: [
        "This course is a combination of lecture content, and practices. Each practice and the sequence of lectures builds on the one before. The lectures support the practices and the practices support the lectures.",
        "The power of prana and the mind-body connection",
        "The science of Tantra, its history and meaning",
        "The philosophical differences between classical yoga and tantra",
        "The Chakra system of the psycho-energetic wheels",
        "Mastering prana: The Prana Vayus in depth (directing life force energy) and how to apply the Vayus to your practice and group classes.",
        "The power of Tantric meditation practices. Techniques and practices to empower your self-essence",
        "Peer reflections and discussions after each practice",
        "Distance learning component 15 hours"
      ]
    },
];

  const teachers = [
    {
        name: "Uriel MacGillivary",
        title: "E-RYT 500 Hour, Reiki Master",
        bio: "Uriel is a yoga teacher, an entrepreneur, and a leader of transformational Yoga teacher trainings and retreats across the Globe. She is the founder of Shanti Yoga Studios and the Shanti Traditional School of Yoga based in Halifax, Nova Scotia. Having held senior management and marketing roles in Corporate Canada for twenty years she answered the call to become a yoga teacher. A life-changing journey to India to study the ancient teachings would transform her life. Overnight she walked away from everything that she knew and started a phase in her life that would take her on the adventure of a lifetime. Stepping into her true purpose she recognized that students longed for the same deep transformation in their lives. Her studios and teaching philosophy are guided by the values of the time-honored wisdom teachings of the yoga tradition. Led by masters such as the late Georg Feurerstein, of the Traditional School of Yoga and world-renowned yoga and meditation teacher Rod Stryker she is a student for life. Having studied Tantra, Vinyasa Krama, and Iyengar yoga, she brings a multi-disciplinary approach to her teaching. My vision is clear she says: 'I believe in the power of yoga to transform lives and inspire students to awaken their souls calling'.",
        image: "/images-in-use/teachers-used/uriel-macgillivary.jpg"
    },
    {
        name: "Nikki Martin",
        title: "E-RYT 200 Hour",
        bio: "Nikki came to yoga in 2011. Drawn by the strength, grace and challenge of arm balances and inversions, and a desire to finally forge a path to peace and happiness in her life. She quickly fell in love with the practice of yoga as a whole and how it enriched all facets of her life, and though she still loves the physical challenges it presents her practice is now driven by spirituality, philosophy, energetics and the powerful impact yoga has both on her life and in the world. She did her 200hr YTT with Shanti Hot Yoga, the same studio where she was inspired by her teachers to deepen her practice and eventually follow her dream of becoming a yoga teacher full time. Along the way she discovered a passion for teaching other teachers and helping them discover their own gifts and destinies along this path. Inspired to be more and to know more she has assisted a 200hr YTT to be certified as a Teacher Trainer, taken her Yin TT, attended various workshops and trainings in social justice with industry leaders, and is completing her 300hr YTT through ParaYoga, a Tantra lineage descended from the Himalayan masters. She is passionate about honouring tradition while meeting students where they are and brings a wealth of knowledge to each and every class along with her playful, creative and fiery teaching style. As a writer and storyteller, she loves the idea that a yoga class can lead you somewhere, that you can tell a story with body and breath and the energetic impact that results when they come together with intent. By sprinkling philosophy, spirituality and the 8 Limbs of Yoga into her classes in accessible ways she tries to pass along the greatest gift this practice has given her, 'Ultimately this is a practice of connectivity. It connects us with the world. It connects us with ourselves. And it connects us with each other.'",
        image: "/images-in-use/teachers-used/nikki-martin.jpg"
    },
  ];

  const faqs = [
    {
      question: "What are the prerequisites for this course?",
      answer: "No Prior training is required to register for the Kundalini Course. This course is for anyone who wants to learn more about the process of transformation through Kundalini Yoga."
    },
    {
        question: "Is there any required reading?",
        answer: "Yes, Pure Yoga - Yogi Pranavananda by Tony Rodriguez and Dr. Kanshi Ram."
    }
  ]

  const investment = {
      deposit: 100,
      tuition: 750,
      earlyBirdTuition: 650,
      earlyBirdDate: "December 15, 2024",
      graduateTuition: 675,
      graduateEarlyBirdTuition: 575
  }

export default function KundaliniYogaPage() {
    return (
        <CoursePage
            title="Kundalini Yoga"
            subtitle="Uncover your full potential to Teach, to Practice, to Live."
            dates="Next Course Dates: TBD"
            quote="Kundalini Energy is the universal energy of Supreme Intelligence manifested in human beings as the highest source of potentiality."
            heroImage="/images-in-use/36.jpg"
            imageTwo="/images-in-use/37.jpg"
            imageThree="/images-in-use/39.jpg"
            infoPackageLink="#"
            whoIsThisFor={whoIsThisFor}
            learningOutcomes={learningOutcomes}
            curriculum={curriculum}
            teachers={teachers}
            faqs={faqs}
            investment={investment}
            paymentDepositLink="#"
            paymentFullLink="#"
            ceCredits="45 Hours"
        />
    )
} 