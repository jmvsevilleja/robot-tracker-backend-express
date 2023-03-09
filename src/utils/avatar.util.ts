import axios from "axios";

export const getAvatarUrl = async (name: string): Promise<string> => {
  const response = await axios.get(
    `https://avatars.dicebear.com/api/bottts/${name}.svg`
  );

  if (response.status === 200) {
    return response.request.res.responseUrl;
  } else {
    throw new Error("Failed to retrieve avatar");
  }
};
