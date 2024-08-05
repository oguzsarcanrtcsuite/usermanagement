namespace rtcusermanagement.db;

using { rtcusermanagement.db as DB } from '../index';

using {
    cuid,
    managed,
} from '@sap/cds/common';

entity UserGroup : cuid, managed {
    groupName       : String ;
    displayName     : String ;
    description     : String ;
    groupType       : String ;
}