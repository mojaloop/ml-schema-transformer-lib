import { FspiopTransformFacade } from '../../src/facades/fspiop';
import { fspiop, fspiop_iso20022 } from './fixtures';


describe('Transformer test -->', () => {
  test('should transform FSPIOP quotes payload to FSPIOP ISO 20022 quotes payload', async () => {
    const source = fspiop.quotes.post;
    const target = await FspiopTransformFacade.quotes.post(source);
    expect(target).toEqual(fspiop_iso20022.quotes.post);
  });
});
