import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { EmailService } from 'src/email/email.service';
import { User } from './entities/user.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('UsersService', () => {
  let usersService: UsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        EmailService,
        { provide: getModelToken(User.name), useValue: {} },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('get users', () => {
    describe('all', () => {
      let user: User;
      beforeEach(() => {
        user = new User();
      });
      it('should return the user', async () => {
        const fetchedUser = await usersService.findAll();
        expect(fetchedUser[0]).toEqual(user);
      });
    });
    describe('get user by Id', () => {
      let user: User;
      beforeEach(() => {
        user = new User();
      });
      it('should return the user', async () => {
        const fetchedUser = await usersService.findById('anklnk21l12kl12knn2');
        expect(fetchedUser[0]).toEqual(user);
      });
    });
    describe('get one user by Id', () => {
      let user: User;
      beforeEach(() => {
        user = new User();
      });
      it('should return the user', async () => {
        const fetchedUser = await usersService.findOne('anklnk21l12kl12knn2');
        expect(fetchedUser).toEqual(user);
      });
    });
    describe('get one user by Email', () => {
      let user: User;
      beforeEach(() => {
        user = new User();
      });
      it('should return the user', async () => {
        const fetchedUser = await usersService.findOneByEmail('test@test.ru');
        expect(fetchedUser).toEqual(user);
      });
    });
    describe('get one user by Id', () => {
      let user: User;
      beforeEach(() => {
        user = new User();
      });
      it('should return the user', async () => {
        const fetchedUser = await usersService.findOneById(
          'anklnk21l12kl12knn2',
        );
        expect(fetchedUser).toEqual(user);
      });
    });
  });

  describe('create user', () => {
    describe('create', () => {
      let user: User;
      beforeEach(() => {
        user = new User();
      });
      it('should return the user', async () => {
        const createdUser = await usersService.create({
          username: 'sasaasa',
          email: 'test@test.ru',
          password: 'sassaassas',
        });
        expect(createdUser).toEqual(user);
      });
    });
    describe('create with error (short username)', () => {
      it('should return the user', async () => {
        await expect(
          usersService.create({
            username: 'sas',
            email: 'test@test.ru',
            password: 'sassaassas',
          }),
        ).rejects.toThrow();
      });
    });
    describe('create with error (short password)', () => {
      it('should return the user', async () => {
        await expect(
          usersService.create({
            username: 'sassasas',
            email: 'test@test.ru',
            password: 'sas',
          }),
        ).rejects.toThrow();
      });
    });
    describe('create with error (not Email)', () => {
      it('should return the user', async () => {
        await expect(
          usersService.create({
            username: 'sassasas',
            email: 'test',
            password: 'sassasa',
          }),
        ).rejects.toThrow();
      });
    });
  });
});
