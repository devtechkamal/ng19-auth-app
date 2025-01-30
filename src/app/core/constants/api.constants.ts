export const constants = {
  CURRENT_TOKEN: 'CURRENT_TOKEN',
};

const APIURL = 'http://localhost:3000';

export const ApiEndpoint = {
  AuthEndpoint: {
    login: `${APIURL}/auth/login`,
    logout: `${APIURL}/auth/logout`,
    me: `${APIURL}/auth/me`,
  },
  RoleEndpoint: `${APIURL}/roles`,
  DepartmentEndpoint: `${APIURL}/departments`,
  UserEndpoint: `${APIURL}/users`,
  EmployeeEndpoint: `${APIURL}/employees`,
};
