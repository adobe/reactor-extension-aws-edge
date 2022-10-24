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
  Flex,
  Heading,
  View,
  Link,
  ContextualHelp,
  Content
} from '@adobe/react-spectrum';
import WrappedTextField from '../../../components/wrappedTextField';
import WrappedComboboxField from '../../../components/wrappedComboBox';
import awsRegions from '../../../utils/awsRegions';

export default function RequestSectionFields() {
  return (
    <View>
      <Flex alignItems="center" gap="size-75">
        <Heading level="3">Kinesis Data Stream Details</Heading>

        <ContextualHelp>
          <Heading>Need help?</Heading>
          <Content>
            <p>
              Amazon Kinesis Data Streams is used to collect and process large
              streams of data records in real time.
            </p>
            <p>
              Learn more about{' '}
              <Link>
                <a
                  href="https://docs.aws.amazon.com/streams/latest/dev/key-concepts.html"
                  rel="noreferrer"
                  target="_blank"
                >
                  Amazon Kinesis Data Streams Terminology and Concepts
                </a>
              </Link>
              .
            </p>
          </Content>
        </ContextualHelp>
      </Flex>

      <Flex direction="column" gap="size-150" minWidth="size-6000">
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
            contextualHelp={
              <ContextualHelp>
                <Heading>Need help?</Heading>
                <Content>
                  <p>
                    Each data stream is composed of one or more shards that act
                    as units of capacity. As workloads grow, an application may
                    read or write to a shard at a rate that exceeds its
                    capacity, creating a hot shard and requiring you to add
                    capacity quickly.
                  </p>
                  <p>
                    The partition key determines to which shard the record is
                    written. The partition key is a Unicode string with a
                    maximum length of 256 bytes. Choosing a good partition key
                    strategy helps you take full advantage of the capacity you
                    provision and avoid hot shards.
                  </p>
                  <p>
                    Learn more about{' '}
                    <Link>
                      <a
                        href="https://aws.amazon.com/blogs/big-data/under-the-hood-scaling-your-kinesis-data-streams/"
                        rel="noreferrer"
                        target="_blank"
                      >
                        scaling your Kinesis data streams
                      </a>
                    </Link>
                    .
                  </p>
                </Content>
              </ContextualHelp>
            }
          />
        </Flex>
      </Flex>
    </View>
  );
}
