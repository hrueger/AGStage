import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import * as path from "path";
import * as fs from "fs";

class UserController {
  public static listAll = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    res.send(await userRepository.find());
  }

  public static usernameAvailable = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const result = await userRepository.findOne({ username: req.params.username });
    res.send({usernameAvailable: result ? false : true});
  }

  public static newUser = async (req: Request, res: Response) => {
    const { username, password, passwordVerify } = req.body;
    if (!(username && password && passwordVerify)) {
      res.status(400).send({message: "Nicht alle Felder ausgefüllt!"});
      return;
    }
    if (password != passwordVerify) {
      res.status(400).send({message: "Passwörter stimmen nicht überein!"});
      return;
    }

    let user = new User();
    user.username = username;
    user.password = password;
    user.isProducer = false;

    user.hashPassword();

    const userRepository = getRepository(User);
    try {
      user = await userRepository.save(user);
    } catch (e) {
      res.status(409).send({message: "Der Benutzername ist schon vorhanden!", errorField: "username"});
      return;
    }
    res.status(200).send({status: true});
  }

  public static deleteUser = async (req: Request, res: Response) => {

    const id = req.params.id;

    const userRepository = getRepository(User);
    try {
      await userRepository.delete(id);
    } catch (e) {
      res.status(500).send({message: "Konnte den Benutzer nicht löschen!"});
      return;
    }
    res.status(200).send({status: true});
  }

  public static changePassword = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { password } = req.body;
    if (!password) {
      res.status(400).send({message: "Nicht alle Felder ausgefüllt!"});
      return;
    }

    const userRepository = getRepository(User);
    try {
      const user = await userRepository.findOne(id);
      user.password = password;
      user.hashPassword();
      await userRepository.save(user);
    } catch (e) {
      res.status(500).send({message: "Konnte den das Passwort nicht ändern!"});
      return;
    }
    res.status(200).send({status: true});
  }

  public static changeProducerStatus = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { admin } = req.body;

    const userRepository = getRepository(User);
    try {
      const user = await userRepository.findOne(id);
      user.isProducer = admin;
      await userRepository.save(user);
    } catch (e) {
      res.status(500).send({message: "Konnte den Producerstatus nicht ändern!"});
      return;
    }
    res.status(200).send({status: true});
  }

}

export default UserController;
