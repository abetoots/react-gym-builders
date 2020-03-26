//!DO NOT MODIFY
export const JWT_AUTH_EXPIRATION = "jwtAuthExpiration";
export const REFRESH_TOKEN = "refreshToken";
export const AUTH_TOKEN = "authToken";

//Your code below

export const AUTH_STORE = "auth";
export const USERS_STORE = "users";

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

export const THIRTY_DAYS = "30 days";
export const NINETY_DAYS = "90 days";
export const HALF_YEAR = "180 days";
export const ONE_YEAR = "1 year";

export const GYM_USER_ALLOWED_EDITABLE_FIELDS = [
  FULL_NAME,
  MEMBERSHIP_DURATION
];

/**
 * Shared
 */
export const PLUGIN_PREFIX = "builders_plugin";
export const ACTION_REGISTER_GYM_MEMBER =
  "builders_do_action_register_gym_member";
export const ACTION_AJAX_REGISTER_GYM_MEMBER =
  "builders_do_action_register_gym_member_app";
export const VALIDDATEFORMAT = "Ymd";
