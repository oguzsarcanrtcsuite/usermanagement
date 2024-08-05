namespace rtcusermanagement.db;

using { rtcusermanagement.db as DB } from '../index';

using {
    cuid,
    managed,
} from '@sap/cds/common';

entity User : cuid {
    firstName : String;
    lastName : String;
    emailAddress : String;
    loginName   : String;
    userType    : String;
    accountActivation : String;
}