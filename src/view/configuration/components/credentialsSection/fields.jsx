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

/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import {
  Heading,
  Flex,
  ContextualHelp,
  Content,
  Link
} from '@adobe/react-spectrum';
import WrappedTextField from '../../../components/wrappedTextField';

export default function CredentialsSectionFields() {
  return (
    <>
      <Flex alignItems="center" gap="size-75">
        <Heading level="3">Credentials</Heading>

        <ContextualHelp>
          <Heading>Need help?</Heading>
          <Content>
            <p>
              Learn more about how to genereate{' '}
              <Link>
                <a
                  href="https://docs.aws.amazon.com/powershell/latest/userguide/pstools-appendix-sign-up.html"
                  rel="noreferrer"
                  target="_blank"
                >
                  AWS Account and Access Keys
                </a>
              </Link>
              .
            </p>
          </Content>
        </ContextualHelp>
      </Flex>

      <Flex gap="size-150" direction="column">
        <WrappedTextField
          width="size-4600"
          name="credentials.accessKeyId"
          label="Access key ID"
          necessityIndicator="label"
          isRequired
          supportDataElement
        />
        <WrappedTextField
          width="size-4600"
          name="credentials.secretAccessKey"
          label="Secret Access key"
          necessityIndicator="label"
          isRequired
          supportDataElement
        />
      </Flex>
    </>
  );
}
