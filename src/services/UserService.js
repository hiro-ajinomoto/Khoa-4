import { baseService } from "./baseService";

export class UserService extends baseService {
  constructor() {
    super();
  }

  getUser = (keyword) => {
    return this.get(`/Users/getUser?keyword=${keyword}`);
    // return this.get(`Users/getUser`);
  };

  assignUserProject = (userProject) => {
    return this.post(`Project/assignUserProject`, userProject);
  };

  deleteUserFromProject = (userProject) => {
    return this.post(`Project/removeUserFromProject`, userProject);
  };

  getUserByProjectId = (idProject) => {
    return this.get(`Users/getUserByProjectId?idProject=${idProject}`);
  };

  signUpService = (userInfo) => {
    return this.post(`Users/signup`, userInfo);
  };

  deleteUser = (userId) => {
    return this.delete(`Users/deleteUser?id=${userId}`);
  };

  editUser = (editingUserInfo) => {
    return this.put(`Users/editUser`, editingUserInfo);
  };
}

export const userService = new UserService();
