<template>
  <div class="iq-sidebar">
    <div class="iq-sidebar-logo d-flex justify-content-between">
      <router-link to="/">
        <img src="@/assets/images/logo.png" class="img-fluid" alt="" />
        <span>BĐS</span>
      </router-link>
    </div>
    <div id="sidebar-scrollbar">
      <nav class="iq-sidebar-menu">
        <ul id="iq-sidebar-toggle" class="iq-menu">
          <li>
            <router-link to="/" class="iq-waves-effect">
              <i class="ri-home-4-line"></i>
              <span>Quản lý BĐS</span>
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="p-3"></div>
    </div>
  </div>
</template>