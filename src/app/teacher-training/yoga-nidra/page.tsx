import { CoursePage } from "@/components/course-page";
import { CheckCircle } from "lucide-react";

const whoIsThisFor = [
    {
        icon: <CheckCircle className="h-8 w-8 text-sage-green" />,
        text: "You want to offer your students and clients an alternative, accessible method for meditation.",
    },
    {
        icon: <CheckCircle className="h-8 w-8 text-sage-green" />,
        text: "You have an active mind that keeps you from falling asleep.",
    },
    {
        icon: <CheckCircle className="h-8 w-8 text-sage-green" />,
        text: "You are tired of feeling stressed out and are feeling exhausted and burnt out.",
    },
    {
        icon: <CheckCircle className="h-8 w-8 text-sage-green" />,
        text: "You feel you always have to be 'doing' to feel self-worth.",
    },
    {
        icon: <CheckCircle className="h-8 w-8 text-sage-green" />,
        text: "You want to experience the ability to turn inward for peace and quiet.",
    },
    {
        icon: <CheckCircle className="h-8 w-8 text-sage-green" />,
        text: "You want to learn methods to respond to lifes' challenges instead of over reacting.",
    },
    {
        icon: <CheckCircle className="h-8 w-8 text-sage-green" />,
        text: "You want to heal yourself from the inside out and are ready to listen to your body's calling for deep rest and healing.",
    }
]

const curriculum = [
    {
        title: "Course Description",
        content: [
            "Yoga nidra, also known as yogic sleep, is a deep relaxation practice rooted in the tantric tradition.",
            "There are four primary uses for this practice: healing, improved cognition, transformation and spiritual awakening.",
            "This 45-hour teacher training will provide practices and techniques focused on healing and transformation- providing a strong practical foundation to enable yoga teachers to design their own yoga nidra classes.",
            "Each section will include theory as well as physical movement and yoga nidra practices.",
        ]
    },
    {
        title: "Curriculum",
        content: [
            "Understand the four states of consciousness and how to reshape the unconscious mind",
            "Understand the concept of dharma and engage in some specific exercises to help you achieve your purpose in life",
            "How the koshas ( layers of the energy body) impact the practices of Yoga Nidra",
            "How to work with the powerful yogic model of the mind, samskaras and sankalpa",
            "The connection of the central nervous system, neurophysiology, and sleep",
            "Uncovering the root samakara that is holding you back from achieving your life of fulfillment",
            "The relationship between Yoga Nidra and meditation",
            "How to integrate these practices into your life",
        ]
    },
    {
        title: "Learning Outcomes",
        content: [
            "Experience the layering and depth of consecutive yoga nidra practices",
            "Expand your knowledge and experience of tantric texts and practices",
            "Develop your confidence and capability to lead yoga nidra practices",
            "Learn how to weave neurophysiology and ancient practices and contextualize them for today",
        ]
    },
    {
        title: "Prerequisites",
        content: [
            "Teachers in training or teachers who have completed a 200 hour yoga training",
            "Yoga Students who want to expand their knowledge of yoga nidra practice",
        ]
    },
    {
        title: "Notes",
        content: [
            "Teachers enrolled in the 300/500 Hour YTT will receive 45 hours CE credits with Yoga Alliance.",
        ]
    }
];

const teachers = [
    {
        name: "Dorothy Spence",
        title: "200, 500 Hours & Level 1 Parayoga Certified",
        bio: "Dorothy's longtime love affair with yoga started with her first downward facing dog over 20 years ago. She is a 'yoga geek' and is constantly studying, talking and integrating yoga's wisdom and philosophy into her everyday life. She is a 200, and 500 hour certified yoga teacher. She continues her tantric hatha yoga studies with Pandi Rajmani Tigunait, the spiritual leader of the Himalayan Institute and is an Ayurveda Yoga Specialist through The Himalayan Institute. With an engineering degree and a Masters in Business Administration, Dorothy is the founder of Imaginal Ventures Inc., a business advisory and training company who supports conscious leaders who are changing the world.",
        image: "/images-in-use/teachers-used/dorothy-spence.jpg"
    }
];

const investment = {
    deposit: 100,
    tuition: 750,
    earlyBirdTuition: 650,
    earlyBirdDate: "December 27th",
};

export default function YogaNidraPage() {
    return (
        <CoursePage
            title="Yoga Nidra — Levels 1 & 2"
            subtitle="An important practice for modern times"
            dates="Next Course Dates TBD"
            heroImage="/images-in-use/05.jpg"
            imageTwo="/images-in-use/19.jpg"
            imageThree="/images-in-use/35.jpg"
            whoIsThisFor={whoIsThisFor}
            curriculum={curriculum}
            teachers={teachers}
            investment={investment}
            paymentDepositLink="#"
            paymentFullLink="#"
            ceCredits="45 Hours"
        />
    )
} 