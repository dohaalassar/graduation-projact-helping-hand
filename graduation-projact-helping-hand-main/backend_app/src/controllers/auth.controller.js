const User = require('../models/User.model');
const generateToken = require('../utils/generateToken');

// ─────────────────────────────────────────
// @route   POST /api/auth/register
// @access  Public
// ─────────────────────────────────────────
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered.',
      });
    }

    // 2. Prevent anyone from self-registering as admin
    if (role === 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin accounts cannot be created this way.',
      });
    }

    // 3. Create the user (password is hashed automatically via pre-save hook)
    const user = await User.create({ name, email, password, role });

    // 4. Generate JWT token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error.',
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────
// @route   POST /api/auth/login
// @access  Public
// ─────────────────────────────────────────
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password.',
      });
    }

    // 2. Find user by email (include password for comparison)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // 3. Compare entered password with stored hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // 4. Generate token and respond
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Logged in successfully.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error.',
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────
// @route   GET /api/auth/me
// @access  Private (requires token)
// ─────────────────────────────────────────
exports.getMe = async (req, res) => {
  // req.user is set by the protect middleware
  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
};


// مخزن مؤقت للرموز
const resetCodes = {};

// ─────────────────────────────────────────
// @route   POST /api/auth/forgot-password
// @access  Public
// ─────────────────────────────────────────
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'البريد الإلكتروني غير مسجل.',
      });
    }

    // رمز عشوائي 6 أرقام
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // احفظي الرمز مع وقت انتهاء 10 دقائق
    resetCodes[email] = {
      code,
      expiresAt: Date.now() + 10 * 60 * 1000,
    };

    // في development — نرجع الرمز مباشرة
    console.log(`Reset code for ${email}: ${code}`);

    res.status(200).json({
      success: true,
      message: 'تم إرسال رمز التحقق.',
      devCode: code, // احذفيه في production
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error.',
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────
// @route   POST /api/auth/reset-password
// @access  Public
// ─────────────────────────────────────────
exports.resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    const record = resetCodes[email];

    if (!record) {
      return res.status(400).json({
        success: false,
        message: 'لم يتم طلب رمز التحقق.',
      });
    }

    if (Date.now() > record.expiresAt) {
      delete resetCodes[email];
      return res.status(400).json({
        success: false,
        message: 'انتهت صلاحية الرمز. أعد الإرسال.',
      });
    }

    if (record.code !== code) {
      return res.status(400).json({
        success: false,
        message: 'رمز التحقق غير صحيح.',
      });
    }

    const user = await User.findOne({ email });
    user.password = newPassword;
    await user.save();

    delete resetCodes[email];

    res.status(200).json({
      success: true,
      message: 'تم تغيير كلمة السر بنجاح.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error.',
      error: error.message,
    });
  }
};