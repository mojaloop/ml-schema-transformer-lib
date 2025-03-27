/*****
 License
 --------------
 Copyright © 2020-2025 Mojaloop Foundation
 The Mojaloop files are made available by the Mojaloop Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Mojaloop Foundation for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.

 * Mojaloop Foundation
 - Name Surname <name.surname@mojaloop.io>

 * Infitx
 - Steven Oderayi <steven.oderayi@infitx.com>
 --------------
 ******/

import SwaggerParser from '@apidevtools/swagger-parser';
import { OpenAPIValidator, Document } from 'openapi-backend';
import { ErrorObject, Options } from 'ajv';
import stringify from 'fast-safe-stringify';
import { Request } from '../../types';

export class Validator {
  apiDoc: string;
  apiSpec: Document;
  apiValidator: OpenAPIValidator;
  ajvOpts: Options = { allErrors: true, coerceTypes: true, strict: false }

  /**
   * @param apiDoc - The path to the OpenAPI document or the document itself
   */
  constructor(apiDoc: string) {
    this.apiDoc = apiDoc;
    this.apiSpec = {} as Document;
    this.apiValidator = {} as OpenAPIValidator;
  }

  async initialize() {
    this.apiSpec = await SwaggerParser.validate(this.apiDoc) as Document;
    this.apiValidator = new OpenAPIValidator({ definition: this.apiSpec, ajvOpts: this.ajvOpts });
  }

  validateRequest(request: Request, returnErrors: boolean = false): boolean | ErrorObject[] {
    const validation = this.apiValidator.validateRequest(request);

    if (validation.errors && validation.errors.length > 0) {
      if (returnErrors) return validation.errors;
      throw new Error(`Validation errors: ${stringify(validation.errors)}`);
    }

    return true;
  }

  validateBody(partialRequest: Pick<Request, 'body' | 'path' | 'method'>, returnErrors: boolean = false): boolean | ErrorObject[] {
    const { body, path, method } = partialRequest;
    const validation = this.apiValidator.validateRequest({ path, method, body, headers: {} });

    if (validation.errors) {
      const bodyErrors = validation.errors.filter((error: any) => error.instancePath === '/requestBody');
      if (bodyErrors && bodyErrors.length > 0) {
        if (returnErrors) return bodyErrors;
        throw new Error(`Validation errors: ${stringify(bodyErrors)}`);
      }
    }

    return true;
  }

  validateHeaders(partialRequest: Pick<Request, 'headers' | 'path' | 'method'>, returnErrors: boolean = false): boolean | ErrorObject[] {
    const { headers, path, method } = partialRequest;
    const validation = this.apiValidator.validateRequest({ path, method, headers, body: {} });

    if (validation.errors) {
      const headersErrors = validation.errors.filter((error: any) => error.instancePath === '/header');
      if (headersErrors && headersErrors.length > 0) {
        if (returnErrors) return headersErrors;
        throw new Error(`Validation errors: ${stringify(headersErrors)}`);
      }
    }

    return true;
  }
}
