import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../utils";
import { UserModel } from "./auth.model";

class AuthService {
    registerUser = async (name: string, email: string, password: string) => {
        try {
            const existingUser = await UserModel.findOne({ email }).lean();
            if (existingUser) {
                throw new ApiError(StatusCodes.BAD_REQUEST, "User already exists");
            }

            const user = await UserModel.create({ name, email, password });
            if (!user) {
                throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to create user");
            }
            return { id: user._id, email: user.email, name: user.name };
        } catch (error) {
            throw error;
        }
    }
}

export default AuthService;