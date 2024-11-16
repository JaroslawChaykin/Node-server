import jwt from "jsonwebtoken";

export default (req, res, next) => {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
    console.log(token, req.headers);

    if (token) {
        try {
            const decoded = jwt.verify(token, "secret123");

            req.userId = decoded._id;

            next();
        } catch (err) {
            next();
        }
    } else {
        next();
    }
};