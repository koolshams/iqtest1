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

import { update, fetch } from '../../stores/my_colleges/my_collegesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditMy_colleges = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    link_to_college: '',

    suggested_atlas_score: '',

    challenge: '',

    company: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { my_colleges } = useAppSelector((state) => state.my_colleges);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { my_collegesId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: my_collegesId }));
  }, [my_collegesId]);

  useEffect(() => {
    if (typeof my_colleges === 'object') {
      setInitialValues(my_colleges);
    }
  }, [my_colleges]);

  useEffect(() => {
    if (typeof my_colleges === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = my_colleges[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [my_colleges]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: my_collegesId, data }));
    await router.push('/my_colleges/my_colleges-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit my_colleges')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit my_colleges'}
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
              <FormField label='LinktoCollege' labelFor='link_to_college'>
                <Field
                  name='link_to_college'
                  id='link_to_college'
                  component={SelectField}
                  options={initialValues.link_to_college}
                  itemRef={'colleges'}
                  showField={'name'}
                ></Field>
              </FormField>

              <FormField label='SuggestedAtlasScore'>
                <Field
                  type='number'
                  name='suggested_atlas_score'
                  placeholder='SuggestedAtlasScore'
                />
              </FormField>

              <FormField label='Challenge' labelFor='challenge'>
                <Field name='challenge' id='challenge' component='select'>
                  <option value='HighReach'>HighReach</option>

                  <option value='Reach'>Reach</option>

                  <option value='Target'>Target</option>

                  <option value='Safe'>Safe</option>
                </Field>
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
                  onClick={() => router.push('/my_colleges/my_colleges-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditMy_colleges.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_MY_COLLEGES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditMy_colleges;
