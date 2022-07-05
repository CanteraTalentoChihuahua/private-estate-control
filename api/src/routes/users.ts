import { Router } from "express";
import { createUser, deleteUserById, getTotalUsers, getUserById, getUsers, linkUserHouse, unlinkUserById, updateUserById } from "../controllers/users";
import { validateToken, validateSA } from "../middlewares/jwt";
import {check} from 'express-validator';
import { emailValidator, houseValidator, relationshipValidator, userValidator } from '../helpers/usersValidators';
import { validator } from '../middlewares/errorValidator';

const router = Router();

router.get("/get", getUsers);

router.get("/get/count", validateToken, getTotalUsers);

router.get("/get/:id", [
    check('id', 'El id debe ser un numero').isNumeric(),
    validator
], getUserById);

// It'll require as param idUser
router.post("/post/link/:idUser", [
    check('idUser', 'La id tiene que ser un numero').isNumeric(),
    validator
], linkUserHouse);

router.post("/post",[
    check('idResDev', 'El id debe ser un numero').isNumeric(),
    check('firstName', 'El nombre es obligatorio').not().isEmpty(),
    check('lastName', 'El apellido es obligatorio').not().isEmpty(),
    check('idHouse', 'El id de la casa no puede ir vacio').not().isEmpty(),
    check('idHouse', 'El id de la casa debe ser un numero').isNumeric(),
    check('email', 'Debes insertar un correo valido').isEmail(),
    check('email').custom(emailValidator),
    validator
], createUser);

router.put("/put/:id", [
    check('idResDev', 'El id debe ser un numero').isNumeric(),
    check('firstName', 'El nombre es obligatorio').not().isEmpty(),
    check('lastName', 'El apellido es obligatorio').not().isEmpty(),
    check('id').custom(userValidator),
    validator
],updateUserById);

router.delete("/delete/:id",[
    check('id', 'La id debe ser un numero').isNumeric(),
    check('id').custom(userValidator),
    validator
], deleteUserById);

router.delete("/unlink/:idUser", [
    check('idUser', 'La id del usuario debe ser un numero').isNumeric(),
    check('idHouse', 'La id de la casa debe ser un numero').isNumeric(),
    check('idUser').custom(userValidator),
    check('idHouse').custom(houseValidator),
    validator
], unlinkUserById);

export default router;