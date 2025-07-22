<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong style="margin-right:5px;">Clientes</strong>
          <CSpinner v-if="isLoading" color="success" class="spinner-border-sm" />
          <CButton color="success" size="sm" @click="goToRegistrarCliente" style="float: right;">
            Registrar Clientes
          </CButton>
  
        </CCardHeader>
        <CCardBody>
  
          <!-- Búsqueda por Nombre (automática) -->
          <CFormInput style="width: 400px; margin-bottom: 10px;" v-model="searchQueryNombre"
            @input="buscarClientesPorNombre" placeholder="Buscar por nombre" />
  
  
  
          <!-- Búsqueda por Identificación (solo con botón) -->
          <CInputGroup style="width: 400px; margin-bottom: 20px;">
            <CFormInput v-model="searchIdentificacion" placeholder="Buscar por identificación" />
            <CInputGroupText style="padding:0px 5px">
              <button @click="buscarClientePorIdentificacion" :disabled="isLoading"
                style="border: none; background: none; margin:0px; padding:5px">
                Buscar
              </button>
            </CInputGroupText>
          </CInputGroup>
  
          <CAlert v-if="error" color="danger" dismissible @close="error = null">
            {{ error }}
          </CAlert>
          <CAlert v-if="infoMessage" color="info" dismissible @close="infoMessage = null">
            {{ infoMessage }}
          </CAlert>
          <div class="table-responsive">
            <div class="scroll-indicator">
              <span class="arrow">←</span> Desliza para ver más <span class="arrow">→</span>
            </div>
            <CTable v-if="sortedClientes.length > 0" hover>
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
                <CTableRow v-for="cliente in sortedClientes" :key="cliente.id">
                  <CTableDataCell class="text-center">
                    <div class="action-buttons">
                      <CButton color="warning" size="sm" @click="actualizarCliente(cliente.identificacion)">
                        <i class="fas fa-edit"></i>
                      </CButton>
  
                    </div>
                  </CTableDataCell>
                  <CTableDataCell class="text-wrap">{{ cliente.apellidos }}</CTableDataCell>
                  <CTableDataCell class="text-wrap">{{ cliente.nombres }}</CTableDataCell>
  
                  <CTableDataCell class="text-wrap">{{ cliente.identificacion }}</CTableDataCell>
                  <CTableDataCell class="text-wrap">{{ cliente.correo }}</CTableDataCell>
  
                </CTableRow>
              </CTableBody>
            </CTable>
          </div>
          <CAlert v-if="!sortedClientes.length && !error && !isLoading && !infoMessage" color="info">
            No se encontraron clientes.
          </CAlert>
        </CCardBody>
      </CCard>
    </CCol>
  
  
  </CRow>
</template>

<script>
import { debounce } from 'lodash';
import { buscarClientesPorNombreFachada, obtenerClientesFachada, obtenerClientePorIdentificacionFachada } from '@/assets/js/clientes';

export default {
  data() {
    return {

      searchQueryNombre: '',
      searchIdentificacion: '',
      tipoBusqueda: '', // 'nombre' o 'identificacion'

      searchQuery: '',
      clientes: [],
      isLoading: false,
      error: null,
      infoMessage: null,
      isDeleting: false,
      clienteSeleccionado: null,
      visibleConfirmacion: false,
      sortKey: '',
      sortOrder: 'asc',
      columns: [

        { key: 'apellidos', label: 'Apellidos' },
        { key: 'nombres', label: 'Nombres' },
        { key: 'identificacion', label: 'Identificación' },
        { key: 'correo', label: 'Correo' }

      ]
    };
  },
  computed: {
    sortedClientes() {
      const filtrados = this.clientes.filter(cliente => {
        const campos = [
          cliente.nombres,
          cliente.apellidos,
          cliente.correo,
          cliente.telefono,
          cliente.identificacion
        ];
        return !campos.every(campo =>
          campo && campo.trim().toUpperCase() === 'CONSUMIDOR FINAL'
        );
      });

      // Ordenar por apellidos y luego por nombres (alfabéticamente A-Z)
      const sorted = filtrados.sort((a, b) => {
        const apellidoA = a.apellidos?.toLowerCase() || '';
        const apellidoB = b.apellidos?.toLowerCase() || '';
        if (apellidoA < apellidoB) return -1;
        if (apellidoA > apellidoB) return 1;

        const nombreA = a.nombres?.toLowerCase() || '';
        const nombreB = b.nombres?.toLowerCase() || '';
        return nombreA.localeCompare(nombreB);
      });

      // Si hay sortKey personalizado, aplicar
      if (this.sortKey) {
        return [...sorted].sort((a, b) => {
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

  methods: {

    goToRegistrarCliente() {
      this.$router.push({ name: 'Registrar Cliente' });
    },

    async fetchClientes() {
      this.isLoading = true;
      this.error = null;
      this.infoMessage = null;
      try {
        const response = await obtenerClientesFachada();
        this.clientes = response;

      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.infoMessage = 'No se encontraron clientes';
        } else {
          this.error = 'Error al obtener la lista de clientes. Inténtalo de nuevo más tarde.';
        }
      } finally {
        this.isLoading = false;
      }
    },
    async buscarClientesPorNombre() {
      if (!this.searchQueryNombre) {
        this.fetchClientes();
        return;
      }

      this.tipoBusqueda = 'nombre';
      this.isLoading = true;
      this.error = null;
      this.infoMessage = null;

      try {
        const response = await buscarClientesPorNombreFachada(this.searchQueryNombre.trim());
        this.clientes = response;
      } catch (err) {
        console.error('Error al buscar por nombre:', err);
        this.manejarError(err, 'nombre');
      } finally {
        this.isLoading = false;
      }
    },

    async buscarClientePorIdentificacion() {
      if (!this.searchIdentificacion) return;

      this.tipoBusqueda = 'identificacion';
      this.isLoading = true;
      this.error = null;
      this.infoMessage = null;

      try {
        const response = await obtenerClientePorIdentificacionFachada(this.searchIdentificacion.trim());
        this.clientes = [response];
      } catch (err) {
        console.error('Error al buscar por identificación:', err);
        this.manejarError(err, 'identificación');
      } finally {
        this.isLoading = false;
      }
    },

    manejarError(err, tipo) {
      if (err.response && err.response.status === 404) {
        this.infoMessage = `No se encontraron clientes con la ${tipo} especificada`;
      } else {
        this.error = 'Error al obtener la lista de clientes. Inténtelo de nuevo más tarde.';
      }
    },


    debouncedBuscarClientesPorNombre: debounce(function () {
      this.buscarClientesPorNombre();
    }, 300),


    actualizarCliente(identificacion) {
      this.$router.push({ path: '/clientes/actualizar', query: { identificacion } });
    },

    sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrder = 'asc';
      }
    }
  },
  watch: {
    searchQueryNombre() {
      this.debouncedBuscarClientesPorNombre();
    },
  },

  mounted() {
    this.fetchClientes();
  },
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
}
</style>
