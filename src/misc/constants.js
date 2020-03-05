import gql from "graphql-tag";

/**
 * Gym user types keys
 */
export const GYM_MEMBER = "gym_member";
export const GYM_TRAINER = "gym_trainer";
export const GYM_ADMIN = "gym_admin";

/**
 * Gym member meta keys / WPGraphQl keys
 */
export const FULL_NAME = "full_name";
export const MEMBERSHIP_DURATION = "membership_duration";
export const IS_STUDENT = "is_student";
export const GYM_ROLE = "gym_role";
export const BRANCH = "branch";
export const GYM_MEMBER_FIELDS = `full_name
                            is_student
                            membership_duration
                            id
                            gym_role
                            branch
                            userId
                            `;
export const JWT_AUTH_EXPIRATION = "jwtAuthExpiration";
export const REFRESH_TOKEN = "refreshToken";
export const GYM_USER_ALLOWED_EDITABLE_FIELDS = [
  FULL_NAME,
  MEMBERSHIP_DURATION
];
export const AUTH_TOKEN = "authToken";

/**
 * Queries
 */
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

export const getCreateMemberMutation = (data, role) => {
  return `
    mutation MyMutation {
        __typename
        createGymUser(
            input: {
                clientMutationId: "", branch: "${data[BRANCH]}", 
                full_name: "${data[FULL_NAME]}", 
                is_student: ${data[IS_STUDENT]}, 
                membership_duration_preset: "${data["membership_duration_preset"]}", 
                gym_role: "${role}", 
                membership_duration_specific: "${data["membership_duration_specific"]}"
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
                userId: ${+userId}, 
                membership_duration: "${dataChange[MEMBERSHIP_DURATION]}"}, 
                full_name: "${dataChange[FULL_NAME]}") 
                {
            membership_duration
        }
    }
    `;
};

export const getDeleteUserMutation = userId => {
  return `
    mutation DeleteUser {
        __typename
        deleteUser(input: {clientMutationId: "", id: "${userId}"}) {
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

/**
 * Shared
 */
export const PLUGIN_PREFIX = "builders_plugin";
export const ACTION_REGISTER_GYM_MEMBER =
  "builders_do_action_register_gym_member";
export const ACTION_AJAX_REGISTER_GYM_MEMBER =
  "builders_do_action_register_gym_member_app";
export const VALIDDATEFORMAT = "Ymd";
