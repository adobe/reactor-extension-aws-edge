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

/* eslint-disable no-template-curly-in-string */

import { screen } from '@testing-library/react';
import renderView from '../../__tests_helpers__/renderView';
import {
  changeInputValue,
  click,
  getTextFieldByLabel
} from '../../__tests_helpers__/jsDomHelpers';

import SendDataToKinesisDataStream from '../sendDataToKinesisDataStream';
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
  streamNameField: screen.getByLabelText(/Stream Name/i),
  awsRegionField: screen.getByLabelText(/AWS Region/i, {
    selector: '[name="region"]'
  }),
  partitionKeyField: screen.getByLabelText(/Partition Key/i, {
    selector: '[name="partitionKey"]'
  }),
  dataField: screen.getByLabelText(/data/i, {
    selector: '[name="dataRaw"]'
  }),
  dataJsonRadio: screen.getByLabelText(/JSON Key-Value Pairs Editor/i)
});

describe('Send data to kinesis data stream view', () => {
  test('sets form values from setting', async () => {
    renderView(SendDataToKinesisDataStream);

    extensionBridge.init({
      settings: {
        streamName: 'stream name',
        region: 'us-east-1',
        partitionKey: '1234',
        data: {
          a: 'b'
        }
      }
    });

    const { streamNameField, awsRegionField, partitionKeyField, dataField } =
      getFromFields();

    expect(streamNameField.value).toBe('stream name');
    expect(awsRegionField.value).toBe('US East (N. Virginia)');
    expect(partitionKeyField.value).toBe('1234');
    expect(dataField.value).toBe('{"a":"b"}');
  });

  test('sets settings from form values', async () => {
    renderView(SendDataToKinesisDataStream);

    extensionBridge.init({
      settings: {
        streamName: 'stream name',
        region: 'us-east-1',
        partitionKey: '1234',
        data: {
          a: 'b'
        }
      }
    });

    const { streamNameField, awsRegionField, partitionKeyField, dataField } =
      getFromFields();

    await changeInputValue(streamNameField, 'new streamname');
    await changeInputValue(awsRegionField, 'US West (Oregon)');
    await changeInputValue(partitionKeyField, '54321');
    await changeInputValue(dataField, '{{"a":"c"}');

    expect(extensionBridge.getSettings()).toEqual({
      streamName: 'new streamname',
      region: 'us-west-2',
      partitionKey: '54321',
      data: {
        a: 'c'
      }
    });
  });

  test.only('sets settings from form values when JSON editors are used', async () => {
    renderView(SendDataToKinesisDataStream);

    extensionBridge.init({
      settings: {
        streamName: 'stream name',
        region: 'us-east-1',
        partitionKey: '1234',
        data: {
          a: 'b',
          c: {
            d: 'e'
          }
        }
      }
    });

    const { dataJsonRadio } = getFromFields();

    await click(dataJsonRadio);

    expect(getTextFieldByLabel('Data JSON Key 0').value).toBe('a');
    expect(getTextFieldByLabel('Data JSON Value 0').value).toBe('b');
    expect(getTextFieldByLabel('Data JSON Key 1').value).toBe('c.d');
    expect(getTextFieldByLabel('Data JSON Value 1').value).toBe('e');

    await click(getTextFieldByLabel('Delete Data JSON Row 0'));

    await changeInputValue(getTextFieldByLabel('Data JSON Key 0'), 'a');

    expect(extensionBridge.getSettings()).toEqual({
      streamName: 'stream name',
      region: 'us-east-1',
      partitionKey: '1234',
      data: {
        a: 'e'
      }
    });
  });

  test('handles default form validation correctly', async () => {
    renderView(SendDataToKinesisDataStream);

    extensionBridge.init({
      settings: {
        streamName: 'stream name',
        region: 'us-east-1',
        partitionKey: '1234',
        data: {
          a: 'b'
        }
      }
    });

    const { streamNameField, awsRegionField, partitionKeyField, dataField } =
      getFromFields();

    expect(streamNameField).not.toHaveAttribute('aria-invalid', 'true');
    await changeInputValue(streamNameField, '');

    expect(awsRegionField).not.toHaveAttribute('aria-invalid', 'true');
    await changeInputValue(awsRegionField, '');

    expect(partitionKeyField).not.toHaveAttribute('aria-invalid', 'true');
    await changeInputValue(partitionKeyField, '');

    expect(dataField).not.toHaveAttribute('aria-invalid', 'true');
    await changeInputValue(dataField, '');

    await extensionBridge.validate();

    expect(streamNameField).toHaveAttribute('aria-invalid', 'true');
    expect(awsRegionField).toHaveAttribute('aria-invalid', 'true');
    expect(partitionKeyField).toHaveAttribute('aria-invalid', 'true');

    expect(dataField).toHaveAttribute('aria-invalid', 'true');
  });

  test('handles json editor validation when no data is provided', async () => {
    renderView(SendDataToKinesisDataStream);

    extensionBridge.init({
      settings: null
    });

    const { dataJsonRadio } = getFromFields();

    await click(dataJsonRadio);

    expect(getTextFieldByLabel('Data JSON Key 0')).not.toHaveAttribute(
      'aria-invalid',
      'true'
    );
    await extensionBridge.validate();
    expect(getTextFieldByLabel('Data JSON Key 0')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });

  test('handles json editor validation when no key is provided but there is data', async () => {
    renderView(SendDataToKinesisDataStream);

    extensionBridge.init({
      settings: null
    });

    const { dataJsonRadio } = getFromFields();

    await click(dataJsonRadio);

    expect(getTextFieldByLabel('Data JSON Key 0')).not.toHaveAttribute(
      'aria-invalid',
      'true'
    );
    await changeInputValue(getTextFieldByLabel('Data JSON Value 0'), 'a');

    await extensionBridge.validate();

    expect(getTextFieldByLabel('Data JSON Key 0')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });
});
