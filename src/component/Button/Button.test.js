import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

const mockButtonClickFn = jest.fn();

describe("Button", () => {
  it('should render butten with text component when isButtonWithText is true', () => {
    render(<Button onClick={mockButtonClickFn} testID="button" isButtonWithText buttonText="ButtonText" />);

    const btn = screen.getByRole('button');
    expect(btn).toHaveTextContent('ButtonText');
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('should render butten with img component when isButtonWithText is false and buttonImage is valid', () => {
    render(<Button onClick={mockButtonClickFn} testID="button" buttonImage='img.png' />);

    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(btn.type).toStrictEqual('button');
  });

  it('should render null component when both isButtonWithText and buttonImage is not valid', () => {
    render(<Button onClick={mockButtonClickFn} testID="button" />);

    expect(screen.queryByRole('button')).toBeNull();
  });

  it('should call the onClick prop event when button is clicked', () => {
    render(<Button onClick={mockButtonClickFn} testID="buttonEl" isButtonWithText buttonText="ButtonText" />);

    fireEvent.click(screen.getByTestId('buttonEl'));

    expect(mockButtonClickFn).toHaveBeenCalled();
  });

  it('should button type is submit when isSubmitButton prop is true in image button', () => {
    render(<Button onClick={mockButtonClickFn} testID="buttonEl" buttonImage='img.png' isSubmitButton />);

    const btn = screen.getByTestId('save-button');

    expect(btn.type).toStrictEqual('submit');
  });
});
