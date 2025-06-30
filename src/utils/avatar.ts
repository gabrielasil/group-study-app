import { User } from "../types";

const avatarColors = [
  "F44336",
  "E91E63",
  "9C27B0",
  "673AB7",
  "3F51B5",
  "2196F3",
  "00BCD4",
  "009688",
  "4CAF50",
  "8BC34A",
  "CDDC39",
  "FFC107",
  "FF9800",
  "FF5722",
  "795548",
  "607D8B",
];

export const getAvatarUrl = (user: User) => {
  if (!user || !user.id || !user.name) {
    return ""; // Return a default or empty avatar if user data is incomplete
  }
  const nameForApi = user.name.replace(/\s/g, "+");
  // Simple hash from user ID to get a consistent color
  const colorIndex =
    user.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    avatarColors.length;
  const color = avatarColors[colorIndex];
  return `https://ui-avatars.com/api/?name=${nameForApi}&background=${color}&color=fff&bold=true`;
};
