const { CreateFSPIOPErrorFromErrorCode } = require('@mojaloop/central-services-error-handling')

export const getDescrFromErrCode = (code: string | number): string => {
  const errorCode = Number.parseInt(code as string);
  return CreateFSPIOPErrorFromErrorCode(errorCode)?.apiErrorCode?.type?.description || 'Unknown error';
}