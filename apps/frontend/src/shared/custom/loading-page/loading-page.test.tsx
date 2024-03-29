import { expect } from "vitest";

import LoadingPage from "~/shared/custom/loading-page";
import { render, screen } from "~/tests/test-utils";

describe("Loading Page", () => {
  it('should render a loading page with the default title "Loading"', () => {
    // Arrange
    const title = "Loading";
    // Act
    render(<LoadingPage />);
    // Assert
    expect(screen.getByText(title)).toBeDefined();
  });

  it('should render a loading page with title "Custom Loading"', () => {
    // Arrange
    const title = "Custom Loading";
    // Act
    render(<LoadingPage title={title} />);
    // Assert
    expect(screen.getByText(title)).toBeDefined();
  });

  it('should render a loading page with description "Please wait..."', () => {
    // Arrange
    const description = "Please wait...";
    // Act
    render(<LoadingPage description={description} />);
    // Assert
    expect(screen.getByText(description)).toBeDefined();
  });
});
