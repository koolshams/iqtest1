import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/sessions/sessionsSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

import { hasPermission } from '../../helpers/userPermissions';

const SessionsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { sessions } = useAppSelector((state) => state.sessions);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View sessions')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View sessions')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <FormField label='Date'>
            {sessions.date ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  sessions.date
                    ? new Date(dayjs(sessions.date).format('YYYY-MM-DD hh:mm'))
                    : null
                }
                disabled
              />
            ) : (
              <p>No Date</p>
            )}
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Title</p>
            <p>{sessions?.title}</p>
          </div>

          <FormField label='Time'>
            {sessions.time ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  sessions.time
                    ? new Date(dayjs(sessions.time).format('YYYY-MM-DD hh:mm'))
                    : null
                }
                disabled
              />
            ) : (
              <p>No Time</p>
            )}
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>LinktoRecording</p>
            <p>{sessions?.link_to_recording}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>SessionDetails</p>
            {sessions.session_details ? (
              <p
                dangerouslySetInnerHTML={{ __html: sessions.session_details }}
              />
            ) : (
              <p>No data</p>
            )}
          </div>

          <>
            <p className={'block font-bold mb-2'}>ActionItems</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>

                      <th>DueDate</th>

                      <th>Category</th>

                      <th>Comments</th>

                      <th>Status</th>

                      <th>Output</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.action_items &&
                      Array.isArray(sessions.action_items) &&
                      sessions.action_items.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/action_items/action_items-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='title'>{item.title}</td>

                          <td data-label='due_date'>
                            {dataFormatter.dateTimeFormatter(item.due_date)}
                          </td>

                          <td data-label='category'>{item.category}</td>

                          <td data-label='comments'>{item.comments}</td>

                          <td data-label='status'>{item.status}</td>

                          <td data-label='output'>{item.output}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!sessions?.action_items?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <FormField label='Multi Text' hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={sessions?.prep_summary}
            />
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>company</p>

            <p>{sessions?.company?.name ?? 'No data'}</p>
          </div>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/sessions/sessions-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

SessionsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_SESSIONS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default SessionsView;
