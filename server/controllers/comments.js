module.exports = {
	create: (req, res) => {
		const db = req.app.get('db')

		const { userId, postId, comment } = req.body

		db.comments
			.save({
				userId,
				postId,
				comment,
			})
			.then(comment => res.status(201).json(comment))
			.catch(err => {
				console.error(err)
				res.status(500).end()
			})
	},
	update: (req, res) => {
		const db = req.app.get('db')
		const { comment } = req.body

		db.comments
			.update({
				id: req.params.id
			},{
				comment,
			})
			.then(edit => res.status(201).json(edit))
			.catch(err => {
				res.status(500).end()
			})
	}
}