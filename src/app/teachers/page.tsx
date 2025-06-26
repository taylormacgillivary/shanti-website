import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bio } from "@/components/ui/Bio";
import { PageHero } from "@/components/page-hero";

const teachers = [
  {
    name: "Uriel MacGillivary",
    title: "Founder",
    certifications: "E-RYT 500 Hour, Reiki Master",
    image: "/teachers-used/IMG_3488 copyUriel.jpg",
    bio: "Founder of Shanti Hot Yoga, Uriel found yoga during her years as a successful corporate manager. Tired of being on the corporate treadmill she combined her management skills with her passion and love for yoga and has made it her life mission to share the countless benefits that Yoga has to offer. She co-owns three vibrant yoga studios in the Halifax area with her family.",
    featured: true
  },
  {
    name: "Taylor MacGillivary",
    title: "Co-owner & Teacher",
    image: "/teachers-used/Taylor.JPG",
    bio: "Taylor's curiosity of Yoga practice came quickly after doing his first Teacher Training with Moksha Yoga in 2011. Taylor feels a close connection with the traditional practices of Yoga, practicing and teaching with Sri. T. Krishnamacharya's lineage as his guidelines, approaching Yoga practice as medicine for your body and your mind.",
    featured: true
  },
  {
    name: "Stephanie Morton",
    title: "Manager",
    image: "/teachers-pics-2/Stephanie Morton",
    bio: "Stephanie Morton has been teaching yoga since 2011. As a long distance runner and running coach, she has worked with many endurance athletes but also has a keen interest in yoga for healthy aging. Her approach to yoga is pragmatic but grounded in traditional teachings and yogic philosophy.",
    featured: true
  },
  {
    name: "Blaine Carter",
    image: "/teachers/blaine.jpg",
    bio: "Blaine's doorway into yoga was through lunchtime yoga classes in the workplace in 2010. Then, before he could use his sweet deal groupon at Moksha Dartmouth, he was working out of country and practicing Bikram regularly. He completed his 200hr YTT in 2014, followed up with 50hr Yin TT through Shanti."
  },
  {
    name: "Renee Babin",
    image: "/teachers-used/Renee 2.jpg",
    bio: "Renée is a 200RYT who centres her practice in the transformative nature of yoga. Her class offers spaciousness as well as challenge in an opportunity to self-discover, self-express and grow. Expect a soothing voice to ground you in a practice created with intent of self awareness."
  },
  {
    name: "Andrea Gracia",
    image: "/teachers-used/Andrea Gracia.jpg",
    bio: "Andrea has been practicing Yoga for over 10 years, starting her journey in México, her homeland. She had the fortune to train with her teacher in the banks of the Himalayas and later studied with Saraswati Jois the traditional Ashtanga Vinyasa style in Mysore, India."
  },
  {
    name: "Kristie Willems",
    title: "Teacher",
    image: "/teachers-used/Kristie Willems 2.jpg",
    bio: "Kristie remembers thinking, 'Wow, I'm twenty-three - if my back feels this bad now, what is it going to be like in ten years?' Kristie started yoga in hopes that it would heal her chronic back pain. When it did, she knew that she wanted to offer yoga to others. Kristie has been certified in Hatha Yoga for a decade and has done intensive trainings close to her home in Ontario, and around the world. She is passionate about connecting the body and breath while helping students find ways to align and lengthen their bodies in a way that releases pain and discomfort. Her classes are full of insightful, intelligent, alignment-oriented cues, and a balanced sequence of poses. Her goal is to leave you feeling centred, present, and better than when you arrived."
  },
  {
    name: "Emilie Fabre",
    title: "Teacher",
    image: "/teachers-pics-2/Emilie's Edits/Emilie's Photos/Emilie Fall 1.jpg",
    bio: "In Fall of 2009 Emilie completed a 200 hour, Yoga Alliance certified teacher training in Edmonton. She believes the person she was then was broken down into many pieces and re-sculpted. The new insight, and perspective gained, also brought acceptance of who she is and the desire to guide others on this path of self-awareness, acceptance and compassion."
  },
  {
    name: "Paighton Arsenault",
    title: "Social Media Coordinator",
    image: "/teachers-pics-2/paighton headshot.jpg",
    bio: "Paighton's yoga journey started several years ago at Shanti Halifax. Arriving with few expectations, and leaving fulfilled with a newfound sense of peace, she knew she had found a home in this community. After several years of dreaming to do so, Paighton completed her 200HR Yoga Teacher Training with Shanti in the Fall of 2021, and shortly after her 75HR Yin Teacher Training with Shanti in the Winter of 2022. She is beyond thrilled to share her passion further among the Shanti community."
  },
  {
    name: "Abbey Bates",
    title: "Teacher",
    image: "/teachers-pics-2/Abbey Bates.jpg",
    bio: "Abbey started her practice right here in the Dartmouth studio more than ten years ago. Not until she had the opportunity to move overseas did she really find her strong connection with yoga. She traveled to India in 2013 to do her 200 Hour YTT in Vinyasa/Ashtanga. After that, she began to practice every day, growing and progressing in her practice. Living in the United Arab Emirates, Abbey began to teach private and corporate classes as she became apart of the yoga community."
  },
  {
    name: "Trever McWilson",
    title: "Teacher",
    image: "/teachers-used/Trever McWilson.jpeg",
    bio: "Trever found the Shanti team back in 2018 when he planted roots in Halifax and became a regular in attendance of our classes. Trever quickly forged bonds with fellow yogis, teachers, and enthusiasts, immersing himself in the warmth of a truly remarkable community."
  },
  {
    name: "Kevin Dougall",
    title: "Teacher",
    image: "/teachers-used/kevin31_LM copy.jpg",
    bio: "A yoga nerd at heart, Kevin brings his genuine passion for yoga to every class. He started his yoga journey at Shanti in 2011, and has since had the pleasure of training with Ryan Leier, Srivatsa Ramaswami (vinyasa krama), and Manju Jois (ashtanga), and holds a RYT 200, and RCYT (registered children's yoga teacher) certification with Yoga Alliance. He shares his dynamic style of practice which is fun, inspirational, and focused on the core traditions of yoga."
  },
  {
    name: "Annette Opas",
    title: "Teacher",
    image: "/teachers-pics-2/Shanti Windhorse Retreat June_annette Stories.jpg",
    bio: "Annette completed her 200 hour Yoga Teacher Training with Shanti Hot Yoga in 2017. She is known for her authentic, playful, non-judgmental and challenging teaching style and compassion for those in and out of the studio. Yoga has been a part of Annette's life for several years now. Her practice has helped her grow stronger; physically & mentally and more courageous, both on and off the mat. As a teacher and student, yoga inspires her to live each moment more intentionally and mindfully."
  },
  {
    name: "Diane Bellefontaine",
    title: "Teacher",
    image: "/teachers-used/Diane - Edited.png",
    bio: "I found yoga in the year 2000 and I fell in love with it- the practice, the way it made by body feel, and how calm and at ease I felt during and after the classes. I believe that Yoga has helped me to slow down, to be more present and to get more grounded. I have completed both the 200 hr and 500 hr yoga teacher training programs with TAYS (Therapeutic Approach Yoga Studio) and continue to take as much training as I can. There is so much to discover."
  },
  {
    name: "Jacqueline Adams",
    title: "Teacher",
    image: "/teachers-used/Jacqueline Adams.jpg",
    bio: "It was the first day on a new job and my coworkers led me to an in-house yoga class. Within five breaths I realized this is what has been missing from my life. This connection with my body, breath, and movement. I felt at home, grounded, challenged and inspired. That inspiration took root and yoga has become my passion. As a dedicated yoga student since 2008, the pull to teach and share what I learned on and off my yoga mat, would not leave. So in 2017 I started the journey to teach."
  },
  {
    name: "Shanon Phelan",
    title: "Teacher",
    image: "/teachers-pics-2/Shanon Phelan Bio.jpg",
    bio: "Shanon attended her first Yoga (Ashtanga) class with her Mom 25 years ago. She quickly fell in love with it, more so for the physical aspects at that time. However, it didn't take long for her to realize that Yoga was a way of living. Yoga has taught her how to love herself and others, to be gracious, to forgive, to accept, to be kind, to observe, to be present, to listen, to hold space, and to honour the beauty in the human experience. This is the heart of Shanon's practice."
  },
  {
    name: "Livia Peyton",
    title: "Teacher",
    image: "/teacher-images/placeholder.jpg",
    bio: "Yoga has taught me about the beauty of a journey that has no destination. About the being and not the doing. As an active, constantly moving, always wondering individual, I was not always able to be in the moment. 6 years ago yoga changed that. Through my 200hr YTT in 2018, I developed a passion for communication and building of relationships that I hope to bring into all aspects of my life, practice and teaching."
  },
  {
    name: "Kyla MacKinnon",
    title: "Teacher",
    image: "/teacher-images/placeholder.jpg",
    bio: "Kyla Mackinnon resides on the east coast of Canada in Halifax but fulfills her sense of wanderlust by traveling regularly. Most of her travels involve leading yoga retreats and yoga teacher trainings as she loves to combine her passions of connecting with people and creating memorable experiences. Kyla teaches yoga as a way to inspire others to live a happy, healthy and authentic life. She enjoys coaching people and creating a space where they feel comfortable and confident in order to reach their full potential. Thanks to her many great teachers, Kyla vows to keep the tradition of Krishnamacharya's yoga lineage alive while weaving in a mix of her own movements which she explores through continuous study. When not getting her yoga on, Kyla can be found tasting new vegan health foods, enjoying time in nature, working out with the lululemon crew, connecting with loved ones, and exploring the world."
  },
  {
    name: "Ashley Carson",
    title: "Teacher",
    image: "/teacher-images/placeholder.jpg",
    bio: "Ashley Carson, born and raised in the outskirts of Halifax, Nova Scotia, has been practicing yoga for over 10 years. Yoga, and all that it encompasses b...(4572 chars omitted)...e has helped her to keep challenging herself, to remain curious and to find the courage to sometimes make unconventional choices of the beaten path."
  },
  {
    name: "Pytrik",
    title: "Teacher",
    image: "/teacher-images/placeholder.jpg",
    bio: "Pytrik completed the 200hr Yoga Teacher Training (YTT) at Shanti in 2024 and aims to share with students what she loves about yoga and life; freedom, detachment and consciousness."
  },
  {
    name: "Katja Greiner",
    title: "Teacher",
    image: "/teacher-images/placeholder.jpg",
    bio: "I started practicing yoga in 2012 when I was living in Bermuda looking for a way to get back in shape and quickly feel in love with it. I decided to do my 200-hour YTT in May 2023 with Shanti and I started to teach in May 2024. Doing my teacher training has been a life changing experience for me. I love the way yoga makes me feel, grounded and present and more connected with my body. I am so grateful to be able to share my yoga journey with all my students. Yoga is so much more than just a physical workout, Yoga is a way of life."
  },
  {
    name: "Erika Hale",
    title: "Teacher",
    image: "/teacher-images/placeholder.jpg",
    bio: "Erika started her daily yoga practice in 2021 at Shanti Bedford as a form of exercise, but it quickly and unexpectedly transformed into a spiritual journey and lifestyle. In spring of 2024 she completed her 200 hour yoga teacher training through Shanti. In her classes you can expect a balance of strength and flexibility, with an emphasis on finding effort and ease as you move through each posture. Erika truly believes that yoga is for every body: 'if you can breathe, you can do yoga!'"
  },
  {
    name: "Nikki Martin",
    title: "Teacher",
    image: "/teachers-used/nikki-martin.JPG",
    bio: "Nikki came to yoga in 2012, craving an activity to get her out of the house and drawn by both the strength, grace and challenge of arm balances and inversions, and a desire to finally forge a path to peace and happiness in her life. She quickly fell in love with the practice of yoga as a whole and how it enriched all facets of her life, and though she still loves the physical challenges, it presents she has come to appreciate the mental, spiritual and philosophical aspects of the practice as well."
  },
  {
    name: "Courtney Parsons",
    title: "Teacher",
    image: "/teacher-images/placeholder.jpg",
    bio: "Courtney was introduced to yoga at a young age in the midst of her dancing career. She found yoga at a time where flexibility and strength were an asset to being a competitive dancer. While her practice grew, she noticed the benefits that yoga had on her mental clarity and well being. Feeling inspired and continuously challenged by her yoga teachers and mentors, Courtney decided to take the next step of completing a 200hr teacher training with Shanti Yoga."
  }
];

export default function TeachersPage() {
  return (
    <>
      <PageHero
        badge="Meet Our Community"
        title={<>Learn from <span className="gradient-sage-text">Experienced Teachers</span></>}
        subtitle="Our teachers are the backbone of Shanti. They are what make our studio unique and what brings our community together. Each one of our teachers brings their own approach to Yoga, coming from different training backgrounds and methodologies."
      />

      {/* Featured Teachers */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {teachers.filter(t => t.featured).map((teacher, index) => (
              <div key={index} className="relative bg-white rounded-2xl overflow-hidden shadow-xl">
                <div className="aspect-[3/4] relative">
                  <Image
                    src={teacher.image}
                    alt={teacher.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold">{teacher.name}</h3>
                    <p className="text-sage-green font-medium">{teacher.title}</p>
                    {teacher.certifications && (
                      <p className="text-sm text-muted-foreground">{teacher.certifications}</p>
                    )}
                  </div>
                  <Bio text={teacher.bio} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Teachers Grid */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachers.filter(t => !t.featured).map((teacher, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="aspect-[3/2] relative">
                  <Image
                    src={teacher.image}
                    alt={teacher.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{teacher.name}</h3>
                  <Bio text={teacher.bio} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Go deeper with expert guidance in our 200-hr teacher training</h2>
            <Button asChild size="lg" className="gradient-sage text-white hover:opacity-90">
              <Link href="/teacher-training">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </>
  );
} 