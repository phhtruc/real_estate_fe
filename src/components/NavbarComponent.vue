<template>
  <div class="iq-top-navbar">
    <div class="iq-navbar-custom">
      <div class="iq-sidebar-logo">
        <div class="top-logo">
          <router-link to="/" class="logo">
            <img src="@/assets/images/logo.png" class="img-fluid" alt="" />
            <span>BĐS</span>
          </router-link>
        </div>
      </div>
      <nav class="navbar navbar-expand-lg navbar-light p-0">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="ri-menu-3-line"></i>
        </button>
        <div class="iq-menu-bt align-self-center">
          <div class="wrapper-menu">
            <div class="line-menu half start"></div>
            <div class="line-menu"></div>
            <div class="line-menu half end"></div>
          </div>
        </div>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto navbar-list">
            <li class="nav-item">
              <a class="search-toggle iq-waves-effect" href="#"><i class="ri-search-line"></i></a>
              <form @submit.prevent="searchProperty" class="search-box">
                <input
                  type="text"
                  class="text search-input"
                  placeholder="Tên bất động sản"
                  v-model="searchQuery"
                />
              </form>
            </li>

            <li class="nav-item iq-full-screen">
              <a href="#" class="iq-waves-effect" id="btnFullscreen"
                ><i class="ri-fullscreen-line"></i
              ></a>
            </li>
          </ul>
        </div>
        <ul class="navbar-list">
          <li>
            <a href="#" class="search-toggle iq-waves-effect bg-primary text-white"
              ><img src="@/assets/images/user/1.jpg" class="img-fluid rounded" alt="user"
            /></a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const searchQuery = ref('')
const router = useRouter()

const searchProperty = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/', query: { search: searchQuery.value } })
  }
}
</script>


