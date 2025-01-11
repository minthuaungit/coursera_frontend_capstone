
// __mocks__/react-router-dom.js
const React = require('react');

module.exports = {
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({}),
  useRouteMatch: jest.fn().mockReturnValue({}),
  useHistory: jest.fn().mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
    location: {},
  }),
  useLocation: jest.fn().mockReturnValue({}),
};