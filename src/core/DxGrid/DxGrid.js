import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";

//Apollo
import { useLazyQuery } from "@apollo/react-hooks";

//Components
import Layout from "../../components/layout";
import Spinner3 from "../../components/UI/Spinner/Spinner3";

//DX Grid Core Components
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableFilterRow,
  TableEditRow,
  TableEditColumn
} from "@devexpress/dx-react-grid-material-ui";

//DX Grid Core Plugins
import {
  PagingState,
  SortingState,
  IntegratedPaging,
  IntegratedSorting,
  EditingState,
  FilteringState,
  IntegratedFiltering
} from "@devexpress/dx-react-grid";

//DX Grid Customizations
//TODO maybe format the data server side to prevent doing everything here
import {
  StudentTypeProvider,
  BranchProvider,
  MembershipDurationProvider
} from "./data/providers";

import { FilterCell } from "./ui/filtering";
import { Command, EditCell } from "./ui/editing";
import {
  membershipDurationPredicate,
  studentPredicate,
  branchPredicate
} from "./data/filtering";

//Shared
import { tokenCache } from "../../misc/hooks/auth";
import { useLazyFetchQuery } from "../../misc/hooks/util";
import { useStore } from "../../misc/store/store-core";

import {
  FULL_NAME,
  MEMBERSHIP_DURATION,
  IS_STUDENT,
  BRANCH,
  GYM_ADMIN,
  GYM_ROLE,
  USERS_STORE
} from "../../misc/shared/constants";

import {
  GET_GYM_MEMBERS_QUERY,
  getUpdateMemberMutation,
  getDeleteUserMutation
} from "../../misc/shared/mutations";

const DxGrid = () => {
  const [globalState, dispatch] = useStore(USERS_STORE);

  const [columns] = useState([
    { name: "userId", title: "ID" },
    { name: FULL_NAME, title: "Full Name" },
    { name: MEMBERSHIP_DURATION, title: "Membership Expiration" },
    { name: IS_STUDENT, title: "Student" },
    { name: BRANCH, title: "Branch" }
  ]);
  const [rows, setRows] = useState([]);

  const [
    getGymMembers,
    { called, loading, error, data, networkStatus, refetch }
  ] = useLazyQuery(GET_GYM_MEMBERS_QUERY, {
    notifyOnNetworkStatusChange: true
  });

  const [updateMember, { loading: loadingUpdate }] = useLazyFetchQuery(
    GRAPHQL_URL,
    tokenCache.token
  );

  const [deleteUser, { loading: loadingDelete }] = useLazyFetchQuery(
    GRAPHQL_URL,
    tokenCache.token
  );

  //State management plugins  https://devexpress.github.io/devextreme-reactive/react/grid/docs/guides/plugin-overview/
  //Handle state changes in our table, provided by dx-react-grid
  const [editingRowIds, getEditingRowIds] = useState([]); //IDs of the rows being edited.
  const [rowChanges, setRowChanges] = useState({}); //Not committed row changes.
  const [pageSizes] = useState([10, 20, 50, 100]);
  const [editingStateColumnExtensions] = useState([
    { columnName: "userId", editingEnabled: false },
    { columnName: IS_STUDENT, editingEnabled: false },
    { columnName: BRANCH, editingEnabled: false }
  ]);

  //For data formatting
  const [studentCols] = useState([IS_STUDENT]);
  const [branchCols] = useState([BRANCH]);
  const [membershipDurationCols] = useState([MEMBERSHIP_DURATION]);
  const [integratedFilteringColumnExtensions] = useState([
    {
      columnName: MEMBERSHIP_DURATION,
      predicate: membershipDurationPredicate
    },
    {
      columnName: IS_STUDENT,
      predicate: studentPredicate
    },
    {
      columnName: BRANCH,
      predicate: branchPredicate
    }
  ]);

  //Table UI
  const [tableColumnExtensions] = useState([
    { columnName: IS_STUDENT, width: 100 },
    { columnName: FULL_NAME, wordWrapEnabled: true }
  ]);

  //ComponentDidMount: We wait for the token to be set before querying.
  useEffect(() => {
    if (tokenCache.token && !called) {
      console.log("Starting query");
      getGymMembers();
    }
  }, []);

  useEffect(() => {
    if (loading) {
      console.log("Apollo: Fetching");
    }

    if (networkStatus === 4) {
      console.log("refetching");
      //we only refetch because there was a new user, now that we are refetching it, we set it to false
      dispatch("REFETCHED_NEW_USER");
    }

    if (data) {
      //we have a cache-first policy. however, if a new user has been registered, we'd like to refetch the query bypassing the cache
      if (globalState.registeredNewUser) {
        refetch();
      } else {
        console.log("Apollo: Done!", [data]);
        setRows(data.users.nodes);
      }
    }
  }, [data, loading, networkStatus]);

  // We can edit , add, delete all we want but changes will only be saved if we commit them.
  const commitChangesHandler = async ({ changed, deleted }) => {
    try {
      let changedRows;
      if (changed) {
        //get the row index of the changed row
        const rowIndex = Object.keys(changed)[0];
        //fire a query to update the member
        //the query function expects a query string which we get with getter getUpdateMemberMutation()
        //the getter expects the userId and an object with the changes
        const resData = await updateMember(
          getUpdateMemberMutation(rows[rowIndex].userId, changed[rowIndex])
        );
        //graphql always resolves with status 200, so we add extra step to check if it returned errors
        if (resData.errors) {
          throw resData.errors;
        }
        //Success, finally!
        console.log("[commitChangesHandler]: Edited!");

        //copy the old rows
        changedRows = [...rows];
        const changesFromServer = {};
        const keys = Object.keys(changed[rowIndex]);
        //for each key in our proposed changes object (changed[rowIndex]),
        keys.forEach(key => {
          //we only update changes that the server responded with a value that is not null
          if (resData.data.updateGymUser[key]) {
            changesFromServer[key] = resData.data.updateGymUser[key];
          }
          //we do this because in our proposed changes object we may have 'membersip_duration: "30 days"' (this happens when editing)
          //but the server returns a date string
          //we dont want to merge our proposed changes object but the actual data received from the server
        });
        //we replace the row we are trying to change with the updated data
        changedRows[rowIndex] = {
          ...changedRows[rowIndex],
          ...changesFromServer
        };
        setRows(changedRows);
      }

      if (deleted) {
        const rowIndex = deleted[0];
        const uniqueId = rows[rowIndex].id; //get the unique id not the userId
        const resData = await deleteUser(getDeleteUserMutation(uniqueId));
        if (resData.errors) {
          throw resData.errors;
        }
        console.log("[commitChangesHandler]: Deleted!");
        changedRows = [...rows];
        changedRows.splice(rowIndex, 1);
        setRows(changedRows);
      }
    } catch (err) {
      console.log("[commitChangesHandler]: Error! ", [err]);
    }
  };

  return (
    <Layout loading={loading || !called} error={error}>
      <div className="DxGrid">
        {called && data ? (
          <Paper>
            <Grid rows={rows} columns={columns}>
              <SortingState
                defaultSorting={[
                  { columnName: MEMBERSHIP_DURATION, direction: "desc" }
                ]}
              />
              <PagingState defaultCurrentPage={0} defaultPageSize={10} />
              <EditingState
                editingRowIds={editingRowIds}
                onEditingRowIdsChange={getEditingRowIds}
                rowChanges={rowChanges}
                onRowChangesChange={setRowChanges}
                onCommitChanges={commitChangesHandler}
                columnExtensions={editingStateColumnExtensions}
              />

              <FilteringState />

              <IntegratedSorting />
              <IntegratedFiltering
                columnExtensions={integratedFilteringColumnExtensions}
              />
              <IntegratedPaging />

              <StudentTypeProvider for={studentCols} />
              <BranchProvider for={branchCols} />
              <MembershipDurationProvider for={membershipDurationCols} />

              <Table
                columnExtensions={tableColumnExtensions}
                containerComponent={
                  loadingUpdate.isLoading || loadingDelete.isLoading
                    ? Spinner3
                    : Table.Container
                }
              />
              <TableHeaderRow showSortingControls />
              <TableEditRow cellComponent={EditCell} />
              <TableEditColumn
                showEditCommand={
                  localStorage.getItem(GYM_ROLE) === GYM_ADMIN ||
                  localStorage.getItem(GYM_ROLE) === "administrator"
                }
                showDeleteCommand={
                  localStorage.getItem(GYM_ROLE) === GYM_ADMIN ||
                  localStorage.getItem(GYM_ROLE) === "administrator"
                }
                commandComponent={Command}
              />
              <PagingPanel pageSizes={pageSizes} />
              <TableFilterRow cellComponent={FilterCell} />
            </Grid>
          </Paper>
        ) : (
          ""
        )}
      </div>
    </Layout>
  );
};

export default DxGrid;
