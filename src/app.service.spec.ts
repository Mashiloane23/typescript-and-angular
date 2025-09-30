import { Test, TestingModule } from '@nestjs/testing'; // Correct import for TestingModule
import { AppService } from './app.service';
import { Taskrepository } from './task.repository';
import { User } from './user/user.entity';
import { task } from './task.entity';

// Mock factory for Taskrepository
const mockTaskRepository = () => ({
  getallTask: jest.fn(),
});
const mockUser = {
  username: 'bokamoso',
  id: '3',
  password: 'Password12@',
  task: [],
};

describe('AppService', () => {
  let appService: AppService;
  let repo: Taskrepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: Taskrepository,
          useFactory: mockTaskRepository, // Correct usage of useFactory
        },
      ],
    }).compile(); // Added .compile() to complete the setup

    appService = module.get<AppService>(AppService);
    repo = module.get<Taskrepository>(Taskrepository);
  });

  describe('getallTask', () => {
    it('calls Taskrepository.getallTask and returns results', () => {
      // Ensure getallTask has not been called yet
      expect(repo.getAllTasks).not.toHaveBeenCalled();

      // Call the method on appService
      

     
      expect(repo.getAllTasks).toHaveBeenCalled();
    });
  });

  it('should be defined', () => {
    expect(appService).toBeDefined();
    expect(repo).toBeDefined();
  });
});
