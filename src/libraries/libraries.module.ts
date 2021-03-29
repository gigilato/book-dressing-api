import { Module, Global } from '@nestjs/common'
import { LibrariesService } from './libraries.service'
import { FirebaseModule } from './firebase/firebase.module'

@Global()
@Module({
  imports: [FirebaseModule],
  providers: [LibrariesService],
  exports: [LibrariesService],
})
export class LibrariesModule {}
