import pkg from "jsonwebtoken";
const {verify} = pkg;
export const auth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ success: false, message: "Token not found" });
  }

  try {
    const decoded = verify(token,process.env.SECRETE_KEY);
    req.user = {data:decoded,token:token}; // Optional: attach user info to request

    next();
    return res.json({success: true,message:req.user})
  } catch (error) {
    return res.json({ success: false, message: "Token verification failed" });
  }
};
