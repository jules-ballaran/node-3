module.exports = {
	create: (req, res) => {
		const db = req.app.get('db')

		const { userId, content } = req.body

		db.posts
			.save({
				userId,
				content,
			})
			.then(post => res.status(201).json(post))
			.catch(err => {
				console.error(err)
				res.status(500).end()
			})
	},
	view: (req, res) => {
		const db = req.app.get('db')
		const { comments } = req.query

		if(comments){
			db.posts
			.findOne(req.params.id)
			.then(post => {
				db.comments
					.find({postId: req.params.id})
					.then(comment => {
						post.comments = comment
						res.status(200).json(post)
					})
			})
			.catch(err => {
				res.status(500).end()
			})
		} else {
			db.posts
				.findOne(req.params.id)
				.then(post => res.status(200).json(post))
				.catch(err => {
					res.status(500).end()
				})
		}
	},
	list: (req, res) => {
		const db = req.app.get('db')
		db.posts
			.find(req.params.userId)
			.then(posts => res.status(200).json(posts))
			.catch(err => {
				res.status(500).end()
			})
	},
	update: (req, res) => {
		const db = req.app.get('db')
		const { content } = req.body

		db.posts
			.update({
				id: req.params.id
			},{
				content,
			})
			.then(post => res.status(201).json(post))
			.catch(err => {
				res.status(500).end()
			})
	}
}