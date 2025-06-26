import { CoursePage } from "@/components/course-page";
import { BrainCircuit, BookOpen, UserCheck } from "lucide-react";

const whoIsThisFor = [
    {
        icon: <BookOpen className="h-8 w-8 text-sage-green" />,
        text: "You will bring a level of sophistication to your teaching and overcome boundaries and limitations you may have placed on yourself.",
    },
    {
        icon: <UserCheck className="h-8 w-8 text-sage-green" />,
        text: "You will begin to serve your students' needs by giving them the totality of a yoga practice that can be felt long after they leave their yoga mat.",
    },
    {
        icon: <BrainCircuit className="h-8 w-8 text-sage-green" />,
        text: "This systematic approach to awakening Kundalini will have a profound effect on your personal life, weaving your inner world with your outer world and creating a symphonic effect on the quality of your life.",
    }
]

const learningOutcomes = [
    "How to design the most effective practices possible to accommodate a wide variety of students and levels of ability while working towards a specific energetic outcome. This means being able to address a wide variety of classes such as mixed level group classes or individual sessions",
    "There is a way of sequencing a practice that maximizes biomechanical safety. You will learn how to craft a sequence in the most effective way possible to ensure the long-term health of your students and yourself",
    "You will finish this training with the confidence to build theme based energetic practices that are linked with consistency in the asana instruction, breath instruction, guided savasana and meditation",
    "You will learn the full scope of yoga so you can impart just how far and wide the potential of yoga is, to touch your life and the lives of your students",
    "Central to this experience is learning about yourself, not from the outside but from the deep well of wisdom within each of us"
];

const curriculum = [
    {
      title: "Program Overview",
      duration: "45 HOURS",
      content: [
        "This course is a combination of lecture content and practices. Each practice and the sequence of lectures builds on the one before.",
        "Based on Sri T. Krishnamacharya's unique categories of poses you will study how to work with energy to influence the following family of poses: Extensions, laterals, twists, forward bends, back bends and inversions",
        "You will learn the biodynamics of movement and how to craft a sequence in the most effective way possible to ensure the long-term health of your students and yourself.",
        "We will do an in-depth study of the five Koshas (the five sheaths or layers of our being) to understand how we can work with the energy body to influence the physical body and the mental body, in Yoga practice",
        "Working with the science of Ayurveda you will learn how to create sequences to address the energetic conditions of Vata type, Pitta type and Kapha type",
        "You will study the teachings on the Gunas from Samkhya philosophy and apply them to your new knowledge of energetic sequencing",
        "You will be introduced to a wide variety of meditation, pranayama, mantra and mudra techniques",
        "There will be peer reflections and discussions after each practice to acknowledge how the practices affected you on the level of the physical body, mental body, energetic body and spiritual body",
        "Practicum: You will work with your peers to create energetic sequences that will be peer reviewed",
        "There is a distance learning component and personal practice component"
      ]
    },
];

  const teachers = [
    {
        name: "Uriel MacGillivary",
        title: "",
        bio: "Uriel is a yoga teacher, an entrepreneur, and a leader of transformational Yoga teacher trainings and retreats across the Globe. She is the founder of Shanti Yoga Studios and the Shanti Traditional School of Yoga based in Halifax, Nova Scotia.",
        image: "/teachers-pics copy/Uriel-Seated-Circular.png"
    },
    {
        name: "Nikki Martin",
        title: "",
        bio: "Nikki came to yoga in 2011. Drawn by the strength, grace and challenge of arm balances and inversions, and a desire to finally forge a path to peace and happiness in her life. She quickly fell in love with the practice of yoga as a whole and how it enriched all facets of her life, and though she still loves the physical challenges it presents her practice is now driven by spirituality, philosophy, energetics and the powerful impact yoga has both on her life and in the world.",
        image: "/teachers-pics copy/nikki-martin-bio.JPG"
    },
  ];

  const faqs = [
    {
      question: "What are the prerequisites for this course?",
      answer: "Yoga practitioners with a deep desire to delve into the ancient teachings, and, Yoga Teachers with a 200–hour teacher training certificate."
    },
    {
        question: "Is there any required reading?",
        answer: "Yes, The Heart of yoga, T.K.V Desikachar."
    }
  ]

  const investment = {
      deposit: 150,
      tuition: 795,
      earlyBirdTuition: 695,
      earlyBirdDate: "January 15, 2026",
      graduateTuition: 720,
      graduateEarlyBirdTuition: 620
  }

export default function VinyasaKramaPage() {
    return (
        <CoursePage
            title="Vinyasa Krama"
            subtitle="The Integration of Movement, Prana & Sequencing"
            dates="Next Course Dates: TBD"
            quote="Vinyasa Krama is the system connecting with the rhythm and cycles of energy through movement and breath cultivating a landscape of evolved consciousness."
            heroImage="/Alexa-Photos/01.jpg"
            imageTwo="/Alexa-Photos/12.jpg"
            imageThree="/Alexa-Photos/13.jpg"
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