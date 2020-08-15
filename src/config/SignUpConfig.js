const SignUpConfig = {
  hideAllDefaults: true,
  signUpFields: [
    {
      label: 'Name',
      key: 'given_name',
      required: true,
      displayOrder: 1,
      type: 'string',
      placeholder: 'Digite seu primeiro nome',
    },
    {
      label: 'Surname',
      key: 'family_name',
      required: true,
      displayOrder: 2,
      type: 'string',
      placeholder: 'Digite seu sobrenome',
    },
    {
      label: 'Birthdate',
      key: 'birthdate',
      required: true,
      displayOrder: 4,
      type: 'string',
      placeholder: 'Digite sua data de aniversário',
    },
    {
      label: 'Email',
      key: 'username',
      required: true,
      displayOrder: 5,
      type: 'string',
      placeholder: 'Digite seu e-mail',
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 6,
      type: 'password',
      placeholder: 'Digite uma senha',
    },
  ],
};

export default SignUpConfig;
