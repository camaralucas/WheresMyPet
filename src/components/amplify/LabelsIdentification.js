import React, {useState} from 'react';
import Amplify, {Predictions} from 'aws-amplify';
import {AmazonAIPredictionsProvider} from '@aws-amplify/predictions';
Amplify.addPluggable(new AmazonAIPredictionsProvider());
import {ThemeProvider, Text} from 'react-native-elements';

function LabelsIdentification() {
  const [response, setResponse] = useState([]);

  function identifyFromFile(event) {
    const {
      target: {files},
    } = event;
    const [file] = files || [];

    if (!file) {
      return;
    }
    Predictions.identify({
      labels: {
        source: {
          file,
        },
        type: 'ALL', // "LABELS" will detect objects , "UNSAFE" will detect if content is not safe, "ALL" will do both default on aws-exports.js
      },
    })
      .then(result => {
        console.log('result: ', result);
        const labels = result.labels.map(l => l.name);
        console.log('labels: ', labels);
        setResponse(labels);
      })
      .catch(err => setResponse(JSON.stringify(err, null, 2)));
  }

  return (
    <ThemeProvider>
      <Text>Labels identification</Text>
      <input type="file" onChange={identifyFromFile}></input>
      {response.map((r, i) => (
        <Text key={i}>{r}</Text>
      ))}
    </ThemeProvider>
  );
}

export default LabelsIdentification;
