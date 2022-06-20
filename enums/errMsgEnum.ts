export enum errMsgEnum {
  badReq = 'Invalid userId',
  notFound = "User with this id doesn't exist",
  validBody = 'Body should contain username, age and hobbies fields',
  serverErr = 'Internal server error',
  validAddr = 'Request to non-existing address',
}
