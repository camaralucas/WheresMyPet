import React, {useState} from 'react';
import {Image} from 'react-native-elements';
import {Marker} from 'react-native-maps';
import MoreInfoModal from './MoreInfoModal';

export default function MarkerView({animal}) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Marker
      key={animal.id}
      coordinate={{
        latitude: parseFloat(animal.address.latitude),
        longitude: parseFloat(animal.address.longitude),
      }}
      title={`${animal.name} (${animal.breed})`}
      onPress={() => setOpenModal(true)}>
      <Image
        source={{uri: animal.image}}
        style={{
          height: 50,
          width: 50,
          borderRadius: 40,
          borderColor: '#000000',
        }}
      />
      <MoreInfoModal
        visible={openModal}
        openModal={setOpenModal}
        animal={animal}
      />
    </Marker>
  );
}
