import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces';

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ? icon.mdiAccountGroup : icon.mdiTable,
    permissions: 'READ_USERS',
  },
  {
    href: '/action_items/action_items-list',
    label: 'Action items',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiCheckCircle ? icon.mdiCheckCircle : icon.mdiTable,
    permissions: 'READ_ACTION_ITEMS',
  },
  {
    href: '/colleges/colleges-list',
    label: 'Colleges',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiSchoolOutline ? icon.mdiSchoolOutline : icon.mdiTable,
    permissions: 'READ_COLLEGES',
  },
  {
    href: '/companies/companies-list',
    label: 'Companies',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiDomain ? icon.mdiDomain : icon.mdiTable,
    permissions: 'READ_COMPANIES',
  },
  {
    href: '/counselors/counselors-list',
    label: 'Counselors',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountTie ? icon.mdiAccountTie : icon.mdiTable,
    permissions: 'READ_COUNSELORS',
  },
  {
    href: '/my_colleges/my_colleges-list',
    label: 'My colleges',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiStarCircle ? icon.mdiStarCircle : icon.mdiTable,
    permissions: 'READ_MY_COLLEGES',
  },
  {
    href: '/parents/parents-list',
    label: 'Parents',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ? icon.mdiAccountGroup : icon.mdiTable,
    permissions: 'READ_PARENTS',
  },
  {
    href: '/sessions/sessions-list',
    label: 'Sessions',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiCalendar ? icon.mdiCalendar : icon.mdiTable,
    permissions: 'READ_SESSIONS',
  },
  {
    href: '/students/students-list',
    label: 'Students',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiSchool ? icon.mdiSchool : icon.mdiTable,
    permissions: 'READ_STUDENTS',
  },
  {
    href: '/roles/roles-list',
    label: 'Roles',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountVariantOutline
      ? icon.mdiShieldAccountVariantOutline
      : icon.mdiTable,
    permissions: 'READ_ROLES',
  },
  {
    href: '/permissions/permissions-list',
    label: 'Permissions',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountOutline
      ? icon.mdiShieldAccountOutline
      : icon.mdiTable,
    permissions: 'READ_PERMISSIONS',
  },
  {
    href: '/company/company-list',
    label: 'Company',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ? icon.mdiTable : icon.mdiTable,
    permissions: 'READ_COMPANY',
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },
  {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS',
  },
];

export default menuAside;
