import { initForm } from "./form-core";

const inputs = [
  {
    key: "full_name",
    label: "Full Name",
    elType: "input",
    elementConfig: {
      type: "text",
      required: true,
      placeholder: "Your Full Name"
    },
    initialValue: ""
  },
  {
    key: "is_student",
    label: "Student ?",
    elType: "toggle",
    elementConfig: {
      required: true
    },
    initialValue: false
  },
  {
    key: "membership_duration_preset",
    label: "Membership Duration Presets",
    elType: "select",
    elementConfig: {
      options: [
        {
          value: "THIRTY_DAYS",
          label: "30 days"
        },
        {
          value: "NINETY_DAYS",
          label: "90 days"
        },
        {
          value: "HALF_YEAR",
          label: "180 days"
        },
        {
          value: "ONE_YEAR",
          label: "1 Year"
        }
      ],
      required: true
    },
    initialValue: "30 days",
    description: "Select how long from today until the membership expires ",
    hasToRemove: "membership_duration_specific"
  },
  {
    key: "membership_duration_specific",
    label: "Membership Duration Specific",
    elType: "datepicker",
    elementConfig: {
      options: {
        minDate: new Date()
      }
    },
    initialValue: "",
    description: "Or select a specific date when the membership expires",
    hasToRemove: "membership_duration_preset"
  },
  {
    key: "branch",
    label: "Branch",
    elType: "select",
    elementConfig: {
      options: [
        {
          value: "la_trinidad",
          label: "La Trinidad"
        },
        {
          value: "baguio",
          label: "Baguio"
        }
      ],
      required: true
    },
    initialValue: "la_trinidad"
  }
];

export const useFormState = initForm(inputs);

export default inputs;
