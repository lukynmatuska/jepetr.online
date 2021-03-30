module.exports = {
    // location
    protocol: 'https',
    url: 'https://jepetr.online/',
    port: 3000,
    
    cors_options: {
      credentials: true,
      origin: ['https://jepetr.online']
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
  