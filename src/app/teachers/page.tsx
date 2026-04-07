"use client";

import Image from "next/image";
import { Bio } from "@/components/ui/Bio";
import { PageHero } from "@/components/page-hero";
import { useEffect, useRef } from "react";

const teachers = [
  {
    name: "Uriel MacGillivary",
    title: "Founder",
    certifications: "E-RYT 500 Hour, Reiki Master",
    image: "/images-in-use/teachers-used/uriel-macgillivary.jpg",
    bio: "Founder of Shanti Hot Yoga, Uriel found yoga during her years as a successful corporate manager. Tired of being on the corporate treadmill she combined her management skills with her passion and love for yoga and has made it her life mission to share the countless benefits that Yoga has to offer. She co-owns three vibrant yoga studios in the Halifax area with her family.\nHer greatest accomplishment has been building a traditional yoga school in Atlantic Canada that is innovative, interactive and raises the bar on how we develop students to become great teachers. On the first day of training she promises her students they will learn about the heart of yoga and will become yoga teachers, not yoga instructors.\nUriels' voracious appetite for the study has taken her into some of the greatest adventures of her life. During the past 10 years, she has studied intensively with international teachers Christina Sell, Ana Forest, and the late Georg Feuerstein where she studied the history and philosophy of yoga in depth. She is trained in the Iyengar, Anusara, and Tantric methods of yoga, but it wasn't until she began her studies with Yogarupa Rod Stryker that she found the inspiration to combine all that yoga has to offer in a skillful play between energy, asana, meditation, pranayama, and Ayurveda. She is currently completing her ParaYoga Masters training program, a living link to the ancient traditions of yoga and tantra, with Rod Stryker.\nUriels' passion for the tradition of yoga has expanded her view of how yoga transforms the human body, mind, and soul. She looks forward to sharing her knowledge and wisdom in her weekly classes, yoga teacher trainings, and retreats.\nUriel applies her extensive study of the ancient yoga tradition to her practice of quantum healing. She believes the body can heal itself by accessing what is already available to us all: life force energy, or Prana. Uriel is a master Reiki healer and has her Level 1 Quantum Touch training.",
    featured: true
  },
  {
    name: "Taylor MacGillivary",
    title: "Co-owner & Teacher",
    image: "/images-in-use/teachers-used/taylor-macgillivary.jpg",
    bio: "Taylor's curiosity of Yoga practice came quickly after doing his first Teacher Training with Moksha Yoga in 2011. Taylor feels a close connection with the traditional practices of Yoga, practicing and teaching with Sri. T. Krishnamacharya's lineage as his guidelines, approaching Yoga practice as medicine for your body and your mind. Staying true to Yoga's origins while keeping practice light and accessible is what he strives for in his classes.\nTaylor draws on 700+ hours of study, ranging from contemporary Canadian teacher Ryan Leier, who has served as Taylor's main teacher over the years, to his latest study with traditional Indian master Srivatsa Ramaswami, a 30+ year student of Krishnamacharya.",
    featured: true
  },
  {
    name: "Stephanie Morton",
    title: "Manager",
    image: "/images-in-use/teachers-used/stephanie-morton.jpg",
    bio: "Stephanie Morton has been teaching yoga since 2011. As a long distance runner and running coach, she has worked with many endurance athletes but also has a keen interest in yoga for healthy aging.\nHer approach to yoga is pragmatic but grounded in traditional teachings and yogic philosophy. Her classes combine asanas and functional movement practices with pranayama and meditation techniques that support every lifestyle. She also specializes in pre and post-natal yoga.\nOriginally from Halifax, she recently returned to Nova Scotia with her family after having lived and worked in Playa del Carmen, Mexico for 15 years. She has a decade of yoga studio management experience and has been a lead trainer in many 200 hours yoga teacher training courses. She is passionate about supporting and mentoring yoga teachers.",
    featured: true
  },
  {
    name: "Blaine Carter",
    title: "Teacher",
    image: "/images-in-use/teachers-used/blaine-carter.jpeg",
    bio: "Blaine's doorway into yoga was through lunchtime yoga classes in the workplace in 2010. Then, before he could use his sweet deal groupon at Moksha Dartmouth, he was working out of country and practicing Bikram regularly.\nUpon returning home, he has been practicing at Shanti ever since. He completed his 200hr YTT in 2014, followed up with 50hr Yin TT through Shanti. He also gained certifications with the level 1 Great Yoga Wall, SUP Yoga Instructor, Love Your Brain YTT and Yoga Nidra."
  },
  {
    name: "Renee Babin",
    title: "Teacher",
    image: "/images-in-use/teachers-used/renee.jpg",
    bio: "Renée is a 200RYT who centres her practice in the transformative nature of yoga. Her class offers spaciousness as well as challenge in an opportunity to self-discover, self-express and grow. Expect a soothing voice to ground you in a practice created with intent of self awareness.\nRenée is passionate about bringing human centred practice to all areas of society. With this in mind, she brings an informed view to her teaching and realizes the power of yoga on the mental and physical aspects of the body."
  },
  {
    name: "Andrea Gracia",
    title: "Teacher",
    image: "/images-in-use/teachers-used/andrea-gracia.jpg",
    bio: "My name is Andrea Gracia and I have been practicing Yoga for a little bit more than 10 years. I started this journey when I was living in México, my home land.\nThroughout the years I have witnessed how yoga has transformed my life in many different ways.\nI had the fortune to travel to the Motherland of Yoga a couple of years ago and train with my teacher in the banks of the Himalayas and later on I was lucky to travel again to South India to study with Saraswati Jois the traditional Ashtanga Vinyasa style in Mysore. My experience in India and what I have learned from my teachers in México and Canada and my personal practice throughout these years is something I wish to share with more people.",
    objectPosition: "object-bottom"
  },
  {
    name: "Kristie Willems",
    title: "Teacher",
    image: "/images-in-use/teachers-used/kristie-willems.jpg",
    bio: "Kristie remembers thinking, 'Wow, I'm twenty-three - if my back feels this bad now, what is it going to be like in ten years?' Kristie started yoga in hopes that it would heal her chronic back pain. When it did, she knew that she wanted to offer yoga to others. Kristie has been certified in Hatha Yoga for a decade and has done intensive trainings close to her home in Ontario, and around the world. She is passionate about connecting the body and breath while helping students find ways to align and lengthen their bodies in a way that releases pain and discomfort. Her classes are full of insightful, intelligent, alignment-oriented cues, and a balanced sequence of poses. Her goal is to leave you feeling centred, present, and better than when you arrived."
  },
  {
    name: "Emilie Fabre",
    title: "Teacher",
    image: "/images-in-use/teachers-used/emilie-fabre.jpg",
    bio: "In Fall of 2009 Emilie completed a 200 hour, Yoga Alliance certified teacher training in Edmonton. She believes the person she was then was broken down into many pieces and re-sculpted. The new insight, and perspective gained, also brought acceptance of who she is and the desire to guide others on this path of self-awareness, acceptance and compassion."
  },
  {
    name: "Paighton Arsenault",
    title: "Social Media Coordinator",
    image: "/images-in-use/teachers-used/paighton-arsenault.jpg",
    bio: "Paighton's yoga journey started several years ago at Shanti Halifax. Arriving with few expectations, and leaving fulfilled with a newfound sense of peace, she knew she had found a home in this community. After several years of dreaming to do so, Paighton completed her 200HR Yoga Teacher Training with Shanti in the Fall of 2021, and shortly after her 75HR Yin Teacher Training with Shanti in the Winter of 2022. She is beyond thrilled to share her passion further among the Shanti community."
  },
  {
    name: "Amanda Greenwood",
    title: "Teacher",
    image: "/images-in-use/teachers-used/amanda-greenwood-2.jpeg",
    bio: "Amanda Greenwood (she/her) is a Recreation & Leisure graduate, R-YT 200 with continued training in Myofascial, Yin, Vinyasa Krama and Kundalini. Amanda began her teacher training in January 2019 and has been teaching since September 2019 in various formats with studios and gyms in HRM."
  },
  {
    name: "Trever McWilson",
    title: "Teacher",
    image: "/images-in-use/teachers-used/trever-mcwilson.jpeg",
    bio: "Trever found the Shanti team back in 2018 when he planted roots in Halifax and became a regular in attendance of our classes. Trever quickly forged bonds with fellow yogis, teachers, and enthusiasts, immersing himself in the warmth of a truly remarkable community."
  },
  {
    name: "Kevin Dougall",
    title: "Teacher",
    image: "/images-in-use/teachers-used/kevin-dougall.jpg",
    bio: "A yoga nerd at heart, Kevin brings his genuine passion for yoga to every class. He started his yoga journey at Shanti in 2011, and has since had the pleasure of training with Ryan Leier, Srivatsa Ramaswami (vinyasa krama), and Manju Jois (ashtanga), and holds a RYT 200, and RCYT (registered children's yoga teacher) certification with Yoga Alliance. He shares his dynamic style of practice which is fun, inspirational, and focused on the core traditions of yoga."
  },
  {
    name: "Diane Bellefontaine",
    title: "Teacher",
    image: "/images-in-use/teachers-used/diane-edited.png",
    bio: "I found yoga in the year 2000 and I fell in love with it- the practice, the way it made by body feel, and how calm and at ease I felt during and after the classes. I believe that Yoga has helped me to slow down, to be more present and to get more grounded. I have completed both the 200 hr and 500 hr yoga teacher training programs with TAYS (Therapeutic Approach Yoga Studio) and continue to take as much training as I can. There is so much to discover."
  },
  {
    name: "Jacqueline Adams",
    title: "Teacher",
    image: "/images-in-use/teachers-used/jacqueline-adams.jpg",
    bio: "It was the first day on a new job and my coworkers led me to an in-house yoga class. Within five breaths I realized this is what has been missing from my life. This connection with my body, breath, and movement. I felt at home, grounded, challenged and inspired. That inspiration took root and yoga has become my passion. As a dedicated yoga student since 2008, the pull to teach and share what I learned on and off my yoga mat, would not leave. So in 2017 I started the journey to teach."
  },
  {
    name: "Shanon Phelan",
    title: "Teacher",
    image: "/images-in-use/teachers-used/shanon-phelan.jpg",
    bio: "Shanon attended her first Yoga (Ashtanga) class with her Mom 25 years ago. She quickly fell in love with it, more so for the physical aspects at that time. However, it didn't take long for her to realize that Yoga was a way of living. Yoga has taught her how to love herself and others, to be gracious, to forgive, to accept, to be kind, to observe, to be present, to listen, to hold space, and to honour the beauty in the human experience. This is the heart of Shanon's practice."
  },

  {
    name: "Kyla MacKinnon",
    title: "Teacher",
    image: "/images-in-use/teachers-used/kyla-mackinnon.jpg",
    bio: "Kyla Mackinnon resides on the east coast of Canada in Halifax but fulfills her sense of wanderlust by traveling regularly. Most of her travels involve leading yoga retreats and yoga teacher trainings as she loves to combine her passions of connecting with people and creating memorable experiences. Kyla teaches yoga as a way to inspire others to live a happy, healthy and authentic life. She enjoys coaching people and creating a space where they feel comfortable and confident in order to reach their full potential. Thanks to her many great teachers, Kyla vows to keep the tradition of Krishnamacharya's yoga lineage alive while weaving in a mix of her own movements which she explores through continuous study. When not getting her yoga on, Kyla can be found tasting new vegan health foods, enjoying time in nature, working out with the lululemon crew, connecting with loved ones, and exploring the world."
  },
  {
    name: "Pytrik Oosterhof",
    title: "Teacher",
    image: "/images-in-use/teachers-used/pytrik.jpg",
    bio: "Pytrik completed the 200hr Yoga Teacher Training (YTT) at Shanti in 2024 and aims to share with students what she loves about yoga and life; freedom, detachment and consciousness."
  },
  {
    name: "Erika Hale",
    title: "Teacher",
    image: "/images-in-use/teachers-used/erika-hale.jpeg",
    bio: "Erika started her daily yoga practice in 2021 at Shanti Bedford as a form of exercise, but it quickly and unexpectedly transformed into a spiritual journey and lifestyle. In spring of 2024 she completed her 200 hour yoga teacher training through Shanti. In her classes you can expect a balance of strength and flexibility, with an emphasis on finding effort and ease as you move through each posture. Erika truly believes that yoga is for every body: 'if you can breathe, you can do yoga!'"
  },
  {
    name: "Nikki Martin",
    title: "Teacher",
    image: "/images-in-use/teachers-used/nikki-martin.jpg",
    bio: "Nikki came to yoga in 2012, craving an activity to get her out of the house and drawn by both the strength, grace and challenge of arm balances and inversions, and a desire to finally forge a path to peace and happiness in her life. She quickly fell in love with the practice of yoga as a whole and how it enriched all facets of her life, and though she still loves the physical challenges, it presents she has come to appreciate the mental, spiritual and philosophical aspects of the practice as well."
  },
  {
    name: "Courtney Parsons",
    title: "Teacher",
    image: "/images-in-use/teachers-used/courtney-parsons.jpg",
    bio: "Courtney was introduced to yoga at a young age in the midst of her dancing career. She found yoga at a time where flexibility and strength were an asset to being a competitive dancer. While her practice grew, she noticed the benefits that yoga had on her mental clarity and well being.\nFeeling inspired and continuously challenged by her yoga teachers and mentors, Courtney decided to take the next step of completing a 200hr teacher training with Shanti Yoga.",
    objectPosition: "object-top"
  },
  {
    name: "Andrea Robinson",
    title: "Teacher",
    image: "/images-in-use/teachers-used/Andrea Robinson.jpg",
    bio: "Andrea discovered yoga at a local community center in 2010 and was immediately drawn to the transformational nature of the practice. The Shanti Community has played a large role in her life since then. She completed Shanti's 200hr Yoga Teacher Training program in 2021 as a way to deepen her own personal practice and has completed further training in Kundalini, Yin, Vinyasa Krama and Pranayama. Andrea now enjoys creating and holding space for others to experience the connection to the self that yoga provides.",
    objectPosition: "object-top"
  },
  {
    name: "Louise Angel",
    title: "Teacher",
    image: "/images-in-use/teachers-used/Louise Angel.jpeg",
    bio: "Fifteen years ago, I discovered yoga as an alternative to high school gym class and was instantly drawn to its unique style of movement. What began as a purely physical practice soon evolved into something much deeper. As I continued my journey through life's challenges, yoga became a grounding force that sparked a deeper curiosity about its ancient roots and transformative potential.\nIn 2025, I completed my 200-hour Yoga Teacher Training (YTT) and I continue to explore and reconnect with my mind, body, and soul through yoga. I hope to inspire the same sense of curiosity and self-discovery in those who practice with me!"
  },
  {
    name: "Leanna Letterio",
    title: "Teacher",
    image: "/images-in-use/teachers-used/Leanna Letterio.jpg",
    bio: "Leanna's yoga journey began over a decade ago and has been a steady thread through seasons of challenge, growth, and self-discovery. Through movement, breath, and meditation, she's learned to cultivate peace, build strength, and find moments of joy—no matter what life holds.\nHer teaching is rooted in mindfulness and inspired by movement, offering thoughtful, accessible practices that ground you in the foundations of yoga while exploring creative ways to flow through the familiar. Guided by her personal health journey and background in architecture, Leanna approaches each class with care and curiosity, weaving sequences that invite you to slow down, build strength, and reconnect.\nShe completed her 200-hr Hatha and Vinyasa training in Bali and began teaching community classes on the beaches of Australia. Whether you come seeking clarity, balance, or a deeper connection to yourself, Leanna holds space for you to meet yourself exactly where you are."
  },
  {
    name: "Katherine King",
    title: "Teacher",
    image: "/images-in-use/teachers-used/Katherine King.jpg",
    bio: "Katherine King is a dedicated yoga teacher who brings passion and expertise to every class."
  },
  {
    name: "Jasmine Chauhan",
    title: "Teacher",
    image: "/images-in-use/teachers-used/Jasmine Chauhan.jpeg",
    bio: "Jasmine completed her 200-hour YTT with Shanti in June 2024 with continued training in hands-on assists and yoga as social justice work, both on and off the mat. What drives Jasmine to teach yoga is to contribute to community spaces where yoga is more accessible and inclusive for all. Her classes promote self-awareness and curiosity while offering both personal and collective experiences for movement. Students can expect a warm voice to guide them through a practice with elements of challenge, sweat, pause, and reflection."
  },
  {
    name: "Natasha Pollock",
    title: "Teacher",
    image: "/images-in-use/teachers-used/Natasha Polluck.jpg",
    bio: "Natasha Pollock brings her love of yoga and dedication to her students to every class she teaches.",
    objectPosition: "object-top"
  },
  {
    name: "Hayley Westerman",
    title: "Teacher",
    image: "/images-in-use/teachers-used/Hayley Westerman.jpeg",
    bio: "Hayley is a Vinyasa and Yin Yoga teacher and Registered Massage Therapist whose practice is rooted in nature, mindfulness, and intentional movement.\nShe began her yoga journey 15 years ago while living in the mountains, where the landscape sparked a deep appreciation for stillness, breath, and embodied presence.\nIn the fall of 2016, Hayley completed her 200-hour Yoga Teacher Training in California, immersing herself in philosophy, anatomy, and the art of sequencing.\nHer classes blend fluid Vinyasa flow with the grounding, introspective qualities of Yin, inviting students to cultivate strength, ease, and awareness from the inside out.\nAs a Registered Massage Therapist at East Coast Wellness, she draws on her therapeutic background to create practices that support mobility, release tension, and nourish the nervous system.\nHayley's teaching style is warm, intuitive, and welcoming—offering a space where every student feels supported in their own unique journey."
  },
  {
    name: "Alan Garner",
    title: "Teacher",
    image: "/images-in-use/teachers-used/Alan-Garner.jpg",
    bio: "Alan Garner has been a yoga and meditation practitioner for over 24 years.\nDeeply committed to self-development by education and application he has elevated his journey to include a 500Hr Registered Yoga Teacher certification. Spirituality, yogic traditions and philosophies, along with his personal insights of his own journey, are the foundations of how he leads his classes.",
    objectPosition: "object-[50%_25%]"
  },
  {
    name: "Jordan Pacewski",
    title: "Teacher",
    image: "/images-in-use/teachers-used/jordan-pacewski.jpeg",
    bio: "My yoga journey started as a fitness endeavour after having to move home from BC due to a minor car accident. Yoga quickly became a part of my daily life and after years in the wine and hospitality industry I decided to take my 200hr in 2019. I grew up a really shy kid with no intentions of public speaking in any capacity so I was unsure if I actually wanted to teach or just took the training to further my practice. I was thrown in to sub at the studio I trained in and all of a sudden I was teaching a few classes a week. I took my 300hr in 2021 followed by my Pilates training in 2022. Somewhere along the line, teaching became my favourite hobby. This summer I decided to take on teaching pilates full time. I couldn't be happier! I'm so thankful to be part of the shanti team!"
  }
];

export default function TeachersPage() {
  const teacherRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

  useEffect(() => {
    // Check if there's a hash in the URL and scroll to/expand that teacher
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.substring(1); // Remove the #
      const targetElement = teacherRefs.current[hash];
      if (targetElement) {
        // Small delay to ensure page is fully loaded
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Trigger a visual highlight effect
          targetElement.style.transition = 'box-shadow 0.3s ease';
          targetElement.style.boxShadow = '0 0 20px rgba(150, 191, 80, 0.5)';
          setTimeout(() => {
            targetElement.style.boxShadow = '';
          }, 2000);
        }, 500);
      }
    }
  }, []);

  const createTeacherSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  const isTargetTeacher = (teacherSlug: string) => {
    if (typeof window === 'undefined') return false;
    return window.location.hash === `#${teacherSlug}`;
  };

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
            {teachers.filter(t => t.featured).map((teacher, index) => {
              const teacherSlug = createTeacherSlug(teacher.name);
              return (
                <div 
                  key={index} 
                  id={teacherSlug}
                  ref={(el) => { teacherRefs.current[teacherSlug] = el; }}
                  className="relative bg-white rounded-2xl overflow-hidden shadow-xl"
                >
                  <div className="aspect-[3/4] relative">
                    <Image
                      src={teacher.image}
                      alt={teacher.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={`object-cover ${teacher.objectPosition || ''}`}
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
                    <Bio text={teacher.bio} autoExpand={isTargetTeacher(teacherSlug)} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Other Teachers Grid */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachers.filter(t => !t.featured).map((teacher, index) => {
              const teacherSlug = createTeacherSlug(teacher.name);
              return (
                <div 
                  key={index} 
                  id={teacherSlug}
                  ref={(el) => { teacherRefs.current[teacherSlug] = el; }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg"
                >
                  <div className="aspect-[3/2] relative">
                    <Image
                      src={teacher.image}
                      alt={teacher.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={`object-cover ${teacher.objectPosition || ''}`}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{teacher.name}</h3>
                    <Bio text={teacher.bio} autoExpand={isTargetTeacher(teacherSlug)} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </>
  );
} 