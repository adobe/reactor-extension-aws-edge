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
import { Flex } from '@adobe/react-spectrum';

import ExtensionView from '../components/extensionView';

import StreamFields from './components/streamSection/fields';
import getStreamInitValues from './components/streamSection/getInitValues';
import getStreamSettings from './components/streamSection/getSettings';
import validateStreamFields from './components/streamSection/validate';

import DataFields from './components/dataSection/fields';
import getDataInitValues from './components/dataSection/getInitValues';
import getDataSettings from './components/dataSection/getSettings';
import validateDataFields from './components/dataSection/validate';

export default function SendDataToKinesis() {
  return (
    <ExtensionView
      getInitialValues={({ initInfo }) => ({
        ...getStreamInitValues(initInfo),
        ...getDataInitValues(initInfo)
      })}
      getSettings={({ values }) => ({
        ...getStreamSettings(values),
        ...getDataSettings(values)
      })}
      validate={(values) => ({
        ...validateStreamFields(values),
        ...validateDataFields(values)
      })}
      render={() => (
        <Flex direction="column" gap="size-150">
          <StreamFields />
          <DataFields />
        </Flex>
      )}
    />
  );
}
