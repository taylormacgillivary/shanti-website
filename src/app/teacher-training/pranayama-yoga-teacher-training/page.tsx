import { CoursePage } from "@/components/course-page";
import { Wind, Brain, Heart, Leaf, Stethoscope, BookOpen } from "lucide-react";

const whoIsThisFor = [
    {
        icon: <Wind className="h-8 w-8 text-sage-green" />,
        text: "Are you interested in diving deeper into your asana practice through the breath?",
    },
    {
        icon: <BookOpen className="h-8 w-8 text-sage-green" />,
        text: "Are you curious about exploring ancient Yogic philosophy and wisdom as a means to diving deeper into your human experience?",
    },
    {
        icon: <Brain className="h-8 w-8 text-sage-green" />,
        text: "Have you ever wondered what is the driving force within the mind-body connection?",
    },
    {
        icon: <Stethoscope className="h-8 w-8 text-sage-green" />,
        text: "Do you want to gain an understanding of techniques that offer nervous system regulation?",
    },
    {
        icon: <Leaf className="h-8 w-8 text-sage-green" />,
        text: "Are you interested in the latest medical research that supports the use of breath control for nervous system regulation, injury/post-operative recovery and overall physical and mental wellbeing?",
    },
    {
        icon: <Heart className="h-8 w-8 text-sage-green" />,
        text: "As a yoga teacher, are you interested in moving beyond asana instruction and encouraging your students to explore a deeper connection to their practice?",
    }
]

const learningOutcomes = [
    "You will gain a deep understanding of the yogic texts and philosophies that describe pranayama and position it within the yoga practice.",
    "You will gain a better understanding of the anatomical systems involved and affected by the breath.",
    "You will gain knowledge of the latest medical research that demonstrates the benefits and implications of breath control on health and wellbeing.",
    "You will build a foundation through our intensive weekend practices for maintaining an ongoing personal pranayama practice.",
    "Through a variety of asana, pranayama and meditation practices, you will build a tool belt of accessible and simple breath control practices that can be used in many contexts including your yoga classes.",
    "You will be prepared to share yoga in a way that is multidimensional and accessible to all your students."
];

const curriculum = [
    {
      title: "Program Overview",
      duration: "40 HOURS",
      content: [
        "An introduction to the Koshas as a framework for understanding the human experience",
        "Anatomy of the respiratory, circulatory, nervous, and lymphatic systems",
        "Mindfulness techniques that cultivate 'The Witness'",
        "Historical understanding of pranayama through its development as a practice",
        "An understanding of the the flow of energy through the Yogic lens of Prana Vayus, Nadis",
        "Theory and practice of Pranayama techniques that encourage rest and relaxation",
        "Theory and practice of Pranayama techniques that support movement",
        "Theory and practice of Pranayama techniques that are energizing",
        "Exploration of practices with bandhas, mudras and mantras that can support and deepen a Pranayama practice",
        "Meditation practice"
      ]
    },
];

  const teachers = [
    {
        name: "Stephanie Morton",
        title: "Teacher",
        bio: "Stephanie Morton has been teaching yoga since 2011. As a long distance runner and running coach, she has worked with many endurance athletes but also has a keen interest in yoga for healthy aging. Her approach to yoga is pragmatic but grounded in traditional teachings and yogic philosophy. Her classes combine asanas and functional movement practices with pranayama and meditation techniques that support every lifestyle. She also specializes in pre and post-natal yoga. Originally from Halifax, she recently returned to Nova Scotia with her family after having lived and worked in Playa del Carmen, Mexico for 15 years. She has a decade of yoga studio management experience and has been a lead trainer in many 200-hour yoga teacher training courses. She is passionate about supporting and mentoring yoga teachers.",
        image: "/teachers-pics copy/stephanie-morton.png"
    },
    {
        name: "Andrea Gracia",
        title: "Teacher",
        bio: "Andrea Gracia has been practicing Yoga for a little over 10 years. She began her journey in her homeland of México and has since seen yoga transform her life in many profound ways. A few years ago, Andrea had the opportunity to travel to the birthplace of yoga, where she trained with her teacher along the banks of the Himalayas. Later, she was fortunate enough to travel to South India to study the traditional Ashtanga Vinyasa style with Saraswati Jois in Mysore. Her experiences in India, combined with the knowledge gained from her teachers in México and Canada, as well as her practice over the years, are something she is eager to share with others.",
        image: "/teachers-pics copy/Andrea Gracia.jpg"
    },
    {
        name: "Kevin Dougall",
        title: "Teacher",
        bio: "A yoga nerd at heart, Kevin brings his genuine passion for yoga to every class. He started his yoga journey at Shanti in 2011, and has since had the pleasure of training with Ryan Leier, Srivatsa Ramaswami (vinyasa krama), and Manju Jois (ashtanga), and holds a RYT 200, and RCYT (registered children's yoga teacher) certification with Yoga Alliance. He shares his dynamic style of practice which is fun, inspirational, and focused on the core traditions of yoga.",
        image: "/teachers-pics copy/Kevin Dougall.jpg"
    },
  ];

  const faqs = [
    {
      question: "What are the prerequisites for this course?",
      answer: "This training is for anyone who wants to improve their overall sense of well-being, from improving anxiety and stress to alleviating the symptoms of certain physical conditions. No Prior training is required to register for the Pranayama Teacher Training."
    },
    {
        question: "How many CE credits is this course?",
        answer: "This course counts for 40 hours of CE credits with Yoga Alliance."
    }
  ]

  const investment = {
      deposit: 150,
      tuition: 795,
      earlyBirdTuition: 695,
      earlyBirdDate: "January 15, 2026"
  }

export default function PranayamaYogaPage() {
    return (
        <CoursePage
            title="Pranayama Yoga Teacher Training"
            subtitle="Uncover your full potential to Teach, to Practice, to Live."
            dates="February 5-8, 2026"
            heroImage="/Alexa-Photos/04.jpg"
            imageTwo="/Alexa-Photos/18.jpg"
            imageThree="/Alexa-Photos/19.jpg"
            whoIsThisFor={whoIsThisFor}
            learningOutcomes={learningOutcomes}
            curriculum={curriculum}
            teachers={teachers}
            faqs={faqs}
            investment={investment}
            paymentDepositLink="#"
            paymentFullLink="#"
            ceCredits="40 Hours"
        />
    )
} 