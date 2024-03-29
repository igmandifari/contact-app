import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import EditContact from "./index";

describe("EditContact", () => {
  const contact = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    age: 30,
    photo: "https://example.com/photo.jpg",
  };

  const navigation = {
    goBack: jest.fn(),
    navigate: jest.fn(),
  };

  it("renders header text", () => {
    const { getByText } = render(
      <EditContact route={{ params: { contact } }} />
    );
    expect(getByText("Edit Contacts")).toBeTruthy();
  });

  it("prefills form with contact data", () => {
    const { getByPlaceholderText } = render(
      <EditContact route={{ params: { contact } }} />
    );
    expect(getByPlaceholderText("First Name").props.value).toBe("John");
    expect(getByPlaceholderText("Last Name").props.value).toBe("Doe");
    expect(getByPlaceholderText("Age").props.value).toBe("30");
  });

  it("updates first name when input changes", () => {
    const { getByPlaceholderText } = render(
      <EditContact route={{ params: { contact } }} />
    );
    const input = getByPlaceholderText("First Name");
    fireEvent.changeText(input, "Jane");
    expect(input.props.value).toBe("Jane");
  });

  it("updates last name when input changes", () => {
    const { getByPlaceholderText } = render(
      <EditContact route={{ params: { contact } }} />
    );
    const input = getByPlaceholderText("Last Name");
    fireEvent.changeText(input, "Smith");
    expect(input.props.value).toBe("Smith");
  });

  it("updates age when input changes", () => {
    const { getByPlaceholderText } = render(
      <EditContact route={{ params: { contact } }} />
    );
    const input = getByPlaceholderText("Age");
    fireEvent.changeText(input, "25");
    expect(input.props.value).toBe("25");
  });

  it("calls navigation.goBack and navigate on successful update", async () => {
    const dispatch = jest.fn().mockResolvedValueOnce();
    const { getByText } = render(
      <EditContact
        route={{ params: { contact } }}
        dispatch={dispatch}
        navigation={navigation}
      />
    );
    fireEvent.press(getByText("Update"));
    expect(navigation.goBack).toHaveBeenCalled();
    expect(navigation.navigate).toHaveBeenCalledWith("dashboard");
  });

  it("shows alert on failed update", async () => {
    const dispatch = jest
      .fn()
      .mockRejectedValueOnce(new Error("Failed to update"));
    const { getByText } = render(
      <EditContact route={{ params: { contact } }} dispatch={dispatch} />
    );
    fireEvent.press(getByText("Update"));
    expect(dispatch).toHaveBeenCalled();
    expect(alert).toHaveBeenCalledWith(
      "Failed to update contact. Please try again later."
    );
  });
});
