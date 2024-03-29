import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Profile from "./index";

describe("Profile", () => {
  const contact = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    age: 30,
    phone: "555-1234",
  };

  const navigation = {
    navigate: jest.fn(),
  };

  it("renders profile details", () => {
    const { getByText } = render(
      <Profile route={{ params: { contactId: 1 } }} contacts={[contact]} />
    );

    expect(getByText("John Doe")).toBeTruthy();
    expect(getByText("30 Years Old")).toBeTruthy();
    expect(getByText("555-1234")).toBeTruthy();
  });

  it("navigates to edit screen on edit button press", () => {
    const { getByTestId } = render(
      <Profile
        route={{ params: { contactId: 1 } }}
        contacts={[contact]}
        navigation={navigation}
      />
    );

    fireEvent.press(getByTestId("edit-button"));

    expect(navigation.navigate).toHaveBeenCalledWith("edit-contact", {
      contact,
    });
  });

  it("shows alert on delete error", async () => {
    const dispatch = jest
      .fn()
      .mockRejectedValueOnce(new Error("Failed to delete"));

    const { getByTestId } = render(
      <Profile
        route={{ params: { contactId: 1 } }}
        contacts={[contact]}
        dispatch={dispatch}
      />
    );

    fireEvent.press(getByTestId("delete-button"));

    await expect(dispatch).toHaveBeenCalled();
    expect(alert).toHaveBeenCalledWith(
      "Failed to delete contact. Please try again later."
    );
  });
});
