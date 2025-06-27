import { type NextPage } from 'next';
import Image from 'next/image';

const AboutPage: NextPage = () => {
  const timelineData = [
    {
      year: 2010,
      title: 'Shanti Dartmouth Opens',
      description: 'Where it all started. Opening in 2010 and building a yoga community that has been together 15 years strong and always striving for growth.',
    },
    {
      year: 2013,
      title: 'Shanti Bedford Opens',
      description: 'In 2013 we decided to expand our community to Bedford. As the Yoga community in Halifax had few choices around the city, we aimed to bridge the gap in the Halifax.',
    },
    {
        year: 2015,
        title: 'Shanti Halifax Opens',
        description: 'Through the summer of 2015 we worked night and day to find local creators and craftspeople to build our central studio in Downtown Halifax and expand our community to the bustling energy of a diverse downtown core.',
    },
  ];
  const studioLocations = [
    {
      name: "Shanti Dartmouth",
      image: "https://images.squarespace-cdn.com/content/v1/673f8221417d512fe9887ee8/1732215365350-3VTMTFPQXCSH4KFD4Q44/Dartmouth2.jpg",
    },
    {
      name: "Shanti Bedford",
      image: "https://images.squarespace-cdn.com/content/v1/673f8221417d512fe9887ee8/1732215365354-SS65BOZYTUV1H789DX88/Bedford1.jpg",
    },
    {
      name: "Shanti Halifax",
      image: "https://images.squarespace-cdn.com/content/v1/673f8221417d512fe9887ee8/1732215365346-Q728J2VMG3QEE8DLX537/Halifax%2B1.jpg",
    }
  ];

  return (
    <>
      <div className="bg-gray-50">
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">About Us</h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Our <span className="sage-green">Philosophy</span>
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
              At Shanti, we believe yoga is a personal journey towards peace and balance. We honor the rich traditions of yoga by focusing on its core elements: movement (Asana), breathwork (Pranayama), and meditation (Dhyana). Our goal is to provide a welcoming retreat from the demands of modern life, where you can reconnect with yourself.
            </p>
          </div>
        </div>

        <div className="bg-white">
          <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="mt-16">
              <h2 className="text-3xl font-extrabold text-gray-900 text-center">How We Practice</h2>
              <div className="mt-12 grid gap-16 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Expert Guidance</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Our certified teachers bring a wealth of knowledge in various yoga styles, including Hatha, Vinyasa, Ashtanga, and Yin. They provide instruction for all levels, ensuring you can find a practice that feels right for your body and your goals.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Diverse Classes</h3>
                  <p className="mt-2 text-base text-gray-500">
                    From energizing flows to restorative meditations, our diverse class schedule is designed to meet you where you are. We offer a path for every student, whether you&apos;re just beginning or seeking to deepen your practice through our teacher training programs.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">A Stronger Community</h3>
                  <p className="mt-2 text-base text-gray-500">
                    With three locations, we have built a vibrant and supportive community. We believe in the power of practicing together and are dedicated to creating a space where all students feel they belong.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gray-50 px-2 text-gray-500">
              <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path fill="#6B7280" fillRule="evenodd" d="M10 3a1 1 0 011 1v1.168a1 1 0 01-1.447.894L8.447 5.309A1 1 0 0110 3zM4.691 6.309a1 1 0 011.414-1.414l.707.707a1 1 0 01-1.414 1.414l-.707-.707zM15.309 6.309a1 1 0 011.414 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707zM10 17a1 1 0 01-1-1v-1.168a1 1 0 011.447-.894l1.106.753A1 1 0 0110 17zM13.691 15.309a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 011.414-1.414l.707.707zM6.309 15.309a1 1 0 01-1.414-1.414l.707-.707a1 1 0 111.414 1.414l-.707.707zM3 10a1 1 0 011-1h1.168a1 1 0 110 2H4a1 1 0 01-1-1zm14 0a1 1 0 01-1 1h-1.168a1 1 0 110-2H16a1 1 0 011 1z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
        </div>

        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-extrabold text-gray-900">Our Founder</h3>
              <p className="mt-4 text-lg text-gray-500">
                Uriel MacGillivary, E- RYT 500 Hour, Reiki Master, is the founder of Shanti Hot Yoga. Uriel found yoga during her years as a successful corporate manager. Tired of being on the corporate treadmill she combined her management skills with her passion and love for yoga and has made it her life mission to share the countless benefits that Yoga has to offer. She co-owns three vibrant yoga studios in the Halifax area with her family.
              </p>
            </div>
            <div className="flex justify-center">
              <Image src="/images-in-use/teachers-used/uriel-macgillivary-headshot.jpg" alt="Uriel MacGillivary" width={400} height={400} className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center">Our Journey</h2>
            <div className="mt-12">
              <div className="relative">
                <div className="absolute h-full w-1 bg-gray-200 left-1/2 -translate-x-1/2"></div>
                {timelineData.map((item, index) => (
                  <div key={item.year} className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse left-timeline' : 'right-timeline'}`}>
                    <div className="order-1 w-5/12"></div>
                    <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                      <h1 className="mx-auto font-semibold text-lg text-white">{index + 1}</h1>
                    </div>
                    <div className={`order-1 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-indigo-100'} rounded-lg shadow-xl w-5/12 px-6 py-4`}>
                      <h3 className="mb-3 font-bold text-gray-800 text-xl">{item.year} - {item.title}</h3>
                      <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {
                    studioLocations.map(studio=>(
                        <div key={studio.name} className="rounded-lg shadow-lg overflow-hidden relative">
                             <Image src={studio.image} alt={`Shanti Studio in ${studio.name}`} width={500} height={500} className="object-cover h-64 w-full" />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                             <div className="absolute bottom-0 p-4">
                               <h3 className="text-white text-xl font-bold">{studio.name}</h3>
                             </div>
                        </div>
                    ))
                }
            </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage; 