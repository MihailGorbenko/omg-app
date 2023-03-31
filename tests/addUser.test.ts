import DB, { Database } from '../src/storage/database'
import { Express, response } from 'express'
import chai from 'chai'
import chai_http from 'chai-http'
import createDatabase from '../src/storage/createDatabase'
import createApp from '../src/app'
import JWT from 'jsonwebtoken'
import config from 'config'
import { addUserBody } from './testData'



const expect = chai.expect
let db: DB
let app: Express
let id: String
chai.use(chai_http)


describe('Testing route: POST /api/users/addUser', () => {
    before(async () => {
        db = await createDatabase()
        app = createApp(db)
        id = crypto.randomUUID().slice(0, 24).replace(/-/g, 'b')
    })
    describe('When passed correct User object', () => {
        describe('When user not exist', () => {
            let res: ChaiHttp.Response
            before((done) => {
                chai.request(app)
                    .post('/api/users/addUser')
                    .send({
                        user: {
                            _id: id,
                            name: 'miha',
                            lastName: ' ',
                            email: 'gomihagle@gmail.com',
                            avatar_url: 'https://omgapp.pp.ua/api/storage/default.png',
                            avatar_min_url: 'https://omgapp.pp.ua/api/storage/default_min.png'
                        }
                    })
                    .end((err, response) => {
                        res = response
                        done()
                    })
            })

            it('should respond with status code 200', (done) => {
                expect(res).to.have.status(200)
                done()
            })
            it('should respond json with {userId} field', (done) => {
                expect(res).to.be.json
                expect(res.body).to.have.all.keys(['_id'])
                expect(res.body._id).not.to.be.undefined
                expect(res.body._id).to.equals(id)
                done()
            })
        })
        describe('When user already exist', () => {
            let res: ChaiHttp.Response
            before((done) => {
                chai.request(app)
                    .post('/api/users/addUser')
                    .send({
                        user: {
                            _id: id,
                            name: 'miha',
                            lastName: ' ',
                            email: 'gomihagle@gmail.com',
                            avatar_url: 'https://omgapp.pp.ua/api/storage/default.png',
                            avatar_min_url: 'https://omgapp.pp.ua/api/storage/default_min.png'
                        }
                    })
                    .end((err, response) => {
                        chai.request(app)
                            .post('/api/users/addUser')
                            .send({
                                user: {
                                    _id: id,
                                    name: 'miha',
                                    lastName: ' ',
                                    email: 'gomihagle@gmail.com',
                                    avatar_url: 'https://omgapp.pp.ua/api/storage/default.png',
                                    avatar_min_url: 'https://omgapp.pp.ua/api/storage/default_min.png'
                                }
                            })
                            .end((err, response) => {
                                res = response
                                done()
                            })
                    })
            })

            it('should respond with 507 status code', (done) => {
                expect(res).to.have.status(507)
                done()
            })

            it('should respond json with {message,predicate} fields', (done) => {
                expect(res).to.be.json
                expect(res.body).to.have.all.keys(['message', 'predicate'])
                expect(res.body.predicate).not.to.be.undefined
                expect(res.body.predicate).to.match(/EXIST/)
                done()
            })

        })
    })
    describe('When passed incorrect User object', () => {
        addUserBody.forEach(test => {
            describe(`${test.case}`, () => {
                let res: ChaiHttp.Response
                before((done) => {
                    chai.request(app)
                        .post('/api/users/addUser')
                        .send(test.body)
                        .end((err, response) => {
                            res = response
                            done()
                        })
                })

                it('should respond with status code 400', (done) => {
                    expect(res).to.have.status(400)
                    done()
                }),

                    it('should respond json with {message,predicate, errors} fields', (done) => {
                        expect(res).to.be.json
                        expect(res.body).to.have.all.keys(['message', 'predicate','errors'])
                        expect(res.body.predicate).not.to.be.undefined
                        expect(res.body.predicate).to.match(/INCORRECT/)
                        done()
                    })
            })
        })
    })



    after((done) => {
        db.close().then(done)
    })
})