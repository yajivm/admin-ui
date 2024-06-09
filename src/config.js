const BASE_URL = 'https://geektrust.s3-ap-southeast-1.amazonaws.com';
const NON_EDITABLE_FIELD_NAME = 'admin';
const EDIT_ROW = 'EDIT';
const DEFAULT_ACTION = 'DEFAULT';
const USER_TABLE_HEAD = ['Name', 'Email', 'Role', 'Actions'];
const ROW_COUNT_PER_PAGE = 10;
const DOTS = '...';

const config = {
  DOTS,
  EDIT_ROW,
  DEFAULT_ACTION,
  BASE_URL,
  NON_EDITABLE_FIELD_NAME,
  USER_TABLE_HEAD,
  ROW_COUNT_PER_PAGE,
};

export default config;
