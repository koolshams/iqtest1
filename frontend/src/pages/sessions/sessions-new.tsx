import {
  mdiAccount,
  mdiChartTimelineVariant,
  mdiMail,
  mdiUpload,
} from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SwitchField } from '../../components/SwitchField';

import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { RichTextField } from '../../components/RichTextField';

import { create } from '../../stores/sessions/sessionsSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  date: '',

  title: '',

  time: '',

  link_to_recording: '',

  session_details: '',

  action_items: [],

  prep_summary: '',

  company: '',
};

const SessionsNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // get from url params
  const { dateRangeStart, dateRangeEnd } = router.query;

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/sessions/sessions-list');
  };
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='New Item'
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={
              dateRangeStart && dateRangeEnd
                ? {
                    ...initialValues,
                    date: moment(dateRangeStart).format('YYYY-MM-DDTHH:mm'),
                    time: moment(dateRangeEnd).format('YYYY-MM-DDTHH:mm'),
                  }
                : initialValues
            }
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Date'>
                <Field type='datetime-local' name='date' placeholder='Date' />
              </FormField>

              <FormField label='Title'>
                <Field name='title' placeholder='Title' />
              </FormField>

              <FormField label='Time'>
                <Field type='datetime-local' name='time' placeholder='Time' />
              </FormField>

              <FormField label='LinktoRecording'>
                <Field name='link_to_recording' placeholder='LinktoRecording' />
              </FormField>

              <FormField label='SessionDetails' hasTextareaHeight>
                <Field
                  name='session_details'
                  id='session_details'
                  component={RichTextField}
                ></Field>
              </FormField>

              <FormField label='ActionItems' labelFor='action_items'>
                <Field
                  name='action_items'
                  id='action_items'
                  itemRef={'action_items'}
                  options={[]}
                  component={SelectFieldMany}
                ></Field>
              </FormField>

              <FormField label='PrepSummary' hasTextareaHeight>
                <Field
                  name='prep_summary'
                  as='textarea'
                  placeholder='PrepSummary'
                />
              </FormField>

              <FormField label='company' labelFor='company'>
                <Field
                  name='company'
                  id='company'
                  component={SelectField}
                  options={[]}
                  itemRef={'company'}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/sessions/sessions-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

SessionsNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_SESSIONS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default SessionsNew;
