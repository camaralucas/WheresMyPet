import * as yup from 'yup';

export default function CollarFormSchema({checkedCollarText}) {
  const rules = {};

  if (checkedCollarText) {
    rules.collarText = yup
      .string()
      .required('campo requerido')
      .min(2, 'mínimo de 1 caractere')
      .max(10, 'máximo de 10 caracteres');
  }

  return yup.object({
    name: yup
      .string()
      .required('campo requerido')
      .min(2, 'mínimo de 2 caracteres')
      .max(15, 'máximo de 15 caracteres'),
    ...rules,
  });
}
