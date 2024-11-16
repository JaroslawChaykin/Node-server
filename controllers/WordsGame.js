import fs from "fs";

export const findWord = async (req, res) => {
  try {
    const words = fs.readFileSync("./assets/russian.json");
    const searchWord = req.params.word;
    const isFindWord = JSON.parse(words).data.includes(searchWord);

    res.status(200).send(isFindWord);
  } catch (err) {
    res.status(500).json({
      message: "something went wrong",
    });
  }
};

export const getLevel = async (req, res) => {
  try {
    const words = fs.readFileSync("./assets/levels.json");
    const level = req.params.level;
    const foundedLevel = JSON.parse(words)[level];

    if (!foundedLevel) {
      return res.status(404).json({
        message: "Level not found",
      });
    }

    res.status(200).send(foundedLevel);
  } catch (err) {
    res.status(500).json({
      message: "something went wrong",
    });
  }
};
