/**
 * We define default custom transforms here.
 * 
 * Example custom transform function
 *
 *  export const padLeft = (options: any) =>  () => (data: unknown, state: State) => {
 *    console.log('pad transform function called with data:', data);
 *    return data.padStart(10, '0');
 *  };
 * 
 * Provide the transformer functions to the `mapTransformOptions` parameter of the `createTransformer` function
 *
 *  const mapping = {};
 *  createTransformer(mapping, { mapTransformOptions: { transformers: { padLeft } } });
 * 
 * Use in mappings like so (remember to use double quotes in the JSON string and not signle quotes, and no trailing commas):
 * 
 *  {
 *   ...,
 *   "party.partyIdInfo.partyIdentifier": ["GetParties_IdentificationVerificationReportV03.Rpt.UpdtdPtyAndAcctId.Pty.Id.OrgId.Othr.Id", { "$transform": "padLeft" }],
 *   ... other mapping properties
 *  }
 * 
 * In the above, `padLeft` will be used for both forward and reverse transformations.
 * 
 *  To specify different transform functions for forward and reverse transformations:
 *  
 *  {
 *   ...,
 *   "party.partyIdInfo.partyIdentifier": ["GetParties_IdentificationVerificationReportV03.Rpt.UpdtdPtyAndAcctId.Pty.Id.OrgId.Othr.Id", { "$transform": "padLeft" }, { "$transform": "padRight" }],
 *   ... other mapping properties
 *  }
 * 
 * In the above, `padLeft` will be used for forward transformation and `padRight` will be used for reverse transformation.
 * 
 * You may also specify the direction of the transform function:
 * {
 *   ...,
 *   "party.partyIdInfo.partyIdentifier": ["GetParties_IdentificationVerificationReportV03.Rpt.UpdtdPtyAndAcctId.Pty.Id.OrgId.Othr.Id", { "$transform": "padLeft", "$direction": "rev" }, { "$transform": "padRight", "$direction": "fwd" }],
 *   ... other mapping properties
 *  }
 */

export const CustomTransforms = {};