import fs from 'fs';
import { API_NAME, HTTP_METHOD } from 'src/types';
import { getApiSpecPath, validateBody, applyTargetValidation } from '../../../../src/lib/validation';
import { expectedFspiopTargets, mockLogger } from 'test/fixtures';

vi.setConfig({ testTimeout: 10_000 });

describe('Validation Tests', () => {
  describe('getApiSpecPath', () => {
    it('should return FSPIOP 1.1 API spec path', () => {
      const apiSpecPath = getApiSpecPath(API_NAME.FSPIOP, '1.1');
      expect(apiSpecPath).toContain('fspiop-rest-v1.1-openapi3-snippets.yaml');
      expect(() => fs.accessSync(apiSpecPath, fs.constants.F_OK)).not.toThrow();
    });
    it('should return FSPIOP 2.0 API spec path', () => {
      const apiSpecPath = getApiSpecPath(API_NAME.FSPIOP, '2.0');
      expect(apiSpecPath).toContain('fspiop-rest-v2.0-openapi3-snippets.yaml');
      expect(() => fs.accessSync(apiSpecPath, fs.constants.F_OK)).not.toThrow();
    });
    it('should return ISO20022 2.0 API spec path', () => {
      const apiSpecPath = getApiSpecPath(API_NAME.ISO20022, '2.0');
      expect(apiSpecPath).toContain('fspiop-rest-v2.0-ISO20022-openapi3-snippets.yaml');
      expect(() => fs.accessSync(apiSpecPath, fs.constants.F_OK)).not.toThrow();
    });
    it('should throw an error for an invalid API name', () => {
      expect(() => getApiSpecPath('INVALID_API_NAME' as API_NAME, '1.1')).toThrowError('Invalid API name: INVALID_API_NAME in getApiSpecPath');
    });
  });

  describe('validateBody', () => {
    it('should return true for a valid payload', async () => {
      const target = expectedFspiopTargets.transfers.post;
      const spec = { name: API_NAME.FSPIOP, version: '2.0', path: '/transfers', method: HTTP_METHOD.POST };
      const result = await validateBody(target.body, spec);
      expect(result).toBe(true);
    });

    it('should throw an error for an invalid payload', async () => {
      const target = { body: {} }
      const spec = { name: API_NAME.FSPIOP, version: '2.0', path: '/transfers', method: HTTP_METHOD.POST };
      await expect(validateBody(target, spec)).rejects.toThrowError();
    });
  });

  describe('applyTargetValidation', () => {
    it('should skip target validation if validateTarget is false', async () => {
      const params = {
        source: {},
        target: expectedFspiopTargets.transfers.post,
        options: { validateTarget: false },
        logger: mockLogger
      };
      await expect(applyTargetValidation(params)).resolves.toEqual(expectedFspiopTargets.transfers.post);
      expect(params.logger.debug).toHaveBeenCalledWith('Skipping target validation', expect.any(Object));
    });
    it('should throw an error if targetSpec is missing', async () => {
      const params = {
        source: {},
        target: expectedFspiopTargets.transfers.post,
        options: { validateTarget: true, applyTargetValidation: {} },
        logger: mockLogger
      };
      await expect(applyTargetValidation(params)).rejects.toThrowError('Missing or invalid targetSpec in applyTargetValidation options');
      expect(params.logger.error).toHaveBeenCalledWith('Missing or invalid targetSpec in applyTargetValidation options', expect.any(Object));
    });
    it('should apply target validation successfully', async () => {
      const params = {
        source: {},
        target: expectedFspiopTargets.transfers.post,
        options: { validateTarget: true, applyTargetValidation: { targetSpec: { name: API_NAME.FSPIOP, version: '2.0', path: '/transfers', method: HTTP_METHOD.POST } } },
        logger: mockLogger
      };
      await expect(applyTargetValidation(params)).resolves.toEqual(expectedFspiopTargets.transfers.post);
    });
  });
});
