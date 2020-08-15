import React, {useState} from 'react';
import {View, Text, Modal} from 'react-native';
import GlobalTheme from '../styles/GlobalTheme';
import {
  Icon,
  ThemeProvider,
  Button,
  Avatar,
  Divider,
} from 'react-native-elements';
import ColorView from './ColorView';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import OwnerInfoModal from './OwnerInfoModal';
export default function MoreInfoModal({visible, openModal, animal}) {
  const [ownerModal, setOwnerModal] = useState(false);
  const [region, setRegion] = useState({
    latitude: parseFloat(animal.address.latitude),
    longitude: parseFloat(animal.address.longitude),
    latitudeDelta: 0.003,
    longitudeDelta: 0.003,
  });

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

            <View
              style={{
                flexDirection: 'row',
              }}>
              <Avatar
                source={{uri: animal.image}}
                containerStyle={{
                  width: 110,
                  height: 110,
                  borderWidth: 1,
                  borderColor: '#000000',
                }}
                rounded
              />
              <View
                style={{
                  flexDirection: 'column',
                  marginStart: 10,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontSize: 14}}>Raça: </Text>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                    {animal.breed}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontSize: 14}}>Atender por: </Text>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                    {animal.name}
                  </Text>
                </View>
                <Text style={{textAlign: 'center', marginTop: 5}}>
                  COR DA PELAGEM
                </Text>
                <View
                  style={{
                    width: 200,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <ColorView
                    colorValue={animal.primary_fur}
                    title={'Predominante:'}
                  />
                  {animal.secundary_fur != animal.primary_fur && (
                    <ColorView
                      colorValue={animal.secundary_fur}
                      title={'Secundária:'}
                    />
                  )}
                </View>
              </View>
            </View>
            <Divider style={GlobalTheme.divider} />
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text>MARCAÇÕES NA COLEIRA DO ANIMAL</Text>
            </View>
            {animal.collarColor ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <ColorView
                  colorValue={animal.collarColor}
                  title={'Cor da coleira:'}
                />
                {animal.collarText && (
                  <View style={{alignItems: 'center'}}>
                    <Text>Texto presente na coleira:</Text>
                    <Text style={{fontWeight: 'bold'}}>
                      {animal.collarText}
                    </Text>
                  </View>
                )}
              </View>
            ) : (
              <Text style={{textAlign: 'center'}}>
                O animal não possui coleira
              </Text>
            )}
            <Divider style={GlobalTheme.divider} />
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text>VISTO PELA ULTIMA VEZ EM</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text
                style={{fontSize: 15, fontWeight: 'bold', textAlign: 'center'}}>
                {animal.address.street}, {animal.address.neighborhood},
                {animal.address.city}
              </Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <View
                style={{
                  width: '100%',
                  height: 120,
                  marginTop: 10,
                  marginBottom: 5,
                  borderColor: '#000000',
                  borderWidth: 1,
                }}>
                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  region={region}
                  showsMyLocationButton={false}
                  showsPointsOfInterest={false}
                  showsCompass={false}
                  showsTraffic={false}
                  zoomEnabled={false}
                  zoomTapEnabled={false}
                  zoomControlEnabled={false}
                  cacheEnabled={true}>
                  <Marker
                    key={animal.id}
                    coordinate={{
                      latitude: region.latitude,
                      longitude: region.longitude,
                    }}
                    title={animal.address.street}
                  />
                </MapView>
              </View>
            </View>
            <Divider style={GlobalTheme.divider} />
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text>OBSERVAÇÕES ADCIONAIS</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                {animal.observation}
              </Text>
            </View>
            <Button
              title="ENCONTROU ESSE ANIMAL?"
              onPress={() => setOwnerModal(true)}
            />
          </View>
        </View>
        <OwnerInfoModal
          visible={ownerModal}
          openModal={setOwnerModal}
          user={animal.user}
        />
      </ThemeProvider>
    </Modal>
  );
}
