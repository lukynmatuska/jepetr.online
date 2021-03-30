/**
 * The entry point of the Node.js app
 * @brief The entry point for bigger sites
 * @author Lukas Matuska
 * @version 1.0
 * @license Beerware
 */

// Configuration global variable
try {
  global.CONFIG = require('./config')
} catch (error) {
  global.CONFIG = {
    protocol: process.env.PROTOCOL,
    url: process.env.URL,
    port: process.env.PORT,

    cors_options: JSON.parse(process.env.CORS_OPTIONS) || {},

    nodemailer: {
      sender: process.env.SMTP_SENDER || `Is Peter online? <${process.env.SMTP_USER}>`,
      settings: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE, // upgrade later with STARTTLS
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false
        }
      }
    },

    contactPersonEmail: process.env.CONTACT_PERSON_EMAIL || 'bugs@jepetr.online',
  }
}

// Load the server lib (Express)
const express = require('express')
const app = express()

// load some libraries
const moment = require('./libs/moment')
const path = require('path')
const bodyparser = require('body-parser')
const cors = require('cors')
console.log(`CORS_OPTIONS: ${JSON.stringify(global.CONFIG.cors_options)}`)
app.use(cors(global.CONFIG.cors_options))

// set extended urlencoded to true (post)
app.use(bodyparser.json({ limit: '50mb' }))
app.use(bodyparser.urlencoded({ extended: true }))
app.set('trust proxy', true)

/**
 * Routers
*/
const partials = require('./routes/partials')
app.use('/', partials.router)

const rootRouter = require('./routes/root')
app.use('/', rootRouter)

// run the server
app.listen(global.CONFIG.port, () => {
  console.log(`${moment().format('YYYY-MM-DD HH:mm:ss')} CORS-enabled web app listening on port ${global.CONFIG.port} (Is Peter online? Node.js API)`)
})
