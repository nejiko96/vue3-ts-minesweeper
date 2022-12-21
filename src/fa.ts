import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faAngleDown,
  faArrowUpRightFromSquare,
  faGear,
  faRotateLeft,
  faTrashCan,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const init = () => {
  library.add(faAngleDown)
  library.add(faArrowUpRightFromSquare)
  library.add(faGear)
  library.add(faGithub)
  library.add(faRotateLeft)
  library.add(faTrashCan)
  library.add(faXmark)
}

export { init }
