import path from 'path';
import { Validator } from 'src/lib/validation/validator';

const specFile = `../docs/fspiop-rest-v2.0-openapi3-snippets.yaml`;
const specPath = path.join(path.dirname(require.resolve('@mojaloop/api-snippets')), specFile);

describe.skip('Validator', () => {
  let validator: Validator;

  beforeEach(() => {
    validator = new Validator(specPath);
    validator.initialize()
  });

  it('should initialize the validator', async () => {
    await validator.initialize();
    expect(validator.apiSpec).toBeDefined();
    expect(validator.apiValidator).toBeDefined();
  });

  it('should validate the request', () => {
    const request = {
      path: '/users',
      method: 'GET',
      headers: {},
      body: {},
      query: {}
    };
    const result = validator.validateRequest(request as any);
    expect(result).toBe(true);
  });

  it('should validate the body', () => {
    const partialRequest = {
      body: {},
      path: '/users',
      method: 'POST'
    };
    const result = validator.validateBody(partialRequest as any);
    expect(result).toBe(true);
  });

  it('should validate the headers', () => {
    const partialRequest = {
      headers: {},
      path: '/users',
      method: 'GET'
    };
    const result = validator.validateHeaders(partialRequest as any);
    expect(result).toBe(true);
  });
});
