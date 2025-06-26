import { CoursePage } from "@/components/course-page";
import { Heart, Leaf, BookOpen, Users, Sun, Star } from "lucide-react";

const whoIsThisFor = [
    {
        icon: <Heart className="h-8 w-8 text-sage-green" />,
        text: "You realize that yoga has given you peace and fulfillment and want that feeling to last.",
    },
    {
        icon: <Leaf className="h-8 w-8 text-sage-green" />,
        text: "You are a spiritual seeker who knows that transforming your life will help others.",
    },
    {
        icon: <BookOpen className="h-8 w-8 text-sage-green" />,
        text: "You want to learn the ancient teachings of yoga and apply them to your life and work.",
    },
    {
        icon: <Star className="h-8 w-8 text-sage-green" />,
        text: "You know happiness is an inside job and you're ready to look within for answers.",
    },
    {
        icon: <Sun className="h-8 w-8 text-sage-green" />,
        text: "You're ready to overcome fear and self-doubt to find your true purpose.",
    },
    {
        icon: <Users className="h-8 w-8 text-sage-green" />,
        text: "You're a healer wanting to complement your practice with the wisdom of Yoga.",
    }
]

const modules = [
    {
      title: "Yoga Philosophy & Ethics",
      duration: "30 HOURS",
      content: [
        "The evolution and expansion of Yoga through the ages",
        "The rise of Hatha Yoga, its history and meaning",
        "The study of Samkhya Philosophy in yoga",
        "Descent from pure consciousness into consciousness; your journey from soul to manifestation",
        "The energetics of the Subtle body and how it applies to yoga practice",
        "The seven stages of Yoga practice",
        "Understanding kundalini energy",
        "The 7 Chakra model of the psycho-energetic body",
        "The Yoga Sutras of Patanjali",
        "Patanjali's eight limbs of yoga and how to apply them in your life",
        "Developing a personal practice of pranayama, meditation, bandhas (energy locks), and mantra",
      ]
    },
    {
        title: "Life of Purpose & Prosperity",
        duration: "15 HOURS",
        content: [
            "An Exploration Into The Purpose Of Your Life",
            "A cornerstone of your training experience, the four Aims is a life changing process that integrates time-tested ancient wisdom to help you uncover the true purpose of your life.",
            "The yoga tradition teaches us that the four aims of life: purpose, prosperity, pleasure and freedom provide the road-map to achieving your most fulfilling, meaningful and joyful life.",
            "You will learn how limiting beliefs and habits prevent you from living the life you want.",
            "This work is truly transformational and will unleash the power of your soul to become who you were meant to be. It will show you how to tap into the power to thrive!",
        ]
    },
    {
        title: "Anatomy & Physiology",
        duration: "20 HOURS",
        content: [
            "Introduction to Western approach to anatomy and physiology",
            "Overview of the systems of the body: skeletal, muscular, nervous, and circulatory system",
            "Experiential based workshops on anatomical connections and movement chains in the body relative to yoga movement",
            "Common diseases, injuries, treatment, and prevention",
            "Introduction to Eastern approach to health and wellness",
            "The chakras and the subtle energy systems of the body",
        ]
    },
    {
        title: "Technique, Theory & Practice",
        duration: "100 HOURS",
        content: [
            "A deep exploration of the teaching techniques of the most practiced asanas (postures)",
            "Introduction to the Sanskrit language and its use in Western Yoga classes",
            "How to apply pranayama, meditation, bandhas (energy locks), and mantra to your teaching",
            "The energetics of mudras and how to apply them during practice",
            "Yoga Nidra – yogic sleep",
        ]
    },
    {
        title: "Theory & Practice Teaching",
        duration: "25 HOURS",
        content: [
            "The ethics of teaching Yoga",
            "The rise of Hatha Yoga, its history and meaning",
            "Demonstration and positioning in the classroom",
            "Learning modalities",
            "Sequencing a yoga class",
            "Physical adjustments",
            "The use of props and modified versions of the",
            "Class etiquette and standard of conduct",
            "Challenges teachers face: injuries, psychological issues, other adversities",
        ]
    },
    {
        title: "Practicum",
        duration: "15 hours",
        content: [
            "Practice teaching- incorporating the basic elements of asana practice",
            "Observing others teaching",
            "Giving and receiving feedback",
            "Assisting a class while another peer is teaching",
        ]
    },
    {
        title: "Distance Learning",
        duration: "",
        content: [
            "You will be assigned a distance-learning package to complete your training. The assignments are designed to give you an opportunity to integrate what you've learned.",
        ]
    }
  ];

  const teachers = [
    {
        name: "Kyla MacKinnon",
        title: "E-RYT 500",
        bio: "Kyla is inspired by the act of leading others and empowering them to live their truth. She believes in the power of connecting breath and movement with those around her.",
        image: "/placeholder.jpg"
    },
    {
        name: "Stephanie Morton",
        title: "",
        bio: "Stephanie Morton has been teaching yoga since 2011. As a long distance runner and running coach, she has worked with many endurance athletes but also has a keen interest in yoga for healthy aging.",
        image: "/teachers-pics copy/stephanie-morton.png"
    },
    {
        name: "Kevin Dougall",
        title: "E-RYT 200",
        bio: "A yoga nerd at heart, Kevin brings his genuine passion for yoga to every class. He started his yoga journey at Shanti in 2011, and has since had the pleasure of training with some incredible teachers.",
        image: "/teachers-pics copy/Kevin Dougall.jpg"
    },
  ];

  const faqs = [
    {
      question: "Where will the training be held?",
      answer: "Your training will be held at a beautiful location in HRM. Depending on the group size, the course will either take place at one of our Shanti studios or another well suited and centrally located space. We will ensure that our training facility feels like a sanctuary."
    },
    {
      question: "Will there be breaks through the training days?",
      answer: "Absolutely. The days are long and we recognize the importance of nourishing yourselves. There will be a 30 minute break for breakfast after our morning practice and then a one hour break for lunch."
    },
    {
      question: "What type of Yoga Training does your school offer?",
      answer: "This is a 200hr Teacher Training Program that meets and exceeds the guidelines set by Yoga Alliance. The style of yoga focused on will be classical Vinyasa/Hatha."
    },
    {
      question: "Do I require any prior training to apply?",
      answer: "No prior training is needed, however we do suggest that you have a regular yoga practice & a keen interest to deepen your knowledge about yoga. If you're thinking about it, we highly recommend this journey!"
    },
    {
      question: "Is it necessary to want to become a teacher?",
      answer: "Not at all. Many people take the training to simply deepen their personal practice and expand their knowledge of yoga. It is common for people to change their minds once the program starts!"
    },
  ]

  const investment = {
      deposit: 1000,
      tuition: 3600,
      earlyBirdTuition: 3200,
      earlyBirdDate: "February 15, 2025"
  }

export default function YTT200HourPage() {
    return (
        <CoursePage
            title="YTT — Spring 2025"
            subtitle="A 200-Hour Foundational Journey"
            dates="May 2—June 1, 2025"
            quote="We must be willing to let go of the life we have planned, so as to have the life that is waiting for us."
            heroImage="/Alexa-Photos/05.jpg"
            imageTwo="/Alexa-Photos/06.jpg"
            imageThree="/Alexa-Photos/07.jpg"
            infoPackageLink="#"
            whoIsThisFor={whoIsThisFor}
            curriculum={modules}
            teachers={teachers}
            faqs={faqs}
            investment={investment}
            paymentDepositLink="#"
            paymentFullLink="#"
            isYogaAlliance={true}
        />
    )
} 