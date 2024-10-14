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
  FeaturesDesigns,
  AboutUsDesigns,
  FaqDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

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
      name: 'Personalized Action Items',
      description:
        'Counselors and students can create and manage personalized tasks to track progress and achieve goals effectively.',
      icon: 'mdiCheckCircle',
    },
    {
      name: 'Session Scheduling',
      description:
        'Easily schedule and manage counseling sessions with integrated calendar features, ensuring seamless coordination.',
      icon: 'mdiCalendarClock',
    },
    {
      name: 'College Exploration',
      description:
        'Access a comprehensive list of colleges and receive tailored recommendations to make informed decisions about your future.',
      icon: 'mdiSchool',
    },
  ];

  const faqs = [
    {
      question: 'How do I schedule a session?',
      answer:
        "To schedule a session, log in to your ${projectName} account, navigate to the 'Sessions' tab, and select an available time slot with your counselor. You will receive a confirmation email with the session details.",
    },
    {
      question: 'Can I view all colleges in the system?',
      answer:
        "Yes, students can view a comprehensive list of all colleges by accessing the 'All Colleges' section. This feature allows you to explore various options and make informed decisions about your future.",
    },
    {
      question: 'How are action items managed?',
      answer:
        'Action items can be created and managed by both counselors and students. They include tasks with due dates, categories, and status updates to help track progress effectively.',
    },
    {
      question: 'What is the role of parents in ${projectName}?',
      answer:
        "Parents can view their child's progress, session details, and communicate with counselors through the portal. This ensures they are actively involved in their child's educational journey.",
    },
    {
      question: 'Is there a mobile app available?',
      answer:
        'Currently, ${projectName} is accessible via web browsers on both desktop and mobile devices. We are working on developing a dedicated mobile app for enhanced accessibility.',
    },
    {
      question: 'How secure is my data on ${projectName}?',
      answer:
        'We prioritize your data security by implementing robust encryption and access controls. Your information is stored securely and only accessible to authorized users.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Welcome to Our Multi-Tenant Counseling Portal`}</title>
        <meta
          name='description'
          content={`Explore our comprehensive counseling portal designed for students, counselors, and parents to manage sessions, action items, and college planning efficiently.`}
        />
      </Head>
      <WebSiteHeader projectName={'iqtest1'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'iqtest1'}
          image={['Students collaborating with counselor']}
          mainText={`Empower Your Future with ${projectName}`}
          subTitle={`Connect with counselors, manage tasks, and explore colleges effortlessly. ${projectName} is your gateway to academic success and personal growth.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Get Started Now`}
        />

        <FeaturesSection
          projectName={'iqtest1'}
          image={['Interactive dashboard with icons']}
          withBg={1}
          features={features_points}
          mainText={`Discover Key Features of ${projectName}`}
          subTitle={`Explore how ${projectName} enhances the counseling experience for students, counselors, and parents with these powerful features.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <AboutUsSection
          projectName={'iqtest1'}
          image={['Team collaborating on project']}
          mainText={`Transforming Education with ${projectName}`}
          subTitle={`${projectName} connects students, counselors, and parents in a collaborative environment to foster academic success and personal growth. Our mission is to empower every student with the tools and guidance they need to excel.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Learn More`}
        />

        <FaqSection
          projectName={'iqtest1'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions about ${projectName} `}
        />

        <ContactFormSection
          projectName={'iqtest1'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person typing on laptop']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Have questions or need assistance? Reach out to us anytime, and our team will respond promptly to help you with your inquiries.`}
        />
      </main>
      <WebSiteFooter projectName={'iqtest1'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
