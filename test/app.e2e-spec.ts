import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ignoreElements } from 'rxjs';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // 테스트와 운영은 환경 동일해야 함
    app.useGlobalPipes(new ValidationPipe({
      whitelist : true,
      forbidNonWhitelisted: true,
      transform: true,
    }));

    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe("/movies", () => {
    it("GET", () => {
      return request(app.getHttpServer())
      .get("/movies")
      .expect(200)
      .expect([])
    })

    it("POST", () => {
      return request(app.getHttpServer())
        .post("/movies")
        .send({
          title: "Test" ,
          year: 2000,
          genres: ['test'],
        })
        .expect(201);
    })

    it("DELETE", () => {
      return request(app.getHttpServer())
        .delete('/movies')
        // NOT FOUND
        .expect(404)
    })
  })

  describe('/movies/:id', () => {
    it("GET 200", () => {
      return request(app.getHttpServer())
        .get("/movies/1")
        .expect(200)
    })

    it("GET 404", () => {
      return request(app.getHttpServer())
        .get("/movies/9999")
        .expect(404)
    })

    it("PATCH 200", () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({
          title:"Updated Test"
        })
        // 201: created
        // 200: ok
        .expect(200);
    })

    it("DELETE 200", () => {
      return request(app.getHttpServer())
        .delete('/movies/1')
        .expect(200);
    })

    it("POST 400", () => {
      return request(app.getHttpServer())
        .post("/movies")
        .send({
          title: "Test" ,
          year: 2000,
          genres: ['test'],
          other: "thing"
        })
        // 400: Bad Request
        .expect(400);
    })
  })
});
