const schemaChangPass = {
  type: "object",
  properties: {
    oldPassword: {
      type: "string",
      minLength: 6,
      errorMessage: {
        notEmpty: "Trường mật khẩu hiện tại là bắt buộc",
        type: "Không phải string",
        minLength: "Mật khẩu không đủ 6 kí tự",
        _: "sai ",
      },
    },
    newPassword: {
      type: "string",
      minLength: 6,
      errorMessage: {
        notEmpty: "Trường mật khẩu là bắt buộc",
        type: "Không phải string",
        minLength: "Mật khẩu mới không đủ 6 kí tự",
        _: "sai ",
      },
    },
    confirmPassword: {
      type: "string",
      minLength: 6,
      errorMessage: {
        notEmpty: "Trường mật khẩu hiện tại là bắt buộc",
        type: "Không phải string",
        minLength: "Xác nhận mật khẩu không đủ 6 kí tự",
        _: "sai ",
      },
    },
  },
  required: ["oldPassword", "newPassword", "confirmPassword"],
  additionalProperties: false,
};
const schemaProfile = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 6,
      errorMessage: {
        type: "Không phải string",
        minLength: "Tên không đủ 6 kí tự",
        _: "sai ",
      },
    },
    phoneNumber: {
      type: "string",
      pattern: "^(\\+84|0)\\d{9,10}$",
      minLength: 10,
      maxLength: 10,
      errorMessage: {
        type: "Không phải string",
        minLength: "Số điện thoại phải có 10 số",
        maxLength: "Số điện thoại phải có 10 số",
        pattern: "Số điện thoại không hợp lệ",
        _: "sai ",
      },
    },
  },
  required: ["name", "phoneNumber"],
  additionalProperties: false,
};
const schemaCreateProduct = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 6,
      errorMessage: {
        type: "Không phải string",
        minLength: "Tên không đủ 6 kí tự",
        _: "sai ",
      },
    },
    price: {
      type: "number",
      minimum: 1,
      maximum: 1000000000,
      errorMessage: {
        required: "Trường giá bắt buộc",
        type: "Không phải số",
        minimum: "Giá quá thấp",
        maximum: "Giá quá cao",
        _: "sai ",
      },
    },
    totalQuantity: {
      type: "number",
      minimum: 1,
      maximum: 1000000000,
      errorMessage: {
        required: "Trường số lượng bắt buộc",
        type: "Không phải số",
        minimum: "Số lượng quá thấp",
        maximum: "Số lượng quá cao",
        _: "sai ",
      },
    },
    categoryId: {
      type: "number",
      errorMessage: {
        required: "Trường số lượng bắt buộc",
        type: "Không phải số",
        _: "sai ",
      },
    },
    description: {
      type: "string",
      minLength: 6,
      errorMessage: {
        type: "Không phải string",
        minLength: "Mô tả không đủ 6 kí tự",
        _: "sai ",
      },
    },
    images: {
      type: "array",
      minItems: 1,
      errorMessage: {
        type: "Trường ảnh bắt buộc",
        minItems: "Trường ảnh bắt buộc",
        _: "sai ",
      },
    },
  },
  required: [
    "name",
    "price",
    "totalQuantity",
    "categoryId",
    "description",
    "images",
  ],
  additionalProperties: false,
};
const schemaUpdateProduct = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 6,
      errorMessage: {
        type: "Không phải string",
        minLength: "Tên không đủ 6 kí tự",
        _: "sai ",
      },
    },
    price: {
      type: "number",
      minimum: 1,
      maximum: 1000000000,
      format: "email",
      errorMessage: {
        required: "Trường giá bắt buộc",
        type: "Không phải số",
        minimum: "Giá quá thấp",
        maximum: "Giá quá cao",
        _: "sai ",
      },
    },
    totalQuantity: {
      type: "number",
      minimum: 1,
      maximum: 1000000000,
      errorMessage: {
        required: "Trường số lượng bắt buộc",
        type: "Không phải số",
        minimum: "Số lượng quá thấp",
        maximum: "Số lượng quá cao",
        _: "sai ",
      },
    },
    categoryId: {
      type: "number",
      errorMessage: {
        required: "Trường số lượng bắt buộc",
        type: "Không phải số",
        _: "sai ",
      },
    },
    description: {
      type: "string",
      minLength: 6,
      errorMessage: {
        type: "Không phải string",
        minLength: "Mô tả không đủ 6 kí tự",
        _: "sai ",
      },
    },
  },
  required: ["name", "price", "totalQuantity", "categoryId", "description"],
  additionalProperties: false,
};
const schemaCategory = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 1,
      errorMessage: {
        minLength: "Trường tên danh mục bắt buộc",
        required: "Trường tên danh mục bắt buộc",
        type: "Không phải string",
        _: "sai ",
      },
    },
  },
};
const schemaCreateStaff = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 6,
      errorMessage: {
        type: "Không phải string",
        minLength: "Tên không đủ 6 kí tự",
        _: "sai ",
      },
    },
    email: {
      type: "string",
      minLength: 6,
      format: "email",
      errorMessage: {
        required: "Trường email bắt buộc",
        type: "Không phải email",
        minLength: "Email quá ngắn",
        format: "Không phải email",
        _: "sai ",
      },
    },
    password: {
      type: "string",
      minLength: 6,
      errorMessage: {
        required: "Trường mật khẩu là bắt buộc",
        type: "Không phải string",
        minLength: "Mật khẩu mới không đủ 6 kí tự",
        _: "sai ",
      },
    },
    roleId: {
      type: "number",
      errorMessage: {
        required: "Trường role bắt buộc",
        type: "Không phải số",
        _: "sai ",
      },
    },
    dob: {
      type: "string",
      pattern: "^\\d{4}-\\d{2}-\\d{2}$",
      format: "date",
      errorMessage: {
        type: "Ngày sinh là bắt buộc",
        pattern: "Ngày tháng không hợp lệ",
        format: "Ngày tháng không hợp lệ",
        minLength: "Ngày sinh là bắt buộc",
        _: "sai ",
      },
    },
    phoneNumber: {
      type: "string",
      pattern: "^(\\+84|0)\\d{9,10}$",
      minLength: 10,
      maxLength: 10,
      errorMessage: {
        type: "Ngày sinh là bắt buộc",
        pattern: "Số điện thoại không hợp lệ",
        minLength: "Số điện thoại phải có 10 chữ số",
        maxLength: "Số điện thoại phải có 10 chữ số",
        _: "sai ",
      },
    },
    avatar: {
      type: "array",
      minItems: 1,
      errorMessage: {
        type: "Trường ảnh bắt buộc",
        minItems: "Trường ảnh bắt buộc",
        _: "sai ",
      },
    },
  },
  required: [
    "name",
    "password",
    "email",
    "roleId",
    "phoneNumber",
    "avatar",
    "dob",
  ],
  additionalProperties: false,
};
const schemaUpdateStaff = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 6,
      errorMessage: {
        type: "Không phải string",
        minLength: "Tên không đủ 6 kí tự",
        _: "sai ",
      },
    },
    email: {
      type: "string",
      minLength: 6,
      format: "email",
      errorMessage: {
        required: "Trường email bắt buộc",
        type: "Không phải email",
        minLength: "Email quá ngắn",
        format: "Không phải email",
        _: "sai ",
      },
    },
    roleId: {
      type: "number",
      errorMessage: {
        required: "Trường role bắt buộc",
        type: "Không phải số",
        _: "sai ",
      },
    },
    dob: {
      type: "string",
      pattern: "^\\d{4}-\\d{2}-\\d{2}$",
      format: "date",
      errorMessage: {
        type: "Ngày sinh là bắt buộc",
        pattern: "Ngày tháng không hợp lệ",
        format: "Ngày tháng không hợp lệ",
        minLength: "Ngày sinh là bắt buộc",
        _: "sai ",
      },
    },
    phoneNumber: {
      type: "string",
      pattern: "^(\\+84|0)\\d{9,10}$",
      minLength: 10,
      maxLength: 10,
      errorMessage: {
        type: "Ngày sinh là bắt buộc",
        pattern: "Số điện thoại không hợp lệ",
        minLength: "Số điện thoại phải có 10 chữ số",
        maxLength: "Số điện thoại phải có 10 chữ số",
        _: "sai ",
      },
    },
  },
  required: ["name", "email", "roleId", "phoneNumber", "dob"],
  additionalProperties: false,
};
const schemaDiscount = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 1,
      errorMessage: {
        minLength: "Trường tên discount bắt buộc",
        required: "Trường tên discount bắt buộc",
        type: "Không phải string",
        _: "sai ",
      },
    },
    percent: {
      type: "number",
      minimum: 0.01,
      maximum: 0.99,
      errorMessage: {
        type: "Phải là số",
        minimum: "Số không được nhỏ hơn 0.01",
        maximum: "Số không được lớn hơn 0.99",
        _: "sai ",
      },
    },
  },
};
const schemaCreateSlider = {
  type: "object",
  properties: {
    image: {
      type: "object",
      minLength: 1,
      errorMessage: {
        minLength: "Trường tên ảnh bắt buộc",
        required: "Trường tên ảnh bắt buộc",
        type: "Ảnh không hợp lệ",
        _: "sai ",
      },
    },
    content: {
      type: "string",
      minLength: 1,
      errorMessage: {
        type: "Phải là chuỗi",
        minLength: "Trường tên nội dung bắt buộc",
        _: "sai ",
      },
    },
  },
  required: ["image", "content"],
  additionalProperties: false,
};
const schemaUpdateSlider = {
  type: "object",
  properties: {
    content: {
      type: "string",
      minLength: 1,
      errorMessage: {
        type: "Phải là chuỗi",
        minLength: "Trường tên nội dung bắt buộc",
        _: "sai ",
      },
    },
  },
  required: ["content"],
  additionalProperties: false,
};
const schemaLogin = {
  type: "object",
  properties: {
    password: {
      type: "string",
      minLength: 1,
      errorMessage: {
        type: "Không phải string",
        minLength: "Trường mật khẩu bắt buộc",
        _: "sai ",
      },
    },
    email: {
      type: "string",
      minLength: 1,
      format: "email",
      errorMessage: {
        type: "Không phải string",
        minLength: "Trường Email bắt buộc",
        format: "Emai không hợp lệ",
        _: "sai ",
      },
    },
  },
  required: ["password", "email"],
  additionalProperties: false,
};
const schemaRegister = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 1,
      errorMessage: {
        type: "Không phải string",
        minLength: "Tên bắt buộc",
        _: "sai ",
      },
    },
    email: {
      type: "string",
      minLength: 1,
      format: "email",
      errorMessage: {
        required: "Trường email bắt buộc",
        type: "Không phải email",
        minLength: "Email bắt buộc",
        format: "Email không hợp lệ",
        _: "sai ",
      },
    },
    dob: {
      type: "string",
      pattern: "^\\d{4}-\\d{2}-\\d{2}$",
      format: "date",
      errorMessage: {
        type: "Ngày sinh là bắt buộc",
        pattern: "Ngày tháng không hợp lệ",
        format: "Ngày tháng không hợp lệ",
        minLength: "Ngày sinh là bắt buộc",
        _: "sai ",
      },
    },
    phoneNumber: {
      type: "string",
      pattern: "^(\\+84|0)\\d{9,10}$",
      minLength: 10,
      maxLength: 10,
      errorMessage: {
        type: "Ngày sinh là bắt buộc",
        pattern: "Số điện thoại không hợp lệ",
        minLength: "Số điện thoại phải có 10 chữ số",
        maxLength: "Số điện thoại phải có 10 chữ số",
        _: "sai ",
      },
    },
    password: {
      type: "string",
      minLength: 6,
      errorMessage: {
        required: "Trường mật khẩu là bắt buộc",
        type: "Không phải string",
        minLength: "Mật khẩu mới không đủ 6 kí tự",
        _: "sai ",
      },
    },
    confirmPassword: {
      type: "string",
      minLength: 6,
      errorMessage: {
        required: "Trường mật khẩu là bắt buộc",
        type: "Không phải string",
        minLength: "Mật khẩu mới không đủ 6 kí tự",
        _: "sai ",
      },
    },
  },
  required: [
    "name",
    "email",
    "password",
    "phoneNumber",
    "dob",
    "confirmPassword",
  ],
  additionalProperties: false,
};
const schemaAddress = {
  type: "object",
  properties: {
    address: {
      type: "string",
      minLength: 6,
      errorMessage: {
        type: "Không phải string",
        minLength: "Địa chỉ không đủ 6 kí tự",
        _: "sai ",
      },
    },
  },
  required: ["address"],
  additionalProperties: false,
};
export default {
  schemaChangPass,
  schemaProfile,
  schemaCreateProduct,
  schemaUpdateProduct,
  schemaCategory,
  schemaCreateStaff,
  schemaUpdateStaff,
  schemaDiscount,
  schemaCreateSlider,
  schemaUpdateSlider,
  schemaLogin,
  schemaRegister,
  schemaAddress,
};
