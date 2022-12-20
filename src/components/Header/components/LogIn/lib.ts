import * as Yup from 'yup';

export const authFormSchema = Yup.object().shape({
  email: Yup.string()
    .email('Невалидная почта')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(5, 'Минимум 5 символа')
    .max(40, 'Не больше 40 символов')
    .required('Обязательное поле'),
});

export const registerFormSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Минимум 2 символа')
    .max(50, 'Не больше 50 символов')
    .required('Обязательное поле'),
  email: Yup.string().email('Невалидная почта').required('Обязательное поле'),
  password: Yup.string()
    .min(8, 'Минимум 8 символа')
    .max(40, 'Не больше 40 символов')
    .required('Обязательное поле'),
});
