<template>
  <div class="bwrapper align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol>
          <CCard>
            <CCardBody class="p-3">
              <CForm @submit.prevent="registrarUsuario" novalidate :class="{ 'was-validated': wasValidated }">
                <p class="text-body-secondary"></p>
                <CAlert v-if="successMessage" color="success">{{ successMessage }}</CAlert>
                <CAlert v-if="errorMessage" color="danger">{{ errorMessage }}</CAlert>
                <CRow>
                  <CCol>
                    <div class="mb-2">
                      <label for="nombreUsuario" class="form-label">Nombre de usuario</label>
                      <CInputGroup>
                        <CInputGroupText>
                          <i class="fas fa-user fa-fw"></i>
                        </CInputGroupText>
                        <CFormInput id="email" v-model="usuario.email" placeholder="Nombre de usuario" required />
  
                        <div class="invalid-feedback">El nombre de usuario es obligatorio</div>
                      </CInputGroup>
                    </div>
  
                    <div class="mb-2">
                      <label for="rol" class="form-label">Rol</label>
                      <CInputGroup>
                        <CInputGroupText>
                          <i class="fas fa-user-tag fa-fw"></i>
                        </CInputGroupText>
                        <CFormSelect id="rol" v-model="usuario.perfil" required>
                          <option disabled :selected="!usuario.perfil" value="">Seleccione un rol</option>
                          <option v-for="rol in roles" :key="rol" >{{ rol }}</option>
                        </CFormSelect>
                        <div class="invalid-feedback">El rol es obligatorio</div>
                      </CInputGroup>
                    </div>
  
                    <div class="mb-2">
                      <label for="nombre" class="form-label">Nombres</label>
                      <CInputGroup>
                        <CInputGroupText>
                          <i class="fas fa-id-card fa-fw"></i>
                        </CInputGroupText>
                        <CFormInput id="nombre" v-model="usuario.nombres" placeholder="Nombre" required />
                        <div class="invalid-feedback">El nombre es obligatorio</div>
                      </CInputGroup>
                    </div>
  
                    <div class="mb-2">
                      <label for="apellido" class="form-label">Apellidos</label>
                      <CInputGroup>
                        <CInputGroupText>
                          <i class="fas fa-id-card-alt fa-fw"></i>
                        </CInputGroupText>
                        <CFormInput id="apellido" v-model="usuario.apellidos" placeholder="Apellido" required />
                        <div class="invalid-feedback">El apellido es obligatorio</div>
                      </CInputGroup>
                    </div>
  
                  </CCol>
                  <CCol :md="6">
  
                    <div class="mb-2">
                      <label for="tipoIdentificacion" class="form-label">Tipo de identificación</label>
                      <CInputGroup>
                        <CInputGroupText>
                          <i class="fas fa-id-badge fa-fw"></i>
                        </CInputGroupText>
                        <CFormSelect id="tipoIdentificacion" v-model="usuario.tipoId" required>
                          <option disabled :selected="!usuario.tipoId" value="">Seleccione un tipo de
                            identificación</option>
                          <option v-for="tipo in tiposIdentificacion" :key="tipo" :value="tipo">{{ tipo }}</option>
                        </CFormSelect>
                        <div class="invalid-feedback">El tipo de identificación es obligatorio</div>
                      </CInputGroup>
                    </div>
  
                    <div class="mb-2">
                      <label for="identificacion" class="form-label">Identificación</label>
                      <CInputGroup>
                        <CInputGroupText>
                          <i class="fas fa-id-card fa-fw"></i>
                        </CInputGroupText>
                        <CFormInput id="identificacion" v-model="usuario.identificacion" placeholder="Identificación"
                          required />
                        <div class="invalid-feedback">La identificación es obligatoria</div>
                      </CInputGroup>
                    </div>
                    <div class="mb-2">
                      <label for="password" class="form-label">Contraseña</label>
                      <CInputGroup>
                        <CInputGroupText>
                          <i class="fas fa-lock fa-fw"></i>
                        </CInputGroupText>
                        <CFormInput id="password" v-model="usuario.password" type="password" placeholder="Contraseña"
                          autocomplete="new-password" required
                          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}" />
                        <div class="invalid-feedback">La contraseña debe tener al menos 8 caracteres, incluyendo una
                          letra mayúscula, una letra minúscula, un número y un carácter especial</div>
                      </CInputGroup>
                    </div>
  
                    <div class="mb-4">
                      <label for="passwordConfirm" class="form-label">Confirmar contraseña</label>
                      <CInputGroup>
                        <CInputGroupText>
                          <i class="fas fa-lock fa-fw"></i>
                        </CInputGroupText>
                        <CFormInput id="passwordConfirm" v-model="usuario.passwordConfirm" type="password"
                          placeholder="Repita la contraseña" autocomplete="new-password" required />
                        <div class="invalid-feedback">La confirmación de la contraseña es obligatoria y debe coincidir
                        </div>
                      </CInputGroup>
                    </div>
                  </CCol>
                </CRow>
                <div class="d-grid" style="width:30%; margin: 5px auto;">
                  <CButton color="success" type="submit" :disabled="isLoading">
                    Registrar
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
import { listarRolesFachada, crearUsuarioFachada } from '@/assets/js/usuarios';

export default {
  data() {
    return {
      usuario: {
        id: null,
        email: '',
        password: '',
        passwordConfirm: '',
        nombres: '',
        apellidos: '',
        identificacion: '',
        tipoId: '',
        perfil: '',
        estado: true
      },

      roles: [],
      tiposIdentificacion: ['CEDULA', 'RUC', 'PASAPORTE', 'PLACA', 'INTERNACIONAL'],
      successMessage: '',
      errorMessage: '',
      wasValidated: false,
      isLoading: false
    };
  },
  
  mounted() {
    this.fetchRoles();
  },
  methods: {
    async fetchRoles() {
      try {
        this.roles = await listarRolesFachada();
      } catch (error) {
        this.errorMessage = 'Error al cargar los roles';
        console.error('Error al listar roles:', error);
      }
    },

    resetForm() {
      this.usuario = {
        id: null,
        email: '',
        password: '',
        passwordConfirm: '',
        nombres: '',
        apellidos: '',
        identificacion: '',
        tipoId: '',
        perfil: '',
        estado: true
      };

      this.wasValidated = false;
    },
    async registrarUsuario() {
      this.wasValidated = true;
      this.errorMessage = '';
      this.successMessage = '';

      console.log('Registrando usuario:', this.usuario);

      // Validar que todos los campos estén completos
      if (
        !this.usuario.email ||
        !this.usuario.nombres ||
        !this.usuario.apellidos ||
        !this.usuario.identificacion ||
        !this.usuario.tipoId ||
        !this.usuario.perfil ||
        !this.usuario.password ||
        !this.usuario.passwordConfirm
      ) {
        this.errorMessage = 'Por favor, complete todos los campos obligatorios';
        this.isLoading = false;
        return;
      }


      // Validar que las contraseñas coincidan
      if (this.usuario.password !== this.usuario.passwordConfirm) {
        this.errorMessage = 'Las contraseñas no coinciden';
        this.isLoading = false;
        return;
      }

      // Validar que los campos cumplan con los patrones requeridos
      const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}/;



      if (!passwordPattern.test(this.usuario.password)) {
        this.isLoading = false;
        return;
      }

      // Si todos los campos son válidos, proceder con el registro
      this.isLoading = true;
      try {
        await crearUsuarioFachada(this.usuario);
        this.successMessage = 'Usuario registrado exitosamente';
        this.errorMessage = '';
        this.resetForm();
      } catch (error) {
        this.errorMessage = 'Ha ocurrido un error al registrar el usuario, intente con otro nombre de usuario o correo';
        this.successMessage = '';
        console.error('Error al registrar usuario:', error);
      } finally {
        this.isLoading = false;
      }
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
