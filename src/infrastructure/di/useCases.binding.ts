// Module import
import { ContainerModule } from 'inversify';
// Use Case import
import { AddUser } from '../../usecases/user/addUser/addUser';
import {
  ADD_USER_TYPE,
  IAddUser,
} from '../../usecases/user/addUser/addUser.interface';

// Bind Use Cases
const useCasesBinding = new ContainerModule(bind => {
  bind<IAddUser>(ADD_USER_TYPE.AddUser).to(AddUser);
});

export { useCasesBinding };
