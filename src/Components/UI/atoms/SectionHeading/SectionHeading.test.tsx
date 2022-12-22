import { render, screen } from "@testing-library/react";
import SectionHeading from ".";

test("renders SectionHeading", () => {
  render(
    <SectionHeading
      title="Section Heading"
      button={<button type="button">Heading button</button>}
    />
  );
  const title = screen.getByText(/Section Heading/i);
  expect(title).toBeInTheDocument();
  const button = screen.getByText(/Heading button/i);
  expect(button).toBeInTheDocument();
});
