import React from "react";
import { useMediaQuery } from "react-responsive";
export default function DateOfBirthSelect({
  bDay,
  bMonth,
  bYear,
  handleRegisterChange,
  dateError,
  days,
  months,
  years,
}) {
  const view1 = useMediaQuery({ query: "(min-width: 539px)" });
  const view2 = useMediaQuery({ query: "(min-width: 850px)" });
  const view3 = useMediaQuery({ query: "(min-width: 1170px)" });
  return (
    <div
      className="reg_grid"
      style={{ marginBottom: `${dateError && !view3 ? "90px" : "0"}` }}
    >
      <select
        name="bDay"
        id="bDay"
        value={bDay}
        onChange={handleRegisterChange}
      >
        {days.map((day, index) => (
          <option key={index} value={day}>
            {day}
          </option>
        ))}
      </select>
      <select
        name="bMonth"
        id="bMonth"
        value={bMonth}
        onChange={handleRegisterChange}
      >
        {months.map((month, index) => (
          <option key={index} value={month}>
            {month}
          </option>
        ))}
      </select>
      <select
        name="bYear"
        id="bYear"
        value={bYear}
        onChange={handleRegisterChange}
      >
        {years.map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>
      {dateError && (
        <div
          className={
            !view3 ? "input_error" : "input_error input_error_select_large"
          }
        >
          <div
            className={!view3 ? "error_arrow_bottom" : "error_arrow_left"}
          ></div>
          {dateError}
        </div>
      )}
    </div>
  );
}
