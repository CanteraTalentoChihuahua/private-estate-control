import { Router } from "express";
import { createUser, deleteUserById, getTotalUsers, getUserById, getUsers, linkUserHouse, unlinkUserById, updateUserById } from "../controllers/users";
import { validateToken, validateSA } from "../middlewares/jwt";
import {check} from 'express-validator';
import { emailValidator, userValidator } from '../helpers/validators';
import { validator } from '../middlewares/errorValidator';

const router = Router();

router.get("/get", getUsers);

router.get("/get/count", validateToken, getTotalUsers);

router.get("/get/:id", [
    check('id', 'La id no puede ir vacìa').not().isEmpty(),
    validator
], getUserById);

// It'll require as param idUser
router.put("/put/link/:id", [
    check('id', 'La id de la casa no puede ir vacia').not().isEmpty(),
    validator
], linkUserHouse);

router.post("/post",[
    check('idResDev', 'El id es obligatorio').not().isEmpty(),
    check('idResDev', 'El id debe ser un numero').isNumeric(),
    check('firstName', 'El nombre es obligatorio').not().isEmpty(),
    check('lastName', 'El apellido es obligatorio').not().isEmpty(),
    check('password', 'La contraseña no puede ser nula').not().isEmpty(),
    check('email', 'El formato de correo es incorrecto').isEmail(),
    check('email').custom(emailValidator),
    validator
], createUser);

router.put("/put/:id", updateUserById);

router.delete("/delete/:id",[
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'La id debe ser un numero').isNumeric(),
    check('id').custom(userValidator),
    validator
], deleteUserById);

router.delete("/unlink/:id", [
    check('id', 'El id del usuario es obligatorio').not().isEmpty(),
    check('id', 'La id del usuario debe ser un numero').isNumeric(),
    check('idHouse', 'El id de la casa es obligatorio').not().isEmpty(),
    check('idHouse', 'La id de la casa debe ser un numero').isNumeric(),
    check('id').custom(userValidator),
    validator
], unlinkUserById);

export default router;