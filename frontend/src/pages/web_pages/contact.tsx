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
  ContactFormDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

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

  const faqs = [
    {
      question: 'How can I create an account?',
      answer:
        'To create an account, visit our sign-up page and fill in the required details. Once registered, you can start exploring the features of ${projectName}.',
    },
    {
      question: 'What support options are available?',
      answer:
        'We offer email support for all users. Business plan subscribers also receive dedicated support for more personalized assistance.',
    },
    {
      question: 'Can I change my subscription plan?',
      answer:
        'Yes, you can upgrade or downgrade your subscription plan at any time. Contact our support team for assistance with changing your plan.',
    },
    {
      question: 'Is my data secure with ${projectName}?',
      answer:
        'We prioritize your data security with advanced encryption and access controls, ensuring your information is safe and secure.',
    },
    {
      question: 'How do I schedule a counseling session?',
      answer:
        "Log in to your account, navigate to the 'Sessions' tab, and select an available time slot with your counselor. You will receive a confirmation email with the session details.",
    },
    {
      question: 'What features are included in the Premium plan?',
      answer:
        'The Premium plan includes personalized counseling, action item management, advanced session scheduling, enhanced progress tracking, and secure communication.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Contact Us - Get in Touch with ${projectName}`}</title>
        <meta
          name='description'
          content={`Reach out to ${projectName} for any inquiries or support. Our team is here to assist you with any questions you may have.`}
        />
      </Head>
      <WebSiteHeader projectName={'iqtest1'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'iqtest1'}
          image={['Customer service representative smiling']}
          mainText={`Connect with ${projectName} Today`}
          subTitle={`We're here to help with any questions or support you need. Reach out to our team and let us assist you on your journey with ${projectName}.`}
          design={HeroDesigns.TEXT_CENTER || ''}
          buttonText={`Contact Us Now`}
        />

        <FaqSection
          projectName={'iqtest1'}
          design={FaqDesigns.TWO_COLUMN || ''}
          faqs={faqs}
          mainText={`Common Questions About ${projectName} `}
        />

        <ContactFormSection
          projectName={'iqtest1'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person typing on keyboard']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`We're available to assist you with any inquiries or support needs. Reach out to us, and we'll respond promptly to help you.`}
        />
      </main>
      <WebSiteFooter projectName={'iqtest1'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
