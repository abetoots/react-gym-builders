import gql from "graphql-tag";

import AUTH_TOKEN from "./constants";
import REFRESH_TOKEN from "./constants";
import JWT_AUTH_EXPIRATION from "./constants";
import FULL_NAME from "./constants";
import BRANCH from "./constants";
import MEMBERSHIP_DURATION from "./constants";
import GYM_ROLE from "./constants";
import GYM_MEMBER from "./constants";
import IS_STUDENT from "./constants";
import GYM_MEMBER_FIELDS from "./constants";

export const getLoginMutation = (login, password) => {
  return `
    mutation LoginUser{
      login(
        input: {
          clientMutationId: ""
          username: "${login}"
          password: "${password}"
        }
      ) {
        ${AUTH_TOKEN}
        ${REFRESH_TOKEN}
        user {
            ${JWT_AUTH_EXPIRATION}
            ${GYM_ROLE}
        }
      }
    }
  `;
};

export const getRefreshMutation = () => {
  return `
    mutation RefreshToken {
      refreshJwtAuthToken(
        input: { clientMutationId: "", jwtRefreshToken: "${localStorage.getItem(
          REFRESH_TOKEN
        )}" }
      ) {
        ${AUTH_TOKEN}
      }
    }
  `;
};

export const getCreateMemberMutation = data => {
  return `
    mutation MyMutation {
        __typename
        createGymUser(
            input: {
                clientMutationId: "", branch: "${data[BRANCH] || ""}", 
                full_name: "${data[FULL_NAME] || ""}", 
                is_student: ${data[IS_STUDENT] || null}, 
                membership_duration_preset: "${data[
                  "membership_duration_preset"
                ] || ""}", 
                gym_role: "${GYM_MEMBER}", 
                membership_duration_specific: "${
                  data["membership_duration_specific"]
                    ? data["membership_duration_specific"].toDateString()
                    : ""
                }"
            }) {
            userId
        }
    }
    `;
};

export const getUpdateMemberMutation = (userId, dataChange) => {
  return `
    mutation MutateGymUser {
        __typename
        updateGymUser(
            input: {
                clientMutationId: "", 
                userId: ${+userId || null}, 
                membership_duration: 
                "${dataChange[MEMBERSHIP_DURATION] || ""}", 
                full_name: "${dataChange[FULL_NAME] || ""}"
            })
                {
            membership_duration
            full_name
        }
    }
    `;
};

export const getDeleteUserMutation = uniqueId => {
  // this is not the same as user's database ID
  return `
    mutation DeleteUser {
        __typename
        deleteUser(input: {clientMutationId: "", id: "${uniqueId}"}) {
            deletedId
        }
    }
    `;
};

//The actual query - used as rows for our table
export const GET_GYM_MEMBERS_QUERY = gql`
  {
    users(where: { roleIn: GYM_MEMBER }, first: 9999) {
      nodes {
        ${GYM_MEMBER_FIELDS}
      }
    }
  }
`;
