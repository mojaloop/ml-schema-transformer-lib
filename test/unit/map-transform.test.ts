import { fspiop } from './fixtures';
import { FspiopTransformFacade } from '../../src/facades/fspiop';

const source = fspiop.quotes.post;

describe('Transformer test -->', () => {
  test('should transform FSPIOP quotes payload to FSPIOP 20022 quotes payload', async () => {
    const target = await FspiopTransformFacade.quotes.post(source);
    console.log(target);
  });
});