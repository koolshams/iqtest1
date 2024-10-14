import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/colleges/collegesSlice';
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

const CollegesView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { colleges } = useAppSelector((state) => state.colleges);

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
        <title>{getPageTitle('View colleges')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View colleges')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{colleges?.name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Location</p>
            <p>{colleges?.location}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>State</p>
            <p>{colleges?.state}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>StateType</p>
            <p>{colleges?.state_type ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Type</p>
            <p>{colleges?.type ?? 'No data'}</p>
          </div>

          <FormField label='IvyLeague'>
            <SwitchField
              field={{ name: 'ivy_league', value: colleges?.ivy_league }}
              form={{ setFieldValue: () => null }}
              disabled
            />
          </FormField>

          <FormField label='Multi Text' hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={colleges?.reasons_to_go}
            />
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>company</p>

            <p>{colleges?.company?.name ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>My_colleges LinktoCollege</p>
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
                    {colleges.my_colleges_link_to_college &&
                      Array.isArray(colleges.my_colleges_link_to_college) &&
                      colleges.my_colleges_link_to_college.map((item: any) => (
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
              {!colleges?.my_colleges_link_to_college?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/colleges/colleges-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

CollegesView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_COLLEGES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default CollegesView;
