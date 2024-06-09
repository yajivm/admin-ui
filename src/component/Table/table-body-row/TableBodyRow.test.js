import { render, screen} from "@testing-library/react";
//
import TableBodyRow from "./TableBodyRow";

jest.mock('../../Button', () => props => <div data-testid="mock-button" {...props} />);
jest.mock('../../TextBox', () => props => <div data-testid="mock-textbox" {...props} />);
jest.mock('../../CheckBox', () => props => <div data-testid="mock-checkbox" {...props} />);

const mockSelectTabelRow = jest.fn();
const mockHandleDeleteTableRow = jest.fn();
const mockHandleEditRow = jest.fn();
const mockHandleCancelEdit = jest.fn();
const mockHandleSaveRowData = jest.fn();

const list = {
  name: 'testName',
  email: 'test@email.com',
  role: 'testing',
  id: 1,
};

let mockProps = {
  editableRowData: { action: 'DEFAULT', id: '' },
  tableCellData: list,
  onSelectTabelRow: mockSelectTabelRow,
  handleDeleteTableRow: mockHandleDeleteTableRow,
  handleEditRow: mockHandleEditRow,
  handleCancelEdit: mockHandleCancelEdit,
  handleSaveRowData: mockHandleSaveRowData,
  screenSize: 1200,
  isCheckBoxDisabled: false,
}

describe('TableBodyRow', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render the component', () => {
    render(<TableBodyRow {...mockProps} />);

    screen.getByTestId('mock-checkbox');
    screen.getByText('testName');
    screen.getByText('test@email.com');
    screen.getByText('testing');
    expect(screen.getAllByTestId('mock-button')).toHaveLength(2);
  });

  it('should render the textbox when edit action is true', () => {
    mockProps = {
      ...mockProps,
      editableRowData: { action: 'EDIT', id: 1 },
    };
    render(<TableBodyRow {...mockProps} />);

    screen.getByTestId('mock-checkbox');
    expect(screen.getAllByTestId('mock-textbox')).toHaveLength(3);
    expect(screen.getAllByTestId('mock-button')).toHaveLength(2);
  });
});