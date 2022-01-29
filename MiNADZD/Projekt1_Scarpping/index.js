if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const axios = require('axios');
const { MongoClient } = require('mongodb');
const { USERNAME, PASSWORD } = process.env;

if (!USERNAME || !PASSWORD) {
    throw new Error('No credentials provided. Please update .env file');
}

const local_uri = 'mongodb://localhost:27017';
const atlas_uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.mmpd9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const baseApiUrl = 'https://api.nobelprize.org/2.1/';
const laureatesName = 'laureates';
const nobelPrizesName = 'nobelPrizes';
const statsName = 'stats';

const local_client = new MongoClient(local_uri);
const atlas_client = new MongoClient(atlas_uri);

async function updateCollection(name, call, client) {
  console.log('Started fetching data...');
  const { data } = await call;
  console.log('Finished fetching data.');

  const database = client.db('nobel');
  const collection = database.collection(name);
  await collection.deleteMany();

  console.log('Started inserting records...');
  const result = await collection.insertMany(data[name]);
  console.log(`Finished. Inserted ${data[name].length} records to collection ${name}.`);
}

async function updateStatsCollection(sourceClient, destinationClient) {
  const source_database = sourceClient.db('nobel');
  const laureates = source_database.collection(laureatesName);
  const numberOfMen = await laureates.find({ gender: 'male' }).count();
  
  const destination_database = destinationClient.db('nobel');
  const stats = destination_database.collection(statsName);
  await stats.deleteMany();
  await stats.insertOne({ name: 'Male count', value: numberOfMen });
}

async function run() {
  try {
    await local_client.connect();
    console.log('Connected successfully to local db');
    await atlas_client.connect();
    console.log('Connected successfully to atlas db');

    await updateCollection(laureatesName, axios.get(`${baseApiUrl}${laureatesName}`, {
      params: {
        limit: 968
      }
    }), local_client);

    await updateCollection(nobelPrizesName, axios.get(`${baseApiUrl}${nobelPrizesName}`, {
      params: {
        limit: 658
      }
    }), local_client);

    await updateCollection(laureatesName, axios.get(`${baseApiUrl}${laureatesName}`, {
      params: {
        limit: 968
      }
    }), atlas_client);

    await updateCollection(nobelPrizesName, axios.get(`${baseApiUrl}${nobelPrizesName}`, {
      params: {
        limit: 658
      }
    }), atlas_client);

    await updateStatsCollection(local_client, atlas_client);
  } finally {
    await local_client.close();
    await atlas_client.close();
  }
}

run().catch(console.dir);
