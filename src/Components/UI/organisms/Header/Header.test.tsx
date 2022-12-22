import { render, screen } from "@testing-library/react";
import Header from ".";

test.skip("renders Header", () => {
  render(<Header />);
  const navigation = screen.getByRole("navigation");
  expect(navigation).toBeInTheDocument();
});
