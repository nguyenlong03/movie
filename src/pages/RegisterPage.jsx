import { useState } from "react";
import { Link } from "react-router-dom";
import { Film, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Registration data:", data);
      toast.success("Đăng ký thành công! Chào mừng bạn đến với RoPhim!");
      navigate("/login");
    } catch (error) {
      toast.error("Đăng ký thất bại. Vui lòng thử lại!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 sm:p-8">
        <div className="mb-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 mb-2"
          >
            <Film className="text-orange-500" size={32} />
            <span className="text-2xl font-bold">RoPhim</span>
          </Link>
          <h1 className="text-2xl font-bold mb-2">Tạo tài khoản mới</h1>
          <p className="text-gray-400">
            Đăng ký để xem phim không giới hạn và lưu danh sách phim yêu thích.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Tên người dùng
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="username"
                type="text"
                {...register("username", {
                  required: "Tên người dùng là bắt buộc",
                  minLength: {
                    value: 3,
                    message: "Tên người dùng phải có ít nhất 3 ký tự",
                  },
                  maxLength: {
                    value: 20,
                    message: "Tên người dùng không được quá 20 ký tự",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message:
                      "Tên người dùng chỉ chứa chữ cái, số và dấu gạch dưới",
                  },
                })}
                className={`bg-gray-700 text-white rounded-lg py-3 px-4 pl-10 w-full focus:outline-none focus:ring-2 transition-colors ${
                  errors.username
                    ? "focus:ring-red-500 border border-red-500"
                    : "focus:ring-orange-500"
                }`}
                placeholder="username123"
              />
            </div>
            {errors.username && (
              <p className="mt-1 text-sm text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email là bắt buộc",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email không hợp lệ",
                  },
                })}
                className={`bg-gray-700 text-white rounded-lg py-3 px-4 pl-10 w-full focus:outline-none focus:ring-2 transition-colors ${
                  errors.email
                    ? "focus:ring-red-500 border border-red-500"
                    : "focus:ring-orange-500"
                }`}
                placeholder="your@email.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Mật khẩu
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Mật khẩu là bắt buộc",
                  minLength: {
                    value: 8,
                    message: "Mật khẩu phải có ít nhất 8 ký tự",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message:
                      "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số",
                  },
                })}
                className={`bg-gray-700 text-white rounded-lg py-3 px-4 pl-10 pr-10 w-full focus:outline-none focus:ring-2 transition-colors ${
                  errors.password
                    ? "focus:ring-red-500 border border-red-500"
                    : "focus:ring-orange-500"
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-300"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Xác nhận mật khẩu
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Xác nhận mật khẩu là bắt buộc",
                  validate: (value) =>
                    value === password || "Mật khẩu xác nhận không khớp",
                })}
                className={`bg-gray-700 text-white rounded-lg py-3 px-4 pl-10 pr-10 w-full focus:outline-none focus:ring-2 transition-colors ${
                  errors.confirmPassword
                    ? "focus:ring-red-500 border border-red-500"
                    : "focus:ring-orange-500"
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-300"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex items-start">
            <input
              id="agree-terms"
              type="checkbox"
              {...register("agreeTerms", {
                required: "Bạn phải đồng ý với điều khoản sử dụng",
              })}
              className={`h-4 w-4 mt-1 text-orange-500 focus:ring-orange-500 border-gray-600 rounded bg-gray-700 ${
                errors.agreeTerms ? "border-red-500" : ""
              }`}
            />
            <label htmlFor="agree-terms" className="ml-2 text-sm text-gray-400">
              Tôi đồng ý với{" "}
              <Link
                to="/terms"
                className="text-orange-500 hover:text-orange-400"
              >
                Điều khoản sử dụng
              </Link>{" "}
              và{" "}
              <Link
                to="/privacy"
                className="text-orange-500 hover:text-orange-400"
              >
                Chính sách bảo mật
              </Link>
            </label>
          </div>
          {errors.agreeTerms && (
            <p className="text-sm text-red-500">{errors.agreeTerms.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
          </button>

          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">
                Hoặc đăng ký với
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
              </svg>
              <span>Facebook</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.691.097.118.11.222.082.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
              </svg>
              <span>Google</span>
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-orange-500 hover:text-orange-400">
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
