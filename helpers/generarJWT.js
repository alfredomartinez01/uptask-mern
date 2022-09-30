import jwt from "jsonwebtoken";

const generarJWT = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "30d" // Solo lo ponemos si queremos que expire
    });
};

export default generarJWT;