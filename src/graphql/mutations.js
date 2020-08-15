/* eslint-disable */
// this is an auto generated file. This will be overwritten

// Customs
export const createUserAddress = /* GraphQL */ `
  mutation CreateAddress(
    $input: CreateAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    createAddress(input: $input, condition: $condition) {
      id
    }
  }
`;

export const createUserAnimal = /* GraphQL */ `
  mutation CreateAnimal(
    $input: CreateAnimalInput!
    $condition: ModelAnimalConditionInput
  ) {
    createAnimal(input: $input, condition: $condition) {
      id
    }
  }
`;

export const updateAnimalBreed = /* GraphQL */ `
  mutation UpdateAnimal(
    $input: UpdateAnimalInput!
    $condition: ModelAnimalConditionInput
  ) {
    updateAnimal(input: $input, condition: $condition) {
      id
    }
  }
`;

// Defaults
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
          collarColor
          collarText
          heterochromia
          name
          observation
          photoKey
          primary_fur
          secundary_fur
          specie
          status
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
          collarColor
          collarText
          heterochromia
          name
          observation
          photoKey
          primary_fur
          secundary_fur
          specie
          status
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
          collarColor
          collarText
          heterochromia
          name
          observation
          photoKey
          primary_fur
          secundary_fur
          specie
          status
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
export const createAddress = /* GraphQL */ `
  mutation CreateAddress(
    $input: CreateAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    createAddress(input: $input, condition: $condition) {
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
export const updateAddress = /* GraphQL */ `
  mutation UpdateAddress(
    $input: UpdateAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    updateAddress(input: $input, condition: $condition) {
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
export const deleteAddress = /* GraphQL */ `
  mutation DeleteAddress(
    $input: DeleteAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    deleteAddress(input: $input, condition: $condition) {
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
export const createAnimal = /* GraphQL */ `
  mutation CreateAnimal(
    $input: CreateAnimalInput!
    $condition: ModelAnimalConditionInput
  ) {
    createAnimal(input: $input, condition: $condition) {
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
      collarColor
      collarText
      heterochromia
      name
      observation
      photoKey
      primary_fur
      secundary_fur
      specie
      status
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
      collarColor
      collarText
      heterochromia
      name
      observation
      photoKey
      primary_fur
      secundary_fur
      specie
      status
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
      collarColor
      collarText
      heterochromia
      name
      observation
      photoKey
      primary_fur
      secundary_fur
      specie
      status
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createData = /* GraphQL */ `
  mutation CreateData(
    $input: CreateDataInput!
    $condition: ModelDataConditionInput
  ) {
    createData(input: $input, condition: $condition) {
      id
      cat
      dog
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateData = /* GraphQL */ `
  mutation UpdateData(
    $input: UpdateDataInput!
    $condition: ModelDataConditionInput
  ) {
    updateData(input: $input, condition: $condition) {
      id
      cat
      dog
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteData = /* GraphQL */ `
  mutation DeleteData(
    $input: DeleteDataInput!
    $condition: ModelDataConditionInput
  ) {
    deleteData(input: $input, condition: $condition) {
      id
      cat
      dog
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createStatistics = /* GraphQL */ `
  mutation CreateStatistics(
    $input: CreateStatisticsInput!
    $condition: ModelStatisticsConditionInput
  ) {
    createStatistics(input: $input, condition: $condition) {
      id
      dogs
      cats
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateStatistics = /* GraphQL */ `
  mutation UpdateStatistics(
    $input: UpdateStatisticsInput!
    $condition: ModelStatisticsConditionInput
  ) {
    updateStatistics(input: $input, condition: $condition) {
      id
      dogs
      cats
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteStatistics = /* GraphQL */ `
  mutation DeleteStatistics(
    $input: DeleteStatisticsInput!
    $condition: ModelStatisticsConditionInput
  ) {
    deleteStatistics(input: $input, condition: $condition) {
      id
      dogs
      cats
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
