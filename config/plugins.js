module.exports = ({ env }) => ({
  email: {
    provider : 'gmail-oauth2',
      providerOptions :  {
        username: env('DEFAULT_EMAIL',''),
      clientId: env('CLIENT_ID',''),
      clientSecret: env('CLIENT_SECRET',''),
      refreshToken: env('REFRESH_TOKEN',''),
      accessToken: env('ACCESS_TOKEN','')
      },
      settings :{
        nodemailer_default_from : env('DEFAULT_EMAIL',''),
        nodemailer_default_replyto: env('DEFAULT_EMAIL','')
      }
    }

    
  
});