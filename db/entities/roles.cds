namespace rtcusermanagement.db;

using { rtcusermanagement.db as DB } from '../index';

using {
    cuid,
    managed,
} from '@sap/cds/common';

entity Roles : cuid, managed {
    applicationName             : String ;
    applicationDescription      : String ;
    roleTemplate                : String ;
    roleName                    : String ;
    roleDescription             : String ;
}