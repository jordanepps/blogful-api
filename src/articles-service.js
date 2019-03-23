const ArticlesService = {
	getAllArticles(knex) {
		return knex('blogful_articles').select('*');
	},
	getById(knex, id) {
		return knex('blogful_articles')
			.select('*')
			.where({ id })
			.first();
	},
	insertArticle(knex, newArticle) {
		return knex('blogful_articles')
			.insert(newArticle)
			.returning('*')
			.then(rows => {
				return rows[0];
			});
	},
	updateArticle(knex, id, newArticleFields) {
		return knex('blogful_articles')
			.where({ id })
			.update(newArticleFields);
	},
	deleteArticle(knex, id) {
		return knex('blogful_articles')
			.where({ id })
			.delete();
	}
};

module.exports = ArticlesService;
