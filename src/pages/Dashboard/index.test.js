describe("Dashboard", () => {
  it("renders header text", () => {
    const { getByText } = render(<Dashboard />);
    expect(getByText("Contact App")).toBeTruthy();
  });

  it("renders subheader text with contact count", () => {
    const { getByText } = render(<Dashboard />);
    expect(getByText("There are 0 contacts with id")).toBeTruthy();
  });

  it("dispatches fetchContactsAsync on mount", () => {
    const dispatch = jest.fn();
    render(<Dashboard dispatch={dispatch} />);
    expect(dispatch).toHaveBeenCalledWith({ type: "contacts/fetchContactsAsync" });
  });

  it("renders loading state", () => {
    const { getByText } = render(<Dashboard status="loading" />);
    expect(getByText("Loading...")).toBeTruthy();
  });

  it("renders error state", () => {
    const { getByText } = render(<Dashboard status="failed" />);
    expect(getByText("Loading...")).toBeTruthy();
  });

  it("renders contacts list", () => {
    const contacts = [{ id: 1, firstName: "John", lastName: "Doe" }];
    const { getByText } = render(<Dashboard contacts={contacts} />);
    expect(getByText("John Doe")).toBeTruthy();
  });

  it("searches contacts", () => {
    const contacts = [{ id: 1, firstName: "John", lastName: "Doe" }];
    const { getByText, queryByText } = render(
      <Dashboard contacts={contacts} />
    );

    fireEvent.changeText(getByText("Search contacts"), "John");
    expect(queryByText("John Doe")).toBeTruthy();

    fireEvent.changeText(getByText("Search contacts"), "Jane");
    expect(queryByText("John Doe")).toBeFalsy();
  });

  it("sorts contacts by first name", () => {
    const contacts = [
      { id: 1, firstName: "John", lastName: "Doe" },
      { id: 2, firstName: "Jane", lastName: "Doe" },
    ];
    const { getAllByText } = render(<Dashboard contacts={contacts} />);

    const [first, second] = getAllByText(/(John|Jane) Doe/);
    expect(first).toHaveTextContent("Jane Doe");
    expect(second).toHaveTextContent("John Doe");
  });
});
