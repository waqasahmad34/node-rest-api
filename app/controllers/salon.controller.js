import BaseController from './base.controller';
import Salon from '../models/salon';

class SalonController extends BaseController {
	whitelist = [ 'service', 'item', 'price' ];

	insert = async (req, res, next) => {
		const params = this.filterParams(req.body, this.whitelist);
		let salon = new Salon({
			...params
		});
		try {
			const savedSalon = await salon.save();
			return res.status(201).json({ message: 'success', salon: savedSalon });
		} catch (err) {
			err.status = 400;
			next(err);
		}
	};

	update = async (req, res, next) => {
		const params = this.filterParams(req.body, this.whitelist);
		const salonObj = {
			...params
		};
		try {
			const updatedSalon = await Salon.findByIdAndUpdate(
				{ _id: req.params.salonId },
				{ $set: salonObj },
				{ new: true }
			);
			if (!updatedSalon) {
				return res.status(400).json({ message: 'Salon Not Found!' });
			}
			return res.status(200).json({ message: 'salon updated successfully!', salon: updatedSalon });
		} catch (err) {
			if (err.kind == 'ObjectId') {
				return res.status(400).json({ message: 'Salon Not Found!' });
			}
			next(err);
		}
	};

	delete = async (req, res, next) => {
		try {
			const deletedSalon = await Salon.findByIdAndRemove({ _id: req.body.salonId });
			if (!deletedSalon) {
				return res.status(400).json({ message: 'Salon Not Found!' });
			}
			return res.status(200).json({ message: 'salon deleted successfully!', salon: deletedSalon });
		} catch (err) {
			next(err);
		}
	};

	getAll = async (req, res, next) => {
		try {
			const salons = await Salon.find({});
			if (!salons) {
				return res.status(400).json({ message: 'Salon Not Found!' });
			}
			return res.status(200).json({ message: 'success', salon: salons });
		} catch (err) {
			next(err);
		}
	};
}

export default new SalonController();
