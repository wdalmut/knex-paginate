# Paginator for Knex

Add paginator to knex

```
const knex = require('knex')(require('../knexfile').test)
const paginator = require('@wdalmut/knex-paginator')
paginator(knex)
```

Use paginator as latest element of a query

```
knex('test')
    .where('something', '=', 'test')
    .paginate({ limit: 5, page: 1 })
    .then(results => {
        /**
         * { totalCount, lastPage, limit, page, offset, to, results }
         */
    })
```

## Create test database

```
npm run db:create
```

## Migration

```
npm run db:migrate
```

## Run test cases

```
npm test
```

# Knex extends

Here the base docs: https://github.com/tgriesser/knex/issues/1158

