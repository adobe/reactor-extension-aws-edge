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

const getKinesisClient = require('./helpers/getKinesisClient');
const { PutRecordCommand } = require('@aws-sdk/client-kinesis');
const { jsonToBinaryArray } = require('./helpers/jsonUtilities');

module.exports = async ({
  utils: { logger, getSettings, getExtensionSettings }
}) => {
  const {
    credentials: { accessKeyId, secretAccessKey }
  } = getExtensionSettings();
  const { region, streamName, data, partitionKey } = getSettings();

  const kinesisClient = getKinesisClient({
    region,
    accessKeyId,
    secretAccessKey
  });

  const params = {
    StreamName: streamName,
    PartitionKey: partitionKey,
    Data: jsonToBinaryArray(data)
  };

  const command = new PutRecordCommand(params);

  try {
    const data = await kinesisClient.send(command);
    logger.log(data);
  } catch (error) {
    logger.error({ ...error, message: error.message });
  }
};
