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

/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import { Flex, Heading, View, Link, Text } from '@adobe/react-spectrum';
import WrappedTextField from '../../../components/wrappedTextField';
import WrappedComboboxField from '../../../components/wrappedComboBox';
import awsRegions from '../../../utils/awsRegions';

export default function RequestSectionFields() {
  return (
    <View>
      <Heading level="3">Kinesis Data Stream Details</Heading>

      <Flex direction="column" gap="size-150" minWidth="size-6000">
        <Flex gap="size-75">
          <Text>Learn more about</Text>
          <Link>
            <a
              href="https://docs.aws.amazon.com/streams/latest/dev/key-concepts.html"
              rel="noreferrer"
              target="_blank"
            >
              Amazon Kinesis Data Streams Terminology and Concepts
            </a>
          </Link>
        </Flex>

        <WrappedTextField
          minWidth="size-4600"
          width="size-4600"
          name="streamName"
          label="Stream Name"
          necessityIndicator="label"
          isRequired
          supportDataElement
        />

        <WrappedComboboxField
          minWidth="size-4600"
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

        <Flex direction="column">
          <WrappedTextField
            minWidth="size-4600"
            width="size-4600"
            name="partitionKey"
            label="Partition Key"
            description="A partition key is used to group data by shard within a stream."
            necessityIndicator="label"
            isRequired
            supportDataElement
          />
          <Flex gap="size-75">
            <Text>Learn more about</Text>
            <Link>
              <a
                href="https://aws.amazon.com/blogs/big-data/under-the-hood-scaling-your-kinesis-data-streams/"
                rel="noreferrer"
                target="_blank"
              >
                scaling your Kinesis data streams
              </a>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </View>
  );
}
