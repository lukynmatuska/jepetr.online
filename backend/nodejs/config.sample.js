module.exports = {
  // location
  protocol: 'https',
  url: 'https://jepetr.online/',
  port: 3000,

  // database credentials
  db: {
    port: 27017,
    host: 'localhost',
    name: 'jepetr',
    user: 'jepetr',
    password: 'password',
    options: ''
  },

  cors_options: {
    credentials: true,
    origin: ['https://jepetr.online']
  },

  cron: {
    ping: {
      host: 'petr.jepetr.online',
      config: {
        timeout: 10,
        extra: ['-c', '5'],
      },
    },
    timer: '* * * * * *',
    timeZone: 'Europe/Prague',
  },

  nodemailer: {
    sender: 'Firstname Lastname <firstname.lastname@example.com>',
    settings: {
      host: 'smtp.example.com',
      port: 465,
      secure: true,
      auth: {
        user: 'user@example.com',
        pass: 'pass'
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
      }
    }
  },

  contactPersonEmail: 'bugs@jepetr.online',
}
