import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { Award, ShieldCheck } from "lucide-react";

interface Teacher {
    name: string;
    title: string;
    bio: string;
    image: string;
}

interface Module {
    title: string;
    duration?: string;
    content: string[];
}

interface Faq {
    question: string;
    answer: string;
}

interface Investment {
    deposit: number;
    tuition: number;
    earlyBirdTuition?: number;
    earlyBirdDate?: string;
    graduateTuition?: number;
    graduateEarlyBirdTuition?: number;
}

interface WhoIsThisFor {
    icon: ReactNode;
    text: string;
}

interface CoursePageProps {
    title: string;
    subtitle: string;
    dates: string;
    quote?: string;
    heroImage: string;
    imageTwo?: string;
    imageThree?: string;
    infoPackageLink?: string;
    whoIsThisFor?: WhoIsThisFor[];
    learningOutcomes?: string[];
    curriculum: Module[];
    teachers: Teacher[];
    faqs?: Faq[];
    investment: Investment;
    paymentDepositLink: string;
    paymentFullLink: string;
    ceCredits?: string;
    isYogaAlliance?: boolean;
}

export function CoursePage({
    title,
    subtitle,
    dates,
    quote,
    heroImage,
    imageTwo,
    imageThree,
    infoPackageLink,
    whoIsThisFor,
    learningOutcomes,
    curriculum,
    teachers,
    faqs,
    investment,
    paymentDepositLink,
    paymentFullLink,
    ceCredits,
    isYogaAlliance,
}: CoursePageProps) {
    const renderBadges = () => {
        if (!ceCredits && !isYogaAlliance) return null;
        return (
            <div className="flex flex-wrap justify-center items-center gap-4 mt-12">
                {ceCredits && (
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 font-semibold py-2 px-4 rounded-full">
                        <Award className="h-5 w-5" />
                        <span>{ceCredits} CE Credits</span>
                    </div>
                )}
                {isYogaAlliance && (
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 font-semibold py-2 px-4 rounded-full">
                        <ShieldCheck className="h-5 w-5" />
                        <span>Yoga Alliance Certified</span>
                    </div>
                )}
            </div>
        )
    }
    
    return (
        <div className="bg-stone-50 text-stone-800">
            {/* Hero Section */}
            <div className="relative h-[70vh] min-h-[500px]">
                <Image
                    src={heroImage}
                    alt={title}
                    fill
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="container mx-auto p-8 text-white">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight !leading-tight">
                            {title}
                        </h1>
                        <p className="mt-4 text-xl sm:text-2xl max-w-2xl">
                            {subtitle}
                        </p>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="mt-4 inline-block bg-[rgba(150,191,80,0.8)] backdrop-blur-sm text-white font-semibold py-2 px-4 rounded-lg">
                                {dates}
                            </div>
                        </div>
                        {quote &&
                            <p className="mt-4 text-lg sm:text-xl font-light italic max-w-2xl">
                                {quote}
                            </p>
                        }
                    </div>
                </div>
            </div>

            {whoIsThisFor && whoIsThisFor.length > 0 && (
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
                        {infoPackageLink &&
                            <div className="text-center mt-12">
                                <Button asChild size="lg" className="gradient-sage hover:opacity-90 text-white shadow-lg">
                                    <Link href={infoPackageLink}>Download Info Package</Link>
                                </Button>
                            </div>
                        }
                    </div>
                </section>
            )}

            {imageTwo && (
                <div className="h-[40vh] min-h-[300px] w-full">
                     <Image
                        src={imageTwo}
                        alt={title}
                        width={1800}
                        height={600}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {learningOutcomes && learningOutcomes.length > 0 && (
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
                        {renderBadges()}
                    </div>
                </section>
            )}

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
                    {(!learningOutcomes || learningOutcomes.length === 0) && renderBadges()}
                </div>
            </section>

            {imageThree && (
                <div className="h-[40vh] min-h-[300px] w-full">
                     <Image
                        src={imageThree}
                        alt={title}
                        width={1800}
                        height={600}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* Teachers Section */}
            <section className="pb-24 pt-16 sm:pt-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900">Meet Your Teachers</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 items-start">
                        {teachers.map((teacher, index) => (
                             <div key={index} className="flex flex-col sm:flex-row items-start gap-6">
                                <div className="flex-shrink-0 relative w-[150px] h-[150px]">
                                    <Image src={teacher.image} alt={teacher.name} fill className="rounded-full object-cover" />
                                 </div>
                                 <div className="flex-grow">
                                     <h3 className="text-2xl font-bold">{teacher.name}</h3>
                                     <p className="text-sage-green font-semibold mb-2">{teacher.title}</p>
                                     <Accordion type="single" collapsible>
                                        <AccordionItem value="item-1" className="border-none">
                                            <AccordionTrigger className="text-stone-600 hover:no-underline justify-start gap-2 py-1 [&[data-state=open]>svg]:rotate-180">
                                                Read bio
                                            </AccordionTrigger>
                                            <AccordionContent className="text-stone-600">
                                                {teacher.bio}
                                            </AccordionContent>
                                        </AccordionItem>
                                     </Accordion>
                                 </div>
                             </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Investment Section */}
            <section className="bg-white py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900">Investment</h2>
                    </div>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                         <div className="w-full md:w-1/3 p-8 bg-stone-100 rounded-lg shadow-lg text-center">
                             <h3 className="text-2xl font-bold">Deposit</h3>
                             <p className="text-5xl font-extrabold text-sage-green my-4">${investment.deposit}</p>
                             <p className="text-stone-600">Secure your spot in the training.</p>
                             <Button asChild size="lg" className="mt-6 w-full gradient-sage hover:opacity-90 text-white">
                                 <Link href={paymentDepositLink}>Pay Deposit</Link>
                             </Button>
                         </div>
                         <div className="w-full md:w-1/3 p-8 bg-stone-100 rounded-lg shadow-lg text-center">
                             <h3 className="text-2xl font-bold">Full Tuition</h3>
                             <p className="text-5xl font-extrabold text-sage-green my-4">
                                 ${investment.earlyBirdTuition ? investment.earlyBirdTuition : investment.tuition}
                             </p>
                             {investment.earlyBirdTuition && 
                                <p className="text-stone-600">
                                    Early bird pricing until {investment.earlyBirdDate}. Regular price ${investment.tuition}.
                                </p>
                             }
                             {investment.graduateTuition &&
                                <p className="text-stone-600 mt-2 text-sm">
                                    Shanti Grad Price: ${investment.graduateEarlyBirdTuition ? investment.graduateEarlyBirdTuition : investment.graduateTuition}
                                </p>
                             }
                             <Button asChild size="lg" className="mt-6 w-full gradient-sage hover:opacity-90 text-white">
                                 <Link href={paymentFullLink}>Pay Full Tuition</Link>
                             </Button>
                         </div>
                    </div>
                    <div className="text-center mt-8 text-stone-600">
                        <p>The deposit is not refundable. Refunds (excluding the deposit amount) are available up to 30 days prior to the beginning of training.</p>
                        <p>Full payment is due and will be processed 30 days before training begins.</p>
                    </div>
                </div>
            </section>

            {faqs && faqs.length > 0 && (
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
            )}
        </div>
    );
} 