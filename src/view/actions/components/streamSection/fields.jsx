/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import React from 'react';
import { Flex, Heading, View } from '@adobe/react-spectrum';

import WrappedTextField from '../../../components/wrappedTextField';
import WrappedComboboxField from '../../../components/wrappedComboBox';
import awsRegions from '../../../utils/awsRegions';

export default function RequestSectionFields() {
  return (
    <View>
      <Heading level="3">Kinesis Data Stream Details</Heading>

      <Flex direction="column" gap="size-150">
        <WrappedTextField
          minWidth="size-6000"
          width="size-4600"
          name="streamName"
          label="Stream Name"
          necessityIndicator="label"
          isRequired
          supportDataElement
        />

        <WrappedComboboxField
          minWidth="size-6000"
          width="size-4600"
          name="region"
          label="AWS Region"
          necessityIndicator="label"
          isRequired
          supportDataElement
          allowsCustomValue
          defaultItems={awsRegions
            .getRegionNames()
            .map((q) => ({ id: q, name: q }))}
        />
      </Flex>
    </View>
  );
}
