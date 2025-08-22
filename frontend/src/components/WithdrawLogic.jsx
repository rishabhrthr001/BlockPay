import axios from "axios";
import BASE_URL from "../utils/apiConfig";

export const WithdrawLogic = async (amount, token, userAddress) => {
  if (!userAddress) {
    throw new Error("User address is required for token transfer");
  }

  try {
    const dbResponse = await axios.post(
      `${BASE_URL}/api/withdraw`,
      { amount },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const txResponse = await axios.post(
      `${BASE_URL}/freebies/send-reward`,
      { userAddress, amount },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return {
      db: dbResponse.data,
      tx: txResponse.data,
    };
  } catch (err) {
    console.error("Withdraw/Reward failed:", err.response?.data || err.message);
    throw err;
  }
};
