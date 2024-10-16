/*****
 License
 --------------
 Copyright © 2017 Bill & Melinda Gates Foundation
 The Mojaloop files are made available by the Bill & Melinda Gates Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Gates Foundation organization for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.
 * Gates Foundation
 - Name Surname <name.surname@gatesfoundation.com>
 
 * Steven Oderayi <steven.oderayi@infitx.com>
 --------------
 ******/

import { ContextLogger } from '@mojaloop/central-services-logger/src/contextLogger';
import { AsyncTransformer, Options, State, TransformDefinition, Transformer } from './map-transform';

export interface ITransformer {
  transform(source: Partial<Source>, { mapperOptions }: { mapperOptions?: State }): Promise<Partial<Target>>;
}

export type TransformFacadeOptions = { overrideMapping?: TransformDefinition, mapTransformOptions?: Options, mapperOptions?: State };
export type FspiopTransformFacadeFunction = (source: Source, options: TransformFacadeOptions) => Promise<IsoTarget>;
export type IsoTransformFacadeFunction = (source: IsoSource, options: TransformFacadeOptions) => Promise<Partial<Target>>;
export type TransformFunctionOptions = { mapping: TransformDefinition, mapperOptions?: State, mapTransformOptions?: Options, logger: ContextLogger };
export type CreateTransformerOptions = { mapTransformOptions?: Options };

export enum ID_GENERATOR_TYPE {
  ulid = 'ulid',
  uuid = 'uuid'
}

export interface ICustomTransforms {
  [key: string | symbol]: Transformer | AsyncTransformer
}

export type ConfigOptions = {
  logger: ContextLogger;
}

export type Headers = {
  'fspiop-source': string;
  'fspiop-destination': string;
}

export type Params = {
  ID: string;
  SubId?: string;
}

export type Source = {
  body: GenericObject;
  headers?: GenericObject;
  params?: GenericObject;
}

export type Target = {
  body: GenericObject;
  headers: Headers;
  params: Params;
};

export type FspiopSource = Pick<Source, 'body'>;
export type FspiopTarget = Pick<Target, 'body'>;

export type FspiopPutQuotesSource = { body: GenericObject, params: Pick<Params, 'ID'>,  $context: { isoPostQuote: GenericObject }, headers?: Headers } | {body: GenericObject, params: Pick<Params, 'ID'>, headers: Headers, $context?: { isoPostQuote: GenericObject } };
export type FspiopPutPartiesSource = { body: GenericObject, headers: Headers, params: Pick<Params, 'SubId'> };
export type FspiopPutPartiesErrorSource = { body: GenericObject, headers: Headers, params: Pick<Params, 'SubId'> };

export type IsoSource = Pick<Source, 'body'>;
export type IsoTarget = Pick<Target, 'body'>;

/* eslint-disable  @typescript-eslint/no-explicit-any */
export type GenericObject =  Record<string, any>;

export type Json = string | number | boolean | Json[] | { [key: string]: Json };
export type LogContext = Json | string | null;
export const logLevelsMap = {
  error: 'error',
  warn: 'warn',
  info: 'info',
  verbose: 'verbose',
  debug: 'debug',
  silly: 'silly',
  audit: 'audit',
  trace: 'trace',
  perf: 'perf',
} as const;

export const logLevelValues = Object.values(logLevelsMap);
export type LogLevel = (typeof logLevelValues)[number];
export * from './type-guards';

