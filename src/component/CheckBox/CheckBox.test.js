import { render, screen, fireEvent } from "@testing-library/react";
//
import CheckBox from "./CheckBox";

const mockCheckBoxChangeFn = jest.fn();

describe("Checkbox", () => {
  it('should render checkbox component', () => {
    render(<CheckBox handleCheckboxChange={mockCheckBoxChangeFn} checked={false} />);

    expect(screen.getByTestId('user-box')).toBeInTheDocument();
    expect(screen.getByTestId('user-box-wrapper').classList.contains('disabled')).toBeFalsy();
  });

  it('should call handleCheckboxChange function when user check checkbox', () => {
    render(<CheckBox handleCheckboxChange={mockCheckBoxChangeFn} checked={false} />);

    fireEvent.click(screen.getByTestId('user-box'));

    expect(mockCheckBoxChangeFn).toHaveBeenCalled();
  });

  it('should checkbox disabled when isCheckBoxDisabled prop is true', ()=> {
    render(<CheckBox handleCheckboxChange={mockCheckBoxChangeFn} checked={false} isCheckBoxDisabled />);

    expect(screen.getByTestId('user-box-wrapper').classList.contains('disabled')).toBeTruthy();
  });
});
