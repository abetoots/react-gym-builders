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
  Toolbar,
  SearchPanel,
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
  SearchState,
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
import { tokenCache } from "../../hooks/auth";
import { useLazyFetchQuery } from "../../hooks/util";
import { useStore } from "../../store/store";

import {
  GET_GYM_MEMBERS_QUERY,
  FULL_NAME,
  MEMBERSHIP_DURATION,
  IS_STUDENT,
  BRANCH,
  GYM_ADMIN,
  GYM_ROLE,
  getUpdateMemberMutation,
  GYM_TRAINER,
  getDeleteUserMutation
} from "../../misc/constants";

const DxGrid = () => {
  const [globalState, dispatch] = useStore("users");

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

  const [
    updateMember,
    { loading: loadingUpdate, success: successUpdate, error: errorUpdate }
  ] = useLazyFetchQuery(BASE_URL, tokenCache.token);

  const [
    deleteUser,
    { loading: loadingDelete, success: successDelete, error: errorDelete }
  ] = useLazyFetchQuery(BASE_URL, tokenCache.token);

  //State management plugins  https://devexpress.github.io/devextreme-reactive/react/grid/docs/guides/plugin-overview/
  //Handle state changes in our table, provided by dx-react-grid
  const [editingRowIds, getEditingRowIds] = useState([]); //IDs of the rows being edited.
  const [rowChanges, setRowChanges] = useState({}); //Not committed row changes.
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
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
        //get index of the changed row
        const index = Object.keys(changed)[0];
        //get the userId needed for our updating user meta
        const userId = rows[index].userId;
        await updateMember(getUpdateMemberMutation(userId, changed[index]));
        console.log("[commitChangesHandler]: Edited!");
        changedRows = [...rows];
        changedRows[index] = { ...changedRows[index], ...changed[index] };
        setRows(changedRows);
      } // end if changed

      if (deleted) {
        const index = deleted[0];
        await deleteUser(getDeleteUserMutation(index));
        console.log("[commitChangesHandler]: Deleted!");
        changedRows = [...rows];
        changedRows.splice(index, 1);
        setRows(changedRows);
      }
    } catch (err) {
      console.log(err);
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
              <PagingState
                onCurrentPageChange={setCurrentPage}
                pageSize={pageSize}
              />
              <EditingState
                editingRowIds={editingRowIds}
                onEditingRowIdsChange={getEditingRowIds}
                rowChanges={rowChanges}
                onRowChangesChange={setRowChanges}
                onCommitChanges={commitChangesHandler}
                columnExtensions={editingStateColumnExtensions}
              />

              <SearchState />
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
              <Toolbar />
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
              <SearchPanel />
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
