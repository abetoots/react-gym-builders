import React, { useState } from "react";

import { TableEditRow } from "@devexpress/dx-react-grid-material-ui";
//Material Ui
import { Select, MenuItem, TableCell } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";

import ReactDatePicker from "react-date-picker";
import {
  MEMBERSHIP_DURATION,
  THIRTY_DAYS,
  NINETY_DAYS,
  HALF_YEAR,
  ONE_YEAR
} from "../../../misc/shared/constants";

const AddButton = ({ onExecute }) => (
  <div style={{ textAlign: "center" }}>
    <Button color="primary" onClick={onExecute} title="Create new row">
      New
    </Button>
  </div>
);

const EditButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Edit row">
    <EditIcon />
  </IconButton>
);

const DeleteButton = ({ onExecute }) => (
  <IconButton
    onClick={() => {
      // eslint-disable-next-line
      if (window.confirm("Are you sure you want to delete this row?")) {
        onExecute();
      }
    }}
    title="Delete row"
  >
    <DeleteIcon />
  </IconButton>
);

const CommitButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Save changes">
    <SaveIcon />
  </IconButton>
);

const CancelButton = ({ onExecute }) => (
  <IconButton color="secondary" onClick={onExecute} title="Cancel changes">
    <CancelIcon />
  </IconButton>
);

const commandComponents = {
  add: AddButton,
  edit: EditButton,
  delete: DeleteButton,
  commit: CommitButton,
  cancel: CancelButton
};

export const Command = ({ id, onExecute }) => {
  const CommandButton = commandComponents[id];
  return <CommandButton onExecute={onExecute} />;
};

export const EditCell = props => {
  const { column } = props;
  switch (column.name) {
    case MEMBERSHIP_DURATION:
      return <MDEditCell {...props} />;
    default:
      return <TableEditRow.Cell {...props} />;
  }
};

//Membership Duration Edit Cell ..
// ..styles
const mdStyles = theme => ({
  cell: {
    width: "100%",
    padding: theme.spacing(1)
  },
  select: {
    fontSize: "14px",
    width: "100%"
  },
  rdp: {
    width: "100%"
  },
  or: {
    cursor: "default",
    backgroundColor: "#000",
    color: "#fff",
    padding: ".5rem",
    fontSize: ".5rem",
    borderRadius: "50%",
    textTransform: "uppercase",
    fontWeight: "bold",
    width: "fit-content",
    margin: ".3rem auto"
  }
});
//..component base
const MDEditCellBase = ({ onValueChange, classes, row }) => {
  const [selectVal, setSelectVal] = useState("");
  const pattern = /(\d{4})(\d{2})(\d{2})/;
  //instead of value (which will will return the updated value of onValueChange),
  // we get the initialValue through row[key];
  const parts = row[MEMBERSHIP_DURATION].match(pattern);
  // months start with 0 in js, that's why you need to substract 1
  // -----------------------v----------v
  const valueDateObj = new Date(parts[1], parts[2] - 1, parts[3]);
  const [rdpVal, setRDPVal] = useState(valueDateObj);

  const handleRDPChange = dateObj => {
    onValueChange(dateObj.toDateString());
    setSelectVal("");
    setRDPVal(dateObj);
  };

  const handleSelectChange = event => {
    onValueChange(event.target.value);
    setSelectVal(event.target.value);
    setRDPVal(valueDateObj);
  };

  return (
    <TableCell className={classes.cell}>
      <Select
        value={selectVal}
        className={classes.select}
        onChange={handleSelectChange}
      >
        <MenuItem value="" selected>
          <em>None</em>
        </MenuItem>
        <MenuItem value={THIRTY_DAYS}>Add 30 days</MenuItem>
        <MenuItem value={NINETY_DAYS}>Add 90 days</MenuItem>
        <MenuItem value={HALF_YEAR}>Add 180 days</MenuItem>
        <MenuItem value={ONE_YEAR}>Add 1 year</MenuItem>
      </Select>
      <div className={classes.or}>or</div>
      <ReactDatePicker
        className={classes.rdp}
        value={rdpVal}
        onChange={handleRDPChange}
        options={{ minDate: new Date() }}
      />
    </TableCell>
  );
};

//..main component
const MDEditCell = withStyles(mdStyles, { name: "MDEditCell" })(MDEditCellBase);
