import {createUser, updateUser, deleteUser} from '../graphql/mutations';

const todo = {name: 'My first todo', description: 'Hello world!'};

/* create a todo */
await API.graphql(graphqlOperation(createUser, {input: todo}));

/* update a todo */
await API.graphql(
  graphqlOperation(updateUser, {
    input: {id: todoId, name: 'Updated todo info'},
  }),
);

/* delete a todo */
await API.graphql(graphqlOperation(deleteUser, {input: {id: todoId}}));
