import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

export default function ShortCECoursesPage() {
  const courses = [
    {
      id: "chanting-mantras-sanskrit",
      name: "Chanting | Mantras | Sanskrit",
      description: "Sacred sounds and ancient language in yoga practice"
    },
    {
      id: "yoga-in-action",
      name: "Yoga In Action",
      description: "Bringing yoga principles into daily life"
    },
    {
      id: "meditation",
      name: "The Art of Presence",
      description: "Exploring meditation techniques for stillness and presence"
    },
    {
      id: "advanced-asana",
      name: "Advanced Asana Practice",
      description: "Exploring advanced yoga postures"
    },
    {
      id: "beating-burnout",
      name: "Beating Burnout",
      description: "Using yoga to prevent and recover from burnout"
    },
    {
      id: "development-promotion",
      name: "Development & Promotion",
      description: "Growing your yoga teaching career"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-background via-background to-muted overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4 bg-sage-green/10 text-sage-green border-sage-green/20">
              NEW! Continuing Education
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Sangha |{" "}
              <span className="gradient-sage-text">
                Community
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Sangha signifies a community of practitioners, a group of people who share a common spiritual path or practice. 
              It emphasizes the idea of a group united by shared beliefs and practices.
            </p>
            <p className="text-xl text-muted-foreground mb-8">
              These focused continuing education courses are designed for our 300-hour trainees, offering 4 CE credits each and 
              creating greater community among our students. We&apos;re fortunate to draw from teachers with diverse interests and 
              experience - join us for one or all 6 half-day courses.
            </p>
            
            {/* Course Bundle Box */}
            <div className="bg-sage-green/10 rounded-lg p-6 border border-sage-green/30 max-w-md mx-auto mb-8">
              <h3 className="font-semibold text-lg mb-3 text-center text-sage-green">Course Bundle</h3>
              <div className="text-center">
                <p className="text-foreground/90 text-lg">All 6 courses: <span className="font-bold text-sage-green">$825+tax</span></p>
                <p className="text-muted-foreground text-sm mt-1">Individual courses: $225+tax each</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Tabs Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <Tabs defaultValue={courses[0].id} className="w-full max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8 h-auto gap-2 p-2 bg-muted/50">
              {courses.map((course) => (
                <TabsTrigger 
                  key={course.id} 
                  value={course.id}
                  className="text-xs md:text-sm p-2 md:p-3 whitespace-normal text-center min-h-[60px] flex items-center justify-center"
                >
                  {course.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {courses.map((course) => (
              <TabsContent key={course.id} value={course.id} className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{course.name}</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {course.description}
                  </p>
                </div>

                {course.id === "chanting-mantras-sanskrit" ? (
                  <>
                    {/* Chanting Course Content */}
                    <div className="grid lg:grid-cols-3 gap-8 items-start">
                      {/* Main Description */}
                      <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white/50 rounded-lg p-6 border border-sage-green/20">
                          <p className="text-lg leading-relaxed text-foreground/90 mb-6">
                            Join <strong>Andrea Gracia</strong> for a deep dive into the sounds of yoga: Mantras, Chanting, Sanskrit study and more.
                          </p>
                          
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-lg mb-2 text-sage-green">Mantras</h4>
                              <p className="text-foreground/90 leading-relaxed">
                                Sacred sound formulas that serve as tools for meditation and transformation. Learn the power of repetitive chanting to focus the mind, connect with deeper states of consciousness, and create energetic shifts in your practice and teaching.
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-lg mb-2 text-sage-green">Chanting</h4>
                              <p className="text-foreground/90 leading-relaxed">
                                The practice of vocal devotion that opens the heart and creates community. Discover how group chanting can build connection in your classes, enhance the spiritual dimension of yoga, and provide students with accessible meditation techniques.
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-lg mb-2 text-sage-green">Sanskrit Study</h4>
                              <p className="text-foreground/90 leading-relaxed">
                                The ancient language of yoga that deepens understanding and authenticity in teaching. Gain confidence in pronunciation, learn the meanings behind common yoga terms, and understand how proper Sanskrit usage honors the tradition while making it accessible to students.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Course Details Card */}
                      <div className="lg:col-span-1">
                        <div className="bg-sage-green/10 rounded-lg p-6 border border-sage-green/30 sticky top-24">
                          <h3 className="text-xl font-semibold mb-6 text-center">Course Details</h3>
                          
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-sage-green rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="font-medium text-foreground">Date</p>
                                <p className="text-muted-foreground">November 1st, 2025</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-sage-green rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="font-medium text-foreground">Time</p>
                                <p className="text-muted-foreground">1:00-5:00pm</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-sage-green rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="font-medium text-foreground">Cost</p>
                                <p className="text-muted-foreground">$225+tax</p>
                                <p className="text-muted-foreground font-semibold text-sage-green">6 course bundle: $825+tax</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-sage-green rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="font-medium text-foreground">CE Credits</p>
                                <p className="text-muted-foreground">4 hours</p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 pt-4 border-t border-sage-green/20">
                            <a 
                              href="/contact"
                              className="w-full inline-flex items-center justify-center rounded-md bg-sage-green text-white font-medium px-4 py-3 hover:bg-sage-green/90 transition-colors"
                            >
                              Register
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Teacher Bio Section */}
                    <div className="bg-gradient-to-r from-sage-green/5 to-sage-green/10 rounded-lg p-8 border border-sage-green/20">
                      <h3 className="text-2xl font-semibold mb-6 text-center">Meet Your Instructor</h3>
                      
                      <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="flex-shrink-0 mx-auto md:mx-0">
                          <Image
                            src="/images-in-use/teachers-used/andrea-gracia.jpg"
                            alt="Andrea Gracia"
                            width={200}
                            height={200}
                            className="rounded-lg object-cover object-bottom"
                            style={{ height: '200px', width: '200px' }}
                          />
                        </div>
                        
                        <div className="flex-1 text-center md:text-left">
                          <h4 className="text-xl font-semibold mb-3 text-sage-green">Andrea Gracia</h4>
                          <p className="text-foreground/90 leading-relaxed mb-4">
                            Andrea has been practicing yoga for over 10 years, beginning her journey in her homeland of México. 
                            She has witnessed firsthand how yoga transforms life in profound ways. Her studies have taken her to 
                            the banks of the Himalayas and to South India, where she trained in traditional Ashtanga Vinyasa 
                            with Saraswati Jois in Mysore.
                          </p>
                          <p className="text-foreground/90 leading-relaxed mb-4">
                            Andrea brings her rich experience from studying with teachers in México, Canada, and India to share 
                            the authentic sounds and sacred language of yoga with her students.
                          </p>
                          <Link 
                            href="/teachers#andrea-gracia"
                            className="inline-flex items-center text-sage-green hover:text-sage-green/80 font-medium transition-colors"
                          >
                            Read Andrea&apos;s full bio →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </>
                ) : course.id === "yoga-in-action" ? (
                  <>
                    {/* Yoga In Action Course Content */}
                    <div className="grid lg:grid-cols-3 gap-8 items-start">
                      {/* Main Description */}
                      <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white/50 rounded-lg p-6 border border-sage-green/20">
                          <p className="text-lg leading-relaxed text-foreground/90 mb-6">
                            <strong>Nikki Martin</strong> is passionate about moving yoga off the mat and beyond the studio walls. 
                            Join her in exploring how your yoga practice can move into action and activism in your community.
                          </p>
                          
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-lg mb-2 text-sage-green">Yoga Beyond the Mat</h4>
                              <p className="text-foreground/90 leading-relaxed">
                                Discover how the principles of yoga extend far beyond physical postures. Learn to apply concepts 
                                of ahimsa (non-violence), dharma (purpose), and seva (service) in your daily interactions and 
                                decision-making as both a practitioner and teacher.
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-lg mb-2 text-sage-green">Community Engagement</h4>
                              <p className="text-foreground/90 leading-relaxed">
                                Explore practical ways to bring yoga&apos;s transformative power into your community. From teaching 
                                in underserved populations to creating inclusive spaces, learn how to make yoga accessible 
                                and relevant to diverse communities.
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-lg mb-2 text-sage-green">Yoga as Activism</h4>
                              <p className="text-foreground/90 leading-relaxed">
                                Understand how personal transformation through yoga can lead to social transformation. Examine 
                                how conscious action, mindful consumption, and compassionate leadership can create positive 
                                change in the world around you.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Course Details Card */}
                      <div className="lg:col-span-1">
                        <div className="bg-sage-green/10 rounded-lg p-6 border border-sage-green/30 sticky top-24">
                          <h3 className="text-xl font-semibold mb-6 text-center">Course Details</h3>
                          
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-sage-green rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="font-medium text-foreground">Date</p>
                                <p className="text-muted-foreground">January 31st, 2026</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-sage-green rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="font-medium text-foreground">Time</p>
                                <p className="text-muted-foreground">1:00-5:00pm</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-sage-green rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="font-medium text-foreground">Cost</p>
                                <p className="text-muted-foreground">$225+tax</p>
                                <p className="text-muted-foreground font-semibold text-sage-green">6 course bundle: $825+tax</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-sage-green rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="font-medium text-foreground">CE Credits</p>
                                <p className="text-muted-foreground">4 hours</p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 pt-4 border-t border-sage-green/20">
                            <a 
                              href="/contact"
                              className="w-full inline-flex items-center justify-center rounded-md bg-sage-green text-white font-medium px-4 py-3 hover:bg-sage-green/90 transition-colors"
                            >
                              Register
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Teacher Bio Section */}
                    <div className="bg-gradient-to-r from-sage-green/5 to-sage-green/10 rounded-lg p-8 border border-sage-green/20">
                      <h3 className="text-2xl font-semibold mb-6 text-center">Meet Your Instructor</h3>
                      
                      <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="flex-shrink-0 mx-auto md:mx-0">
                          <Image
                            src="/images-in-use/teachers-used/nikki-martin.jpg"
                            alt="Nikki Martin"
                            width={200}
                            height={200}
                            className="rounded-lg object-cover"
                            style={{ height: '200px', width: '200px' }}
                          />
                        </div>
                        
                        <div className="flex-1 text-center md:text-left">
                          <h4 className="text-xl font-semibold mb-3 text-sage-green">Nikki Martin</h4>
                          <p className="text-foreground/90 leading-relaxed mb-4">
                            Nikki came to yoga in 2012, drawn by both the physical challenges and a desire to find peace and 
                            happiness in her life. She quickly discovered how yoga enriched all facets of her life, evolving 
                            from someone who loved arm balances and inversions to appreciating the mental, spiritual, and 
                            philosophical aspects of the practice.
                          </p>
                          <p className="text-foreground/90 leading-relaxed mb-4">
                            Her passion for moving yoga beyond the studio walls makes her the perfect guide for exploring 
                            how ancient yogic principles can create positive change in our communities and world.
                          </p>
                          <Link 
                            href="/teachers#nikki-martin"
                            className="inline-flex items-center text-sage-green hover:text-sage-green/80 font-medium transition-colors"
                          >
                            Read Nikki&apos;s full bio →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </>
                ) : course.id === "meditation" ? (
                  <>
                    {/* The Art of Presence Course Content */}
                    <div className="grid lg:grid-cols-3 gap-8 items-start">
                      {/* Main Description */}
                      <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white/50 rounded-lg p-6 border border-sage-green/20">
                          <p className="text-lg leading-relaxed text-foreground/90 mb-6">
                            Join <strong>Emilie Fabre</strong> in exploring meditation. Whether you have a meditation practice 
                            or are looking to establish one, Emilie will guide you through techniques that facilitate stillness and presence.
                          </p>
                          
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-lg mb-2 text-sage-green">Establishing Your Practice</h4>
                              <p className="text-foreground/90 leading-relaxed">
                                Learn foundational techniques for developing a consistent meditation practice. Discover how to 
                                create supportive conditions, work with common obstacles, and build sustainable habits that 
                                support both your personal growth and teaching skills.
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-lg mb-2 text-sage-green">Techniques for Stillness</h4>
                              <p className="text-foreground/90 leading-relaxed">
                                Explore various meditation approaches including breath awareness, body scanning, loving-kindness, 
                                and mindfulness practices. Gain confidence in guiding others through these techniques and 
                                understanding when different methods are most beneficial.
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-lg mb-2 text-sage-green">Cultivating Presence</h4>
                              <p className="text-foreground/90 leading-relaxed">
                                Understand how meditation deepens your capacity to be fully present in teaching and life. 
                                Learn to recognize and cultivate states of awareness that enhance your ability to hold space 
                                for students and respond skillfully to whatever arises.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Course Details Card */}
                      <div className="lg:col-span-1">
                        <div className="bg-sage-green/10 rounded-lg p-6 border border-sage-green/30 sticky top-24">
                          <h3 className="text-xl font-semibold mb-6 text-center">Course Details</h3>
                          
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-sage-green rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="font-medium text-foreground">Date</p>
                                <p className="text-muted-foreground">March 21st, 2026</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-sage-green rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="font-medium text-foreground">Time</p>
                                <p className="text-muted-foreground">1:00-4:00pm</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-sage-green rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="font-medium text-foreground">Cost</p>
                                <p className="text-muted-foreground">$225+tax</p>
                                <p className="text-muted-foreground font-semibold text-sage-green">6 course bundle: $825+tax</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-sage-green rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="font-medium text-foreground">CE Credits</p>
                                <p className="text-muted-foreground">4 hours</p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 pt-4 border-t border-sage-green/20">
                            <a 
                              href="/contact"
                              className="w-full inline-flex items-center justify-center rounded-md bg-sage-green text-white font-medium px-4 py-3 hover:bg-sage-green/90 transition-colors"
                            >
                              Register
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Teacher Bio Section */}
                    <div className="bg-gradient-to-r from-sage-green/5 to-sage-green/10 rounded-lg p-8 border border-sage-green/20">
                      <h3 className="text-2xl font-semibold mb-6 text-center">Meet Your Instructor</h3>
                      
                      <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="flex-shrink-0 mx-auto md:mx-0">
                          <Image
                            src="/images-in-use/teachers-used/emilie-fabre.jpg"
                            alt="Emilie Fabre"
                            width={200}
                            height={200}
                            className="rounded-lg object-cover"
                            style={{ height: '200px', width: '200px' }}
                          />
                        </div>
                        
                        <div className="flex-1 text-center md:text-left">
                          <h4 className="text-xl font-semibold mb-3 text-sage-green">Emilie Fabre</h4>
                          <p className="text-foreground/90 leading-relaxed mb-4">
                            Emilie completed her 200-hour Yoga Alliance certified teacher training in Edmonton in Fall 2009. 
                            She describes this transformative experience as being &quot;broken down into many pieces and re-sculpted,&quot; 
                            gaining new insight, perspective, and acceptance of who she is.
                          </p>
                          <p className="text-foreground/90 leading-relaxed mb-4">
                            Through her own journey of self-awareness, acceptance, and compassion, Emilie has cultivated a deep 
                            understanding of how meditation supports transformation. She brings this wisdom to guide others on 
                            their path toward stillness and presence.
                          </p>
                          <Link 
                            href="/teachers#emilie-fabre"
                            className="inline-flex items-center text-sage-green hover:text-sage-green/80 font-medium transition-colors"
                          >
                            Read Emilie&apos;s full bio →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </>
                ) : course.id === "advanced-asana" ? (
                  <>
                    {/* Advanced Asana Practice Course Content */}
                    <div className="grid lg:grid-cols-3 gap-8 items-start">
                      {/* Main Description */}
                      <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white/50 rounded-lg p-6 border border-sage-green/20">
                          <p className="text-lg leading-relaxed text-foreground/90 mb-6">
                            By &quot;Advanced&quot; Asana we present an opportunity to ask all those burning questions you&apos;ve always wondered 
                            in classes about how to deepen your experience in a posture. <strong>Kevin</strong> offers a wealth of 
                            knowledge and experience while creating a playful space to explore your postures, some familiar and 
                            others perhaps newer to your practice.
                          </p>
                          
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-lg mb-2 text-sage-green">Deepening Familiar Postures</h4>
                              <p className="text-foreground/90 leading-relaxed">
                                Explore the subtleties and refinements in poses you practice regularly. Learn how to access 
                                deeper layers of understanding through breath, alignment, and energetic awareness. Discover 
                                variations and modifications that can transform your relationship with foundational postures.
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-lg mb-2 text-sage-green">Exploring New Territories</h4>
                              <p className="text-foreground/90 leading-relaxed">
                                Step into postures that may be new to your practice with confidence and curiosity. Learn 
                                progressive approaches to challenging asanas, understanding the anatomical and energetic 
                                requirements while maintaining safety and playfulness in your exploration.
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-lg mb-2 text-sage-green">Questions & Understanding</h4>
                              <p className="text-foreground/90 leading-relaxed">
                                Bring all your burning questions about postures and receive expert guidance. Understand 
                                the &quot;why&quot; behind alignment cues, learn to troubleshoot common challenges, and develop 
                                the skills to guide students safely into deeper expressions of their practice.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Course Details Card */}
                      <div className="lg:col-span-1">
                        <div className="bg-sage-green/10 rounded-lg p-6 border border-sage-green/30 sticky top-24">
                          <h3 className="text-xl font-semibold mb-6 text-center">Course Details</h3>
                          
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-sage-green rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="font-medium text-foreground">Date</p>
                                <p className="text-muted-foreground">April 25th, 2026</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-sage-green rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="font-medium text-foreground">Time</p>
                                <p className="text-muted-foreground">1:00-5:00pm</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-sage-green rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="font-medium text-foreground">Cost</p>
                                <p className="text-muted-foreground">$225+tax</p>
                                <p className="text-muted-foreground font-semibold text-sage-green">6 course bundle: $825+tax</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-sage-green rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="font-medium text-foreground">CE Credits</p>
                                <p className="text-muted-foreground">4 hours</p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 pt-4 border-t border-sage-green/20">
                            <a 
                              href="/contact"
                              className="w-full inline-flex items-center justify-center rounded-md bg-sage-green text-white font-medium px-4 py-3 hover:bg-sage-green/90 transition-colors"
                            >
                              Register
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Teacher Bio Section */}
                    <div className="bg-gradient-to-r from-sage-green/5 to-sage-green/10 rounded-lg p-8 border border-sage-green/20">
                      <h3 className="text-2xl font-semibold mb-6 text-center">Meet Your Instructor</h3>
                      
                      <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="flex-shrink-0 mx-auto md:mx-0">
                          <Image
                            src="/images-in-use/teachers-used/kevin-dougall.jpg"
                            alt="Kevin Dougall"
                            width={200}
                            height={200}
                            className="rounded-lg object-cover"
                            style={{ height: '200px', width: '200px' }}
                          />
                        </div>
                        
                        <div className="flex-1 text-center md:text-left">
                          <h4 className="text-xl font-semibold mb-3 text-sage-green">Kevin Dougall</h4>
                          <p className="text-foreground/90 leading-relaxed mb-4">
                            A yoga nerd at heart, Kevin brings his genuine passion for yoga to every class. He started his 
                            yoga journey at Shanti in 2011 and has since trained with renowned teachers including Ryan Leier, 
                            Srivatsa Ramaswami (vinyasa krama), and Manju Jois (ashtanga).
                          </p>
                          <p className="text-foreground/90 leading-relaxed mb-4">
                            Kevin holds RYT 200 and RCYT (registered children&apos;s yoga teacher) certifications with Yoga Alliance. 
                            His dynamic style of practice is fun, inspirational, and deeply rooted in the core traditions of yoga, 
                            making him the perfect guide for advanced asana exploration.
                          </p>
                          <Link 
                            href="/teachers#kevin-dougall"
                            className="inline-flex items-center text-sage-green hover:text-sage-green/80 font-medium transition-colors"
                          >
                            Read Kevin&apos;s full bio →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </>
                ) : course.id === "beating-burnout" ? (
                  <>
                    {/* Beating Burnout Course Content */}
                    <div className="grid lg:grid-cols-3 gap-8 items-start">
                      {/* Main Description */}
                      <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white/50 rounded-lg p-6 border border-sage-green/20">
                          <p className="text-lg leading-relaxed text-foreground/90 mb-6">
                            It is ironic that teaching yoga, a practice that supports our students&apos; well-being, frequently leads to burnout. 
                            Join <strong>Stephanie Morton</strong> in exploring ways to continue to be inspired and supported in sharing 
                            this practice with others.
                          </p>
                          
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-lg mb-2 text-sage-green">Recognizing Burnout Patterns</h4>
                              <p className="text-foreground/90 leading-relaxed">
                                Learn to identify the early signs of teacher burnout before they become overwhelming. Understand 
                                the common triggers and patterns that lead to exhaustion, including over-commitment, perfectionism, 
                                and the pressure to constantly give without receiving adequate support or self-care.
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-lg mb-2 text-sage-green">Sustainable Teaching Practices</h4>
                              <p className="text-foreground/90 leading-relaxed">
                                Develop strategies for maintaining your own practice while teaching others. Explore boundaries, 
                                energy management, and ways to stay connected to your personal why. Learn practical tools for 
                                creating teaching schedules and environments that nourish rather than deplete you.
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-lg mb-2 text-sage-green">Reigniting Inspiration</h4>
                              <p className="text-foreground/90 leading-relaxed">
                                Rediscover what drew you to teaching yoga in the first place. Explore practices and perspectives 
                                that can reignite your passion for sharing yoga. Learn how to create support systems, find 
                                mentorship, and cultivate practices that keep you inspired and growing as both teacher and student.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Course Details Card */}
                      <div className="lg:col-span-1">
                        <div className="bg-sage-green/10 rounded-lg p-6 border border-sage-green/30 sticky top-24">
                          <h3 className="text-xl font-semibold mb-6 text-center">Course Details</h3>
                          
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-sage-green rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="font-medium text-foreground">Date</p>
                                <p className="text-muted-foreground">June 13th, 2026</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-sage-green rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="font-medium text-foreground">Time</p>
                                <p className="text-muted-foreground">1:00-5:00pm</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-sage-green rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="font-medium text-foreground">Cost</p>
                                <p className="text-muted-foreground">$225+tax</p>
                                <p className="text-muted-foreground font-semibold text-sage-green">6 course bundle: $825+tax</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-sage-green rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="font-medium text-foreground">CE Credits</p>
                                <p className="text-muted-foreground">4 hours</p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 pt-4 border-t border-sage-green/20">
                            <a 
                              href="/contact"
                              className="w-full inline-flex items-center justify-center rounded-md bg-sage-green text-white font-medium px-4 py-3 hover:bg-sage-green/90 transition-colors"
                            >
                              Register
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Teacher Bio Section */}
                    <div className="bg-gradient-to-r from-sage-green/5 to-sage-green/10 rounded-lg p-8 border border-sage-green/20">
                      <h3 className="text-2xl font-semibold mb-6 text-center">Meet Your Instructor</h3>
                      
                      <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="flex-shrink-0 mx-auto md:mx-0">
                          <Image
                            src="/images-in-use/teachers-used/stephanie-morton.jpg"
                            alt="Stephanie Morton"
                            width={200}
                            height={200}
                            className="rounded-lg object-cover"
                            style={{ height: '200px', width: '200px' }}
                          />
                        </div>
                        
                        <div className="flex-1 text-center md:text-left">
                          <h4 className="text-xl font-semibold mb-3 text-sage-green">Stephanie Morton</h4>
                          <p className="text-foreground/90 leading-relaxed mb-4">
                            Stephanie brings a wealth of experience in understanding the challenges that yoga teachers face 
                            in maintaining their own well-being while supporting others. Her approach combines practical 
                            wisdom with compassionate guidance, drawing from her own journey of navigating the demands of teaching.
                          </p>
                          <p className="text-foreground/90 leading-relaxed mb-4">
                            With a deep understanding of how the very practice meant to heal can sometimes become a source 
                            of stress, Stephanie offers valuable insights into creating sustainable, joy-filled teaching practices 
                            that honor both teacher and student needs.
                          </p>
                          <Link 
                            href="/teachers#stephanie-morton"
                            className="inline-flex items-center text-sage-green hover:text-sage-green/80 font-medium transition-colors"
                          >
                            Read Stephanie&apos;s full bio →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </>
                ) : course.id === "development-promotion" ? (
                  <>
                    {/* Development & Promotion Course Content */}
                    <div className="grid lg:grid-cols-3 gap-8 items-start">
                      {/* Main Description */}
                      <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white/50 rounded-lg p-6 border border-sage-green/20">
                          <p className="text-lg leading-relaxed text-foreground/90 mb-6">
                            Do you have ideas for workshops but not sure where to get started? Join <strong>Paighton and Uriel </strong> 
                            in understanding how to turn an interesting idea into a pop up class, workshop or course from start to finish.
                          </p>
                          
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-lg mb-2 text-sage-green">From Idea to Reality</h4>
                              <p className="text-foreground/90 leading-relaxed">
                                Learn how to transform your creative workshop ideas into well-structured offerings. Discover 
                                techniques for developing content, creating learning objectives, and designing experiences that 
                                engage participants while staying true to your unique teaching style and expertise.
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-lg mb-2 text-sage-green">Planning & Logistics</h4>
                              <p className="text-foreground/90 leading-relaxed">
                                Master the practical aspects of workshop creation including venue selection, pricing strategies, 
                                scheduling, and resource planning. Learn how to create timelines, manage logistics, and handle 
                                the behind-the-scenes work that makes workshops successful.
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-lg mb-2 text-sage-green">Marketing & Promotion</h4>
                              <p className="text-foreground/90 leading-relaxed">
                                Understand how to effectively promote your workshops and reach your target audience. Explore 
                                marketing strategies, social media approaches, and communication techniques that build excitement 
                                and encourage registration while maintaining authenticity and connection with your community.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Course Details Card */}
                      <div className="lg:col-span-1">
                        <div className="bg-sage-green/10 rounded-lg p-6 border border-sage-green/30 sticky top-24">
                          <h3 className="text-xl font-semibold mb-6 text-center">Course Details</h3>
                          
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-sage-green rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="font-medium text-foreground">Date</p>
                                <p className="text-muted-foreground">September 12th, 2026</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-sage-green rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="font-medium text-foreground">Time</p>
                                <p className="text-muted-foreground">1:00-5:00pm</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-sage-green rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="font-medium text-foreground">Cost</p>
                                <p className="text-muted-foreground">$225+tax</p>
                                <p className="text-muted-foreground font-semibold text-sage-green">6 course bundle: $825+tax</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-sage-green rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="font-medium text-foreground">CE Credits</p>
                                <p className="text-muted-foreground">4 hours</p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 pt-4 border-t border-sage-green/20">
                            <a 
                              href="/contact"
                              className="w-full inline-flex items-center justify-center rounded-md bg-sage-green text-white font-medium px-4 py-3 hover:bg-sage-green/90 transition-colors"
                            >
                              Register
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Teacher Bio Section */}
                    <div className="bg-gradient-to-r from-sage-green/5 to-sage-green/10 rounded-lg p-8 border border-sage-green/20">
                      <h3 className="text-2xl font-semibold mb-6 text-center">Meet Your Instructors</h3>
                      
                      <div className="space-y-8">
                        {/* Paighton */}
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                          <div className="flex-shrink-0 mx-auto md:mx-0">
                            <Image
                              src="/images-in-use/teachers-used/paighton-arsenault.jpg"
                              alt="Paighton Arsenault"
                              width={150}
                              height={150}
                              className="rounded-lg object-cover"
                              style={{ height: '150px', width: '150px' }}
                            />
                          </div>
                          
                          <div className="flex-1 text-center md:text-left">
                            <h4 className="text-lg font-semibold mb-2 text-sage-green">Paighton Arsenault</h4>
                            <p className="text-sm text-muted-foreground mb-3">Social Media Coordinator & Teacher</p>
                            <p className="text-foreground/90 leading-relaxed text-sm">
                              Paighton brings her expertise in social media and community engagement to workshop promotion. 
                              As Shanti&apos;s Social Media Coordinator and a 200HR & 75HR Yin certified teacher, she understands 
                              both the creative and practical sides of bringing yoga offerings to life.
                            </p>
                          </div>
                        </div>

                        {/* Uriel */}
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                          <div className="flex-shrink-0 mx-auto md:mx-0">
                            <Image
                              src="/images-in-use/teachers-used/uriel-macgillivary.jpg"
                              alt="Uriel MacGillivary"
                              width={150}
                              height={150}
                              className="rounded-lg object-cover"
                              style={{ height: '150px', width: '150px' }}
                            />
                          </div>
                          
                          <div className="flex-1 text-center md:text-left">
                            <h4 className="text-lg font-semibold mb-2 text-sage-green">Uriel MacGillivary</h4>
                            <p className="text-sm text-muted-foreground mb-3">Founder, E-RYT 500</p>
                            <p className="text-foreground/90 leading-relaxed text-sm">
                              As Shanti&apos;s founder, Uriel brings years of experience in developing and launching successful 
                              workshops, retreats, and teacher training programs. Her business acumen combined with deep 
                              yoga knowledge makes her an invaluable guide for turning ideas into thriving offerings.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-sage-green/20 text-center">
                        <Link 
                          href="/teachers"
                          className="inline-flex items-center text-sage-green hover:text-sage-green/80 font-medium transition-colors"
                        >
                          Read their full bios →
                        </Link>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Course Content Placeholder for other courses */}
                    <div className="bg-muted/30 rounded-lg p-8 text-center">
                      <h3 className="text-xl font-semibold mb-4">Course Information Coming Soon</h3>
                      <p className="text-muted-foreground">
                        Detailed information about the {course.name} course will be available soon. 
                        This course is part of our new continuing education program designed to support 
                        your ongoing development as a yoga teacher.
                      </p>
                    </div>

                    {/* Contact Section */}
                    <div className="bg-sage-green/5 rounded-lg p-8 text-center border border-sage-green/20">
                      <h3 className="text-xl font-semibold mb-4">Interested in This Course?</h3>
                      <p className="text-muted-foreground mb-6">
                        Contact us to learn more about {course.name} and be notified when registration opens.
                      </p>
                      <a 
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-md bg-sage-green text-white font-medium px-6 py-3 hover:bg-sage-green/90 transition-colors"
                      >
                        Get In Touch
                      </a>
                    </div>
                  </>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </div>
  );
} 