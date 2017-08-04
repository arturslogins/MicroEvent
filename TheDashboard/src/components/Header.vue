<template>
  <navbar>
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">&#9776;</button>
    <a class="navbar-brand" href="#"></a>
    <ul class="nav navbar-nav d-md-down-none">
      <li class="nav-item">
        <a class="nav-link navbar-toggler sidebar-toggler" href="#" @click="sidebarMinimize">&#9776;</a>
      </li>
    </ul>
    <ul class="nav navbar-nav ml-auto">
      <li class="nav-item d-md-down-none">
        <router-link to="/microservices" class="nav-link" href="#"><i class="icon-bell"></i><span class="badge badge-pill badge-danger">2</span></router-link>
      </li>
      <dropdown size="nav" class="nav-item">
        <span slot="button">
          <img src="static/img/avatars/6.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">
          <span class="d-md-down-none">admin</span>
        </span>
        <div slot="dropdown-menu"class="dropdown-menu dropdown-menu-right">

          <div class="dropdown-header text-center"><strong>Account</strong></div>

          <router-link to="/microservices"class="dropdown-item" href="#"><i class="fa fa-bell-o"></i> Updates<span class="badge badge-danger">2</span></router-link>
          <router-link to="/opschat" class="dropdown-item" href="#"><i class="fa fa-comments"></i> Chats<span class="badge badge-warning">42</span></router-link>

          <div class="divider"></div>
          <router-link to="/" class="dropdown-item" href="/"><i class="fa fa-lock"></i> Logout</router-link>
        </div>
      </dropdown>
      <li class="nav-item d-md-down-none">
        <a class="nav-link navbar-toggler aside-menu-toggler" href="#" @click="asideToggle">&#9776;</a>
      </li>
    </ul>
  </navbar>
</template>
<script>

import navbar from './Navbar'
import { dropdown } from 'vue-strap'

export default {
  name: 'header',
  components: {
    navbar,
    dropdown
  },
  methods: {
    click () {
      // do nothing
    },
    sidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-mobile-show')
    },
    asideToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('aside-menu-hidden')
    }
  }
}
</script>
