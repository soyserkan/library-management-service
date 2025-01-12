import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.userService.getUserById(Number(req.params.userId));
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.userService.registerUser(req.body);
      res.status(201).json();
    } catch (error) {
      next(error);
    }
  }
}