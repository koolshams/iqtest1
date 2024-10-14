import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/students/studentsSlice';
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

const StudentsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { students } = useAppSelector((state) => state.students);

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
        <title>{getPageTitle('View students')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View students')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>User</p>

            <p>{students?.user?.firstName ?? 'No data'}</p>
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
                    {students.action_items &&
                      Array.isArray(students.action_items) &&
                      students.action_items.map((item: any) => (
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
              {!students?.action_items?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Sessions</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>

                      <th>Title</th>

                      <th>Time</th>

                      <th>LinktoRecording</th>

                      <th>PrepSummary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.sessions &&
                      Array.isArray(students.sessions) &&
                      students.sessions.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/sessions/sessions-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='date'>
                            {dataFormatter.dateTimeFormatter(item.date)}
                          </td>

                          <td data-label='title'>{item.title}</td>

                          <td data-label='time'>
                            {dataFormatter.dateTimeFormatter(item.time)}
                          </td>

                          <td data-label='link_to_recording'>
                            {item.link_to_recording}
                          </td>

                          <td data-label='prep_summary'>{item.prep_summary}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!students?.sessions?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>MyColleges</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>SuggestedAtlasScore</th>

                      <th>Challenge</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.my_colleges &&
                      Array.isArray(students.my_colleges) &&
                      students.my_colleges.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/my_colleges/my_colleges-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='suggested_atlas_score'>
                            {item.suggested_atlas_score}
                          </td>

                          <td data-label='challenge'>{item.challenge}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!students?.my_colleges?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>company</p>

            <p>{students?.company?.name ?? 'No data'}</p>
          </div>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/students/students-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

StudentsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_STUDENTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default StudentsView;
