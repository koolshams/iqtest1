const db = require('../models');
const Users = db.users;

const ActionItems = db.action_items;

const Colleges = db.colleges;

const Companies = db.companies;

const Counselors = db.counselors;

const MyColleges = db.my_colleges;

const Parents = db.parents;

const Sessions = db.sessions;

const Students = db.students;

const Company = db.company;

const ActionItemsData = [
  {
    title: 'Take a practice SAT',

    due_date: new Date('2023-11-01T10:00:00Z'),

    category: 'academics',

    comments: 'Focus on math sections',

    status: 'completed',

    output: '',

    // type code here for "relation_one" field
  },

  {
    title: 'Create a personal statement',

    due_date: new Date('2023-11-15T10:00:00Z'),

    category: 'athletics',

    comments: 'Draft and review',

    status: 'inprogress',

    output: '',

    // type code here for "relation_one" field
  },

  {
    title: 'Volunteer at local shelter',

    due_date: new Date('2023-12-01T10:00:00Z'),

    category: 'athletics',

    comments: 'Coordinate with shelter manager',

    status: 'notstarted',

    output: '',

    // type code here for "relation_one" field
  },

  {
    title: 'Join the basketball team',

    due_date: new Date('2023-11-10T10:00:00Z'),

    category: 'athletics',

    comments: 'Attend tryouts',

    status: 'notstarted',

    output: 'Joined team',

    // type code here for "relation_one" field
  },

  {
    title: 'Research college scholarships',

    due_date: new Date('2023-11-20T10:00:00Z'),

    category: 'academics',

    comments: 'List potential scholarships',

    status: 'completed',

    output: '',

    // type code here for "relation_one" field
  },
];

const CollegesData = [
  {
    name: 'Harvard University',

    location: 'Cambridge, MA',

    state: 'MA',

    state_type: 'outState',

    type: 'public',

    ivy_league: true,

    reasons_to_go: 'Prestigious programs',

    // type code here for "relation_one" field
  },

  {
    name: 'Stanford University',

    location: 'Stanford, CA',

    state: 'CA',

    state_type: 'outState',

    type: 'public',

    ivy_league: false,

    reasons_to_go: 'Innovative research',

    // type code here for "relation_one" field
  },

  {
    name: 'University of California, Berkeley',

    location: 'Berkeley, CA',

    state: 'CA',

    state_type: 'outState',

    type: 'public',

    ivy_league: true,

    reasons_to_go: 'Strong engineering programs',

    // type code here for "relation_one" field
  },

  {
    name: 'Massachusetts Institute of Technology',

    location: 'Cambridge, MA',

    state: 'MA',

    state_type: 'outState',

    type: 'public',

    ivy_league: true,

    reasons_to_go: 'Cutting-edge technology',

    // type code here for "relation_one" field
  },

  {
    name: 'Princeton University',

    location: 'Princeton, NJ',

    state: 'NJ',

    state_type: 'inState',

    type: 'public',

    ivy_league: true,

    reasons_to_go: 'Renowned faculty',

    // type code here for "relation_one" field
  },
];

const CompaniesData = [
  {
    name: 'Bright Future Counseling',

    // type code here for "relation_one" field
  },

  {
    name: 'Pathway Guidance',

    // type code here for "relation_one" field
  },

  {
    name: 'Success Mentors',

    // type code here for "relation_one" field
  },

  {
    name: 'Achieve More',

    // type code here for "relation_one" field
  },

  {
    name: 'Guidance Gurus',

    // type code here for "relation_one" field
  },
];

const CounselorsData = [
  {
    // type code here for "relation_one" field
    // type code here for "relation_many" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_many" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_many" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_many" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_many" field
    // type code here for "relation_one" field
  },
];

const MyCollegesData = [
  {
    // type code here for "relation_one" field

    suggested_atlas_score: 95,

    challenge: 'Safe',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    suggested_atlas_score: 90,

    challenge: 'Target',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    suggested_atlas_score: 85,

    challenge: 'Target',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    suggested_atlas_score: 92,

    challenge: 'Target',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    suggested_atlas_score: 88,

    challenge: 'Reach',

    // type code here for "relation_one" field
  },
];

const ParentsData = [
  {
    // type code here for "relation_one" field
    // type code here for "relation_many" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_many" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_many" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_many" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_many" field
    // type code here for "relation_one" field
  },
];

const SessionsData = [
  {
    date: new Date('2023-10-25T14:00:00Z'),

    title: 'Counseling Session - Emily',

    time: new Date('2023-10-25T15:00:00Z'),

    link_to_recording: 'https://example.com/recording1',

    session_details: 'Discussed college applications',

    // type code here for "relation_many" field

    prep_summary: 'Reviewed application process',

    // type code here for "relation_one" field
  },

  {
    date: new Date('2023-10-26T10:00:00Z'),

    title: 'SAT Prep - Michael',

    time: new Date('2023-10-26T11:00:00Z'),

    link_to_recording: 'https://example.com/recording2',

    session_details: 'Focused on math strategies',

    // type code here for "relation_many" field

    prep_summary: 'Practiced sample questions',

    // type code here for "relation_one" field
  },

  {
    date: new Date('2023-10-27T09:00:00Z'),

    title: 'Career Guidance - Sarah',

    time: new Date('2023-10-27T10:00:00Z'),

    link_to_recording: 'https://example.com/recording3',

    session_details: 'Explored career options',

    // type code here for "relation_many" field

    prep_summary: 'Identified interests',

    // type code here for "relation_one" field
  },

  {
    date: new Date('2023-10-28T13:00:00Z'),

    title: 'Personal Development - John',

    time: new Date('2023-10-28T14:00:00Z'),

    link_to_recording: 'https://example.com/recording4',

    session_details: 'Set personal goals',

    // type code here for "relation_many" field

    prep_summary: 'Goal setting techniques',

    // type code here for "relation_one" field
  },

  {
    date: new Date('2023-10-29T11:00:00Z'),

    title: 'College Planning - Jane',

    time: new Date('2023-10-29T12:00:00Z'),

    link_to_recording: 'https://example.com/recording5',

    session_details: 'Reviewed college list',

    // type code here for "relation_many" field

    prep_summary: 'Evaluated college options',

    // type code here for "relation_one" field
  },
];

const StudentsData = [
  {
    // type code here for "relation_one" field
    // type code here for "relation_many" field
    // type code here for "relation_many" field
    // type code here for "relation_many" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_many" field
    // type code here for "relation_many" field
    // type code here for "relation_many" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_many" field
    // type code here for "relation_many" field
    // type code here for "relation_many" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_many" field
    // type code here for "relation_many" field
    // type code here for "relation_many" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_many" field
    // type code here for "relation_many" field
    // type code here for "relation_many" field
    // type code here for "relation_one" field
  },
];

const CompanyData = [
  {
    name: 'Paul Ehrlich',
  },

  {
    name: 'Leonard Euler',
  },

  {
    name: 'Noam Chomsky',
  },

  {
    name: 'Comte de Buffon',
  },

  {
    name: 'Joseph J. Thomson',
  },
];

// Similar logic for "relation_many"

async function associateUserWithCompany() {
  const relatedCompany0 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setCompany) {
    await User0.setCompany(relatedCompany0);
  }

  const relatedCompany1 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setCompany) {
    await User1.setCompany(relatedCompany1);
  }

  const relatedCompany2 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setCompany) {
    await User2.setCompany(relatedCompany2);
  }

  const relatedCompany3 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const User3 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (User3?.setCompany) {
    await User3.setCompany(relatedCompany3);
  }

  const relatedCompany4 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const User4 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (User4?.setCompany) {
    await User4.setCompany(relatedCompany4);
  }
}

async function associateActionItemWithCompany() {
  const relatedCompany0 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const ActionItem0 = await ActionItems.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (ActionItem0?.setCompany) {
    await ActionItem0.setCompany(relatedCompany0);
  }

  const relatedCompany1 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const ActionItem1 = await ActionItems.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (ActionItem1?.setCompany) {
    await ActionItem1.setCompany(relatedCompany1);
  }

  const relatedCompany2 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const ActionItem2 = await ActionItems.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (ActionItem2?.setCompany) {
    await ActionItem2.setCompany(relatedCompany2);
  }

  const relatedCompany3 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const ActionItem3 = await ActionItems.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (ActionItem3?.setCompany) {
    await ActionItem3.setCompany(relatedCompany3);
  }

  const relatedCompany4 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const ActionItem4 = await ActionItems.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (ActionItem4?.setCompany) {
    await ActionItem4.setCompany(relatedCompany4);
  }
}

async function associateCollegeWithCompany() {
  const relatedCompany0 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const College0 = await Colleges.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (College0?.setCompany) {
    await College0.setCompany(relatedCompany0);
  }

  const relatedCompany1 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const College1 = await Colleges.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (College1?.setCompany) {
    await College1.setCompany(relatedCompany1);
  }

  const relatedCompany2 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const College2 = await Colleges.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (College2?.setCompany) {
    await College2.setCompany(relatedCompany2);
  }

  const relatedCompany3 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const College3 = await Colleges.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (College3?.setCompany) {
    await College3.setCompany(relatedCompany3);
  }

  const relatedCompany4 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const College4 = await Colleges.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (College4?.setCompany) {
    await College4.setCompany(relatedCompany4);
  }
}

async function associateCompanyWithCompany() {
  const relatedCompany0 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const Company0 = await Companies.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Company0?.setCompany) {
    await Company0.setCompany(relatedCompany0);
  }

  const relatedCompany1 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const Company1 = await Companies.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Company1?.setCompany) {
    await Company1.setCompany(relatedCompany1);
  }

  const relatedCompany2 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const Company2 = await Companies.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Company2?.setCompany) {
    await Company2.setCompany(relatedCompany2);
  }

  const relatedCompany3 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const Company3 = await Companies.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Company3?.setCompany) {
    await Company3.setCompany(relatedCompany3);
  }

  const relatedCompany4 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const Company4 = await Companies.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Company4?.setCompany) {
    await Company4.setCompany(relatedCompany4);
  }
}

async function associateCounselorWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Counselor0 = await Counselors.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Counselor0?.setUser) {
    await Counselor0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Counselor1 = await Counselors.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Counselor1?.setUser) {
    await Counselor1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Counselor2 = await Counselors.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Counselor2?.setUser) {
    await Counselor2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Counselor3 = await Counselors.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Counselor3?.setUser) {
    await Counselor3.setUser(relatedUser3);
  }

  const relatedUser4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Counselor4 = await Counselors.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Counselor4?.setUser) {
    await Counselor4.setUser(relatedUser4);
  }
}

// Similar logic for "relation_many"

async function associateCounselorWithCompany() {
  const relatedCompany0 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const Counselor0 = await Counselors.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Counselor0?.setCompany) {
    await Counselor0.setCompany(relatedCompany0);
  }

  const relatedCompany1 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const Counselor1 = await Counselors.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Counselor1?.setCompany) {
    await Counselor1.setCompany(relatedCompany1);
  }

  const relatedCompany2 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const Counselor2 = await Counselors.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Counselor2?.setCompany) {
    await Counselor2.setCompany(relatedCompany2);
  }

  const relatedCompany3 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const Counselor3 = await Counselors.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Counselor3?.setCompany) {
    await Counselor3.setCompany(relatedCompany3);
  }

  const relatedCompany4 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const Counselor4 = await Counselors.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Counselor4?.setCompany) {
    await Counselor4.setCompany(relatedCompany4);
  }
}

async function associateMyCollegeWithLink_to_college() {
  const relatedLink_to_college0 = await Colleges.findOne({
    offset: Math.floor(Math.random() * (await Colleges.count())),
  });
  const MyCollege0 = await MyColleges.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (MyCollege0?.setLink_to_college) {
    await MyCollege0.setLink_to_college(relatedLink_to_college0);
  }

  const relatedLink_to_college1 = await Colleges.findOne({
    offset: Math.floor(Math.random() * (await Colleges.count())),
  });
  const MyCollege1 = await MyColleges.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (MyCollege1?.setLink_to_college) {
    await MyCollege1.setLink_to_college(relatedLink_to_college1);
  }

  const relatedLink_to_college2 = await Colleges.findOne({
    offset: Math.floor(Math.random() * (await Colleges.count())),
  });
  const MyCollege2 = await MyColleges.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (MyCollege2?.setLink_to_college) {
    await MyCollege2.setLink_to_college(relatedLink_to_college2);
  }

  const relatedLink_to_college3 = await Colleges.findOne({
    offset: Math.floor(Math.random() * (await Colleges.count())),
  });
  const MyCollege3 = await MyColleges.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (MyCollege3?.setLink_to_college) {
    await MyCollege3.setLink_to_college(relatedLink_to_college3);
  }

  const relatedLink_to_college4 = await Colleges.findOne({
    offset: Math.floor(Math.random() * (await Colleges.count())),
  });
  const MyCollege4 = await MyColleges.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (MyCollege4?.setLink_to_college) {
    await MyCollege4.setLink_to_college(relatedLink_to_college4);
  }
}

async function associateMyCollegeWithCompany() {
  const relatedCompany0 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const MyCollege0 = await MyColleges.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (MyCollege0?.setCompany) {
    await MyCollege0.setCompany(relatedCompany0);
  }

  const relatedCompany1 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const MyCollege1 = await MyColleges.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (MyCollege1?.setCompany) {
    await MyCollege1.setCompany(relatedCompany1);
  }

  const relatedCompany2 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const MyCollege2 = await MyColleges.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (MyCollege2?.setCompany) {
    await MyCollege2.setCompany(relatedCompany2);
  }

  const relatedCompany3 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const MyCollege3 = await MyColleges.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (MyCollege3?.setCompany) {
    await MyCollege3.setCompany(relatedCompany3);
  }

  const relatedCompany4 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const MyCollege4 = await MyColleges.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (MyCollege4?.setCompany) {
    await MyCollege4.setCompany(relatedCompany4);
  }
}

async function associateParentWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Parent0 = await Parents.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Parent0?.setUser) {
    await Parent0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Parent1 = await Parents.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Parent1?.setUser) {
    await Parent1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Parent2 = await Parents.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Parent2?.setUser) {
    await Parent2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Parent3 = await Parents.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Parent3?.setUser) {
    await Parent3.setUser(relatedUser3);
  }

  const relatedUser4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Parent4 = await Parents.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Parent4?.setUser) {
    await Parent4.setUser(relatedUser4);
  }
}

// Similar logic for "relation_many"

async function associateParentWithCompany() {
  const relatedCompany0 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const Parent0 = await Parents.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Parent0?.setCompany) {
    await Parent0.setCompany(relatedCompany0);
  }

  const relatedCompany1 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const Parent1 = await Parents.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Parent1?.setCompany) {
    await Parent1.setCompany(relatedCompany1);
  }

  const relatedCompany2 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const Parent2 = await Parents.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Parent2?.setCompany) {
    await Parent2.setCompany(relatedCompany2);
  }

  const relatedCompany3 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const Parent3 = await Parents.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Parent3?.setCompany) {
    await Parent3.setCompany(relatedCompany3);
  }

  const relatedCompany4 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const Parent4 = await Parents.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Parent4?.setCompany) {
    await Parent4.setCompany(relatedCompany4);
  }
}

// Similar logic for "relation_many"

async function associateSessionWithCompany() {
  const relatedCompany0 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const Session0 = await Sessions.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Session0?.setCompany) {
    await Session0.setCompany(relatedCompany0);
  }

  const relatedCompany1 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const Session1 = await Sessions.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Session1?.setCompany) {
    await Session1.setCompany(relatedCompany1);
  }

  const relatedCompany2 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const Session2 = await Sessions.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Session2?.setCompany) {
    await Session2.setCompany(relatedCompany2);
  }

  const relatedCompany3 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const Session3 = await Sessions.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Session3?.setCompany) {
    await Session3.setCompany(relatedCompany3);
  }

  const relatedCompany4 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const Session4 = await Sessions.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Session4?.setCompany) {
    await Session4.setCompany(relatedCompany4);
  }
}

async function associateStudentWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Student0 = await Students.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Student0?.setUser) {
    await Student0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Student1 = await Students.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Student1?.setUser) {
    await Student1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Student2 = await Students.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Student2?.setUser) {
    await Student2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Student3 = await Students.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Student3?.setUser) {
    await Student3.setUser(relatedUser3);
  }

  const relatedUser4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Student4 = await Students.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Student4?.setUser) {
    await Student4.setUser(relatedUser4);
  }
}

// Similar logic for "relation_many"

// Similar logic for "relation_many"

// Similar logic for "relation_many"

async function associateStudentWithCompany() {
  const relatedCompany0 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const Student0 = await Students.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Student0?.setCompany) {
    await Student0.setCompany(relatedCompany0);
  }

  const relatedCompany1 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const Student1 = await Students.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Student1?.setCompany) {
    await Student1.setCompany(relatedCompany1);
  }

  const relatedCompany2 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const Student2 = await Students.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Student2?.setCompany) {
    await Student2.setCompany(relatedCompany2);
  }

  const relatedCompany3 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const Student3 = await Students.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Student3?.setCompany) {
    await Student3.setCompany(relatedCompany3);
  }

  const relatedCompany4 = await Company.findOne({
    offset: Math.floor(Math.random() * (await Company.count())),
  });
  const Student4 = await Students.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Student4?.setCompany) {
    await Student4.setCompany(relatedCompany4);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await ActionItems.bulkCreate(ActionItemsData);

    await Colleges.bulkCreate(CollegesData);

    await Companies.bulkCreate(CompaniesData);

    await Counselors.bulkCreate(CounselorsData);

    await MyColleges.bulkCreate(MyCollegesData);

    await Parents.bulkCreate(ParentsData);

    await Sessions.bulkCreate(SessionsData);

    await Students.bulkCreate(StudentsData);

    await Company.bulkCreate(CompanyData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateUserWithCompany(),

      await associateActionItemWithCompany(),

      await associateCollegeWithCompany(),

      await associateCompanyWithCompany(),

      await associateCounselorWithUser(),

      // Similar logic for "relation_many"

      await associateCounselorWithCompany(),

      await associateMyCollegeWithLink_to_college(),

      await associateMyCollegeWithCompany(),

      await associateParentWithUser(),

      // Similar logic for "relation_many"

      await associateParentWithCompany(),

      // Similar logic for "relation_many"

      await associateSessionWithCompany(),

      await associateStudentWithUser(),

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      await associateStudentWithCompany(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('action_items', null, {});

    await queryInterface.bulkDelete('colleges', null, {});

    await queryInterface.bulkDelete('companies', null, {});

    await queryInterface.bulkDelete('counselors', null, {});

    await queryInterface.bulkDelete('my_colleges', null, {});

    await queryInterface.bulkDelete('parents', null, {});

    await queryInterface.bulkDelete('sessions', null, {});

    await queryInterface.bulkDelete('students', null, {});

    await queryInterface.bulkDelete('company', null, {});
  },
};
