import React from "react";
import { DataTypeProvider } from "@devexpress/dx-react-grid";
import {
  intToEmoji,
  dataToStartCase,
  formatDateToDmy,
  acfDateToStringWithExpiryWarnings
} from "./formatters";

export const StudentTypeProvider = props => (
  <DataTypeProvider formatterComponent={intToEmoji} {...props} />
);

export const BranchProvider = props => (
  <DataTypeProvider formatterComponent={dataToStartCase} {...props} />
);

export const RegistrationProvider = props => (
  <DataTypeProvider formatterComponent={formatDateToDmy} {...props} />
);

export const MembershipDurationProvider = props => (
  <DataTypeProvider
    formatterComponent={acfDateToStringWithExpiryWarnings}
    {...props}
  />
);
