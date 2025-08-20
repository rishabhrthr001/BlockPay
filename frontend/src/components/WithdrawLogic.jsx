import axios from "axios";

export const WithdrawLogic = async (amount, token) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/withdraw",
      { amount },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (err) {
    console.error("Withdraw failed:", err);
    throw err;
  }
};
