import {API, graphqlOperation} from 'aws-amplify';
import * as queries from '../../graphql/queries';

export default function Queries() {
  function GetUserAddresses(sub) {
    return API.graphql(graphqlOperation(queries.getUserAddresses, {id: sub}));
  }

  function GetUserAnimalsIds(id) {
    return API.graphql(graphqlOperation(queries.getUserAnimalsIds, {id: id}));
  }

  function GetAddressInfo(id) {
    return API.graphql(graphqlOperation(queries.getAddressInfo, {id: id}));
  }

  function ListAllAnimals(filter) {
    return API.graphql(
      graphqlOperation(queries.listAllAnimals, {filter: filter}),
    );
  }

  return {
    GetUserAddresses,
    GetUserAnimalsIds,
    GetAddressInfo,
    ListAllAnimals,
  };
}
