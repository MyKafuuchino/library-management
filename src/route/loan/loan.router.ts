import {HttpRouter} from "../../utils/http";
import {BookRepositoryImpl} from "../../repository/book.repository";
import {prismaClient} from "../../config/client";
import {UserRepositoryImpl} from "../../repository/user.repository";
import {LoanRepositoryImpl} from "../../repository/loan.repository";
import {LoanServiceImpl} from "../../service/loan.service";
import {LoanController} from "../../controller/loan.controller";
import {validate} from "../../middleware/validate.middleware";
import {createLoanSchema, findLoanById, updateLoanSchema} from "./loan.validator";
import {authorizeRoles} from "../../middleware/protect_route.by_role.middleware";

const loanRouter = HttpRouter()
const bookRepository = new BookRepositoryImpl(prismaClient)
const userRepository = new UserRepositoryImpl(prismaClient)
const loanRepository = new LoanRepositoryImpl(prismaClient)

const loanService = new LoanServiceImpl(loanRepository, bookRepository, userRepository)
const loanController = new LoanController(loanService);

loanRouter.get("", authorizeRoles("MANAGER", "ADMIN"), loanController.getAllLoans)
loanRouter.get("/:id", authorizeRoles("MANAGER", "ADMIN"), validate(findLoanById), loanController.getLoanById)
loanRouter.post("", authorizeRoles(), validate(createLoanSchema), loanController.createLoan)
loanRouter.put("/:id", authorizeRoles("MANAGER", "ADMIN"), validate(updateLoanSchema), loanController.updateLoan)
loanRouter.delete("/:id", authorizeRoles("MANAGER", "ADMIN"), validate(findLoanById), loanController.deleteLoan)

export default loanRouter;