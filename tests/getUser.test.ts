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
let accessToken: String
let mail: String
let userId: string
chai.use(chai_http)


describe('Testing route: GET /api/users/getUser', () => {
    before(async () => {
        db = await createDatabase()
        app = createApp(db)
        mail = crypto.randomUUID().slice(0, 8)
    })
    describe('When User exists', () => {
        let res: ChaiHttp.Response
        before((done) => {
            chai.request(app)
                .post('/api/users/registerUser')
                .send({
                    user: {
                        _id: "",
                        name: 'miha',
                        lastName: ' ',
                        email: `${mail}@gmail.com`,
                        avatar_url: 'https://omgapp.pp.ua/api/storage/default.png',
                        avatar_min_url: 'https://omgapp.pp.ua/api/storage/default.png'
                    },
                    password:'12345miha'
                })
                .end((err, response) => {
                    userId = response.body._id

                    accessToken = JWT.sign({
                        id: userId
                    }, config.get('jwt_secret'), { expiresIn: 600 })

                    chai.request(app)
                        .get('/api/users/getUser')
                        .set('Authorization', `Bearer ${accessToken}`)
                        .end((err, response) => {
                            res = response
                            done()
                        })
                })
        })

        it('should respond with status code 200', (done) => {
            expect(res).to.have.status(200)
            done()
        })
        it('should respond json with {user} field ', (done) => {
            expect(res).to.be.json
            expect(res.body).to.have.all.keys(['user'])
            done()
        })
        it('should respond valid User object ', (done) => {
            expect(res.body.user).to.have.all.keys(['_id', 'name', 'lastName', 'email', 'avatar_url', 'avatar_min_url']),
                expect(res.body.user._id).to.equals(userId)
            expect(res.body.user.email).not.to.be.undefined
            expect(res.body.user.name).not.to.be.undefined
            expect(res.body.user.lastName).not.to.be.undefined
            expect(res.body.user.avatar_url).not.to.be.undefined
            done()
        })
    })

    describe('When User not exist', () => {
        let res: ChaiHttp.Response
        before((done) => {

            accessToken = JWT.sign({
                id: crypto.randomUUID().slice(0, 24).replace(/-/g, 'b')
            }, config.get('jwt_secret'), { expiresIn: 600 })


            chai.request(app)
                .get('/api/users/getUser')
                .set('Authorization', `Bearer ${accessToken}`)
                .end((err, response) => {
                    res = response
                    done()
                })

        })

        it('should respond with status code 401', (done) => {
            expect(res).to.have.status(401)
            done()
        })
        it('should respond json with {message,predicate} fields ', (done) => {
            expect(res).to.be.json
            expect(res.body).to.have.all.keys(['message', 'predicate'])
            expect(res.body.predicate).to.match(/NOT_EXIST/)
            done()
        })

    })

    after((done) => {
        db.close().then(done)
    })

})