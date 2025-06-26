import { CoursePage } from "@/components/course-page";
import { Armchair, Accessibility, Heart, Briefcase, Sparkles } from "lucide-react";

const whoIsThisFor = [
    {
        icon: <Accessibility className="h-8 w-8 text-sage-green" />,
        text: "Are you interested in increasing accessibility in yoga?",
    },
    {
        icon: <Heart className="h-8 w-8 text-sage-green" />,
        text: "Are you interested in using yoga to support healthy aging and increasing the quality of life for older adults?",
    },
    {
        icon: <Sparkles className="h-8 w-8 text-sage-green" />,
        text: "Do you want to gain skills to share yoga with beyond the studio setting and include a wider range of mobility issues?",
    },
    {
        icon: <Briefcase className="h-8 w-8 text-sage-green" />,
        text: "Are you interested in learning how to teach effective corporate and online chair yoga classes?",
    },
    {
        icon: <Armchair className="h-8 w-8 text-sage-green" />,
        text: "Have you ever considered how chairs can be used as props to support an evolving asana practice?",
    }
]

const learningOutcomes = [
    "Class setup",
    "Sequencing",
    "Contraindications",
    "Considerations in aging populations",
    "A toolkit of practices including postures, breathing exercises, mudras, self-massage and more to be used to create a wider range of chair yoga experiences"
];

const curriculum = [
    {
      title: "Program Overview",
      duration: "25 HOURS",
      content: [
        "Benefits of chair yoga",
        "Room set up",
        "Sequencing",
        "Contraindications",
        "Aging considerations",
        "8 Limbs of Yoga",
        "Pranayama",
        "Self-massage & MFR techniques",
        "Exploring a Library of Postures"
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
        name: "Pat Hipgrave",
        title: "Teacher",
        bio: "Pat has been practicing yoga for almost 30 years and has become mindful of all the benefits included in a regular practice, such as growth in mind and body, focus, endurance, and the spillover effects into daily life. After retiring from a full-time and often stressful job with the government as an engineering technologist she decided to follow her heart and take yoga teacher training in 2011. One module covered in the training was Chair Yoga. Realizing our aging population and the benefits of continuing yoga throughout life this module really tweaked her interest and she decided to take her Chair Yoga Teacher Training that same year. Pat has completed two Yoga Therapy courses with Doug Keller, one-month intensive yoga training in India and Vinyasa Krama training with Shanti. Other workshop including, but are not limited to include Yin Yoga, Healing from Within, Meditation, Inversions Workshop, Law of Attraction, and Blue Water Training. She has led many different types of yoga classes over the years and in a variety of studios, as well as the Dartmouth Sports, Cole Harbour Place, MSVU, and Dalplex. She has been self employed and taught one on one to seniors. Pat lives life with a heart full of gratitude for yoga!",
        image: "/teachers-pics copy/Pat Hipgrave bio - Edited.png"
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
      answer: "This training is for anyone who wants to learn movement without putting sustained pressure on the joints while increasing strength and balance. No Prior training is required to register for the Chair Yoga Teacher Training."
    },
    {
        question: "How many CE credits is this course?",
        answer: "This course counts for 25 hours of CE credits with Yoga Alliance."
    }
  ]

  const investment = {
      deposit: 150,
      tuition: 575,
      earlyBirdTuition: 475,
      earlyBirdDate: "September 20, 2025"
  }

export default function ChairYogaPage() {
    return (
        <CoursePage
            title="Chair Yoga Teacher Training"
            subtitle="Uncover your full potential to Teach, to Practice, to Live."
            dates="November 20-23, 2025"
            heroImage="/Alexa-Photos/03.jpg"
            imageTwo="/Alexa-Photos/16.jpg"
            imageThree="/Alexa-Photos/17.jpg"
            whoIsThisFor={whoIsThisFor}
            learningOutcomes={learningOutcomes}
            curriculum={curriculum}
            teachers={teachers}
            faqs={faqs}
            investment={investment}
            paymentDepositLink="#"
            paymentFullLink="#"
            ceCredits="25 Hours"
        />
    )
} 