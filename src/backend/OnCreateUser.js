import {onCreateTodo} from './graphql/subscriptions';

// Subscribe to creation of Todo
const subscription = API.graphql(graphqlOperation(onCreateTodo)).subscribe({
  next: todoData => {
    console.log(todoData);
    // Do something with the data
  },
});

// Stop receiving data updates from the subscription
subscription.unsubscribe();
