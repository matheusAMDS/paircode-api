import { Job } from 'bull'

import Mail from '@app/lib/mail'

interface RegistrationMailParams {
  name: string;
  email: string;
}

export default {
  key: 'RegistrationMail',
  handle: async ({ data }: Job<RegistrationMailParams>) => {
    const { name, email } = data

    await Mail.sendMail({
      from: 'Matheus <contato@paircode.com>',
      to: `${name} <${email}>`,
      subject: 'Bem-vindo ao PairCode',
      html: '<h1>Bem-vindo ao PairCode</h1>'
    })
  }
}