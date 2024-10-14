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

import { update, fetch } from '../../stores/action_items/action_itemsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditAction_items = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    title: '',

    due_date: new Date(),

    category: '',

    comments: '',

    status: '',

    output: '',

    company: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { action_items } = useAppSelector((state) => state.action_items);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { action_itemsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: action_itemsId }));
  }, [action_itemsId]);

  useEffect(() => {
    if (typeof action_items === 'object') {
      setInitialValues(action_items);
    }
  }, [action_items]);

  useEffect(() => {
    if (typeof action_items === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = action_items[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [action_items]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: action_itemsId, data }));
    await router.push('/action_items/action_items-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit action_items')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit action_items'}
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
              <FormField label='Title'>
                <Field name='title' placeholder='Title' />
              </FormField>

              <FormField label='DueDate'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.due_date
                      ? new Date(
                          dayjs(initialValues.due_date).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, due_date: date })
                  }
                />
              </FormField>

              <FormField label='Category' labelFor='category'>
                <Field name='category' id='category' component='select'>
                  <option value='academics'>academics</option>

                  <option value='athletics'>athletics</option>

                  <option value='communityengagement'>
                    communityengagement
                  </option>

                  <option value='personalproject'>personalproject</option>
                </Field>
              </FormField>

              <FormField label='Comments' hasTextareaHeight>
                <Field name='comments' as='textarea' placeholder='Comments' />
              </FormField>

              <FormField label='Status' labelFor='status'>
                <Field name='status' id='status' component='select'>
                  <option value='notstarted'>notstarted</option>

                  <option value='inprogress'>inprogress</option>

                  <option value='completed'>completed</option>
                </Field>
              </FormField>

              <FormField label='Output' hasTextareaHeight>
                <Field name='output' as='textarea' placeholder='Output' />
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
                  onClick={() => router.push('/action_items/action_items-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditAction_items.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_ACTION_ITEMS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditAction_items;
