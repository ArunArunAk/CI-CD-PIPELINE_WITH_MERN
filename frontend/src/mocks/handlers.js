import { rest } from "msw";

let students = [
  { _id: "1", name: "Arun", age: 23, grade: "A" },
];

export const handlers = [

  // GET students
  rest.get("http://localhost:5000/api/students", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(students));
  }),

  // POST student
  rest.post("http://localhost:5000/api/students", async (req, res, ctx) => {
    const body = await req.json();
    const newStudent = { _id: Date.now().toString(), ...body };
    students.push(newStudent);
    return res(ctx.status(200), ctx.json(newStudent));
  }),

  // PUT student
  rest.put("http://localhost:5000/api/students/:id", async (req, res, ctx) => {
    const { id } = req.params;
    const body = await req.json();

    students = students.map((s) =>
      s._id === id ? { ...s, ...body } : s
    );

    return res(ctx.status(200), ctx.json({}));
  }),

  // DELETE student
  rest.delete("http://localhost:5000/api/students/:id", (req, res, ctx) => {
    const { id } = req.params;
    students = students.filter((s) => s._id !== id);
    return res(ctx.status(200));
  }),
];
