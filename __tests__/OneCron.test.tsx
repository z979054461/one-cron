import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import OneCron from "../src";

Enzyme.configure({ adapter: new Adapter() });

it("renders the correct language when lang prop is English", () => {
  const cronOne = Enzyme.shallow(
    <OneCron showCheckbox={true} lang='Chinese' cronExpression='0 0 2 * * ?' />
  );
  expect(cronOne.find(".timing").text()).toEqual("定时");
});

it("checkbox not show when showCheckbox is false", () => {
  const cronOne = Enzyme.render(<OneCron showCheckbox={false} />);
  expect(cronOne.find(".ant-checkbox-input").length).toEqual(0);
});

it("renders the correct text when cronExpression is given", () => {
  const cronOne = Enzyme.render(
    <OneCron showCheckbox={true} lang='English' cronExpression='0 0 2 * * ?' />
  );
  expect(cronOne.find(".ant-time-picker-input").prop("value")).toEqual("02:00");
});

it("renders the correct text when showRecentTime is true", () => {
  const cronOne = Enzyme.render(
    <OneCron showRecentTime={true} cronExpression='0 0 2 * * ?' />
  );
  expect(cronOne.find(".recent-title").text()).toEqual(
    "Recently generated time"
  );
});

it("dayOfWeekOneBased prop is true by default", () => {
  const cronExpression = '0 0 2 ? * 1,7';
  const cronOne = Enzyme.render(
    <OneCron cronExpression={cronExpression} />
  );
  expect(cronOne.find(".errorCronExp").length).toBe(0);
  // 应该选中周日和周六
  expect(cronOne.find('.schedule-period.week .cron-select-wrapper .ant-select-selection__choice__content').text()).toBe('SunSat');
});

it("dayOfWeekOneBased prop is false", () => {
  const cronExpression = '0 0 2 ? * 0,6';
  const cronOne = Enzyme.render(
    <OneCron cronExpression={cronExpression} dayOfWeekOneBased={false} />
  );
  expect(cronOne.find(".errorCronExp").length).toBe(0);
  // 应该选中周日和周六
  expect(cronOne.find('.schedule-period.week .cron-select-wrapper .ant-select-selection__choice__content').text()).toBe('SunSat');
});
