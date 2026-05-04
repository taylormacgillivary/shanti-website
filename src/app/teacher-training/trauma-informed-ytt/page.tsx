import { CoursePage } from "@/components/course-page";
import { CheckCircle } from "lucide-react";

const whoIsThisFor = [
    {
        icon: <CheckCircle className="h-8 w-8 text-sage-green" />,
        text: "Do you want to create safer, more welcoming spaces for all students in your yoga classes?",
    },
    {
        icon: <CheckCircle className="h-8 w-8 text-sage-green" />,
        text: "Are you unsure how to hold space for students with different lived experiences, identities, and needs?",
    },
    {
        icon: <CheckCircle className="h-8 w-8 text-sage-green" />,
        text: "Do you want practical tools for making your cueing, language, and class structure more choice-based and inclusive?",
    },
    {
        icon: <CheckCircle className="h-8 w-8 text-sage-green" />,
        text: "Are you interested in how trauma-informed teaching intersects with anti-oppression and social justice values?",
    }
];

const learningOutcomes = [
    "Craft and deliver trauma-informed class environments that foster choice, safety, and connection",
    "Cue asana, pranayama, and meditation practices in a way that respects autonomy and minimizes triggers",
    "Recognize the importance of identity, and intersectionality (including 2SLGBTQQIA++, Disabled, and BIPOC identities) in holding inclusive space",
    "Reflect on scope of practice and build trauma-informed boundaries"
];

const curriculum = [
    {
        title: "What You'll Learn",
        content: [
            "This immersive training offers yoga teachers practical tools to create safer, more inclusive, and trauma-informed spaces.",
            "Through a blend of discussion, embodied practice, and collaborative learning, participants will explore how trauma, identity, and power dynamics show up in yoga environments, and how to skillfully respond with care, respect, and integrity.",
            "Whether you're new to trauma-informed approaches or looking to deepen your understanding, this course will equip you with language, frameworks, and embodied experience to support diverse student needs more effectively.",
        ]
    },
    {
        title: "Course Format",
        content: [
            "Immersive 6-hour training combining discussion, embodied practice, and collaborative learning",
            "Practical tools and frameworks for creating trauma-informed spaces",
            "Exploration of how trauma, identity, and power dynamics manifest in yoga environments",
            "Interactive sessions with opportunities for practice and feedback",
        ]
    }
];

const teachers = [
    {
        name: "Maeka Wright",
        title: "Osteopath, Yoga Therapist\nDOMP C-IAYT",
        bio: "Maeka (they/them) is an osteopath and yoga therapist living and working on the South Shore of Nova Scotia. They are passionate about creating inclusive yoga spaces by inviting participants to move from the place they are at with presence, honesty and a healthy dose of humour. As a life long student of yoga with over 25 years of personal practice and thousands of hours of training, Maeka enjoys sharing their knowledge and experience while giving thanks to the lineage of teachers in this practice that originated in ancient India.",
        image: "/images-in-use/teachers-used/maeka.jpeg",
        hideFullBioLink: true
    }
];

const investment = {
    deposit: 85,
    tuition: 285,
};

export default function TraumaInformedYTTPage() {
    return (
        <CoursePage
            title="Creating Safer Yoga Spaces: A Trauma-Informed Approach"
            subtitle="Practical tools for yoga teachers to create more inclusive, trauma-informed spaces"
            dates="June 20th, 2026 • 1-7pm"
            heroImage="/images-in-use/13.jpg"
            imageTwo="/images-in-use/39.jpg"
            imageThree="/images-in-use/21.jpg"
            whoIsThisFor={whoIsThisFor}
            learningOutcomes={learningOutcomes}
            curriculum={curriculum}
            curriculumTitle="Course Overview"
            teachers={teachers}
            investment={investment}
            paymentDepositLink="https://clients.mindbodyonline.com/classic/ws?studioid=11233&stype=-7"
            paymentFullLink="https://clients.mindbodyonline.com/classic/ws?studioid=11233&stype=-7"
            paymentDepositText="Register Now"
            paymentFullText="Register Now"
            showDepositOnly={true}
        />
    )
}

