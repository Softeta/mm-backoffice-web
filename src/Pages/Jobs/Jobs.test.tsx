import { render, screen } from "@testing-library/react";
import Jobs from "./Jobs";

test.skip("renders Jobs", () => {
  render(<Jobs />);
  const title = screen.getByText(/Jobs/i);
  expect(title).toBeInTheDocument();
});
