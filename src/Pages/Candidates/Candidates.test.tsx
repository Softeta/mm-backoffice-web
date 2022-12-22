import { render, screen } from "@testing-library/react";
import Candidates from "./Candidates";

test.skip("renders Dashboard", () => {
  render(<Candidates />);
  const title = screen.getByText(/Dashboard/i);
  expect(title).toBeInTheDocument();
});
