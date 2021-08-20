import { object, string, date } from "yup";
import { AccountStatus, Role } from "../interfaces/account.interface";

export const accountYupSchema = object({
    username: string().required().max(30),
    email: string().required().email(),
    password: string().required().min(8),
    dob: date().default(function () {return new Date('19-11-2000')}),
    role: string().oneOf([Role.ADMIN, Role.USER]),
    status: string().oneOf([AccountStatus.ACTIVATED, AccountStatus.DEACTIVATED])
})