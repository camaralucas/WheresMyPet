import React from 'react';
import {ThemeProvider, Button} from 'react-native-elements';
import GlobalTheme from '../../styles/GlobalTheme';

export default function UploadImageButton({
  navigation,
  animal,
  title,
  disabled = false,
}) {
  return (
    <ThemeProvider theme={GlobalTheme}>
      <Button title={title} onPress={uploadImageHandle} disabled={disabled} />
    </ThemeProvider>
  );
}
