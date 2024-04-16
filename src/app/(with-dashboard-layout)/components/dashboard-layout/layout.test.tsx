import { describe } from "vitest";

import DashboardLayout from "~/app/(with-dashboard-layout)/components/dashboard-layout";
import { SIDEBAR_LINKS } from "~/app/(with-dashboard-layout)/components/dashboard-layout/components/sidebar/components/sidebar-links";
import { render, screen } from "~/tests/test-utils";

const content = "Inside DashboardLayout";

describe.skip("Render DashboardLayout", () => {
  it("should render DashboardLayout with children", () => {
    render(
      <DashboardLayout>
        <p>{content}</p>
      </DashboardLayout>
    );

    expect(screen.getByText(content)).toBeDefined();
  });

  describe("should render topbar & sidebar", () => {
    it("should render DashboardLayout containing topbar", () => {
      render(<DashboardLayout>{<p>{content}</p>}</DashboardLayout>);
      expect(screen.getByTestId("topbar")).toBeDefined();
    });

    it("should render DashboardLayout containing sidebar", () => {
      render(<DashboardLayout>{<p>{content}</p>}</DashboardLayout>);
      expect(screen.getByTestId("desktop-sidebar")).toBeDefined();
    });
  });

  describe("should render sidebar with required components", () => {
    const linkWithName = Object.values(SIDEBAR_LINKS).find((link) => link.name);

    const linkWithSubTitle = Object.values(SIDEBAR_LINKS).find((link) => link.subTitle);

    const subMenuLink = Object.values(SIDEBAR_LINKS)
      .find((link) => link.subMenu)
      ?.subMenu?.find((subMenu) => subMenu.name);

    test.skipIf(!linkWithName)("should render Sidebar with one of the links provided", () => {
      render(<DashboardLayout>{<p>{content}</p>}</DashboardLayout>);

      // Should expect the name if it exists
      if (linkWithName?.name) expect(screen.getByText(linkWithName.name)).toBeDefined();
    });

    test.skipIf(!linkWithSubTitle)(
      "should render Sidebar with one of the subTitle provided",
      () => {
        render(<DashboardLayout>{<p>{content}</p>}</DashboardLayout>);

        // Should expect the subTitle if it exists
        if (linkWithSubTitle?.subTitle)
          expect(screen.getByText(linkWithSubTitle.subTitle)).toBeDefined();
      }
    );

    test.skipIf(!subMenuLink)(
      "should render Sidebar with one of the subMenu links provided",
      () => {
        render(<DashboardLayout>{<p>{content}</p>}</DashboardLayout>);

        // Should expect the subMenu link if it exists
        if (subMenuLink?.name) expect(screen.getByText(subMenuLink.name)).toBeDefined();
      }
    );
  });

  describe("should render topbar with required components", () => {
    it("should render Topbar with the theme toggle button", () => {
      render(
        <DashboardLayout>
          <p>{content}</p>
        </DashboardLayout>
      );

      expect(screen.getByTestId("theme-toggle-button")).toBeDefined();
    });
  });
});
