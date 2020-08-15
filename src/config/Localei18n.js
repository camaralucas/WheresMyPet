import {NativeModules, Platform} from 'react-native';
import {I18n} from '@aws-amplify/core';

let langRegionLocale = 'en_US';

// If we have an Android phone
if (Platform.OS === 'android') {
  langRegionLocale = NativeModules.I18nManager.localeIdentifier || '';
} else if (Platform.OS === 'ios') {
  langRegionLocale = NativeModules.SettingsManager.settings.AppleLocale || '';
}

const authScreenLabels = {
  en: {
    // Login
    'Sign in to your account': 'Entrar com sua conta',
    Username: 'E-mail',
    'Enter your username': 'Digite seu e-mail',
    Password: 'Senha',
    'Enter your password': 'Digite sua senha',
    'Sign In': 'Entrar',
    'Forgot Password': 'Esqueceu a senha?',
    'Sign Up': 'Criar conta',
    // Register
    'Create a new account': 'Criar uma nova conta',
    Name: 'Primeiro nome',
    Surname: 'Sobrenome',
    Birthdate: 'Data de aniversário',
    Email: 'E-mail',
    'Confirm a Code': 'Confirmar um código',
    // Forgot pass
    Send: 'Enviar',
    'Back to Sign In': 'Voltar para o Login',
    // Confirm code
    'Confirm Sign Up': 'Confirmar cadastro',
    'Confirmation Code': 'Código de confirmação',
    'Enter your confirmation code': 'Digite seu código de confirmação',
    Confirm: 'Confirmar',
    'Resend code': 'Reenviar código',

    // Botton
    'Please Sign In / Sign Up': ' ',
  },
  ru: {
    'Sign Up': 'Создать аккаунт',
    'Sign In Account': 'Войдите в систему',
    Password: 'Пароль',
    'Please Sign In / Sign Up': 'Войти / Создать аккаунт',
    'Resend code': 'Еще отправить код',

    'Sign Out': 'Выход',
  },
};

// "en_US" -> "en", "es_CL" -> "es", etc
const languageLocale = langRegionLocale.substring(0, 2);
I18n.setLanguage(languageLocale);
I18n.putVocabularies(authScreenLabels);

const Localei18nConfig = () => null;

export default {Localei18nConfig};
