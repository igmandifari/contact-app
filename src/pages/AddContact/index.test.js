import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AddContact from "./index";

describe("AddContact", () => {
  it("renders header text", () => {
    const { getByText } = render(<AddContact />);
    expect(getByText("Add Contacts")).toBeTruthy();
  });

  it("updates first name value when input changes", () => {
    const { getByPlaceholderText } = render(<AddContact />);
    const input = getByPlaceholderText("First Name");
    fireEvent.changeText(input, "John");
    expect(input.props.value).toBe("John");
  });

  it("updates last name value when input changes", () => {
    const { getByPlaceholderText } = render(<AddContact />);
    const input = getByPlaceholderText("Last Name");
    fireEvent.changeText(input, "Doe");
    expect(input.props.value).toBe("Doe");
  });

  it("updates age value when input changes", () => {
    const { getByPlaceholderText } = render(<AddContact />);
    const input = getByPlaceholderText("Age");
    fireEvent.changeText(input, "30");
    expect(input.props.value).toBe("30");
  });

  it("calls uploadToImgur when upload button is pressed", () => {
    const uploadToImgur = jest.fn();
    const { getByText } = render(<AddContact uploadToImgur={uploadToImgur} />);
    const button = getByText("Upload to Imgur");
    fireEvent.press(button);
    expect(uploadToImgur).toHaveBeenCalled();
  });

  it("dispatches addContactAsync when save is pressed", () => {
    const dispatch = jest.fn();
    const { getByText } = render(<AddContact dispatch={dispatch} />);
    fireEvent.press(getByText("Save"));
    expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
  });
});
