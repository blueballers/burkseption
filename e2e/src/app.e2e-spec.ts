import { browser, by, element } from "protractor";

describe("workspace-project App", () => {
	beforeEach(() => {
		browser.get("/");
	});

	it("should display welcome message", () => {
		expect(element(by.css("app-root h1")).getText()).toEqual(
			"Burkseption"
		);
	});
});
