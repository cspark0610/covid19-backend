import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const covidPostSchema = new Schema({
	_id: Number,
	continent: String,
	country: String,
	population: Number,
	cases: String,
	deaths: String,
	tests: String,
	day: String,
	time: String,
});

const CovidPost = mongoose.model('CovidPost', covidPostSchema);

export default CovidPost;
