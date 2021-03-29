import { Module, Global } from '@nestjs/common'
import { LibrariesService } from './libraries.service'
import { FirebaseModule } from './firebase/firebase.module'

@Global()
@Module({
  imports: [FirebaseModule],
  providers: [LibrariesService],
})
export class LibrariesModule {}
