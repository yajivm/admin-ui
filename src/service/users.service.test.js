import ajax from  '../helpers/ajaxHelpers';
import { getUsersListService } from './users.service';

const mockAjaxCall = jest.spyOn(ajax, 'get');

test('should return boolen value when call scrollReachedBottom method', async () => {
    mockAjaxCall.mockReturnValueOnce({});

    await getUsersListService();

    expect(mockAjaxCall).toHaveBeenCalledTimes(1);
    expect(mockAjaxCall).toHaveBeenCalledWith('adminui-problem/members.json');
});
