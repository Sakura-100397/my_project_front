import axios from "axios";

// レスポンスインターセプターでエラーハンドリングを行う
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // エラー時にメッセージをカスタマイズ
    return Promise.reject(error.response?.data?.msg || '時間をおいてお試しください。');
  }
);

const ENDPOINT_URL = "/api/employees"; // URLの先頭の空白を削除

const employeeApi = {
  // 全ての従業員情報を取得
  async getAll() {
    try {
      const result = await axios.get(ENDPOINT_URL);
      return result.data;
    } catch (error) {
      throw error; // エラーを上位に投げる
    }
  },

  async get(id) {
    try {
      const result = await axios.get(`${ENDPOINT_URL}/${id}`);
      return result.data;
    } catch (error) {
      throw error; // エラーを上位に投げる
    }
  },

  // 新しい従業員情報をPOSTで送信
  async post(employee) {
    try {
      const result = await axios.post(ENDPOINT_URL, employee);
      return result.data;
    } catch (error) {
      throw error; // エラーを上位に投げる
    }
  },
};

export default employeeApi;
