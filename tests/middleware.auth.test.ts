import DB from '../src/storage/database'
import { Express, response } from 'express'
import chai from 'chai'
import chai_http from 'chai-http'
import createDatabase from '../src/storage/createDatabase'
import createApp from '../src/app'
import JWT from 'jsonwebtoken'
import config from 'config'

const expect = chai.expect
let db: DB
let app: Express
chai.use(chai_http)


describe('Testing Auth middleware: POST /test', () => {
    before(async () => {
        db = await createDatabase()
        app = createApp(db)

    })

    describe('When passed valid token', async () => {
        let res: ChaiHttp.Response
        before(async () => {
            const accessToken = JWT.sign({
                id: "someUserId"
            }, config.get('jwt_secret'), { expiresIn: 600 })

            chai.request(app)
                .post('/test')
                .send({
                    token: accessToken
                })
                .end((err, response) => {
                    res = response
                })
        })
        it('should respond with status code 200', (done) => {
            expect(res).to.have.status(200)
            done()
        })
        it('should respond with json with field {userId}', (done) => {
            expect(res).to.be.json
            expect(res.body).to.have.all.keys(['userId'])
            expect(res.body.userId).to.match(/someUserId/)
            done()
        })
    })

    describe('When passed expired token', async () => {
        let res: ChaiHttp.Response
        before(async () => {
            chai.request(app)
                .post('/test')
                .send({
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmU2NzE4NTk4MGVhMTE4NTZhYjg4YSIsImlhdCI6MTY3OTI0MDA5MSwiZXhwIjoxNjc5MjQwNjkxfQ.ycs68kmY_jp2IhUZ_1OEmBt4-z_8q31gHPVfYuxeKOs"
                })
                .end((err, response) => {
                    res = response
                })
        })
        it('should respond with status code 401', (done) => {
            expect(res).to.have.status(401)
            done()
        })
        it('should respond with json {message, predicate=EXPIRED} fields ', (done) => {
            expect(res).to.be.json
            expect(res.body).to.have.all.keys(['message', 'predicate'])
            expect(res.body.message).not.to.be.undefined
            expect(res.body.predicate).to.match(/EXPIRED/)
            done()
        })
    })

    describe('When token missing', async () => {
        let res: ChaiHttp.Response
        before(async () => {
            chai.request(app)
                .post('/test')
                .end((err, response) => {
                    res = response
                })
        })
        it('should respond with status code 400', (done) => {
            expect(res).to.have.status(400)
            done()
        })
        it('should respond  json with {message} field', (done) => {
            expect(res).to.be.json
            expect(res.body).to.have.all.keys(['message'])
            expect(res.body.message).not.to.be.undefined
            done()
        })
    })

    after((done) => {
        db.close().then(done)
    })



})




