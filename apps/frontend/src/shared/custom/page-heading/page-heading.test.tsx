import { describe } from "vitest";

import PageHeading from "~/shared/custom/page-heading";
import { render, screen } from "~/tests/test-utils";

describe("Page Heading", () => {
  it("should render the page heading with the title provided", () => {
    const title = "Sample Title";

    render(<PageHeading title={title} />);

    expect(screen.getByText(title)).toBeDefined();
  });

  it("should render the page heading with the title and subtitle provided", () => {
    const title = "Sample Title";
    const subTitle = "Sample Subtitle";

    render(<PageHeading title={title} subTitle={subTitle} />);

    expect(screen.getByText(title)).toBeDefined();
    expect(screen.getByText(subTitle)).toBeDefined();
  });
});
