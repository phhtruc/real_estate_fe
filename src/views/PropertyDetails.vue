<template>
  <div id="content-page" class="content-page">
    <div class="container-fluid">
      <button class="btn btn-light mb-3" @click="goBack">← Trở về</button>
      <div class="iq-card">
        <div class="iq-card-header d-flex justify-content-between">
          <div class="iq-header-title">
            <h4 class="card-title">Thêm mới bất động sản</h4>
          </div>
        </div>
        <div class="iq-card-body">
          <form @submit.prevent="addProperty">
            <div class="form-group">
              <label for="title">Tiêu đề</label>
              <input
                id="title"
                v-model="property.title"
                placeholder="Nhập tiêu đề"
                class="form-control"
                readonly
              />
            </div>
            <div class="form-group">
              <label for="description">Mô tả</label>
              <textarea
                id="description"
                v-model="property.description"
                placeholder="Nhập mô tả"
                class="form-control"
                rows="3"
                readonly
              ></textarea>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="address">Địa chỉ</label>
                  <input
                    id="address"
                    v-model="property.address"
                    placeholder="Nhập địa chỉ"
                    class="form-control"
                    readonly
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label for="area">Diện tích (m²)</label>
                  <input
                    type="text"
                    id="area"
                    v-model="property.area"
                    @input="validateNumber('area')"
                    placeholder="Nhập diện tích"
                    class="form-control"
                    readonly
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label for="price">Giá (VNĐ)</label>
                  <input
                    type="text"
                    id="price"
                    v-model="property.price"
                    placeholder="Nhập giá"
                    @input="validateNumber('price')"
                    class="form-control"
                    readonly
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label for="floorCount">Số tầng</label>
                  <input
                    type="text"
                    id="floorCount"
                    v-model="property.floorCount"
                    @input="validateNumber('floorCount')"
                    placeholder="Nhập số tầng"
                    class="form-control"
                    readonly
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <div class="form-group">
                  <label for="bedrooms">Số phòng ngủ</label>
                  <input
                    type="text"
                    id="bedrooms"
                    v-model="property.numBedrooms"
                    placeholder="Nhập số phòng ngủ"
                    @input="validateNumber('numBedrooms')"
                    class="form-control"
                    readonly
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label for="bathrooms">Số phòng tắm</label>
                  <input
                    type="text"
                    id="bathrooms"
                    v-model="property.numBathrooms"
                    placeholder="Nhập số phòng tắm"
                    @input="validateNumber('numBathrooms')"
                    class="form-control"
                    readonly
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label for="furniture">Nội thất</label>
                  <input
                    type="text"
                    id="furniture"
                    v-model="property.furniture"
                    placeholder="Nhập số phòng tắm"
                    @input="validateNumber('numBathrooms')"
                    class="form-control"
                    readonly
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label for="propertyType">Loại BĐS</label>
                  <input
                    type="text"
                    id="propertyType"
                    v-model="property.propertyType.name"
                    placeholder="Nhập số phòng tắm"
                    @input="validateNumber('numBathrooms')"
                    class="form-control"
                    readonly
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label for="houseDirection">Hướng nhà</label>
                  <input
                    type="text"
                    id="houseDirection"
                    v-model="property.houseDirection"
                    placeholder="Nhập số phòng tắm"
                    @input="validateNumber('numBathrooms')"
                    class="form-control"
                    readonly
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label for="balconyDirection">Hướng ban công</label>
                  <input
                    type="text"
                    id="balconyDirection"
                    v-model="property.balconyDirection"
                    placeholder="Nhập số phòng tắm"
                    @input="validateNumber('numBathrooms')"
                    class="form-control"
                    readonly
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label for="legalStatus">Trạng thái pháp lý</label>
                  <input
                    type="text"
                    id="legalStatus"
                    v-model="property.legalStatus"
                    placeholder="Nhập số phòng tắm"
                    @input="validateNumber('numBathrooms')"
                    class="form-control"
                    readonly
                  />
                </div>
              </div>
            </div>

            <label for="image">Hình ảnh</label>
            <div class="image-gallery">
              <div v-for="(image, index) in property.images" :key="index" class="image-container">
                <img :src="image" alt="Hình ảnh bất động sản" class="property-image" />
              </div>
            </div>
            <div class="text-right">
              <button class="btn btn-primary" @click="goBack">Trở về</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const rootAPI = import.meta.env.VITE_APP_ROOT_API
const router = useRouter()
const isLoading = ref(false)
const route = useRoute()

const property = ref({
  title: '',
  description: '',
  propertyType: '',
  address: '',
  district: '',
  area: '',
  price: '',
  numBedrooms: '',
  numBathrooms: '',
  floorCount: '',
  furniture: '',
  houseDirection: '',
  balconyDirection: '',
  legalStatus: '',
  files: [],
})

const goBack = () => {
  router.go(-1)
}

const fetchPropertyDetails = async () => {
  try {
    const response = await axios.get(`${rootAPI}/properties/${route.params.id}`)
    property.value = response.data.data
  } catch (error) {
    console.error('Lỗi khi tải dữ liệu', error)
  }
}

onMounted(async () => {
  await fetchPropertyDetails()
})
</script>

<style>
.image-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.image-container {
  width: auto; /* Điều chỉnh kích thước tùy theo yêu cầu */
  height: 300px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.property-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Đảm bảo hình ảnh vừa khung mà không méo */
  border-radius: 8px;
}
</style>
  