import React from 'react';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import spec from './researcher-API-spec/swagger.yaml';

export default function APIListItem() {
  return (
    <>
      <SwaggerUI url={spec} />
    </>
  );
}
