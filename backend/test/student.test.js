const request = require("supertest");
const mongoose = require("mongoose");
const { app, server } = require("../index");
const Student = require("../models/Student");

beforeAll(async () => {
  const MONGO_URI = "mongodb://localhost:27017/studentdb";
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

describe("POST api/students", () => {
  // 1. SUCCESS CASE
  it("should create a student successfully", async () => {
    const studentData = {
      name: "Arun",
      age: 23,
      grade: "A",
    };

    const res = await request(app).post("/api/students").send(studentData);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.name).toBe("Arun");
    expect(res.body.age).toBe(23);
  });

  //  2. MISSING REQUIRED FIELD
  it("should fail when name is missing", async () => {
    const studentData = {
      age: 22,
      email: "test@test.com",
    };

    const res = await request(app).post("/api/students").send(studentData);
    expect(res.statusCode).toBe(500);
  });

  // 3. EMPTY BODY
  it("should return error for empty request body", async () => {
    const res = await request(app).post("/api/students").send({});
    expect(res.statusCode).toBe(500);
  });

  //  4. DATABASE FAILURE (MOCK)
  it("should return 500 if DB save fails", async () => {
    jest
      .spyOn(Student.prototype, "save")
      .mockRejectedValueOnce(new Error("DB Error"));

    const studentData = {
      name: "Test",
      age: 20,
      email: "fail@test.com",
    };

    const res = await request(app).post("/api/students").send(studentData);
    expect(res.statusCode).toBe(500);
    Student.prototype.save.mockRestore();
  });
});

describe("GET api/students", () => {
  // 1. SUCCESS CASE
  it("should get all students", async () => {
    const res = await request(app).get("/api/students");
    expect(res.statusCode).toEqual(200);
  });

  // 2. should return in array form
  it("it should return array", async () => {
    const res = await request(app).get("/api/students");
    expect(res.body).toBeInstanceOf(Array);
    console.log(res.body,"data seeds");
  });

  // 3.DATABASE FAILURE (MOCK)
  it("should return 500 if DB find fails", async () => {
    jest.spyOn(Student, "find").mockRejectedValueOnce(new Error("DB Error"));
    const res = await request(app).get("/api/students");
    expect(res.statusCode).toBe(500);

    Student.find.mockRestore();
  });
});


describe("PUT api/students/:id", () => {

  // 1. SUCCESS CASE
  it("should update student successfully", async () => {
    const student = await Student.create({
      name: "Arun",
      age: 23,
      grade: "A",
    });

    const updatedData = {
      age: 24,
      grade: "A+",
    };

    const res = await request(app)
      .put(`/api/students/${student._id}`)
      .send(updatedData);

    expect(res.statusCode).toBe(200);
    expect(res.body.age).toBe(24);
    expect(res.body.grade).toBe("A+");
  });

  // 2. INVALID ID
  it("should return 500 for invalid student id", async () => {
    const res = await request(app)
      .put("/api/students/invalid-id")
      .send({ age: 25 });

    expect(res.statusCode).toBe(500);
  });

  // 3. EMPTY BODY
  it("should update nothing if body is empty", async () => {
    const student = await Student.create({
      name: "Kumar",
      age: 22,
      grade: "B",
    });

    const res = await request(app)
      .put(`/api/students/${student._id}`)
      .send({});

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Kumar");
  });

  // 4. DATABASE FAILURE (MOCK)
  it("should return 500 if DB update fails", async () => {
    jest
      .spyOn(Student, "findByIdAndUpdate")
      .mockRejectedValueOnce(new Error("DB Error"));

    const res = await request(app)
      .put("/api/students/64a123456789abcdef123456")
      .send({ age: 30 });

    expect(res.statusCode).toBe(500);

    Student.findByIdAndUpdate.mockRestore();
  });

});

describe("DELETE api/students/:id", () => {

  // 1. SUCCESS CASE
  it("should delete student successfully", async () => {
    const student = await Student.create({
      name: "Arun",
      age: 23,
      grade: "A",
    });

    const res = await request(app)
      .delete(`/api/students/${student._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toBe("Student has been deleted...");
  });

  // 2. INVALID ID
  it("should return 500 for invalid student id", async () => {
    const res = await request(app)
      .delete("/api/students/invalid-id");

    expect(res.statusCode).toBe(500);
  });

  // 3. STUDENT NOT FOUND
  it("should return 200 even if student does not exist", async () => {
    const fakeId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .delete(`/api/students/${fakeId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toBe("Student has been deleted...");
  });

  // 4. DATABASE FAILURE (MOCK)
  it("should return 500 if DB delete fails", async () => {
    jest
      .spyOn(Student, "findByIdAndDelete")
      .mockRejectedValueOnce(new Error("DB Error"));

    const res = await request(app)
      .delete("/api/students/64a123456789abcdef123456");

    expect(res.statusCode).toBe(500);

    Student.findByIdAndDelete.mockRestore();
  });

});



//  CLEANUP
afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
});
