export const membershipDurationPredicate = (value, filter) => {
  const pattern = /(\d{4})(\d{2})(\d{2})/;
  const parts = value.match(pattern);
  //NOTE: extra check if value is truthy or else parts will be empty leading to errors
  // months start with 0 in js, that's why you need to substract 1
  // -----------------------v----------v
  const expDate = value ? new Date(parts[1], parts[2] - 1, parts[3]) : "";
  switch (filter.value) {
    case "expired":
      //if value is less than current date, means value is in the past and we are past expiration
      return value && expDate <= new Date();
    case "expiring":
      //the remaining time in milliseconds
      let remainingTime = value ? expDate.getTime() - new Date().getTime() : "";
      //if less than 7 days remaining
      return value && remainingTime < 604800000;
    default:
      return true;
  }
};

export const studentPredicate = (value, filter) => {
  switch (filter.value) {
    case "true":
      return value === 1;
    case "false":
      return value === 0;
    default:
      return true;
  }
};

export const branchPredicate = (value, filter) =>
  filter.value ? value === filter.value : true;
