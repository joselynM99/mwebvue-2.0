<template>
  <div class="bwrapper align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol>
          <CCard style="margin-bottom:12px;">
            <CCardBody class="p-3">
              <div v-if="isLoadingListas" class="text-center mt-3">
                <CSpinner color="success" />
                <p>Cargando...</p>
              </div>
              <CForm @submit.prevent="abrirCaja">
                <CAlert v-if="successMessage" color="success">{{ successMessage }}</CAlert>
                <CAlert v-if="errorMessage" color="danger">{{ errorMessage }}</CAlert>
                <div class="mb-2">
                  <label for="caja" class="form-label">Seleccionar Caja</label>
                  <CInputGroup>
                    <CInputGroupText><i class="fas fa-box"></i></CInputGroupText>
                    <CFormSelect id="caja" v-model="cuadreCaja.cajaId" required>
                      <option value="" disabled selected>Seleccione una caja</option>
                      <option v-for="caja in cajas" :key="caja.id" :value="caja.id">
                        {{ caja.nombre }}
                      </option>
                    </CFormSelect>
                    <div class="invalid-feedback">La caja es obligatoria</div>
                  </CInputGroup>
                </div>
  
                <div class="mb-2">
                  <label for="monto" class="form-label">Monto Inicial</label>
                  <CInputGroup>
                    <CInputGroupText><i class="fas fa-dollar-sign"></i></CInputGroupText>
                    <CFormInput type="number" id="monto" v-model="cuadreCaja.valorApertura" required />
                    <div class="invalid-feedback">El monto inicial es obligatorio</div>
                  </CInputGroup>
                </div>
                <!-- Separador: Registro Recargas -->
                <div class="mb-3 mt-4">
                  <hr />
                  <h5 class="text-center text-secondary">Registro valores de recargas</h5>
                </div>
  
                <div class="mb-2">
                  <label for="saldo" class="form-label">Saldo</label>
                  <CInputGroup>
                    <CInputGroupText><i class="fas fa-wallet"></i></CInputGroupText>
                    <CFormInput type="number" id="saldo" v-model="cuadreCaja.saldo" required step="any" />
                    <div class="invalid-feedback">El saldo es obligatorio</div>
                  </CInputGroup>
                </div>
  
                <div class="mb-2">
                  <label for="comision" class="form-label">Comisión</label>
                  <CInputGroup>
                    <CInputGroupText><i class="fas fa-percent"></i></CInputGroupText>
                    <CFormInput type="number" id="comision" v-model="cuadreCaja.comision" required step="any" />
                    <div class="invalid-feedback">La comisión es obligatoria</div>
                  </CInputGroup>
                </div>
  
                <div class="mb-2">
                  <label for="total" class="form-label">Total</label>
                  <CInputGroup>
                    <CInputGroupText><i class="fas fa-calculator"></i></CInputGroupText>
                    <CFormInput type="number" id="total" v-model="cuadreCaja.total" required step="any" />
                    <div class="invalid-feedback">El total es obligatorio</div>
                  </CInputGroup>
                </div>
  
  
                <div class="d-grid" style="width:30%; margin: 12px auto;">
                  <CButton type="submit" color="success" :disabled="isLoading">
                    Abrir Caja
                    <CSpinner v-if="isLoading" color="light" class="spinner-border-sm" />
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { obtenerCajasActivasFachada, abrirCajaFachada, buscarCuadreCajaActivoPorUsuarioFachada } from '@/assets/js/gestion-cajas';

export default {
  data() {
    return {
      usuario: null,
      cajas: [],
      cuadreCaja: {
        cajaId: '',
        valorApertura: 0,
        fechaApertura: new Date().toISOString(),
        usuario: null,
        saldo: 0,
        comision: 0,
        total: 0
      },

      isLoading: false,
      isLoadingListas: true,
      successMessage: '',
      errorMessage: ''
    };
  },
  async mounted() {
    this.usuario = JSON.parse(localStorage.getItem('usuario')).email;

    // Comprobar si ya existe una caja abierta
    try {
      const resultado = await buscarCuadreCajaActivoPorUsuarioFachada(this.usuario);
      if (resultado) {
        this.$router.go(-1);
      } else {
        this.cargarCajasActivas();
        this.cuadreCaja.username = this.usuario;

      }
    } catch (error) {
      console.error('Error al verificar cuadre de caja activo:', error);
      this.errorMessage = 'Error al verificar cuadre de caja activo. Inténtalo de nuevo más tarde.';
      this.isLoadingListas = false;
    }
  },
  methods: {
    async cargarCajasActivas() {
      this.isLoadingListas = true;
      try {
        this.cajas = await obtenerCajasActivasFachada();
      } catch (error) {
        console.error('Error al cargar cajas activas:', error);
        this.errorMessage = 'Error al cargar las cajas activas. Inténtalo de nuevo más tarde.';
      } finally {
        this.isLoadingListas = false;
      }
    },
    async abrirCaja() {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';
      try {
        await abrirCajaFachada(this.cuadreCaja);
        this.successMessage = 'Caja abierta exitosamente';
        this.resetForm();
        this.$router.push({ name: 'Ventas' });
      } catch (error) {
        console.error('Error al abrir la caja:', error);
        this.errorMessage = 'Ha ocurrido un error al abrir la caja. Inténtalo de nuevo más tarde.';
      } finally {
        this.isLoading = false;
      }
    },
    resetForm() {
      this.cuadreCaja = {
        cajaId: '',
        montoInicial: 0,
        fechaApertura: new Date().toISOString(),
        usuario: this.usuario
      };
    }
  }
};
</script>

<style scoped>
.bwrapper {
  justify-content: center;
  align-items: center;
  height: 50vh;
  text-align: center;
}

.CCard {
  margin: 0;
  padding: 0;
}

.form-label {
  font-size: 0.8rem;
  color: #6c757d;
  margin-bottom: 0.25rem;
  display: block;
  text-align: left;
}
</style>
