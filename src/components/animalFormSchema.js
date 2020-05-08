import * as yup from 'yup';

function animalFormSchema({checkedEye, checkedFur}) {
  return yup.object({
    name: yup
      .string()
      .required()
      .min(2),
    address: yup
      .string()
      .required()
      .min(8),
    text: yup
      .string()
      .required()
      .min(2),
    number: yup
      .string()
      .required()
      .min(1)
      .test('is-numb-1-5', 'Preencha um número válido', val => {
        return parseInt(val) > 0;
      }),
    eye_left: yup
      .string()
      .required()
      .min(2),
    eye_right: !checkedEye ? undefined : yup.string().min(2),
    primary_fur: yup
      .string()
      .required()
      .min(2),
    secundary_fur: !checkedFur
      ? undefined
      : yup
          .string()
          .required()
          .min(2),
    // observation: !yup.string().max(30),
  });
}

export default animalFormSchema;
