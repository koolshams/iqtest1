const { v4: uuid } = require('uuid');

module.exports = {
  /**
   * @param{import("sequelize").QueryInterface} queryInterface
   * @return {Promise<void>}
   */
  async up(queryInterface) {
    const createdAt = new Date();
    const updatedAt = new Date();

    /** @type {Map<string, string>} */
    const idMap = new Map();

    /**
     * @param {string} key
     * @return {string}
     */
    function getId(key) {
      if (idMap.has(key)) {
        return idMap.get(key);
      }
      const id = uuid();
      idMap.set(key, id);
      return id;
    }

    await queryInterface.bulkInsert('roles', [
      {
        id: getId('SuperAdmin'),
        name: 'Super Administrator',
        createdAt,
        updatedAt,
      },

      {
        id: getId('Administrator'),
        name: 'Administrator',
        createdAt,
        updatedAt,
      },

      {
        id: getId('SystemManager'),
        name: 'System Manager',
        createdAt,
        updatedAt,
      },

      {
        id: getId('CounselingDirector'),
        name: 'Counseling Director',
        createdAt,
        updatedAt,
      },

      {
        id: getId('LeadCounselor'),
        name: 'Lead Counselor',
        createdAt,
        updatedAt,
      },

      { id: getId('Counselor'), name: 'Counselor', createdAt, updatedAt },

      { id: getId('Student'), name: 'Student', createdAt, updatedAt },
    ]);

    /**
     * @param {string} name
     */
    function createPermissions(name) {
      return [
        {
          id: getId(`CREATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `CREATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`READ_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `READ_${name.toUpperCase()}`,
        },
        {
          id: getId(`UPDATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `UPDATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`DELETE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `DELETE_${name.toUpperCase()}`,
        },
      ];
    }

    const entities = [
      'users',
      'action_items',
      'colleges',
      'companies',
      'counselors',
      'my_colleges',
      'parents',
      'sessions',
      'students',
      'roles',
      'permissions',
      'company',
      ,
    ];
    await queryInterface.bulkInsert(
      'permissions',
      entities.flatMap(createPermissions),
    );
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`READ_API_DOCS`),
        createdAt,
        updatedAt,
        name: `READ_API_DOCS`,
      },
    ]);
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`CREATE_SEARCH`),
        createdAt,
        updatedAt,
        name: `CREATE_SEARCH`,
      },
    ]);

    await queryInterface.bulkUpdate(
      'roles',
      { globalAccess: true },
      { id: getId('SuperAdmin') },
    );

    await queryInterface.sequelize
      .query(`create table "rolesPermissionsPermissions"
(
"createdAt"           timestamp with time zone not null,
"updatedAt"           timestamp with time zone not null,
"roles_permissionsId" uuid                     not null,
"permissionId"        uuid                     not null,
primary key ("roles_permissionsId", "permissionId")
);`);

    await queryInterface.bulkInsert('rolesPermissionsPermissions', [
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CounselingDirector'),
        permissionId: getId('CREATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CounselingDirector'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCounselor'),
        permissionId: getId('CREATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCounselor'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Counselor'),
        permissionId: getId('CREATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Counselor'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Student'),
        permissionId: getId('CREATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Student'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_ACTION_ITEMS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_ACTION_ITEMS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_ACTION_ITEMS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_ACTION_ITEMS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CounselingDirector'),
        permissionId: getId('CREATE_ACTION_ITEMS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CounselingDirector'),
        permissionId: getId('READ_ACTION_ITEMS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CounselingDirector'),
        permissionId: getId('UPDATE_ACTION_ITEMS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CounselingDirector'),
        permissionId: getId('DELETE_ACTION_ITEMS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCounselor'),
        permissionId: getId('CREATE_ACTION_ITEMS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCounselor'),
        permissionId: getId('READ_ACTION_ITEMS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCounselor'),
        permissionId: getId('UPDATE_ACTION_ITEMS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCounselor'),
        permissionId: getId('DELETE_ACTION_ITEMS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Counselor'),
        permissionId: getId('CREATE_ACTION_ITEMS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Counselor'),
        permissionId: getId('READ_ACTION_ITEMS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Counselor'),
        permissionId: getId('UPDATE_ACTION_ITEMS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Counselor'),
        permissionId: getId('DELETE_ACTION_ITEMS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Student'),
        permissionId: getId('CREATE_ACTION_ITEMS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Student'),
        permissionId: getId('READ_ACTION_ITEMS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CounselingDirector'),
        permissionId: getId('CREATE_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CounselingDirector'),
        permissionId: getId('READ_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CounselingDirector'),
        permissionId: getId('UPDATE_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CounselingDirector'),
        permissionId: getId('DELETE_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCounselor'),
        permissionId: getId('CREATE_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCounselor'),
        permissionId: getId('READ_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCounselor'),
        permissionId: getId('UPDATE_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCounselor'),
        permissionId: getId('DELETE_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Counselor'),
        permissionId: getId('CREATE_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Counselor'),
        permissionId: getId('READ_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Student'),
        permissionId: getId('CREATE_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Student'),
        permissionId: getId('READ_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_COMPANIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_COMPANIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_COMPANIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_COMPANIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CounselingDirector'),
        permissionId: getId('CREATE_COMPANIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CounselingDirector'),
        permissionId: getId('READ_COMPANIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCounselor'),
        permissionId: getId('CREATE_COMPANIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCounselor'),
        permissionId: getId('READ_COMPANIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Counselor'),
        permissionId: getId('CREATE_COMPANIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Counselor'),
        permissionId: getId('READ_COMPANIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_COUNSELORS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_COUNSELORS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_COUNSELORS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_COUNSELORS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CounselingDirector'),
        permissionId: getId('CREATE_COUNSELORS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CounselingDirector'),
        permissionId: getId('READ_COUNSELORS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CounselingDirector'),
        permissionId: getId('UPDATE_COUNSELORS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CounselingDirector'),
        permissionId: getId('DELETE_COUNSELORS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCounselor'),
        permissionId: getId('CREATE_COUNSELORS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCounselor'),
        permissionId: getId('READ_COUNSELORS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Counselor'),
        permissionId: getId('CREATE_COUNSELORS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Counselor'),
        permissionId: getId('READ_COUNSELORS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_MY_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_MY_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_MY_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_MY_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CounselingDirector'),
        permissionId: getId('CREATE_MY_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CounselingDirector'),
        permissionId: getId('READ_MY_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CounselingDirector'),
        permissionId: getId('UPDATE_MY_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CounselingDirector'),
        permissionId: getId('DELETE_MY_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCounselor'),
        permissionId: getId('CREATE_MY_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCounselor'),
        permissionId: getId('READ_MY_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCounselor'),
        permissionId: getId('UPDATE_MY_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCounselor'),
        permissionId: getId('DELETE_MY_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Counselor'),
        permissionId: getId('CREATE_MY_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Counselor'),
        permissionId: getId('READ_MY_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Counselor'),
        permissionId: getId('UPDATE_MY_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Counselor'),
        permissionId: getId('DELETE_MY_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Student'),
        permissionId: getId('CREATE_MY_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Student'),
        permissionId: getId('READ_MY_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_PARENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_PARENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_PARENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_PARENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CounselingDirector'),
        permissionId: getId('CREATE_PARENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CounselingDirector'),
        permissionId: getId('READ_PARENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CounselingDirector'),
        permissionId: getId('UPDATE_PARENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CounselingDirector'),
        permissionId: getId('DELETE_PARENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCounselor'),
        permissionId: getId('CREATE_PARENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCounselor'),
        permissionId: getId('READ_PARENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCounselor'),
        permissionId: getId('UPDATE_PARENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCounselor'),
        permissionId: getId('DELETE_PARENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Counselor'),
        permissionId: getId('CREATE_PARENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Counselor'),
        permissionId: getId('READ_PARENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Counselor'),
        permissionId: getId('UPDATE_PARENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Counselor'),
        permissionId: getId('DELETE_PARENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_SESSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_SESSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_SESSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_SESSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CounselingDirector'),
        permissionId: getId('CREATE_SESSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CounselingDirector'),
        permissionId: getId('READ_SESSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CounselingDirector'),
        permissionId: getId('UPDATE_SESSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CounselingDirector'),
        permissionId: getId('DELETE_SESSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCounselor'),
        permissionId: getId('CREATE_SESSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCounselor'),
        permissionId: getId('READ_SESSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCounselor'),
        permissionId: getId('UPDATE_SESSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCounselor'),
        permissionId: getId('DELETE_SESSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Counselor'),
        permissionId: getId('CREATE_SESSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Counselor'),
        permissionId: getId('READ_SESSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Counselor'),
        permissionId: getId('UPDATE_SESSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Counselor'),
        permissionId: getId('DELETE_SESSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Student'),
        permissionId: getId('CREATE_SESSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Student'),
        permissionId: getId('READ_SESSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_STUDENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_STUDENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_STUDENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_STUDENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CounselingDirector'),
        permissionId: getId('CREATE_STUDENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CounselingDirector'),
        permissionId: getId('READ_STUDENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CounselingDirector'),
        permissionId: getId('UPDATE_STUDENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CounselingDirector'),
        permissionId: getId('DELETE_STUDENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCounselor'),
        permissionId: getId('CREATE_STUDENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCounselor'),
        permissionId: getId('READ_STUDENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCounselor'),
        permissionId: getId('UPDATE_STUDENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCounselor'),
        permissionId: getId('DELETE_STUDENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Counselor'),
        permissionId: getId('CREATE_STUDENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Counselor'),
        permissionId: getId('READ_STUDENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Counselor'),
        permissionId: getId('UPDATE_STUDENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Counselor'),
        permissionId: getId('DELETE_STUDENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Student'),
        permissionId: getId('CREATE_STUDENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Student'),
        permissionId: getId('READ_STUDENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CounselingDirector'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadCounselor'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Counselor'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Student'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_ACTION_ITEMS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_ACTION_ITEMS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_ACTION_ITEMS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_ACTION_ITEMS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_COLLEGES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_COLLEGES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_COLLEGES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_COMPANIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_COMPANIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_COMPANIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_COMPANIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_COUNSELORS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_COUNSELORS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_COUNSELORS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_COUNSELORS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_MY_COLLEGES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_MY_COLLEGES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_MY_COLLEGES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_MY_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_PARENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_PARENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_PARENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_PARENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_SESSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_SESSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_SESSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_SESSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_STUDENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_STUDENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_STUDENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_STUDENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_ACTION_ITEMS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_ACTION_ITEMS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_ACTION_ITEMS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_ACTION_ITEMS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_COLLEGES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_COLLEGES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_COLLEGES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_COMPANIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_COMPANIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_COMPANIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_COMPANIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_COUNSELORS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_COUNSELORS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_COUNSELORS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_COUNSELORS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_MY_COLLEGES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_MY_COLLEGES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_MY_COLLEGES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_MY_COLLEGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_PARENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_PARENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_PARENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_PARENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_SESSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_SESSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_SESSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_SESSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_STUDENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_STUDENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_STUDENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_STUDENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_ROLES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_PERMISSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_COMPANY'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_COMPANY'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_COMPANY'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_COMPANY'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_API_DOCS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_API_DOCS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_SEARCH'),
      },
    ]);

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'SuperAdmin',
      )}' WHERE "email"='super_admin@flatlogic.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'Administrator',
      )}' WHERE "email"='admin@flatlogic.com'`,
    );

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'SystemManager',
      )}' WHERE "email"='client@hello.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'CounselingDirector',
      )}' WHERE "email"='john@doe.com'`,
    );
  },
};
