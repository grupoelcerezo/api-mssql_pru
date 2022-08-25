const config = {
  
   user: 'user',
   password: 'Cerezo.2022',
   database: 'GAECTI_PRU',
   server: '192.168.1.200',
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
