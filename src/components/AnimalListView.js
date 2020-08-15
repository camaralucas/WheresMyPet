import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Avatar, Text} from 'react-native-elements';
import MoreInfoModal from './MoreInfoModal';

export default function AnimalListView({animal, onClick}) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <View
      key={animal.id}
      style={{
        width: '97%',
        height: 160,
        backgroundColor: '#E0E0E0',
        margin: 5,
        padding: 5,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 2,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Avatar
        source={{uri: animal.image}}
        rounded
        containerStyle={{
          width: 140,
          height: 140,
          borderWidth: 1,
          borderColor: '#000000',
          margin: 5,
        }}
      />
      <View
        style={{
          width: '100%',
          height: '100%',
          marginTop: 10,
          marginStart: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 14}}>Raça: </Text>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>{animal.breed}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 14}}>Atender por: </Text>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>{animal.name}</Text>
        </View>

        <Text>Visto pela ultima vez em: </Text>

        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text
            style={{
              width: 250,
              fontSize: 14,
              fontWeight: 'bold',
            }}>
            {animal.address.street},{animal.address.neighborhood},{' '}
            {animal.address.city}
          </Text>
        </View>
        <Button
          title={'MAIS INFORMAÇÕES'}
          containerStyle={{
            width: 200,
            height: 200,
            marginStart: 20,
          }}
          titleStyle={{
            color: 'black',
            fontSize: 12,
            paddingStart: 0,
            paddingEnd: 0,
          }}
          onPress={() => setOpenModal(true)}
        />
      </View>
      <MoreInfoModal
        visible={openModal}
        openModal={setOpenModal}
        animal={animal}
      />
    </View>
  );
}
