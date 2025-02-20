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
                required
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
                required
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
                    required
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
                    required
                  />
                </div>
                <small v-if="errors.area" class="text-danger">{{ errors.area }}</small>
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
                    required
                  />
                </div>
                <small v-if="errors.price" class="text-danger">{{ errors.price }}</small>
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
                    required
                  />
                </div>
                <small v-if="errors.floorCount" class="text-danger">{{ errors.floorCount }}</small>
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
                    required
                  />
                </div>
                <small v-if="errors.numBedrooms" class="text-danger">{{
                  errors.numBedrooms
                }}</small>
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
                    required
                  />
                </div>
                <small v-if="errors.numBathrooms" class="text-danger">{{
                  errors.numBathrooms
                }}</small>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label for="furniture">Nội thất</label>
                  <select id="furniture" v-model="property.furniture" class="form-control">
                    <option value="">Nội thất</option>
                    <option value="FULL">Đầy đủ</option>
                    <option value="BASIC">Cơ bản</option>
                    <option value="NONE">Không có</option>
                  </select>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label for="propertyType">Loại BĐS</label>
                  <select id="propertyType" v-model="property.propertyType" class="form-control">
                    <option value="">Chọn loại BĐS</option>
                    <option v-for="(type, index) in propertyTypes" :key="index" :value="type.name">
                      {{ type.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label for="houseDirection">Hướng nhà</label>
                  <select
                    id="houseDirection"
                    v-model="property.houseDirection"
                    class="form-control"
                  >
                    <option value="">Hướng nhà</option>
                    <option value="NORTH">Bắc</option>
                    <option value="SOUTH">Nam</option>
                    <option value="EAST">Đông</option>
                    <option value="WEST">Tây</option>
                    <option value="NORTHEAST">Đông Bắc</option>
                    <option value="NORTHWEST">Tây Bắc</option>
                    <option value="SOUTHEAST">Đông Nam</option>
                    <option value="SOUTHWEST">Tây Nam</option>
                  </select>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label for="balconyDirection">Hướng ban công</label>
                  <select
                    id="balconyDirection"
                    v-model="property.balconyDirection"
                    class="form-control"
                  >
                    <option value="">Hướng ban công</option>
                    <option value="NORTH">Bắc</option>
                    <option value="SOUTH">Nam</option>
                    <option value="EAST">Đông</option>
                    <option value="WEST">Tây</option>
                    <option value="NORTHEAST">Đông Bắc</option>
                    <option value="NORTHWEST">Tây Bắc</option>
                    <option value="SOUTHEAST">Đông Nam</option>
                    <option value="SOUTHWEST">Tây Nam</option>
                  </select>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label for="legalStatus">Trạng thái pháp lý</label>
                  <select id="legalStatus" v-model="property.legalStatus" class="form-control">
                    <option value="">Trạng thái pháp lý</option>
                    <option value="RED_BOOK">Sổ đỏ</option>
                    <option value="PINK_BOOK">Sổ hồng</option>
                    <option value="CONTRACT">Hợp đồng</option>
                    <option value="WAITTING">Chờ xét duyệt</option>
                    <option value="PAPER_HAND">Sang tên</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Upload ảnh -->
            <label for="image">Hình ảnh</label>
            <file-pond
              name="files"
              label-idle="Kéo thả hoặc chọn ảnh"
              allow-multiple="true"
              accepted-file-types="image/*"
              :files="[]"
              @updatefiles="handleUpload"
              aria-required="true"
            />
            <small v-if="errors.files" class="text-danger">{{ errors.files }}</small>

            <div class="text-right">
              <button class="btn btn-primary" @click="addProperty" :disabled="isLoading">
                <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
                <span v-else>Lưu</span>
              </button>
              <button type="button" class="btn iq-bg-danger ml-2" @click="cancel">Hủy</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
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
const propertyTypes = ref([])
const isLoading = ref(false)

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

const errors = ref({
  area: '',
  price: '',
  floorCount: '',
  numBedrooms: '',
  numBathrooms: '',
  files: '',
})

const validateNumber = (field) => {
  const value = property.value[field]

  if (!/^\d+(\.\d+)?$/.test(value)) {
    errors.value[field] = 'Chỉ được nhập số nguyên dương'
  } else {
    errors.value[field] = ''
  }
}

const validateForm = () => {
  validateNumber('area')
  validateNumber('price')
  validateNumber('floorCount')
  validateNumber('numBedrooms')
  validateNumber('numBathrooms')

  errors.value.files = property.value.files.length > 0 ? '' : 'Vui lòng chọn ít nhất 1 ảnh'

  return Object.values(errors.value).every((err) => err === '')
}

// Xử lý upload ảnh bằng FilePond
const FilePond = vueFilePond(FilePondPluginImagePreview, FilePondPluginFileValidateType)
const handleUpload = (files) => {
  property.value.files = files.map((fileItem) => fileItem.file) || []
}

const addProperty = async () => {
  if (!validateForm()) {
    console.log('Form có lỗi, không gửi dữ liệu')
    return
  }
  isLoading.value = true
  const formData = new FormData()

  for (const key in property.value) {
    if (key !== 'file') {
      formData.append(key, property.value[key])
    }
  }

  if (Array.isArray(property.value.files) && property.value.files.length > 0) {
    property.value.files.forEach((file) => {
      formData.append('files', file)
    })
  }

  try {
    await axios.post(`${rootAPI}/properties`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    toast.success('Thêm thành công', {
      position: 'top-right',
      autoClose: 1000,
    })
    setTimeout(() => {
      router.push('/')
    }, 1100)
  } catch (error) {
    console.error('Error', error)
  } finally {
    isLoading.value = false
  }
}

const cancel = () => {
  router.push('/')
}

const goBack = () => {
  router.go(-1)
}

const fetchPropertyType = async () => {
  try {
    const response = await axios.get(`${rootAPI}/property-type`)
    propertyTypes.value = response.data.data.items
  } catch (error) {
    console.error('Error fetching', error)
  }
}

onMounted(async () => {
  await fetchPropertyType()
})
</script>
  