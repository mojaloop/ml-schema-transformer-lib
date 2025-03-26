import path from 'path';
import { Validator } from '../../../../src/lib/validation/validator';
import { HTTP_METHOD } from 'src/types';
import { expectedFspiopTargets } from 'test/fixtures';

const specFile = `../docs/fspiop-rest-v2.0-openapi3-snippets.yaml`;
const specPath = path.join(path.dirname(require.resolve('@mojaloop/api-snippets')), specFile);

describe('Validator', () => {
  let validator: Validator;

  beforeEach(async () => {
    validator = new Validator(specPath);
    await validator.initialize()
  });

  it('should initialize the validator', async () => {
    await validator.initialize();
    expect(validator.apiSpec).toBeDefined();
    expect(validator.apiValidator).toBeDefined();
  });

  describe('validateRequest', () => {
    it('should throw an error if validation fails', () => {
      const request = {
        path: '/transfers',
        method: HTTP_METHOD.POST,
        headers: {},
        body: expectedFspiopTargets.transfers.post.body,
        query: {}
      };
      expect(() => validator.validateRequest(request)).toThrow();
    });
    it('should return the errors if returnErrors is true', () => {
      const request = {
        path: '/transfers',
        method: HTTP_METHOD.POST,
        headers: {},
        body: expectedFspiopTargets.transfers.post.body,
        query: {}
      };
      const result = validator.validateRequest(request, true) as any;
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(4);
    });
    it('should validate the request', () => {
      const request = {
        path: '/transfers',
        method: HTTP_METHOD.POST,
        headers: { 
          'accept': 'application/vnd.interoperability.transfers+json;version=2.0',
          'content-type': 'application/vnd.interoperability.transfers+json;version=2.0',
          'date': new Date().toISOString(),
          'fspiop-source': 'payerfsp'
        },
        body: expectedFspiopTargets.transfers.post.body,
        query: {}
      };
      const result = validator.validateRequest(request);
      expect(result).toBe(true);
    });
  })
  
  describe('validateBody', () => {
    it('should throw an error if validation fails', () => {
      const partialRequest = {
        body: {},
        path: '/transfers',
        method: HTTP_METHOD.POST
      };
      expect(() => validator.validateBody(partialRequest)).toThrow();
    });
    it('should return the errors if returnErrors is true', () => {
      const partialRequest = {
        body: {},
        path: '/transfers',
        method: HTTP_METHOD.POST
      };
      const result = validator.validateBody(partialRequest, true);
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(7);
    });
    it('should validate the body', () => {
      const partialRequest = {
        body: expectedFspiopTargets.transfers.post.body,
        path: '/transfers',
        method: HTTP_METHOD.POST
      };
      const result = validator.validateBody(partialRequest);
      expect(result).toBe(true);
    });
  });

  describe('validateHeaders', () => {
    it('should throw an error if validation fails', () => {
      const partialRequest = {
        headers: {},
        path: '/transfers',
        method: HTTP_METHOD.POST
      };
      expect(() => validator.validateHeaders(partialRequest)).toThrow();
    });
    it('should return the errors if returnErrors is true', () => {
      const partialRequest = {
        headers: {},
        path: '/transfers',
        method: HTTP_METHOD.POST
      };
      const result = validator.validateHeaders(partialRequest, true);
      expect(Array.isArray(result)).toBe(true);
    });
    it('should validate the headers', () => {
      const partialRequest = {
        headers: { 
          'accept': 'application/vnd.interoperability.transfers+json;version=2.0',
          'content-type': 'application/vnd.interoperability.transfers+json;version=2.0',
          'date': new Date().toISOString(),
          'fspiop-source': 'payerfsp'
        },
        path: '/transfers',
        method: HTTP_METHOD.POST
      };
      const result = validator.validateHeaders(partialRequest as any);
      expect(result).toBe(true);
    });
  });
});
