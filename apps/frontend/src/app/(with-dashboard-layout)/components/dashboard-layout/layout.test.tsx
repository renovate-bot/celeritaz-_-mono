import { describe } from "vitest";

import DashboardLayout from "~/app/(with-dashboard-layout)/components/dashboard-layout";
import { render, screen } from "~/tests/test-utils";

describe("Render DashboardLayout", () => {
  it("should render DashboardLayout", () => {
    const content = "Inside DashboardLayout";
    render(
      <DashboardLayout>
        <p>{content}</p>
      </DashboardLayout>
    );

    expect(screen.getByText(content)).toBeDefined();
  });
});
