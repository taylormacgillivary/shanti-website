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
        bio: "Stephanie Morton has been teaching yoga since 2011. A long-distance runner and running coach, she has worked with many endurance athletes and has a particular interest in healthy aging, functional movement, and sustainable practice.\nStephanie’s approach is pragmatic and accessible while remaining grounded in traditional yoga teachings and philosophy. Her classes thoughtfully combine asana and functional movement with pranayama and meditation to support students both on and off the mat. She also specializes in prenatal and postnatal yoga.\nAs one of a handful of actively teaching Yoga Medicine® Therapeutic Specialists in Canada, Stephanie has completed advanced training in anatomy, physiology, therapeutic applications of yoga, and evidence-informed movement practices. At Shanti, she is actively involved in the 200-hour teacher training program and leads courses in the 500-hour program, including Pranayama and Myofascial Release. She also leads Shanti’s teaching mentorship program, supporting teachers as they develop their confidence, knowledge, and authentic teaching voice.",
        image: "/images-in-use/teachers-used/stephanie-morton.jpg"
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
      earlyBirdDate: "December 1, 2026"
  }

export default function MyofascialReleasePage() {
    return (
        <CoursePage
            title="Myofascial Release Teacher Training"
            subtitle="Our Myofascial Release Yoga Teacher Training dives into fascia, the web-like connective tissue that wraps every muscle, organ, and bone."
            dates="January 16-17 & January 30-31, 2027"
            heroImage="/images-in-use/20.jpg"
            imageTwo="/images-in-use/21.jpg"
            imageThree="/images-in-use/33.jpg"
            whoIsThisFor={whoIsThisFor}
            learningOutcomes={learningOutcomes}
            curriculum={curriculum}
            teachers={teachers}
            faqs={faqs}
            investment={investment}
            paymentDepositLink="https://clients.mindbodyonline.com/classic/ws?studioid=11233&stype=41&sTG=39&prodId=1283"
            paymentFullLink="#"
            ceCredits="40 Hours"
            showDepositOnly={true}
        />
    )
} 