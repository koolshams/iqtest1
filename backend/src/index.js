const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const db = require('./db/models');
const config = require('./config');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');
const searchRoutes = require('./routes/search');
const pexelsRoutes = require('./routes/pexels');

const organizationForAuthRoutes = require('./routes/organizationLogin');

const openaiRoutes = require('./routes/openai');

const contactFormRoutes = require('./routes/contactForm');

const usersRoutes = require('./routes/users');

const action_itemsRoutes = require('./routes/action_items');

const collegesRoutes = require('./routes/colleges');

const companiesRoutes = require('./routes/companies');

const counselorsRoutes = require('./routes/counselors');

const my_collegesRoutes = require('./routes/my_colleges');

const parentsRoutes = require('./routes/parents');

const sessionsRoutes = require('./routes/sessions');

const studentsRoutes = require('./routes/students');

const rolesRoutes = require('./routes/roles');

const permissionsRoutes = require('./routes/permissions');

const companyRoutes = require('./routes/company');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'iqtest1',
      description:
        'iqtest1 Online REST API for Testing and Prototyping application. You can perform all major operations with your entities - create, delete and etc.',
    },
    servers: [
      {
        url: config.swaggerUrl,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsDoc(options);
app.use(
  '/api-docs',
  function (req, res, next) {
    swaggerUI.host = req.get('host');
    next();
  },
  swaggerUI.serve,
  swaggerUI.setup(specs),
);

app.use(cors({ origin: true }));
require('./auth/auth');

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);
app.use('/api/pexels', pexelsRoutes);
app.enable('trust proxy');

app.use(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  usersRoutes,
);

app.use(
  '/api/action_items',
  passport.authenticate('jwt', { session: false }),
  action_itemsRoutes,
);

app.use(
  '/api/colleges',
  passport.authenticate('jwt', { session: false }),
  collegesRoutes,
);

app.use(
  '/api/companies',
  passport.authenticate('jwt', { session: false }),
  companiesRoutes,
);

app.use(
  '/api/counselors',
  passport.authenticate('jwt', { session: false }),
  counselorsRoutes,
);

app.use(
  '/api/my_colleges',
  passport.authenticate('jwt', { session: false }),
  my_collegesRoutes,
);

app.use(
  '/api/parents',
  passport.authenticate('jwt', { session: false }),
  parentsRoutes,
);

app.use(
  '/api/sessions',
  passport.authenticate('jwt', { session: false }),
  sessionsRoutes,
);

app.use(
  '/api/students',
  passport.authenticate('jwt', { session: false }),
  studentsRoutes,
);

app.use(
  '/api/roles',
  passport.authenticate('jwt', { session: false }),
  rolesRoutes,
);

app.use(
  '/api/permissions',
  passport.authenticate('jwt', { session: false }),
  permissionsRoutes,
);

app.use(
  '/api/company',
  passport.authenticate('jwt', { session: false }),
  companyRoutes,
);

app.use(
  '/api/openai',
  passport.authenticate('jwt', { session: false }),
  openaiRoutes,
);

app.use('/api/contact-form', contactFormRoutes);

app.use(
  '/api/search',
  passport.authenticate('jwt', { session: false }),
  searchRoutes,
);

app.use('/api/org-for-auth', organizationForAuthRoutes);

const publicDir = path.join(__dirname, '../public');

if (fs.existsSync(publicDir)) {
  app.use('/', express.static(publicDir));

  app.get('*', function (request, response) {
    response.sendFile(path.resolve(publicDir, 'index.html'));
  });
}

const PORT = process.env.PORT || 8080;

db.sequelize.sync().then(function () {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

module.exports = app;