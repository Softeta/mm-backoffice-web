import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";

test.skip("renders Dashboard", () => {
  render(<Dashboard />);
  const title = screen.getByText(/Dashboard/i);
  expect(title).toBeInTheDocument();
});
