module.exports = {
	create: (req, res) => {
		const db = req.app.get('db')

		const { email, password } = req.body

		db.users
			.insert({
				email,
				password,
				user_profiles: [
					{
						userId: undefined,
						about: null,
						thumbnail: null,
					}
				]
			},
			{
				deepInsert: true,
			})
			.then(user => res.status(201).json(user))
			.catch(err => {
				console.error(err)
			})
	},
	list: (req, res) => {
		const db = req.app.get('db')

		db.users
			.find()
			.then(users => res.status(200).json(users))
			.catch(err => {
				res.status(500).end()
			})
	},
	getById: (req, res) => {
		const db = req.app.get('db')

		db.users
			.findOne(req.params.id)
			.then(user => res.status(200).json(user))
			.catch(err => {
				res.status(500).end()
			})
	},
	getProfile: (req, res) => {
		const db = req.app.get('db')

		db.user_profiles
			.findOne({
				userId: req.params.id,
			})
			.then(profile => res.status(200).json(profile))
			.catch(err => {
				console.error(err)
				res.status(500).end()
			})
	}
}