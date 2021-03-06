'use strict';
let response = {
   form_fields_required: {
      message: 'Form fields required',
      code: 'OWN_0001'
   },
   tenant_found: {
      message: 'Tenant data Found',
      code: 'OWN_0002'
   },
   tenant_not_found: {
      message: 'Tenant not found',
      code: 'OWN_0003'
   },
   tenant_created: {
      message: 'Tenant created successfully',
      code: 'OWN_0004'
   },
   tenant_created_failed: {
      message: 'Tenant not created',
      code: 'OWN_0005'
   },
   tenant_updated: {
      message: 'Tenant updated successfully',
      code: 'OWN_0006'
   },
   tenant_updated_failed: {
      message: 'Tenant not created',
      code: 'OWN_0007'
   },
   tenant_exist: {
      message: 'This tenant already exists',
      code: 'OWN_0008'
   },
   invalid_commissions: {
      message: 'Sum of commsion must be less than 100',
      code: 'OWN_0009'
   },
   unit_not_available: {
      message: 'Unit is not available',
      code: 'Unit_0001'
   },
   building_found: {
      message: 'Building found',
      code: 'BLD_0001'
   },
   building_not_found:{
      message: 'Building not found',
      code: 'BLD_0002'
   },
   property_found: {
      message: 'Property found',
      code: 'PROP_0001'
   },
   property_not_found:{
      message: 'Property not found',
      code: 'PROP_0002'
   },
   incorrect_user_type: {
      message: 'Incorrect user type',
      code: 'TNT_1001'
   },
   tenant_staying_date_overlapped: {
      message: 'Tenant staying date overlapped for this unit',
      code: "TNT_1002"
   },
   unit_not_exist_to_this_owner: {
      message: 'This unit does not exist for this owner',
      code: 'OWN_0002'
   },
   owner_not_exist: {
      message: 'Owner does not exist',
      code: 'OWN_0003'
   },
}

module.exports = response;
module.exports.success = function (key, values) {
   let returnResponse = response[key] == undefined ? {} : response[key];
   returnResponse.status = true;
   values ? returnResponse.values = values : '';
   return returnResponse;
}
module.exports.failed = function (key, errors) {
   let returnResponse = response[key] == undefined ? {} : response[key];
   returnResponse.status = false;
   errors && errors != key ? returnResponse.error = errors : '';
   return returnResponse;
}
module.exports.catch_error = function (err) {
   let returnResponse = response[err.message] == undefined ? { message: err.message } : response[err.message];
   if (response[err.message] == undefined)
      console.log(err);
   returnResponse.status = false;
   return returnResponse;
}
