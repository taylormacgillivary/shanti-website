import { type NavItem } from "@/types";

export const siteConfig = {
    name: "Shanti Hot Yoga",
    description: "A hot yoga studio in your neighborhood.",
    url: "https://shantihotyoga.com",
    ogImage: "https://shantihotyoga.com/og.jpg",
    links: {
        twitter: "https://twitter.com/shantihotyoga",
        facebook: "https://facebook.com/shantihotyoga",
    },
    mainNav: [
        {
            title: "Schedule",
            href: "/schedule",
        },
        {
            title: "Membership",
            href: "/memberships",
        },
        {
            title: "Retreats",
            href: "/retreats",
        },
    ] satisfies NavItem[],
    studiosNav: [
        {
            title: "Teachers",
            href: "/teachers",
            description: "Meet our experienced yoga instructors.",
        },
        {
            title: "Workshops & Events",
            href: "/workshops",
            description: "Special workshops and upcoming events.",
            featured: true,
            image: "/Alexa-Photos/03.jpg",
        },
        {
            title: "Energy Exchange",
            href: "/energy-exchange",
            description: "Practice yoga in exchange for your time.",
        },
        {
            title: "About Us",
            href: "/about",
            description: "Learn more about our story and mission.",
        },
        {
            title: "Shanti Online",
            href: "/shanti-online",
            description: "Your virtual yoga studio.",
        },
        {
            title: "Contact",
            href: "/contact",
            description: "Get in touch with any of our locations.",
        }
    ] satisfies NavItem[],
    teacherTrainingNav: [
        {
            title: "YTT 200 Hour",
            href: "/teacher-training/ytt-200-hour",
            description: "Our foundational yoga teacher training program.",
        },
        {
            title: "Teaching Mentorship",
            href: "/teacher-training/mentorship-program",
            description: "Receive guidance and feedback to grow as a teacher.",
        },
        {
            title: "Yin Yoga",
            href: "/teacher-training/yin-teacher-training",
            description: "Deepen your practice and learn to teach yin yoga.",
        },
        {
            title: "Yoga Nidra",
            href: "/teacher-training/yoga-nidra",
            description: "Learn to guide the ancient practice of yogic sleep.",
        },
        {
            title: "Vinyasa Krama",
            href: "/teacher-training/vinyasa-krama",
            description: "The Integration of Movement, Prana & Sequencing.",
        },
        {
            title: "Kundalini Yoga",
            href: "/teacher-training/kundalini-yoga",
            description: "Uncover your full potential to Teach, to Practice, to Live.",
        },
        {
            title: "Chair Yoga",
            href: "/teacher-training/chair-yoga-teacher-training",
            description: "Learn to teach accessible yoga for all mobilities.",
        },
        {
            title: "Pranayama Yoga",
            href: "/teacher-training/pranayama-yoga-teacher-training",
            description: "Explore the power of breath in your practice.",
        },
        {
            title: "Myofascial Release",
            href: "/teacher-training/myofascial-release",
            description: "Dive into the web-like connective tissue that wraps every muscle, organ, and bone.",
        },
    ] satisfies NavItem[],
}; 