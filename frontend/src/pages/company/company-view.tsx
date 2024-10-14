import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/company/companySlice';
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

const CompanyView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { company } = useAppSelector((state) => state.company);

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
        <title>{getPageTitle('View company')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View company')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{company?.name}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Users Company</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>First Name</th>

                      <th>Last Name</th>

                      <th>Phone Number</th>

                      <th>E-Mail</th>

                      <th>Disabled</th>
                    </tr>
                  </thead>
                  <tbody>
                    {company.users_company &&
                      Array.isArray(company.users_company) &&
                      company.users_company.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/users/users-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='firstName'>{item.firstName}</td>

                          <td data-label='lastName'>{item.lastName}</td>

                          <td data-label='phoneNumber'>{item.phoneNumber}</td>

                          <td data-label='email'>{item.email}</td>

                          <td data-label='disabled'>
                            {dataFormatter.booleanFormatter(item.disabled)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!company?.users_company?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Action_items company</p>
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
                    {company.action_items_company &&
                      Array.isArray(company.action_items_company) &&
                      company.action_items_company.map((item: any) => (
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
              {!company?.action_items_company?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Colleges company</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>

                      <th>Location</th>

                      <th>State</th>

                      <th>StateType</th>

                      <th>Type</th>

                      <th>IvyLeague</th>

                      <th>ReasonstoGo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {company.colleges_company &&
                      Array.isArray(company.colleges_company) &&
                      company.colleges_company.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/colleges/colleges-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='name'>{item.name}</td>

                          <td data-label='location'>{item.location}</td>

                          <td data-label='state'>{item.state}</td>

                          <td data-label='state_type'>{item.state_type}</td>

                          <td data-label='type'>{item.type}</td>

                          <td data-label='ivy_league'>
                            {dataFormatter.booleanFormatter(item.ivy_league)}
                          </td>

                          <td data-label='reasons_to_go'>
                            {item.reasons_to_go}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!company?.colleges_company?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Companies company</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>CompanyName</th>
                    </tr>
                  </thead>
                  <tbody>
                    {company.companies_company &&
                      Array.isArray(company.companies_company) &&
                      company.companies_company.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/companies/companies-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='name'>{item.name}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!company?.companies_company?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Counselors company</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr></tr>
                  </thead>
                  <tbody>
                    {company.counselors_company &&
                      Array.isArray(company.counselors_company) &&
                      company.counselors_company.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/counselors/counselors-view/?id=${item.id}`,
                            )
                          }
                        ></tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!company?.counselors_company?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>My_colleges company</p>
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
                    {company.my_colleges_company &&
                      Array.isArray(company.my_colleges_company) &&
                      company.my_colleges_company.map((item: any) => (
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
              {!company?.my_colleges_company?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Parents company</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr></tr>
                  </thead>
                  <tbody>
                    {company.parents_company &&
                      Array.isArray(company.parents_company) &&
                      company.parents_company.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/parents/parents-view/?id=${item.id}`)
                          }
                        ></tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!company?.parents_company?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Sessions company</p>
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
                    {company.sessions_company &&
                      Array.isArray(company.sessions_company) &&
                      company.sessions_company.map((item: any) => (
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
              {!company?.sessions_company?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Students company</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr></tr>
                  </thead>
                  <tbody>
                    {company.students_company &&
                      Array.isArray(company.students_company) &&
                      company.students_company.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/students/students-view/?id=${item.id}`,
                            )
                          }
                        ></tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!company?.students_company?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/company/company-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

CompanyView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_COMPANY'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default CompanyView;
