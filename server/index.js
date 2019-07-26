const express = require('express')
const massive = require('massive')
const users = require('./controllers/users.js')
const posts = require('./controllers/posts.js')
const comments = require('./controllers/comments.js')

massive({
	host: 'localhost',
	port: 5432,
	database: 'node3',
	user: 'postgres',
	password: 'node3db'
}).then(db => {
	const app = express()

	app.set('db', db)
	app.use(express.json())

	app.post('/api/users', users.create)
	app.get('/api/users', users.list)
	app.get('/api/users:id', users.getById)
	app.get('/api/users:id/profile', users.getProfile)

	app.post('/api/posts', posts.create)
	app.get('/api/posts/:id', posts.view)
	app.get('/api/posts/:userId/posts', posts.list)
	app.put('/api/posts/:id', posts.update)

	app.post('/api/comments', comments.create)
	app.put('/api/comments/:id', comments.update)
	
	const PORT = 3001
	app.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`)
	})
})