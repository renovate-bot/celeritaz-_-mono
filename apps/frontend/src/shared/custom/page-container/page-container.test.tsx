import PageContainer from ".";
import { describe, expect } from "vitest";

import { render, screen } from "~/tests/test-utils.tsx";

describe("Page Container", () => {
  it("should render a page container with the children inside it", () => {
    const content = "Sample Text";

    render(<PageContainer>{content}</PageContainer>);

    expect(screen.getByText(content)).toBeDefined();
  });
});
