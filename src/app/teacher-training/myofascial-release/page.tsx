import { CoursePage } from "@/components/course-page";
import { Stethoscope, Brain, Leaf, Users, HelpCircle } from "lucide-react";

const whoIsThisFor = [
    {
        icon: <Leaf className="h-8 w-8 text-sage-green" />,
        text: "Curious about fascial resiliency and the scientific understanding of supporting these tissues.",
    },
    {
        icon: <Stethoscope className="h-8 w-8 text-sage-green" />,
        text: "Eager to discover methods that promote deeper experiences within yoga postures.",
    },
    {
        icon: <Brain className="h-8 w-8 text-sage-green" />,
        text: "Interested in how working with fascia can positively influence the nervous system, blood and lymphatic circulation, and overall health.",
    },
    {
        icon: <Users className="h-8 w-8 text-sage-green" />,
        text: "Seeking innovative ways to keep your students consistently engaged and curious about their bodily experiences.",
    },
    {
        icon: <HelpCircle className="h-8 w-8 text-sage-green" />,
        text: "Finding your unique voice and teaching from the place where you connect to and are inspired and supported by your yoga practice",
    }
]

const learningOutcomes = [
    "A solid understanding of fascia's structure and function.",
    "Knowledge of the conditions leading to fascial dysfunction and how to support fascial resiliency through yoga.",
    "Key principles of self-myofascial release techniques.",
    "Extensive experiential learning through daily practices incorporating MFR, vinyasa yoga, pranayama, restorative yoga, and meditation, all sequenced to boost fascia resiliency and general well-being.",
    "MFR protocols based on trigger points and anatomy trains, with specific applications in a yoga context.",
    "Guidance on effectively sequencing yoga classes to include MFR techniques.",
];

const curriculum = [
    {
      title: "Program Overview",
      duration: "",
      content: [
        "A review of functional anatomy.",
        "An overview of fascia and the latest research relevant to movement and yoga.",
        "An understanding of resilience and dysfunction within connective tissues.",
        "Myofascial release theory, covering trigger points and anatomy trains.",
        "MFR protocols for various body regions.",
        "Applications of MFR within a yoga setting.",
        "Strategies for sequencing MFR techniques in yoga classes.",
      ]
    },
];

  const teachers = [
    {
        name: "Stephanie Morton",
        title: "Lead Trainer",
        bio: "Stephanie Morton has been teaching yoga since 2011. As a long distance runner and running coach, she has worked with many endurance athletes but also has a keen interest in yoga for healthy aging. Her approach to yoga is pragmatic but grounded in traditional teachings and yogic philosophy. Her classes combine asanas and functional movement practices with pranayama and meditation techniques that support every lifestyle. She also specializes in pre and post-natal yoga. Originally from Halifax, she recently returned to Nova Scotia with her family after having lived and worked in Playa del Carmen, Mexico for 15 years. She has a decade of yoga studio management experience and has been a lead trainer in many 200-hour yoga teacher training courses. She is passionate about supporting and mentoring yoga teachers.",
        image: "/teachers-pics copy/stephanie-morton.png"
    },
  ];

  const faqs = [
    {
      question: "Are there any prerequisites for this course?",
      answer: "No, there is no prior training required to register for this course. This training is open to anyone interested in enhancing their overall sense of well-being."
    }
  ]

  const investment = {
      deposit: 150,
      tuition: 795,
      earlyBirdTuition: 695,
      earlyBirdDate: "August 2, 2025"
  }

export default function MyofascialReleasePage() {
    return (
        <CoursePage
            title="Myofascial Release Teacher Training"
            subtitle="Our Myofascial Release Yoga Teacher Training dives into fascia, the web-like connective tissue that wraps every muscle, organ, and bone."
            dates="October 2-5, 2025"
            quote="Understanding the interconnectedness within our bodies deepens our self-awareness and also enables us to lead yoga classes with greater intention and purpose."
            heroImage="/Alexa-Photos/20.jpg"
            imageTwo="/Alexa-Photos/21.jpg"
            imageThree="/Alexa-Photos/22.jpg"
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