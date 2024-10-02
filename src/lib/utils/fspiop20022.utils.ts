const { CreateFSPIOPErrorFromErrorCode } = require('@mojaloop/central-services-error-handling')

export const getDescrFromErrCode = (code: string): string => {
  // TOOD: Implement this function
  // Ref: https://docs.mojaloop.io/api/fspiop/logical-data-model.html#error-codes
  // MojaloopApiErrorObjectFromCode(code).description
  return CreateFSPIOPErrorFromErrorCode(code).errorInformation.errorDescription;
}