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

import { ConfigOptions, FspiopPutQuotesSource, Source, FspiopSource, IsoSource } from '.';

export const isConfig = (config: ConfigOptions): config is ConfigOptions => {
  return !!(config.logger);
};

const FSPIOP = {
  parties: {
    put: {
      isSource: (source: Source): source is Source => {
        return !!(source.body && source.headers && source.params);
      }
    },
    putError: {
      isSource: (source: Source): source is Source => {
        return !!(source.body && source.headers && source.params);
      }
    }
  },
  quotes: {
    post: {
      isSource: (source: FspiopSource): source is FspiopSource => {
        return !!(source.body);
      }
    },
    put: {
      isSource: (source: FspiopPutQuotesSource): source is FspiopPutQuotesSource => {
        return !!(source.body && (source.$context || source.headers));
      }
    },
    putError: {
      isSource: (source: FspiopSource): source is FspiopSource => {
        return !!(source.body);
      }
    }
  },
  transfers: {
    post: {
      isSource: (source: FspiopSource): source is FspiopSource => {
        return !!(source.body);
      }
    },
    patch: {
      isSource: (source: FspiopSource): source is FspiopSource => {
        return !!(source.body);
      }
    },
    put: {
      isSource: (source: FspiopSource): source is FspiopSource => {
        return !!(source.body);
      }
    },
    putError: {
      isSource: (source: FspiopSource): source is FspiopSource => {
        return !!(source.body);
      }
    }
  },
  fxQuotes: {
    post: {
      isSource: (source: FspiopSource): source is FspiopSource => {
        return !!(source.body);
      }
    },
    put: {
      isSource: (source: FspiopSource): source is FspiopSource => {
        return !!(source.body);
      }
    },
    putError: {
      isSource: (source: FspiopSource): source is FspiopSource => {
        return !!(source.body);
      }
    }
  },
  fxTransfers: {
    post: {
      isSource: (source: FspiopSource): source is FspiopSource => {
        return !!(source.body);
      }
    },
    patch: {
      isSource: (source: FspiopSource): source is FspiopSource => {
        return !!(source.body);
      }
    },
    put: {
      isSource: (source: FspiopSource): source is FspiopSource => {
        return !!(source.body);
      }
    },
    putError: {
      isSource: (source: FspiopSource): source is FspiopSource => {
        return !!(source.body);
      }
    }
  }
};
 
const FSPIOPISO20022 = {
  parties: {
    put: {
      isSource: (source: IsoSource): source is IsoSource => {
        return !!(source.body);
      }
    },
    putError: {
      isSource: (source: IsoSource): source is IsoSource => {
        return !!(source.body);
      }
    }
  },
  quotes: {
    post: {
      isSource: (source: IsoSource): source is IsoSource => {
        return !!(source.body);
      }
    },
    put: {
      isSource: (source: IsoSource): source is IsoSource => {
        return !!(source.body);
      }
    },
    putError: {
      isSource: (source: IsoSource): source is IsoSource => {
        return !!(source.body);
      }
    }
  },
  transfers: {
    post: {
      isSource: (source: IsoSource): source is IsoSource => {
        return !!(source.body);
      }
    },
    patch: {
      isSource: (source: IsoSource): source is IsoSource => {
        return !!(source.body);
      }
    },
    put: {
      isSource: (source: IsoSource): source is IsoSource => {
        return !!(source.body);
      }
    },
    putError: {
      isSource: (source: IsoSource): source is IsoSource => {
        return !!(source.body);
      }
    }
  },
  fxQuotes: {
    post: {
      isSource: (source: IsoSource): source is IsoSource => {
        return !!(source.body);
      }
    },
    put: {
      isSource: (source: IsoSource): source is IsoSource => {
        return !!(source.body);
      }
    },
    putError: {
      isSource: (source: IsoSource): source is IsoSource => {
        return !!(source.body);
      }
    }
  },
  fxTransfers: {
    post: {
      isSource: (source: IsoSource): source is IsoSource => {
        return !!(source.body);
      }
    },
    patch: {
      isSource: (source: IsoSource): source is IsoSource => {
        return !!(source.body);
      }
    },
    put: {
      isSource: (source: IsoSource): source is IsoSource => {
        return !!(source.body);
      }
    },
    putError: {
      isSource: (source: IsoSource): source is IsoSource => {
        return !!(source.body);
      }
    }
  }
};

export const TypeGuards = { FSPIOP, FSPIOPISO20022 };
