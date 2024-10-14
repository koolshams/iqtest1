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
  PricingDesigns,
  ContactFormDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import PricingSection from '../../components/WebPageComponents/PricingComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

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
      name: 'Personalized Counseling',
      description:
        'Connect with dedicated counselors who provide tailored guidance to help students achieve their academic and personal goals.',
      icon: 'mdiAccountCircle',
    },
    {
      name: 'Action Item Management',
      description:
        'Create, track, and manage tasks with ease, ensuring students stay on top of their responsibilities and progress.',
      icon: 'mdiClipboardList',
    },
    {
      name: 'College Planning Tools',
      description:
        'Access a comprehensive database of colleges and receive personalized recommendations to make informed decisions about your future.',
      icon: 'mdiSchool',
    },
    {
      name: 'Session Scheduling',
      description:
        'Easily schedule and manage counseling sessions with integrated calendar features, ensuring seamless coordination.',
      icon: 'mdiCalendarClock',
    },
    {
      name: 'Secure Communication',
      description:
        'Facilitate safe and secure communication between students, counselors, and parents, ensuring privacy and confidentiality.',
      icon: 'mdiLock',
    },
    {
      name: 'Progress Tracking',
      description:
        'Monitor student progress with detailed reports and analytics, helping counselors and parents support student success.',
      icon: 'mdiChartLine',
    },
  ];

  const pricing_features = {
    standard: {
      features: [
        'Personalized Counseling',
        'Action Item Management',
        'College Planning Tools',
      ],
      limited_features: [
        'Basic Session Scheduling',
        'Limited Progress Tracking',
      ],
    },
    premium: {
      features: [
        'Personalized Counseling',
        'Action Item Management',
        'College Planning Tools',
        'Advanced Session Scheduling',
      ],
      also_included: ['Enhanced Progress Tracking', 'Secure Communication'],
    },
    business: {
      features: [
        'Personalized Counseling',
        'Action Item Management',
        'College Planning Tools',
        'Advanced Session Scheduling',
        'Comprehensive Progress Tracking',
        'Secure Communication',
        'Dedicated Support',
      ],
    },
  };

  const description = {
    standard:
      'Ideal for individual students or parents seeking basic counseling and planning tools to support educational goals.',
    premium:
      'Perfect for small schools or counseling agencies looking for advanced features and enhanced tracking capabilities.',
    business:
      'Designed for large educational institutions or enterprises requiring comprehensive features and dedicated support for extensive user management.',
  };

  const faqs = [
    {
      question: 'What features are included in the Standard plan?',
      answer:
        'The Standard plan includes personalized counseling, action item management, and college planning tools. It is designed for individuals seeking basic support for their educational journey.',
    },
    {
      question: 'How does session scheduling work?',
      answer:
        'Session scheduling allows users to book and manage counseling sessions through an integrated calendar. Premium and Business plans offer advanced scheduling features for seamless coordination.',
    },
    {
      question: 'Can I upgrade my plan later?',
      answer:
        'Yes, you can upgrade your plan at any time to access additional features and benefits. Simply contact our support team to assist you with the upgrade process.',
    },
    {
      question: 'Is my data secure on ${projectName}?',
      answer:
        'Absolutely. We prioritize data security with robust encryption and access controls to ensure your information is protected and only accessible to authorized users.',
    },
    {
      question: 'What support options are available?',
      answer:
        'Our Business plan includes dedicated support for extensive user management. All plans have access to our help center and email support for any inquiries or issues.',
    },
    {
      question: 'How do I get started with ${projectName}?',
      answer:
        'To get started, sign up for an account on our website and choose the plan that best suits your needs. Our intuitive interface will guide you through the setup process.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Our Services - Explore What ${projectName} Offers`}</title>
        <meta
          name='description'
          content={`Discover the range of services provided by ${projectName}, designed to enhance the educational experience for students, counselors, and parents. Learn about our features, pricing, and more.`}
        />
      </Head>
      <WebSiteHeader projectName={'iqtest1'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'iqtest1'}
          image={['Students engaging in learning']}
          mainText={`Unlock Your Potential with ${projectName}`}
          subTitle={`Explore the comprehensive services offered by ${projectName} to enhance your educational journey. From personalized counseling to college planning, we provide the tools you need to succeed.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Discover Our Services`}
        />

        <FeaturesSection
          projectName={'iqtest1'}
          image={['Icons representing key services']}
          withBg={1}
          features={features_points}
          mainText={`Explore ${projectName} Core Features`}
          subTitle={`Discover how ${projectName} empowers students, counselors, and parents with innovative features designed to enhance the educational experience.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <PricingSection
          projectName={'iqtest1'}
          withBg={0}
          features={pricing_features}
          description={description}
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
          image={['Person using a laptop']}
          mainText={`Reach Out to ${projectName} Support `}
          subTitle={`Have questions or need assistance? Contact us anytime, and our team will respond promptly to help you with your inquiries.`}
        />
      </main>
      <WebSiteFooter projectName={'iqtest1'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
