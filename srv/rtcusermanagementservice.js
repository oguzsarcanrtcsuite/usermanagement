const cds = require("@sap/cds");
const {stringify, parse} = require('flatted');

class RTCUserManagementService extends cds.ApplicationService {
    
    async init() {

        const { User,UserGroup } = this.entities;
        this.before("*", this.allRequestHandlerBefore);
        this.after("*", this.allRequestHandlerAfter);
        this.on("addUser", this._addUser);
        this.on("addGroup", this._addGroup);
        this.on("addRoleCollection", this._addRoleCollection);
        this.on("readUsers" , this._readUsers)
        this.on("readGroups" , this._readGroups)

        
        return super.init();
      }

      async _readUsers(req) {
        const { User } = this.entities;
        const userID = req.data.userID;

        let users = await cds.transaction(req).run(
          SELECT.from(User)
        );

        return JSON.stringify(users);
      }

      async _readGroups(req) {
        const { UserGroup } = this.entities;
        const userID = req.data.userID;

        let groups = await cds.transaction(req).run(
          SELECT.from(UserGroup)
        );

        return JSON.stringify(groups);
      }

      async _addUser(req) {
        const { User } = this.entities;
        const userData = req.data.user;

        let newUser = await cds.transaction(req).run(
          INSERT.into(User).entries([
            {
              ID : cds.utils.uuid(),
              firstName : userData.firstName,
              lastName : userData.lastName,
              emailAddress : userData.emailAddress,
              loginName : userData.loginName,
              userType : userData.userType,
              accountActivation : userData.accountActivation || "Active",
            }
          ])
      );

        return newUser;
      }

      async _addGroup(req) {
        const { UserGroup } = this.entities;
        const UserGroupData = req.data.usergroup;

        let newUserGroup = await cds.transaction(req).run(
          INSERT.into(UserGroup).entries([
            {
              ID : cds.utils.uuid(),
              groupName : UserGroupData.groupName,
              displayName : UserGroupData.displayName,
              description : UserGroupData.description,
              groupType : UserGroupData.groupType,
              
            }
          ])
      );

        return newUserGroup;
      }

      async _addRoleCollection(req) {
        const { RoleCollections } = this.entities;
        const RoleCollectionData = req.data.rolecollection;

        let newRoleCollection = await cds.transaction(req).run(
          INSERT.into(RoleCollections).entries([
            {
              ID : cds.utils.uuid(),
              roleCollectionName : RoleCollectionData.roleCollectionName,
              roleCollectionDescription : RoleCollectionData.roleCollectionDescription
              
            }
          ])
      );

        return newRoleCollection;
      }

      async allRequestHandlerBefore(req) {
        return req;
      }
    
      async allRequestHandlerAfter(req) {
        return req;
      }

    }

module.exports = { RTCUserManagementService };