import { GraduationCap, BookOpen, Star, Award } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const whoIsThisFor = [
    {
        icon: <GraduationCap className="h-8 w-8 text-sage-green" />,
        text: "Teachers who want to grow their career path with a designation higher than the industry requirement of 200 hours.",
    },
    {
        icon: <Star className="h-8 w-8 text-sage-green" />,
        text: "Yoga teachers looking to increase their confidence and remove self-doubts through advanced study.",
    },
    {
        icon: <BookOpen className="h-8 w-8 text-sage-green" />,
        text: "Practitioners wanting to explore specialized areas of interest and deepen their technical skills.",
    },
    {
        icon: <Award className="h-8 w-8 text-sage-green" />,
        text: "Teachers seeking to enhance their connection to the roots of Yoga through advanced training.",
    }
];

const learningOutcomes = [
    "Build on your 200-hour foundational training with 300 hours of additional specialized study",
    "Gain certification as a 500-hour Yoga Alliance Teacher upon completion",
    "Develop deeper technical skills and confidence in your teaching practice",
    "Explore specialized areas of yoga that align with your interests and teaching style",
    "Connect more deeply with the traditional roots and philosophy of yoga",
    "Complete the program at your own pace over a maximum of four years"
];

const curriculum = [
    {
        title: "Program Structure",
        duration: "300 HOURS",
        content: [
            "The 300 hours of training is a series of weekend teacher training workshops that can range from two to five days",
            "Workshops can also qualify for continuing education credits",
            "You can complete the 300 hours of training at your own pace up to a maximum of four years",
            "Students interested in fast-tracking their completion to twenty-four months should note that we can't guarantee all courses will be available within that timeframe",
            "Completion date depends on faculty availability and course curriculum changes",
            "A minimum of eight participants is required to facilitate a course"
        ]
    },
    {
        title: "Available Courses",
        duration: "CHOOSE FROM",
        content: [
            "Kundalini Yoga - Uncover your full potential to Teach, to Practice, to Live",
            "Vinyasa Krama - The Integration of Movement, Prana & Sequencing",
            "Yin Yoga - A 75-Hour Comprehensive Course",
            "Yoga Nidra - Learn to guide the ancient practice of yogic sleep (Levels 1 & 2)",
            "Chair Yoga - Learn to teach accessible yoga for all mobilities",
            "Pranayama Yoga - Explore the power of breath in your practice",
            "Myofascial Release - Dive into the web-like connective tissue that wraps every muscle, organ, and bone"
        ]
    },
    {
        title: "Prerequisites",
        duration: "",
        content: [
            "Students must have a 200-hour yoga teaching certificate from a Yoga Alliance approved school",
            "It's not necessary to be a graduate of the Shanti Hot Yoga 200-hour teacher training to register for the 500-hour certification",
            "All individual courses can be taken as standalone modules without committing to the entire program"
        ]
    },
    {
        title: "Program Benefits",
        duration: "",
        content: [
            "Advanced study increases your confidence as a teacher and removes self-doubts",
            "Opens doors to specialized areas of interest",
            "Gives you a deeper set of technical skills",
            "Enhances your connection to the roots of Yoga",
            "Provides the highest level of yoga teacher certification recognized by Yoga Alliance",
            "Flexible scheduling allows you to balance training with your current teaching and personal commitments"
        ]
    }
];

const faqs = [
    {
        question: "What are the prerequisites for the 500-hour program?",
        answer: "Students must have a 200-hour yoga teaching certificate from a Yoga Alliance approved school. It's not necessary to be a graduate of the Shanti Hot Yoga 200-hour teacher training to register for the 500-hour certification."
    },
    {
        question: "How long do I have to complete the program?",
        answer: "You can complete the 300 hours of training at your own pace up to a maximum of four years. Students interested in fast-tracking their completion to twenty-four months should note that we can't guarantee all courses will be available within that timeframe."
    },
    {
        question: "Can I take individual courses without committing to the full program?",
        answer: "Yes! Individuals can take any of these courses as a module on its own without committing or registering for the entire program."
    },
    {
        question: "What happens if a course doesn't have enough participants?",
        answer: "A minimum of eight participants is required to facilitate a course. If there are fewer than eight participants, a full refund will be provided and the course will be rescheduled."
    },
    {
        question: "Will I be certified by Yoga Alliance?",
        answer: "Yes, upon completion of the 300 additional hours (combined with your existing 200-hour certification), you will be certified as a 500-hour Yoga Alliance Teacher."
    }
];

// Custom Investment Section for 500-Hour Program
const CustomInvestmentSection = () => {
    return (
        <section className="bg-white py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900">Investment</h2>
                </div>
                <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                    <div className="w-full md:w-1/2 p-8 bg-stone-100 rounded-lg shadow-lg text-center">
                        <h3 className="text-2xl font-bold">Program Registration</h3>
                        <p className="text-5xl font-extrabold text-sage-green my-4">$175</p>
                        <p className="text-stone-600 mb-4">Registration fee covers print materials</p>
                        <p className="text-stone-600 text-sm mb-6">All course fees are separate investments</p>
                        <Button asChild size="lg" className="mt-6 w-full gradient-sage hover:opacity-90 text-white">
                            <Link href="#">Register for Program</Link>
                        </Button>
                    </div>
                    <div className="w-full md:w-1/2 p-8 bg-gradient-to-br from-sage-green/10 to-sage-green/5 rounded-lg shadow-lg text-center border-2 border-sage-green/20">
                        <h3 className="text-2xl font-bold">Individual Courses</h3>
                        <p className="text-3xl font-extrabold text-sage-green my-4">Varies</p>
                        <p className="text-stone-600 mb-4">Each course has its own pricing</p>
                        <p className="text-stone-600 text-sm mb-6">Can be taken individually or as part of the 500-hour program</p>
                        <Button asChild size="lg" variant="outline" className="mt-6 w-full border-sage-green text-sage-green hover:bg-sage-green/10">
                            <Link href="#courses">View Course Pricing</Link>
                        </Button>
                    </div>
                </div>
                <div className="text-center mt-8 text-stone-600 max-w-3xl mx-auto">
                    <p className="mb-2">The registration fee is not refundable. You can complete the 300 hours of training at your own pace up to a maximum of four years.</p>
                    <p>Each individual course can be taken as a standalone module without committing to the entire program.</p>
                </div>
            </div>
        </section>
    );
};

// Custom component for course links
const CourseLinks = () => {
    const courses = [
        { title: "Kundalini Yoga", href: "/teacher-training/kundalini-yoga" },
        { title: "Vinyasa Krama", href: "/teacher-training/vinyasa-krama" },
        { title: "Yin Yoga", href: "/teacher-training/yin-teacher-training" },
        { title: "Yoga Nidra", href: "/teacher-training/yoga-nidra" },
        { title: "Chair Yoga", href: "/teacher-training/chair-yoga-teacher-training" },
        { title: "Pranayama Yoga", href: "/teacher-training/pranayama-yoga-teacher-training" },
        { title: "Myofascial Release", href: "/teacher-training/myofascial-release" }
    ];

    return (
        <section id="courses" className="py-16 bg-gradient-to-b from-muted/30 to-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Available Courses</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Choose from our specialized teacher training courses to build your 300-hour advanced certification.
                        Each course can be taken individually or as part of your 500-hour journey.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {courses.map((course, index) => (
                        <Button
                            key={index}
                            asChild
                            variant="outline"
                            className="h-auto p-6 text-left justify-start hover:bg-sage-green/10 hover:border-sage-green transition-all duration-200"
                        >
                            <Link href={course.href}>
                                <div className="flex items-center gap-3">
                                    <BookOpen className="h-5 w-5 text-sage-green flex-shrink-0" />
                                    <span className="font-medium">{course.title}</span>
                                </div>
                            </Link>
                        </Button>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <p className="text-sm text-muted-foreground">
                        Click on any course above to learn more about the specific training details, dates, and investment.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default function YTT500HourPage() {
    return (
        <div className="bg-stone-50 text-stone-800">
            {/* Hero Section */}
            <div className="relative h-[70vh] min-h-[500px]">
                <Image
                    src="/images-in-use/05.jpg"
                    alt="YTT 500 Hour Advanced Certification"
                    fill
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="container mx-auto p-8 text-white">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight !leading-tight">
                            YTT 500 Hour Advanced Certification
                        </h1>
                        <p className="mt-4 text-xl sm:text-2xl max-w-2xl">
                            Advanced study for teachers who want to grow their career path with a designation higher than the industry requirement of 200 hours.
                        </p>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="mt-4 inline-block bg-[rgba(150,191,80,0.8)] backdrop-blur-sm text-white font-semibold py-2 px-4 rounded-lg">
                                Flexible Timeline - Complete at Your Own Pace
                            </div>
                        </div>
                        <p className="mt-4 text-lg sm:text-xl font-light italic max-w-2xl">
                            &ldquo;The study of Yoga is vast and endless&rdquo;
                        </p>
                    </div>
                </div>
            </div>

            {/* Who Is This For Section */}
            <section className="py-16 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900">
                            Is This Transformational Journey For You?
                        </h2>
                        <p className="mt-4 text-lg text-stone-600 max-w-3xl mx-auto">This program is for the person ready to make lasting change in their personal life. If any of these things are calling to you, keep reading.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {whoIsThisFor.map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-start space-x-4">
                                <div className="flex-shrink-0">{item.icon}</div>
                                <p className="text-stone-700">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Image Two */}
            <div className="h-[40vh] min-h-[300px] w-full">
                <Image
                    src="/images-in-use/12.jpg"
                    alt="YTT 500 Hour Advanced Certification"
                    width={1800}
                    height={600}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Learning Outcomes Section */}
            <section className="py-16 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900">
                            Learning Outcomes
                        </h2>
                        <p className="mt-4 text-lg text-stone-600 max-w-3xl mx-auto">Upon completing this training, you will have gained the following skills and knowledge.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {learningOutcomes.map((item, index) => (
                            <div key={index} className="flex items-start space-x-4">
                                <div className="flex-shrink-0 text-sage-green mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M20 6 9 17l-5-5"></path></svg>
                                </div>
                                <p className="text-stone-700 text-lg">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Curriculum Section */}
            <section className="py-16 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900">
                            Course Curriculum
                        </h2>
                        <p className="mt-4 text-lg text-stone-600 max-w-3xl mx-auto">This training covers a wide range of topics to deepen your understanding and practice.</p>
                    </div>
                    <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                        {curriculum.map((module, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border-b-2 border-stone-200">
                                <AccordionTrigger className="text-xl sm:text-2xl font-semibold text-stone-800 hover:text-sage-green py-6 text-left">
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sage-green font-bold">{`0${index + 1}`}</span>
                                        <span>{module.title}</span>
                                    </div>
                                    {module.duration && <span className="text-base font-normal text-stone-500">{module.duration}</span>}
                                </AccordionTrigger>
                                <AccordionContent className="pt-4 pb-8 text-base text-stone-700">
                                    <ul className="list-disc list-inside space-y-3 pl-4">
                                        {module.content.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            {/* Image Three */}
            <div className="h-[40vh] min-h-[300px] w-full">
                <Image
                    src="/images-in-use/20.jpg"
                    alt="YTT 500 Hour Advanced Certification"
                    width={1800}
                    height={600}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Custom Investment Section */}
            <CustomInvestmentSection />

            {/* Course Links Section */}
            <CourseLinks />

            {/* FAQs Section */}
            <section className="pb-24 pt-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900">Frequently Asked Questions</h2>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border-b-2 border-stone-200">
                                <AccordionTrigger className="text-xl font-semibold text-stone-800 hover:text-sage-green py-5 text-left">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="pt-2 pb-6 text-base text-stone-700">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>
        </div>
    );
} 