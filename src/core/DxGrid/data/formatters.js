import React from "react";
import PropTypes from "prop-types";
import toStartCase from "lodash.startcase";
import capitalize from "lodash.capitalize";
import { isDate } from "../../../misc/util";

// Serves as formatter for boolean integers into check or x marks
export const intToEmoji = ({ value }) => {
  if (value === 1) {
    return (
      <span style={{ margin: "0 auto" }} role="img" alt="true">
        ✔️
      </span>
    );
  } else {
    return (
      <span style={{ margin: "0 auto" }} role="img" alt="false">
        ❌
      </span>
    );
  }
};
intToEmoji.propTypes = {
  value: PropTypes.number
};

//Converts any string to start case
export const dataToStartCase = ({ value }) => {
  let newVal = toStartCase(value);
  return newVal;
};
dataToStartCase.propTypes = {
  value: PropTypes.string
};

//Capitalize a string
export const dataCapitalize = ({ value }) => {
  return capitalize(value);
};
dataCapitalize.propTypes = {
  value: PropTypes.string
};

/**
 * Converts a YYYYMMDD ACF date and returns a string in "January 01 2020" format
 * @param {Date} param0 The date string in YYYYMMDD format
 */
export const acfDateToDateString = ({ value }) => {
  if (!value) {
    return "";
  }
  const pattern = /(\d{4})(\d{2})(\d{2})/;
  const parts = value.match(pattern);
  // months start with 0 in js, that's why you need to substract 1
  // -----------------------v----------v
  const date = new Date(parts[1], parts[2] - 1, parts[3]);
  const formatter = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "long",
    day: "2-digit"
  });
  return formatter.format(date);
};

/**
 * Converts a date string in ISO format and returns a string in "January 01 2020" format
 * @param {string} param0 The date string in ISO 8601 format
 */
export const formatDateToDmy = ({ value }) => {
  const date = new Date(value);
  const formatter = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "long",
    day: "2-digit"
  });
  return formatter.format(date);
};

/**
 * Converts a YYYYMMDD ACF date and returns a string in "January 01 2020" format
 * @param {Date} param0 The date string in YYYYMMDD format
 */
export const acfDateToStringWithExpiryWarnings = ({ value }) => {
  if (!value) {
    return "";
  }
  const pattern = /(\d{4})(\d{2})(\d{2})/;
  const parts = value.match(pattern);
  // months start with 0 in js, that's why you need to substract 1
  // -----------------------v----------v
  const expDate = new Date(parts[1], parts[2] - 1, parts[3]);
  const formatter = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "long",
    day: "2-digit"
  });
  const dateStr = formatter.format(expDate);

  //If we are past the expiration date
  if (expDate <= new Date()) {
    return (
      <>
        {dateStr}
        <div
          style={{
            width: "fit-content",
            backgroundColor: "rgb(230, 138, 138)",
            color: "rgb(148, 18, 1)",
            borderRadius: "60px",
            padding: "0.5rem"
          }}
        >
          Expired
          <span role="img" alt="expired">
            ❗
          </span>
        </div>
      </>
    );
  } else {
    //the remaining time in milliseconds
    let remainingTime = expDate.getTime() - new Date().getTime();
    //if less than 7 days remaining
    if (remainingTime < 604800000) {
      return (
        <>
          {dateStr}
          <div
            style={{
              width: "fit-content",
              backgroundColor: "rgb(230, 179, 138)",
              color: "rgb(211, 102, 0",
              borderRadius: "60px",
              padding: "0 .5rem"
            }}
          >
            Expiring
            <span role="img" alt="expiring">
              ⚠️
            </span>
          </div>
        </>
      );
    }
    return dateStr;
  }
};
