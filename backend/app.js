const express = require('express');
const app = express();
const port = 3001;



const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const fs = require('fs');
const path = require('path');

process.env.GRPC_SSL_CIPHER_SUITES = 'HIGH+ECDSA';


const loaderOptions = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
const packageDefinition = protoLoader.loadSync('lightning.proto', loaderOptions);



const macaroonPath = '/home/alanac7/.polar/networks/1/volumes/lnd/bob/data/chain/bitcoin/regtest/admin.macaroon';
const macaroon = fs.readFileSync(macaroonPath).toString('hex');


const metadata = new grpc.Metadata();
metadata.add('macaroon', macaroon);
const macaroonCreds = grpc.credentials.createFromMetadataGenerator((_args, callback) => {
  callback(null, metadata);
});

const lndCertPath = '/home/alanac7/.polar/networks/1/volumes/lnd/bob/tls.cert';
const lndCert = fs.readFileSync(lndCertPath);
const sslCreds = grpc.credentials.createSsl(lndCert);
const credentials = grpc.credentials.combineChannelCredentials(sslCreds, macaroonCreds);


const lnrpcDescriptor = grpc.loadPackageDefinition(packageDefinition);
const lnrpc = lnrpcDescriptor.lnrpc;
const client = new lnrpc.Lightning('127.0.0.1:10002', credentials);



app.get('/', (_req, res) => {
  res.send('Connected successfully to the node!');
});

app.get('/getinfo', (_req, res) => {
  client.getInfo({}, (err, response) => {
    if (err) {
      console.log('Error: ' + err);
      res.status(500).json({ error: 'An error occurred while fetching information.' });
    } else {
      res.json(response);
    }
  });
});

app.get('/generate-invoice/:source/:price', (req, res) => {
  const request = {
    value: req.params.price,
    memo: req.params.source,
  };
  client.addInvoice(request, (err, response) => {
    if (err) {
      console.log('Error: ' + err);
      res.status(500).json({ error: 'An error occurred while generating the invoice.' });
    } else {
      res.json(response);
    }
  });
});


app.get("/check-invoice-steam/:payment_request", function (req, res) {
  let dataReturn = {} 
  let stream = client.subscribeInvoices({}) 
  stream.on('data', (data) => {
    console.log("### DATA")
    console.log(data)
    
    if (data.settled === true && data.payment_request === req.params['payment_request']) { 
      dataReturn = data 
      stream.destroy()
    }
  });

  stream.on('close', () =>  {
    console.log("### CLOSE")
    res.json(dataReturn)
  });
});
app.get('/file/:source', (req, res, next) => {
  const options = {
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
    },
  };

  const fileName = path.join(__dirname, 'static', req.params.source);
  res.download(fileName, req.params.source, options, (err) => {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
