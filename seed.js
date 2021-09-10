import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fetch from 'node-fetch';
import CovidPost from './models/covidPost.js';

dotenv.config({ path: path.join('.env') });
const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose
	.connect(CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('mongodb connection success'))
	.catch((error) => console.log(error));

const url = process.env.API_URL;
const options = {
	method: 'GET',
	url: 'https://covid-193.p.rapidapi.com/statistics',
	headers: {
		'x-rapidapi-host': 'covid-193.p.rapidapi.com',
		'x-rapidapi-key': ["PUT YOUR OWN API KEY"],
	},
};
let resultData;
let saveCounter = 0;

const seedWithoutDisconnect = async () => {
	try {
		const response = await fetch(url, options);
		const json = await response.json();
		resultData = Object.assign({}, json);
		let dataArray = [...resultData.response];

		for (let i = 0; i < dataArray.length; i++) {
			let covidPost = new CovidPost({
				_id: i,
				continent: dataArray[i].continent,
				country: dataArray[i].country,
				population: dataArray[i].population,
				cases: JSON.stringify(dataArray[i].cases),
				deaths: JSON.stringify(dataArray[i].deaths),
				tests: JSON.stringify(dataArray[i].tests),
				day: dataArray[i].day,
				time: dataArray[i].time,
			});

			covidPost.save(() => {
				saveCounter++;
				//console.log(`saved covidPost number ${i}, ${covidPost}`);
				if (saveCounter + 1 === dataArray.length) {
					console.log(`saved ${dataArray.length} records`);
				}
			});
		}
	} catch (error) {
		console.log(error);
	}
};
seedWithoutDisconnect();
export default seedWithoutDisconnect;
