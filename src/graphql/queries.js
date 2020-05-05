/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAddress = /* GraphQL */ `
  query GetAddress($id: ID!) {
    getAddress(id: $id) {
      id
      extended
      lat
      lon
      user {
        id
        birthdate
        email
        family_name
        given_name
        phone_number
      }
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
        extended
        lat
        lon
      }
      nextToken
    }
  }
`;
export const getAnimal = /* GraphQL */ `
  query GetAnimal($id: ID!) {
    getAnimal(id: $id) {
      id
      address {
        id
        extended
        lat
        lon
      }
      user {
        id
        birthdate
        email
        family_name
        given_name
        phone_number
      }
      breed
      eye_right
      eye_left
      name
      number
      observation
      photoURL
      primary_fur
      secundary_fur
      specie
      status
      text
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
        breed
        eye_right
        eye_left
        name
        number
        observation
        photoURL
        primary_fur
        secundary_fur
        specie
        status
        text
      }
      nextToken
    }
  }
`;
export const getData = /* GraphQL */ `
  query GetData($id: ID!) {
    getData(id: $id) {
      foundCats
      foundDogs
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
        owner
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      addresses {
        nextToken
      }
      animals {
        nextToken
      }
      birthdate
      email
      family_name
      given_name
      phone_number
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
        birthdate
        email
        family_name
        given_name
        phone_number
      }
      nextToken
    }
  }
`;
