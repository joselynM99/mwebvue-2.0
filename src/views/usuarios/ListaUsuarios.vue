<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong style="margin-right:5px;">Usuarios</strong>
          <CSpinner v-if="isLoading" color="success" class="spinner-border-sm" />
          <CButton color="success" size="sm" @click="goToRegistrarUsuario" style="float: right;">
            Registrar Usuario
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CAlert v-if="error" color="danger" dismissible @close="error = null">
            {{ error }}
          </CAlert>
          <div class="table-responsive">
            <div class="scroll-indicator">
              <span class="arrow"><i class="fas fa-arrow-left"></i></span> Desliza para ver más
              <span class="arrow"><i class="fas fa-arrow-right"></i></span>
            </div>
            <CTable v-if="usuarios.length > 0" hover>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell scope="col" class="text-center">Acciones</CTableHeaderCell>
                  <CTableHeaderCell v-for="column in columns" :key="column.key" scope="col" @click="sortBy(column.key)"
                    style="cursor: pointer;">
                    {{ column.label }}
                    <i v-if="sortKey !== column.key" class="fas fa-sort"></i>
                    <span v-if="sortKey === column.key">
                      <i :class="sortOrder === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down'"></i>
                    </span>
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow v-for="usuario in sortedUsuarios" :key="usuario.id">
                  <CTableDataCell class="text-center">
                    <div class="action-buttons">
                      <CButton color="warning" size="sm" @click="actualizarUsuario(usuario.email)">
                        <i class="fas fa-edit"></i>
                      </CButton>
  
                    </div>
                  </CTableDataCell>
                  <CTableDataCell v-for="column in columns" :key="column.key" class="text-wrap">
                    <template v-if="column.key === 'estado'">
                      {{ usuario.estado ? 'Activo' : 'Inactivo' }}
                    </template>
                    <template v-else>
                      {{ usuario[column.key] }}
                    </template>
                  </CTableDataCell>
  
                </CTableRow>
              </CTableBody>
            </CTable>
          </div>
          <CAlert v-if="!usuarios.length && !error && !isLoading" color="info">
            No se encontraron usuarios.
          </CAlert>
        </CCardBody>
      </CCard>
    </CCol>
  
  
  </CRow>
</template>

<script>
import {
  listarUsuariosFachada
} from '../../assets/js/usuarios';
import '@fortawesome/fontawesome-free/css/all.css'; // Import Font Awesome CSS

export default {
  data() {
    return {
      usuarios: [],
      error: null,
      isLoading: false,
      isDeleting: false,
      visibleConfirmacion: false,
      usuarioSeleccionado: null,
      sortKey: '',
      sortOrder: 'asc',
      columns: [
        { key: 'email', label: 'Usuario' },
        { key: 'perfil', label: 'Rol' },
        { key: 'nombres', label: 'Nombres' },
        { key: 'apellidos', label: 'Apellidos' },
        { key: 'identificacion', label: 'Identificación' },
        { key: 'tipoId', label: 'Tipo Identificación' },
        { key: 'estado', label: 'Estado' }
      ]
    };
  },
  computed: {
    sortedUsuarios() {
      const sorted = [...this.usuarios];
      if (this.sortKey) {
        sorted.sort((a, b) => {
          let aValue = a[this.sortKey];
          let bValue = b[this.sortKey];

          if (typeof aValue === 'string') aValue = aValue.toLowerCase();
          if (typeof bValue === 'string') bValue = bValue.toLowerCase();

          if (aValue < bValue) return this.sortOrder === 'asc' ? -1 : 1;
          if (aValue > bValue) return this.sortOrder === 'asc' ? 1 : -1;
          return 0;
        });
      }
      return sorted;
    }
  },
  mounted() {
    this.fetchUsuarios();
  },
  methods: {

    goToRegistrarUsuario() {
      this.$router.push({ name: 'Registrar Usuario' });
    },
    async fetchUsuarios() {
      this.isLoading = true;
      try {
        const us = JSON.parse(localStorage.getItem('usuario'));
        const response = await listarUsuariosFachada();
        this.usuarios = response.filter(usuario => usuario.email !== us.email);

      } catch (err) {
        this.error = 'Error al obtener la lista de usuarios. Inténtalo de nuevo más tarde.';
        console.error('Error al obtener usuarios:', err);
      } finally {
        this.isLoading = false;
      }
    },


    actualizarUsuario(email) {
      this.$router.push({
        name: 'Actualizar Usuario',
        query: { username: email }
      });
    },
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrder = 'asc';
      }
    }
  }
};
</script>

<style scoped>
.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
}

.text-wrap {
  max-width: 150px;
  word-wrap: break-word;
  white-space: normal;
}

.action-buttons {
  display: flex;
  gap: 5px;
  justify-content: center;
}

.scroll-indicator {
  display: none;
}

@media (max-width: 768px) {
  .scroll-indicator {
    display: block;
    position: relative;
    background-color: rgba(0, 0, 0, 0.1);
    color: #666;
    padding: 5px 10px;
    font-size: 0.8rem;
    text-align: center;
    margin-bottom: 10px;
    border-radius: 5px;
  }

  .scroll-indicator .arrow {
    font-size: 1rem;
    margin: 0 5px;
  }

  .table-responsive::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
    height: 7px;
  }

  .table-responsive::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, .5);
    -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, .5);
  }

  CTableHeaderCell {
    font-size: 0.9rem;
  }

  .table-responsive th {
    white-space: nowrap;
    cursor: pointer;
  }

  .table-responsive th:hover {
    background-color: #f8f9fa;
  }
}
</style>
