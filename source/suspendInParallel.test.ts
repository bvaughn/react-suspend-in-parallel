import suspendInParallel from "./suspendInParallel";

describe("suspendInParallel", () => {
  it("should call all callbacks before re-throwing any thrown value", () => {
    const callbackA = jest.fn();
    const callbackB = jest.fn().mockImplementation(() => {
      throw Error("Expected error");
    });
    const callbackC = jest.fn();

    expect(() => {
      suspendInParallel(callbackA, callbackB, callbackC);
    }).toThrow("Expected error");

    expect(callbackA).toHaveBeenCalled();
    expect(callbackB).toHaveBeenCalled();
    expect(callbackC).toHaveBeenCalled();
  });

  it("should return all values if none of the callbacks suspend", () => {
    const callbackA = () => 123;
    const callbackB = () => "abc";

    const [a, b] = suspendInParallel(callbackA, callbackB);

    expect(a).toEqual(123);
    expect(b).toEqual("abc");
  });
});
