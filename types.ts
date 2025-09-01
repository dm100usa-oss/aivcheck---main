export type CheckItem = {
  name: string;                         // Name of the check (e.g. "Robots.txt")
  status: "Good" | "Moderate" | "Poor"; // Result category
  explanation: string;                  // Short explanation for the user
};
