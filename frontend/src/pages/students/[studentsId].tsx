import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

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
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/students/studentsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditStudents = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    user: '',

    action_items: [],

    sessions: [],

    my_colleges: [],

    company: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { students } = useAppSelector((state) => state.students);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { studentsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: studentsId }));
  }, [studentsId]);

  useEffect(() => {
    if (typeof students === 'object') {
      setInitialValues(students);
    }
  }, [students]);

  useEffect(() => {
    if (typeof students === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = students[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [students]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: studentsId, data }));
    await router.push('/students/students-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit students')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit students'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='User' labelFor='user'>
                <Field
                  name='user'
                  id='user'
                  component={SelectField}
                  options={initialValues.user}
                  itemRef={'users'}
                  showField={'firstName'}
                ></Field>
              </FormField>

              <FormField label='ActionItems' labelFor='action_items'>
                <Field
                  name='action_items'
                  id='action_items'
                  component={SelectFieldMany}
                  options={initialValues.action_items}
                  itemRef={'action_items'}
                  showField={'title'}
                ></Field>
              </FormField>

              <FormField label='Sessions' labelFor='sessions'>
                <Field
                  name='sessions'
                  id='sessions'
                  component={SelectFieldMany}
                  options={initialValues.sessions}
                  itemRef={'sessions'}
                  showField={'title'}
                ></Field>
              </FormField>

              <FormField label='MyColleges' labelFor='my_colleges'>
                <Field
                  name='my_colleges'
                  id='my_colleges'
                  component={SelectFieldMany}
                  options={initialValues.my_colleges}
                  itemRef={'my_colleges'}
                  showField={'link_to_college'}
                ></Field>
              </FormField>

              <FormField label='company' labelFor='company'>
                <Field
                  name='company'
                  id='company'
                  component={SelectField}
                  options={initialValues.company}
                  itemRef={'company'}
                  showField={'name'}
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
                  onClick={() => router.push('/students/students-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditStudents.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_STUDENTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditStudents;
