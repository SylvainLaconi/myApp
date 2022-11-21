import { User } from '../src/users/user.entity';

export const users: User[] = [
  {
    id: 1,
    username: 'johndoe',
    password: '$2b$10$sX24aPy.9edZkAHTpTbf0OFG3oUgxBXv/7rEN26fCN4B.CZcfpi0a',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    isActive: true,
    isAdmin: true,
  },
  {
    id: 2,
    username: 'BillyCat',
    password: '$2b$10$sX24aPy.9edZkAHTpTbf0OFG3oUgxBXv/7rEN26fCN4B.CZcfpi0a',
    firstName: null,
    lastName: null,
    email: null,
    isActive: true,
    isAdmin: false,
  },
  {
    id: 3,
    username: 'janedae',
    password: '$2b$10$sX24aPy.9edZkAHTpTbf0OFG3oUgxBXv/7rEN26fCN4B.CZcfpi0a',
    firstName: 'Jane',
    lastName: 'Dae',
    email: null,
    isActive: true,
    isAdmin: true,
  },
];
