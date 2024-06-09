import { render, screen } from "@testing-library/react";
//
import EmptyContainer from "./EmptyContainer";

describe('EmptyContainer', () => {
  it('should render the component', () => {
    render(<EmptyContainer />);

    expect(screen.getByText('No users found')).toBeInTheDocument();
  });
});
