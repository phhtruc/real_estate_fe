<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'

const rootAPI = import.meta.env.VITE_APP_ROOT_API
const router = useRouter()
const showSearch = ref(false)
const properties = ref([])
const isModalVisible = ref(false)
const selectedPropertyId = ref(null)
const sortPrice = ref(null)
const currentPage = ref(1)
const perPage = ref(10)
const totalRows = ref(0)
const propertyTypes = ref([])

const province = ref('')
const selectedPropertyType = ref('')
const selectedArea = ref('')
const selectedPrice = ref('')
const selectedBedrooms = ref('')
const selectedBathrooms = ref('')
const selectedFloors = ref('')
const selectedFurniture = ref('')
const selectedBalconyDirection = ref('')
const selectedHouseDirection = ref('')
const selectedLegalStatus = ref('')

const resetFilters = async () => {
  province.value = ''
  selectedPropertyType.value = ''
  selectedArea.value = ''
  selectedPrice.value = ''
  selectedBedrooms.value = ''
  selectedBathrooms.value = ''
  selectedFloors.value = ''
  selectedFurniture.value = ''
  selectedBalconyDirection.value = ''
  selectedHouseDirection.value = ''
  selectedLegalStatus.value = ''

  await nextTick()
}

const toggleSearch = () => {
  showSearch.value = !showSearch.value
}

const searchProperties = () => {
  console.log('Tìm kiếm bất động sản với từ khóa và loại BĐS đã chọn')
}

const filterPrices = (order) => {
  filterPrice(order)
}

const fetchProperties = async () => {
  try {
    const response = await axios.get(`${rootAPI}/properties`, {
      params: {
        page: currentPage.value,
        pageSize: perPage.value,
      },
    })
    properties.value = response.data.data.items

    perPage.value = response.data.data.pageSize
    totalRows.value = response.data.data.totalPage * perPage.value
  } catch (error) {
    console.error('Error fetching', error)
  }
}

const pageChanged = (page) => {
  currentPage.value = page
  fetchProperties()
}

watch(currentPage, () => {
  fetchProperties()
})

const deleteProperty = (id) => {
  selectedPropertyId.value = id
  isModalVisible.value = true
}

const viewProperty = (id) => {
  router.push({ name: 'PropertyDetails', params: { id } })
}

const updateProperty = (id) => {
  router.push({ name: 'UpdateProperty', params: { id } })
}

const deleteCourse = () => {
  isModalVisible.value = true
}

const handleDelete = async () => {
  if (!selectedPropertyId.value) return

  try {
    await axios.delete(`${rootAPI}/properties/${selectedPropertyId.value}`)
    await fetchProperties()
    isModalVisible.value = false
    toast.success('Xóa bất động sản thành công')
  } catch (error) {
    console.error('Lỗi khi xóa:', error)
    toast.error('Có lỗi xảy ra')
  }
}

const filterPrice = async (sortPrice) => {
  try {
    const response = await axios.get(`${rootAPI}/properties/search`, {
      params: {
        sortPrice: sortPrice,
        page: currentPage.value,
        pageSize: perPage.value,
      },
    })
    properties.value = response.data.data.items

    perPage.value = response.data.data.pageSize
    totalRows.value = response.data.data.totalPage * perPage.value
  } catch (error) {
    console.error('Error fetching', error)
  }
}

const filterProperties = async () => {
  let minPrice = null,
    maxPrice = null
  let minArea = null,
    maxArea = null

  if (selectedPrice.value.includes('-')) {
    const [min, max] = selectedPrice.value.split('-').map(Number)
    minPrice = min * 1000000
    maxPrice = max * 1000000
  }

  if (selectedArea.value.includes('-')) {
    const [min, max] = selectedArea.value.split('-').map(Number)
    minArea = min
    maxArea = max
  }

  const filters = {
    province: province.value,
    propertyType: selectedPropertyType.value,
    minPrice: minPrice,
    maxPrice: maxPrice,
    minArea: minArea,
    maxArea: maxArea,
    numBedrooms: selectedBedrooms.value,
    numBathrooms: selectedBathrooms.value,
    floors: selectedFloors.value,
    furniture: selectedFurniture.value,
    balconyDirection: selectedBalconyDirection.value,
    houseDirection: selectedHouseDirection.value,
    legalStatus: selectedLegalStatus.value,
  }
  try {
    const response = await axios.get(`${rootAPI}/properties/search`, {
      params: {
        ...filters,
        page: currentPage.value,
        pageSize: perPage.value,
      },
    })
    properties.value = response.data.data.items

    perPage.value = response.data.data.pageSize
    totalRows.value = response.data.data.totalPage * perPage.value
  } catch (error) {
    console.error('Error fetching', error)
  }
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
  await fetchProperties()
  await fetchPropertyType()
})
</script>

<template>
  <div id="content-page" class="content-page">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <div class="iq-card">
            <div class="iq-card-header d-flex justify-content-between">
              <div class="iq-header-title">
                <h4 class="card-title">Quản lý bất động sản</h4>
              </div>
            </div>
            <div class="iq-card-body">
              <div id="table" class="table-editable">
                <div class="d-flex justify-content-between mb-3">
                  <div>
                    <button class="btn btn-sm iq-bg-info" @click="toggleSearch">
                      <i class="ri-search-line"></i><span class="pl-1">Tìm kiếm nâng cao</span>
                    </button>
                  </div>
                  <div>
                    <button class="btn btn-sm iq-bg-info" @click="filterPrices('desc')">
                      <i class="ri-filter-2-line"></i><span class="pl-1">Giá Cao -> Thấp</span>
                    </button>
                    <button class="btn btn-sm iq-bg-info mx-2" @click="filterPrices('asc')">
                      <i class="ri-filter-2-line"></i><span class="pl-1">Giá Thấp -> Cao</span>
                    </button>
                    <router-link to="/add-property" class="btn btn-sm iq-bg-success">
                      <i class="ri-add-fill"></i><span class="pl-1">Thêm mới</span>
                    </router-link>
                  </div>
                </div>

                <div v-if="showSearch" class="advanced-search mb-3">
                  <form @submit.prevent="filterProperties">
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group">
                          <label for="province">Tỉnh thành</label>
                          <input
                            id="province"
                            v-model="province"
                            placeholder="Nhập tỉnh thành"
                            class="form-control"
                          />
                        </div>
                      </div>

                      <div class="col-md-4">
                        <div class="form-group">
                          <label for="propertyType">Loại BĐS</label>
                          <select
                            id="propertyType"
                            v-model="selectedPropertyType"
                            class="form-control"
                          >
                            <option value="">Chọn loại BĐS</option>
                            <option
                              v-for="(type, index) in propertyTypes"
                              :key="index"
                              :value="type.name"
                            >
                              {{ type.name }}
                            </option>
                          </select>
                        </div>
                      </div>

                      <div class="col-md-4">
                        <div class="form-group">
                          <label for="areaRange">Diện tích</label>
                          <select id="areaRange" v-model="selectedArea" class="form-control">
                            <option value="">Chọn diện tích</option>
                            <option value="0-30">Dưới 30 m²</option>
                            <option value="30-50">30 - 50 m²</option>
                            <option value="50-80">50 - 80 m²</option>
                            <option value="80-100">80 - 100 m²</option>
                            <option value="100-150">100 - 150 m²</option>
                            <option value="150-200">150 - 200 m²</option>
                            <option value="200-250">200 - 250 m²</option>
                            <option value="250-300">250 - 300 m²</option>
                            <option value="300-500">300 - 500 m²</option>
                            <option value="500-500000">Trên 500 m²</option>
                          </select>
                        </div>
                      </div>

                      <div class="col-md-4">
                        <div class="form-group">
                          <label for="priceRange">Mức giá</label>
                          <select id="priceRange" v-model="selectedPrice" class="form-control">
                            <option value="">Mức giá</option>
                            <option value="0-500">Dưới 500 triệu</option>
                            <option value="500-800">500 - 800 triệu</option>
                            <option value="800-1">800 triệu - 1 tỷ</option>
                            <option value="1000-2000">1 - 2 tỷ</option>
                            <option value="2000-3000">2 - 3 tỷ</option>
                            <option value="3000-5000">3 - 5 tỷ</option>
                            <option value="5000-7000">5 - 7 tỷ</option>
                            <option value="7000-10000">7 - 10 tỷ</option>
                            <option value="10000-20000">10 - 20 tỷ</option>
                            <option value="20000-30000">20 - 30 tỷ</option>
                            <option value="30000-40000">30 - 40 tỷ</option>
                            <option value="40000-60000">40 - 60 tỷ</option>
                            <option value="60000-60000000">Trên 60 tỷ</option>
                          </select>
                        </div>
                      </div>

                      <div class="col-md-4">
                        <div class="form-group">
                          <label for="bedrooms">Số phòng ngủ</label>
                          <select id="bedrooms" v-model="selectedBedrooms" class="form-control">
                            <option value="">Chọn số phòng ngủ</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5+</option>
                          </select>
                        </div>
                      </div>

                      <div class="col-md-4">
                        <div class="form-group">
                          <label for="bathrooms">Số phòng tắm</label>
                          <select id="bathrooms" v-model="selectedBathrooms" class="form-control">
                            <option value="">Chọn số phòng tắm</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5+</option>
                          </select>
                        </div>
                      </div>

                      <div class="col-md-4">
                        <div class="form-group">
                          <label for="furniture">Nội thất</label>
                          <select id="furniture" v-model="selectedFurniture" class="form-control">
                            <option value="">Nội thất</option>
                            <option value="FULL">Đầy đủ</option>
                            <option value="BASIC">Cơ bản</option>
                            <option value="NONE">Không có</option>
                          </select>
                        </div>
                      </div>

                      <div class="col-md-4">
                        <div class="form-group">
                          <label for="balconyDirection">Hướng nhà</label>
                          <select
                            id="houseDirection"
                            v-model="selectedHouseDirection"
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
                          <label for="legalStatus">Tình trạng pháp lý</label>
                          <select
                            id="legalStatus"
                            v-model="selectedLegalStatus"
                            class="form-control"
                          >
                            <option value="">Tình trạng pháp lý</option>
                            <option value="RED_BOOK">Sổ đỏ</option>
                            <option value="PINK_BOOK">Sổ hồng</option>
                            <option value="CONTRACT">Hợp đồng</option>
                            <option value="WAITTING">Chờ xét duyệt</option>
                            <option value="PAPER_HAND">Sang tên</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex justify-content-center">
                      <button class="btn btn-danger mt-2 mx-2" @click="resetFilters">
                        Đặt lại
                      </button>
                      <button class="btn btn-primary mt-2">Tìm kiếm</button>
                    </div>
                  </form>
                </div>

                <table class="table table-bordered table-responsive-md table-striped text-center">
                  <thead>
                    <tr>
                      <th>Tên</th>
                      <th>Loại BĐS</th>
                      <th>Diện tích</th>
                      <th>Giá</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(property, index) in properties" :key="index">
                      <td contenteditable="true" class="property-title">
                        <img
                          :src="property.images[0]"
                          alt="Property Image"
                          class="img-thumbnail"
                          style="width: 60px; height: 60px; margin-right: 2px"
                        />
                        <router-link
                          :to="`/properties/${property.id}`"
                          class="property-link"
                          style="text-decoration: none; color: inherit"
                        >
                          {{ property.title }}
                        </router-link>
                      </td>
                      <td contenteditable="true">{{ property.propertyType.name }}</td>
                      <td contenteditable="true">{{ property.area }} m2</td>
                      <td>{{ property.price.toLocaleString('vi-VN') }} đ</td>
                      <td>
                        <span class="table-actions">
                          <button
                            @click="viewProperty(property.id)"
                            class="btn btn-info btn-sm mx-1"
                          >
                            <i class="ri-eye-line mr-0"></i>
                          </button>
                          <button
                            @click="updateProperty(property.id)"
                            class="btn btn-warning btn-sm mx-1"
                          >
                            <i class="ri-pencil-line mr-0"></i>
                          </button>
                          <button
                            @click="deleteProperty(property.id)"
                            class="btn btn-danger btn-sm mx-1"
                          >
                            <i class="ri-delete-bin-line mr-0"></i>
                          </button>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <b-modal
                  v-model="isModalVisible"
                  title="Xác nhận xóa"
                  ok-title="Xóa"
                  cancel-title="Đóng"
                  ok-variant="danger"
                  @ok="handleDelete"
                >
                  <p>Bạn có chắc chắn xóa không?</p>
                </b-modal>
                <!-- Phân trang -->
                <b-pagination
                  v-if="totalRows > 0"
                  v-model="currentPage"
                  :total-rows="totalRows"
                  :per-page="perPage"
                  first-number
                  last-number
                  class="justify-content-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.property-title {
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}
</style>