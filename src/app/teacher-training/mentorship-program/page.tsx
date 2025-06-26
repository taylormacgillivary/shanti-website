import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { PageHero } from "@/components/page-hero";

const continuingGrowthItems = [
    "Have you graduated from a 200 hour teaching training program full of knowledge but lacking confidence in stepping into the teaching roll?",
    "Are you looking for more specific feedback on your yoga classes than your current students and peers are offering?",
    "Would you like guided mentorship on teaching with intention and sequencing that offers the most to all the students who show up to your classes?",
    "Are you ready to find your authentic voice as a yoga teacher?",
    "Peer feedback and support",
];

const programSupportItems = [
    "Recognizing that your nerves mean you care about your students and supporting you with strategies to speak confidently",
    "Finding your unique voice and teaching from the place where you connect to and are inspired and supported by your yoga practice",
    "Using intention to guide sequencing, cueing and theming",
    "Creating systems for class planning that will not lead to burnout",
];

const programIncludesItems = [
    "1 virtual call with the mentorship group",
    "3 teaching opportunities for 1-hour classes across the 3 Shanti studios (Bedford, Dartmouth, Halifax)",
    "Mentor review of sequences for 3 classes with feedback before classes",
    "Verbal and written feedback from mentor after each class with actionable comments on language, cueing, timing, etc.",
    "Peer feedback and support",
];

export default function MentorshipProgramPage() {
    return (
        <div className="bg-stone-50 text-stone-800">
            {/* Hero Section */}
            <div className="relative bg-cover bg-center" style={{ backgroundImage: "url('/images-in-use/03.jpg')" }}>
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative">
                    <PageHero
                        title="Teaching Mentorship Program"
                        subtitle="The path from graduating with a 200 hour teaching certificate to comfortably guiding students through their yoga practice can be an uncertain one."
                        badge="August 2025"
                    />
                </div>
            </div>

            <section className="py-16 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-12">
                            <div>
                                <h2 className="text-3xl font-bold text-stone-900 mb-6">Continuing Growth</h2>
                                <ul className="space-y-4">
                                    {continuingGrowthItems.map((item, index) => (
                                        <li key={index} className="flex items-start">
                                            <CheckCircle className="h-6 w-6 text-sage-green mr-4 mt-1 flex-shrink-0" />
                                            <span className="text-stone-700 text-lg">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold text-stone-900 mb-6">Our Mentorship Program Supports You By:</h2>
                                <ul className="space-y-4">
                                    {programSupportItems.map((item, index) => (
                                        <li key={index} className="flex items-start">
                                            <CheckCircle className="h-6 w-6 text-sage-green mr-4 mt-1 flex-shrink-0" />
                                            <span className="text-stone-700 text-lg">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div>
                                <h2 className="text-3xl font-bold text-stone-900 mb-6">Your Program Includes:</h2>
                                <ul className="space-y-4">
                                    {programIncludesItems.map((item, index) => (
                                        <li key={index} className="flex items-start">
                                            <CheckCircle className="h-6 w-6 text-sage-green mr-4 mt-1 flex-shrink-0" />
                                            <span className="text-stone-700 text-lg">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <aside className="space-y-8">
                             <div className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="flex flex-col items-center text-center">
                                    <Image
                                        src="/images-in-use/teachers-used/stephanie-morton.jpg"
                                        alt="Stephanie Morton"
                                        width={120}
                                        height={120}
                                        className="rounded-full mb-4"
                                    />
                                    <h3 className="text-xl font-bold">Stephanie Morton</h3>
                                    <p className="text-sage-green font-semibold">Mentorship Program Lead</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                                <Image
                                    src="/images-in-use/24.jpg"
                                    alt="Yoga class"
                                    width={400}
                                    height={250}
                                    className="rounded-lg mb-4"
                                />
                                <blockquote className="text-lg italic text-stone-600 border-l-4 border-sage-green pl-4">
                                    &quot;Our mentorship program supports you in real time as you step into your yoga teaching career, leading studio classes and receiving concrete and actionable feedback.&quot;
                                </blockquote>
                                <p className="mt-4 font-semibold">— Uriel MacGillivary, Teacher Training Lead and Shanti Yoga Founder</p>
                            </div>

                            <div className="bg-white p-8 rounded-lg shadow-lg text-center sticky top-24">
                                <h3 className="text-2xl font-bold">Investment</h3>
                                <p className="text-5xl font-extrabold text-sage-green my-4">$695</p>
                                <Button asChild size="lg" className="mt-6 w-full gradient-sage hover:opacity-90 text-white">
                                    <a href="mailto:info@shantihotyoga.ca?subject=Mentorship Program Inquiry">Inquire Here</a>
                                </Button>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    );
} 