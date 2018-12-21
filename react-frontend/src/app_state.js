import { observable } from 'mobx';

class app_state {
  @observable sidebar_isCollapsed = true
  @observable sidebar_activeKey = 1
  @observable sidebar_toggleFlag = false
  @observable headerContent = null
}

export default new app_state();
