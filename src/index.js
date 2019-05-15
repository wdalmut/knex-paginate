const KnexQueryBuilder = require('knex/lib/query/builder')

module.exports = function (knex) {
  KnexQueryBuilder.prototype.paginate = function ({ limit, page }) {
    if (!limit) limit = 25
    if (!page) page = 1

    const offset = (page - 1) * limit

    let queries = [
      this.clone().clearSelect().clearOrder().count('* as total').first(),
      this.offset(offset).limit(limit),
    ]

    return Promise.all(queries).then(([count, result]) => {
      return {
        totalCount: count.total,
        lastPage: Math.ceil(count.total / limit),
        limit,
        page,
        offset,
        to: offset + result.length,
        results: result,
      }
    })
  }

  knex.queryBuilder = function queryBuilder () {
    return new KnexQueryBuilder(knex.client)
  }
}
