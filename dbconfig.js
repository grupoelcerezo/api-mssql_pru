const config = {
  
   user: 'gaecWeb',
   password: 'Cerezo.2019',
   database: 'GAECTI',
   server: '18.190.98.83',
   pool: {
     max: 10,
     min: 0,
     idleTimeoutMillis: 30000
   },
   options: {
     encrypt: false, // for azure
     trustServerCertificate: false // change to true for local dev / self-signed certs
   }
}

module.exports = config;