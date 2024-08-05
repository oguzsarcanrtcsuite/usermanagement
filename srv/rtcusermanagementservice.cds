using {rtcusermanagement.db as DB} from '../db/index.cds';

@impl: 'srv/rtcusermanagementservice.js'
service RTCUserManagementService @(path: '/catalog/RTCUserManagementService') {

    @odata.draft.enabled
    entity User as projection on DB.User;

    @odata.draft.enabled
    entity UserGroup as projection on DB.UserGroup;

    @odata.draft.enabled
    entity Roles as projection on DB.Roles;

    @odata.draft.enabled
    entity RoleCollections as projection on DB.RoleCollections;

    action addUser (user: User) returns User;
    action addGroup (usergroup: UserGroup) returns UserGroup;
    action addRoleCollection (rolecollection: RoleCollections) returns RoleCollections;

    action readUsers (userID : String) returns String;
    action readGroups () returns String;


}
