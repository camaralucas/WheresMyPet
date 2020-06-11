import * as yup from 'yup';

export default function CollarFormSchema({
  checkedCollarText,
  checkedCollarNumber,
}) {
  const rules = {};

  if (checkedCollarText)
    rules.text = yup
      .string()
      .required('campo requerido')
      .min(2, 'mínimo de 2 caracteres')
      .max(10, 'máximo de 10 caracteres');

  if (checkedCollarNumber)
    rules.number = yup
      .string()
      .required('campo requerido')
      .min(1, 'mínimo de 1 caractere')
      .max(10, 'máximo de 10 caracteres')
      .test('is-numb-1-5', 'É valido números maiores que 0', val => {
        return parseInt(val) > 0;
      });

  return yup.object({
    name: yup
      .string()
      .required('campo requerido')
      .min(2, 'mínimo de 2 caracteres')
      .max(15, 'máximo de 15 caracteres'),
    ...rules,
  });
}
