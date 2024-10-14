import { createTransformer } from 'src';


describe('Random', () => {
  it.skip('should transform with alt and fixed value', async () => {
    const mappingStr = `{
      "body.CdtTrfTxInf.Dbtr.Id.OrgId.Othr.Id": { "$alt": [ "$context.isoPostQuote.CdtTrfTxInf.Dbtr", "headers.fspiop-destination" ] },
      "body.CdtTrfTxInf.DbtrAgt.FinInstnId.Othr.Id": { "$alt": [ "$context.isoPostQuote.CdtTrfTxInf.DbtrAgt", "headers.fspiop-destination" ] },
      "body.CdtTrfTxInf.Cdtr.Id.OrgId.Othr.Id": { "$alt": [ "$context.isoPostQuote.CdtTrfTxInf.Cdtr", "headers.fspiop-source" ] },
      "body.CdtTrfTxInf.CdtrAgt.FinInstnId.Othr.Id": { "$alt": [ "$context.isoPostQuote.CdtTrfTxInf.CdtrAgt", "headers.fspiop-source" ] },
      "body.CdtTrfTxInf.ChrgBr": { "$alt": [ "$context.isoPostQuote.CdtTrfTxInf.ChrgBr", { "$transform": "fixed", "value": "SHAR" } ] }
    }`;

    const mapping = JSON.parse(mappingStr);
    const transformer = createTransformer(mapping);

    // with context
    const context = {
      isoPostQuote: {
        CdtTrfTxInf: {
          Dbtr: 'Dbtr',
          DbtrAgt: 'DbtrAgt',
          Cdtr: 'Cdtr',
          CdtrAgt: 'CdtrAgt',
          ChrgBr: 'ChrgBr'
        }
      }
    };

    const source = {
      body: {},
      headers: {
        'fspiop-source': 'sourcefsp',
        'fspiop-destination': 'destinationfsp'
      },
      $context: context
    };
    const target = await transformer.transform(source, {});
    /* eslint-disable-next-line */
    console.log(target);

    // without context
    const source2 = {
      body: {},
      headers: {
        'fspiop-source': 'sourcefsp',
        'fspiop-destination': 'destinationfsp'
      }
    };
    const target2 = await transformer.transform(source2, {});
    /* eslint-disable-next-line */
    console.log(target2);
  });
});
