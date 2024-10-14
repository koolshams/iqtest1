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

import { update, fetch } from '../../stores/colleges/collegesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditColleges = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    name: '',

    location: '',

    state: '',

    state_type: '',

    type: '',

    ivy_league: false,

    reasons_to_go: '',

    company: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { colleges } = useAppSelector((state) => state.colleges);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { collegesId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: collegesId }));
  }, [collegesId]);

  useEffect(() => {
    if (typeof colleges === 'object') {
      setInitialValues(colleges);
    }
  }, [colleges]);

  useEffect(() => {
    if (typeof colleges === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = colleges[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [colleges]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: collegesId, data }));
    await router.push('/colleges/colleges-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit colleges')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit colleges'}
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
              <FormField label='Name'>
                <Field name='name' placeholder='Name' />
              </FormField>

              <FormField label='Location'>
                <Field name='location' placeholder='Location' />
              </FormField>

              <FormField label='State'>
                <Field name='state' placeholder='State' />
              </FormField>

              <FormField label='StateType' labelFor='state_type'>
                <Field name='state_type' id='state_type' component='select'>
                  <option value='inState'>inState</option>

                  <option value='outState'>outState</option>
                </Field>
              </FormField>

              <FormField label='Type' labelFor='type'>
                <Field name='type' id='type' component='select'>
                  <option value='private'>private</option>

                  <option value='public'>public</option>
                </Field>
              </FormField>

              <FormField label='IvyLeague' labelFor='ivy_league'>
                <Field
                  name='ivy_league'
                  id='ivy_league'
                  component={SwitchField}
                ></Field>
              </FormField>

              <FormField label='ReasonstoGo' hasTextareaHeight>
                <Field
                  name='reasons_to_go'
                  as='textarea'
                  placeholder='ReasonstoGo'
                />
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
                  onClick={() => router.push('/colleges/colleges-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditColleges.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_COLLEGES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditColleges;
