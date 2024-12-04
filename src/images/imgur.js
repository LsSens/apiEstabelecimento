const axios = require("axios");

const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID;

const uploadToImgur = async (imageBase64) => {
  try {
    const response = await axios.post(
      "https://api.imgur.com/3/image",
      { image: imageBase64 },
      {
        headers: {
          Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
        },
      }
    );
    return response.data.data.link;
  } catch (error) {
    console.error(
      "Erro ao fazer upload para o Imgur:",
      error.response?.data || error.message
    );
    throw new Error("Erro ao fazer upload da imagem.");
  }
};

module.exports = uploadToImgur;
