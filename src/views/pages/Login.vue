<template>
  <div class="wrapper min-vh-100 d-flex flex-row align-items-center">
    <!-- Botón flotante de cambio de tema -->
    <div style="position: fixed; top: 20px; right: 20px; z-index: 1000;">
      <CDropdown variant="btn-group" placement="bottom-end">
        <CDropdownToggle color="light">
          <i v-if="colorMode === 'dark'" class="fas fa-moon"></i>
          <i v-else-if="colorMode === 'light'" class="fas fa-sun"></i>
          <i v-else class="fas fa-adjust"></i>
        </CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem :active="colorMode === 'light'" component="button" @click="setColorMode('light')">
            <i class="fas fa-sun me-2"></i> Claro
          </CDropdownItem>
          <CDropdownItem :active="colorMode === 'dark'" component="button" @click="setColorMode('dark')">
            <i class="fas fa-moon me-2"></i> Oscuro
          </CDropdownItem>
          <CDropdownItem :active="colorMode === 'auto'" component="button" @click="setColorMode('auto')">
            <i class="fas fa-adjust me-2"></i> Automático
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </div>
  
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="6">
          <CCard class="p-4">
            <CCardBody>
              <CForm @submit.prevent="login">
                <div class="text-center mb-4">
                  <h1>Iniciar Sesión</h1>
                  <p class="text-body-secondary">Ingrese sus credenciales</p>
                </div>
  
                <!-- Usuario -->
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <i class="fas fa-user"></i>
                  </CInputGroupText>
                  <CFormInput v-model="email" placeholder="Usuario" autocomplete="username" required />
                </CInputGroup>
  
                <!-- Contraseña -->
                <CInputGroup class="mb-4">
                  <CInputGroupText>
                    <i class="fas fa-lock"></i>
                  </CInputGroupText>
                  <CFormInput :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Contraseña"
                    autocomplete="current-password" required />
                  <CButton type="button" color="secondary" variant="outline" @click="showPassword = !showPassword">
                    <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </CButton>
                </CInputGroup>
  
                <!-- Botón Ingresar -->
                <CRow>
                  <CCol class="d-flex justify-content-center">
                    <CButton color="success" class="px-4" type="submit" :disabled="loading">
                      {{ loading ? 'Ingresando...' : 'Ingresar' }}
                    </CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  
    <!-- Modal de error -->
    <CModal :visible="errorVisible" @close="errorVisible = false">
      <CModalHeader>
        <CModalTitle>Error de autenticación</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {{ errorMessage }}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="errorVisible = false">Cerrar</CButton>
      </CModalFooter>
    </CModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useColorModes } from '@coreui/vue'
import authService from '@/services/authService'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const errorVisible = ref(false)
const errorMessage = ref('')
const router = useRouter()

// Modo claro/oscuro
const { colorMode, setColorMode } = useColorModes('coreui-free-vue-admin-template-theme')

const login = () => {
  loading.value = true
  errorMessage.value = ''
  errorVisible.value = false

  authService.login(email.value, password.value)
    .then(() => {
      router.push('/inicio')
    })
    .catch(err => {
      errorMessage.value = err.message || 'Credenciales incorrectas'
      errorVisible.value = true
    })
    .finally(() => {
      loading.value = false
    })
}
</script>
<style scoped>
.dropdown-item:hover {
  background-color: #42b883;
  color: white;
  cursor: pointer;
}


.dropdown-item.active,
.dropdown-item:active {
  background-color: #42b883 !important;
  color: white;
  cursor: pointer;
}
</style>