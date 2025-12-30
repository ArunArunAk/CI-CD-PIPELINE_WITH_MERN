import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../Home";


test("renders Student Management heading", () => {
  render(<Home />);
  expect(screen.getByText("Student Management")).toBeInTheDocument();
});

test("loads and displays students", async () => {
  render(<Home />);

  expect(await screen.findByText("Arun")).toBeInTheDocument();
  expect(screen.getByText("23")).toBeInTheDocument();
  expect(screen.getByText("A")).toBeInTheDocument();
});


test("adds a new student", async () => {
  render(<Home />);

  fireEvent.change(screen.getByPlaceholderText("Name"), {
    target: { value: "Kumar" },
  });
  fireEvent.change(screen.getByPlaceholderText("Age"), {
    target: { value: "22" },
  });
  fireEvent.change(screen.getByPlaceholderText("Grade"), {
    target: { value: "B" },
  });

  fireEvent.click(screen.getByText("Add Student"));

  expect(await screen.findByText("Kumar")).toBeInTheDocument();
});


test("deletes a student", async () => {
  render(<Home />);

  fireEvent.click(await screen.findByText("Delete"));

  await waitFor(() => {
    expect(screen.queryByText("Arun")).not.toBeInTheDocument();
  });
});
