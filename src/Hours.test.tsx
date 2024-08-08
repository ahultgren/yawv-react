import { render, screen } from "@testing-library/react";
import { Hours } from "./Hours";

describe("Hours", () => {
  describe("guards", () => {
    test("defaults if .to is less than .from", () => {
      render(<Hours fromHour={23} toHour={12} />);
      // TODO Can't figure out a good way to assert nor test this
    });
  });

  test("shows the time", () => {
    render(<Hours fromHour={10} toHour={18} />);

    expect(screen.getByText("10:00")).toBeInTheDocument();
    expect(screen.getByText("18:00")).toBeInTheDocument();
  });
});
