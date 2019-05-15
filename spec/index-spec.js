/* global beforeEach describe it expect */
/* eslint no-undef: 'error' */
const knex = require('knex')(require('../knexfile').test)
const paginator = require('../src')
paginator(knex)

describe('Paginate', () => {
  beforeEach((done) => knex.seed.run().then(done).catch(done))

  it('should paginate by one', (done) => {
    knex('test')
      .orderBy('test')
      .paginate({ limit: 1, page: 1 })
      .then(data => {
        expect(data.totalCount).toBe(5)
        expect(data.limit).toBe(1)
        expect(data.offset).toBe(0)
        expect(data.lastPage).toBe(5)
        expect(data.page).toBe(1)
        expect(data.results.length).toBe(1)
        expect(data.results[0].test).toBe('001')
        done()
      })
  })

  it('should be at page 2 paginating by one', (done) => {
    knex('test')
      .orderBy('test')
      .paginate({ limit: 1, page: 2 })
      .then(data => {
        expect(data.totalCount).toBe(5)
        expect(data.limit).toBe(1)
        expect(data.offset).toBe(1)
        expect(data.lastPage).toBe(5)
        expect(data.page).toBe(2)
        expect(data.results.length).toBe(1)
        expect(data.results[0].test).toBe('002')
        done()
      })
  })

  it('should get a big page', (done) => {
    knex('test')
      .orderBy('test')
      .paginate({ limit: 20, page: 1 })
      .then(data => {
        expect(data.totalCount).toBe(5)
        expect(data.limit).toBe(20)
        expect(data.offset).toBe(0)
        expect(data.lastPage).toBe(1)
        expect(data.page).toBe(1)
        expect(data.results.length).toBe(5)
        expect(data.results[0].test).toBe('001')
        expect(data.results[1].test).toBe('002')
        expect(data.results[2].test).toBe('003')
        expect(data.results[3].test).toBe('004')
        expect(data.results[4].test).toBe('005')
        done()
      })
  })

  it('should get empty when go beyond limits ', (done) => {
    knex('test')
      .orderBy('test')
      .paginate({ limit: 1, page: 6 })
      .then(data => {
        expect(data.totalCount).toBe(5)
        expect(data.limit).toBe(1)
        expect(data.offset).toBe(5)
        expect(data.lastPage).toBe(5)
        expect(data.page).toBe(6)
        expect(data.results.length).toBe(0)
        done()
      })
  })

  it('should paginate with default values', (done) => {
    knex('test')
      .orderBy('test')
      .paginate({}) // no params
      .then(data => {
        expect(data.totalCount).toBe(5)
        expect(data.limit).toBe(25)
        expect(data.offset).toBe(0)
        expect(data.lastPage).toBe(1)
        expect(data.page).toBe(1)
        expect(data.results.length).toBe(5)
        expect(data.results[0].test).toBe('001')
        expect(data.results[1].test).toBe('002')
        expect(data.results[2].test).toBe('003')
        expect(data.results[3].test).toBe('004')
        expect(data.results[4].test).toBe('005')
        done()
      })
  })
})
