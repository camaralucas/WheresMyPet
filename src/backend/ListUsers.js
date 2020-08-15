import {listUsers} from './graphql/queries';

const todos = await API.graphql(graphqlOperation(listUsers));
