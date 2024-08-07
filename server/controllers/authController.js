import bcrypt from "bcrypt";
import path from "path";
import { pool } from "../db.js";
// import { limiterConsecutiveFailsByUsernameAndIP } from "../middleware/rate-limiter.js";
import HOST_URL from "../config.js";
import { __dirname } from "../utils/dirname.js";

// import the newly added FileType package from the package.json
import { fileTypeFromBuffer } from "file-type";
/**
 * @desc Login user
 * @route POST /api/auth/login
 */
export const login = async (req, res, next) => {
  try {
    const { email, password, recaptchaToken } = req.body;

    // Email regex pattern
    const emailRegex =
      /^[a-zA-Z\d._%+-]+(?:[a-zA-Z\d._%+-]*[a-zA-Z\d])?@[a-zA-Z\d-]+(\.[a-zA-Z\d-]+)*\.[a-zA-Z]{2,}$/;

    // Email regex validation
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Password regex pattern
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{12,64}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "Invalid password format" });
    }

    // if (!recaptchaToken)
    //   return res.status(400).json({ message: "Recaptcha token is required" });

    // // Check if recaptcha token is valid
    // // FROM https://developers.google.com/recaptcha/docs/verify
    // const captchaResponse = await fetch(
    //   `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SITE_KEY_V2}&response=${recaptchaToken}`,
    //   {
    //     method: "POST",
    //   }
    // );

    // const captchaData = await captchaResponse.json();

    // if (!captchaData.success)
    //   return res
    //     .status(400)
    //     .json({ message: "Invalid recaptcha token", captchaData: captchaData });

    // Check if email exists
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    // If no rows are found, return an error
    if (rows.length === 0) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    // Check if password is correct
    const match = await bcrypt.compare(password, rows[0].password);

    // If password is incorrect, return an error
    if (!match) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    // assuming that the user is authenticated, delete the consecutive fails
    // await limiterConsecutiveFailsByUsernameAndIP.delete(email, req.ip);

    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.regenerate(function (err) {
      if (err) next(err);

      // store user information in session, typically a user id
      req.session.user = {
        email: email,
        role: rows[0].role,
        first_name: rows[0].first_name,
        last_name: rows[0].last_name,
        id: rows[0].id,
      };

      // save the session before sending the response
      // load does not happen before session is saved
      req.session.save(function (err) {
        if (err) return next(err);
        // console.log(req.session);

        res.status(200).json({ message: "User logged in successfully" });
      });
    });
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};

/**
 * @desc Register user
 * @route POST /api/auth/register
 */

export const register = async (req, res, next) => {
  try {
    // Destructures the request body
    const { email, first_name, last_name, phone, password } = req.body;

    // Name regex pattern
    const nameRegex = /^[A-Za-z]+(?:[\s-][A-Za-z]+)*$/;

    // First name regex validation
    if (!nameRegex.test(first_name)) {
      return res.status(400).json({ message: "Invalid first name format" });
    }

    // Last name regex validation
    if (!nameRegex.test(last_name)) {
      return res.status(400).json({ message: "Invalid last name format" });
    }

    // Email regex pattern
    const emailRegex =
      /^[a-zA-Z\d._%+-]+(?:[a-zA-Z\d._%+-]*[a-zA-Z\d])?@[a-zA-Z\d-]+(\.[a-zA-Z\d-]+)*\.[a-zA-Z]{2,}$/;

    // Email regex validation
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Password regex pattern
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{12,64}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "Invalid password format" });
    }

    // Convert phone number format
    let convertedPhone = phone;
    const phoneNumberRegexConvert1 = /^\+6309\d{9}$/;
    const phoneNumberRegexConvert2 = /^\+639\d{9}$/;
    const phoneNumberRegexConvert3 = /^9\d{9}$/;

    if (phoneNumberRegexConvert1.test(phone)) {
      // Convert +6309123456789 to 09123456789
      convertedPhone = phone.replace(/^\+6309/, "09");
    } else if (phoneNumberRegexConvert2.test(phone)) {
      // Convert +639123456789 to 09123456789
      convertedPhone = phone.replace(/^\+639/, "09");
    } else if (phoneNumberRegexConvert3.test(phone)) {
      // Convert 9123456789 to 09123456789
      convertedPhone = "0" + phone;
    }

    // Phone number regex pattern (09xxxxxxxxx format)
    const phoneRegex = /^09\d{9}$/;
    if (!phoneRegex.test(convertedPhone)) {
      return res.status(400).json({ message: "Invalid phone number format" });
    }

    // Checks if email already exists
    const [existingUsers] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Check if photo is uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    // Uploads the photo to the server the assets folder
    const photo = req.files.photo_url;
    const fileType = await fileTypeFromBuffer(photo.data);

    if (
      !fileType ||
      !["image/jpeg", "image/png", "image/webp"].includes(fileType.mime)
    ) {
      return res
        .status(400)
        .json({ message: "Sorry, Only JPEG or PNG files are allowed" });
    }

    const uploadPath = path.join(__dirname, "assets", photo.name);
    await photo.mv(uploadPath);

    // Initializes the photo_url for the database
    const photo_url = `${HOST_URL}/assets/${photo.name}`;

    // Hashes the password
    const hash = await bcrypt.hash(req.body.password, 10);

    const [result] = await pool.query(
      "INSERT INTO users (email, password, first_name, last_name, photo_url, phone) VALUES (?, ?, ?, ?, ?, ?)",
      [email, hash, first_name, last_name, photo_url, convertedPhone]
    );

    req.session.regenerate(function (err) {
      if (err) return next(err);

      req.session.user = {
        email: email,
        role: "guest",
        first_name: first_name,
        last_name: last_name,
        id: result.insertId,
      };

      // Save the session before sending the response
      req.session.save(function (err) {
        if (err) return next(err);

        return res
          .status(201)
          .json({ message: "User registered successfully" });
      });
    });
  } catch (err) {
    return next(err);
  }
};

/**
 * @desc Check authentication
 * @route POST /api/auth/checkAuth
 */
export const checkAuth = async (req, res, next) => {
  try {
    // console.log(req.session);

    if (req.session.user) {
      if (req.session.user.role === "admin") {
        return res.status(200).json({
          message: "User is authenticated",
          authorized: true,
          isAdmin: true,
          email: req.session.user.email,
          first_name: req.session.user.first_name,
          last_name: req.session.user.last_name,
          id: req.session.user.id,
        });
      }

      return res.status(200).json({
        message: "User is authenticated",
        authorized: true,
        isAdmin: false,
        email: req.session.user.email,
        first_name: req.session.user.first_name,
        last_name: req.session.user.last_name,
        id: req.session.user.id,
      });
    }

    return res
      .status(401)
      .json({ message: "User is not authenticated", authorized: false });
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};

/**
 * @desc Logout user
 * @route POST /api/auth/logout
 */
export const logout = async (req, res, next) => {
  try {
    req.session.destroy();
    res.clearCookie("connect.sid");
    res
      .status(200)
      .json({ message: "User logged out successfully", loggedOut: true });
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};
