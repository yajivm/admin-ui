import { fireEvent, render, screen } from '@testing-library/react';
import TextBox from './TextBox';

const mockHandleInputChange = jest.fn();
const mockProps = {
  field: 'test',
  handleInputChange: mockHandleInputChange,
  Id: '1',
  testID: 'text-input',
  value: 'test',
};

describe('TextBox', ()=> {
  it('should render the component', () => {
    render(<TextBox {...mockProps} />);

    expect(screen.getByTestId('text-input')).toBeInTheDocument();
  });

  it.skip('should trigger handleInputChange function when input value changes', async () => {
    render(<TextBox {...mockProps} />);

    fireEvent.change(screen.getByTestId('text-input'), { target: { value: 'test' }});
    
    expect(mockHandleInputChange).toHaveBeenCalledWith(mockProps.field, 'test', mockProps.Id);
  });
});
