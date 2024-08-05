namespace rtcusermanagement.db;

using { rtcusermanagement.db as DB } from '../index';

using {
    cuid,
    managed,
} from '@sap/cds/common';

entity RoleCollections : cuid, managed {
    roleCollectionName              : String ;
    roleCollectionDescription       : String ;
    roles                           : String ;
    userGroups                      : String ;
}