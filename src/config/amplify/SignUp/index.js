const amplifySignUpConfig = {
  hideAllDefaults: true,
  signUpFields: [
    {
      label: 'Name',
      key: 'given_name',
      required: true,
      displayOrder: 1,
      type: 'string',
      placeholder: 'Nome',
    },
    {
      label: 'Surname',
      key: 'family_name',
      required: true,
      displayOrder: 2,
      type: 'string',
      placeholder: 'Sobrenome',
    },
    {
      label: 'Birthdate',
      key: 'birthdate',
      required: true,
      displayOrder: 4,
      type: 'string',
      placeholder: 'Data de aniversário',
    },
    {
      label: 'Email',
      key: 'username',
      required: true,
      displayOrder: 5,
      type: 'string',
      placeholder: 'Email',
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 6,
      type: 'password',
      placeholder: 'Senha',
    },
  ],
};

export default amplifySignUpConfig;
