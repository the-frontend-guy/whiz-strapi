"use strict";
const nodemailer = require("nodemailer")

module.exports = {
  init: (providerOptions = {}, settings = {}) => {

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        type: "OAuth2",
        user: providerOptions.username,
        clientId: providerOptions.clientId,
        clientSecret: providerOptions.clientSecret,
        refreshToken: providerOptions.refreshToken,
        accessToken: providerOptions.accessToken,
        expires: 1484314697598
      },
    });
    return {
      send: async options => {
        return new Promise((resolve, reject) => {
          options.from = options.from || settings.nodemailer_default_from;
          options.replyTo = options.replyTo || settings.nodemailer_default_replyto;
          options.text = options.text || options.html;
          options.html = options.html || options.text;

          let msg = {
            from: options.from,
            to: options.to,
            replyTo: options.replyTo,
            subject: options.subject,
            text: options.text,
            html: options.html
          };

          transporter
          .sendMail(msg)
          .then(resolve)
          .catch(error => reject(error))
        })
      },
    };
  },
};