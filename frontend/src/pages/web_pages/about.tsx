import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  AboutUsDesigns,
  FeaturesDesigns,
  TestimonialsDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'iqtest1';
  const pages = [
    {
      href: '/home',
      label: 'home',
    },

    {
      href: '/about',
      label: 'about',
    },

    {
      href: '/services',
      label: 'services',
    },

    {
      href: '/contact',
      label: 'contact',
    },

    {
      href: '/faq',
      label: 'FAQ',
    },
  ];

  const features_points = [
    {
      name: 'Collaborative Platform',
      description:
        'Facilitates seamless communication and collaboration between students, counselors, and parents, ensuring everyone stays informed and engaged.',
      icon: 'mdiAccountGroup',
    },
    {
      name: 'Customizable Action Plans',
      description:
        'Allows users to create and manage personalized action items, helping students stay on track with their academic and personal goals.',
      icon: 'mdiClipboardCheck',
    },
    {
      name: 'Comprehensive College Database',
      description:
        'Provides access to a wide range of colleges, complete with detailed information and personalized recommendations for each student.',
      icon: 'mdiSchoolOutline',
    },
    {
      name: 'Integrated Session Scheduling',
      description:
        'Streamlines the process of scheduling and managing counseling sessions, with calendar integration for easy access and reminders.',
      icon: 'mdiCalendar',
    },
    {
      name: 'Secure Data Management',
      description:
        'Ensures that all user data is protected with advanced security measures, giving users peace of mind about their information.',
      icon: 'mdiLock',
    },
    {
      name: 'User-Friendly Interface',
      description:
        'Features a modern and intuitive design that makes it easy for users to navigate and utilize all the tools available on the platform.',
      icon: 'mdiMonitor',
    },
  ];

  const testimonials = [
    {
      text: "Using ${projectName} has transformed the way we approach student counseling. The platform's intuitive design and comprehensive features make it a must-have for any educational institution.",
      company: 'Future Pathways Inc.',
      user_name: 'Alex Johnson, Director of Counseling',
    },
    {
      text: "As a parent, I appreciate how ${projectName} keeps me informed about my child's progress and upcoming sessions. It's a game-changer for staying involved in their education.",
      company: 'Bright Futures Co.',
      user_name: 'Emily Carter, Parent',
    },
    {
      text: 'The ability to manage action items and schedule sessions seamlessly has made my job as a counselor so much easier. ${projectName} is an invaluable tool for our team.',
      company: 'Guidance Gurus Ltd.',
      user_name: 'Michael Lee, Senior Counselor',
    },
    {
      text: 'I love how ${projectName} provides personalized college recommendations. It has helped me make informed decisions about my future and feel more confident in my choices.',
      company: 'Student Success Network',
      user_name: 'Jessica Smith, High School Senior',
    },
    {
      text: 'The security and ease of use of ${projectName} give us peace of mind. We know our data is safe, and the platform is incredibly user-friendly.',
      company: 'EduTech Innovators',
      user_name: 'David Brown, IT Manager',
    },
    {
      text: "Our school has seen a significant improvement in student engagement since implementing ${projectName}. It's a fantastic resource for both students and staff.",
      company: 'Learning Leaders Academy',
      user_name: 'Sarah Wilson, Principal',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`About Us - Learn More About ${projectName}`}</title>
        <meta
          name='description'
          content={`Discover the mission, values, and team behind ${projectName}. Learn how we empower students, counselors, and parents through our innovative platform.`}
        />
      </Head>
      <WebSiteHeader projectName={'iqtest1'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'iqtest1'}
          image={['Team brainstorming in office']}
          mainText={`Discover the Vision Behind ${projectName}`}
          subTitle={`At ${projectName}, we are dedicated to transforming the educational journey by connecting students, counselors, and parents. Learn more about our mission and the passionate team driving innovation.`}
          design={HeroDesigns.IMAGE_LEFT || ''}
          buttonText={`Meet Our Team`}
        />

        <AboutUsSection
          projectName={'iqtest1'}
          image={['Diverse team working together']}
          mainText={`Empowering Education with ${projectName}`}
          subTitle={`${projectName} is committed to enhancing the educational experience by fostering collaboration between students, counselors, and parents. Our platform is designed to support academic success and personal growth.`}
          design={AboutUsDesigns.IMAGE_RIGHT || ''}
          buttonText={`Learn Our Story`}
        />

        <FeaturesSection
          projectName={'iqtest1'}
          image={['Icons representing key features']}
          withBg={0}
          features={features_points}
          mainText={`Explore ${projectName} Key Features`}
          subTitle={`Discover how ${projectName} enhances the educational journey with innovative features designed for students, counselors, and parents.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS_DIVERSITY || ''}
        />

        <TestimonialsSection
          projectName={'iqtest1'}
          design={TestimonialsDesigns.HORIZONTAL_CAROUSEL_DIVERSITY || ''}
          testimonials={testimonials}
          mainText={`What Users Say About ${projectName} `}
        />
      </main>
      <WebSiteFooter projectName={'iqtest1'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
