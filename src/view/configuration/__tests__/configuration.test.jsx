/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND,  either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/* eslint-disable no-template-curly-in-string */

import { screen } from '@testing-library/react';
import renderView from '../../__tests_helpers__/renderView';
import { changeInputValue } from '../../__tests_helpers__/jsDomHelpers';

import Configuration from '../configuration';
import createExtensionBridge from '../../__tests_helpers__/createExtensionBridge';

let extensionBridge;

beforeEach(() => {
  extensionBridge = createExtensionBridge();
  window.extensionBridge = extensionBridge;
});

afterEach(() => {
  delete window.extensionBridge;
});

const getFromFields = () => ({
  accessKeyIdField: screen.getByLabelText(/Access key ID/i),
  secretAccessKeyField: screen.getByLabelText(/Secret Access Key/i)
});

describe('Configuration view', () => {
  test('sets form values from setting', async () => {
    renderView(Configuration);

    extensionBridge.init({
      settings: {
        credentials: {
          accessKeyId: 'a',
          secretAccessKey: 'b'
        }
      }
    });

    const { accessKeyIdField, secretAccessKeyField } = getFromFields();

    expect(accessKeyIdField.value).toBe('a');
    expect(secretAccessKeyField.value).toBe('b');
  });

  test('sets settings from form values', async () => {
    renderView(Configuration);

    extensionBridge.init({
      settings: {
        credentials: {
          accessKeyId: 'a',
          secretAccessKey: 'b'
        }
      }
    });

    const { accessKeyIdField, secretAccessKeyField } = getFromFields();

    await changeInputValue(accessKeyIdField, 'new a');
    await changeInputValue(secretAccessKeyField, 'new b');

    expect(extensionBridge.getSettings()).toEqual({
      credentials: {
        accessKeyId: 'new a',
        secretAccessKey: 'new b'
      }
    });
  });

  test('handles default form validation correctly', async () => {
    renderView(Configuration);

    extensionBridge.init({
      settings: {
        credentials: {
          accessKeyId: 'a',
          secretAccessKey: 'b'
        }
      }
    });

    const { accessKeyIdField, secretAccessKeyField } = getFromFields();

    expect(accessKeyIdField).not.toHaveAttribute('aria-invalid', 'true');
    await changeInputValue(accessKeyIdField, '');

    expect(secretAccessKeyField).not.toHaveAttribute('aria-invalid', 'true');
    await changeInputValue(secretAccessKeyField, '');

    await extensionBridge.validate();

    expect(accessKeyIdField).toHaveAttribute('aria-invalid', 'true');
    expect(secretAccessKeyField).toHaveAttribute('aria-invalid', 'true');
  });
});
