import * as yup from 'yup';

export default function RegisterAddressFormSchema() {
  return yup.object({
    cep: yup
      .string()
      .required('campo requerido')
      .min(8, 'mínimo de 8 caracteres')
      .max(10, 'máximo de 9 caracteres')
      .test('is-numb-1-5', 'Somente números são permitidos', val => {
        return parseInt(val) > 0;
      }),
  });
}
