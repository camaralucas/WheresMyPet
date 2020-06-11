import {API, graphqlOperation} from 'aws-amplify';
import * as queries from '../../graphql/queries';

export default function Queries() {
  function getUserAddresses() {
    try {
      return API.graphql(graphqlOperation(queries.listAddresss));
    } catch {
      Alert.alert('ERRO', 'Não foi possível obter os endereços cadastrados');
    }
  }

  return {getUserAddresses};
}
