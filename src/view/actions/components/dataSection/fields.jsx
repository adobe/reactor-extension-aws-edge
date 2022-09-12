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
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import {
  Button,
  Flex,
  Heading,
  RadioGroup,
  Radio,
  TextArea,
  Divider,
  View,
  Text
} from '@adobe/react-spectrum';
import Add from '@spectrum-icons/workflow/Add';
import row from './row';
import getEmptyDataJson from './getEmptyValue';
import WrappedTextField from '../../../components/wrappedTextField';
import {
  addToVariablesFromEntity,
  addToEntityFromVariables
} from '../../../utils/entityVariablesConverter';

export default function DataSectionFields() {
  const { control, setValue, watch } = useFormContext();
  const [dataType, dataRaw, dataJsonPairs] = watch([
    'dataType',
    'dataRaw',
    'dataJsonPairs'
  ]);

  const { fields, append, remove } = useFieldArray({
    name: 'dataJsonPairs'
  });

  return (
    <View>
      <Heading level="3">Data</Heading>
      <Flex direction="column" gap="size-150">
        <Controller
          control={control}
          name="dataType"
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <RadioGroup
              label="Select the way you want to provide the data"
              value={value}
              onChange={(v) => {
                onChange(v);

                // Auto Update Data Content
                if (v === 'json') {
                  let variables = [];
                  try {
                    variables = addToVariablesFromEntity(
                      [],
                      JSON.parse(dataRaw)
                    );
                  } catch (e) {
                    // Don't do anything
                  }

                  if (variables.length === 0) {
                    variables.push(getEmptyDataJson());
                  }

                  setValue('dataJsonPairs', variables, {
                    shouldValidate: true,
                    shouldDirty: true
                  });
                } else {
                  let entity = JSON.stringify(
                    addToEntityFromVariables({}, dataJsonPairs),
                    null,
                    2
                  );

                  if (entity === '{}') {
                    entity = '';
                  }

                  setValue('dataRaw', entity, {
                    shouldValidate: true,
                    shouldDirty: true
                  });
                }
                // END: Auto Update Data Content
              }}
            >
              <Flex>
                <Radio value="raw">Raw</Radio>
                <Radio value="json">JSON Key-Value Pairs Editor</Radio>
              </Flex>
            </RadioGroup>
          )}
        />

        {dataType === 'json' ? (
          <>
            <Flex direction="column" gap="size-100">
              <Flex direction="row" gap="size-200">
                <View flex>
                  <Heading
                    level="5"
                    marginStart="size-100"
                    marginTop="size-100"
                    marginBottom="size-50"
                  >
                    KEY
                  </Heading>
                </View>
                <View flex>
                  <Heading
                    level="5"
                    marginStart="size-100"
                    marginTop="size-100"
                    marginBottom="size-50"
                  >
                    VALUE
                  </Heading>
                </View>
                <View width="size-450" />
              </Flex>
              <Divider size="S" />
              {fields.map(row.bind(null, remove))}
            </Flex>

            <View>
              <Button
                variant="primary"
                onPress={() => append(getEmptyDataJson())}
              >
                <Add />
                <Text>Add Another</Text>
              </Button>
            </View>
          </>
        ) : (
          <WrappedTextField
            minWidth="size-4600"
            width="100%"
            component={TextArea}
            name="dataRaw"
            label="Payload"
            necessityIndicator="label"
            isRequired
            supportDataElement
          />
        )}
      </Flex>
    </View>
  );
}
