import ajax from '../helpers/ajaxHelpers';

const getUsersListService = async () => {
    const response = await ajax.get('adminui-problem/members.json');

    return response;
};

export {
  getUsersListService,
};