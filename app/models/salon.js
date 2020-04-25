import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const salonSchema = new Schema({
	service: {
		type: String,
		required: [ true, 'Service is required' ]
	},
	item: {
		type: String,
		required: [ true, 'Item  is required' ]
	},
	price: {
		type: String,
		required: [ true, 'Price  is required' ]
	},
	createdAt: {
		type: Date,
		default: new Date()
	}
});

const Salon = mongoose.model('salon', salonSchema);
export default Salon;
