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

const { jsonToBinaryArray } = require('../helpers/jsonUtilities');

describe('send data to kinesis data stream action', () => {
  test('makes the correct API calling without partition', () => {
    const mockSend = jest.fn();
    const mockPutRecordCommand = jest.fn();

    jest.mock('../../../../dist/kinesis.js', () => ({
      PutRecordCommand: mockPutRecordCommand,
      KinesisClient: jest.fn(() => ({ send: mockSend }))
    }));

    const sendDataToKinesisDataStream = require('../sendDataToKinesisDataStream');

    const payload = {
      time: '1433188255',
      event: 'metric',
      source: 'test12',
      sourceType: 'extenstion',
      fields: {
        firstname: 'abc'
      }
    };

    const fetch = jest.fn(() =>
      Promise.resolve({
        arrayBuffer: () => Promise.resolve([114, 101, 115, 117, 108, 116]) //result
      })
    );

    const settings = {
      streamName: 'a',
      region: 'us-east-2',
      partitionKey: 'b',
      data: payload
    };

    const extensionSettings = {
      credentials: {
        accessKeyId: 'aa',
        secretAccessKey: 'bb'
      }
    };
    var arc = {
      ruleStash: {}
    };

    const utils = {
      fetch: fetch,
      getSettings: () => settings,
      getExtensionSettings: () => extensionSettings,
      logger: { log: () => {} }
    };

    return sendDataToKinesisDataStream({ arc, utils }).then(() => {
      expect(mockSend.mock.calls.length).toBe(1);
      expect(mockPutRecordCommand.mock.calls[0][0]).toEqual({
        StreamName: 'a',
        PartitionKey: 'b',
        Data: jsonToBinaryArray(payload)
      });
    });
  });
});
