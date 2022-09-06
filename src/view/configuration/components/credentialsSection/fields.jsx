/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import React from 'react';
import { Heading, Divider, Flex } from '@adobe/react-spectrum';
import WrappedTextField from '../../../components/wrappedTextField';

export default function CredentialsSectionFields() {
  return (
    <>
      <Heading level="3">AWS Credentials</Heading>
      <Divider size="M" marginBottom="size-150" />
      <Flex gap="size-150" direction="column">
        <WrappedTextField
          width="size-4600"
          name="credentials.accessKeyId"
          label="Access key ID"
          supportDataElement
        />
        <WrappedTextField
          width="size-4600"
          name="credentials.secretAccessKey"
          label="Secret Access Key"
          supportDataElement
        />
      </Flex>
    </>
  );
}
