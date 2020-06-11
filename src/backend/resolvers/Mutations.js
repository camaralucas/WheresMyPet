import {API, graphqlOperation} from 'aws-amplify';
import * as mutations from '../../graphql/mutations';

export default function Mutations() {
  function CreateUserAddress(address) {
    return API.graphql(
      graphqlOperation(mutations.createAddress, {input: address}),
    );
  }

  return {CreateUserAddress};
}
