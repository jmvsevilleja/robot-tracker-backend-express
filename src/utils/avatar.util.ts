import axios from "axios";

export enum avatarType {
  MALE = "male",
  FEMALE = "female",
}

export const getAvatarUrl = async (
  name: string,
  type: avatarType = avatarType.MALE
): Promise<string> => {
  const response = await axios.get(
    `https://avatars.dicebear.com/api/${type}/${name}.svg`
  );

  if (response.status === 200) {
    return response.request.res.responseUrl;
  } else {
    throw new Error("Failed to retrieve avatar");
  }
};
