import getWindowSize from './utils';

window.innerWidth = 500;
// fireEvent(window, new Event('resize'));
describe('Utils', () => {
  it('should return screen size when call getWindowSize', () => {
    const result = getWindowSize();
    
    expect(result).toStrictEqual({ innerWidth: 500 });
  });
});
