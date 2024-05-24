import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import { CatchAsync } from "../utils/catchAsync.js";
import bcrypt from "bcrypt";
import {sendEmail} from '../utils/sendEmail.js';
import createSendToken from '../utils/token.js';



export const registerUser = CatchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  console.log(username, email, password);

  const checkEmail = await User.findOne({ where: { email } });
  if (checkEmail) {
    return next(new AppError("User already exists", 409));
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword)
  let user = await User.create({ username, email, password: hashedPassword });
  console.log(user);

  await createSendToken(user, 201, res);
});

export const loginUser = CatchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  let user = await User.findOne({ where: { email } });
  if (!user) {
    return next(new AppError("Invalid credentials!", 404));
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return next(new AppError("Invalid credentials!", 404));
  }

  await createSendToken(user, 200, res);
});

export const forgetPassword = CatchAsync(async (req, res, next) => {
  const { email } = req.body;

  let user = await User.findOne({ where: { email } });
  if (!user) {
    return next(new AppError("User does not exist!", 404));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validate: false });

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  const message = `Your password reset token is:\n\n${resetPasswordUrl}\n\nIf you did not request this email, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Reset Password',
      message,
    });

    res.status(201).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save({ validate: false });

    return next(new AppError(err.message, 500));
  }
});


export const getAllUser = CatchAsync(async(req, res, next)=> {
  const users = await User.findAll();

  res.status(200).json({
    status: "success",
    results: users.length,
    users
  })
})

export const deleteUser = CatchAsync(async(req, res, next)=> {
  const {id} = req.params;
  await User.destroy({where: {id}});

  res.status(200).json({
    status: "success",
    message: "User deleted Successfully"
  })
})

export const getUser = CatchAsync(async(req, res, next)=> {
  const {id} = req.params;
  const user = await User.findOne({where: {id}});

  res.status(200).json({
    status: "success",
    message: "User data fetched Successfully",
    user
  })
})

