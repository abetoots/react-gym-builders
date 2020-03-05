import React from "react";

import { TableFilterRow } from "@devexpress/dx-react-grid-material-ui";
//Material Ui
import { Select, MenuItem, TableCell } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
//Shared
import {
  MEMBERSHIP_DURATION,
  IS_STUDENT,
  BRANCH
} from "../../../misc/constants";

export const FilterCell = props => {
  const { column } = props;
  switch (column.name) {
    case MEMBERSHIP_DURATION:
      return <MDFilterCell {...props} />;
    case IS_STUDENT:
      return <StudentFilterCell {...props} />;
    case BRANCH:
      return <BranchFilterCell {...props} />;
    default:
      return <TableFilterRow.Cell {...props} />;
  }
};

//Membership Duration Filter Cell ..
// ..styles
const mdStyles = theme => ({
  cell: {
    width: "100%",
    padding: theme.spacing(1)
  },
  select: {
    fontSize: "14px",
    width: "100%"
  }
});
//..component base
const MDFilterCellBase = ({ filter, onFilter, classes }) => (
  <TableCell className={classes.cell}>
    <Select
      className={classes.select}
      value={filter ? filter.value : ""}
      onChange={e =>
        onFilter(e.target.value ? { value: e.target.value } : null)
      }
      displayEmpty
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value="expiring">Expiring</MenuItem>
      <MenuItem value="expired">Expired</MenuItem>
    </Select>
  </TableCell>
);
//..main component
const MDFilterCell = withStyles(mdStyles, { name: "MDFilterCell" })(
  MDFilterCellBase
);

//Student Filter Cell ..
// ..styles
const studentStyles = theme => ({
  cell: {
    width: "100%",
    padding: theme.spacing(1)
  },
  select: {
    fontSize: "14px",
    width: "100%"
  }
});
//..component base
const StudentFilterCellBase = ({ filter, onFilter, classes }) => (
  <TableCell className={classes.cell}>
    <Select
      className={classes.select}
      value={filter ? filter.value : ""}
      onChange={e =>
        onFilter(e.target.value ? { value: e.target.value } : null)
      }
      displayEmpty
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value="true">True</MenuItem>
      <MenuItem value="false">False</MenuItem>
    </Select>
  </TableCell>
);
//..main component
const StudentFilterCell = withStyles(studentStyles, { name: "MDFilterCell" })(
  StudentFilterCellBase
);

//Branch Filter Cell ..
// ..styles
const branchStyles = theme => ({
  cell: {
    width: "100%",
    padding: theme.spacing(1)
  },
  select: {
    fontSize: "14px",
    width: "100%"
  }
});
//..component base
const BranchFilterCellBase = ({ filter, onFilter, classes }) => (
  <TableCell className={classes.cell}>
    <Select
      className={classes.select}
      value={filter ? filter.value : ""}
      onChange={e =>
        onFilter(e.target.value ? { value: e.target.value } : null)
      }
      displayEmpty
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value="la_trinidad">La Trinidad</MenuItem>
      <MenuItem value="baguio">Baguio</MenuItem>
    </Select>
  </TableCell>
);
//..main component
const BranchFilterCell = withStyles(branchStyles, { name: "BranchFilterCell" })(
  BranchFilterCellBase
);
