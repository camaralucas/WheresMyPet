import React from 'react';
import {View, Modal, Text} from 'react-native';
import GlobalTheme from '../styles/GlobalTheme';
import {Icon, ThemeProvider, Divider} from 'react-native-elements';

export default function OwnerInfoModal({visible, openModal, user}) {
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
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 20,
                color: '#ff1a1a',
              }}>
              ! ATENÇÃO !
            </Text>
            <Text style={{textAlign: 'center', marginTop: 20}}>
              Para mantermos a segurança de todos os usuários, indicamos as
              pessoas que buscam por seus animais que solicitem fotos que
              aumentem a veracidade da informação. Então, Esperamos que você
              colabore enviando alguma foto para o dono em seu contato
              (disponível abaixo) para que não ocorra nenhum problema ou mal
              entendido entre as partes.
            </Text>
            <Text style={{textAlign: 'center', marginTop: 20}}>
              Obrigado pela colaboração!
            </Text>
            <Divider style={{...GlobalTheme.divider, marginTop: 20}} />

            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 15,
                color: '#000',
                marginTop: 20,
              }}>
              CONTATOS DO DONO
            </Text>

            <View style={{marginTop: 30}}>
              <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
                E-MAIL
              </Text>
              <Text style={{textAlign: 'center'}}>{user.email}</Text>
            </View>
            {user.phone_number && (
              <View style={{marginTop: 30}}>
                <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
                  TELEFONE
                </Text>
                <Text style={{textAlign: 'center'}}>{user.phone_number}</Text>
              </View>
            )}
          </View>
        </View>
      </ThemeProvider>
    </Modal>
  );
}
