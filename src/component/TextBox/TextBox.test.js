import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextBox from './TextBox';

const mockHandleInputChange = jest.fn();
const mockProps = {
  field: 'test',
  handleInputChange: mockHandleInputChange,
  Id: '1',
  testID: 'text-input',
  value: '',
};

describe('TextBox', ()=> {
  it('should render the component', () => {
    render(<TextBox {...mockProps} />);

    screen.getByTestId('text-input')
  });

  it('should trigger handleInputChange function when input value changes', () => {
    render(<TextBox {...mockProps} />);

    userEvent.type(screen.getByTestId('text-input'), 'test');
    
    expect(mockHandleInputChange).toHaveBeenCalledWith(mockProps.field, 'test', mockProps.Id);
  });
});
