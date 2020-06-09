/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncAddresses = /* GraphQL */ `
  query SyncAddresses(
    $filter: ModelAddressFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAddresses(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        cep
        city
        latitude
        longitude
        neighborhood
        street
        state
        user {
          id
          email
          family_name
          given_name
          phone_number
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getAddress = /* GraphQL */ `
  query GetAddress($id: ID!) {
    getAddress(id: $id) {
      id
      cep
      city
      latitude
      longitude
      neighborhood
      street
      state
      user {
        id
        addresses {
          nextToken
          startedAt
        }
        animals {
          nextToken
          startedAt
        }
        email
        family_name
        given_name
        phone_number
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listAddresss = /* GraphQL */ `
  query ListAddresss(
    $filter: ModelAddressFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAddresss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        cep
        city
        latitude
        longitude
        neighborhood
        street
        state
        user {
          id
          email
          family_name
          given_name
          phone_number
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncAnimals = /* GraphQL */ `
  query SyncAnimals(
    $filter: ModelAnimalFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAnimals(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        address {
          id
          cep
          city
          latitude
          longitude
          neighborhood
          street
          state
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        user {
          id
          email
          family_name
          given_name
          phone_number
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        breed
        eye_right
        eye_left
        name
        number
        observation
        photoKey
        photoURL
        primary_fur
        secundary_fur
        specie
        status
        text
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getAnimal = /* GraphQL */ `
  query GetAnimal($id: ID!) {
    getAnimal(id: $id) {
      id
      address {
        id
        cep
        city
        latitude
        longitude
        neighborhood
        street
        state
        user {
          id
          email
          family_name
          given_name
          phone_number
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      user {
        id
        addresses {
          nextToken
          startedAt
        }
        animals {
          nextToken
          startedAt
        }
        email
        family_name
        given_name
        phone_number
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      breed
      eye_right
      eye_left
      name
      number
      observation
      photoKey
      photoURL
      primary_fur
      secundary_fur
      specie
      status
      text
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listAnimals = /* GraphQL */ `
  query ListAnimals(
    $filter: ModelAnimalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnimals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        address {
          id
          cep
          city
          latitude
          longitude
          neighborhood
          street
          state
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        user {
          id
          email
          family_name
          given_name
          phone_number
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        breed
        eye_right
        eye_left
        name
        number
        observation
        photoKey
        photoURL
        primary_fur
        secundary_fur
        specie
        status
        text
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncData = /* GraphQL */ `
  query SyncData(
    $filter: ModelDataFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncData(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        foundCats
        foundDogs
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const getData = /* GraphQL */ `
  query GetData($id: ID!) {
    getData(id: $id) {
      foundCats
      foundDogs
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listDatas = /* GraphQL */ `
  query ListDatas(
    $filter: ModelDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDatas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        foundCats
        foundDogs
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        addresses {
          nextToken
          startedAt
        }
        animals {
          nextToken
          startedAt
        }
        email
        family_name
        given_name
        phone_number
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      addresses {
        items {
          id
          cep
          city
          latitude
          longitude
          neighborhood
          street
          state
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      animals {
        items {
          id
          breed
          eye_right
          eye_left
          name
          number
          observation
          photoKey
          photoURL
          primary_fur
          secundary_fur
          specie
          status
          text
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      email
      family_name
      given_name
      phone_number
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        addresses {
          nextToken
          startedAt
        }
        animals {
          nextToken
          startedAt
        }
        email
        family_name
        given_name
        phone_number
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
