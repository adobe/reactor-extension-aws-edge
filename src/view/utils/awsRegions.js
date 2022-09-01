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

const regions = [
  { id: 'us-east-2', name: 'US East (Ohio)' },
  { id: 'us-east-1', name: 'US East (N. Virginia)' },
  { id: 'us-west-1', name: 'US West (N. California)' },
  { id: 'us-west-2', name: 'US West (Oregon)' },
  { id: 'af-south-1', name: 'Africa (Cape Town)' },
  { id: 'ap-east-1', name: 'Asia Pacific (Hong Kong)' },
  { id: 'ap-southeast-3', name: 'Asia Pacific (Jakarta)' },
  { id: 'ap-south-1', name: 'Asia Pacific (Mumbai)' },
  { id: 'ap-northeast-3', name: 'Asia Pacific (Osaka)' },
  { id: 'ap-northeast-2', name: 'Asia Pacific (Seoul)' },
  { id: 'ap-southeast-1', name: 'Asia Pacific (Singapore)' },
  { id: 'ap-southeast-2', name: 'Asia Pacific (Sydney)' },
  { id: 'ap-northeast-1', name: 'Asia Pacific (Tokyo)' },
  { id: 'ca-central-1', name: 'Canada (Central)' },
  { id: 'eu-central-1', name: 'Europe (Frankfurt)' },
  { id: 'eu-west-1', name: 'Europe (Ireland)' },
  { id: 'eu-west-2', name: 'Europe (London)' },
  { id: 'eu-south-1', name: 'Europe (Milan)' },
  { id: 'eu-west-3', name: 'Europe (Paris)' },
  { id: 'eu-north-1', name: 'Europe (Stockholm)' },
  { id: 'me-south-1', name: 'Middle East (Bahrain)' },
  { id: 'sa-east-1', name: 'South America (São Paulo)' },
  { id: 'us-gov-east-1', name: 'AWS GovCloud (US-East)' },
  { id: 'us-gov-west-1', name: 'AWS GovCloud (US-West)' }
];

const regionIdsMap = regions.reduce((previousValue, currentValue) => {
  previousValue[currentValue.id] = currentValue.name;
  return previousValue;
}, {});

const regionNamesMap = regions.reduce((previousValue, currentValue) => {
  previousValue[currentValue.name] = currentValue.id;
  return previousValue;
}, {});

export default {
  getRegionId: (name) => regionNamesMap[name] || name,
  getRegionName: (id) => regionIdsMap[id] || id,
  getRegionNames: () => regions.map((region) => region.name)
};
