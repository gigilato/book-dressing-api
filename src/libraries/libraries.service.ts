import { Injectable, Inject } from '@nestjs/common'
import { FirebaseService } from './firebase/firebase.service'

@Injectable()
export class LibrariesService {
  public constructor(@Inject(FirebaseService) public readonly firebase: FirebaseService) {}
}
