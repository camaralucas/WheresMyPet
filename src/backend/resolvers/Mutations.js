import {API, graphqlOperation} from 'aws-amplify';
import * as mutations from '../../graphql/mutations';

export default function Mutations() {
  function CreateAddress(address) {
    return API.graphql(
      graphqlOperation(mutations.createUserAddress, {input: address}),
    );
  }

  async function CreateAnimal(animal) {
    try {
      const {data} = await API.graphql(
        graphqlOperation(mutations.createUserAnimal, {input: animal}),
      );
      return {animalId: data.createAnimal.id};
    } catch (e) {
      throw e;
    }
  }

  async function UpdateAnimalBreed(animalBreed) {
    try {
      const {data} = await API.graphql(
        graphqlOperation(mutations.updateAnimalBreed, {input: animalBreed}),
      );
      return console.log('data → ', data);
    } catch (e) {
      throw e;
    }
  }

  return {CreateAddress, CreateAnimal, UpdateAnimalBreed};
}
