exports.shorthands = undefined;

exports.up = (pgm) => {
	pgm.createTable('comments', {
		id: {
			type: 'serial',
			primaryKey: true,
		},
		userId: {
			type: 'integer',
			notNull: true,
			references: '"users"'
		},
		postId: {
			type: 'integer',
			notNull: true,
			references: '"posts"'
		},
		comment: {
			type: 'text'
		}
	})
};

exports.down = (pgm) => {

};
