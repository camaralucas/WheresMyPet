import React from 'react';
import {View, Modal, Text} from 'react-native';
import GlobalTheme from '../styles/GlobalTheme';
import {Icon, ThemeProvider, Divider} from 'react-native-elements';

export default function FilterModal({visible, openModal}) {
  return (
    <Modal transparent={true} visible={visible}>
      <ThemeProvider theme={GlobalTheme}>
        <View style={{backgroundColor: '#000000aa', flex: 1}}>
          <View
            style={{
              backgroundColor: '#ffffff',
              height: 600,
              marginTop: 50,
              marginBottom: 50,
              marginEnd: 20,
              marginStart: 20,
              paddingTop: 20,
              paddingLeft: 40,
              paddingRight: 40,
              paddingBottom: 40,
              borderRadius: 10,
            }}>
            <Icon
              type="font-awesome-5"
              name="window-close"
              size={30}
              onPress={() => openModal(false)}
              containerStyle={{alignItems: 'flex-end'}}
            />

            <Text style={{textAlign: 'center', marginTop: 20}}>
              FILTER MODAL
            </Text>

            <Divider style={{...GlobalTheme.divider, marginTop: 20}} />
          </View>
        </View>
      </ThemeProvider>
    </Modal>
  );
}
