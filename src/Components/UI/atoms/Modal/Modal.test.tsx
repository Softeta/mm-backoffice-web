import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";

describe("<Modal />", () => {
  test("renders", () => {
    render(<Modal open testId="modal" />);
    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
  });

  test("closes on `Escape` key press and backdrop click", () => {
    const onClose = jest.fn();
    render(<Modal open testId="modal" onClose={onClose} />);

    fireEvent.keyDown(screen.getByTestId("modal"), { code: "Escape" });
    expect(onClose).toHaveBeenCalled();

    fireEvent.click(screen.getByRole("dialog"));
    expect(onClose).toHaveBeenCalled();
  });

  test("doesn't close on `Escape` key press or backdrop click", () => {
    const onClose = jest.fn();
    render(
      <Modal open testId="modal" onClose={onClose} disableEscapeKeyDown />
    );

    fireEvent.keyDown(screen.getByTestId("modal"), { code: "Escape" });
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("dialog"));
    expect(onClose).not.toHaveBeenCalled();
  });
});
