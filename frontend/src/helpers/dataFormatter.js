import dayjs from 'dayjs';
import _ from 'lodash';

export default {
  filesFormatter(arr) {
    if (!arr || !arr.length) return [];
    return arr.map((item) => item);
  },
  imageFormatter(arr) {
    if (!arr || !arr.length) return [];
    return arr.map((item) => ({
      publicUrl: item.publicUrl || '',
    }));
  },
  oneImageFormatter(arr) {
    if (!arr || !arr.length) return '';
    return arr[0].publicUrl || '';
  },
  dateFormatter(date) {
    if (!date) return '';
    return dayjs(date).format('YYYY-MM-DD');
  },
  dateTimeFormatter(date) {
    if (!date) return '';
    return dayjs(date).format('YYYY-MM-DD HH:mm');
  },
  booleanFormatter(val) {
    return val ? 'Yes' : 'No';
  },
  dataGridEditFormatter(obj) {
    return _.transform(obj, (result, value, key) => {
      if (_.isArray(value)) {
        result[key] = _.map(value, 'id');
      } else if (_.isObject(value)) {
        result[key] = value.id;
      } else {
        result[key] = value;
      }
    });
  },

  usersManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.firstName);
  },
  usersOneListFormatter(val) {
    if (!val) return '';
    return val.firstName;
  },
  usersManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.firstName };
    });
  },
  usersOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.firstName, id: val.id };
  },

  action_itemsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.title);
  },
  action_itemsOneListFormatter(val) {
    if (!val) return '';
    return val.title;
  },
  action_itemsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.title };
    });
  },
  action_itemsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.title, id: val.id };
  },

  collegesManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.name);
  },
  collegesOneListFormatter(val) {
    if (!val) return '';
    return val.name;
  },
  collegesManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.name };
    });
  },
  collegesOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.name, id: val.id };
  },

  my_collegesManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.link_to_college);
  },
  my_collegesOneListFormatter(val) {
    if (!val) return '';
    return val.link_to_college;
  },
  my_collegesManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.link_to_college };
    });
  },
  my_collegesOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.link_to_college, id: val.id };
  },

  sessionsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.title);
  },
  sessionsOneListFormatter(val) {
    if (!val) return '';
    return val.title;
  },
  sessionsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.title };
    });
  },
  sessionsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.title, id: val.id };
  },

  studentsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.user);
  },
  studentsOneListFormatter(val) {
    if (!val) return '';
    return val.user;
  },
  studentsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.user };
    });
  },
  studentsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.user, id: val.id };
  },

  rolesManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.name);
  },
  rolesOneListFormatter(val) {
    if (!val) return '';
    return val.name;
  },
  rolesManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.name };
    });
  },
  rolesOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.name, id: val.id };
  },

  permissionsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.name);
  },
  permissionsOneListFormatter(val) {
    if (!val) return '';
    return val.name;
  },
  permissionsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.name };
    });
  },
  permissionsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.name, id: val.id };
  },

  companyManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.name);
  },
  companyOneListFormatter(val) {
    if (!val) return '';
    return val.name;
  },
  companyManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.name };
    });
  },
  companyOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.name, id: val.id };
  },
};
