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

import ExtensionView from '../components/extensionView';

import CredentialsFields from './components/credentialsSection/fields';
import getCredentialsInitValues from './components/credentialsSection/getInitValues';
import getCredentialsSettings from './components/credentialsSection/getSettings';
import validateCredentialsFields from './components/credentialsSection/validate';

export default function Configuration() {
  return (
    <ExtensionView
      getInitialValues={({ initInfo }) => ({
        ...getCredentialsInitValues(initInfo)
      })}
      getSettings={({ values }) => ({
        ...getCredentialsSettings(values)
      })}
      validate={(values) => ({
        ...validateCredentialsFields(values)
      })}
      render={() => <CredentialsFields />}
    />
  );
}
