/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAddress = /* GraphQL */ `
  mutation CreateAddress(
    $input: CreateAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    createAddress(input: $input, condition: $condition) {
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
export const updateAddress = /* GraphQL */ `
  mutation UpdateAddress(
    $input: UpdateAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    updateAddress(input: $input, condition: $condition) {
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
export const deleteAddress = /* GraphQL */ `
  mutation DeleteAddress(
    $input: DeleteAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    deleteAddress(input: $input, condition: $condition) {
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
export const createAnimal = /* GraphQL */ `
  mutation CreateAnimal(
    $input: CreateAnimalInput!
    $condition: ModelAnimalConditionInput
  ) {
    createAnimal(input: $input, condition: $condition) {
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
export const updateAnimal = /* GraphQL */ `
  mutation UpdateAnimal(
    $input: UpdateAnimalInput!
    $condition: ModelAnimalConditionInput
  ) {
    updateAnimal(input: $input, condition: $condition) {
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
export const deleteAnimal = /* GraphQL */ `
  mutation DeleteAnimal(
    $input: DeleteAnimalInput!
    $condition: ModelAnimalConditionInput
  ) {
    deleteAnimal(input: $input, condition: $condition) {
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
export const createData = /* GraphQL */ `
  mutation CreateData(
    $input: CreateDataInput!
    $condition: ModelDataConditionInput
  ) {
    createData(input: $input, condition: $condition) {
      foundCats
      foundDogs
      owner
    }
  }
`;
export const updateData = /* GraphQL */ `
  mutation UpdateData(
    $input: UpdateDataInput!
    $condition: ModelDataConditionInput
  ) {
    updateData(input: $input, condition: $condition) {
      foundCats
      foundDogs
      owner
    }
  }
`;
export const deleteData = /* GraphQL */ `
  mutation DeleteData(
    $input: DeleteDataInput!
    $condition: ModelDataConditionInput
  ) {
    deleteData(input: $input, condition: $condition) {
      foundCats
      foundDogs
      owner
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
