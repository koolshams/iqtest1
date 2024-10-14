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
  FaqDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

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

  const faqs = [
    {
      question: 'What is ${projectName} and how does it work?',
      answer:
        '${projectName} is a platform designed to connect students, counselors, and parents. It offers features like personalized counseling, action item management, and college planning tools to enhance the educational experience.',
    },
    {
      question: 'How do I sign up for ${projectName}?',
      answer:
        "To sign up, visit our website and click on the 'Sign Up' button. Fill in the required information, choose your plan, and start exploring the features of ${projectName}.",
    },
    {
      question: 'What are the different subscription plans available?',
      answer:
        '${projectName} offers three plans: Standard, Premium, and Business. Each plan is tailored to meet the needs of individuals, small agencies, and large enterprises, respectively.',
    },
    {
      question: 'Can I access ${projectName} on mobile devices?',
      answer:
        'Yes, ${projectName} is accessible via web browsers on both desktop and mobile devices, ensuring you can stay connected and manage your tasks on the go.',
    },
    {
      question: 'How secure is my data on ${projectName}?',
      answer:
        'We prioritize your data security with robust encryption and access controls, ensuring that your information is safe and only accessible to authorized users.',
    },
    {
      question: 'How can I contact support if I have issues?',
      answer:
        'If you encounter any issues, you can reach out to our support team via the contact form on our website. We are here to assist you with any inquiries or problems you may have.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Frequently Asked Questions - ${projectName}`}</title>
        <meta
          name='description'
          content={`Find answers to common questions about ${projectName}. Learn more about our features, pricing, and how to get started.`}
        />
      </Head>
      <WebSiteHeader projectName={'iqtest1'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'iqtest1'}
          image={['Person reading a FAQ document']}
          mainText={`Your Questions Answered with ${projectName}`}
          subTitle={`Explore our comprehensive FAQ section to find answers to your questions about ${projectName}. Learn more about our features, pricing, and how to get started.`}
          design={HeroDesigns.TEXT_CENTER || ''}
          buttonText={`Explore FAQs`}
        />

        <FaqSection
          projectName={'iqtest1'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions About ${projectName} `}
        />

        <ContactFormSection
          projectName={'iqtest1'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person writing an email']}
          mainText={`Contact ${projectName} Support Team `}
          subTitle={`We're here to help with any questions or issues. Reach out to us anytime, and our team will respond promptly to assist you.`}
        />
      </main>
      <WebSiteFooter projectName={'iqtest1'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
